"""Bundles the static export (out/) into one self-contained HTML fragment for hosted preview.
Usage: python3 scripts/single.py out preview.html
"""
import base64, mimetypes, os, re, sys

OUT, DEST = sys.argv[1], sys.argv[2]
html = open(os.path.join(OUT, "index.html"), encoding="utf-8").read()

def read(path):
    return open(os.path.join(OUT, path.lstrip("/")), "rb").read()

def data_uri(path):
    mime = mimetypes.guess_type(path)[0] or ("font/woff2" if path.endswith(".woff2") else "application/octet-stream")
    return f"data:{mime};base64,{base64.b64encode(read(path)).decode()}"

# 1. stylesheets -> <style>, with font files inlined
def css_inline(m):
    href = m.group(1)
    css = read(href).decode("utf-8")
    css = re.sub(r"url\(([^)]*media/[^)]+)\)", lambda f: f"url({data_uri('/_next/static/media/' + f.group(1).split('media/')[1])})", css)
    return f"<style>{css}</style>"

html = re.sub(r'<link[^>]*rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*/?>', css_inline, html)
# 2. drop preloads / modulepreloads / icons
html = re.sub(r'<link[^>]*rel="(?:preload|modulepreload|icon)"[^>]*/?>', "", html)
# 3. scripts -> inline
def js_inline(m):
    src = m.group(1)
    js = read(src).decode("utf-8")
    # inline scripts have no src: register each chunk by its static path instead of document.currentScript
    js = js.replace('"object"==typeof document?document.currentScript:void 0', "void 0")
    js = js.replace('new URL(e.src)', 'new URL(e.src||"/_next/x.js",location.href)')
    # chunks are already inline: never re-fetch a chunk that has been registered
    js = js.replace("function H(e,t){let r=q(t);if(r.loadingStarted)", "function H(e,t){let r=q(t);if(r.loadingStarted||r.resolved)")
    js = js.replace("</script", "<\\/script")
    return f"<script>{js}</script>"

# collect chunk scripts, inline them with the turbopack runtime last (so every chunk is registered before the runtime resolves the chunk list)
srcs = re.findall(r'<script[^>]*src="([^"]+\.js)"[^>]*></script>', html)
html = re.sub(r'<script[^>]*src="([^"]+\.js)"[^>]*></script>', "", html)
srcs.sort(key=lambda x: "turbopack-" in x)
chunk_urls = [x for x in srcs if "turbopack-" not in x][::-1]  # popped from the end, in registration order
scripts = "<script>TURBOPACK_NEXT_CHUNK_URLS=" + __import__("json").dumps(chunk_urls) + "</script>" + "".join(js_inline(re.match(r"(.*)", x)) for x in srcs)
html = html.replace("</head>", scripts + "</head>")
# 4. images -> data URIs (HTML + JS strings)
for m in sorted(set(re.findall(r"/(?:projects|brand|apps)/[A-Za-z0-9_./-]+\.webp", html)), key=len, reverse=True):
    html = html.replace(m, data_uri(m))

# 4b. remaining /_next/static/media + css refs in the RSC payload -> data URIs
for m in set(re.findall(r"/_next/static/media/[A-Za-z0-9_.-]+\.woff2", html)):
    html = html.replace(m, data_uri(m))
for c in set(re.findall(r"/_next/static/chunks/[A-Za-z0-9_.-]+\.css", html)):
    css = read(c).decode("utf-8")
    css = re.sub(r"url\(([^)]*media/[^)]+)\)", lambda f: f"url({data_uri('/_next/static/media/' + f.group(1).split('media/')[1])})", css)
    html = html.replace(c, "data:text/css;base64," + base64.b64encode(css.encode()).decode())
# --full: keep a complete standalone document (for hosting the single file anywhere, e.g. GitHub Pages /docs)
if "--full" in sys.argv:
    open(DEST, "w", encoding="utf-8").write(html)
    print("bytes", os.path.getsize(DEST))
    sys.exit(0)

# 5. unwrap html/head/body for the artifact skeleton
html_attrs = re.search(r"<html([^>]*)>", html).group(1)
cls = re.search(r'class="([^"]*)"', html_attrs)
head = re.search(r"<head>(.*?)</head>", html, re.S).group(1)
body = re.search(r"<body>(.*?)</body>", html, re.S).group(1)
boot = (
    "<script>(function(){var d=document.documentElement;d.lang='ar';d.dir='rtl';d.setAttribute('data-theme','light');"
    + (f"d.className+=' {cls.group(1)}';" if cls else "")
    + "})();</script>"
)
# skeleton already provides charset/viewport meta
head = re.sub(r'<meta charSet="[^"]*"/?>|<meta name="viewport"[^>]*/?>', "", head)
# the artifact skeleton places everything in <body>; move the head part into document.head before React hydrates
mover = "<script>(function(){var s=document.currentScript,n=s.previousSibling,a=[];while(n){a.unshift(n);n=n.previousSibling}a.forEach(function(x){document.head.appendChild(x)});s.parentNode.removeChild(s)})();</script>"
open(DEST, "w", encoding="utf-8").write(boot + head + mover + body)
print("bytes", os.path.getsize(DEST))

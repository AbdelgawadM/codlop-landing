"""Viewport screenshots per section (more faithful than full-page captures for scroll-driven UI)."""
import asyncio, os, sys
from playwright.async_api import async_playwright

OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)
URL = "http://localhost:3005/"
COMBOS = [("desktop", 1440, 900, "ar", "dark"), ("desktop", 1440, 900, "en", "light"), ("m390", 390, 844, "ar", "light"), ("m412", 412, 915, "en", "dark")]
TARGETS = ["#about", "#services", "#work", "[class*=themesHead]", "[class*=Why-module__]", "[class*=Process-module__]", "section[class*=Cta-module]", "#contact", "footer"]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for name, w, h, lang, theme in COMBOS:
            mobile = name != "desktop"
            ctx = await browser.new_context(viewport={"width": w, "height": h}, is_mobile=mobile, has_touch=mobile)
            await ctx.add_init_script(f"localStorage.setItem('codlop.lang','{lang}');localStorage.setItem('codlop.theme','{theme}');")
            page = await ctx.new_page()
            await page.goto(URL, wait_until="networkidle")
            await page.wait_for_timeout(1500)
            await page.screenshot(path=f"{OUT}/{name}-{lang}-{theme}-hero.png")
            for i, sel in enumerate(TARGETS):
                await page.evaluate(f"window.scrollTo({{top: document.querySelector('{sel}').getBoundingClientRect().top + window.scrollY - 90, behavior:'instant'}})")
                await page.wait_for_timeout(1400)
                await page.screenshot(path=f"{OUT}/{name}-{lang}-{theme}-{i+1}.png")
                if mobile:
                    await page.evaluate(f"window.scrollBy({{top:{h-80}, behavior:'instant'}})")
                    await page.wait_for_timeout(1000)
                    await page.screenshot(path=f"{OUT}/{name}-{lang}-{theme}-{i+1}b.png")
            await ctx.close()
        await browser.close()

asyncio.run(main())

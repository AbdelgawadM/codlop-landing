"""Visual QA: full-page screenshots at desktop + the three requested phone sizes,
in both languages and both themes, plus an horizontal-overflow check."""
import asyncio, os, sys
from playwright.async_api import async_playwright

OUT = sys.argv[1] if len(sys.argv) > 1 else "/tmp/shots"
os.makedirs(OUT, exist_ok=True)
URL = "http://localhost:3005/"
SIZES = {"desktop": (1440, 900), "m390": (390, 844), "m393": (393, 852), "m412": (412, 915)}

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        report = []
        for name, (w, h) in SIZES.items():
            for lang in ("ar", "en"):
                for theme in ("light", "dark"):
                    ctx = await browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=1,
                                                    is_mobile=name != "desktop", has_touch=name != "desktop")
                    await ctx.add_init_script(f"localStorage.setItem('codlop.lang','{lang}');localStorage.setItem('codlop.theme','{theme}');")
                    page = await ctx.new_page()
                    errors = []
                    page.on("pageerror", lambda e: errors.append(str(e)))
                    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
                    await page.goto(URL, wait_until="networkidle")
                    # trigger all reveals by scrolling through
                    total = await page.evaluate("document.documentElement.scrollHeight")
                    y = 0
                    while y < total:
                        await page.evaluate(f"window.scrollTo(0,{y})")
                        await page.wait_for_timeout(120)
                        y += h * 0.7
                    await page.evaluate("window.scrollTo(0,0)")
                    await page.wait_for_timeout(900)
                    overflow = await page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
                    await page.screenshot(path=f"{OUT}/{name}-{lang}-{theme}.png", full_page=True)
                    report.append(f"{name}-{lang}-{theme}: overflow={overflow}px errors={errors[:3]}")
                    await ctx.close()
        await browser.close()
        print("\n".join(report))

asyncio.run(main())

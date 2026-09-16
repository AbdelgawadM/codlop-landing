# CODLOP — Landing Page

Premium bilingual (Arabic RTL / English LTR) landing page for **كود لوب — CODLOP**, built with Next.js 16 (App Router), React 19 and TypeScript. No UI or animation libraries: the motion system is hand-written with CSS transitions, IntersectionObserver, requestAnimationFrame and the View Transitions API.

All company content (services, projects, advantages, contact details, social links) comes from the live site at https://codlop.sa — nothing was invented.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
```

## Deploy

The site is a static export (`output: "export"` in `next.config.ts`), so `out/` can be served from anywhere.

**GitHub Pages — the zero-config way (`docs/`):** the repo ships a prebuilt, self-contained `docs/index.html` that works from any URL. Settings → Pages → Source: **Deploy from a branch** → Branch `main` → Folder **/docs** → Save. Regenerate it after changes with `npm run build && python3 scripts/single.py out docs/index.html --full`.

**GitHub Pages — the build way (GitHub Actions):**
1. Push this folder as the root of the repo (`package.json` must be at the top level — not inside a `web/` subfolder).
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
   It sets `NEXT_PUBLIC_BASE_PATH=/<repo-name>` so the site works at `https://<user>.github.io/<repo>/`.
   If you use a custom domain (or the repo is `<user>.github.io`), change that env to an empty string.

Why you get a 404 otherwise: Pages needs the built `out/` folder (not the source), the `_next/` assets must not be hidden by Jekyll (`public/.nojekyll` handles that), and a project site needs the `/<repo>` base path — all three are handled here.

**Vercel / Netlify:** import the repo, framework = Next.js, no env needed (leave `NEXT_PUBLIC_BASE_PATH` empty).

**Plain hosting (cPanel etc.):** run `npm run build` and upload the contents of `out/` to the web root.

## Structure

```
src/
  app/
    layout.tsx          # <html lang dir data-theme>, fonts, metadata, boot script (theme/lang before paint)
    page.tsx            # section composition + Organization JSON-LD
    globals.css         # DESIGN TOKENS (colors, type, spacing, radius, motion) + base, buttons, reveal system
    fonts.ts            # next/font/local: Inter (EN) + IBM Plex Sans Arabic (AR fallback) + slot for CODLOP font
    robots.ts, sitemap.ts
  lib/
    content.ts          # COMPANY (contact/social/links), SERVICES, DICT (all AR/EN copy)
    projects.ts         # PROJECTS (10 real projects) + THEMES (11 Salla/Zid themes)
  components/
    providers/AppProvider.tsx   # language + theme context, persistence, reveal observer
    Nav, Hero, About, Services, Work, Why, Process, Cta, Contact, Footer
    ui/ SplitText, Magnetic, Counter, Logo, Icons
public/
  projects/             # real project screenshots (+ more/, logos/)
  brand/                # official logo SVG
scripts/
  single.py             # bundles the static export into one self-contained HTML (preview)
  shots.py, sections.py # Playwright visual QA (desktop 1440 + 390/393/412, AR/EN, light/dark)
```

## Assets

**Project images** — real screenshots from codlop.sa live in `public/projects/` (main projects), `public/projects/more/` (the rest of the portfolio) and `public/projects/logos/` (client logos). Three projects (واسطة، باب صدقة، صيانتي) have no screenshot on codlop.sa, so their covers are composed from the real client logos. Each entry in `src/lib/projects.ts` keeps `sourceImage` — the original URL on codlop.sa.

**Logo** — the official CODLOP vector logo is inlined in `src/components/ui/Logo.tsx` (currentColor, so it adapts to both themes); the raw SVG is also at `public/brand/logo.svg`.

**CODLOP Arabic font** — put the font files in `src/fonts/`, uncomment the `codlopArabic` block in `src/app/fonts.ts`, add `codlopArabic.variable` to the `<html>` className in `layout.tsx`, and put `var(--font-codlop-ar)` first in `--font-ar` in `globals.css`.

**Privacy / Terms** — `COMPANY.links.privacy` and `.terms` in `content.ts` are `#` placeholders because codlop.sa has no public pages for them yet.

**Contact form** — there is no email endpoint on codlop.sa, so the form composes a WhatsApp message to the company's real number. Swap `onSubmit` in `Contact.tsx` for a route handler when a backend exists.

## Design system

Everything visual is a token in `globals.css` — change `--accent` once and the whole page follows. Light and dark palettes share identical hierarchy; the theme is set on `<html data-theme>` before first paint and follows the OS preference until the user picks one. Language lives on `<html lang dir>`; the whole layout uses logical properties (`inset-inline`, `margin-inline-start`, …) so RTL/LTR need no duplicated CSS.

Motion: `[data-reveal]`, `.split` (masked word rise) and `.mask` (clip-path image reveal) are picked up automatically by the global observer. Everything respects `prefers-reduced-motion`; the custom cursor and magnetic effects are disabled on touch devices.

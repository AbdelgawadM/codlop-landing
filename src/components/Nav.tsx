"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Logo } from "@/components/ui/Logo";
import { Moon, Sun } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/Magnetic";
import styles from "./Nav.module.css";

const LINKS = ["home", "about", "services", "work", "contact"] as const;
const HREF: Record<(typeof LINKS)[number], string> = { home: "#top", about: "#about", services: "#services", work: "#work", contact: "#contact" };

export function Nav() {
  const { t, lang, setLang, theme, setTheme } = useApp();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      last = y;
      setCompact(y > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section tracking */
  useEffect(() => {
    const ids = ["about", "services", "work", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
        else if (window.scrollY < 200) setActive("home");
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.1, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Lock scroll while the mobile menu is open */
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggleTheme = (e: React.MouseEvent) => setTheme(theme === "dark" ? "light" : "dark", { x: e.clientX, y: e.clientY });
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");

  return (
    <header className={`${styles.header} ${compact ? styles.compact : ""} ${open ? styles.open : ""}`}>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <div className={styles.bar}>
        <a href="#top" className={styles.logo} aria-label="CODLOP">
          <Logo height={30} />
        </a>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((k) => (
            <a key={k} href={HREF[k]} className={`${styles.link} ${active === k ? styles.active : ""}`}>
              {t.nav[k]}
            </a>
          ))}
        </nav>

        <div className={styles.tools}>
          <button type="button" className={styles.pill} onClick={toggleLang} aria-label={t.switchTo} title={t.switchTo}>
            <span className={styles.langTrack} data-lang={lang}>
              <span lang="ar">العربية</span>
              <span lang="en">English</span>
            </span>
          </button>
          <button type="button" className={styles.icon} onClick={toggleTheme} aria-label={t.theme.toggle} title={theme === "dark" ? t.theme.light : t.theme.dark}>
            <span className={styles.themeTrack} data-theme={theme}>
              <Sun />
              <Moon />
            </span>
          </button>
          <span className={styles.cta}>
            <Magnetic strength={0.25}>
              <a href="#contact" className="btn btn--accent btn--sm">
                {t.nav.cta}
              </a>
            </Magnetic>
          </span>
          <button type="button" className={`${styles.burger} ${open ? styles.burgerOpen : ""}`} onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? t.nav.close : t.nav.menu}>
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.menu} aria-hidden={!open}>
        <nav className={styles.menuLinks} aria-label="Mobile">
          {LINKS.map((k, i) => (
            <a key={k} href={HREF[k]} className={styles.menuLink} style={{ "--i": i } as React.CSSProperties} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <span className={`num ${styles.menuIndex}`}>0{i + 1}</span>
              {t.nav[k]}
            </a>
          ))}
        </nav>
        <div className={styles.menuFoot}>
          <a href="#contact" className="btn btn--accent" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

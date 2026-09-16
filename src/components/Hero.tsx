"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowRight } from "@/components/ui/Icons";
import { Phone } from "@/components/ui/Phone";
import { asset } from "@/lib/paths";
import styles from "./Hero.module.css";

/* Real app splash screens delivered by CODLOP, shown inside iPhone 16 Pro Max frames. */
const APPS = [
  { slug: "promate", name: "Promate", src: "/apps/promate.webp" },
  { slug: "alrajhi", name: "AlRajhi", src: "/apps/alrajhi.webp" },
  { slug: "dkhoni", name: "Dkhoni", src: "/apps/dkhoni.webp" },
  { slug: "dupami", name: "Dupami stor", src: "/apps/dupami.webp" },
];

export function Hero() {
  const { t, lang, reduced, isTouch } = useApp();
  const scene = useRef<HTMLDivElement>(null);

  /* Pointer parallax for the grid + floating previews, scroll fade for the whole scene. */
  useEffect(() => {
    const el = scene.current;
    if (!el) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", cx.toFixed(3));
      el.style.setProperty("--my", cy.toFixed(3));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const scroll = () => {
      const p = Math.min(1, window.scrollY / (innerHeight * 0.9));
      el.style.setProperty("--sp", p.toFixed(3));
    };
    if (!reduced && !isTouch) window.addEventListener("pointermove", move, { passive: true });
    if (!reduced) window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced, isTouch]);

  return (
    <section id="top" className={styles.hero} ref={scene}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow} data-reveal="fade">
          <span className={styles.dot} />
          {t.hero.eyebrow}
        </p>

        <h1 className={styles.title} key={lang}>
          <SplitText text={t.hero.line1} as="span" className={styles.line} delay={150} />
          <br />
          <SplitText text={t.hero.line2} as="span" className={`${styles.line} ${styles.lineAccent}`} delay={150} startIndex={4} />
        </h1>

        <div className={styles.bottom}>
          <p className={`lead ${styles.statement}`} data-reveal style={{ "--delay": "500ms" } as React.CSSProperties}>
            {t.hero.statement}
          </p>
          <div className={styles.actions} data-reveal style={{ "--delay": "650ms" } as React.CSSProperties}>
            <Magnetic>
              <a href="#contact" className="btn btn--accent">
                {t.hero.primary}
                <ArrowRight className="arrow" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#work" className="btn btn--ghost">
                {t.hero.secondary}
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Floating app previews in iPhone frames */}
      <div className={styles.floaters} aria-hidden="true">
        {APPS.map((a, i) => (
          <div key={a.slug} className={styles.floater} style={{ "--i": i } as React.CSSProperties}>
            <Phone src={asset(a.src)} alt={a.name} loading="eager" priority={i === 0} />
            <span className={styles.floaterCap}>{a.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.track}>
          {[0, 1].map((k) => (
            <span key={k} className={styles.trackSet}>
              {t.hero.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                  <i />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <a href="#about" className={styles.scroll}>
        <span>{t.hero.scroll}</span>
        <i />
      </a>
    </section>
  );
}

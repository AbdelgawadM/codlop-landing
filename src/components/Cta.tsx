"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { COMPANY } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";
import styles from "./Cta.module.css";

export function Cta() {
  const { t, lang, reduced, isTouch } = useApp();
  const ref = useRef<HTMLElement>(null);

  /* Pointer-reactive background: a light field follows the cursor, grid tilts subtly. */
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || isTouch) return;
    let raf = 0;
    let tx = 0.5,
      ty = 0.5,
      cx = 0.5,
      cy = 0.5;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--px", cx.toFixed(3));
      el.style.setProperty("--py", cy.toFixed(3));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    el.addEventListener("pointermove", move, { passive: true });
    return () => {
      el.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [reduced, isTouch]);

  return (
    <section className={styles.cta} ref={ref} aria-labelledby="cta-title">
      <div className={styles.field} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.ring} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <h2 id="cta-title" className={styles.title} key={lang}>
          <SplitText text={t.cta.line1} as="span" className={styles.l1} />
          <br />
          <SplitText text={t.cta.line2} as="span" className={styles.l2} startIndex={3} />
        </h2>
        <div className={styles.actions} data-reveal style={{ "--delay": "400ms" } as React.CSSProperties}>
          <Magnetic>
            <a href="#contact" className={`btn ${styles.btnMain}`}>
              {t.cta.button}
              <ArrowRight className="arrow" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={COMPANY.whatsapp} target="_blank" rel="noopener" className={`btn btn--ghost ${styles.btnGhost}`}>
              <WhatsApp />
              {t.cta.whatsapp}
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

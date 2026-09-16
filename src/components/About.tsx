"use client";

import { useApp } from "@/components/providers/AppProvider";
import { SplitText } from "@/components/ui/SplitText";
import { Counter } from "@/components/ui/Counter";
import styles from "./About.module.css";

export function About() {
  const { t, lang } = useApp();
  const a = t.about;
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <p className="label" data-reveal="fade">
          {a.label}
        </p>

        <div className={styles.grid}>
          <h2 className={`h-display ${styles.statement}`} key={lang}>
            <SplitText text={a.statement} as="span" />
          </h2>

          <div className={styles.counter} data-reveal>
            <div className={styles.counterNum}>
              <Counter to={10} prefix="+" className={styles.big} />
            </div>
            <p className={styles.counterLabel}>{a.counterLabel}</p>
          </div>

          <p className={`lead ${styles.para}`} data-reveal style={{ "--delay": "120ms" } as React.CSSProperties}>
            {a.para}
          </p>
        </div>

        <dl className={styles.facts}>
          {[
            [a.vision, a.visionText],
            [a.mission, a.missionText],
            [a.certs, a.certsText],
          ].map(([k, v], i) => (
            <div key={k} className={styles.fact} data-reveal style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}>
              <dt>
                <span className="num">0{i + 1}</span>
                {k}
              </dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

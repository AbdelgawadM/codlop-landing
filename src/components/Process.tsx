"use client";

import { useApp } from "@/components/providers/AppProvider";
import { SplitText } from "@/components/ui/SplitText";
import styles from "./Process.module.css";

export function Process() {
  const { t, lang } = useApp();
  const p = t.process;
  return (
    <section className={`section ${styles.process}`} aria-labelledby="process-title">
      <div className="container">
        <div className={styles.head}>
          <p className="label" data-reveal="fade">
            {p.label}
          </p>
          <h2 id="process-title" className={`h-section ${styles.title}`} key={lang}>
            <SplitText text={p.title} as="span" />
          </h2>
        </div>

        <ol className={styles.steps}>
          {p.steps.map((s, i) => (
            <li key={s.n} className={styles.step} data-reveal style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}>
              <span className={`num ${styles.n}`}>{s.n}</span>
              <span className={styles.rule} aria-hidden="true" />
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

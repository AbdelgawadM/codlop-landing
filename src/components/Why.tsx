"use client";

import { useApp } from "@/components/providers/AppProvider";
import { SplitText } from "@/components/ui/SplitText";
import styles from "./Why.module.css";

export function Why() {
  const { t, lang } = useApp();
  const w = t.why;
  return (
    <section className={`section ${styles.why}`} aria-labelledby="why-title">
      <div className="container">
        <div className={styles.head}>
          <p className="label" data-reveal="fade">
            {w.label}
          </p>
          <h2 id="why-title" className={`h-display ${styles.title}`} key={lang}>
            <SplitText text={w.title} as="span" />
          </h2>
        </div>

        <ol className={styles.list}>
          {w.items.map((it, i) => (
            <li key={it.title} className={styles.item} data-reveal style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
              <span className={`num ${styles.big}`} aria-hidden="true">
                {it.n}
                {i === 0 && <small>h</small>}
              </span>
              <div className={styles.text}>
                <h3 className={styles.itemTitle}>{it.title}</h3>
                <p className={styles.itemText}>{it.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { SERVICES } from "@/lib/content";
import { ArrowUpRight, Plus } from "@/components/ui/Icons";
import { SplitText } from "@/components/ui/SplitText";
import styles from "./Services.module.css";

/* Abstract, service-specific visuals drawn with plain SVG (no stock illustrations). */
function Visual({ id }: { id: string }) {
  const stroke = "currentColor";
  switch (id) {
    case "web":
      return (
        <svg viewBox="0 0 320 220" className={styles.svg}>
          <rect x="16" y="16" width="288" height="188" rx="10" fill="none" stroke={stroke} />
          <path d="M16 46h288" stroke={stroke} />
          <circle cx="34" cy="31" r="3" fill={stroke} />
          <circle cx="46" cy="31" r="3" fill={stroke} />
          <circle cx="58" cy="31" r="3" fill={stroke} />
          <rect x="40" y="72" width="140" height="14" rx="3" fill="var(--accent)" />
          <rect x="40" y="98" width="200" height="6" rx="3" fill={stroke} opacity=".4" />
          <rect x="40" y="112" width="160" height="6" rx="3" fill={stroke} opacity=".4" />
          <rect x="40" y="140" width="72" height="26" rx="13" fill={stroke} />
          <rect x="204" y="72" width="76" height="94" rx="8" fill="none" stroke={stroke} strokeDasharray="4 4" />
        </svg>
      );
    case "mobile":
      return (
        <svg viewBox="0 0 320 220" className={styles.svg}>
          <rect x="112" y="8" width="96" height="204" rx="18" fill="none" stroke={stroke} />
          <rect x="140" y="18" width="40" height="6" rx="3" fill={stroke} />
          <rect x="126" y="44" width="68" height="44" rx="6" fill="var(--accent)" />
          <rect x="126" y="100" width="68" height="8" rx="4" fill={stroke} opacity=".4" />
          <rect x="126" y="116" width="48" height="8" rx="4" fill={stroke} opacity=".4" />
          <rect x="126" y="140" width="30" height="30" rx="8" fill="none" stroke={stroke} />
          <rect x="164" y="140" width="30" height="30" rx="8" fill="none" stroke={stroke} />
          <rect x="40" y="60" width="52" height="100" rx="12" fill="none" stroke={stroke} opacity=".35" />
          <rect x="228" y="60" width="52" height="100" rx="12" fill="none" stroke={stroke} opacity=".35" />
        </svg>
      );
    case "hosting":
      return (
        <svg viewBox="0 0 320 220" className={styles.svg}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="60" y={30 + i * 56} width="200" height="44" rx="8" fill="none" stroke={stroke} />
              <circle cx="84" cy={52 + i * 56} r="5" fill={i === 0 ? "var(--accent)" : stroke} />
              <rect x="104" y={49 + i * 56} width="120" height="6" rx="3" fill={stroke} opacity=".4" />
            </g>
          ))}
        </svg>
      );
    case "marketing":
      return (
        <svg viewBox="0 0 320 220" className={styles.svg}>
          <path d="M40 180 L100 120 L150 150 L220 70 L280 90" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="220" cy="70" r="7" fill="var(--accent)" />
          <path d="M40 180h240" stroke={stroke} opacity=".4" />
          <path d="M256 40l24-8-8 24" fill="none" stroke={stroke} />
        </svg>
      );
    case "seo":
      return (
        <svg viewBox="0 0 320 220" className={styles.svg}>
          <circle cx="140" cy="100" r="54" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M180 140l48 48" stroke={stroke} strokeWidth="6" strokeLinecap="round" />
          <rect x="108" y="82" width="64" height="8" rx="4" fill="var(--accent)" />
          <rect x="108" y="100" width="44" height="6" rx="3" fill={stroke} opacity=".4" />
          <rect x="108" y="114" width="54" height="6" rx="3" fill={stroke} opacity=".4" />
        </svg>
      );
    case "brand":
      return (
        <svg viewBox="0 0 320 220" className={styles.svg}>
          <circle cx="120" cy="110" r="60" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="200" cy="110" r="60" fill="var(--accent)" opacity=".85" />
          <rect x="40" y="190" width="240" height="4" rx="2" fill={stroke} opacity=".3" />
        </svg>
      );
    case "motion":
      return (
        <svg viewBox="0 0 320 220" className={styles.svg}>
          <rect x="30" y="40" width="260" height="140" rx="10" fill="none" stroke={stroke} />
          <path d="M146 86l40 24-40 24z" fill="var(--accent)" />
          <rect x="30" y="196" width="260" height="4" rx="2" fill={stroke} opacity=".3" />
          <rect x="30" y="196" width="120" height="4" rx="2" fill="var(--accent)" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 320 220" className={styles.svg}>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={40 + (i % 2) * 124} y={30 + Math.floor(i / 2) * 84} width="116" height="72" rx="10" fill={i === 1 ? "var(--accent)" : "none"} stroke={stroke} />
          ))}
        </svg>
      );
  }
}

export function Services() {
  const { t, lang } = useApp();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  const s = t.services;
  const current = SERVICES[pinned ?? active];

  return (
    <section id="services" className={`section ${styles.services}`}>
      <div className="container">
        <div className={styles.head}>
          <p className="label" data-reveal="fade">
            {s.label}
          </p>
          <h2 className={`h-section ${styles.title}`} key={lang}>
            <SplitText text={s.title} as="span" />
          </h2>
          <p className={`lead ${styles.intro}`} data-reveal>
            {s.intro}
          </p>
        </div>

        <div className={styles.layout}>
          <ul className={styles.list} onMouseLeave={() => pinned === null && setActive(active)}>
            {SERVICES.map((sv, i) => {
              const isOpen = (pinned ?? active) === i;
              return (
                <li key={sv.id} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`} data-reveal style={{ "--delay": `${i * 40}ms` } as React.CSSProperties}>
                  <button
                    type="button"
                    className={styles.row}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setPinned(pinned === i ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`svc-${sv.id}`}
                  >
                    <span className={`num ${styles.index}`}>{sv.index}</span>
                    <span className={styles.name}>{sv.title[lang]}</span>
                    <span className={styles.tag}>{sv.tag[lang]}</span>
                    <span className={styles.plus} aria-hidden="true">
                      <Plus />
                    </span>
                  </button>
                  <div id={`svc-${sv.id}`} className={styles.panel} aria-hidden={!isOpen}>
                    <div className={styles.panelInner}>
                      <div className={styles.mobileVisual} aria-hidden="true">
                        <Visual id={sv.id} />
                      </div>
                      <p>{sv.desc[lang]}</p>
                      <a href={sv.href} target="_blank" rel="noopener" className="link" tabIndex={isOpen ? 0 : -1}>
                        {s.view}
                        <ArrowUpRight />
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className={styles.preview} aria-hidden="true">
            <div className={styles.previewCard}>
              <div className={styles.previewVisual} key={current.id}>
                <Visual id={current.id} />
              </div>
              <div className={styles.previewMeta}>
                <span className={`num ${styles.previewIndex}`} key={`n-${current.id}`}>
                  {current.index}
                </span>
                <span className={styles.previewTag}>{current.tag[lang]}</span>
              </div>
              <p className={styles.previewHint}>{s.hint}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

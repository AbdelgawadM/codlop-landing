"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { COMPANY } from "@/lib/content";
import { MORE, PROJECTS, THEMES, type Category, type Project } from "@/lib/projects";
import { ArrowUpRight, ArrowRight } from "@/components/ui/Icons";
import { SplitText } from "@/components/ui/SplitText";
import { asset } from "@/lib/paths";
import styles from "./Work.module.css";

type Filter = "all" | Category;

function ProjectCard({ p, i, uniform }: { p: Project; i: number; uniform: boolean }) {
  const { lang, t } = useApp();
  return (
    <article className={`${styles.card} ${uniform && p.layout !== "feature" ? styles.half : styles[p.layout]}`} style={{ "--i": i } as React.CSSProperties} data-mask-root>
      <a href={p.href} target="_blank" rel="noopener" className={styles.cardLink} aria-label={`${p.name[lang]} — ${t.work.view}`}>
        <figure className={`mask ${styles.media}`}>
          <img src={asset(p.image)} alt={p.name[lang]} width={1400} height={1000} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
          <figcaption className={styles.overlay}>
            <span className={styles.overlayMeta}>
              <span>{p.categoryLabel[lang]}</span>
              <span className="num">{p.platforms.join(" · ")}</span>
            </span>
            <span className={styles.overlayCta}>
              {t.work.view}
              <ArrowUpRight />
            </span>
          </figcaption>
        </figure>
        <div className={styles.body}>
          <div className={styles.bodyTop}>
            <span className={`num ${styles.idx}`}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.cat}>{p.categoryLabel[lang]}</span>
            {p.logo && <img className={styles.logo} src={asset(p.logo)} alt="" width={96} height={40} loading="lazy" decoding="async" />}
          </div>
          <h3 className={styles.name}>{p.name[lang]}</h3>
          <p className={styles.desc}>{p.desc[lang]}</p>
          <div className={styles.platforms}>
            {p.platforms.map((pl) => (
              <span key={pl} className={`num ${styles.chip}`}>
                {pl}
              </span>
            ))}
          </div>
        </div>
      </a>
    </article>
  );
}

export function Work() {
  const { t, lang, reduced } = useApp();
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState<Filter>("all");
  const [leaving, setLeaving] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (filter === shown) return;
    if (reduced) {
      setShown(filter);
      return;
    }
    setLeaving(true);
    const id = window.setTimeout(() => {
      setShown(filter);
      setLeaving(false);
    }, 320);
    return () => window.clearTimeout(id);
  }, [filter, shown, reduced]);

  const list = shown === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === shown);
  const showThemes = shown === "all" || shown === "themes";
  const more = shown === "all" ? MORE : MORE.filter((m) => m.category === shown);

  const scrollStrip = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    const rtl = document.documentElement.dir === "rtl";
    el.scrollBy({ left: (rtl ? -dir : dir) * Math.min(el.clientWidth * 0.8, 720), behavior: "smooth" });
  };

  return (
    <section id="work" className={`section ${styles.work}`}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="label" data-reveal="fade">
              {t.work.label}
            </p>
            <h2 className={`h-display ${styles.title}`} key={lang}>
              <SplitText text={t.work.title} as="span" />
            </h2>
          </div>
          <p className={`lead ${styles.intro}`} data-reveal>
            {t.work.intro}
          </p>
        </div>

        <div className={styles.filters} role="tablist" aria-label={t.work.label} data-reveal="fade">
          {t.work.filters.map((f) => (
            <button key={f.key} type="button" role="tab" aria-selected={filter === f.key} className={`${styles.filter} ${filter === f.key ? styles.filterOn : ""}`} onClick={() => setFilter(f.key as Filter)}>
              {f.label}
              <span className={`num ${styles.count}`}>{f.key === "all" ? PROJECTS.length + THEMES.length + MORE.length : f.key === "themes" ? THEMES.length : PROJECTS.filter((p) => p.category === f.key).length + MORE.filter((m) => m.category === f.key).length}</span>
            </button>
          ))}
        </div>

        <div className={`${styles.grid} ${leaving ? styles.leaving : ""}`} key={shown}>
          {list.map((p, i) => (
            <ProjectCard key={p.slug} p={p} i={i} uniform={shown !== "all"} />
          ))}
          {list.length === 0 && !showThemes && <p className={styles.empty}>{t.work.empty}</p>}
        </div>

        {more.length > 0 && (
          <div className={`${styles.more} ${leaving ? styles.leaving : ""}`} key={`more-${shown}`}>
            <div className={styles.moreHead}>
              <p className="label" data-reveal="fade">
                {t.work.moreLabel}
              </p>
              <h3 className={`h-section ${styles.moreTitle}`} data-reveal>
                {t.work.moreTitle}
              </h3>
            </div>
            <div className={styles.moreGrid}>
              {more.map((m, i) => (
                <a key={m.slug} href={m.href} target="_blank" rel="noopener" className={styles.tile} style={{ "--i": i } as React.CSSProperties} aria-label={`${m.name[lang]} — ${t.work.view}`}>
                  <span className={styles.tileMedia}>
                    <img src={asset(m.image)} alt={m.name[lang]} width={1000} height={1250} loading="lazy" decoding="async" />
                  </span>
                  <span className={styles.tileCap}>
                    <span className={styles.tileName}>{m.name[lang]}</span>
                    <span className={styles.tileCat}>{m.categoryLabel[lang]}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {showThemes && (
        <div className={`${styles.themes} ${leaving ? styles.leaving : ""}`} key={`themes-${shown}`}>
          <div className={`container ${styles.themesHead}`}>
            <div>
              <p className="label" data-reveal="fade">
                {t.work.themesLabel}
              </p>
              <h3 className={`h-section ${styles.themesTitle}`} data-reveal>
                {t.work.themesTitle}
              </h3>
              <p className={`muted ${styles.themesText}`} data-reveal>
                {t.work.themesText}
              </p>
            </div>
            <div className={styles.stripNav}>
              <button type="button" onClick={() => scrollStrip(-1)} aria-label="previous" className={styles.stripBtn}>
                <ArrowRight />
              </button>
              <button type="button" onClick={() => scrollStrip(1)} aria-label="next" className={styles.stripBtn}>
                <ArrowRight />
              </button>
            </div>
          </div>
          <div className={styles.strip} ref={stripRef}>
            {THEMES.map((th, i) => (
              <a key={th.slug} href={th.href} target="_blank" rel="noopener" className={styles.theme} style={{ "--i": i } as React.CSSProperties}>
                <span className={styles.themeMedia}>
                  <img src={asset(th.image)} alt={th.name[lang]} width={900} height={1200} loading="lazy" decoding="async" />
                </span>
                <span className={styles.themeCap}>
                  <span className={styles.themeName}>{th.name[lang]}</span>
                  <span className={`num ${styles.themeIdx}`}>{String(i + 1).padStart(2, "0")}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className={`container ${styles.foot}`} data-reveal="fade">
        <a href={COMPANY.links.portfolio} target="_blank" rel="noopener" className="btn btn--ghost">
          {t.work.more}
          <ArrowUpRight className="arrow" />
        </a>
        <a href={COMPANY.links.motion} target="_blank" rel="noopener" className="link">
          {t.work.motionCta}
          <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}

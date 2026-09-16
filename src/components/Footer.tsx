"use client";

import { useApp } from "@/components/providers/AppProvider";
import { COMPANY, SERVICES } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { ArrowUp, Social } from "@/components/ui/Icons";
import styles from "./Footer.module.css";

export function Footer() {
  const { t, lang } = useApp();
  const f = t.footer;
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo className={styles.logo} height={40} />
            <p className={styles.about}>{f.about}</p>
            <ul className={styles.social} aria-label={f.follow}>
              {COMPANY.social.map((s) => (
                <li key={s.key}>
                  <a href={s.href} target="_blank" rel="noopener" aria-label={s.label} className={styles.socialLink}>
                    <Social name={s.key} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.col} aria-label={f.company}>
            <h3 className={styles.colTitle}>{f.company}</h3>
            <a href="#top">{t.nav.home}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#work">{t.nav.work}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <nav className={styles.col} aria-label={f.services}>
            <h3 className={styles.colTitle}>{f.services}</h3>
            {SERVICES.map((s) => (
              <a key={s.id} href={s.href} target="_blank" rel="noopener">
                {s.title[lang]}
              </a>
            ))}
          </nav>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>{f.contact}</h3>
            {COMPANY.phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="num" dir="ltr" style={{ textAlign: "start" }}>
                {p.display}
              </a>
            ))}
            <a href={COMPANY.whatsapp} target="_blank" rel="noopener">
              WhatsApp
            </a>
            <span className={styles.addr}>{COMPANY.location[lang]}</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.rights}>
            {f.rights} <span className="num">{year}</span>
          </p>
          <div className={styles.legal}>
            <a href={COMPANY.links.privacy}>
              {f.privacy}
            </a>
            <a href={COMPANY.links.terms}>
              {f.terms}
            </a>
            <a href="#top" className={styles.up} aria-label={f.back}>
              <ArrowUp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

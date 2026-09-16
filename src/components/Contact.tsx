"use client";

import { useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { COMPANY } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { ArrowRight, ArrowUpRight, Phone, Pin, WhatsApp } from "@/components/ui/Icons";
import styles from "./Contact.module.css";

export function Contact() {
  const { t, lang } = useApp();
  const c = t.contact;
  const [sent, setSent] = useState(false);

  /* No email endpoint exists on codlop.sa, so the form composes a WhatsApp message
     to the company's real number. Swap for a route handler when a backend exists. */
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lines = [
      `${c.form.subject}: ${fd.get("subject")}`,
      `${c.form.name}: ${fd.get("name")}`,
      `${c.form.email}: ${fd.get("email")}`,
      `${c.form.phone}: ${fd.get("phone")}`,
      "",
      String(fd.get("message") ?? ""),
    ];
    const url = `${COMPANY.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
    setSent(true);
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.info}>
            <p className="label" data-reveal="fade">
              {c.label}
            </p>
            <h2 className={`h-display ${styles.title}`} key={lang}>
              <SplitText text={c.title} as="span" />
            </h2>
            <p className={`lead ${styles.intro}`} data-reveal>
              {c.intro}
            </p>

            <ul className={styles.channels}>
              <li className={styles.channel} data-reveal>
                <span className={styles.chIcon}>
                  <Phone />
                </span>
                <span className={styles.chBody}>
                  <span className={styles.chLabel}>{c.phone}</span>
                  {COMPANY.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className={`num ${styles.chValue}`} dir="ltr">
                      {p.display}
                    </a>
                  ))}
                </span>
              </li>
              <li className={styles.channel} data-reveal style={{ "--delay": "80ms" } as React.CSSProperties}>
                <span className={styles.chIcon}>
                  <WhatsApp />
                </span>
                <span className={styles.chBody}>
                  <span className={styles.chLabel}>{c.whatsapp}</span>
                  <a href={COMPANY.whatsapp} target="_blank" rel="noopener" className={`num ${styles.chValue}`} dir="ltr">
                    {COMPANY.phones[0].display}
                  </a>
                </span>
              </li>
              <li className={styles.channel} data-reveal style={{ "--delay": "160ms" } as React.CSSProperties}>
                <span className={styles.chIcon}>
                  <Pin />
                </span>
                <span className={styles.chBody}>
                  <span className={styles.chLabel}>{c.location}</span>
                  <span className={styles.chValue}>{COMPANY.location[lang]}</span>
                  <a href={COMPANY.map} target="_blank" rel="noopener" className={`link ${styles.mapLink}`}>
                    {c.openMap}
                    <ArrowUpRight />
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <form className={styles.form} onSubmit={onSubmit} data-reveal style={{ "--delay": "120ms" } as React.CSSProperties}>
            <div className={styles.row}>
              <Field name="name" label={c.form.name} type="text" autoComplete="name" required />
              <Field name="email" label={c.form.email} type="email" autoComplete="email" required />
            </div>
            <div className={styles.row}>
              <Field name="phone" label={c.form.phone} type="tel" autoComplete="tel" dir="ltr" />
              <Field name="subject" label={c.form.subject} type="text" required />
            </div>
            <Field name="message" label={c.form.message} textarea required />
            <div className={styles.formFoot}>
              <button type="submit" className="btn btn--accent">
                {c.form.submit}
                <ArrowRight className="arrow" />
              </button>
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener" className={`link ${styles.altLink}`}>
                <WhatsApp />
                {c.form.sendingHint}
              </a>
            </div>
            <p className={styles.note} role="status" aria-live="polite">
              {sent ? c.form.sent : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  textarea = false,
  required = false,
  autoComplete,
  dir,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  autoComplete?: string;
  dir?: "ltr" | "rtl";
}) {
  const id = `f-${name}`;
  return (
    <div className={styles.field}>
      {textarea ? (
        <textarea id={id} name={name} rows={5} required={required} placeholder=" " className={styles.input} />
      ) : (
        <input id={id} name={name} type={type} required={required} placeholder=" " autoComplete={autoComplete} dir={dir} className={styles.input} />
      )}
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
    </div>
  );
}

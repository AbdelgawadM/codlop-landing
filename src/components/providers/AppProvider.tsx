"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DICT, type Dict, type Lang } from "@/lib/content";

type Theme = "light" | "dark";

type Ctx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Dict;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme, origin?: { x: number; y: number }) => void;
  reduced: boolean;
  isTouch: boolean;
};

const AppCtx = createContext<Ctx | null>(null);

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}

const LANG_KEY = "codlop.lang";
const THEME_KEY = "codlop.theme";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  const [theme, setThemeState] = useState<Theme>("light");
  const [reduced, setReduced] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  /* Sync with what the boot script already applied to <html>. */
  useEffect(() => {
    const d = document.documentElement;
    const l = d.lang === "en" ? "en" : "ar";
    const th = d.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setLangState(l);
    setThemeState(th);
    requestAnimationFrame(() => d.classList.remove("lang-pending"));

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    setIsTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);

    /* Follow system theme changes only if the user never chose explicitly. */
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    const onDark = () => {
      if (!localStorage.getItem(THEME_KEY)) {
        const next = dark.matches ? "dark" : "light";
        d.setAttribute("data-theme", next);
        setThemeState(next);
      }
    };
    dark.addEventListener("change", onDark);
    return () => {
      mq.removeEventListener("change", onMq);
      dark.removeEventListener("change", onDark);
    };
  }, []);

  const setLang = useCallback(
    (l: Lang) => {
      if (l === lang) return;
      const d = document.documentElement;
      const apply = () => {
        d.lang = l;
        d.dir = l === "ar" ? "rtl" : "ltr";
        setLangState(l);
        try {
          localStorage.setItem(LANG_KEY, l);
        } catch {}
      };
      if (reduced) {
        apply();
        return;
      }
      document.body.classList.add("lang-switching");
      window.setTimeout(() => {
        apply();
        requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.remove("lang-switching")));
      }, 260);
    },
    [lang, reduced],
  );

  const setTheme = useCallback(
    (t: Theme, origin?: { x: number; y: number }) => {
      const d = document.documentElement;
      const apply = () => {
        d.setAttribute("data-theme", t);
        setThemeState(t);
        try {
          localStorage.setItem(THEME_KEY, t);
        } catch {}
      };
      const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
      if (reduced || !doc.startViewTransition || !origin) {
        apply();
        return;
      }
      const x = origin.x;
      const y = origin.y;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const vt = doc.startViewTransition(apply);
      vt.ready.then(() => {
        d.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 700, easing: "cubic-bezier(0.22,1,0.36,1)", pseudoElement: "::view-transition-new(root)" },
        );
      });
    },
    [reduced],
  );

  /* Global scroll-reveal observer (single instance for the whole page). */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    const observeAll = () => document.querySelectorAll("[data-reveal]:not(.is-in), .split:not(.is-in), .mask:not(.is-in), [data-mask-root]:not(.is-in)").forEach((el) => io.observe(el));
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", t: DICT[lang], setLang, theme, setTheme, reduced, isTouch }),
    [lang, setLang, theme, setTheme, reduced, isTouch],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

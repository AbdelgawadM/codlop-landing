import type { Metadata, Viewport } from "next";
import { inter, plexArabic } from "./fonts";
import { AppProvider } from "@/components/providers/AppProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://codlop.sa"),
  title: {
    default: "كود لوب | تصميم وبرمجة المواقع والتطبيقات — CODLOP",
    template: "%s — CODLOP",
  },
  description:
    "كود لوب شركة تقنية سعودية بخبرة تزيد عن 10 أعوام في تصميم وبرمجة المواقع وتطبيقات الجوال والأنظمة الإدارية وثيمات سلة وزد. CODLOP — a Saudi technology company building websites, mobile apps and digital products.",
  keywords: ["كود لوب", "CODLOP", "تصميم مواقع", "برمجة تطبيقات", "شركة برمجة سعودية", "ثيمات سلة", "ثيمات زد", "القصيم", "بريدة"],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
    siteName: "CODLOP",
    title: "كود لوب — نصنع تجارب رقمية تحوّل الأفكار إلى منتجات",
    description: "شركة تقنية سعودية بخبرة تزيد عن 10 أعوام في تصميم وبرمجة المواقع والتطبيقات.",
    url: "https://codlop.sa",
  },
  twitter: { card: "summary_large_image", site: "@cod_lop" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#050a1c" },
  ],
};

/** Runs before paint: applies persisted theme + language so there is no flash. */
const bootScript = `
(function(){
  try {
    var d = document.documentElement;
    var t = localStorage.getItem('codlop.theme');
    if (t !== 'light' && t !== 'dark') t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    d.setAttribute('data-theme', t);
    var l = localStorage.getItem('codlop.lang');
    if (l === 'en' || l === 'ar') { d.lang = l; d.dir = l === 'ar' ? 'rtl' : 'ltr'; if (l === 'en') d.classList.add('lang-pending'); }
    d.classList.add('no-transitions');
    window.addEventListener('load', function(){ requestAnimationFrame(function(){ d.classList.remove('no-transitions'); }); });
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-theme="light" className={`${inter.variable} ${plexArabic.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

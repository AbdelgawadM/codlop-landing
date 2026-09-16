import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Why } from "@/components/Why";
import { Process } from "@/components/Process";
import { Cta } from "@/components/Cta";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { COMPANY } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CODLOP — كود لوب",
  alternateName: COMPANY.legalName.ar,
  url: COMPANY.site,
  telephone: COMPANY.phones.map((p) => p.tel),
  address: { "@type": "PostalAddress", addressLocality: "Buraydah", addressRegion: "Al-Qassim", addressCountry: "SA" },
  sameAs: COMPANY.social.map((s) => s.href),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Work />
        <Why />
        <Process />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

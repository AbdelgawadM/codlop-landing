/**
 * Bilingual content dictionary.
 * Arabic is the source of truth (taken from codlop.sa); English is a
 * crafted equivalent, not a mechanical translation.
 */
export type Lang = "ar" | "en";

export const COMPANY = {
  name: { ar: "كود لوب", en: "CODLOP" },
  legalName: {
    ar: "شركة كود لوب لتقنية المعلومات",
    en: "Cod Lop Information Technology Co.",
  },
  site: "https://codlop.sa",
  phones: [
    { display: "+966 558 70 6532", tel: "+966558706532" },
    { display: "+966 54 544 7990", tel: "+966544547990" },
  ],
  whatsapp: "https://wa.me/966558706532",
  location: {
    ar: "المملكة العربية السعودية — القصيم، بريدة",
    en: "Buraydah, Al‑Qassim — Saudi Arabia",
  },
  map: "https://www.google.com/maps?q=26.358138,43.969122",
  social: [
    { key: "x", label: "X", href: "https://twitter.com/cod_lop" },
    { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/cod-lop/" },
    { key: "youtube", label: "YouTube", href: "https://www.youtube.com/channel/UChYETiYfFnpAwXzVulCpgoQ" },
    { key: "facebook", label: "Facebook", href: "https://www.facebook.com/Cod-lop-103298078820332/" },
  ],
  links: {
    services: "https://codlop.sa/service",
    portfolio: "https://codlop.sa/our-portfolio",
    motion: "https://codlop.sa/video-motion",
    about: "https://codlop.sa/about",
    contact: "https://codlop.sa/contact",
    blog: "https://codlop.sa/blog",
    orderNow: "https://codlop.sa/ar/order-now",
    /* codlop.sa has no public privacy/terms pages yet — point these at the real URLs when they exist. */
    privacy: "#privacy",
    terms: "#terms",
  },
} as const;

export type Service = {
  id: string;
  index: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  tag: Record<Lang, string>;
  href: string;
};

export const SERVICES: Service[] = [
  {
    id: "web",
    index: "01",
    title: { ar: "تصميم المواقع الإلكترونية", en: "Website Design & Development" },
    desc: {
      ar: "نقوم بتصميم موقع إلكتروني إحترافي بأسعار منافسة وأفضل جودة بأسرع وقت وأسهل تواصل.",
      en: "Professional, high‑performance websites built with care — competitive pricing, top quality, fast delivery and simple communication.",
    },
    tag: { ar: "مواقع ومتاجر", en: "Web & Commerce" },
    href: "https://codlop.sa/service-detail/1",
  },
  {
    id: "mobile",
    index: "02",
    title: { ar: "تصميم وبرمجة تطبيقات الجوال", en: "Mobile App Design & Development" },
    desc: {
      ar: "نقوم بتصميم وتطوير تطبيقات تلبي إحتياجات الشركات والأفراد وتحسن الأداء بتقديم حلول فعالة.",
      en: "Android and iOS applications designed and engineered to serve companies and individuals with effective, performant solutions.",
    },
    tag: { ar: "Android · iOS", en: "Android · iOS" },
    href: "https://codlop.sa/service-detail/2",
  },
  {
    id: "hosting",
    index: "03",
    title: { ar: "إستضافة وحجز الدومينات", en: "Hosting & Domain Registration" },
    desc: {
      ar: "معنا موقعك بأمان وسرعة تتناسب مع إحتياجاتك، وبأسعار منافسة تجعل وجودك مميز على الإنترنت.",
      en: "Reliable, fast hosting matched to your needs, at competitive prices that make your presence online stand out.",
    },
    tag: { ar: "بنية تحتية", en: "Infrastructure" },
    href: "https://codlop.sa/service-detail/3",
  },
  {
    id: "marketing",
    index: "04",
    title: { ar: "التسويق الإلكتروني", en: "E‑Marketing" },
    desc: {
      ar: "نوصل بإعلانك لعملائك المستهدفين بشكل مؤكد وفعال من خلال إعلانات جوجل.",
      en: "We deliver your message to the right audience — reliably and effectively — through Google Ads campaigns.",
    },
    tag: { ar: "نمو", en: "Growth" },
    href: "https://codlop.sa/service-detail/4",
  },
  {
    id: "seo",
    index: "05",
    title: { ar: "السيو للمواقع والشركات", en: "SEO for Websites & Companies" },
    desc: {
      ar: "نقوم بتحسين ظهور موقعك على محركات البحث، ويكون أعلى قمة النتائج للمواقع المشابهة.",
      en: "We improve how your site appears on search engines so it ranks at the top against similar sites.",
    },
    tag: { ar: "ظهور", en: "Visibility" },
    href: "https://codlop.sa/service-detail/5",
  },
  {
    id: "brand",
    index: "06",
    title: { ar: "تصميم شعار وهوية", en: "Logo & Visual Identity" },
    desc: {
      ar: "نقوم بعمل هوية تجارية لمشروعك بما يميزك في مجالك وتجعلك تسبق منافسينك.",
      en: "A brand identity that sets your project apart in its field and keeps you ahead of competitors.",
    },
    tag: { ar: "هوية", en: "Identity" },
    href: "https://codlop.sa/service-detail/6",
  },
  {
    id: "motion",
    index: "07",
    title: { ar: "فيديو موشن وأنيميشن", en: "Motion & Animation Video" },
    desc: {
      ar: "لدينا فريق عمل متخصص في تنفيذ وإبتكار فيديوهات معبرة لتبسيط الفكرة للمشاهد.",
      en: "A dedicated team crafting expressive motion videos that make your idea simple for the viewer.",
    },
    tag: { ar: "موشن", en: "Motion" },
    href: "https://codlop.sa/service-detail/7",
  },
  {
    id: "social",
    index: "08",
    title: { ar: "إدارة شبكات التواصل الاجتماعي", en: "Social Media Management" },
    desc: {
      ar: "نقوم بعمل خطة تسويق على السوشيال ميديا عن علامتك التجارية شاملة منشورات وتصميمات إبداعية.",
      en: "A full social media plan for your brand — posts, creative designs and consistent presence.",
    },
    tag: { ar: "محتوى", en: "Content" },
    href: "https://codlop.sa/service-detail/8",
  },
];

export type Dict = {
  langName: string;
  switchTo: string;
  skip: string;
  nav: { home: string; about: string; services: string; work: string; contact: string; cta: string; menu: string; close: string };
  theme: { light: string; dark: string; toggle: string };
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    statement: string;
    primary: string;
    secondary: string;
    scroll: string;
    tags: string[];
  };
  about: {
    label: string;
    statement: string;
    para: string;
    counter: string;
    counterLabel: string;
    vision: string;
    visionText: string;
    mission: string;
    missionText: string;
    certs: string;
    certsText: string;
  };
  services: { label: string; title: string; intro: string; view: string; hint: string };
  work: {
    label: string;
    title: string;
    intro: string;
    filters: { key: string; label: string }[];
    view: string;
    platforms: string;
    more: string;
    motionCta: string;
    themesLabel: string;
    themesTitle: string;
    themesText: string;
    empty: string;
    moreLabel: string;
    moreTitle: string;
  };
  why: { label: string; title: string; items: { n: string; title: string; text: string }[] };
  process: { label: string; title: string; steps: { n: string; title: string; text: string }[] };
  cta: { line1: string; line2: string; button: string; whatsapp: string };
  contact: {
    label: string;
    title: string;
    intro: string;
    phone: string;
    whatsapp: string;
    location: string;
    openMap: string;
    form: { name: string; email: string; phone: string; subject: string; message: string; submit: string; sent: string; sendingHint: string };
  };
  footer: { about: string; company: string; services: string; contact: string; follow: string; privacy: string; terms: string; rights: string; back: string };
};

export const DICT: Record<Lang, Dict> = {
  ar: {
    langName: "العربية",
    switchTo: "English",
    skip: "تخطّي إلى المحتوى",
    nav: { home: "الرئيسية", about: "عن الشركة", services: "الخدمات", work: "أعمالنا", contact: "اتصل بنا", cta: "ابدأ مشروعك", menu: "القائمة", close: "إغلاق" },
    theme: { light: "الوضع الفاتح", dark: "الوضع الداكن", toggle: "تبديل المظهر" },
    hero: {
      eyebrow: "شركة تقنية سعودية — القصيم، بريدة",
      line1: "نصنع تجارب رقمية",
      line2: "تحوّل الأفكار إلى منتجات",
      statement:
        "كود لوب مؤسسة تصميم وبرمجة مواقع وتطبيقات رقمية بخبرة تزيد عن 10 أعوام، نبني منتجات جادّة للشركات والأفراد.",
      primary: "ابدأ مشروعك",
      secondary: "استكشف أعمالنا",
      scroll: "مرّر للأسفل",
      tags: ["مواقع", "تطبيقات جوال", "أنظمة إدارية", "ثيمات سلة وزد", "هوية بصرية"],
    },
    about: {
      label: "عن كود لوب",
      statement: "ثقة صنعها تاريخ، بخبرة أكثر من 10 أعوام في الخدمات التقنية.",
      para: "شركة تقنية سعودية الأصل ولها فروع في دول أخرى، مُعتمدة رسمياً. نسعى إلى الإرتقاء بمجال تكنولوجيا المعلومات من خلال تقديم تصميمات وبرمجيات فريدة من نوعها تتناسب مع جميع الأفراد والمؤسسات بأعلى جودة وفي أسرع وقت ممكن.",
      counter: "+10",
      counterLabel: "أعوام من الخبرة",
      vision: "رؤيتنا",
      visionText: "نهدف لتطوير العالم العربي، وأن يكون رائداً في مجال التكنولوجيا عالمياً.",
      mission: "رسالتنا",
      missionText: "مواكبة رؤية المملكة 2030 من خلال برمجة كل ما يساعد في ازدهار المستقبل.",
      certs: "اعتماد رسمي",
      certsText: "مسجّلون رسمياً لدى منشآت ووزارة التجارة ومنصة اعتماد ومصلحة الزكاة والدخل.",
    },
    services: {
      label: "الخدمات",
      title: "كل ما يحتاجه منتجك الرقمي، من الفكرة إلى الإطلاق.",
      intro: "ثمانية تخصّصات يعمل فيها فريق واحد بلغة واحدة.",
      view: "تفاصيل الخدمة",
      hint: "مرّر فوق الخدمة لاستعراضها",
    },
    work: {
      label: "أعمال مختارة",
      title: "منتجات حقيقية، تعمل الآن.",
      intro: "مواقع وتطبيقات وأنظمة صُمّمت وبُرمجت في كود لوب لعملاء في السعودية والمنطقة.",
      filters: [
        { key: "all", label: "الكل" },
        { key: "mobile", label: "تطبيقات الجوال" },
        { key: "web", label: "مواقع ومتاجر" },
        { key: "systems", label: "أنظمة وبرامج" },
        { key: "themes", label: "ثيمات سلة وزد" },
      ],
      view: "عرض المشروع",
      platforms: "المنصات",
      more: "جميع الأعمال على codlop.sa",
      motionCta: "أعمال الموشن والفيديو",
      themesLabel: "ثيمات سلة وزد",
      themesTitle: "ثيمات جاهزة لمتاجر سلة وزد",
      themesText: "مجموعة ثيمات مصمّمة ومطوّرة في كود لوب لمنصّتي سلة وزد.",
      empty: "لا توجد مشاريع في هذا التصنيف.",
      moreLabel: "المزيد من الأعمال",
      moreTitle: "مواقع ومتاجر وأنظمة أخرى نفّذناها",
    },
    why: {
      label: "لماذا كود لوب",
      title: "شراكة تقنية تحميك وتدعمك.",
      items: [
        { n: "24", title: "دعم فني شامل", text: "دعم فني ممتد لمساعدتك في كل مشكلة تواجهك، في خلال 24 ساعة." },
        { n: "01", title: "سيرفرات عالية الكفاءة", text: "أقوى سيرفرات عالية الكفاءة لضمان سرعة وأمان موقعك." },
        { n: "02", title: "شركة مسجّلة رسمياً", text: "شركة مرخّصة بسجل تجاري وبطاقة ضريبية، ومعتمدة لدى منشآت ومنصة اعتماد." },
        { n: "03", title: "عقد يضمن حق الطرفين", text: "عقد رسمي يحفظ حقوقك وحقوقنا في كل مشروع." },
        { n: "04", title: "الدقة والاحترافية", text: "لا ينتهي عملنا حتى نتأكد من رضاك عن الخدمة، بجودة عالية وبأسرع وقت." },
      ],
    },
    process: {
      label: "طريقة العمل",
      title: "مسار واضح من أول لقاء إلى الإطلاق.",
      steps: [
        { n: "01", title: "الاستكشاف", text: "مقابلة معك لفهم فكرتك وأهدافك وجمهورك." },
        { n: "02", title: "الاستراتيجية", text: "اجتماع استشاري نضع فيه الحلول والخطة المناسبة." },
        { n: "03", title: "التصميم", text: "واجهات وتجربة استخدام تعبّر عن علامتك بوضوح." },
        { n: "04", title: "التطوير", text: "برمجة بأداء عالٍ على أقوى السيرفرات." },
        { n: "05", title: "الإطلاق", text: "نشر المنتج ودعم فني مستمر بعد الإطلاق." },
      ],
    },
    cta: { line1: "لديك فكرة؟", line2: "لنحوّلها إلى تجربة رقمية.", button: "ابدأ مشروعك", whatsapp: "تواصل عبر واتساب" },
    contact: {
      label: "تواصل معنا",
      title: "لنبدأ الحديث عن مشروعك.",
      intro: "أرسل لنا تفاصيل فكرتك وسنعود إليك في أقرب وقت.",
      phone: "الهاتف",
      whatsapp: "واتساب",
      location: "الموقع",
      openMap: "فتح الخريطة",
      form: {
        name: "الاسم بالكامل",
        email: "البريد الإلكتروني",
        phone: "رقم الهاتف",
        subject: "عنوان الرسالة",
        message: "نص الرسالة",
        submit: "إرسال الطلب",
        sent: "تم تجهيز رسالتك — سيتم فتح واتساب لإرسالها.",
        sendingHint: "أو تواصل مباشرة عبر واتساب",
      },
    },
    footer: {
      about: "نسعى إلى الإرتقاء بمجال تكنولوجيا المعلومات من خلال تقديم تصميمات وبرمجيات فريدة من نوعها تتناسب مع جميع الأفراد والمؤسسات بأعلى جودة وفي أسرع وقت ممكن.",
      company: "الشركة",
      services: "الخدمات",
      contact: "التواصل",
      follow: "تابعنا",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      rights: "جميع الحقوق محفوظة © شركة كود لوب لتقنية المعلومات",
      back: "العودة للأعلى",
    },
  },
  en: {
    langName: "English",
    switchTo: "العربية",
    skip: "Skip to content",
    nav: { home: "Home", about: "About", services: "Services", work: "Projects", contact: "Contact", cta: "Start a project", menu: "Menu", close: "Close" },
    theme: { light: "Light mode", dark: "Dark mode", toggle: "Toggle theme" },
    hero: {
      eyebrow: "Saudi technology company — Buraydah, Al‑Qassim",
      line1: "We build digital experiences",
      line2: "that turn ideas into products.",
      statement:
        "CODLOP designs and develops websites, mobile apps and digital products — more than 10 years of building serious software for companies and individuals.",
      primary: "Start a project",
      secondary: "Explore our work",
      scroll: "Scroll",
      tags: ["Websites", "Mobile apps", "Management systems", "Salla & Zid themes", "Brand identity"],
    },
    about: {
      label: "About CODLOP",
      statement: "Trust built over time — more than 10 years of technology services.",
      para: "A technology company of Saudi origin with branches in other countries, officially certified. We aim to elevate the field of information technology with unique designs and software that fit individuals and organisations alike — at the highest quality, in the shortest time possible.",
      counter: "+10",
      counterLabel: "Years of experience",
      vision: "Vision",
      visionText: "To help develop the Arab world and see it lead in technology globally.",
      mission: "Mission",
      missionText: "To keep pace with Saudi Vision 2030 by building everything that helps the future flourish.",
      certs: "Officially registered",
      certsText: "Registered with Monsha'at, the Ministry of Commerce, the Etimad platform and the Zakat, Tax and Customs Authority.",
    },
    services: {
      label: "Services",
      title: "Everything your digital product needs, from idea to launch.",
      intro: "Eight disciplines, one team, one language.",
      view: "Service details",
      hint: "Hover a service to explore",
    },
    work: {
      label: "Selected work",
      title: "Real products, live today.",
      intro: "Websites, apps and systems designed and engineered at CODLOP for clients across Saudi Arabia and the region.",
      filters: [
        { key: "all", label: "All" },
        { key: "mobile", label: "Mobile apps" },
        { key: "web", label: "Web & stores" },
        { key: "systems", label: "Systems & software" },
        { key: "themes", label: "Salla & Zid themes" },
      ],
      view: "View project",
      platforms: "Platforms",
      more: "All projects on codlop.sa",
      motionCta: "Motion & video work",
      themesLabel: "Salla & Zid themes",
      themesTitle: "Ready‑made themes for Salla and Zid stores",
      themesText: "A collection of storefront themes designed and developed at CODLOP for the Salla and Zid platforms.",
      empty: "No projects in this category.",
      moreLabel: "More work",
      moreTitle: "More websites, stores and systems we've delivered",
    },
    why: {
      label: "Why CODLOP",
      title: "A technology partner that protects and supports you.",
      items: [
        { n: "24", title: "Comprehensive technical support", text: "Extended support to help with every issue you face — within 24 hours." },
        { n: "01", title: "High‑efficiency servers", text: "The strongest high‑efficiency servers to keep your site fast and secure." },
        { n: "02", title: "Officially registered company", text: "Licensed with a commercial registration and tax card, and certified with Monsha'at and Etimad." },
        { n: "03", title: "A contract that protects both parties", text: "A formal agreement that safeguards your rights and ours on every project." },
        { n: "04", title: "Precision and professionalism", text: "Our work isn't done until you're satisfied — high quality, delivered fast." },
      ],
    },
    process: {
      label: "Process",
      title: "A clear path from first meeting to launch.",
      steps: [
        { n: "01", title: "Discovery", text: "A meeting with you to understand the idea, goals and audience." },
        { n: "02", title: "Strategy", text: "A consulting session where we shape the right solutions and plan." },
        { n: "03", title: "Design", text: "Interfaces and experiences that express your brand clearly." },
        { n: "04", title: "Development", text: "High‑performance engineering on the strongest servers." },
        { n: "05", title: "Launch", text: "Release, followed by continuous technical support." },
      ],
    },
    cta: { line1: "Have an idea?", line2: "Let's turn it into a digital experience.", button: "Start a project", whatsapp: "Chat on WhatsApp" },
    contact: {
      label: "Contact",
      title: "Let's talk about your project.",
      intro: "Send us the details of your idea and we'll get back to you shortly.",
      phone: "Phone",
      whatsapp: "WhatsApp",
      location: "Location",
      openMap: "Open map",
      form: {
        name: "Full name",
        email: "Email",
        phone: "Phone",
        subject: "Subject",
        message: "Message",
        submit: "Send request",
        sent: "Your message is ready — WhatsApp will open to send it.",
        sendingHint: "Or reach us directly on WhatsApp",
      },
    },
    footer: {
      about: "We aim to elevate the field of information technology with unique designs and software that fit individuals and organisations alike — at the highest quality, in the shortest time possible.",
      company: "Company",
      services: "Services",
      contact: "Contact",
      follow: "Follow",
      privacy: "Privacy Policy",
      terms: "Terms",
      rights: "All rights reserved © Cod Lop Information Technology Co.",
      back: "Back to top",
    },
  },
};

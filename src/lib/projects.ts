import type { Lang } from "./content";

export type Category = "mobile" | "web" | "systems" | "themes";
export type Layout = "feature" | "wide" | "large" | "small";

export type Project = {
  slug: string;
  name: Record<Lang, string>;
  category: Category;
  categoryLabel: Record<Lang, string>;
  desc: Record<Lang, string>;
  platforms: string[];
  href: string;
  /** Local image path (public/projects/<slug>.webp) */
  image: string;
  /** Client logo, when codlop.sa provides one */
  logo?: string;
  /** Where the original screenshot lives on codlop.sa (for reference when replacing placeholders) */
  sourceImage: string;
  layout: Layout;
  year?: string;
};

const cat = {
  mobile: { ar: "تطبيق جوال", en: "Mobile app" },
  web: { ar: "موقع ومتجر", en: "Website & store" },
  systems: { ar: "نظام إداري", en: "Management system" },
  themes: { ar: "ثيم سلة / زد", en: "Salla / Zid theme" },
} satisfies Record<Category, Record<Lang, string>>;

export const PROJECTS: Project[] = [
  {
    slug: "aelty",
    name: { ar: "عائلتي", en: "Aelty" },
    category: "mobile",
    categoryLabel: cat.mobile,
    desc: {
      ar: "نظام عائلتي يوفر لك توثيق تاريخ عائلتك بكل سهولة وتعزيز الترابط والتواصل بين العائلة: شجرة العائلة، الأخبار والصور، الإحصائيات والاستشارات العائلية.",
      en: "A family network that documents your family history and strengthens connection: a family tree, news and photos, statistics, job postings and family consultations.",
    },
    platforms: ["Web", "Android", "iOS"],
    href: "https://3aelty.com/",
    image: "/projects/aelty.webp",
    logo: "/projects/logos/aelty.webp",
    sourceImage: "https://codlop.sa/images/portfolios1600900412.webp",
    layout: "feature",
  },
  {
    slug: "wastah",
    name: { ar: "واسطة", en: "Wastah" },
    category: "web",
    categoryLabel: { ar: "سوق إلكتروني", en: "Online marketplace" },
    desc: {
      ar: "سوق إلكتروني عالمي يجمع منتجات النساء والشباب والرجال والأطفال، بموقع وتطبيقين للجوال.",
      en: "A global online marketplace for women, youth, men and children — a website plus native mobile apps.",
    },
    platforms: ["Web", "Android", "iOS"],
    href: "https://wastah.store/",
    image: "/projects/wastah.webp",
    logo: "/projects/logos/wastah.webp",
    sourceImage: "https://codlop.sa/images/portfolios1010630774.webp",
    layout: "large",
  },
  {
    slug: "babsadaka",
    name: { ar: "باب صدقة", en: "Bab Sadaka" },
    category: "mobile",
    categoryLabel: cat.mobile,
    desc: {
      ar: "صدقة جارية لكل من توفى من أحبابك أو كان على قيد الحياة، من خلال واجهة إلكترونية مخصصة بالاسم الذي اخترته.",
      en: "Ongoing charity on behalf of loved ones, living or departed, through a dedicated digital page under the name you choose.",
    },
    platforms: ["Android"],
    href: "https://babsadaka.com/",
    image: "/projects/babsadaka.webp",
    logo: "/projects/logos/babsadaka.webp",
    sourceImage: "https://codlop.sa/images/portfolios824574222.webp",
    layout: "small",
  },
  {
    slug: "containers",
    name: { ar: "نظام الحاويات", en: "Container Rental System" },
    category: "systems",
    categoryLabel: cat.systems,
    desc: {
      ar: "نظام كامل لمؤسسات الحاويات لتنظيم عمليات إيجار الحاويات وتتبع المناديب والسائقين، بلوحة تحكم للإدارة وتطبيق لكل من المؤسسة والمندوب والسائق والعميل.",
      en: "A complete platform for container rental companies: rental operations, agent and driver tracking, an admin dashboard and dedicated apps for the company, agent, driver and customer.",
    },
    platforms: ["Web", "Android", "iOS"],
    href: "https://rent-co.org/",
    image: "/projects/containers.webp",
    logo: "/projects/logos/containers.webp",
    sourceImage: "https://codlop.sa/images/portfolios1708801370.webp",
    layout: "wide",
  },
  {
    slug: "byanshop",
    name: { ar: "بيان شوب", en: "Byan Shop" },
    category: "web",
    categoryLabel: { ar: "منصة كوبونات", en: "Coupons platform" },
    desc: {
      ar: "موقع إلكتروني متخصص في توفير كوبونات خصم وعروض ترويجية للمتاجر الإلكترونية، مع تطبيقات للجوال.",
      en: "A platform for discount coupons and promotional offers across online stores, with companion mobile apps.",
    },
    platforms: ["Web", "Android", "iOS"],
    href: "https://byan.shop/",
    image: "/projects/byanshop.webp",
    sourceImage: "https://codlop.sa/images/portfolios1666471314.webp",
    layout: "small",
  },
  {
    slug: "collector",
    name: { ar: "كولكتور", en: "Collector" },
    category: "web",
    categoryLabel: cat.web,
    desc: {
      ar: "متجر وتطبيق لحلول التخزين الآمن للمجوهرات والساعات والمقتنيات، بخيارات تخزين متعددة الأحجام.",
      en: "Store and app for secure storage solutions — jewellery, watches and collectibles — with storage options in every size.",
    },
    platforms: ["Web", "Android", "iOS"],
    href: "https://collectorgrp.com/ar",
    image: "/projects/collector.webp",
    sourceImage: "https://codlop.sa/images/portfolios439878820.webp",
    layout: "large",
  },
  {
    slug: "erp",
    name: { ar: "نظام ERP", en: "ERP System" },
    category: "systems",
    categoryLabel: cat.systems,
    desc: {
      ar: "نظام برمجي متكامل لإدارة وتنسيق جميع موارد وأقسام وأنشطة المؤسسة من منصة واحدة: الموارد البشرية، المحاسبة، المشتريات والمخزون، المبيعات، الإنتاج والتقارير.",
      en: "An integrated system to manage every resource, department and activity from one platform: HR, accounting, purchasing and inventory, sales, production and reporting.",
    },
    platforms: ["Web"],
    href: "https://cashir.codlop.sa/",
    image: "/projects/erp.webp",
    sourceImage: "https://codlop.sa/images/portfolios350886564.webp",
    layout: "small",
  },
  {
    slug: "realestate",
    name: { ar: "نظام إدارة مكاتب العقارات", en: "Real Estate Office System" },
    category: "systems",
    categoryLabel: cat.systems,
    desc: {
      ar: "نظام إلكتروني يساعد مكاتب العقارات على تنظيم وإدارة العمليات اليومية بكفاءة عالية: تسجيل العقارات، بيانات العملاء، العقود، المواعيد والتقارير.",
      en: "Helps real‑estate offices run daily operations efficiently: property registration, client data, contracts, appointments, deal tracking and reports.",
    },
    platforms: ["Web", "Android", "iOS"],
    href: "https://sadiq-eltajer.sa/",
    image: "/projects/realestate.webp",
    logo: "/projects/logos/realestate.webp",
    sourceImage: "https://codlop.sa/images/portfolios904336921.webp",
    layout: "large",
  },
  {
    slug: "siyanty",
    name: { ar: "صيانتي", en: "Siyanty" },
    category: "mobile",
    categoryLabel: cat.mobile,
    desc: {
      ar: "تطبيق يساعدك بكل سهولة على حل جميع مشاكل الصيانة الخاصة بالمكيفات لديك.",
      en: "An app that makes solving every air‑conditioning maintenance problem simple.",
    },
    platforms: ["Android", "iOS"],
    href: "https://seyanty.info/",
    image: "/projects/siyanty.webp",
    logo: "/projects/logos/siyanty.webp",
    sourceImage: "https://codlop.sa/images/portfolios1323747926.webp",
    layout: "small",
  },
  {
    slug: "tjawal",
    name: { ar: "تجوَّل", en: "Tjawal" },
    category: "web",
    categoryLabel: cat.web,
    desc: {
      ar: "منصة لمؤسسة تقدم خدمة استئجار السيارات للعملاء لفترات زمنية محددة — للمسافرين ورجال الأعمال والسيّاح.",
      en: "A car‑rental platform for fixed‑period hire — serving travellers, business professionals and tourists.",
    },
    platforms: ["Web"],
    href: "https://tjawal.com.sa/",
    image: "/projects/tjawal.webp",
    logo: "/projects/logos/tjawal.webp",
    sourceImage: "https://codlop.sa/images/portfolios607767708.webp",
    layout: "large",
  },
];

export type Theme = {
  slug: string;
  name: Record<Lang, string>;
  href: string;
  image: string;
  sourceImage: string;
};

export const THEMES: Theme[] = [
  { slug: "ebdaa", name: { ar: "إبداع", en: "Ebdaa" }, href: "https://codlop.sa/our-portfolio/42/ابداع", image: "/projects/theme-ebdaa.webp", sourceImage: "https://codlop.sa/images/portfolios2125067133.webp" },
  { slug: "oud", name: { ar: "عود", en: "Oud" }, href: "https://codlop.sa/our-portfolio/43/عود", image: "/projects/theme-oud.webp", sourceImage: "https://codlop.sa/images/portfolios128375941.webp" },
  { slug: "nova", name: { ar: "نوفا", en: "Nova" }, href: "https://codlop.sa/our-portfolio/44/نوفا", image: "/projects/theme-nova.webp", sourceImage: "https://codlop.sa/images/portfolios643037392.webp" },
  { slug: "bareeq", name: { ar: "بريق", en: "Bareeq" }, href: "https://codlop.sa/our-portfolio/45/بريق", image: "/projects/theme-bareeq.webp", sourceImage: "https://codlop.sa/images/portfolios89601672.webp" },
  { slug: "bahja", name: { ar: "بهجة", en: "Bahja" }, href: "https://codlop.sa/our-portfolio/46/بهجة", image: "/projects/theme-bahja.webp", sourceImage: "https://codlop.sa/images/portfolios2050985742.webp" },
  { slug: "diwan", name: { ar: "ديوان الأليف", en: "Diwan Al‑Aleef" }, href: "https://codlop.sa/our-portfolio/47/ديوان الأليف", image: "/projects/theme-diwan.webp", sourceImage: "https://codlop.sa/images/portfolios891245579.webp" },
  { slug: "naseej", name: { ar: "نسيج", en: "Naseej" }, href: "https://codlop.sa/our-portfolio/48/نسيج", image: "/projects/theme-naseej.webp", sourceImage: "https://codlop.sa/images/portfolios1675868157.webp" },
  { slug: "spark", name: { ar: "إسبارك", en: "Spark" }, href: "https://codlop.sa/our-portfolio/49/إسبارك", image: "/projects/theme-spark.webp", sourceImage: "https://codlop.sa/images/portfolios1838916744.webp" },
  { slug: "fenjal", name: { ar: "فنجال", en: "Fenjal" }, href: "https://codlop.sa/our-portfolio/50/فنجال", image: "/projects/theme-fenjal.webp", sourceImage: "https://codlop.sa/images/portfolios25728166.webp" },
  { slug: "trendy", name: { ar: "ترندي", en: "Trendy" }, href: "https://codlop.sa/our-portfolio/51/ترندي", image: "/projects/theme-trendy.webp", sourceImage: "https://codlop.sa/images/portfolios1065152503.webp" },
  { slug: "mathaq", name: { ar: "مذاق", en: "Mathaq" }, href: "https://codlop.sa/our-portfolio/52/مذاق", image: "/projects/theme-mathaq.webp", sourceImage: "https://codlop.sa/images/portfolios730745442.webp" },
];

/** The rest of the codlop.sa portfolio — shown as a compact grid under the showcase. */
export type MoreProject = {
  slug: string;
  name: Record<Lang, string>;
  category: Category | "design";
  categoryLabel: Record<Lang, string>;
  href: string;
  image: string;
};

const web = cat.web;
const store = { ar: "متجر إلكتروني", en: "Online store" };
const sys = cat.systems;
const pf = (id: number, name: string) => `https://codlop.sa/our-portfolio/${id}/${encodeURIComponent(name)}`;

export const MORE: MoreProject[] = [
  { slug: "shipping", name: { ar: "نظام إدارة شركات الشحن", en: "Shipping Companies System" }, category: "systems", categoryLabel: sys, href: pf(17, "نظام ادارة شركات الشحن"), image: "/projects/more/shipping.webp" },
  { slug: "abs", name: { ar: "حلول الأعمال المتقدمة", en: "Advanced Business Solutions" }, category: "systems", categoryLabel: sys, href: pf(28, "حلول الاعمال المتقدمة"), image: "/projects/more/abs.webp" },
  { slug: "rural", name: { ar: "الأجواء الريفية", en: "Al‑Ajwaa Al‑Reefiya" }, category: "web", categoryLabel: web, href: pf(3, "الأجواء الريفية"), image: "/projects/more/rural.webp" },
  { slug: "deqa", name: { ar: "شركة دقة القيمة", en: "Deqat Al‑Qeema Co." }, category: "web", categoryLabel: web, href: pf(6, "شركة دقة القيمة"), image: "/projects/more/deqa.webp" },
  { slug: "barq", name: { ar: "البرق الذهبي", en: "Al‑Barq Al‑Dhahabi" }, category: "web", categoryLabel: web, href: pf(9, "البرق الذهبي"), image: "/projects/more/barq.webp" },
  { slug: "garage", name: { ar: "كراج", en: "Garage" }, category: "web", categoryLabel: store, href: pf(10, "كراج"), image: "/projects/more/garage.webp" },
  { slug: "sare3", name: { ar: "سارع", en: "Sare3" }, category: "web", categoryLabel: web, href: pf(11, "سارع"), image: "/projects/more/sare3.webp" },
  { slug: "aram", name: { ar: "آرام المستقبل", en: "Aram Al‑Mustaqbal" }, category: "web", categoryLabel: web, href: pf(12, "آرام المستقبل"), image: "/projects/more/aram.webp" },
  { slug: "kadeh", name: { ar: "مركز الكادح للتدريب", en: "Al‑Kadeh Training Center" }, category: "web", categoryLabel: web, href: pf(14, "مركز الكادح للتدريب"), image: "/projects/more/kadeh.webp" },
  { slug: "waad", name: { ar: "شركة وعد", en: "Waad Co." }, category: "web", categoryLabel: web, href: pf(15, "شركة وعد"), image: "/projects/more/waad.webp" },
  { slug: "lens", name: { ar: "لينز", en: "Lens" }, category: "web", categoryLabel: store, href: pf(16, "لينز"), image: "/projects/more/lens.webp" },
  { slug: "ber", name: { ar: "جمعية البر", en: "Al‑Birr Society" }, category: "web", categoryLabel: web, href: pf(18, "جمعية البر"), image: "/projects/more/ber.webp" },
  { slug: "qassim-maint", name: { ar: "صيانة القصيم", en: "Qassim Maintenance" }, category: "web", categoryLabel: web, href: pf(21, "صيانة القصيم"), image: "/projects/more/qassim-maint.webp" },
  { slug: "radi", name: { ar: "شركة الراضي", en: "Al‑Radi Co." }, category: "web", categoryLabel: web, href: pf(22, "شركة الراضي"), image: "/projects/more/radi.webp" },
  { slug: "rajhi", name: { ar: "مؤسسة الراجحي", en: "Al‑Rajhi Est." }, category: "web", categoryLabel: web, href: pf(23, "مؤسسة الراجحي"), image: "/projects/more/rajhi.webp" },
  { slug: "dere3", name: { ar: "شركة الدرع", en: "Al‑Dere' Co." }, category: "web", categoryLabel: web, href: pf(25, "شركة الدرع"), image: "/projects/more/dere3.webp" },
  { slug: "aban", name: { ar: "مكتب أبان", en: "Aban Office" }, category: "web", categoryLabel: web, href: pf(26, "مكتب أبان"), image: "/projects/more/aban.webp" },
  { slug: "ordo", name: { ar: "الأوردو", en: "Al‑Ordo" }, category: "web", categoryLabel: store, href: pf(27, "الاوردو"), image: "/projects/more/ordo.webp" },
  { slug: "saedi", name: { ar: "عيناء أحمد الصاعدي", en: "Ainaa Ahmed Al‑Saedi" }, category: "web", categoryLabel: store, href: pf(29, "عيناء أحمد الصاعدي"), image: "/projects/more/saedi.webp" },
  { slug: "oxygen", name: { ar: "متجر أكسجين", en: "Oxygen Store" }, category: "web", categoryLabel: store, href: pf(30, "متجر اكسجين"), image: "/projects/more/oxygen.webp" },
  { slug: "tatreez", name: { ar: "تصاميم تطريز", en: "Embroidery Designs" }, category: "design", categoryLabel: { ar: "تصاميم مخصصة", en: "Custom designs" }, href: pf(20, "تصاميم تطريز"), image: "/projects/more/tatreez.webp" },
];

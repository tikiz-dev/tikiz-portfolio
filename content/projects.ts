export type CaseStudySection = {
  heading: string;
  body: string[];
};

export type CaseStudyMetric = {
  label: string;
  value: string;
  hint?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  year: number;
  role: string;
  roleEn: string;
  stack: string[];
  highlights: string[];
  highlightsEn: string[];
  url?: string;
  accent: "brand" | "warm";
  status: "live" | "development" | "soon";
  featured: boolean;

  /* Case-study-only fields (used by /work/[slug]) */
  industry: string;
  duration: string;
  challenge: string;
  approach: CaseStudySection[];
  outcome: string[];
  metrics: CaseStudyMetric[];

  /* Real screenshots in public/. Paired desktop + mobile when both
     exist — the visual component picks whichever fits the aspect. */
  screenshot?: {
    desktop: string; /* path under /public, e.g. "/work/wd/desktop.png" */
    mobile?: string;
    alt: string;
  };
};

export const PROJECTS: Project[] = [
  {
    slug: "weserbergland-dienstleistungen",
    title: "Weserbergland Dienstleistungen",
    tagline: "Vom WordPress-Relikt zur performanten Markenseite.",
    taglineEn: "From WordPress relic to performant brand site.",
    description:
      "Meine eigene Firma — eine Gebäudereinigung, die ich von Grund auf aufgebaut habe. " +
      "Relaunch der Website: Ablösung des alten WordPress-Systems durch einen modernen " +
      "Next.js-16-Stack mit Fokus auf Core Web Vitals, lokale SEO und klare Lead-Generierung.",
    descriptionEn:
      "My own company — a cleaning-services business I built from the ground up. " +
      "Website relaunch: replacing the legacy WordPress install with a modern Next.js 16 " +
      "stack, focused on Core Web Vitals, local SEO and clear lead generation.",
    year: 2026,
    role: "Konzept, Design & Entwicklung",
    roleEn: "Concept, design & development",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Motion",
      "Resend",
      "Vercel",
    ],
    highlights: [
      "8 Services · 4 Standorte · 22 FAQ-Einträge · Blog-System",
      "Core Web Vitals: alle grün, Lighthouse ≥ 95",
      "Code-basiertes CMS — Änderungen via Git, keine Plugin-Hölle",
      "Automatische OG-Bilder + JSON-LD für lokales SEO",
    ],
    highlightsEn: [
      "8 services · 4 locations · 22 FAQ entries · blog system",
      "Core Web Vitals all green, Lighthouse ≥ 95",
      "Code-based CMS — edits via Git, no plugin hell",
      "Automatic OG images + JSON-LD for local SEO",
    ],
    url: "https://weserbergland-dienstleistungen.de",
    accent: "brand",
    status: "live",
    featured: true,
    industry: "Gebäudereinigung · B2B-Dienstleistung",
    duration: "ca. 3 Wochen Konzept + Umsetzung",
    challenge:
      "Die alte WordPress-Seite war über Jahre mit Plugins zugepappt, " +
      "lud träge auf Mobile und konnte mit der gewachsenen Servicestruktur " +
      "(8 Leistungen, 4 Standorte) nicht mehr Schritt halten. Dazu kam ein " +
      "Update-Risiko: jedes Theme- oder Plugin-Update konnte die Seite zerlegen.",
    approach: [
      {
        heading: "Architektur statt Baukasten",
        body: [
          "Statt einen weiteren WordPress-Builder draufzustapeln, habe ich " +
            "einen sauberen Schnitt gemacht: Next.js 16 App Router mit " +
            "Server Components, Inhalte als typsichere TypeScript-Module unter " +
            "content/. Kein CMS-Overhead, kein Plugin-Risiko.",
          "Vorteil für später: Inhalte werden über Git versioniert. Jede " +
            "Änderung lässt sich nachvollziehen und im Zweifel rückgängig " +
            "machen — ohne Datenbank-Backups oder Plugin-Konflikte.",
        ],
      },
      {
        heading: "Performance als Default",
        body: [
          "Tailwind v4 statt vorgefertigter Theme-Stylesheets. Eigene Fonts " +
            "via next/font self-hosted, keine externen Requests. Bilder über " +
            "next/image automatisch in WebP/AVIF mit responsive Sizes.",
          "Resultat: Lighthouse-Score ≥ 95 in allen vier Kategorien, ohne " +
            "dass dafür an Funktionsumfang gespart wurde.",
        ],
      },
      {
        heading: "SEO mit echtem Schema.org",
        body: [
          'Lokale Suchanfragen wie "Gebäudereinigung Hameln" sind das ' +
            "Hauptgeschäft. Dafür: vollständige LocalBusiness-, Service- und " +
            "FAQPage-JSON-LD-Daten, automatische sitemap.xml und " +
            "dynamisch generierte OpenGraph-Bilder pro Seite.",
        ],
      },
    ],
    outcome: [
      "Komplette Ablösung der WordPress-Installation, keine Datenbank mehr nötig",
      "Deployment via Vercel — git push genügt für ein Live-Update",
      "Wartung reduziert auf TypeScript-Edits in 2–3 Dateien pro Inhaltsänderung",
      "Erste Lead-Anfragen bereits über das neue Kontaktformular eingegangen",
    ],
    metrics: [
      { label: "Lighthouse Performance", value: "97", hint: "Mobile" },
      { label: "First Contentful Paint", value: "0.9s", hint: "p75" },
      { label: "Bundle (First Load JS)", value: "112 kB" },
      { label: "Plugins", value: "0", hint: "vorher: 18" },
    ],
    screenshot: {
      desktop: "/work/wd/desktop.png",
      mobile: "/work/wd/mobile.png",
      alt: "Startseite der Weserbergland Dienstleistungen Website — Hero mit Headline „Gebäudereinigung, die Vertrauen schafft“",
    },
  },
  {
    slug: "immoakte",
    title: "immoakte — Protokoll-Pro",
    tagline: "Die digitale Akte für jedes Mietverhältnis.",
    taglineEn: "The digital file for every tenancy.",
    description:
      "SaaS-Produkt für Vermieter und Hausverwalter: digitale Übergabeprotokolle mit " +
      "Fotos, Signatur und DSGVO-konformer Archivierung. Free-Trial + On-Demand-Pricing " +
      "statt starrem Abo — zielgenau für Privatvermieter.",
    descriptionEn:
      "SaaS product for landlords and property managers: digital handover protocols " +
      "with photos, signature and GDPR-compliant archiving. Free trial + on-demand " +
      "pricing instead of rigid subscriptions — tailored for private landlords.",
    year: 2026,
    role: "Produkt, Architektur & Entwicklung",
    roleEn: "Product, architecture & development",
    stack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "Motion",
      "Stripe",
    ],
    highlights: [
      "Multi-Step-Editor mit Auto-Save & Offline-Fallback",
      "Signatur-Pad + PDF-Export mit eigenem Branding",
      "Hybrid-Pricing: Free · 9,90 € On-Demand · 14,99 €/Mo · Business",
      "DSGVO-konforme Archivierung als aktives Verkaufsargument",
    ],
    highlightsEn: [
      "Multi-step editor with auto-save and offline fallback",
      "Signature pad + PDF export with custom branding",
      "Hybrid pricing: Free · €9.90 on-demand · €14.99/mo · Business",
      "GDPR-compliant archiving as an active selling point",
    ],
    accent: "warm",
    status: "development",
    featured: true,
    industry: "PropTech · SaaS für Vermieter",
    duration: "laufendes Produkt — kontinuierliche Entwicklung seit Q1 2026",
    challenge:
      "Übergabeprotokolle zwischen Vermieter und Mieter sind in 2026 immer " +
      "noch oft handschriftlich auf Papier — fehleranfällig, schwer " +
      "archivierbar, im Streitfall problematisch. Bestehende Tools sind " +
      "entweder Enterprise-Software für Hausverwaltungen mit hohem Abo, oder " +
      "Excel-Listen mit DSGVO-Unsicherheit. Privatvermieter mit 1–5 Einheiten " +
      "fallen durchs Raster.",
    approach: [
      {
        heading: "Pricing-Modell zuerst, Feature-Set danach",
        body: [
          "Hybrid statt Abo: ein kostenloser Test, dann 9,90 € pro " +
            "Einzelprotokoll für Privatvermieter — kein Vertrag, keine " +
            "monatliche Last. Erst ab Pro (14,99 €/Monat, gedeckelt auf " +
            "30–50 Protokolle) lohnt sich Abo, ab Business mit Team-Lizenzen.",
          "Das senkt die Hürde für genau die Zielgruppe, die bisher " +
            "zwischen Excel und Enterprise-Software hängt.",
        ],
      },
      {
        heading: "Mobile-first Editor mit Auto-Save",
        body: [
          "Übergaben passieren in der Wohnung, nicht am Schreibtisch. " +
            "Multi-Step-Editor optimiert für Smartphone: Zimmer für Zimmer, " +
            "Foto für Foto, mit Auto-Save und Offline-Fallback. Signatur-Pad " +
            "direkt im Browser, kein App-Download nötig.",
          "PDF-Export mit eigenem Logo (Pro-Feature) macht das Protokoll " +
            "rechtssicher und brandbar.",
        ],
      },
      {
        heading: "DSGVO als Verkaufsargument",
        body: [
          "Vermieter haben echte Angst vor Bußgeldern bei falschem Umgang " +
            "mit Mieterdaten. Statt das zu verstecken, wird DSGVO-konforme " +
            "Archivierung aktiv vermarktet: Hosting in der EU, Verschlüsselung, " +
            "klare Lösch-Workflows.",
        ],
      },
    ],
    outcome: [
      "Beta läuft mit ersten Test-Vermietern aus dem persönlichen Netzwerk",
      "Geplant Q3 2026: KI-Zählerstand-Erkennung per Foto (OCR)",
      "Geplant Q4 2026: Team-Lizenzen für kleine Hausverwaltungen",
      "Architektur ist auf API-Export für ERP-Anbindung vorbereitet",
    ],
    metrics: [
      { label: "Pricing-Start", value: "9,90 €", hint: "On-Demand" },
      { label: "Free-Trial", value: "1 Protokoll", hint: "ohne Kreditkarte" },
      { label: "Pro-Limit", value: "30–50/Mo", hint: "Anti-Missbrauch" },
      { label: "Status", value: "Beta", hint: "Closed Testing" },
    ],
    screenshot: {
      desktop: "/work/immoakte/desktop.png",
      mobile: "/work/immoakte/mobile.png",
      alt: "Landing Page von immoakte — „Die digitale Akte für jedes Mietverhältnis“ mit Phone-Mockup",
    },
  },
];

export const getFeaturedProjects = () => PROJECTS.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

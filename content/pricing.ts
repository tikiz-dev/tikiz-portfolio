/**
 * Pricing-Daten für /pakete.
 *
 * Module sind die atomaren Bausteine mit festem Preis. Pakete sind definierte
 * Kombinationen von Modulen mit Bundle-Rabatt. Einzelmodule können jederzeit
 * zu- oder abgebucht werden — Preis ist reproduzierbar berechenbar:
 *
 *   Angebot = Paketpreis − entfernte Module + zusätzliche Module
 *
 * Quelle: docs/pricing-model.md (intern).
 */

export type ModuleCategory =
  | "foundation"
  | "pages"
  | "features"
  | "seo"
  | "design"
  | "compliance"
  | "post-launch";

export type PricingModule = {
  id: string;
  name: string;
  category: ModuleCategory;
  description: string;
  price: number; // netto EUR
  unit?: string; // z.B. "pro Seite", falls skalierend
  duration: string; // menschliche Dauer-Angabe
  note?: string;
  onRequestOnly?: boolean;
};

export type Package = {
  slug: "starter" | "standard" | "premium";
  name: string;
  emoji: string;
  tagline: string;
  audience: string;
  price: number; // netto EUR (nach Bundle-Rabatt)
  modulesum: number; // Modul-Summe vor Rabatt (für Transparenz)
  moduleIds: string[];
  duration: string;
  accent: "brand" | "warm";
  featured?: boolean;
  commonAddons?: string[];
};

export type WartungTier = {
  slug: "s" | "m" | "l";
  name: string;
  icon: string;
  pricePerMonth: number; // netto EUR
  includes: string[];
};

export const CATEGORY_LABELS: Record<ModuleCategory, string> = {
  foundation: "Foundation",
  pages: "Seiten",
  features: "Funktionen",
  seo: "SEO & Analytics",
  design: "Design & Content",
  compliance: "Compliance",
  "post-launch": "Post-Launch",
};

export const MODULES: PricingModule[] = [
  // Foundation
  { id: "F1", name: "Projekt-Setup & Deployment", category: "foundation", description: "Next.js 16, TypeScript, Tailwind v4, pnpm. GitHub-Repo, Vercel-Projekt, Domain-Anschluss, SSL, Staging + Production Envs.", price: 600, duration: "1 Tag" },
  { id: "F2", name: "Design-System", category: "foundation", description: "Brand-Farben als CSS-Variablen, Typografie (bis 2 Families, self-hosted), komplettes UI-Kit (Button, Card, Section, Badge, Input). Dark-Mode aktivierbar.", price: 1800, duration: "3 Tage" },
  { id: "F3", name: "Design-System Lean", category: "foundation", description: "Minimal-Variante: Farben, Typo, Button, Section, Container. Ausreichend für Onepage-Sites.", price: 900, duration: "1,5 Tage", note: "Alternative zu F2 bei kleinem Scope" },
  { id: "F4", name: "Core Web Vitals & Performance", category: "foundation", description: "Bilder-Optimierung via next/image, Font-Strategy, Bundle-Audit. Lighthouse \u2265 90 mobile als Abnahmekriterium.", price: 600, duration: "1 Tag" },
  { id: "F5", name: "Security-Header", category: "foundation", description: "CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy \u2014 alles Best-Practice.", price: 450, duration: "0,75 Tage" },
  { id: "F6", name: "Launch-Doku & Handover", category: "foundation", description: "Markdown-Doku: Env-Vars, How-to-Guides, Zug\u00e4nge dokumentiert. 30-Min-\u00dcbergabe-Call.", price: 450, duration: "0,75 Tage" },

  // Seiten
  { id: "B1", name: "Startseite", category: "pages", description: "Hero mit Headline + CTA, 4\u20135 Sektionen (Leistungen-Teaser, Trust, USPs, Final-CTA), mobile + desktop optimiert, iterative Design-Feedback-Runden.", price: 1800, duration: "3 Tage" },
  { id: "B2", name: "Standard-Seite", category: "pages", description: "F\u00fcr Team, Karriere, Kontakt, FAQ, \u00dcber uns. Bis zu 3 Sektionen, einheitliches Layout.", price: 600, unit: "pro Seite", duration: "1 Tag" },
  { id: "B3", name: "Leistungs-\u00dcbersichtsseite", category: "pages", description: "Grid aller Leistungen mit Teasern und Links auf Detailseiten.", price: 900, duration: "1,5 Tage" },
  { id: "B4", name: "Leistungs-Detailseite", category: "pages", description: "Pro Service: Scope, Zielgruppe, Benefits, CTA. Schema.org Service-Markup.", price: 450, unit: "pro Service", duration: "0,75 Tage" },
  { id: "B5", name: "Standort-Detailseite", category: "pages", description: "F\u00fcr lokales SEO (eine URL je Stadt/Region). Adresse, Einsatzgebiet, Karte, LocalBusiness-Schema.", price: 450, unit: "pro Standort", duration: "0,75 Tage" },
  { id: "B6", name: "Blog-System", category: "pages", description: "MDX-Setup, Listing + Detail-Template, Kategorien, Tags, Pagination, Lesezeit, OG-Bild pro Post.", price: 2400, duration: "4 Tage" },
  { id: "B7", name: "Impressum", category: "pages", description: "\u00a7 5 TMG + \u00a7 18 MStV vollst\u00e4ndig, IHK/Aufsichtsbeh\u00f6rde recherchiert, VSBG-Hinweis.", price: 450, duration: "0,75 Tage" },
  { id: "B8", name: "Datenschutzerkl\u00e4rung", category: "pages", description: "Alle genutzten Dienste dokumentiert, Rechtsgrundlagen, Betroffenenrechte \u2014 auf aktuellem Stand der Rechtsprechung.", price: 750, duration: "1,25 Tage" },

  // Funktionen
  { id: "C1", name: "Kontaktformular Basis", category: "features", description: "Felder minimal, Honeypot, Validierung Client + Server mit Zod, E-Mail-Versand via Resend, DSGVO-Consent.", price: 600, duration: "1 Tag" },
  { id: "C2", name: "Rate-Limiting Add-on", category: "features", description: "Upstash Redis, z. B. 5 Anfragen pro IP pro Stunde. Add-on zu Formularen.", price: 300, duration: "0,5 Tage" },
  { id: "C3", name: "Multi-Step-Formular", category: "features", description: "Mehrstufig mit konditionalen Feldern (Show/Hide Logic), Progress-Indikator, Zur\u00fcck-Navigation.", price: 1500, duration: "2,5 Tage", note: "Beinhaltet Basis-Formular, nicht zus\u00e4tzlich buchen" },
  { id: "C4", name: "Branded Best\u00e4tigungsmail", category: "features", description: "HTML-Template mit Logo, Gradient, CTA, personalisiertem Text.", price: 450, duration: "0,75 Tage" },
  { id: "C5", name: "App-/Deep-Link-Integration", category: "features", description: "Prominente Buttons (z. B. \u201eKundenanfrage\u201c / \u201eBewerbung\u201c) mit UTM-Tracking.", price: 450, duration: "0,75 Tage" },
  { id: "C6", name: "Buchungs-Embed", category: "features", description: "Cal.com, Calendly oder TidyCal als Inline-Embed oder Popup.", price: 300, duration: "0,5 Tage" },
  { id: "C7", name: "Google Maps Embed", category: "features", description: "Keyless iframe mit \u201eIn Google Maps \u00f6ffnen\u201c-Link.", price: 150, duration: "0,25 Tage" },
  { id: "C8", name: "Google Reviews Widget", category: "features", description: "Live via Places API (New), 5-Sterne-Filter. Fallback auf statischen CTA bei fehlenden Keys.", price: 900, duration: "1,5 Tage" },
  { id: "C9", name: "Newsletter-Anbindung", category: "features", description: "Brevo, Mailchimp oder Resend Broadcasts. Double-Opt-In, DSGVO-konform.", price: 900, duration: "1,5 Tage" },
  { id: "C10", name: "Sprachumschalter + 1 Sprache", category: "features", description: "next-intl Setup, Middleware, Routing, Messages-JSON.", price: 1800, duration: "3 Tage" },
  { id: "C11", name: "Weitere Sprache", category: "features", description: "Zus\u00e4tzliche Messages-JSON zur Mehrsprachigkeit (nach C10).", price: 900, unit: "pro Sprache", duration: "1,5 Tage" },
  { id: "C12", name: "Cookie-Consent-Banner", category: "features", description: "Granular (notwendig / Analytics / Marketing getrennt), Re-Consent nach Ablauf.", price: 600, duration: "1 Tag" },

  // SEO
  { id: "D1", name: "On-Page-SEO-Basis", category: "seo", description: "Meta-Title + Description pro Seite, Open Graph + Twitter Cards, Canonical-URLs, sitemap.xml, robots.txt.", price: 600, duration: "1 Tag" },
  { id: "D2", name: "Strukturierte Daten (JSON-LD)", category: "seo", description: "LocalBusiness, Service, FAQPage, BreadcrumbList \u2014 validiert \u00fcber Google Rich Results Test.", price: 600, duration: "1 Tag" },
  { id: "D3", name: "Dynamische OG-Bilder", category: "seo", description: "Automatisch generierte Social-Share-Bilder pro Seite mit Brand-Elementen via Satori.", price: 300, duration: "0,5 Tage" },
  { id: "D4", name: "Search Console + Indexierung", category: "seo", description: "Domain-Property verifiziert, Sitemap eingereicht, Top-5-URLs manuell indexiert.", price: 150, duration: "0,25 Tage" },
  { id: "D5", name: "Google Business Profile", category: "seo", description: "Eintrag verifiziert/beantragt, Leistungen und \u00d6ffnungszeiten eingepflegt, NAP-Konsistenz zur Website.", price: 450, duration: "0,75 Tage" },
  { id: "D6", name: "Analytics GA4 mit Consent", category: "seo", description: "GA4 Property, consent-gated Script-Loader, IP-Anonymisierung, Signale deaktiviert.", price: 450, duration: "0,75 Tage" },
  { id: "D7", name: "Custom Conversions", category: "seo", description: "Events f\u00fcr Formular-Absenden, CTA-Klicks, Telefon/Mail-Klicks, Scroll-Tiefe.", price: 450, duration: "0,75 Tage" },

  // Design & Content
  { id: "E1", name: "Logo-Design (neu)", category: "design", description: "3 Konzepte \u2192 Feedback \u2192 2 Ausarbeitungen \u2192 1 Finalisierung. SVG + PNG, Dark-/Light-Varianten.", price: 3000, duration: "5 Tage" },
  { id: "E2", name: "Logo-Anpassung", category: "design", description: "Aus bestehendem Logo: Farb-Varianten, Export-Sets, saubere SVG-Version.", price: 750, duration: "1,25 Tage" },
  { id: "E3", name: "Favicon- & Icon-Set", category: "design", description: "Favicon, Apple-Icon, OG-Image-Defaults \u2014 konsistent mit Brand.", price: 300, duration: "0,5 Tage" },
  { id: "E4", name: "Texterstellung", category: "design", description: "Pro Seite 400\u2013600 W\u00f6rter, SEO-optimiert f\u00fcr lokale Keywords. Eine Feedback-Runde + Finalisierung.", price: 600, unit: "pro Seite", duration: "1 Tag pro Seite" },
  { id: "E5", name: "Foto-Shooting-Koordination", category: "design", description: "Fotografen-Empfehlung, Terminabstimmung, Briefing, Bildauswahl nach Shooting. Shooting-Kosten zahlt Kunde separat an Fotografen.", price: 450, duration: "0,75 Tage", onRequestOnly: true, note: "Nur auf explizite Anfrage \u2014 Standardfall: Kunde organisiert Shooting selbst" },
  { id: "E6", name: "Stock-Bildauswahl + Lizenz", category: "design", description: "Bis zu 10 kuratierte Bilder aus lizenzfreien Quellen (Unsplash+, Adobe Stock). Lizenzen beim Kunden.", price: 300, duration: "0,5 Tage" },

  // Compliance
  { id: "F_BFSG", name: "BFSG-Audit + Fixes", category: "compliance", description: "WCAG 2.1 AA vollst\u00e4ndig durchgegangen: Keyboard-Navigation, Focus-Ringe, Alt-Texte, ARIA-Labels, Kontraste. Lighthouse Accessibility \u2265 95. Pflicht f\u00fcr kommerzielle Seiten seit 28.06.2025.", price: 1800, duration: "3 Tage" },
  { id: "F_AVV", name: "AVV-Pack", category: "compliance", description: "Liste aller Auftragsverarbeiter mit Links zu deren AVV-Vorlagen. Kunde unterschreibt selbst.", price: 300, duration: "0,5 Tage" },

  // Post-Launch
  { id: "G1", name: "301-Redirects (bis 10 URLs)", category: "post-launch", description: "Recherche alter URLs, Mapping auf neue, Redirect-Config. Verhindert SEO-Verluste beim Relaunch.", price: 450, duration: "0,75 Tage" },
  { id: "G2", name: "301-Redirects (bis 30 URLs)", category: "post-launch", description: "Wie G1, gr\u00f6\u00dferer Umfang.", price: 750, duration: "1,25 Tage", note: "Nicht mit G1 kombinieren" },
  { id: "G3", name: "Content-Migration", category: "post-launch", description: "Aus WordPress, Wix, Webflow oder statischem HTML. Content-Extraktion + Re-Formatierung.", price: 900, unit: "pro 10 Seiten", duration: "1,5 Tage pro 10 Seiten" },
  { id: "G4", name: "Uptime-Monitoring", category: "post-launch", description: "Better Stack oder UptimeRobot eingerichtet, Benachrichtigung per Mail/WhatsApp.", price: 300, duration: "0,5 Tage" },
  { id: "G5", name: "Sentry Error-Monitoring", category: "post-launch", description: "Sentry-Projekt, Source-Maps, Alerts bei Fehlern.", price: 300, duration: "0,5 Tage" },
];

export const PACKAGES: Package[] = [
  {
    slug: "starter",
    name: "Starter",
    emoji: "🌱",
    tagline: "Landing-Page / Onepage",
    audience:
      "Einzelkämpfer, Coaches, Handwerker, frisch gestartete Selbständige. 1 Kernleistung, Fokus Lead-Formular.",
    price: 6750,
    modulesum: 7950,
    moduleIds: [
      "F1", "F3", "F4", "F5", "F6",
      "B1", "B7", "B8",
      "C1", "C4",
      "D1",
      "E3",
    ],
    duration: "ca. 10\u201312 Arbeitstage",
    accent: "brand",
    commonAddons: ["E4", "C12", "F_BFSG"],
  },
  {
    slug: "standard",
    name: "Standard",
    emoji: "🌳",
    tagline: "Firmen-Website",
    audience:
      "Lokale Dienstleister mit Team, Karriere und mehreren Leistungen. Der Regelfall.",
    price: 13500,
    modulesum: 15900,
    moduleIds: [
      "F1", "F2", "F4", "F5", "F6",
      "B1", "B3", "B2", "B2", "B2", "B7", "B8",
      "C1", "C2", "C4", "C7", "C12",
      "D1", "D2", "D4", "D6",
      "E3",
      "F_BFSG", "F_AVV",
    ],
    duration: "ca. 22\u201328 Arbeitstage",
    accent: "warm",
    featured: true,
    commonAddons: ["E4", "B4", "C5", "C6", "D5", "C8"],
  },
  {
    slug: "premium",
    name: "Premium",
    emoji: "🏛️",
    tagline: "Full-Stack-Website",
    audience:
      "Firmen mit mehreren Standorten, Service-Detailseiten, Blog, Integrationen und anspruchsvollem SEO.",
    price: 21500,
    modulesum: 25050,
    moduleIds: [
      // Alles aus Standard
      "F1", "F2", "F4", "F5", "F6",
      "B1", "B3", "B2", "B2", "B2", "B7", "B8",
      "C1", "C2", "C4", "C7", "C12",
      "D1", "D2", "D4", "D6",
      "E3",
      "F_BFSG", "F_AVV",
      // Premium-Zusatz
      "B4", "B4", "B4", "B5", "B5", "B6",
      "C5", "C8",
      "D3", "D5", "D7",
      "G1", "G3", "G4", "G5",
    ],
    duration: "ca. 24–30 Arbeitstage",
    accent: "brand",
    commonAddons: ["E4", "C9", "C10"],
  },
];

export const WARTUNG: WartungTier[] = [
  {
    slug: "s",
    name: "Care S",
    icon: "🛡️",
    pricePerMonth: 49,
    includes: [
      "Dependency-Updates monatlich",
      "Security-Advisory-Monitoring",
      "Uptime-Monitoring mit Benachrichtigung",
      "Git-Backup-Verifikation",
      "0,5 Stunden Kleinänderungen inkl. (rollover max 3 Monate)",
    ],
  },
  {
    slug: "m",
    name: "Care M",
    icon: "🔧",
    pricePerMonth: 149,
    includes: [
      "Alles aus Care S",
      "2 Stunden Kleinänderungen inkl.",
      "Quartalsweise Lighthouse + Core-Web-Vitals-Report",
      "Quartalsweise Search-Console-Auswertung",
    ],
  },
  {
    slug: "l",
    name: "Care L",
    icon: "🚀",
    pricePerMonth: 349,
    includes: [
      "Alles aus Care M",
      "5 Stunden / Monat inkl.",
      "1 Blog-Post / Monat inkl. SEO (bis 800 Wörter)",
      "Monatlicher Strategie-Call (30 Min)",
    ],
  },
];

export const HOURLY_RATE_WITHOUT_CARE = 95;
export const BUNDLE_DISCOUNT = 0.15;
export const VAT_RATE = 0.19;

export function getModule(id: string): PricingModule | undefined {
  return MODULES.find((m) => m.id === id);
}

/** Liefert Module mit ihren Counts, wie sie in einem Paket enthalten sind. */
export function getPackageModules(
  pkg: Package
): Array<{ module: PricingModule; count: number }> {
  const counts = new Map<string, number>();
  for (const id of pkg.moduleIds) {
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([id, count]) => {
      const m = getModule(id);
      return m ? { module: m, count } : null;
    })
    .filter((x): x is { module: PricingModule; count: number } => x !== null);
}

/** Nur Module, die öffentlich einzeln buchbar sind (keine „onRequest"-Sachen). */
export const PUBLIC_MODULES = MODULES.filter((m) => !m.onRequestOnly);

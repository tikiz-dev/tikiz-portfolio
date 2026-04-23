# Website-Erstellung — Kompletter Prozess

Interne Referenzdokumentation aller Schritte, die in ein Website-Projekt fließen — von der ersten Idee bis zur letzten SEO-Optimierung. Basis für die Paketierung von Leistungen für Neukunden (Basic / Pro / Premium o. ä.). Die Liste wird lebend gepflegt — alles, was in konkreten Projekten gemacht wird, fließt hier rein.

**Zuletzt aktualisiert:** 2026-04-22
**Basis-Projekt:** weserbergland-dienstleistungen.de (live seit 2026-04-22)

---

## 1. Konzept & Positionierung

- **Erstgespräch** — Zielgruppe, Wettbewerb, Geschäftsmodell, Kernleistungen verstehen
- **USP & Messaging** — was unterscheidet den Kunden vom Markt, welche Sprache spricht die Zielgruppe
- **Service-Portfolio strukturieren** — Hauptleistungen, Unterleistungen, Kategorien definieren
- **Geografische Einsatzgebiete** klären (wichtig für lokales SEO)
- **Kernversprechen** ausformulieren (Tagline, 1-Satz-Pitch)
- **Erfolgskriterien** — was soll die Website leisten (Leads, Kontakte, Termine, Shop-Umsatz …)

## 2. Brand & Design-System

- **Logo-Analyse / -Erstellung** — Vektorquelle (`.ai`, `.svg`) sichern, Abwandlungen (mono-dark, mono-light, color) erzeugen
- **Farbpalette** — Brand-Primär + ausgewogene 50/100/…/950 Skala
- **Typografie** — 1–2 Schriftfamilien (z. B. eine Serif + eine Sans), self-hosted oder über `next/font/google`
- **Bildsprache** definieren (Stimmung, Licht, Stil) — davon ausgehend Bildauswahl
- **Design-Tokens in Code** abbilden (CSS-Variablen, Tailwind-Theme)
- **Komponenten-Basis** — Button, Card, Section, Container, Input mit konsistenten Spacings & Radien

## 3. Technik-Stack & Projekt-Setup

- **Framework** — Next.js (aktuelle Version) mit App Router
- **Styling** — Tailwind CSS + CSS-Variablen für Tokens
- **Type-Safety** — TypeScript von Anfang an
- **Package-Manager** — pnpm (Workspace-fähig)
- **Ordner-Struktur** — `app/(marketing)`-Gruppe für öffentliche Seiten, `components/{ui,sections,forms,…}`, `content/` für strukturierte Inhalte, `lib/` für Utils
- **Repo anlegen** (privat auf GitHub), `main`-Branch als Haupt-Branch
- **Hosting** — Vercel, via CLI oder Git-Integration verbunden

## 4. Content-Architektur

- **Seitenplan** — welche Seiten gibt es (Home, Leistungen-Übersicht + Detail, Standorte, Über uns, FAQ, Blog, Kontakt, Legal)
- **URL-Struktur** — sprechende, deutsche URLs (`/leistungen/unterhaltsreinigung/buero`)
- **Content-Dateien** als typisiertes TS (Services, Standorte, FAQ, Blog-Posts) — keine CMS-Komplexität, wenn nicht nötig
- **Blog-System** — MDX oder TSX-Posts, Listing + Detail-Template
- **Content-Tonalität** — fließend, konkret, ohne Marketing-Sprech
- **Alt-Texte** für alle Bilder — beschreibend, nicht werblich

## 5. Seiten-Aufbau

- **Hero-Sektion** mit klarem Versprechen + primärem CTA
- **Leistungs-Bento / -Grid** mit visueller Hierarchie
- **Trust-Elemente** (Pillars, Prozess, Zahlen, Zertifikate, Kundenlogos)
- **Detailseiten pro Leistung** mit Scope, Benefits, Zielgruppe, CTA, Schema.org Service-Markup
- **Standort-Detailseiten** für lokales SEO (je Stadt eine URL)
- **Final-CTA-Sektion** am Ende jeder Seite
- **Responsive von Anfang an** — Mobile-First, aber auch 4K-Desktop testen
- **Scroll-Reveal-Animationen** dezent (nicht nervig)

## 6. Formulare & Lead-Erfassung

- **Kontaktformular** — Felder minimal halten, klare Beschriftung
- **Validierung** — clientseitig + serverseitig mit Zod
- **E-Mail-Versand** über transaktionalen Provider (Resend)
- **Absender-Domain** als Subdomain (`send.domain.de`) einrichten — DKIM/SPF/MX
- **Reply-To** auf Kundenadresse setzen, damit Antworten direkt gehen
- **Honeypot** gegen Bots
- **Rate-Limiting** (Upstash Redis) — z. B. 5 Anfragen pro IP / Stunde
- **Double-Opt-In / Datenschutz-Checkbox** mit Link zur Datenschutzerklärung
- **Optional: CAPTCHA** (hCaptcha / Cloudflare Turnstile) bei hohem Spam-Risiko
- **Bestätigungsmail** an den Kunden (optional, aber kundenfreundlich)

## 7. Rechtliches (DE-spezifisch)

- **Impressum** nach §5 TMG + §18 MStV — vollständig mit USt-IdNr, Verantwortlichem, VSBG-Hinweis
- **Datenschutzerklärung** — umfassend, alle Dienste erwähnen (Hosting, Analytics, Mail-Provider, Fonts, CDN …), Rechtsgrundlagen, Betroffenenrechte, zuständige Aufsichtsbehörde
- **Cookie-Consent-Banner** — granular (notwendig / Analytics / Marketing separat), funktional nicht vor Einwilligung laden
- **Widerrufsseite** (bei B2C-Shop)
- **AGB** (bei B2B optional, bei B2C teilweise Pflicht)
- **Barrierefreiheitserklärung** seit 28.06.2025 Pflicht für kommerzielle Websites (BFSG / WCAG 2.1 AA)
- **Auftragsverarbeitungsverträge** (AVVs) mit allen Datenverarbeitern abschließen (Vercel, Resend, Upstash, Google …)

## 8. Accessibility & UX-Qualität

- **Semantic HTML** — korrekte Heading-Hierarchie, Landmarks, `<nav>`, `<main>`, `<footer>`
- **Kontraste** mindestens 4.5:1 (WCAG AA)
- **Keyboard-Navigation** komplett testen — Tab-Reihenfolge, Focus-Ringe sichtbar
- **Alt-Texte** für alle informationstragenden Bilder, leere `alt=""` für dekorative
- **ARIA nur wo nötig** — semantisches HTML bevorzugen
- **Skip-Links** zum Hauptinhalt
- **Touch-Ziele** mind. 44×44 px
- **Reduced-Motion** respektieren (`prefers-reduced-motion`)

## 9. Performance

- **Bilder**: Next.js `<Image>` mit automatischem AVIF/WebP, Lazy-Loading, responsive `sizes`
- **Fonts**: `display: swap`, nur benötigte Weights, self-hosted oder `next/font` mit Subset
- **JavaScript-Budget** niedrig halten — Server-Components wo möglich, Client-Components nur bei Interaktion
- **Third-Party-Scripts** mit `next/script` und `strategy="afterInteractive"`
- **Lighthouse / PageSpeed Insights** — Scores > 90 auf Mobile anstreben
- **Core Web Vitals** überwachen (LCP < 2.5s, CLS < 0.1, INP < 200ms)

## 10. Security-Header & Best Practices

- **Content-Security-Policy** (bei Bedarf striktere Variante)
- **Strict-Transport-Security** (HSTS) mit `max-age=63072000; includeSubDomains; preload`
- **X-Frame-Options: DENY** gegen Clickjacking
- **X-Content-Type-Options: nosniff**
- **Referrer-Policy: strict-origin-when-cross-origin**
- **Permissions-Policy** — sensible Browser-APIs deaktivieren
- **Cross-Origin-Opener-Policy: same-origin**
- **`poweredByHeader: false`** in Next.js
- **Secrets ausschließlich in Env-Vars**, niemals committed

## 11. SEO — On-Page

- **Meta-Title & -Description** pro Seite individuell, keyword-bewusst, unter 60/160 Zeichen
- **Open Graph + Twitter Cards** für Social-Share-Previews
- **Dynamisches OG-Image** (`app/opengraph-image.tsx`) mit Brand-Elementen
- **Canonical-URLs** auf jeder Seite
- **Heading-Struktur** (H1 einmalig pro Seite, H2/H3 logisch verschachtelt)
- **Keyword-Recherche** für Hauptdienste + Städte kombinieren („Büroreinigung Hameln")
- **Strukturierte Daten (JSON-LD)** — LocalBusiness, Service, FAQ, BreadcrumbList, Article (Blog)
- **Sitemap** automatisch generiert (`app/sitemap.ts`)
- **robots.txt** (`app/robots.ts`) — `/api/` blockiert, Rest erlaubt
- **Interne Verlinkung** — jede Seite von mind. 2 anderen erreichbar
- **301-Redirects** von alten URLs bei Relaunch (`next.config.ts → redirects()`)

## 12. SEO — Off-Page & Tools

- **Google Search Console** einrichten, Domain-Property mit DNS-Verifikation. Bei Domains die bei one.com, GoDaddy, Google Domains etc. registriert sind, erkennt Google das häufig automatisch („Inhaberschaft automatisch bestätigt") — kein DNS-Record nötig.
- **Sitemap einreichen** in Search Console
- **URL-Inspection / Indexierung beantragen** für Top-5-Seiten (Quota: 10–12 / Tag). Jede URL einzeln: Suchleiste → URL eingeben → Enter → „Indexierung beantragen" → „Schließen".
- **Bing Webmaster Tools** einrichten per Import aus Google Search Console (Google-Login bei Bing-Seite → „Import" → GSC-OAuth-Flow → gewünschte Property anhaken → Sitemap separat manuell einreichen). Keine eigene Verifizierung nötig.
- **Google Business Profile** — Firmen­profil einrichten oder verifizieren, Website verknüpfen, Öffnungszeiten, Leistungen, Fotos
- **Google Maps**-Eintrag — Name, Adresse, Telefon konsistent zur Website (NAP)
- **Branchenverzeichnisse** — Gelbe Seiten, Dasauge, Wer liefert was (B2B), lokale Branchenbücher

## 13. Analytics & Tracking

- **Google Analytics 4** einrichten — consent-gated laden (Component lädt `gtag.js` erst nach Cookie-Akzeptanz)
- **`NEXT_PUBLIC_GA_ID`** als Env-Var setzen, IP-Anonymisierung (`anonymize_ip: true`) aktiv
- **Datenstream-URL** prüfen (soll auf Hauptdomain zeigen, nicht auf die `*.vercel.app`-Preview-URL — initial setzt Vercel die Preview-URL automatisch)
- **Ziele / Conversions** definieren (Kontaktformular-Absendung, Telefonklick, E-Mail-Klick, Scroll-Tiefe)
- **GA-Datenstream-URL** auf Haupt­domain setzen
- **Eigenen Traffic** filtern (IP-Filter)
- **Datenschutz**: IP-Anonymisierung, „Signale" deaktivieren, SCC-Hinweis in Datenschutz
- **Optional: Plausible / Fathom / Umami** als DSGVO-freundlichere Alternative

## 14. Indexierung beschleunigen

- **Sitemap in Search Console** einreichen (sofort)
- **Indexierung für Top-5-URLs** manuell beantragen (URL-Inspection)
- **Interne Links** sauber setzen (Google crawlt von dort weiter)
- **External Backlinks** aus relevanten Quellen (Branchenbücher, Partnerseiten)
- **Sitemap-Ping** an Bing / IndexNow (automatisierbar)
- **Keine `noindex`** auf produktiven Seiten (prüfen!)

## 15. Third-Party-Einbindungen

- **Google Maps Embed** (keyless iframe mit `?q=&output=embed`) — kein API-Key für einfache Einbindung nötig, „In Maps öffnen"-Link für Route & Bewertungen
- **Google Reviews Widget** — Places API (New) mit `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID`, Fallback auf statischen CTA wenn keine Keys.
  Setup-Reihenfolge: GCP-Projekt anlegen → Rechnungskonto verknüpfen (falls nicht schon vorhanden) → „Places API (New)" aktivieren (EWR-Nutzungsbedingungen explizit mit „Bestätigen" bestätigen) → API-Key wird automatisch erzeugt → Key einschränken auf genau „Places API (New)" (API-Restrictions, nicht HTTP-Referrer — Server-Call hat keinen Referrer) → Budget-Alert in Abrechnung anlegen (z. B. 5 €/Monat mit 50/90/100 %-Benachrichtigungen).
  **Fallstrick**: Beim Setzen der Env-Vars via `echo "KEY" | vercel env add` wird ein `\n` ans Ende angehängt — führt zu 4xx-Fehler bei der API und einer stumm versagenden Komponente. Stattdessen `printf "KEY" | vercel env add ...` verwenden oder die Werte im Vercel-Dashboard manuell einfügen.
  **Place ID ermitteln**: `curl -X POST https://places.googleapis.com/v1/places:searchText -H "X-Goog-Api-Key: <key>" -H "X-Goog-FieldMask: places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount" -d '{"textQuery": "Firmenname Straße PLZ Ort"}'` — liefert den kanonischen `ChIJ...`-Place-ID.
- **Kundenlogos / Referenzen** — mit Einwilligung einbinden (schriftliche Freigabe einholen)
- **Testimonials** — mit Name, Firma, Position, Foto (optional)
- **Social-Links** — LinkedIn, Instagram, Facebook, falls aktiv genutzt
- **Newsletter-Integration** (optional) — Mailchimp, Brevo, Resend Broadcasts

## 16. Deploy & Domain

- **Vercel-Projekt** anlegen, Environment-Variablen setzen (Production, Preview, Development getrennt)
- **Preview-Deploy** zum Testen, dann Production-Deploy
- **Custom-Domain** an Vercel hängen (A-Record `@` → `76.76.21.21`, CNAME `www`)
- **MX-Records unberührt lassen** (bei E-Mail-Hosting beim Registrar bleiben)
- **SSL-Zertifikat** (Let's Encrypt via Vercel, automatisch)
- **HSTS preload** erst, wenn Seite nachweislich stabil auf HTTPS läuft
- **Weiterleitung** `http → https` (Vercel macht das automatisch)
- **Weiterleitung** `www → apex` (oder umgekehrt) einheitlich

## 17. Monitoring & Wartung

- **Uptime-Monitoring** (Vercel, Better Stack, UptimeRobot)
- **Error-Monitoring** (Sentry o. ä.)
- **Dependency-Updates** monatlich (Renovate, Dependabot)
- **Security-Advisories** beobachten
- **Backup** — Git ist das Backup; Content-Datenbank (falls vorhanden) extra sichern
- **Review-Zyklus**: vierteljährlich Lighthouse + Search-Console prüfen, alle 6 Monate Content-Audit

## 18. Favicon & Icons

- **`app/icon.svg`** für Tab-Favicon (solid, ohne Feinheiten, brand-farbig)
- **`app/apple-icon.tsx`** für iOS-Home-Screen (180×180 PNG via Satori)
- **`app/favicon.ico`** als Fallback für alte Browser
- **OG-Image** (`app/opengraph-image.tsx`)
- **Alle Icons konsistent** — gleiches Brand-Element, gleiche Hintergrundfarbe

## 19. Übergabe & Dokumentation für Kund:innen

- **Zugänge** übergeben (Vercel-Mitgliedschaft, Google-Konten als Eigentümer)
- **Env-Var-Liste** mit Erklärung was wofür ist
- **How-to-Content-Update** (wie Blogpost hinzufügen, wie Leistung ändern)
- **Support-Modell** definieren (Wartungsvertrag, Stundenbudget, on-demand)
- **Kontakt-Eskalation** für kritische Ausfälle

## 20. Nach dem Launch — Wachstum

- **Content-Pipeline**: monatlich 1–2 Blogposts zu lokalen / fachlichen Themen
- **Backlink-Aufbau** — Kooperationen, Gastbeiträge, lokale Partner
- **Google-Rezensionen** aktiv einholen (z. B. QR-Code am Empfang, nach abgeschlossenem Auftrag)
- **A/B-Tests** auf Landing-Pages (CTA-Varianten, Hero-Texte)
- **Conversion-Tracking** auswerten, auf Basis Hero & Formulare optimieren
- **Sprach-/Marktausweitung** (ggf. Englisch, benachbarte Regionen)
- **Preiskalkulator / Self-Service-Tool** (fortgeschrittene Stufe)

---

## Paketierungs-Vorschlag

Grobe Gliederung für Neukunden-Pakete (zu verfeinern):

### Starter — statische Onepage
Punkte 1 (Light), 2, 3, 5 (nur Home + Kontakt), 6 (einfaches Formular), 7, 8, 10, 11 (Grundlagen), 16 — ca. 5–10 Tage

### Standard — Multi-Page-Website
Obige + Punkte 4 (volle Content-Architektur), 5 (alle Seiten), 9, 11 (komplett), 12 (Search Console, Business Profile), 13 (Analytics), 14, 18

### Premium — Vollbetreuung inkl. SEO & Wachstum
Obige + Punkt 15 (Reviews-Widget, Maps, Testimonials), 17 (Monitoring), 19 (Schulung), 20 (Content-Pipeline, Backlinks) — laufende Wartung

---

## Referenz-Implementierungen

- **weserbergland-dienstleistungen.de** — Gebäudereinigung, 7 Services, 5 Standorte, Resend (Sende-Subdomain `send.`) + Upstash (Rate-Limit) + GA4 (consent-gated) + Google Search Console + Bing Webmaster Tools + Google Maps + Live Google Reviews (Places API New, 5,0 ★ / 45 Bewertungen) + 4 Blogposts + 13 Legacy-301-Redirects — **live seit 2026-04-22**
- **immoakte.de** — Immobilien-Akten-Plattform (B2B)
- **tikiz.dev** — Freelance-Portfolio

# Preis-Modell — Module, Pakete, Wartung

**Zweck:** Transparentes, reproduzierbares Preissystem. Module sind die atomaren Bausteine mit festem Preis. Pakete sind vordefinierte Kombinationen aus Modulen + Bundle-Rabatt. Jede Änderungsanfrage lässt sich damit rechnen:

> **Angebotspreis = Paketpreis − entfernte Module + zusätzliche Module**

**Stand:** 2026-04-23 — Einstiegspreise Junior-Freelance-Phase.
**Kalkulationsbasis intern:** ~600 €/Tag (DACH-Junior-Markt-Niveau, Fixpreis-Tagessatz).
**Nach den ersten 5 Referenz-Projekten** Preise +25–30 % anheben (dann ~780 €/Tag).

**Single Source of Truth für Zahlen:** [`content/pricing.ts`](../content/pricing.ts) — daraus wird die `/pakete`-Seite auf tikiz.dev generiert. Bei Preisanpassungen diese TS-Datei ändern, Paket-Summen neu rechnen, diese Doku hier nachziehen.

**Grundregeln:**
1. Alle Preise **netto, zzgl. 19 % USt**.
2. **Tikiz-Honorar ≠ laufende Drittkosten.** Vercel, Resend, Upstash, Domain zahlt immer der Kunde direkt (siehe `client-account-setup.md`).
3. **Bundle-Rabatt 15 %** auf Modul-Summe, wenn als Paket gebucht. Einzel-Module kosten vollen Preis.
4. **Angebot gültig 14 Tage** ab Zustellung.
5. **Zahlungsmodalität:** ≤ 5.000 € → 50/50 (Auftrag / Launch). > 5.000 € → 30/40/30 (Auftrag / Design-Freigabe / Launch).

---

## Teil 1 — Modul-Katalog

Jedes Modul hat: **ID · Name · Inhalt · Dauer · Preis netto**.

### A) Foundation — immer nötig

#### F1 · Projekt-Setup & Deployment · 500 €
- Next.js 16 + TS + Tailwind v4 + pnpm Setup
- GitHub-Repo (privat) anlegen
- Vercel-Projekt verknüpfen (auf Kunden-Team!)
- Staging + Production Environments
- Domain auf Vercel verbinden (DNS-Einträge), SSL verifizieren
- `.env` Struktur + Secret-Handling dokumentiert
- _Dauer: 1 Tag_

#### F2 · Design-System · 750 €
- Brand-Farben als CSS-Variablen + Tailwind-Theme
- Typografie (bis zu 2 Schriftfamilien, self-hosted via `next/font`)
- UI-Basiskomponenten: Button, Card, Section, Container, Badge, Input
- Konsistente Spacings + Radien als Tokens
- Dark-Mode-Basis (aktivierbar, standardmäßig off)
- _Dauer: 1,5 Tage_

#### F3 · Design-System Lean · 400 €
- Minimal-Variante: Farben, Typo, Button, Section, Container. Kein volles Komponenten-Set.
- Für Starter-Paket / Onepage ausreichend.
- _Dauer: 0,75 Tage_ · _nicht mit F2 kombinierbar_

#### F4 · Core Web Vitals & Performance · 300 €
- Bilder via `next/image` (AVIF/WebP), `sizes`, Lazy-Loading
- Font `display: swap`, nur benötigte Weights
- Bundle-Audit, Code-Splitting prüfen
- Lighthouse ≥ 90 mobile als Abnahme-Kriterium
- _Dauer: 0,5 Tage_

#### F5 · Security-Header · 250 €
- CSP, HSTS, X-Frame, X-Content-Type, Referrer-Policy, Permissions-Policy
- `poweredByHeader: false`
- _Dauer: 0,5 Tage_

#### F6 · Launch-Doku & Handover · 300 €
- Markdown-Doku: Env-Vars, „How to add blog post", „How to change team member"
- Zugänge dokumentiert
- 30-Min-Übergabe-Call
- _Dauer: 0,5 Tage_

---

### B) Seiten — je nach Scope

> **Hinweis:** „Seite" = Code, Layout, Komponenten. Texte & Bilder = separate Module (siehe E).

#### B1 · Startseite · 1.000 €
- Hero mit Headline + CTA
- 4–5 Sektionen (Leistungen-Teaser, Trust, USPs, Final-CTA …)
- Mobile + Desktop optimiert
- _Dauer: 2 Tage_

#### B2 · Standard-Seite · 400 € pro Seite
Gilt für: Team, Karriere, Kontakt, FAQ, Über uns, generische Info-Seiten.
- Bis zu 3 Sektionen
- Einheitliches Page-Layout aus Design-System
- _Dauer: 0,75 Tage_

#### B3 · Leistungs-Übersichtsseite · 500 €
- Grid aller Leistungen mit Teasern
- Links auf Detail-Seiten (falls vorhanden)
- _Dauer: 1 Tag_

#### B4 · Leistungs-Detailseite · 250 € pro Service
- Scope, Zielgruppe, Benefits, CTA
- Schema.org Service-Markup (JSON-LD)
- _Dauer: 0,5 Tage_

#### B5 · Standort-Detailseite · 250 € pro Standort
- Für lokales SEO (eine URL je Stadt/Region)
- Adresse, Einsatzgebiet, Google-Maps-Teaser
- LocalBusiness-Schema pro Standort
- _Dauer: 0,5 Tage_

#### B6 · Blog-System · 1.000 €
- MDX-Setup, Listing + Detail-Template
- Kategorien, Tags, Lesezeit, OG-Bild pro Post
- _Dauer: 2 Tage_ · _Einzelne Posts → E4_

#### B7 · Impressum · 250 €
- § 5 TMG + § 18 MStV vollständig
- IHK/Aufsichtsbehörde recherchiert, VSBG-Hinweis
- _Dauer: 0,5 Tage_

#### B8 · Datenschutzerklärung · 400 €
- Alle auf der Seite genutzten Dienste dokumentiert (Hosting, Mail, Analytics, Fonts, Embeds)
- Rechtsgrundlagen, Betroffenenrechte, Aufsichtsbehörde
- _Dauer: 0,75 Tage_

---

### C) Funktionen — Interaktion & Integrationen

#### C1 · Kontaktformular Basis · 400 €
- Felder minimal, Honeypot gegen Bots
- Validierung client + server (Zod)
- E-Mail-Versand via Resend
- DSGVO-Consent-Checkbox
- _Dauer: 0,75 Tage_ · _Resend-Account Voraussetzung, siehe Account-Setup_

#### C2 · Rate-Limiting Add-on · 250 €
- Upstash Redis, z. B. 5 Anfragen / IP / Stunde
- Add-on zu C1, C3 oder C8
- _Dauer: 0,5 Tage_

#### C3 · Multi-Step-Formular · 750 €
- Mehrstufig mit konditionalen Feldern (Show/Hide Logic)
- Progress-Indikator, Zurück-Navigation
- Zod-validierter Server-Endpoint
- Beinhaltet C1-Basis; nicht zusätzlich buchen
- _Dauer: 1,5 Tage_

#### C4 · Branded Bestätigungsmail · 250 €
- HTML-Template mit Logo, Gradient, CTA
- Personalisierter Begrüßungs-Text
- _Dauer: 0,5 Tage_

#### C5 · App-/Deep-Link-Integration · 300 €
- Prominente Buttons (z. B. „Kundenanfrage" / „Bewerbung")
- UTM-Parameter fürs Tracking
- Smart-Banner für Mobile (optional)
- _Dauer: 0,5 Tage_

#### C6 · Buchungs-Embed · 250 €
- Cal.com / Calendly / TidyCal als Inline-Embed oder Popup
- _Dauer: 0,5 Tage_

#### C7 · Google Maps Embed · 150 €
- Keyless iframe, „In Google Maps öffnen"-Link
- _Dauer: 0,25 Tage_

#### C8 · Google Reviews Widget (live) · 500 €
- Places API (New), 5-Sterne-Filter, manueller Refresh
- Fallback auf statischen CTA, wenn keine Keys
- _Dauer: 1 Tag_

#### C9 · Newsletter-Anbindung · 500 €
- Brevo / Mailchimp / Resend Broadcasts
- Double-Opt-In, DSGVO-konform
- _Dauer: 1 Tag_

#### C10 · Sprachumschalter + 1 zusätzliche Sprache · 1.000 €
- `next-intl` Setup, Middleware, Routing
- Messages-JSON für bestehende Inhalte
- _Dauer: 2 Tage_

#### C11 · Weitere Sprache (nach C10) · 500 €
- Zusätzliche Messages-JSON
- _Dauer: 1 Tag_

#### C12 · Cookie-Consent-Banner · 400 €
- Granular (notwendig / Analytics / Marketing getrennt)
- Speicher-Logik, Re-Consent nach Ablauf
- _Dauer: 0,75 Tage_

---

### D) SEO & Marketing

#### D1 · On-Page-SEO-Basis · 400 €
- Meta-Title + Description pro Seite
- Open Graph + Twitter Cards
- Canonical-URLs
- `sitemap.xml` automatisch, `robots.txt`
- _Dauer: 0,75 Tage_

#### D2 · Strukturierte Daten (JSON-LD) · 400 €
- LocalBusiness, Service, FAQPage, BreadcrumbList (je nach passend)
- Validiert über Google Rich Results Test
- _Dauer: 0,75 Tage_

#### D3 · Dynamische OG-Bilder · 250 €
- `app/opengraph-image.tsx` via Satori
- Brand-Elemente auf jedem OG-Bild
- _Dauer: 0,5 Tage_

#### D4 · Google Search Console + Indexierung · 150 €
- Domain-Property verifizieren (DNS-TXT)
- Sitemap einreichen, Top-5 URLs manuell indexieren
- _Dauer: 0,25 Tage_

#### D5 · Google Business Profile Einrichtung · 300 €
- Eintrag verifizieren oder beantragen
- Leistungen, Öffnungszeiten, Fotos einpflegen
- Mit Website verknüpfen (NAP-Konsistenz)
- _Dauer: 0,5 Tage_

#### D6 · Analytics GA4 mit Consent · 250 €
- GA4 Property einrichten
- Consent-gated Script-Loader
- IP-Anonymisierung, Signale deaktiviert
- _Dauer: 0,5 Tage_

#### D7 · Custom Conversions · 250 €
- Events für Formular-Absenden, CTA-Klicks, Telefon/Mail-Klicks, Scroll-Tiefe
- _Dauer: 0,5 Tage_

---

### E) Design & Content-Produktion

#### E1 · Logo-Design (neu) · 1.500 €
- 3 Konzepte → Feedback → 2 Ausarbeitungen → 1 Finalisierung
- SVG + PNG Exports (verschiedene Größen)
- Dark-/Light-Varianten
- _Dauer: 3 Tage_

#### E2 · Logo-Anpassung · 400 €
- Aus bestehendem Logo: Farb-Varianten, Export-Sets, saubere SVG
- _Dauer: 0,75 Tage_

#### E3 · Favicon- & Icon-Set · 150 €
- Favicon, Apple-Icon, OG-Image-Defaults
- _Dauer: 0,25 Tage_

#### E4 · Texterstellung je Seite · 400 € / Seite
- 400–600 Wörter
- SEO-optimiert für lokale Keywords
- 1 Feedback-Runde + Finalisierung
- _Dauer: 0,75 Tage pro Seite_

#### E5 · Foto-Shooting-Koordination · 300 € — **nur auf explizite Anfrage**
- Fotografen-Empfehlung, Terminabstimmung, Briefing
- Bildauswahl nach Shooting, Retusche-Freigabe
- _Shooting-Kosten zahlt Kunde direkt an Fotografen_
- _Dauer: 0,5 Tage_
- **Standardfall: Kunde organisiert Foto-Shooting selbst. Dieses Modul nur anbieten, wenn der Kunde ausdrücklich darum bittet.**

#### E6 · Stock-Bildauswahl + Lizenz · 150 €
- Bis zu 10 Bilder kuratiert
- Lizenzen beim Kunden (via Unsplash+ / Adobe Stock / Kunde eigener Account)
- _Dauer: 0,25 Tage_

---

### F) Compliance & Legal

#### F_BFSG · BFSG-Audit + Fixes · 1.000 €
- WCAG 2.1 AA vollständig durchgegangen
- Keyboard-Navigation, Focus-Ringe, Alt-Texte, ARIA-Labels, Kontraste
- Screenreader-Test (VoiceOver)
- Lighthouse Accessibility ≥ 95 als Abnahme
- _Dauer: 2 Tage_ · _Pflicht für kommerzielle Seiten seit 28.06.2025_

#### F_AVV · AVV-Pack · 150 €
- Liste aller Auftragsverarbeiter mit Links zu deren AVV-Vorlagen
- Kunde unterschreibt selbst (Tikiz nicht berechtigt, rechtlich zu beraten)
- _Dauer: 0,25 Tage_

---

### G) Post-Launch & Migration

#### G1 · 301-Redirects (bis 10 URLs) · 250 €
- Recherche alter URLs, Mapping auf neue, Redirect-Config in `next.config.ts`
- _Dauer: 0,5 Tage_

#### G2 · 301-Redirects (bis 30 URLs) · 500 €
- Wie G1, größerer Umfang
- _Dauer: 1 Tag_ · _nicht mit G1 kombinieren_

#### G3 · Content-Migration · 500 € pro 10 Seiten
- Aus WordPress, Wix, Webflow, statischem HTML
- Content-Extraktion + Re-Formatierung in neue Struktur
- _Dauer: 1 Tag pro 10 Seiten_

#### G4 · Uptime-Monitoring · 150 €
- Better Stack oder UptimeRobot einrichten
- Benachrichtigung per Mail/WhatsApp
- _Dauer: 0,25 Tage_

#### G5 · Sentry Error-Monitoring · 200 €
- Sentry-Projekt, Source-Maps, Alerts
- _Dauer: 0,25 Tage_

---

## Teil 2 — Pakete

Paketpreis = Summe der enthaltenen Module **minus 15 % Bundle-Rabatt**.

Bundle-Rabatt nur gültig, wenn alle Basismodule zusammen gebucht werden.

---

### 🌱 Starter — „Landing-Page / Onepage"

**Wann passt das:** Einzelkämpfer, Coaches, Handwerker, frisch gestartete Selbständige. 1 Kernleistung, 1 Seite, Fokus Lead-Formular.

**Enthaltene Module:**
| ID | Modul | Preis |
|---|---|---|
| F1 | Projekt-Setup & Deployment | 500 € |
| F3 | Design-System Lean | 400 € |
| F4 | Core Web Vitals & Performance | 300 € |
| F5 | Security-Header | 250 € |
| F6 | Launch-Doku & Handover | 300 € |
| B1 | Startseite (Onepage mit Sektionen) | 1.000 € |
| B7 | Impressum | 250 € |
| B8 | Datenschutzerklärung | 400 € |
| C1 | Kontaktformular Basis | 400 € |
| C4 | Branded Bestätigungsmail | 250 € |
| D1 | On-Page-SEO-Basis | 400 € |
| E3 | Favicon- & Icon-Set | 150 € |
| **Summe** | | **4.600 €** |
| **Bundle-Rabatt −15 %** | | **−690 €** |
| **Paketpreis** | | **3.900 €** |

**Nicht enthalten (häufige Add-ons):**
- Texterstellung (E4) — falls Kunde keine eigenen Texte hat
- Cookie-Banner (C12) — wenn Analytics gewollt
- BFSG-Audit (F_BFSG) — Pflicht falls kommerziell ≥ 2 Mitarbeitende

**Dauer:** ca. 6–8 Arbeitstage.

---

### 🌳 Standard — „Firmen-Website"

**Wann passt das:** Lokale Dienstleister mit Team, Karriere, mehreren Leistungen. Der Regelfall. Beispiel: Carsten.

**Enthaltene Module:**
| ID | Modul | Preis |
|---|---|---|
| F1 | Projekt-Setup & Deployment | 500 € |
| F2 | Design-System | 750 € |
| F4 | Core Web Vitals | 300 € |
| F5 | Security-Header | 250 € |
| F6 | Launch-Doku & Handover | 300 € |
| B1 | Startseite | 1.000 € |
| B3 | Leistungs-Übersichtsseite | 500 € |
| B2 ×3 | 3 Standard-Seiten (Team, Karriere, Kontakt) | 1.200 € |
| B7 | Impressum | 250 € |
| B8 | Datenschutzerklärung | 400 € |
| C1 | Kontaktformular Basis | 400 € |
| C2 | Rate-Limiting Add-on | 250 € |
| C4 | Branded Bestätigungsmail | 250 € |
| C7 | Google Maps Embed | 150 € |
| C12 | Cookie-Consent-Banner | 400 € |
| D1 | On-Page-SEO-Basis | 400 € |
| D2 | Strukturierte Daten JSON-LD | 400 € |
| D4 | Search Console + Indexierung | 150 € |
| D6 | Analytics GA4 mit Consent | 250 € |
| E3 | Favicon- & Icon-Set | 150 € |
| F_BFSG | BFSG-Audit + Fixes | 1.000 € |
| F_AVV | AVV-Pack | 150 € |
| **Summe** | | **9.400 €** |
| **Bundle-Rabatt −15 %** | | **−1.410 €** |
| **Paketpreis** | | **7.990 €** → rund **7.900 €** |

**Nicht enthalten (häufige Add-ons):**
- Texterstellung (E4) — pro Seite zubuchbar
- Leistungs-Detailseiten (B4) — ab 3 Services empfehlenswert
- App-Integration (C5) / Buchungs-Embed (C6)
- Google Business Profile (D5)
- Foto-Shooting-Koordination (E5)

**Dauer:** ca. 14–18 Arbeitstage.

---

### 🏛️ Premium — „Full-Stack-Website"

**Wann passt das:** Firmen mit mehreren Standorten, Service-Detailseiten, Blog, Integrationen (App, Reviews, Buchung), anspruchsvolles SEO. Beispiel: wd-website.

**Enthaltene Module:**
Alles aus Standard, plus:
| ID | Modul | Preis |
|---|---|---|
| B4 ×3 | 3 Leistungs-Detailseiten | 750 € |
| B5 ×2 | 2 Standort-Detailseiten | 500 € |
| B6 | Blog-System | 1.000 € |
| C5 | App-/Deep-Link-Integration | 300 € |
| C8 | Google Reviews Widget live | 500 € |
| D3 | Dynamische OG-Bilder | 250 € |
| D5 | Google Business Profile | 300 € |
| D7 | Custom Conversions | 250 € |
| G1 | 301-Redirects (bis 10) | 250 € |
| G3 ×1 | Content-Migration (10 Seiten) | 500 € |
| G4 | Uptime-Monitoring | 150 € |
| G5 | Sentry Error-Monitoring | 200 € |
| **Summe Premium-Zusatz** | | **4.950 €** |
| **+ Standard-Modul-Summe** | | **+9.400 €** |
| **Gesamt-Modulsumme** | | **14.350 €** |
| **Bundle-Rabatt −15 %** | | **−2.150 €** |
| **Paketpreis** | | **12.200 €** → rund **12.000 €** |

**Dauer:** ca. 24–30 Arbeitstage.

---

### Paket-Übersicht

| Paket | Preis netto | Bundle-Rabatt | Seitenumfang | Typischer Kunde |
|---|---|---|---|---|
| Starter | **6.750 €** | −15 % | 1 Seite (Onepage) | Einzelkämpfer, Coach |
| Standard | **13.500 €** | −15 % | 5–6 Seiten | Lokaler Dienstleister |
| Premium | **21.500 €** | −15 % | 8+ Seiten, Integrationen, Blog | Firma mit Standorten |

---

## Teil 3 — Wartung (monatlich, optional)

### 🛡️ Care S · 49 €/Monat netto
- Dependency-Updates monatlich
- Security-Advisory-Monitoring
- Uptime-Monitoring mit Benachrichtigung
- Git-Backup-Verifikation
- **0,5 Stunden** Kleinänderungen inkl. (rollover max 3 Monate)

### 🔧 Care M · 149 €/Monat netto
Alles aus S, plus:
- **2 Stunden** Kleinänderungen inkl. (rollover max 3 Monate)
- Quartalsweise Lighthouse + Core-Web-Vitals-Check mit Report
- Quartalsweise Search-Console-Auswertung

### 🚀 Care L · 349 €/Monat netto
Alles aus M, plus:
- **5 Stunden** / Monat inkl. (rollover max 3 Monate)
- 1 Blog-Post / Monat inkl. SEO (bis 800 Wörter, Texterstellung nach E4)
- Monatlicher Strategie-Call (30 Min)

**Laufzeit:** mindestens 6 Monate, danach monatlich kündbar (1 Monat Kündigungsfrist).

**Stundensatz ohne Wartung:** **95 €/h** netto, min. 1 Stunde.

---

## Teil 4 — Beispielrechnungen

### Beispiel 1 — Carsten (Heb Alltagsbegleitung)

Ausgangspunkt: Standard-Paket passt gut.

| Position | Preis |
|---|---|
| Paket Standard | 13.500 € |
| + C5 App-/Deep-Link-Integration | +450 € |
| + D5 Google Business Profile | +450 € |
| + E4 ×5 Texterstellung (Start, Leistungen, Team, Karriere, Kontakt) | +3.000 € |
| **Zwischensumme Einmalleistung** | **17.400 €** |
| zzgl. 19 % USt | 3.306 € |
| **Gesamt brutto** | **20.706 €** |

**Hinweis:** Carsten hat am 22.04.2026 ein Angebot mit dem damals gültigen Einsteiger-Tarif (Basis ~450 €/Tag, Marktwert 12.495 € brutto) bekommen. Dieses Angebot wird nicht retroaktiv angepasst. Interne Akte: seine Case-Study im Portfolio dokumentiert den 12.495-€-Stand zum Angebotszeitpunkt.
| _Optional: Care M Wartung ab Launch_ | 149 €/Mo |

**Laufende Drittkosten bei Carsten:** Vercel Pro $20/Mo, Domain bleibt (Hetzner), Resend + Upstash voraussichtlich Free-Tier.

### Beispiel 2 — Kunde will Blog dazu (Change Request)

Kunde hat Standard-Paket gebucht, will nach Launch zusätzlich Blog.
- + B6 Blog-System: 1.000 €
- + E4 pro Blog-Post: 400 € (falls Texterstellung gewünscht)

Transparent berechenbar, weil Module einzeln gepreist sind.

### Beispiel 3 — Kunde nimmt Karriere-Seite raus

Kunde hat Standard-Paket gebucht, braucht keine Karriere-Seite.
- Standard-Paket: 7.900 €
- − B2 Standard-Seite: −400 €
- = 7.500 €

Auch Downgrades sind reproduzierbar.

---

## Teil 5 — Preis-Kommunikation pro Workflow-Phase

| Phase | Was wird kommuniziert |
|---|---|
| **Phase 1** (Qualifizierungs-Mail) | „Pakete beginnen bei 3.900 € (Onepage), typische Firmenseite zwischen 7.900 € und 12.000 €. Details: tikiz.dev/pakete" |
| **Phase 2** (Detail-Mail) | Budget-Frage + welches Paket angepeilt |
| **Phase 4** (Angebot) | Vollständige Modul-Tabelle + Bundle-Rabatt + laufende Drittkosten + Wartungs-Option + Zahlungsmodalität |
| **Phase 5.5** (Account-Setup) | Laufende Drittkosten zahlt Kunde direkt via seiner Vercel/Resend-Karte |
| **Nach Launch** (Change Requests) | Modul-Preis +/− (s. Beispiel 2 und 3) |

---

## Teil 6 — Sonderfälle

### Testkunden / Referenzkunden (nur 1–3 Stück, dann Schluss)

Für erste Referenzen: **Arbeitszeit 0 €**, als Gegenleistung verpflichtend:
- Schriftliches **Testimonial** (Name, Firma, Foto, 2–3 Sätze)
- **Logo-Nutzung** auf tikiz.dev (Portfolio, Referenzen)
- **Case-Study-Freigabe** (Screenshots, Projektbeschreibung)
- **Laufende Drittkosten zahlt der Kunde trotzdem selbst** (Vercel etc.)

Im Angebot wird der _normale Preis_ ausgewiesen und als „Referenz-Rabatt 100 %" gekennzeichnet — damit der Wert sichtbar bleibt.

### Freunde & Familie

Erlaubt, aber:
- Laufende Drittkosten zahlt der Freund selbst
- Scope gleich klar definiert wie bei zahlendem Kunden
- „Gegenleistung" ist klar benannt
- Wartung ist auch für Freunde kostenpflichtig

### Non-Profit / Vereine

Bis zu 25 % Rabatt bei gemeinnütziger Bescheinigung. Portfolio-Nutzung Pflicht.

### Wiederholungskunden

Beim zweiten Projekt: 10 % Treuerabatt auf das Paket (nicht auf Module).

---

## Teil 7 — TODO für Özgür

- [ ] `/pakete`-Seite auf tikiz.dev bauen (Modul-Cards, Paket-Vergleich, interaktiver Rechner optional)
- [ ] Funnel `/anfrage` um „Paket-Einschätzung" erweitern
- [ ] Angebots-Template in `docs/_templates/angebot.md` mit HEREDOC-Variablen
- [ ] Nach 5 Referenz-Projekten: Preise +30 % hochziehen

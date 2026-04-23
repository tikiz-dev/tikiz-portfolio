# Briefing-Template — Kundenprojekt

**So benutzen:** Kopiere dieses Dokument als `BRIEFING.md` in das neue Projekt-Verzeichnis (`~/Developer/<kürzel>-website/`). Fülle alle Felder aus, bevor du einen neuen Claude-Code-Agent startest. Leere Felder = Agent wird nachfragen müssen = Workflow hat versagt.

Der neue Agent liest diese Datei als Erstes und kennt damit den vollständigen Projekt-Kontext.

---

## 0. Meta

- **Kunde (Kürzel):**
- **Kundenname (voll):**
- **Projekt-Start:**
- **Ziel-Launch:**
- **Modell:** (A Komplett-Handover / B mit Wartung / C nur Code) — siehe `client-account-setup.md`
- **Vereinbarter Festpreis (netto):**
- **Monatliche Wartungspauschale (netto):** (nur bei Modell B)
- **Zahlungsmodalitäten:**
- **Verantwortlicher Ansprechpartner beim Kunden:**
  - Name:
  - Rolle:
  - Telefon:
  - E-Mail:
  - Bevorzugter Kanal (WhatsApp / Mail / Telefon):

---

## 1. Unternehmen & Positionierung

- **Firma (Rechtsform):**
- **Branche:**
- **Kernleistung in einem Satz:**
- **USP / Was macht sie anders:**
- **Zielgruppe:**
- **Einsatzgebiet (PLZ-Liste für lokales SEO):**
- **Kernversprechen / Tagline:**
- **Erfolgskriterien der Website** (was soll sie leisten — Leads? Bewerbungen? Info?):

---

## 2. Impressum & Rechtliches

- **Firmenname (voll, wie im Impressum):**
- **Anschrift:**
- **Telefon (öffentlich):**
- **E-Mail (öffentlich):**
- **Steuernummer:**
- **USt-IdNr.:**
- **Verantwortlich für Inhalte (§ 18 MStV):**
- **Aufsichtsbehörde / Zulassung** (z. B. § 45a SGB XI, IHK, …):
- **Alte Impressum / DSE als Vorlage** (Pfad/URL):
- **AVV nötig mit:** Vercel, Resend, ggf. Google, ggf. Upstash

---

## 3. Domain & Hosting (IST → SOLL)

- **Aktuelle Domain:**
- **Aktueller Hoster (Webspace):**
- **Aktueller DNS-Verwalter:**
- **E-Mail-Hosting (bleibt wo?):**
- **Ziel:** Domain zu Vercel zeigen, MX-Einträge *unberührt* lassen
- **Zugangs-Liste:** Secrets via Bitwarden Send (Link hier, Secret nicht im Repo)
- **Wer hat aktuell Admin-Zugang:**

### Account-Setup (Phase 5.5) — auf Kunden-Namen

Vollständige Anleitung: [`client-account-setup.md`](client-account-setup.md)

- **Vercel Team** (Pro, $20/Mo) — Besitzer: Kunde, Tikiz als Admin
  - Team-Name / Team-Slug:
  - Kunde-Login (Mail):
  - Tikiz-Einladung akzeptiert (Datum):
- **Resend** — Besitzer: Kunde
  - Domain verifiziert ja/nein:
  - API-Key liegt in Bitwarden Send (Link):
- **Upstash Redis** (Region Frankfurt) — Besitzer: Kunde
  - DB-Name:
  - Credentials in Bitwarden Send (Link):
- **Google Analytics / Search Console / Business Profile** — Besitzer: Kunde, Tikiz als Editor/Inhaber
- **GitHub Repo** — Owner: `tikiz-dev/<kürzel>-website` (privat)

---

## 4. Inhalte — Seitenstruktur

- [ ] Startseite
- [ ] Leistungen (Übersicht + ggf. Detailseiten)
- [ ] Team
- [ ] Karriere
- [ ] Kontakt
- [ ] Impressum
- [ ] Datenschutz
- [ ] (optional) Blog / News
- [ ] (optional) Referenzen
- [ ] (optional) FAQ

**Eigene URL-Struktur / Besonderheiten:**

---

## 5. Leistungskatalog

Pro Leistung:

| Name | Kurzbeschreibung | Preis / Stundensatz | Kassenleistung? | Zielgruppe |
|------|------------------|---------------------|-----------------|------------|
|      |                  |                     |                 |            |

---

## 6. Team

| Name | Rolle | Kurzbio (1–2 Sätze) | Foto vorhanden? | Kontakt öffentlich? |
|------|-------|---------------------|-----------------|---------------------|
|      |       |                     |                 |                     |

**Foto-Plan:** (vorhanden / Shooting geplant am … / Stock)

---

## 7. Karriere

- **Offene Stellen:**
- **Anforderungen:**
- **Benefits:**
- **Bewerbungsweg:** (Formular / E-Mail / externe App / Telefon)
- **Gehalt öffentlich?:**

---

## 8. Third-Party-Integrationen

- **Eigene App / Portal:**
  - Name:
  - URL / Store-Link:
  - Integrationsart (Deep-Link-Button / QR / iframe / API):
  - Fallback für Nicht-App-Nutzer:
- **Buchungssystem:**
- **CRM:**
- **Newsletter:**
- **Google Business Profile:**
- **Google Maps Einbettung:**
- **Google Reviews Widget:**
- **Social Media Links:**

---

## 9. Design-System

- **Logo-Quelle** (Pfad zur SVG/AI):
- **Brand-Farben** (Hex):
  - Primär:
  - Sekundär:
  - Neutral-Skala:
- **Typografie:**
- **Bildsprache / Stimmung:**
- **Referenz-Websites, die dem Kunden gefallen:**
- **Don'ts** (was soll *nicht* nach aussehen):

---

## 10. Inhalte — Texte & Bilder

- **Texte:** [ ] Kunde liefert  [ ] Özgür schreibt neu  [ ] Mix
- **Text-Tonalität:** (du/Sie, locker/professionell, …)
- **Keywords für SEO** (Hauptleistung + Stadt-Kombinationen):
- **Fotos:** [ ] eigene vorhanden  [ ] Shooting  [ ] Stock
- **Testimonials / Referenzen** (mit schriftlicher Einwilligung):
- **Zertifikate / Logos** zur Einbindung:

---

## 11. Tech-Stack (Standard, nur abweichen wenn begründet)

- Next.js 16 (App Router, aktuelle Version — `node_modules/next/dist/docs/` ist Pflichtlektüre, NICHT Trainings-Wissen)
- TypeScript, strict
- Tailwind CSS + CSS-Variablen
- pnpm
- Resend für transaktionale Mails (Domain verifizieren)
- Upstash Redis für Rate-Limiting (wenn Formulare)
- Vercel Hosting, automatischer Deploy ab `main`
- GitHub privat unter `tikiz-dev` Org

**Referenz-Projekte:**
- `~/Developer/tikiz.dev` (Portfolio + Funnel)
- `~/Developer/wd-website` (Gebäudereinigung, 7 Services, lokales SEO)
- `~/Developer/tikiz.dev/docs/website-process.md` (vollständiger 20-Punkte-Prozess)

---

## 12. Rechts-/Compliance-Checkliste

- [ ] Impressum § 5 TMG vollständig
- [ ] DSE abdeckt: Hosting (Vercel), Resend, Upstash, Fonts, Analytics, eingebettete Dienste
- [ ] Cookie-Consent granular (notwendig / Analytics / Marketing)
- [ ] Barrierefreiheit BFSG (seit 28.06.2025 Pflicht für kommerzielle Seiten) — WCAG 2.1 AA
- [ ] AVVs unterschrieben
- [ ] Bildrechte geklärt (Stock-Lizenzen / Model-Releases)

---

## 13. Analytics & Monitoring

- **Tool:** (GA4 mit Consent / Plausible / Umami / keins)
- **Conversions definieren:** (Formular-Absenden, App-Klick, Telefon-Klick …)
- **Uptime-Monitoring:**
- **Error-Monitoring:**

---

## 14. Timeline (mit Milestones)

- [ ] Woche 1: Setup + Design-Mockup Startseite
- [ ] Woche 2: Alle Unterseiten im Preview-Deploy
- [ ] Woche 3: Content-Review + Feintuning
- [ ] Woche 4: Rechtliches, SEO, Launch-Vorbereitung
- [ ] **Launch-Termin:**
- [ ] Post-Launch: Indexierung beschleunigen, Search Console, Reviews einholen

---

## 15. Scope-Grenzen (wichtig — verhindert Streit)

**NICHT enthalten (es sei denn, separat gebucht):**
- Logo-Redesign (falls nur Farb-Tweak inklusive)
- Professionelles Foto-Shooting
- Content-Erstellung über X Seiten hinaus
- Blog-Pflege nach Launch
- Social-Media-Betreuung
- Google-Ads / SEA
- Mehrsprachigkeit
- Shop-Funktionen

**Änderungswünsche nach Launch** werden nach Aufwand abgerechnet (Wartungsvertrag oder Stundensatz).

---

## 16. Kommunikations-Regeln

- **Kanal:** (WhatsApp / Mail / Slack — festlegen)
- **Reaktionszeit:** (z. B. werktags innerhalb 24h)
- **Feedback-Format:** (nummerierte Punkte, Screenshots mit Pfeilen)
- **Entscheidungs-Deadlock:** Wer entscheidet bei „weiß nicht"? Meist der Kunde, aber festhalten.

---

## 17. Offene Fragen / Risiken

- …

---

## 18. Agent-Handoff-Hinweise

Für den nächsten Claude-Code-Agent:

- **Arbeitsverzeichnis:** `~/Developer/<kürzel>-website/`
- **Vercel-Team:** `weserbergland-dienstleistungen`
- **GitHub-Org:** `tikiz-dev`
- **Framework-Doku:** *immer* `node_modules/next/dist/docs/` lesen — Next.js 16 hat Breaking Changes gegenüber Trainings-Wissen
- **Feedback-Memory:** Özgür ist Einsteiger-Entwickler, will Implementation + Erklärungen auf Deutsch
- **Deploy:** Push auf `main` → Vercel baut automatisch (~30s)
- **Referenz-Implementierungen:** WD-Website + tikiz.dev — Pattern dort prüfen, bevor neu erfunden wird

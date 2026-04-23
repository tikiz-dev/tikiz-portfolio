# Account-Setup mit dem Kunden

**Wann:** Zwischen Angebots-Zusage (Phase 5) und Agent-Handoff (Phase 6). Entspricht Phase 5.5 im Client-Workflow.

**Warum:** Laufende Kosten (Vercel, Resend, Upstash, Domain) dürfen nicht auf Tikiz-Accounts laufen — bei Einmal-Aufträgen würde Tikiz sonst für immer die Rechnung bezahlen. Der Kunde besitzt alle Services, Tikiz ist als Member/Admin eingeladen.

**Dauer:** ca. 45 Min Video-Call mit dem Kunden, Screenshare, Schritt für Schritt.

---

## Default-Modell: Kunde besitzt alle Accounts

Folgende Accounts richtet der Kunde ein (wir zusammen am Call, damit er nicht alleine scheitert):

### 1. Vercel Team ($20/Mo Pro erforderlich für kommerzielle Nutzung)

1. Kunde erstellt Account auf vercel.com mit **seiner Firmen-E-Mail** (nicht privater Gmail).
2. **Team** anlegen mit dem Firmennamen — Vercel fragt bei Erstellung nach Zahlungsmitteln für Pro-Tier.
3. Kunde lädt Özgür als **Admin** ein: `info@weserbergland-dienstleistungen.de`.
4. Kunde akzeptiert Team-ToS + gibt Zahlungsdaten ein.

**ToS-Hinweis:** Vercel Hobby ist ausdrücklich nicht-kommerziell. Jede Firmen-Website braucht Pro. Nicht verhandeln — wer das ignoriert, riskiert spontanes Abschalten der Seite.

### 2. Domain

- **Wenn Kunde schon eine Domain hat** (Standardfall): Domain bleibt beim aktuellen Registrar. Wir brauchen nur **A- und CNAME-Zugang**. Kunde ändert später (bei Launch) A `@` → `76.76.21.21` und CNAME `www` → `cname.vercel-dns.com`. MX-Einträge **nicht anfassen**.
- **Wenn Domain neu:** Kunde kauft sie direkt (bei IONOS, Hetzner, Namecheap, Vercel — egal). **Nie über Tikiz-Account**.

### 3. Resend (E-Mail für Kontaktformulare)

1. Kunde erstellt Account auf resend.com (Firmen-Mail).
2. Kunde **verifiziert seine Domain** (4 DNS-Records: SPF, DKIM, MX für die Sende-Subdomain `send.<domain>`).
3. Kunde generiert API-Key → teilt ihn mit Tikiz via Bitwarden Send (siehe Secrets-Policy unten).
4. Free-Tier reicht bis 3.000 Mails/Monat (= ca. 100 Anfragen/Tag). Pro ($20/Mo) nur bei größerem Volumen.

### 4. Upstash Redis (Rate-Limiting für Formulare)

Nur nötig, wenn die Seite Formulare hat (fast immer).

1. Kunde erstellt Account auf upstash.com (Login mit Google oder GitHub ist okay).
2. Redis-Datenbank anlegen, Region **Frankfurt** (DSGVO-freundlich).
3. **REST-URL + REST-Token** → via Bitwarden Send an Tikiz.
4. Free-Tier reicht bis 10.000 Commands/Tag — ausreichend für normale Traffic-Muster.

### 5. Google Dienste (kostenlos, aber Account notwendig)

- **Google Analytics 4**: Kunde erstellt Property unter seiner Google-Identity, lädt Tikiz als **Editor** ein. Tikiz richtet Data-Stream + Consent ein.
- **Google Search Console**: Kunde verifiziert die Domain (Domain-Property via DNS-TXT), lädt Tikiz als **Inhaber (Delegated)** ein.
- **Google Business Profile**: Kunde verifiziert sein Firmenprofil (Postkarte oder Telefon). Tikiz nur bei Bedarf als Manager.

### 6. GitHub

- **Repo liegt bei Tikiz** (`github.com/tikiz-dev/<kunde>-website`, privat).
- Kunde bekommt am Launch-Tag optional ein ZIP-Export oder Read-Access — steht im Angebot.
- Falls Kunde eigenen GitHub will: Repo bei Kunden-Org, Tikiz als Collaborator. Selten.

### 7. Sentry / Uptime (optional, nur mit Wartungsvertrag)

- Sentry Free-Tier: Kunden-Account, Tikiz als Member.
- Better Stack / UptimeRobot: kostenlos, Kunden-Account.

---

## Secrets-Policy

**Niemals:**
- API-Keys per WhatsApp, SMS, E-Mail (außer verschlüsselt) oder Git-Commit.
- Keys in der Briefing-Datei (die committed wird).
- Keys in Slack-Screenshots.

**Immer:**
- **Bitwarden Send** oder **1Password Shared Link** mit 7-Tage-Ablauf.
- Im Vercel-Projekt als Environment-Variables setzen (Production / Preview getrennt).
- Im Briefing nur der Hinweis „Secrets liegen in Bitwarden Send (Link gültig bis X)".

---

## Übersicht: Wer zahlt was

| Service | Kosten | Account gehört | Tikiz-Rolle |
|---|---|---|---|
| Vercel Pro | $20/Monat | Kunde | Admin |
| Domain | 10–20 €/Jahr | Kunde | (Admin bei Registrar) |
| Resend | 0 € meist, sonst $20/Monat | Kunde | API-Key Zugriff |
| Upstash | 0 € meist | Kunde | API-Key Zugriff |
| Google Analytics | 0 € | Kunde | Editor |
| Google Search Console | 0 € | Kunde | Inhaber (delegated) |
| Google Business Profile | 0 € | Kunde | Manager (optional) |
| GitHub Private Repo | 0 € | Tikiz | Owner |
| Sentry (optional) | 0 € Free | Kunde | Member |

**Faustregel:** Alles, was laufende Kosten erzeugen kann oder mit den Kundendaten des Kunden verbunden ist → beim Kunden. Nur der Quellcode liegt bei Tikiz.

---

## Drei Kunden-Szenarien

### A) Komplett-Handover (Default für Einmal-Aufträge)

- Kunde richtet alle Accounts ein (oben).
- Tikiz baut, deployt, übergibt.
- Nach Launch + Garantiezeit (2 Wochen) kann Tikiz aus Accounts raus oder Kunde lässt Tikiz drin für ad-hoc Support.
- **Wartung ist separat buchbar** (Stundensatz).

### B) Mit Wartungsvertrag

- Wie A, aber Tikiz bleibt als Admin/Editor drin.
- Kunde zahlt monatliche Pauschale (Vorschlag: 49–99 €/Mo je nach Umfang) für:
  - Dependency-Updates (monatlich)
  - Security-Monitoring
  - Uptime-Check
  - 1–2 Stunden Kleinänderungen / Monat (rollover, max 3 Monate)
- Größere Änderungen oder Bugs nach Umfang.
- Vercel-Kosten trägt weiter **Kunde** — Wartungspauschale ist nur für Tikiz-Arbeitszeit.

### C) Nur Code-Lieferung

- Selten, nur auf expliziten Wunsch.
- Tikiz entwickelt gegen Preview-Deploys auf eigenem Vercel oder lokal.
- Auslieferung: Git-Repo-Transfer oder ZIP.
- Kunde deployt selbst.
- **Preis-Aufschlag:** 20 % — kein Live-Preview beim Bauen erhöht Abstimmungsaufwand.

---

## Ablauf des Account-Setup-Calls

1. **5 Min** — Überblick erklären: warum Kunde alle Accounts besitzt, welche Kosten anfallen.
2. **10 Min** — Vercel-Team anlegen, Zahlung einrichten, Tikiz als Admin einladen.
3. **10 Min** — Resend-Account, Domain verifizieren (DNS-Records setzen).
4. **5 Min** — Upstash-Redis, Keys an Bitwarden Send.
5. **10 Min** — Google Analytics + Search Console, Tikiz einladen.
6. **5 Min** — Offene Zugänge (Domain-Registrar, Hoster) klären, abhaken.

**Artefakt:** `docs/clients/<kürzel>/08-accounts.md` — Liste aller Accounts mit IDs (nicht Secrets), Datum Einrichtung, Tikiz-Rolle.

**Sobald alle Accounts stehen → neuer Agent in neuer Session kann loslegen.**

# Client-Workflow: Erstkontakt → Projekt-Kick-off

**Zweck:** Reproduzierbarer Ablauf von der ersten Kundenanfrage bis zum Moment, an dem die Implementation starten kann. Das Ziel: am Ende jeder Phase gibt es ein klar definiertes Artefakt, und am Ende steht ein vollständiges Briefing, das an einen neuen Agent/Chat in einem neuen Verzeichnis übergeben werden kann.

**Grundprinzip:** Jede Phase reduziert Unklarheit, kein Hin-und-Her mehr als nötig. Wenn zwei Mails hintereinander nötig sind, war die erste nicht strukturiert genug.

---

## Phase 0 — Lead kommt rein

**Zwei Wege:**

**A) Funnel** (`/anfrage` auf tikiz.dev) — Idealfall
- Strukturierte Daten kommen direkt per Mail von Resend
- Kunden-Bestätigungsmail geht automatisch raus
- Alle Kern-Infos (Projekt-Typ, Umfang, Timing, Budget-Range) sind schon da

**B) Direkter Erstkontakt** (DM, Empfehlung, Mail)
- Weniger strukturiert, dafür persönlicher
- → Schritt 1 (Qualifizierung) übernimmt die Funnel-Funktion

**Artefakt:** Lead angelegt unter `docs/clients/<kürzel>/01-lead.md` mit Name, Kanal, Kurzbeschreibung, Datum.

---

## Phase 1 — Qualifizierung (Mail 1)

Nur wenn der Kunde *nicht* über den Funnel kam. Kurze Mail mit 6 Basis-Fragen:

1. Ausgangslage & Ziel
2. Zielgruppe & gewünschte Handlung
3. Inhalte & Seitenumfang
4. Look & Feel (Referenzen)
5. Technisches & DSGVO
6. Zeitrahmen & Budget

**Ziel:** Grob einschätzen, ob das Projekt passt (Fit + Kapazität + Preis-Range).
**Vorlage:** [`docs/clients/_templates/mail-01-qualifizierung.md`](clients/_templates/mail-01-qualifizierung.md) — siehe Carsten-Mail 1 als Vorlage (im Session-Transkript bzw. Funnel-Texten).

**Artefakt:** Mail raus, Antwort → `docs/clients/<kürzel>/02-qualifizierung-antwort.md`.

---

## Phase 2 — Detail-Fragerunde (Mail 2)

Nach der ersten Antwort fehlen fast immer: **harte Impressum-Daten, App/Third-Party-Integrationen, Team-/Karriere-Inhalte, Logo-Dateien, SGB- oder branchenspezifische Zulassungen, realistische Budget/Zeit-Zahlen.**

**Prinzip:** Diese Mail ist die *letzte*, die rein auf Fakten zielt. Was hier nicht geklärt wird, klären wir im Call.

**Checkliste für Mail 2** (branchenspezifisch anpassen):

1. Firma & Impressum (Rechtsform, Anschrift, Steuernummer, Verantwortlicher, Branchen-Zulassung)
2. Aktuelle Website & Domain (Hoster, Zugänge — nicht jetzt übermitteln, nur „wer hat Zugang")
3. Zielgruppe & Einsatzgebiet (PLZ-Liste für lokales SEO)
4. Leistungskatalog (Liste + Preise + Kassenleistung ja/nein)
5. Third-Party-Integrationen (eigene Apps, Buchungssysteme, CRMs …)
6. Team (Namen, Rollen, Foto-Status)
7. Karriere (offene Stellen, Anforderungen, Bewerbungsweg)
8. Design & Inhalte (Logo-Vektor, Farben, Text-Entscheidung neu/alt, Foto-Material, Testimonials)
9. Google Business / Social Media
10. Rechtliches (alte Impressum/DSE als Vorlage, Cookie/Analytics-Zustimmung)
11. Budget (zwei Varianten: Einmal + Einmal-mit-Wartung) und Ziel-Termin

**Wichtig:** Wenn der Kunde Freund/Familie ist, Humor einbauen, aber Budget/Zeit ernst nachfragen. Freundschaft ≠ Gratis-Arbeit, das *früh* klarstellen, nicht erst bei der Rechnung.

**Artefakt:** `docs/clients/<kürzel>/03-detail-mail.md` (wie an Carsten) + Antwort → `docs/clients/<kürzel>/04-detail-antwort.md`.

---

## Phase 3 — Discovery-Call (30 Min, optional aber empfohlen)

**Wann nötig:**
- Wenn nach Mail 2 noch >5 offene Punkte sind
- Wenn Kunde schriftlich nicht gut liefert
- Bei größeren Projekten (> 5.000 € Budget) immer

**Struktur:**
- 5 Min: Vorstellung, Agenda
- 15 Min: Offene Punkte aus Briefing-Checkliste durchgehen
- 5 Min: Tech-Stack + Prozess erklären (Preview-URL, Feedback-Zyklus, Launch-Ablauf)
- 5 Min: Nächste Schritte, Angebots-Zeitpunkt

**Notiz-Format:** Direkt ins Briefing-Template tippen, nicht erst hinterher übertragen.

**Tool:** Cal.com (TODO einrichten), Link in E-Mail-Signatur + auf tikiz.dev.

**Artefakt:** Vollständig befülltes Briefing → `docs/clients/<kürzel>/05-briefing.md`.

---

## Phase 4 — Angebot

**Grundlage:** [`docs/pricing-model.md`](pricing-model.md) (3 Pakete, Module, Wartung).

**Struktur des Angebots:**
1. Paket gewählt (Starter / Standard / Premium) + Paket-Preis
2. Module aufgeschlüsselt mit Einzelpreisen
3. Zwischensumme Einmalleistung netto
4. Optional: Wartungspaket (Care S/M/L, monatlich)
5. **Laufende Drittkosten beim Kunden** (Vercel Pro, Resend, Domain — explizit ausgewiesen, nicht vermischt mit Tikiz-Honorar)
6. Gesamt Einmal netto + brutto, Zahlungsmodalität (50/50 oder 30/40/30), Gültigkeit 14 Tage
7. Scope-Grenzen explizit („NICHT enthalten")
8. Timeline mit Milestones

**Preis-Kommunikation vorher:**
- Phase 1 (Qualifizierungs-Mail): Spanne + Link auf `/pakete`
- Phase 2 (Detail-Mail): Budget-Frage + Paket-Einordnung
- Phase 4 (hier): konkrete Festpreise

**Artefakt:** `docs/clients/<kürzel>/06-angebot.md` + PDF-Export.

---

## Phase 5 — Zusage & Kick-off

- Kunde nimmt Variante an, schriftliche Bestätigung (auch WhatsApp reicht, als Screenshot sichern)
- Anzahlung eingegangen → Start.

**Artefakt:** `docs/clients/<kürzel>/07-zusage.md`.

---

## Phase 5.5 — Account-Setup (KRITISCH — vor Agent-Handoff)

**Grund:** Der Projekt-Agent kann nicht sinnvoll bauen, wenn Vercel/Resend/Upstash nicht auf den Kunden laufen. Laufende Kosten dürfen NIE auf Tikiz-Accounts liegen, sonst zahlt Tikiz nach Launch ewig weiter.

**Ablauf:** 45-Min-Video-Call mit Kunde, Screenshare. Schritt-für-Schritt durch alle Accounts (Vercel, Resend, Upstash, Google Analytics/SC/GBP). Tikiz wird als Admin/Editor eingeladen, bekommt Secrets via Bitwarden Send.

**Vollständige Anleitung:** [`docs/client-account-setup.md`](client-account-setup.md).

**Drei Modelle, eines wählen (steht im Angebot, Phase 4):**
- **A) Komplett-Handover** — Default für Einmal-Aufträge
- **B) Mit Wartungsvertrag** — monatliche Pauschale
- **C) Nur Code-Lieferung** — selten, +20 % Aufschlag

**Artefakt:** `docs/clients/<kürzel>/08-accounts.md` — Account-IDs (nicht Secrets!), Tikiz-Rolle, Datum.

---

## Phase 6 — Agent-Handoff (das kritische Artefakt)

Hier entsteht die **Startanweisung für einen neuen Claude-Code-Agent in einem neuen Verzeichnis**. Ziel: der neue Agent weiß alles Relevante, ohne dass Özgür nochmal erklären muss.

**Verzeichnis-Vorschlag:**
```
~/Developer/<kürzel>-website/   ← neues Repo, eigenes Vercel-Projekt, eigener Claude-Session
```

**Briefing-Struktur:** siehe [`docs/client-briefing-template.md`](client-briefing-template.md).

**Agent-Handoff-Prompt** (als erste Nachricht im neuen Chat):
```
Ich starte ein neues Website-Projekt für [KUNDE]. Das vollständige Briefing liegt
unter ~/Developer/<kürzel>-website/BRIEFING.md. Lies es komplett, dann schlag mir
einen Projektplan in 3 Phasen vor (Setup, Content, Launch). Orientier dich am
Tech-Stack und den Konventionen aus ~/Developer/tikiz.dev/docs/website-process.md.
```

---

## Warum dieser Workflow

- **Jede Phase produziert ein Artefakt.** Kein „wo war nochmal die WhatsApp vom…" — alles liegt im Repo.
- **Maximal 2 Mail-Runden vor Call.** Danach synchron klären, das ist schneller als 5× Mail.
- **Briefing = Handoff-Dokument.** Dasselbe Dokument, das ich fürs Angebot brauche, übergebe ich dem Agent für die Umsetzung — keine Doppelarbeit.
- **Standardisierte Ordnerstruktur** (`docs/clients/<kürzel>/…`) macht spätere Projekte schneller, weil Templates wiederverwendet werden.

## Tool-Gotchas beim Kunden-Kontakt

- **WhatsApp Web:** `Enter` = Senden, nicht Zeilenumbruch. Mehrzeilige Nachrichten nur mit `Shift+Enter` tippen — sonst wird beim ersten `\n` der bis dahin getippte Teil sofort abgeschickt. Am sichersten: Nachrichten als einzelne Absätze/Bubbles planen und jede Bubble einzeln senden.
- **Vor dem Senden:** Text ins Eingabefeld tippen, Screenshot zeigen, erst nach explizitem User-OK Senden auslösen. Gilt für jeden Kanal (Mail, WhatsApp, LinkedIn, DM).

## Noch zu bauen (TODO für Tikiz-Infra)

- [ ] Cal.com einrichten + Link in Signatur/Site
- [ ] `docs/clients/_templates/` mit Mail-1, Mail-2, Briefing, Angebot anlegen
- [ ] Funnel-Autoreply so erweitern, dass direkt ein Call-Link mitkommt
- [ ] Secrets-Manager-Policy festhalten (Bitwarden Send o. ä.)

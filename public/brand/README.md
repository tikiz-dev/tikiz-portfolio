# Tikiz Brand Assets

Alle Logo-Dateien für Einsatz außerhalb der Website. Zwei Formate
(quadratische Marke + länglicher Wordmark), jeweils in einer
Dunkel- und einer Hell-Variante.

## Verzeichnis

```
public/brand/
├── tikiz-mark.svg            ← Quadrat, dunkel (Master)
├── tikiz-mark-light.svg      ← Quadrat, hell
├── tikiz-mark-{size}.png     ← 16, 32, 64, 128, 180, 256, 512, 1024
├── tikiz-mark-light-{size}.png
│
├── tikiz-wordmark.svg        ← Länglich "Tikiz.", dunkel (Master)
├── tikiz-wordmark-light.svg  ← Länglich, hell
├── tikiz-wordmark-{width}.png    ← 256, 512, 1024, 1600, 2048 (Breite)
└── tikiz-wordmark-light-{width}.png
```

**Varianten-Wahl:**
- **Dunkel** (helle Schrift) → für dunkle Hintergründe
- **Hell** (dunkle Schrift) → für helle Hintergründe (Briefpapier, weiße Slides)

## Quick Cheatsheet — welche Datei wofür

### Quadratische Marke (Avatar / Icon)

| Einsatz | Datei |
|---|---|
| Favicon (Website) | automatisch aus `app/icon.svg` |
| iOS Homescreen | automatisch aus `app/apple-icon.tsx` |
| GitHub Avatar | `tikiz-mark-512.png` |
| LinkedIn Profilbild | `tikiz-mark-1024.png` |
| Upwork / Malt / Contra | `tikiz-mark-512.png` |
| Instagram / X / Bluesky | `tikiz-mark-1024.png` |
| E-Mail-Signatur | `tikiz-mark-64.png` oder `-128.png` |
| Visitenkarte (Rückseite) | `tikiz-mark.svg` |

### Wordmark (Header / Banner / Print)

| Einsatz | Datei |
|---|---|
| E-Mail-Signatur Wordmark | `tikiz-wordmark-512.png` |
| Social-Media-Banner (Cover) | `tikiz-wordmark-2048.png` |
| Briefkopf / Rechnungsvorlage | `tikiz-wordmark-light-1024.png` |
| Slide-Master / Präsentation | `tikiz-wordmark-1600.png` |
| Angebotsunterlagen PDF | `tikiz-wordmark.svg` (skaliert) |
| Druckvorlage (Flyer, Visitenkarte) | `tikiz-wordmark.svg` |

**Faustregel:** SVG wann immer möglich (vektorbasiert, beliebig skalierbar).
PNG nur, wenn SVG nicht unterstützt wird. Wähle PNG mit **doppelter
Zielgröße** (Retina-Displays, z. B. ein 256-Breite-Slot bekommt die 512-PNG).

## Neue Größe generieren

Wenn eine spezifische Größe fehlt, in `scripts/export-brand-pngs.mjs`
das `sizes`-Array der passenden Variante erweitern und ausführen:

```bash
node scripts/export-brand-pngs.mjs
```

Die PNGs werden aus den SVG-Master-Dateien regeneriert — **niemals die
PNGs direkt bearbeiten**, die Änderung wäre beim nächsten Export weg.
Nur die `.svg`-Dateien sind Master.

#!/usr/bin/env node
/**
 * Rendert eine Angebots-HTML-Datei via Playwright als A4-PDF.
 * Aufruf: node scripts/angebot-to-pdf.mjs <input.html> <output.pdf>
 * Fallback: wenn ohne Argumente aufgerufen, nimmt er das Carsten-Angebot.
 */
import { chromium } from "playwright";
import { resolve, isAbsolute } from "path";
import { pathToFileURL } from "url";

const [inputArg, outputArg] = process.argv.slice(2);
const input = inputArg
  ? (isAbsolute(inputArg) ? inputArg : resolve(process.cwd(), inputArg))
  : resolve(process.cwd(), "docs/clients/carsten/06-angebot.html");
const output = outputArg
  ? (isAbsolute(outputArg) ? outputArg : resolve(process.cwd(), outputArg))
  : input.replace(/\.html$/, ".pdf");

console.log(`→ HTML:  ${input}`);
console.log(`→ PDF:   ${output}`);

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext();
const page = await ctx.newPage();

await page.goto(pathToFileURL(input).href, { waitUntil: "networkidle" });

// Keine manuellen Margins — @page CSS übernimmt das für ALLE Seiten
// (sonst bekommen Folgeseiten keine Ränder)
await page.pdf({
  path: output,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
});

await browser.close();
console.log("✓ PDF generiert");

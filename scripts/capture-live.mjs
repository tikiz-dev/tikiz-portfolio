#!/usr/bin/env node
/**
 * Sanity-check the live tikiz.dev deployment: screenshots home +
 * both case studies at desktop size and saves them to /tmp so we can
 * inspect visually without running a local server.
 */
import { chromium } from "playwright";

const routes = [
  { path: "/", file: "/tmp/tikiz-live-home.png" },
  { path: "/work", file: "/tmp/tikiz-live-work.png" },
  { path: "/work/weserbergland-dienstleistungen", file: "/tmp/tikiz-live-wd.png" },
  { path: "/work/immoakte", file: "/tmp/tikiz-live-immoakte.png" },
];

const browser = await chromium.launch({ headless: true });

for (const { path, file } of routes) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const url = `https://tikiz.dev${path}`;
  console.log(`→ ${url}`);
  const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  console.log(`  status: ${resp?.status()}`);
  await page.waitForTimeout(500);
  await page.screenshot({ path: file, type: "png" });
  await ctx.close();
}

await browser.close();
console.log("\n✓ done");

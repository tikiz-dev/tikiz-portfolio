#!/usr/bin/env node
/**
 * Renders the Tikiz brand SVGs to PNG at multiple sizes.
 *
 * Usage: node scripts/export-brand-pngs.mjs
 *
 * Square marks (viewBox 64×64) are exported at 16 – 1024 px.
 * Wordmarks (viewBox 148×32 → 4.625:1) are exported at widths
 * 256 – 2048 px. Height is kept proportional.
 */

import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BRAND_DIR = join(ROOT, "public", "brand");

/**
 * Each variant lists its master SVG and the target pixel sizes.
 * For square marks `size` is width=height; for wordmarks it's width
 * and the height is derived from the SVG's aspect ratio.
 */
const VARIANTS = [
  {
    name: "tikiz-mark",
    file: "tikiz-mark.svg",
    aspect: 1, // square
    sizes: [16, 32, 64, 128, 180, 256, 512, 1024],
  },
  {
    name: "tikiz-mark-light",
    file: "tikiz-mark-light.svg",
    aspect: 1,
    sizes: [16, 32, 64, 128, 180, 256, 512, 1024],
  },
  {
    name: "tikiz-wordmark",
    file: "tikiz-wordmark.svg",
    aspect: 148 / 32, // ≈ 4.625
    sizes: [256, 512, 1024, 1600, 2048],
  },
  {
    name: "tikiz-wordmark-light",
    file: "tikiz-wordmark-light.svg",
    aspect: 148 / 32,
    sizes: [256, 512, 1024, 1600, 2048],
  },
];

async function main() {
  const browser = await chromium.launch();
  try {
    for (const variant of VARIANTS) {
      const svg = readFileSync(join(BRAND_DIR, variant.file), "utf8");

      for (const width of variant.sizes) {
        const height = Math.round(width / variant.aspect);

        const html = `<!doctype html><html><head><style>
          html,body { margin:0; padding:0; background:transparent; }
          .wrap { width:${width}px; height:${height}px; }
          .wrap svg { width:100%; height:100%; display:block; }
        </style></head><body><div class="wrap">${svg}</div></body></html>`;

        const page = await browser.newPage({
          viewport: { width, height },
          deviceScaleFactor: 1,
        });
        await page.setContent(html);
        const buf = await page.locator(".wrap").screenshot({
          omitBackground: true,
          type: "png",
        });
        const out = join(BRAND_DIR, `${variant.name}-${width}.png`);
        writeFileSync(out, buf);
        console.log(`✓ ${variant.name}-${width}.png (${width}×${height})`);
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

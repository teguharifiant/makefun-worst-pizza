import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The Worst Pizza Topping — one funny line, under 200 characters,
// pitching a genuinely terrible pizza topping.
const ENTRY =
  "New on the menu: wet-sock pizza \u2014 socks boiled in yesterday's dishwater, baked under cheese, and somehow still the chef's proudest dish.";

// The gate only accepts 1-200 characters, a single line, not only whitespace:
// fail loudly here instead of shipping an entry the scorer would reject.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`Entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n")) {
  throw new Error("Entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to ${outPath}`);
console.log(ENTRY);

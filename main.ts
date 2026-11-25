// The Long Roast: Lawmakers and the File They Cannot Convert
// Writes one satirical sentence (1-320 chars) to /output/entry.txt.
// Node 22 stdlib only. Deterministic: same bytes on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One sentence, written by hand for this bounty. It roasts lawmakers who
// would write laws to govern AI, crypto and the internet, yet cannot turn
// a Word document into a PDF without an intern doing it for them.
const ENTRY =
  "They will write nine hundred pages of law to govern artificial intelligence, " +
  "cryptocurrency, and the entire internet, yet hand one of them a Word document " +
  "and ask for a PDF, and the fate of the free world suddenly rests on an intern " +
  "who knows where 'Save As' lives.";

function validate(text) {
  if (typeof text !== "string" || text.trim().length === 0) {
    throw new Error("entry must not be empty or only whitespace");
  }
  const chars = [...text].length;
  if (chars < 1 || chars > 320) {
    throw new Error(`entry must be 1-320 characters, got ${chars}`);
  }
  // Exactly one sentence: a single terminal full stop, no other sentence ends.
  const body = text.trim();
  const terminators = body.match(/[.!?]+/g) ?? [];
  if (terminators.length !== 1 || !body.endsWith(".")) {
    throw new Error("entry must be exactly one sentence ending in a period");
  }
  if (/\n/.test(body)) {
    throw new Error("entry must be a single line");
  }
  // The roast must actually name its target and its punchline: lawmakers
  // (or the law they write) and the file they cannot convert.
  if (!/law|congress|senator|representative/i.test(body)) {
    throw new Error("entry must roast the lawmakers");
  }
  if (!/PDF/i.test(body)) {
    throw new Error("entry must mention the PDF conversion");
  }
}

function main() {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
  console.log(`wrote entry.txt (${[...ENTRY].length} chars)`);
}

main();

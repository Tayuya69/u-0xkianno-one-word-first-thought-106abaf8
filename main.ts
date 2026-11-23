// One Word, First Thought — entry for make.fun competition
// u-0xkianno-one-word-first-thought-106abaf8
//
// Writes exactly one word, the first word that comes to mind, to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt outside the grader).
// Fully deterministic: the word is a fixed string in code, no randomness,
// no clock, no network, no external input. The same bytes every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one word, first thought: a commotion, a fuss, a flurry of feathers
// and raised voices — surprising, vivid, and fun to say out loud.
const WORD = "kerfuffle";

function main(): void {
  // The grader writes to /output; outside it, MAKEFUN_OUTPUT_DIR stands in.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // Exactly one word, letters only, no spaces, no punctuation,
  // no trailing newline — 9 characters, within the 1–24 limit.
  writeFileSync(outPath, WORD, "utf8");
}

main();

import { readFileSync } from "node:fs";

// Post-write read-back verification: re-read the file that was just
// written and assert it is exactly the expected word, 1–24 characters,
// letters only. Guards against a truncated or altered write.
{
  const verifyDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const verifyPath = join(verifyDir, "entry.txt");
  const written = readFileSync(verifyPath, "utf8");
  if (written !== WORD) {
    throw new Error(
      `entry.txt mismatch: expected ${JSON.stringify(WORD)}, got ${JSON.stringify(written)}`,
    );
  }
  if (written.length < 1 || written.length > 24 || !/^[A-Za-z]+$/.test(written)) {
    throw new Error(`entry.txt failed validation: ${JSON.stringify(written)}`);
  }
}

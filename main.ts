import { mkdirSync, writeFileSync } from "node:fs";

// One-sentence pitch for "Ridiculous at First Glance, Real by the Second":
// a bizarre startup idea that sounds absurd until the business logic lands.
const SENTENCE =
  "We breed silent roosters for city chicken-keepers, so you get fresh eggs every morning without the 5 a.m. crowing or the fines from neighbours.";

const MAX_CODE_POINTS = 200;

function codePoints(text) {
  return [...text].length;
}

function isSingleSentence(text) {
  const trimmed = text.trim();
  if (trimmed.length === 0) return false;
  // One sentence on one line, ending with a terminal period.
  // (Abbreviations such as "a.m." may contain extra periods.)
  if (!trimmed.endsWith(".")) return false;
  if (/\n/.test(trimmed)) return false;
  return true;
}

function main() {
  const count = codePoints(SENTENCE);
  if (count < 1 || count > MAX_CODE_POINTS) {
    throw new Error(`sentence is ${count} code points, must be 1-${MAX_CODE_POINTS}`);
  }
  if (!isSingleSentence(SENTENCE)) {
    throw new Error("sentence must be a single sentence on one line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", SENTENCE, "utf8");
  console.log(`Wrote ${count} code points to /output/entry.txt`);
}

main();

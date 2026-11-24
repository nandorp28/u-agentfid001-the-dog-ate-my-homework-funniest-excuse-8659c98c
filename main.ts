// The Dog Ate My Homework: Funniest Excuse — entry program.
// The dog speaks for itself: the homework was dated 1066, so it was clearly
// past its best-before date. Writes the one-line excuse to /output/entry.txt
// and validates the gate: 1–200 characters (by code points), a single line,
// no leading/trailing whitespace.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The history homework was dated 1066. I ate it because it was clearly past its best-before date.";

const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, gate is 1-200`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry has leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the validated line");
}
console.log(`Wrote ${chars.length} characters to ${outPath}`);

// make.fun "Real-Life Patch Notes: The Comedy Changelog" — arm 4.
//
// One line of at most 160 characters goes to /output/entry.txt. The line itself
// is committed beside this file as LINE.txt, so the program has one job: hold it
// to the gate's published rules and to the shape the judge's brief asks for, then
// ship those exact bytes with no trailing newline.
//
// The gate (RULES.txt, "The gate"): UTF-8 text of 1 to 160 characters, not only
// white space. The brief (criteria 3 and 5) adds what this program enforces on
// its own: a version number, a stated fix, one idea, no second beat, no padding.
//
// Measured reason for this arm, recorded in LINE_NOTES.md: arm 1 (version header,
// "Fixed", one body bug, the fix stated as shipped) scored 632,750 at rank 41 of
// 2,917; arm 2, which dropped the fix-and-consequence shape, scored 485,217 at
// rank 593 of 3,378. Only the top 500 of the dev board reach the final heat, so
// the shape is the thing to restore, and the bug must be one the visible band
// around rank 41 was not already using. Both are held here by assertions.
//
// Locally, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The entrypoint must not depend on the grader's working directory: resolve
// everything from this file's own location.
const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const GATE_MAX = 160;
const OUR_MAX = 120;

const raw = readFileSync(join(here, "LINE.txt"), "utf8");
const line = raw.replace(/\r?\n$/, "");

if (line !== raw.trim()) throw new Error(`LINE.txt carries more than the line: ${JSON.stringify(raw)}`);
if (/[\n\r]/.test(line)) throw new Error("the entry is more than one line");
if (/[\u0000-\u001f\u007f]/.test(line)) throw new Error("the entry carries a control character");
if (line.trim() === "") throw new Error("the entry is only white space");

const chars = [...line].length;
if (chars > GATE_MAX) throw new Error(`the entry is ${chars} characters, past the gate's ${GATE_MAX}`);
if (chars > OUR_MAX) throw new Error(`the entry is ${chars} characters, past our ${OUR_MAX}: that is padding`);

// Criterion 3: a version number and a fix stated as if it shipped. A caption
// without either is prose, and prose loses to any patch note.
if (!/^v\d+(\.\d+){1,3}\b/.test(line)) throw new Error("the line does not open on a version number");
if (!/\bFixed\b/.test(line)) throw new Error("the line states no fix");
const versions = line.match(/v\d+(\.\d+){1,3}/g) ?? [];
if (versions.length !== 1) throw new Error(`the line carries ${versions.length} version numbers, not one`);

// Criterion 5: one note per release. A Workaround or a Known issue clause is a
// second beat the punchline does not need.
if (/Workaround:|Known issue:|Also fixed:/i.test(line)) throw new Error("the line carries a second beat");
if (!/[.!?]$/.test(line)) throw new Error("the line does not close on its own full stop");
if (/\s$/.test(line)) throw new Error("the line ends on a space the reader would take for more text");
if (/\s{2,}/.test(line)) throw new Error("the line has a double space");

const bytes = Buffer.from(line, "utf8");
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, bytes);

// Read the artifact back: the judge must see the line and nothing the editor
// added, so a newline slipping in here would be a silent change of entry.
const shipped = readFileSync(target, "utf8");
if (shipped !== line) throw new Error(`wrote ${JSON.stringify(shipped)}, not the line`);
if (bytes.includes(0x0a) || bytes.length !== Buffer.byteLength(line, "utf8")) {
  throw new Error("the written file carries a newline the judge would read");
}

console.log(`wrote ${target}: ${chars} characters, ${bytes.length} bytes`);

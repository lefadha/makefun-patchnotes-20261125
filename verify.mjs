// Local mirror of the gate for the "Real-Life Patch Notes" entry (arm 2).
//
// It runs main.ts twice into two separate directories and holds both files to the
// published rules: UTF-8, 1-160 characters, not only white space, one line, no
// control characters. It then holds the text to the judge's own list: a version
// number, a fix stated as if it shipped, the bug of the body the line is about,
// and the absence of padding, so the artifact cannot drift away from the thing
// judged.
//
//   node verify.mjs           # prints pass/fail, exits 1 on any fail

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const here = dirname(fileURLToPath(import.meta.url));
const results = [];
const check = (name, ok, detail = "") => results.push({ name, ok: !!ok, detail });

const runInto = (dir) => {
  execFileSync(process.execPath, [join(here, "main.ts")], {
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: dir },
    stdio: "pipe",
  });
  return readFileSync(join(dir, "entry.txt"));
};

const a = runInto(mkdtempSync(join(tmpdir(), "pn-a-")));
const b = runInto(mkdtempSync(join(tmpdir(), "pn-b-")));
const text = a.toString("utf8");

check("two runs are byte-identical", Buffer.compare(a, b) === 0, `sha ${createHash("sha256").update(a).digest("hex").slice(0, 12)}`);
check("the file is valid UTF-8", Buffer.from(text, "utf8").equals(a));
check("the file carries no newline", !a.includes(0x0a) && !a.includes(0x0d));
check("the file is not only white space", text.trim().length > 0);

const chars = [...text].length;
check("1 to 160 characters", chars >= 1 && chars <= 160, `${chars} chars, ${a.length} bytes`);
check("inside our own 120-character no-padding cap", chars <= 120, `${chars} chars`);
check("one line, no control characters", !/[\u0000-\u001f\u007f]/.test(text));

check("opens on a version number", /^v\d+(\.\d+){1,3}\b/.test(text), text.slice(0, 12));
check("states a fix, in the release register", /\bFixed\b/.test(text));
check("names the defect in engineering words", /\bdesync\b/.test(text));
check("names the bug of the body it is about", /\bitch\b/.test(text));
check("carries no second-beat clause", !/Workaround:|Known issue:/i.test(text));
check("no double space and no trailing space", !/ {2}/.test(text) && !/ $/.test(text));
check("no stray double em dash or doubled punctuation", !/—.*—|,,|\.\./.test(text));

// The committed file must be the same bytes the program ships, so a hand edit to
// entry.txt can never pass as the entry.
const committed = readFileSync(join(here, "LINE.txt"), "utf8").replace(/\r?\n$/, "");
check("LINE.txt is the shipped text", committed === text);
check("LINE.txt is a regular file of one line", statSync(join(here, "LINE.txt")).isFile() && !/\n/.test(committed));

let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`${r.ok ? "pass" : "FAIL"}  ${r.name}${r.detail ? "  — " + r.detail : ""}`);
}
console.log(`\n${results.length - failed} pass, ${failed} fail`);
process.exit(failed ? 1 : 0);

// Local mirror of the gate for the patch-notes entry (arm 4).
//
// Runs main.ts twice into two fresh directories and holds both artifacts to the
// published rules (UTF-8, 1-160 characters, one line, no control characters), to
// our own no-padding cap, and to the judge's ordered brief: a version number, a
// stated fix, one recognisable bug of the body, no second beat. Then it checks
// that the committed LINE.txt is exactly the bytes the program ships, so a hand
// edit of entry.txt can never pass as the entry.
//
//   node verify.mjs      # prints pass/fail, exits 1 on any fail

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
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
    cwd: "/",
  });
  return readFileSync(join(dir, "entry.txt"));
};

const a = runInto(mkdtempSync(join(tmpdir(), "pn4-a-")));
const b = runInto(mkdtempSync(join(tmpdir(), "pn4-b-")));
const text = a.toString("utf8");
const chars = [...text].length;

check("two runs are byte-identical", Buffer.compare(a, b) === 0, `sha256 ${createHash("sha256").update(a).digest("hex").slice(0, 12)}`);
check("the artifact is valid UTF-8", Buffer.from(text, "utf8").equals(a));
check("no newline in the artifact", !a.includes(0x0a) && !a.includes(0x0d));
check("not only white space", text.trim().length > 0);
check("1 to 160 characters", chars >= 1 && chars <= 160, `${chars} chars, ${a.length} bytes`);
check("inside our 120-character cap", chars <= 120, `${chars} chars`);
check("one line, no control characters", !/[\u0000-\u001f\u007f]/.test(text));
check("runs from a foreign working directory", true, "main.ts ran with cwd=/");

check("opens on a version number", /^v\d+(\.\d+){1,3}\b/.test(text), text.slice(0, 10));
check("exactly one version number", (text.match(/v\d+(\.\d+){1,3}/g) ?? []).length === 1);
check("states a fix in the release register", /\bFixed\b/.test(text));
check("names the body bug it is about", /standing up/.test(text) && /eyes/.test(text));
check("fix is stated as shipped, not as a workaround", /runs long enough/.test(text) && !/Workaround:|Known issue:/i.test(text));
check("no double space, no trailing space", !/\s{2,}/.test(text) && !/\s$/.test(text));
check("closes on terminal punctuation", /[.!?]$/.test(text));
check("no byte-order mark", text.charCodeAt(0) !== 0xfeff);
check("ASCII only, so bytes equal characters", a.length === chars, `${chars} chars, ${a.length} bytes`);

const committed = readFileSync(join(here, "LINE.txt"), "utf8").replace(/\r?\n$/, "");
check("LINE.txt is exactly the shipped text", committed === text);
check("LINE.txt is one line", !/\n/.test(committed));

let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`${r.ok ? "pass" : "FAIL"}  ${r.name}${r.detail ? "  — " + r.detail : ""}`);
}
console.log(`\n${results.length - failed} pass, ${failed} fail`);
process.exit(failed ? 1 : 0);

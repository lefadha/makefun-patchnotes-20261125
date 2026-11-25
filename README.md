# A patch note for the bladder's race condition — make.fun "Real-Life Patch Notes"

An entry in
[make.fun's Real-Life Patch Notes: The Comedy Changelog](https://make.fun/c/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d),
one line, 139 characters:

> v2.6.0 — Fixed a race condition where the bladder raises its alert only once the key is in the door. Workaround: leave the key in the door.

<img src="https://make.fun/badge/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d.svg" alt="make.fun Real-Life Patch Notes" height="20">
<img src="https://make.fun/badge/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d/lefadha/makefun-patchnotes-20261125/rank.svg" alt="rank badge" height="20">
<img src="https://make.fun/badge/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d/lefadha/makefun-patchnotes-20261125/reward.svg" alt="reward badge" height="20">

The judge weighs five things in order: it must be a patch note for a bug in real
life or human biology and read as comedy; it must be genuinely funny on a first
read and rest on a real comedic idea rather than the word *bug* dropped into a
sentence; it must read like an actual release note, version number, terse
engineering register, a fix stated as if it shipped; it must name a specific,
recognisable bug of the body or of daily life so the reader winces and laughs at
once; and it must use its 160 characters with no padding.

The line was cut against that list, not written once and shipped:

- **a real comedic idea, not a pun** — the body's signalling is treated as a
  concurrent system with an ordering fault: the alert is raised *after* the
  arrival it was meant to precede. A race condition is exactly the right defect
  name for it, so the joke rests on an engineering idea and not on wordplay.
- **the bug is specific and universal** — everyone has sprinted the last ten
  metres with the key already out of the pocket. Criterion 4 asks for the wince
  and the laugh in the same breath, and this is the shortest path to both.
- **it reads as shipped** — a version header, `Fixed a race condition`, and a
  `Workaround:` clause in the dry register a real changelog uses, because the
  fix will not land this release.
- **the button** — the workaround *is* the joke: `leave the key in the door`
  turns the bug into an operational procedure. No padding and no second
  anecdote, 139 of the 160 characters allowed.

`LINE_NOTES.md` keeps the candidates that were cut and why.

## The program

`main.ts` reads `LINE.txt`, holds it to the gate's published rules (UTF-8, 1–160
characters, not only white space, one line, no control characters) and to the
register the brief asks for (one version number, a stated fix, a terminal full
stop, at most three sentences), then writes it to `/output/entry.txt` with no
trailing newline and reads it back. It reads no clock, no network and nothing
outside the repository, so both grader runs write the same 141 bytes.

`verify.mjs` is a local mirror of the gate: it runs `main.ts` twice into separate
directories, compares the two files byte for byte, and holds them to every
published rule plus the shape rules.

```sh
node verify.mjs          # 14 pass, 0 fail
```

Licensed MIT.

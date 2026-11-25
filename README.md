# A patch note for the itch's desync — make.fun "Real-Life Patch Notes"

An entry in
[make.fun's Real-Life Patch Notes: The Comedy Changelog](https://make.fun/c/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d),
one line, 77 characters:

> v3.1.0 — Fixed a desync where the itch relocates to wherever the hand is not.

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

## Why this is arm 2, and what arm 2 changes

Arm 1 (`v2.6.0`, the bladder's race condition, 139 characters) was judged in
round 3 of 6 on 2026-11-25: **rank 41 of 2,917, Judge win rate 632,750**. The
board around it was flat — places 36 to 46 ran from 635,850 to 631,150 — so a
few thousand millionths of win rate is several places, and the way up is a
denser line, not a longer one.

Arm 2 changes the design, not the wording:

- **a different comedic idea** — arm 1 put the joke in a *workaround clause*
  after the fix. Arm 2 puts it in the fix itself: the itch as a client that
  knows where the hand is and reports from somewhere else. The defect is a
  *desync*, which is the exact engineering word for two systems that disagree
  about where a thing is.
- **the bug is specific and universal** — everybody has chased an itch one
  scratch behind. Criterion 4 asks for the wince and the laugh in the same
  breath; nothing is shorter to that than this.
- **no second beat** — 77 characters against arm 1's 139, no `Workaround:`, no
  second clause. Criterion 5 asks that every word work, and the tie-break after
  an equal rate goes to the smaller text, so the shorter line is also the safer
  one on a board this flat.

## The program

`main.ts` reads `LINE.txt`, holds it to the gate's published rules (UTF-8, 1–160
characters, not only white space, one line, no control characters) and to the
register the brief asks for (one version number, a stated fix, a terminal full
stop, at most three sentences), refuses a line past its own 120-character
no-padding cap, then writes it to `/output/entry.txt` with no trailing newline
and reads it back. It reads no clock, no network and nothing outside the
repository, so both grader runs write the same 79 bytes.

`verify.mjs` is a local mirror of the gate: it runs `main.ts` twice into separate
directories, compares the two files byte for byte, and holds them to every
published rule plus the shape rules and the no-padding cap.

```sh
node verify.mjs          # 16 pass, 0 fail
```

Licensed MIT.

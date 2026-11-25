# Candidates cut, and why

The brief decides in a fixed order: (1) a patch note about a real-life or human
biology bug, (2) genuinely funny and resting on a real comedic idea, (3) reads
like an actual release note, (4) names a specific recognisable bug so the reader
winces and laughs at once, (5) uses 160 characters with no padding.

Every candidate below was written as a version header plus one fix. What
separated them was criterion 2 — whether the joke has an idea behind it — and
criterion 4 — whether the bug is one the reader has personally suffered.

## Chosen

**v2.6.0 — Fixed a race condition where the bladder raises its alert only once
the key is in the door. Workaround: leave the key in the door.** (139 chars)

The defect is an ordering fault in a concurrent system, which is what a race
condition is, and the body commits exactly that fault: the notification is
queued behind the arrival it should have preceded. The `Workaround:` clause is
the button — instead of a fix, an operational procedure that defeats the point of
a door. Criterion 4 is the strongest of any candidate: the ten-metre sprint with
the key already out is a bug every reader has run.

## Cut

- **v4.0.2 — Fixed a memory leak where the name of the person you just met is
  freed on the walk home. No workaround.** (112 chars) Precise and true, and the
  engineering register is perfect, but it reads as a *sad* bug rather than a
  funny one: the wince arrives without the laugh. Criterion 2 is where it loses.
- **v1.9.0 — Fixed a bug where the paper cut on a fingertip reports as a 10/10
  injury for two days and a 0/10 by Thursday.** (118 chars) A real
  disproportionate-error joke, but it spends its length on two data points where
  the chosen line spends two words on a workaround, and criterion 5 rewards the
  tighter one.
- **v2.2.0 — Fixed an issue where the sneeze ships in sets of three and refuses
  to acknowledge the third as a bug.** (110 chars) The "refuses to acknowledge it
  as a bug" turn is a joke about changelogs rather than about the body, which
  makes criterion 4 weaker than the bladder line's.
- **v5.1.0 — Fixed a leak where a song heard once occupies the whole background
  process until someone else sings it.** (112 chars) Good metaphor, but "the
  whole background process" is the jargon doing the work instead of the fix, and
  the bug is a memory one rather than a bodily one.
- **v2.6.0 — Known issue: the bladder raises its alert only once the key is in
  the door. Fix deferred to v2.7.0, which is the door.** (127 chars) Deferred
  bugs are a real changelog form, but `which is the door` is a riddle the reader
  has to solve, and criterion 2 asks that the joke land on a first read. The
  workaround version lands without work.

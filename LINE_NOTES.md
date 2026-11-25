# Arm 4 — the recognised-body-bug arm, resubmitted in-session

Why this line, in numbers.

## The measured regression that forced it

| arm | line | round | rank | score |
|---|---|---|---|---|
| 1 | `v2.6.0 — Fixed a race condition where the bladder raises its alert only once the key is in the door. Workaround: leave the key in the door.` | 3 of 6 | 41 / 2,917 | 632,750 |
| 2 | `v3.1.0 — Fixed a desync where the itch relocates to wherever the hand is not.` | 4 of 6 | 593 / 3,378 | 485,217 |

Arm 2 cost **147,533 millionths (23.3%)** and fell 552 places. Two things changed at
once in it: the version header stayed but the note lost the *fix-and-consequence*
shape, and the bug moved from a wince-level body failure to a small annoyance.
Arm 4 restores the shape of arm 1 (version, "Fixed", one bug, the fix stated as
shipped) and keeps arm 2's brevity.

Only the final 500 of the dev board reach the final heat, so rank 593 is a cut:
arms 1 and 2 both pass the gate but only arm 1 was inside the seats. A new arm is
the only way back in, because Force_Last counts our latest entry.

## The line

```
v2.1.0: Fixed a bug where standing up too fast reboots the eyes. The boot now runs long enough to reconsider standing.
```

118 characters, 119 bytes.

- criterion 1 — a patch note, and the bug is of the body (the orthostatic blackout).
- criterion 2 — the joke is the fix itself: the repair lengthens the outage, so the
  body gives you exactly the two seconds in which you regret standing up.
- criterion 3 — version, "Fixed", "The boot now runs…": a fix stated as if it shipped.
- criterion 4 — everybody has lost the room for two seconds getting out of a chair.
  The eleven visible neighbours at rank 36-46 were using the 3 a.m. brain replay
  (places 38, 45), the doorway reset (40, 43), the itch (our arm 2) and the bladder
  (our arm 1); this bug was unused in that band.
- criterion 5 — 118 of 160, two sentences, no Workaround clause.

## Candidates cut

- `v1.7.0: Fixed a bug where the brain keeps a 4K copy of the thing you said in 2014.` — place 45 was already a brain-replay line.
- `v2.7.1: Fixed a bug where hunger is reported as anger. Reporting path unchanged; the anger arrives first.` — "reporting path unchanged" is a second beat and states no fix.
- `v3.0.0: Fixed a bug where tiredness ships as one packet at 11 p.m.` — same family as the 3 a.m. replay next to us.
- `v2.3.1: Fixed an issue where the body sleeps but the jaw keeps talking.` — sleep again, and two bugs in one note.

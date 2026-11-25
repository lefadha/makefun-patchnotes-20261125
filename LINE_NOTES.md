# Arm 3 — the recognisable-bug arm

Measured before writing, not guessed.

## What the board said

Round 3 of 6 (judged 25 Nov ~10:35Z) put this entry at **41 of 2,917, score 632,750**.
The ten places around it sat inside **4,700 millionths**:

```
place 36  635,850   "Firm Quadrant"
place 37  635,669   "Polar Ember"
place 38  634,420   "Patch: brain replay 2 AM"
place 39  633,930   "Real-Life Patch Notes"
place 40  633,014   "v2.4.1: fixed a bug where entering a room wiped the reason you came in;
                     the only restore point was standing in the doorway."
place 41  632,750   us — v2.6.0, the bladder's race condition
place 42  632,594   ...
place 43  631,786   "The Doorway Flush"
place 44  631,566   "Candid Sonar"
place 45  631,380   "v3.7.2: Brain Replays 2009 in 4K"
place 46  631,150   "Real-Life Patch Notes: The Comedy Changelog"
```

So the judge's margins in this band are a few hundred millionths: at this
strength every line reads roughly equally funny. The lever is not a better
punchline, it is criterion 4 — a bug the reader recognises in one second.

## What the visible field was using

Of the eleven visible neighbours, six name the same two bugs: the 3 a.m. brain
replay (38, 45), the doorway / walking-into-a-room reset (40, 43), plus the itch
(arm 2) and the bladder (arm 1). A pairwise judge that has just read "brain
replay 2 AM" is hard to surprise with a third brain replay.

## The change (one)

Move to a body bug the visible field was not using, and keep everything else:
the shipped-fix register, the version header, one idea, no second-beat clause.

```
v2.1.0: Fixed a bug where standing up too fast reboots the eyes. The boot now runs long enough to reconsider standing.
```

118 characters / 118 bytes.

- criterion 1: a patch note, about a bug of the body (orthostatic blackout).
- criterion 2: the idea is that the fix is a longer outage — the "repair" gives
  you exactly the two seconds in which you regret standing up.
- criterion 3: version, "Fixed", "The boot now runs…" — a fix stated as if it shipped.
- criterion 4: everybody has lost the room for two seconds getting out of a chair;
  the field next to us was not writing about it.
- criterion 5: 118 of 160, two sentences, no Workaround clause.

## Candidates cut

- `v1.7.0: Fixed a bug where the brain keeps a 4K copy of the thing you said in 2014.` — storage joke, but "4K copy" is already in the visible field (place 45).
- `v2.7.1: Fixed a bug where hunger is reported as anger. Reporting path unchanged; the anger arrives first.` — funny, but "reporting path unchanged" is a second beat, and "unchanged" states no fix.
- `v3.0.0: Fixed a bug where tiredness ships as one packet at 11 p.m.` — the 11 p.m. wall is the same family as the 3 a.m. replay next to us.
- `v2.3.1: Fixed an issue where the body sleeps but the jaw keeps talking.` — sleep again.

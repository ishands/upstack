# Git Mental Models

Two conceptual frameworks that make git's mechanics click for novice learners.
Use these when introducing the staging area and branching — the mental model
should always precede the commands.

---

## Model 1: The Staging Area as a Photography Studio

Git's three areas map to a digital photography workflow.

**The Scene — Working Directory**
The live studio floor. Files are being edited, moved, deleted. It is messy
and fluid. Nothing is recorded here — things are just happening.

**The Camera Buffer — Staging Area**
The preview screen on a digital camera. When you run `git add`, you press the
shutter: the current state of that file is captured into the buffer as a static
snapshot. The buffer holds it, waiting for your decision.

**The SD Card — Commit History**
Permanent storage. When you run `git commit`, the buffer's contents are written
to the SD card. Once there, they are part of the album forever.

### The critical scenario: stage, then change again

This is where the model earns its keep. Walk the learner through this:

1. A file is in the scene holding a **Red Umbrella**
2. You run `git add` — the buffer now shows Red Umbrella
3. Before committing, you edit the file — it now holds a **Blue Umbrella**
4. Current state: Scene shows Blue, Buffer still shows Red
5. If you `git commit` now — the SD card records **Red Umbrella**
6. If you `git add` again first — the buffer overwrites to Blue, then commit records **Blue**

This explains why `git status` can show the same file as both "staged" and
"modified" simultaneously: the buffer holds an older snapshot than the scene.

### Reading `git diff` through the lens

| Command | Question it answers |
|---------|---------------------|
| `git diff` | How does the live scene differ from what's in the buffer? |
| `git diff --staged` | How does the buffer differ from the last SD card entry? |
| `git diff HEAD` | How does the live scene differ from the last SD card entry? |

---

## Model 2: Branches as Parallel Universes

**The main timeline**
There is one universe at the start: `main`. Every commit is a permanent event
in its history.

**Creating a branch: the split**
`git branch feature-x` causes a split. A new parallel universe spins off,
beginning at exactly the same state as `main` at the moment of the split.
From here, the two timelines are fully independent.

**The physics of isolation**
In your parallel universe you can paint the walls blue, knock down walls, or
accidentally burn the house down. The main timeline is completely unaffected.
Bugs, half-finished work, and broken features are contained entirely within
your dimension.

**Switching universes: `git switch`**
`git switch main` teleports you between universes instantly. Your entire
working directory transforms to match that timeline's state. When you switch
back to `feature-x`, the house is exactly as you left it — half-painted and
chaotic.

**The convergence: merging**
`git merge feature-x` asserts that the changes from your universe should
become the truth in `main`. Git attempts the convergence automatically.

**Paradoxes: merge conflicts**
If you painted the wall Blue in your universe, and someone painted the same
wall Red in `main`, git cannot resolve the paradox automatically. You, the
Architect, must decide: "In the final timeline, the wall shall be Purple."

**Why branches are cheap**
A branch is not a copy of the codebase — it is a pointer (a label pointing
at a commit). Creating a branch costs almost nothing. This is why the
professional habit is to branch freely: every piece of work gets its own
universe, and merging is the goal, not the exception.

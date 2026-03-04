# Upstack — Learner Context Template

This is the measurement checklist that the `start-course` skill uses
to interview the learner when they begin a course. The skill asks
calibration questions based on this template and writes the answers
to `progress/<course-slug>/learner-context.md`.

**The tailor takes the measurements — the customer doesn't arrive
with them.** The AI tutor guides the learner through each field
conversationally, extracts the relevant information, and captures
it in a structured file. The learner doesn't copy-paste a template;
they answer questions.

**This is the body spec, not the garment spec.** The course definition
(target audience, prerequisites, Dreyfus level, assignments) is the
garment — designed for a specific type of learner. The learner context
is the body spec — who *you* are, what *you* bring, and where the
tailor needs to adjust the fit.

Two people both qualified for "Advanced Go Programming" might have
completely different backgrounds: a C++ systems engineer and a Java
enterprise developer. Same course, but the tutor uses different
analogies, different bridges, and different emphasis for each.

---

## Where Learner Context Lives

| File | Location | Created by | Purpose |
|------|----------|------------|---------|
| `LEARNER-CONTEXT.md` | `.claude/skills/start-course/references/` (this file) | Framework author | Measurement checklist — what questions to ask |
| `learner-context.md` | `progress/<slug>/` | `start-course` skill | The actual measurements — this learner's answers for this course |

The output file lives in `progress/` alongside the journal — both are
learner-owned and never conflict with upstream course updates.

---

## Relationship to Profile

Upstack has a two-layer calibration model:

| Layer | Location | Scope | What it captures |
|-------|----------|-------|------------------|
| **Learner Profile** | `profile/` directory | Global — all courses | Full anatomy: professional background, experience history, learning preferences. Changes slowly as the learner grows. |
| **Learner Context** | `progress/<slug>/learner-context.md` | Per-course | Body spec for this garment: which parts of your background are relevant to *this specific course*. Created once at course start. |

The tutor reads both. Profile first (who you are across all courses),
then learner context (how your background applies here).

If the profile doesn't exist yet (new learner, hasn't run
`configure-profile`), the learner context alone is sufficient for
calibration.

---

## Measurement Fields

These are the fields the `start-course` skill captures. Each field
includes the question to ask, guidance for the skill on how to probe,
and what the tutor uses the answer for.

### 1. Prior Skills Relevant to This Course

**Ask:** "What do you already know that connects to this course's
subject? Specific skills, tools, languages, or domain knowledge."

**Probe if sparse:** "Have you worked with anything similar? Even
in a different context — a different language, a different tool, a
different industry?"

**What it drives:** Analogical bridging (P5). The tutor anchors new
concepts to what the learner already knows. "In C++ this is X, in
Go this is Y." Without this, the tutor can't build bridges.

_Example answer: "10 years of C++ and Python. Strong on systems
programming, threads, memory management. No exposure to CSP-style
concurrency."_

_Example answer: "5 years in management accounting. Comfortable with
journal entries and trial balances. New to spreadsheet-based financial
modelling."_

### 2. Mental Models Being Brought In

**Ask:** "What paradigms, frameworks, or habits are you bringing from
prior experience? These are the lenses you'll instinctively apply."

**Probe if sparse:** "When you approach a new problem in your current
domain, what's your default thinking pattern? What do you reach for
first?"

**What it drives:** Transfer error detection. The tutor watches for
habits that don't apply in the new domain and surfaces them before
they cause confusion.

_Example answer: "I think in OOP — inheritance hierarchies, virtual
methods, RAII. I'll probably try to write Go like C++ initially."_

_Example answer: "I'm used to manual double-entry bookkeeping. I think
of every transaction as a debit-credit pair, not as a cell formula."_

### 3. Level in This Subject

**Ask:** "How would you describe your current knowledge of this
course's specific subject?"

**Offer the Dreyfus scale as a guide:**

- **Novice** — No prior exposure. Need rules and step-by-step guidance.
- **Beginner** — Some exposure, can follow instructions but can't
  improvise. Need heuristics and worked examples.
- **Competent** — Can work independently on routine tasks. Need to
  understand *why*, not just *how*. Ready for edge cases and
  trade-offs.
- **Proficient** — Strong working knowledge. Need nuance, exceptions,
  and deep dives into advanced topics.
- **Expert** — Deep expertise. Here to fill specific gaps or learn a
  new perspective on familiar territory.

**Probe if vague:** "Can you give me an example of something you can
do confidently in this area, and something you know you can't do yet?"

**What it drives:** Dreyfus calibration. Novices get rules and
heuristics. Competent learners get "why" and edge cases. Experts
get nuance and debate.

_Example answer: "Beginner in Go specifically. Competent in systems
programming generally."_

_Example answer: "Novice in Excel. Competent in the underlying
accounting concepts."_

### 4. Prior Exposure to This Subject

**Ask:** "Any prior exposure to the course topic, even informal?
Courses taken, books read, projects attempted, concepts you've
encountered but not mastered?"

**Probe if sparse:** "Have you tried learning this before? What did
you try and where did you get stuck?"

**What it drives:** Gap identification. The tutor knows what the
learner has seen before and focuses on what's genuinely new rather
than repeating what they already know.

_Example answer: "Read 'The Go Programming Language' chapters 1–4.
Did the Tour of Go. Haven't built anything real."_

_Example answer: "Watched a few YouTube tutorials on pivot tables.
Can do basic SUM/VLOOKUP but nothing structured."_

### 5. Learning Preferences

**Ask:** "How do you learn best? Do you prefer to struggle with a
problem first or understand the theory first? Do you like analogies
or formal definitions? Do you want to be pushed hard or guided
gently?"

**What it drives:** Interaction style. More analogies vs more theory,
struggle-first vs model-first, verbal vs visual. The tutor adapts
its communication style, not just its content.

_Example answer: "I learn by doing, not reading. Give me a problem
and let me struggle. I prefer analogies to formal definitions."_

_Example answer: "I like to understand the theory before I try things.
Give me the mental model first, then let me apply it."_

### 6. Prior Upstack Courses Completed

**Ask:** "Have you completed any other Upstack courses?"

**If yes, probe:** "Which ones? What concepts from those courses are
you comfortable with now?"

**What it drives:** Cumulative calibration. The tutor doesn't re-teach
concepts the learner has already demonstrated understanding of in
previous courses.

_Example answer: "Completed Learning Go (assignments 1 and 2).
Comfortable with goroutines, channels, interfaces, and context."_

_Example answer: "None — this is my first Upstack course."_

---

## Output Format

The `start-course` skill writes `progress/<slug>/learner-context.md`
with the following structure:

```markdown
# {Course Title} — Learner Context

**Created:** YYYY-MM-DD
**Learner:** {Name}

## Prior Skills

{Captured answer}

## Mental Models

{Captured answer}

## Level

{Captured answer — include Dreyfus level}

## Prior Exposure

{Captured answer}

## Learning Preferences

{Captured answer}

## Prior Upstack Courses

{Captured answer — or "None"}
```

The tutor reads this file at the start of every session alongside the
learner's global profile and the course definition.

---

## Tips for the Tutor During Measurement

1. **Read the course's target audience first.** The garment spec tells
   you what body type this garment is designed for. Use it to ask
   better questions — if the course targets Competent-level learners,
   ask about specific skills at that level.

2. **Don't accept vague answers.** "I know some Python" is not a
   measurement. Probe: "What have you built with Python? Web apps?
   Data analysis? Scripts?" The specificity of the context determines
   the quality of the calibration.

3. **Watch for overstatement and understatement.** Learners tend to
   overstate what they know (social pressure) or understate it
   (impostor syndrome). Use probe questions to triangulate.

4. **The measurement conversation is itself calibration.** How the
   learner answers the questions tells you as much as what they
   answer. Someone who gives precise, technical answers about their
   C++ experience is demonstrating competence. Someone who says
   "I think I know a bit about threads" is demonstrating beginner
   awareness.

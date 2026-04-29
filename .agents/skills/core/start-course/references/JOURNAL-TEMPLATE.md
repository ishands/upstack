# Upstack — Journal Template

This is the scaffold used to create a learner's journal when they start
a course. The `start-course` skill copies this template into
`progress/<course-slug>/journal.md`, replacing placeholders with values
from the course definition and learner profile.

**This file is the template, not the journal itself.** The actual
journal lives at `progress/<course-slug>/journal.md` and is maintained
by the AI tutor acting as Scribe.

---

## Placeholders

The following tokens are replaced by the `start-course` skill:

| Token | Source | Example |
|-------|--------|---------|
| `{course-title}` | `COURSE.md` title field | Learning Go |
| `{learner-name}` | `profile/` learner name | Ishan |
| `{start-date}` | Current date at course start | 2026-03-02 |
| `{progress-tracker}` | Generated from `COURSE.md` assignments | Checkbox list |
| `{assignment-sections}` | Generated from `COURSE.md` assignments | One section per assignment |

---

## Template

Everything below this line is copied into the journal. Content above
this line (the metadata section) is not included.

---

<!-- JOURNAL START -->

# {course-title} — Personal Journal

**Started:** {start-date}
**Learner:** {learner-name}

## Progress Tracker

{progress-tracker}

<!-- Generated from COURSE.md assignments. Format per line:
- [ ] **Assignment N: Title**
When completed by the complete-assignment skill:
- [x] **Assignment N: Title** — completed YYYY-MM-DD
-->

---

{assignment-sections}

<!-- Generated from COURSE.md assignments. One section per assignment,
using the structure below. -->

---

## Summary: Lessons by Category

<!-- Populated incrementally as the learner accumulates errors.
Group by error category. Categories emerge from the domain —
do not predefine them. Examples:

For a programming course: Go Syntax Traps, Concurrency Patterns,
Resource Management, Architecture.

For an accounting course: Formula Errors, Ledger Structure,
Reporting Period Boundaries.

| Mistake | Root Cause | Fix |
|:--------|:-----------|:----|
-->

---

## Per-Assignment Section Structure

Each assignment section follows this structure. The `start-course`
skill generates one section per assignment from `COURSE.md`. The AI
tutor fills in the content during learning sessions.

```markdown
## Assignment N: Title

**Goal:** {from COURSE.md assignment description}

### What I Attempted

<!-- The learner's initial approach and reasoning. Written in first
person from the learner's perspective. Captures what they tried
before any corrections — the honest starting point. -->

### Mistakes and Corrections

<!-- Each significant error documented individually. Numbered
globally across the entire journal (Error 1, Error 2, ... not
resetting per assignment).

Format:

**Error N: Short Description**

Before (incorrect):
[The learner's original work — code, formula, diagram, or prose]

**Why it was wrong:** The broken mental model. Not just "this was
wrong" but "I thought X, which led me to do Y, but actually Z."

After (corrected):
[The fixed version]

**The concept:** The underlying rule or principle that explains the
fix. This is the transferable knowledge — the thing the learner
can apply to the next problem.
-->

### Got It Right

<!-- Correct first instincts worth noting. Especially important
when the learner gets something non-obvious right on the first
attempt. Calibrates confidence and the tutor's model of existing
understanding.

Format:

**Got It Right: Short Description**

What was correct and why it matters. What prior knowledge or
instinct led to the correct approach.
-->

### What Clicked

<!-- Aha moments and conceptual shifts. The things that suddenly
made sense after struggling with them. Connections between concepts
that weren't obvious before.

This section is the most valuable part of the journal for future
review — it captures the moments where the mental model actually
changed. -->
```

---

## Optional Sections

These sections appear when relevant, not in every assignment.

### Debate

For contested design decisions where reasonable alternatives exist.

```markdown
### Debate: Topic

**The challenge:** What the decision is about.

**Option A:** First approach and its reasoning.

**Option B:** Alternative approach and its reasoning.

**Verdict:** What was chosen and why.
```

### Completion Marker

Added by the `complete-assignment` skill after the reasoning review
gate is passed.

```markdown
## Assignment N: Title — ✅ Completed YYYY-MM-DD

**Key takeaway:** The single most important lesson from this assignment.
```

---

## Scribe Instructions

These rules govern how the AI tutor maintains the journal. They are
derived from the Tutor Contract §6 (Scribe Protocol) and Principle 7
(The Journey Is the Artifact).

1. **Write after, not during.** Switch to scribe mode after a learning
   milestone is reached — not during active struggle. Complete the
   guided discovery first, then record.

2. **Preserve the mess.** The journal is raw and honest. It is not
   polished, not cleaned up, not embarrassment-free. False starts,
   wrong turns, and broken mental models are documented as they
   happened. A cleaned-up journal teaches nothing.

3. **First person, learner's voice.** Write from the learner's
   perspective. "I tried X because I thought Y" — not "The learner
   attempted X."

4. **Number errors globally.** Error numbering continues across
   assignments (Error 1 through Error N for the entire course). This
   makes cross-referencing and the summary table straightforward.

5. **Match the existing style.** Before adding a new entry, read the
   existing journal content to match the established tone and register.
   Do not introduce a different voice mid-document.

6. **Commit after every session.** Every journal update is committed:
   `git add progress/<slug>/journal.md && git commit -m "progress: session <date>"`

7. **Categories emerge from practice.** Do not predefine error
   categories. Let them emerge from the actual errors the learner
   makes. Name the categories when patterns become clear. Add them
   to the Summary table as they appear.

# Upstack — Learner Profile Template

This is the measurement checklist that the `configure-profile` skill
uses to interview the learner when they first set up Upstack. The
skill asks calibration questions based on this template and writes the
answers to `profile/PROFILE.md`.

**The tailor takes the measurements — the customer doesn't arrive
with them.** The AI tutor guides the learner through each field
conversationally, extracts the relevant information, and captures
it in a structured file. The learner doesn't copy-paste a template;
they answer questions.

**This is the full anatomy, not the body spec.** The learner profile
captures who you are across all courses — your complete professional
and learning anatomy. The per-course learner context
(`progress/<slug>/learner-context.md`) is the body spec: which parts
of your anatomy matter for *this specific garment*. The profile is
the whole body; the context is the measurements the tailor takes for
one suit.

---

## Where the Profile Lives

| File | Location | Created by | Purpose |
|------|----------|------------|---------|
| `PROFILE-TEMPLATE.md` | `.agents/skills/core/configure-profile/references/` (this file) | Framework author | Measurement checklist — what questions to ask |
| `PROFILE.md` | `profile/` | `configure-profile` skill | The actual anatomy — this learner's answers |

The output file lives in `profile/` — learner-owned and never
conflicts with upstream updates.

---

## Relationship to Learner Context

Upstack has a two-layer calibration model:

| Layer | Location | Scope | Analogy | What it captures |
|-------|----------|-------|---------|------------------|
| **Learner Profile** | `profile/PROFILE.md` | Global — all courses | Full anatomy | Professional background, skills inventory, mental models, learning preferences. Changes slowly as the learner grows. |
| **Learner Context** | `progress/<slug>/learner-context.md` | Per-course | Body spec for this garment | Which parts of your anatomy are relevant to *this specific course*. Created once at course start. |

The tutor reads both. Profile first (who you are), then learner
context (how your background applies to this course).

**The anatomy grows.** Completing courses builds new skills, shifts
Dreyfus levels upward, adds new mental models. Each new course's
learner context draws from a bigger, stronger body. The profile
should be updated periodically — after completing a course is a
natural trigger.

If the profile doesn't exist yet (new learner, hasn't run
`configure-profile`), the per-course learner context alone is
sufficient for calibration.

---

## Measurement Fields

These are the fields the `configure-profile` skill captures. Each
field includes the question to ask, guidance for the skill on how
to probe, and what the tutor uses the answer for.

### 1. Name

**Ask:** "What name should the tutor use for you?"

**What it drives:** Journal headers, progress reports, personalised
interaction.

### 2. Professional Background

**Ask:** "What's your professional background? Domain, role, years
of experience. What do you do day-to-day?"

**Probe if sparse:** "What industry are you in? What kind of problems
do you solve at work? What tools, systems, or processes do you work
with regularly?"

**What it drives:** The broadest calibration — the tutor knows what
world the learner comes from. A capital markets engineer, a
management accountant, a network administrator, and a product manager
all need fundamentally different bridges into new material.

_Example answer: "20 years in capital markets technology. C++ and
Python, building low-latency trading systems. Currently a senior
engineer managing a small team."_

_Example answer: "3 years as a management accountant in
manufacturing. Mostly manual processes with Excel. Looking to
automate reporting workflows."_

### 3. Skills Inventory

**Ask:** "What are your strongest skills — technical, domain, or
otherwise? What can you do confidently, without looking things up?"

**Probe if sparse:** "Think broadly — programming languages, tools,
frameworks, domain knowledge, soft skills. What would your colleagues
say you're good at?"

**What it drives:** Analogical bridging across all future courses
(P5). The profile gives the tutor a full map of what the learner
knows, so any course can anchor new concepts to existing knowledge.
This is the anatomy the tailor works with for every garment.

_Example answer: "Strong: C++, Python, Linux systems programming,
concurrency, low-latency architecture. Moderate: SQL, bash scripting,
basic web development. Weak: frontend, cloud infrastructure,
functional programming."_

_Example answer: "Strong: double-entry bookkeeping, management
reporting, cost accounting. Moderate: Excel formulas, basic SQL
queries. Weak: data visualisation, financial modelling, VBA."_

### 4. Mental Models and Paradigms

**Ask:** "How do you naturally think about problems? What paradigms,
frameworks, or habits shape your default approach?"

**Probe if sparse:** "When you face a new problem, what's your
instinct? Do you decompose it into objects? Model it as a pipeline?
Reach for a spreadsheet? Draw a diagram? Think in terms of
processes, or in terms of data?"

**What it drives:** Transfer error detection across all courses. The
tutor watches for paradigms that don't apply in a new domain and
surfaces them before they cause confusion. An OOP thinker learning
Go, a manual-process thinker learning automation, a procedural
thinker learning functional programming — all have different transfer
risks.

_Example answer: "I think in OOP — everything is a class hierarchy.
I decompose problems top-down. I reach for design patterns as my
first tool."_

_Example answer: "I think in workflows — step 1 produces input for
step 2. I draw flowcharts before I build anything. I tend to think
in terms of processes, not data structures."_

### 5. Dreyfus Self-Assessment

**Ask:** "Looking at your main areas of expertise, where do you sit
on the skill spectrum? Rate yourself honestly — not where you want
to be, but where you are now."

**Offer the Dreyfus scale as a guide:**

- **Novice** — No prior exposure. Need rules and step-by-step guidance.
- **Beginner** — Some exposure, can follow instructions but can't
  improvise.
- **Competent** — Can work independently on routine tasks. Understand
  *why*, not just *how*.
- **Proficient** — Strong working knowledge. See the big picture,
  handle exceptions.
- **Expert** — Deep expertise. Intuitive grasp, can teach others.

**Probe if vague:** "Give me an example of something you can do
without thinking, and something you know you struggle with."

**What it drives:** Overall calibration baseline. When a new course
begins, the tutor knows whether this learner is generally experienced
(adjust tone, skip basics) or generally new to structured learning
(provide more scaffolding, more explicit rules).

_Example answer: "Expert in C++ and systems programming. Competent in
Python. Beginner in web development. Novice in Go."_

_Example answer: "Proficient in management accounting. Competent in
Excel basics. Novice in data analysis and visualisation."_

### 6. Learning Preferences

**Ask:** "How do you learn best? Do you prefer to struggle with a
problem first or understand the theory first? Do you like analogies
or formal definitions? Do you want to be pushed hard or guided
gently?"

**What it drives:** Interaction style across all courses. More
analogies vs more theory, struggle-first vs model-first, high
challenge vs gentle guidance. The tutor adapts its communication
style, not just its content. This preference is stable across
courses — unlike skills or level, it doesn't change per subject.

_Example answer: "I learn by doing, not reading. Give me a problem
and let me struggle. I prefer analogies to formal definitions. Push
me hard — I don't learn from easy wins."_

_Example answer: "I like to understand the theory before I try things.
Give me the mental model first, then let me apply it. I prefer a
patient approach — I shut down when I feel overwhelmed."_

### 7. Completed Upstack Courses

**Ask:** "Have you completed any Upstack courses?"

**If first time:** Record "None — this is a new profile."

**If returning:** "Which courses have you completed? What are the
key skills or concepts you're now comfortable with from those
courses?"

**What it drives:** Cumulative calibration. The anatomy grows — each
completed course adds skills, shifts Dreyfus levels, and builds new
mental models. The tutor doesn't re-teach concepts the learner has
already demonstrated understanding of.

This field is also updated by the `complete-assignment` skill as the
learner progresses through courses — it is the living record of growth.

_Example answer: "Completed Learning Go (assignments 1 and 2).
Comfortable with goroutines, channels, interfaces, error handling,
and context. Dreyfus level in Go has moved from Novice to Competent."_

_Example answer: "None — this is a new profile."_

---

## Output Format

The `configure-profile` skill writes `profile/PROFILE.md` with the
following structure:

```markdown
# Upstack — Learner Profile

**Created:** YYYY-MM-DD
**Updated:** YYYY-MM-DD
**Learner:** {Name}

## Background

{1–3 sentences. Domain, role, years of experience, day-to-day work.}

## Skills Inventory

{Bullet list. Group by strength. Use consistent ratings.}

- **Strong:** {skills the learner can use without looking things up}
- **Moderate:** {skills the learner can use with occasional reference}
- **Weak:** {skills the learner has exposure to but cannot use independently}

## Mental Models

{Bullet list. Name each paradigm or habit explicitly.}

- {Paradigm 1} — {one-line description of how it shapes thinking}
- {Paradigm 2} — {one-line description}

## Dreyfus Self-Assessment

{Table format. One row per domain the learner has experience in.}

| Domain | Level | Notes |
|--------|-------|-------|
| {domain} | {Novice/Beginner/Competent/Proficient/Expert} | {brief context} |

## Learning Preferences

{2–3 sentences. Cover: struggle-first vs theory-first, analogies vs
formal definitions, challenge intensity.}

## Completed Courses

{Bullet list per course, or "None" for new profiles.}

- **{Course title}** — completed YYYY-MM-DD. Key skills gained: {list}.
  Dreyfus shift: {from} → {to}.
```

### Recording Guidance

The output must be structured enough that any AI agent can parse it
reliably on first read. Rules for the writing AI:

1. **Use the exact section headings above.** They are the keys the
   reading AI scans for.
2. **Skills Inventory uses Strong/Moderate/Weak groupings.** Not
   prose, not a flat list. The strength rating is what lets the tutor
   decide which analogies are available.
3. **Dreyfus Self-Assessment uses a table.** One row per domain. The
   `Level` column must use one of the five Dreyfus labels exactly
   — the reading AI matches on these.
4. **Completed Courses names the Dreyfus shift.** "Novice → Competent"
   tells the tutor what growth happened. A course title alone doesn't.
5. **Mental Models names paradigms explicitly.** "OOP", "functional",
   "process-oriented", "double-entry" — named labels the tutor can
   watch for as transfer risks.
6. **Preserve the learner's own words where possible.** The profile
   should sound like the learner, not like a form. Structured doesn't
   mean sterile.

---

## How the Tutor Reads the Profile

At the start of every session, the tutor reads `profile/PROFILE.md`
alongside the per-course learner context and the course definition.
Here is what to do with each section:

1. **Background.** Set the broad calibration — what world does this
   learner come from? Adjust tone, vocabulary, and example domains
   accordingly. A capital markets engineer and a management
   accountant need fundamentally different communication.

2. **Skills Inventory.** Scan the **Strong** list for analogical
   bridges. When introducing a new concept, anchor it to a strong
   skill: "This works like X, which you already know." Scan the
   **Weak** list for areas where the learner will need more
   scaffolding.

3. **Mental Models.** These are the transfer risk watchlist. When
   the learner's approach to a problem looks like it's driven by a
   named paradigm that doesn't apply in the current domain, surface
   it: "You're reaching for OOP here — this domain works differently.
   What if there's no class hierarchy?"

4. **Dreyfus Self-Assessment.** Cross-reference with the per-course
   learner context. If the profile says "Expert in C++" and the
   course context says "Beginner in Go", the tutor knows: this
   learner has deep expertise that will both help (strong foundations)
   and hinder (strong transfer habits). Calibrate accordingly.

5. **Learning Preferences.** Respect these throughout the session.
   A struggle-first learner gets the problem before the theory. A
   theory-first learner gets the mental model before the exercise.
   Don't override — these are stable preferences, not per-session
   choices.

6. **Completed Courses.** Don't re-teach concepts from completed
   courses. If the learner completed Learning Go and is now starting
   a new course, they already understand goroutines and channels —
   reference those as known concepts, don't explain them again.

---

## When to Update the Profile

The profile is not a one-time snapshot. It is a living anatomy that
grows as the learner grows.

**Natural update triggers:**

1. **After completing a course.** New skills acquired, Dreyfus levels
   shifted, new mental models added. The `configure-profile` skill
   can be re-run to update the relevant sections.

2. **After a significant career change.** New role, new domain, new
   tools. The professional background and skills inventory may need
   revision.

3. **When starting a course in a new domain.** The learner may
   realise their profile doesn't capture skills or experience
   relevant to the new subject.

The `configure-profile` skill handles both creation (first run) and
update (subsequent runs). On update, it reads the existing profile
and asks what has changed rather than starting from scratch.

---

## Tips for the Tutor During Measurement

1. **Don't rush.** The profile interview is the learner's first
   experience with Upstack's conversational calibration model. Set
   the tone: thoughtful questions, genuine interest in the answers,
   no shortcuts.

2. **Don't accept vague answers.** "I know some Python" is not a
   measurement. Probe: "What have you built with Python? Web apps?
   Data analysis? Scripts?" The specificity of the profile determines
   the quality of calibration across all future courses.

3. **Watch for overstatement and understatement.** Learners tend to
   overstate what they know (social pressure) or understate it
   (impostor syndrome). Use probe questions to triangulate.

4. **The measurement conversation is itself calibration.** How the
   learner answers the questions tells you as much as what they
   answer. Someone who gives precise, domain-specific answers is
   demonstrating competence. Someone who speaks in generalities is
   demonstrating a different level of self-awareness.

5. **Connect to the garment analogy if helpful.** "I'm taking your
   full measurements now — this helps me tailor every future course
   to fit you specifically. The more precise you are, the better the
   fit."

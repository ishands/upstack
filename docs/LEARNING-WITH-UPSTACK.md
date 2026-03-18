# Learning with Upstack

This is the guide to getting the most out of Upstack. It walks you
through the full learning experience — from setting up your profile to
working through assignments to building the journal that becomes your
proof of learning.

If you just want the quick start, see the [README](../README.md).

---

## 1. Understand What the Tutor Does

When you open this repository with an AI tool, `AGENTS.md` configures
the AI as two things:

**A tutor** that guides rather than answers. When you ask "how does
this work?", the tutor's first instinct is to ask you what *you* think
is happening. It provides hints, asks probing questions, and escalates
toward the answer only after you've genuinely attempted the problem.
This is not the AI being unhelpful — it is the AI preserving the
productive struggle that builds real understanding.

**A scribe** that records your learning journey. As you work through
problems, the tutor documents what happened — not just the final
answer, but the mistakes you made, the corrections you applied, and
the moments where something clicked. This record becomes your learning
journal.

The tutor does not:
- Give you the answer before you've tried
- Let incorrect reasoning pass without surfacing it
- Accept "I understand" without asking you to demonstrate it
- Do the work for you (write code, build solutions, complete tasks)

If you catch the tutor doing any of these, call it out. The tutor is
designed to self-correct when you point out a violation. For a deeper
look at how AI agents follow (and drift from) structured contracts,
and what you can do about it, see [AI Limitations](AI-LIMITATIONS.md).

---

## 2. Configure Your Profile

Your learner profile tells the tutor who you are — your professional
background, skills, mental models, and how you learn best. This is not
a form to fill out. The tutor interviews you conversationally and
captures the answers.

**First time:** Use `/configure-profile`. The tutor asks about:
- Your professional background and domain
- Your strongest skills (technical, domain, or otherwise)
- How you naturally think about problems (OOP? process-oriented?
  data-first?)
- Your honest self-assessment of your skill levels
- How you learn best (struggle-first or theory-first? analogies or
  formal definitions?)

**Why this matters:** The profile drives every interaction across every
course. An experienced C++ engineer learning Go gets different
analogies, different challenges, and different calibration than a
management accountant learning data analysis. The more precise your
profile, the better the tutor fits.

**The profile grows.** As you complete courses, your skills expand,
your Dreyfus levels shift upward, and new mental models are added.
The profile is a living document — update it after completing a course
or when your professional context changes.

---

## 3. Pick Your AI Tool

Upstack has two layers, and they have different tool requirements:

**Tutor behaviour** (`AGENTS.md`) — the ambient layer. This is the
Socratic protocol, calibration, anti-patterns, and scribe protocol.
It works with any tool that reads the
[AGENTS.md](https://agents.md/) standard:

- **Claude Code** (recommended) — reads AGENTS.md natively, supports
  agent skills for `/start-course`, `/check-progress`, etc.
- **Cursor** — reads AGENTS.md as project context
- **Codex** — reads AGENTS.md as workspace instructions
- **Gemini** — reads AGENTS.md as project configuration

For plain chat interfaces (ChatGPT, Claude web, etc.): copy the
contents of `AGENTS.md` and paste it as your first message. The tutor
behaviour works the same — you just load it manually instead of
automatically.

**Skills** (`.claude/skills/`) — the discrete action layer. Skills
like `/start-course` and `/configure-profile` follow the
[Agent Skills](https://agentskills.io/) specification. Currently,
only Claude Code discovers and invokes skills natively. With other
tools, try `@`-mentioning the skill file (e.g.
`@.claude/skills/core/start-course/SKILL.md`) — most tools that
support file references will load the skill instructions into context.
If that isn't supported either, you can read the `SKILL.md` and follow
the steps manually — the instructions are written for both AI and
human readability. As more providers adopt the Agent Skills standard,
native support will follow.

Upstack's tutor configuration uses the open
[AGENTS.md](https://agents.md/) standard, and its skills follow the
[Agent Skills](https://agentskills.io/) specification. As AI providers
deepen their support for these standards, the tutor experience improves
automatically.

Most AI tools require a paid subscription for sustained use. Free tiers
may work for short sessions but typically hit usage limits, reduced
context windows, or restricted features during extended learning. A
pro-tier subscription to your chosen tool is recommended.

**What matters is not which tool you use. What matters is that the
tutor configuration is loaded.** Without it, the AI defaults to its
natural behaviour: answering questions directly, optimising for your
immediate comfort, and removing the friction that builds understanding.

---

## Understanding the File Structure

Upstack files fall into two categories:

**Framework-managed** — maintained by Upstack upstream. These files
have a comment marker at the top:

```
<!-- Managed by the Upstack framework. Do not edit manually. -->
```

Some files are entirely framework-managed (`CLAUDE.md`, `AGENTS.md`).
Others have a managed section at the top and a user-owned section
below (`AGENTS-CUSTOM.md`). The managed section ends with:

```
<!-- END managed section -->
```

Everything below that marker is yours. Skills like `start-course`
write to the managed section only — your customisations below the
marker are never touched.

**User-owned** — yours to create and modify freely:

| What | Where |
|------|-------|
| Your profile | `profile/PROFILE.md` |
| Your journals and progress | `progress/<course-slug>/` |
| Your custom courses | `custom/courses/` |
| Your custom skills | `.claude/skills/custom/` |
| Your tutor customisations | `AGENTS-CUSTOM.md` (below the managed section) |

When Upstack updates upstream, framework-managed files update cleanly.
Your files and customisations stay untouched.

---

## 4. Start a Course

Browse the available courses in `core/courses/` (community-curated) or
create your own in `custom/courses/`.

Use `/start-course` to begin. The tutor:
1. Reads the course definition
2. Creates your learning journal from the template
3. Interviews you for your **learner context** — how your background
   (from your profile) applies to *this specific course*
4. Calibrates to your level and summarises what's ahead

If you're resuming a course after a break, just open the repo with
your AI tool. The tutor reads your existing journal and context and
picks up where you left off. No special command needed — continuing is
the default.

---

## 5. Work Through an Assignment

This is where learning happens. Each assignment is a real problem to
solve — not a toy exercise, but something that requires you to build
genuine understanding.

**How a typical session works:**

1. You read the assignment and start working on it
2. When you get stuck, you ask the tutor for help
3. The tutor does *not* give you the answer — it asks you questions,
   offers hints, and guides you toward the solution
4. You struggle. You try things. Some work, some don't.
5. The tutor watches for incorrect reasoning and surfaces it —
   not to embarrass you, but because **mistakes you don't catch become
   misconceptions you carry forward**
6. When you reach a solution, the tutor may ask you to explain *why*
   it works — not just *that* it works

**This is productive struggle.** It feels slower than asking AI for the
answer. It is. That slowness is the learning happening. Neuroscience
research shows that challenging tasks build the physical infrastructure
of understanding in the brain. Effortless acquisition does not.

---

## 6. The Journal

After each session, the tutor updates your learning journal. This is
not a log of what you did. It is a narrative of your productive
struggle.

The journal captures:

- **What you attempted** — the problems you tackled, the approaches
  you tried
- **What went wrong** — mistakes, misconceptions, incorrect
  assumptions. These are preserved, not erased — because erasing
  mistakes erases the learning
- **What clicked** — the moments of insight, the conceptual shifts,
  the "I thought it worked like X, but actually it works like Y"
- **What you'd tell someone else** — your understanding in your own
  words, the teaching artefact that consolidates learning

### The journal is your strength

This is worth understanding deeply.

The journal is not documentation. It is not homework. **It is the
actual learning made visible.**

Writing "I thought interfaces worked like C++ abstract classes, but
in Go they are implicit and consumer-defined — here is the moment
that clicked" is not a record of something that happened earlier. It
is the final step of the learning itself. The act of articulating
your understanding — in your own words, with your own mistakes
preserved — is what consolidates the mental model.

**The journal is your proof of learning.** Not the output you
produced. Not the code you wrote. Not the assignment you completed.
The journal — with its record of struggle, correction, and insight —
is the evidence that genuine understanding was built.

**The journal is your memory.** Six months from now, when you
encounter a similar problem in a different context, the journal is
what you come back to. Not a textbook. Not a tutorial. Your own
record of how you built understanding the first time.

Remember: **it is not about getting the answers. It is about the
struggle. It is about building understanding and recording the
process of productive struggle.** Everyone can get answers. AI gives
them away for free. What AI cannot give you is the understanding
that comes from climbing the learning stack yourself — and the
journal is the record of that climb.

---

## 7. Complete an Assignment

When you've worked through all the topics in an assignment, use
`/complete-assignment`. The tutor does not simply mark it done.
It runs a **reasoning review** — asking you questions that probe
for genuine understanding:

- Can you explain *why* your solution works, not just that it does?
- What would happen if this constraint changed?
- Where does this approach break down?
- What alternatives did you consider, and why did you reject them?

These are not trick questions. They are the same questions a good
senior engineer or mentor would ask. They test for far transfer —
the ability to apply your understanding in contexts you haven't
seen before.

Only when you demonstrate genuine understanding does the tutor mark
the assignment complete in your journal.

---

## 8. Track Your Progress

Use `/check-progress` to see where you stand — completion
percentages, timestamps, and what's ahead.

Your progress lives entirely in your fork:
- `progress/<course>/journal.md` — your learning journal
- `progress/<course>/report-YYYYMMDD.md` — generated progress reports
- `profile/PROFILE.md` — your evolving learner profile

Everything is version-controlled markdown. Push to your GitHub and
your progress travels with you. Pull upstream course updates at any
time — zero merge conflicts, because your progress and the course
content never touch the same files.

---

## 9. For Organisations

If you're using Upstack as part of a team or cohort:

- Progress reports can be generated and sent to L&D coordinators
- Reports include **reasoning review prompts** — questions designed
  for 1-on-1 discussions that probe for understanding, not just
  completion
- Learning paths sequence multiple courses into structured programmes

See the [concept paper](../refs/UPSTACK-CONCEPT-PAPER.md) §4.4 for
the Reasoning Visibility Principle — why "walk me through your
thinking" is the most important question a manager can ask.

---

## Disclaimer

Upstack is an independent open-source project. It is not sponsored by,
affiliated with, or endorsed by any AI company — including Anthropic,
OpenAI, Google, or any other AI provider.

The framework recommends Claude Code for the best experience because
it natively supports `AGENTS.md` and agent skills. But Upstack is
AI-tool-agnostic by design. It works with any tool that reads
`AGENTS.md`, and with any plain chat interface via copy-paste. The
learning principles — productive struggle, Socratic guidance, journal
as proof of learning — are independent of which AI you use.

Choose the tool that works for you. The framework does the rest.

---

*Knowledge is a commodity. Upstack is how you build insight.*

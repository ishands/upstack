# Upstack

[![License: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/content-CC--BY--SA--4.0-lightgrey.svg)](LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

**An open-source framework that configures AI as a genuine tutor — not an answer machine.**

> Knowledge is a commodity. Everyone will give you answers. What they
> cannot give you is insight. Upstack is about how you become insightful.

---

## What Upstack Does

AI has broken the link between producing an output and understanding
how to produce it. You can generate working code, correct answers, and
polished analysis without building the mental model of _why_ it works.
The output is there. The understanding is not.

Upstack redirects AI from oracle to tutor:

- **Guides rather than answers.** The AI asks questions that lead you
  toward the solution. It withholds the full answer until you've
  genuinely attempted the climb.
- **Preserves productive struggle.** The friction of figuring things
  out is the mechanism of learning. Upstack calibrates AI so the right
  friction is preserved — hard enough to build understanding, not so
  hard you're stuck.
- **Records the journey.** Your learning journal captures mistakes,
  corrections, and moments of insight — not just results. The journal
  is your proof of learning.

## Quick Start

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/upstack.git
cd upstack

# 3. Open your AI tool in this directory
#    Claude Code, Cursor, Codex, Gemini — any tool that reads AGENTS.md
#    The tutor configuration loads automatically

# 4. Configure your learner profile (first time only)
#    Use /configure-profile — the tutor interviews you about your
#    background, skills, and learning preferences

# 5. Start a course
#    Use /start-course — the tutor creates your journal and calibrates
#    to your profile

# 6. Learn
#    Work through assignments. The tutor guides, challenges, and
#    records your journey. Your progress lives in your fork.
```

For plain chat interfaces (ChatGPT, Claude web): copy the contents of
`AGENTS.md` and paste it as your first message.

## How It Works

When you open this repository with an AI tool, `AGENTS.md` configures
the AI with two modes:

**Guide** — leads with questions rather than answers. Calibrates to
your skill level using the Dreyfus model. Challenges your assumptions.
Forces you to attempt before it assists, and to explain before it
corrects.

**Scribe** — maintains your learning journal as you work. Documents
mistakes and corrections (not just outcomes), captures moments of
insight, and builds a narrative of your productive struggle.

The tutor reads your **learner profile** (who you are across all
courses) and your **learner context** (how your background applies to
this specific course) to calibrate every explanation, analogy, and
challenge to the right level.

Upstack separates framework-managed files (updated by upstream and
skills) from user-owned files (your profile, progress, customisations).
See [Learning with Upstack](docs/LEARNING-WITH-UPSTACK.md) for the
full guide, including the
[file structure](docs/LEARNING-WITH-UPSTACK.md#understanding-the-file-structure).

## AI Tool Compatibility

Upstack has two layers, each with different tool requirements:

| Layer                             | What it does                                                                           | Works with                                                                                                                                                       |
| --------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tutor behaviour** (`AGENTS.md`) | Ambient configuration — Socratic protocol, calibration, anti-patterns, scribe protocol | Any tool that reads AGENTS.md: Claude Code, OpenAI Codex, Google Jules, Cursor, VS Code + Copilot, Gemini CLI, and others. Plain chat interfaces via copy-paste. |
| **Skills** (`.claude/skills/`)    | Discrete actions — `/start-course`, `/configure-profile`, `/check-progress`, etc.      | Claude Code natively. Other tools: `@`-mention the skill's `SKILL.md`, or follow the steps manually.                                                             |

Upstack is built and tested with **Claude Code**. The tutor behaviour
layer works well across any AGENTS.md-compatible tool. Skill support
depends on each tool's implementation of the
[Agent Skills](https://agentskills.io/) specification — as providers
adopt the standard, skills will work natively in more tools.

Community contributions for other providers are welcome.

## AI Limitations

AI agents follow structured contracts like `AGENTS.md` well — but not
perfectly. Over long sessions, the tutor may drift: answering directly
instead of questioning, skipping journal entries, or shortcutting
multi-step procedures. This is a known characteristic of current AI
models, not a bug in any specific tool.

You are the quality control. When you notice drift, call it out — the
tutor is designed to self-correct. Restarting sessions resets
compliance to its strongest point. See
[AI Tutor Limitations](docs/AI-LIMITATIONS.md) for drift symptoms, causes,
and practical tips.

---

## Independence & Costs

Upstack is an independent open-source project. It is not sponsored by,
affiliated with, or endorsed by any AI company.

The framework builds on two open standards:

- [**AGENTS.md**](https://agents.md/) — the open standard for
  configuring ambient AI agent behaviour in a repository. Stewarded by the
  Agentic AI Foundation under the Linux Foundation. Supported by
  Claude Code, OpenAI Codex, Google Jules, Cursor, VS Code, GitHub
  Copilot, and others.
- [**Agent Skills**](https://agentskills.io/) — the open specification
  for discoverable, portable AI skill definitions. Skills are
  structured actions that any compliant AI tool can find and invoke.

Because Upstack builds on open standards rather than proprietary APIs,
the tutor experience improves as AI providers deepen their support for
these specifications — without any changes to Upstack itself.

**Upstack is free. The AI tools it runs on are not.** Most AI coding
tools require a paid subscription for the sustained, context-heavy
sessions that real learning demands. Free tiers typically have usage
limits, reduced context windows, or restricted features that will
interrupt the learning flow. Budget for a pro-tier subscription to
whichever AI tool you choose.

## Courses

| Course                                                                  | Domain      | Target Audience                                                                   |
| ----------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| [Go Lang for Developers](core/courses/go-lang-for-developers/COURSE.md) | Programming | Developer with experience in at least one general-purpose language — Novice in Go |
| [Java Web Programming](core/courses/java-web-programming/COURSE.md) | Programming | Experienced developer (C++, C#, Python) — new to Java and web development |

More courses are planned (git, OOP, data structures & algorithms).
You can also [create your own](CONTRIBUTING.md#contributing-a-course)
in any domain using the `create-course` skill.

## For Organisations

Upstack supports structured learning paths for teams and cohorts.

Progress reports with reasoning review prompts help managers probe for
genuine understanding — not just completion. See the
[concept paper](docs/UPSTACK-CONCEPT-PAPER.md) for the full
theoretical foundation.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute courses,
framework improvements, and cross-provider support.

## License

Dual licensed:

- [MIT](LICENSE) for code (`scripts/`, `*.js`)
- [CC-BY-SA 4.0](LICENSE) for content (courses, skills, documentation, everything else).

See [LICENSE](LICENSE) for full terms.

## Links

- [Quick Reference](refs/assets/upstack-quick-reference-v1.jpg) — one-page cheat sheet
- [Learning with Upstack](docs/LEARNING-WITH-UPSTACK.md) — the full
  guide to learning effectively with the framework
- [Concept Paper](docs/UPSTACK-CONCEPT-PAPER.md) — the theoretical
  foundation (learning stack, productive struggle, Dreyfus model)
- [Technical Specification](docs/UPSTACK-TECH-SPEC.md) — architecture,
  schemas, and skill definitions

---

_Knowledge is a commodity. Upstack is how you build insight._

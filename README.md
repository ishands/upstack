# Upstack

**An open-source framework that configures AI as a genuine tutor — not an answer machine.**

> Knowledge is a commodity. Everyone will give you answers. What they
> cannot give you is insight. Upstack is about how you become insightful.

---

## What Upstack Does

AI has broken the link between producing an output and understanding
how to produce it. You can generate working code, correct answers, and
polished analysis without building the mental model of *why* it works.
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

See [Learning with Upstack](docs/LEARNING-WITH-UPSTACK.md) for the
full guide.

## AI Limitations

AI agents follow structured contracts like `AGENTS.md` well — but not
perfectly. Over long sessions, the tutor may drift: answering directly
instead of questioning, skipping journal entries, or shortcutting
multi-step procedures. This is a known characteristic of current AI
models, not a bug in any specific tool.

You are the quality control. When you notice drift, call it out — the
tutor is designed to self-correct. Restarting sessions resets
compliance to its strongest point. See
[AI Limitations](docs/AI-LIMITATIONS.md) for drift symptoms, causes,
and practical tips.

## For Organisations

Upstack supports structured learning paths for teams and cohorts.
Progress reports with reasoning review prompts help managers probe for
genuine understanding — not just completion. See the
[concept paper](refs/UPSTACK-CONCEPT-PAPER.md) for the full
theoretical foundation.

## Disclaimer

Upstack is an independent open-source project. It is not sponsored by,
affiliated with, or endorsed by any AI company. The framework is
AI-tool-agnostic by design — it works with any tool that supports the
AGENTS.md standard, and with plain chat interfaces via copy-paste.

## Links

- [Learning with Upstack](docs/LEARNING-WITH-UPSTACK.md) — the full
  guide to learning effectively with the framework
- [Concept Paper](refs/UPSTACK-CONCEPT-PAPER.md) — the theoretical
  foundation (learning stack, productive struggle, Dreyfus model)
- [Technical Specification](docs/UPSTACK-TECH-SPEC.md) — architecture,
  schemas, and skill definitions

---

*Knowledge is a commodity. Upstack is how you build insight.*

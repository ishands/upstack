# Contributing to Upstack

Upstack is an open-source learning framework. Contributions are
welcome — whether that's a new course, a fix to an existing one, a
framework improvement, or better support for an AI tool you use.

**Contents:**
- [Fork-and-Own Model](#fork-and-own-model)
- [Contributing a Course](#contributing-a-course)
- [Contributing a Framework Improvement](#contributing-a-framework-improvement)
- [Cross-Provider Contributions](#cross-provider-contributions)
- [Conventions](#conventions)
- [What Lives Where](#what-lives-where)
- [Code of Conduct](#code-of-conduct)

---

## Fork-and-Own Model

Upstack is designed to be forked. Your fork is your learning
environment — your profile, progress, journals, and custom courses
live there. You never need to contribute back to use Upstack fully.

If you do want to contribute, the process depends on what you're
contributing.

---

## Contributing a Course

Courses are the most natural contribution. If you've built a course
that others could learn from, consider submitting it to
`core/courses/`.

**Process:**

1. Use the `create-course` skill (or follow its `SKILL.md` manually)
   to scaffold your course in `custom/courses/`
2. Build and test the course — work through at least the first
   assignment yourself to verify the tutor experience
3. Ensure domain-neutral language in structural elements (assignment
   titles, milestone labels, topic checklists, learning objectives) —
   domain-specific terminology belongs in the course content, not
   the structural elements. For example, use "produce" instead of
   "build/code", "deliverable" instead of "codebase", "approach"
   instead of "idiom/pattern"
4. Open a PR to `develop` with your course in `core/courses/<slug>/`
5. Include in the PR description: target audience, prerequisites,
   what makes this course a good fit for the Upstack framework

**Quality bar:**

- Course must follow the `COURSE.md` schema (see
  `.agents/skills/core/create-course/references/COURSE-SCHEMA.md`)
- Assignments should be real problems, not toy exercises
- Learning objectives and topic checklists for each assignment
- Clear learner context: who is this for and what prior knowledge
  is assumed

---

## Contributing a Framework Improvement

Framework changes (tutor contract, principles, skills, AGENTS.md,
scripts) have a higher bar because they affect every learner's
experience.

**Process:**

1. Open an issue first — describe what you want to change and why
2. Wait for discussion before building — framework changes need
   alignment on direction
3. Keep changes focused — one concern per PR
4. Update the tech spec if your change affects architecture
5. Open a PR to `develop`

**Examples of framework contributions:**

- Bug fixes in progress scripts
- Improvements to skill instructions
- New skills that extend the learning flow
- Fixes to tutor contract gaps or anti-pattern coverage

---

## Cross-Provider Contributions

Upstack is built on the [AGENTS.md](https://agents.md/) and
[Agent Skills](https://agentskills.io/) open standards. It is built
and tested with Claude Code, but the framework is designed to work
across AI tools.

Contributions that improve the experience on other tools are
especially welcome:

- Testing and documenting how Upstack works with your tool
- Adapters or configuration for tools that don't yet read AGENTS.md
  natively
- Skill invocation guides for tools without Agent Skills support

---

## Conventions

**Branches:** Create feature branches from `develop`. Name them
`feature/<description>`.

**Commits:** Format: `feat|fix|meta (<scope>): <description>`.
Include `Co-Authored-With: <name>` if AI-assisted.

**PRs:** Target `develop`, not `main`. Keep the description concise
— what changed, why, and how to test it.

---

## What Lives Where

| Directory | Owned by | Contributions welcome? |
|-----------|----------|----------------------|
| `core/courses/` | Upstream | Yes — via PR |
| `core/meta/` | Upstream | Yes — via issue + PR |
| `custom/` | You (your fork) | No — this is yours |
| `profile/`, `progress/` | You (your fork) | No — this is yours |
| `.agents/skills/core/` | Upstream | Yes — via issue + PR |
| `.agents/skills/custom/` | You (your fork) | No — this is yours |
| `scripts/` | Upstream | Yes — via PR |

---

## Code of Conduct

This project follows the
[Contributor Covenant v2.1](CODE_OF_CONDUCT.md). Be respectful,
constructive, and welcoming.

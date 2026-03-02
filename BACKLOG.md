# Upstack — Product Backlog

**Last updated:** 2026-03-01
**Status key:** `[ ]` todo · `[~]` in progress · `[x]` done · `[-]` descoped

---

## MVP Goal

Two real users can learn with Upstack:

1. **Individual learner** — starts the curated Learning Go course, works through assignments with the AI tutor, tracks progress
2. **Self-directed engineer** — configures their profile, creates their own course (Java Spring Boot), learns with the AI tutor

---

## M1: Framework Core

The skeleton that everything else depends on.

- [x] Repo structure — create `core/`, `custom/`, `profile/`, `progress/`, `docs/`, `site/`, `refs/` directories
- [x] `core/meta/PRINCIPLES.md` — learning theory foundation (Socratic method, productive struggle, Dreyfus calibration)
- [x] `core/meta/TUTOR-CONTRACT.md` — base tutor behaviour definition (referenced by AGENTS.md)
- [x] `core/meta/ANTI-PATTERNS.md` — what Upstack is not (answer machines, code generators, shortcut enablers)
- [x] `core/meta/JOURNAL-TEMPLATE.md` — journal scaffold for new courses
- [x] `core/meta/LEARNER-CONTEXT.md` — template for learner profile within a course
- [ ] `AGENTS.md` — root-level tutor configuration (ambient behaviour layer)
- [ ] `profile/` structure — learner identity, background, preferences (design TBD during `configure-profile` skill)
- [ ] `progress/` structure — one subdirectory per active course with journal + reports
- [ ] `package.json` — root manifest with npm run scripts

---

## M2: First Skills

The operational backbone. Build in dependency order.

- [ ] Skill directory structure — at `.claude/skills/`, one subdirectory per skill, SKILL.md + optional scripts, references, assets, etc.
- [ ] `configure-profile` — create/update learner profile (background, experience level, learning preferences). First skill because tutor calibration depends on it.
- [ ] `create-course` — scaffold a new course from COURSE.md schema into `custom/courses/`. Needed for the Java engineer.
- [ ] `start-course` — initialise journal from template, load course context, calibrate to learner profile. Core learning flow.
- [ ] `complete-assignment` — reasoning review gate, verify understanding, mark complete, commit. Core learning flow.
- [ ] `check-progress` — display current completion state. Includes `collect-progress.js` script.

---

## M3: Learning Go Course

Repackage the existing learning-go project as the first curated Upstack course.

- [ ] `core/courses/learning-go/COURSE.md` — full course definition with YAML frontmatter, two assignments (hostmanager, feedcatcher), reasoning review prompts, learner context section
- [ ] Assignment 1: HostManager — reference material, learning objectives, topic checklist
- [ ] Assignment 2: FeedCatcher — reference material, learning objectives, topic checklist
- [ ] Verify end-to-end: configure profile → start course → work through assignment 1 → complete assignment → check progress

---

## M4: Progress Reporting

Needed for org-ready use cases and the self-directed engineer to track his own learning.

- [ ] `generate-report` skill — generate + commit a timestamped progress report. Includes `generate-report.js` script.
- [ ] `send-report` skill — email report to coordinator(s). Includes `send-report.js` script.
- [ ] Shared `scripts/utils/` — parse-journal.js, parse-course.js, git-utils.js (extracted during M2 skill builds)

---

## M5: Learning Paths

The sequenced course bundle concept. Enables the engineering bootcamp and similar curated paths.

- [ ] `LEARNING-PATH.md` schema — YAML frontmatter (title, slug, courses with order/unlock dependencies, milestones) + markdown body
- [ ] `core/learning-paths/` directory structure
- [ ] `engineering-bootcamp/LEARNING-PATH.md` — fresh grad learning path (Learning Go + future courses: basic OOP, git basics, data structures)
- [ ] `start-learning-path` skill — initialise journals for all courses in sequence, show roadmap (defer if `start-course` per course is sufficient for now)

---

## M6: Static Site

Course discovery and progress visualisation for users who prefer a browser over the terminal.

- [ ] Site framework choice (static site generator TBD)
- [ ] Course catalogue page — list all courses from `core/courses/` and `custom/courses/`
- [ ] Course detail page — show structure, progress, reasoning review prompts
- [ ] Learning path view — show sequenced courses with progress
- [ ] `scripts/generate-catalogue.js` — build catalogue data for the site

---

## Deferred / Future

- [ ] `TUTOR-CONTRACT-ORG.md` — organisational variant with reporting cadence and coordinator config
- [ ] `ORG-PROFILE.md` — organisation L&D configuration template
- [ ] Bootcamp-101 course content (basic OOP, git basics, data structures) — content authoring, not framework
- [ ] Tool-specific skill discovery symlinks (`.claude/skills/` etc.) — document when providers converge
- [ ] CI validation for SKILL.md frontmatter
- [ ] Course contribution workflow (CONTRIBUTING.md, PR templates)

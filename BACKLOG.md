# Upstack — Product Backlog

**Last updated:** 2026-03-15
**Status key:** `[ ]` todo · `[~]` in progress · `[x]` done · `[-]` descoped

---

## MVP Goal

Two real users can learn with Upstack:

1. **Individual learner** — starts a curated course (Go Lang for Developers, Git-101, OOP-101, or DS&A-101), works through assignments with the AI tutor, tracks progress
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
- [x] `AGENTS.md` — root-level tutor configuration (ambient behaviour layer)
- [x] `profile/` structure — learner identity, background, preferences (`core/meta/PROFILE-TEMPLATE.md` + `profile/PROFILE.md` output)
- [x] `progress/` structure — one subdirectory per active course with journal + reports
- [x] `package.json` — root manifest (scripts added as M2/M3 items are built)

---

## M2: First Skills

The operational backbone. Build in dependency order.

- [x] `README.md` — quick start manifesto (what Upstack is, how to get started, disclaimer)
- [x] `docs/LEARNING-WITH-UPSTACK.md` — the full guide: tutor/scribe design, configure profile, pick your IDE, start a course, work through assignments, journal as proof of learning
- [x] Skill directory structure — at `.claude/skills/`, one subdirectory per skill, SKILL.md + optional scripts, references, assets, etc.
- [x] `configure-profile` — create/update learner profile (background, experience level, learning preferences). First skill because tutor calibration depends on it.
- [x] Move skill templates from `core/meta/` into owning skills' `references/` directories — `PROFILE-TEMPLATE.md` → `configure-profile/references/`, `JOURNAL-TEMPLATE.md` + `LEARNER-CONTEXT.md` → `start-course/references/`. Aligns with agentskills.io spec; `core/meta/` retains only ambient-layer docs (PRINCIPLES, TUTOR-CONTRACT, ANTI-PATTERNS). Update all references in tech spec, AGENTS.md, skills, and docs.
- [x] `create-course` — scaffold a new course from COURSE.md schema. Supports both curated (`core/courses/`) and personal (`custom/courses/`) courses in any domain.
- [x] `start-course` — initialise journal from template, load course context, calibrate to learner profile. Core learning flow.
- [x] `docs/AI-LIMITATIONS.md` — honest guide to AI agent compliance patterns, drift symptoms, and what learners can do to keep the tutor on track. User-facing, not referenced by AGENTS.md or skills.
- [x] `complete-assignment` — reasoning review gate, verify understanding, mark complete, commit. Core learning flow.
- [x] `check-progress` — display current completion state. Includes `collect-progress.js` script.

---

## M3: Go Lang for Developers Course

The fully-worked showcase course. Repackage the existing `learning-go` project as the first curated Upstack course (`go-lang-for-developers`) with broadened learner context and a sample progress block for AI scribe calibration.

- [x] `core/courses/go-lang-for-developers/COURSE.md` — full course definition with YAML frontmatter, two assignments (HostManager, FeedCatcher), reasoning review prompts. Learner context: developer with experience in at least one general-purpose language (Java, C#, Python, C++) — Novice in Go, Competent+ in general programming. Broaden from the original C++/Python-specific framing. Source: `learning-go/` repo (tutor protocols, journey docs, assignment code). Once re-packaged, the course should stand independent inside Upstack without any reference to the `learning-go/` repo. Assignments are separate self-contained projects (each with own `cmd/` and `internal/`, own `go.mod`) — not a shared `cmd/` multi-binary layout. This pattern generalises to other language courses.
- [ ] Assignment 1: HostManager — reference material, learning objectives, topic checklist. Source: `learning-go/meta/ASSIGNMENT1-JOURNEY.md` + code.
- [ ] Assignment 2: FeedCatcher — reference material, learning objectives, topic checklist. Source: `learning-go/meta/ASSIGNMENT2-JOURNEY.md` + code.
- [ ] Sample progress block — curate `learning-go/meta/ASSIGNMENT2-JOURNEY.md` into `core/courses/go-lang-for-developers/references/SAMPLE-PROGRESS.md`. Concrete calibration example for the AI scribe: milestone structure, error→fix→concept rhythm, "Got It Right" pattern, summary tables. Lightly edited for broadened learner context. Raw chats stay private in `upstack-the-making/`. The sample should not carry any personal details of the learner from the `learning-go/` repo — content should be generalized and abstracted.
- [ ] Verify end-to-end: configure profile → start course → work through assignment 1 → complete assignment → check progress

---

## M4: Starter Courses

`COURSE.md` definitions only — no reference material or sample progress. Proves the framework generalises beyond Go and gives M6's engineering bootcamp real courses to bundle. AI tutor draws on its own knowledge for these fundamentals.

- [ ] `core/courses/git-101/COURSE.md` — version control fundamentals. Assignments TBD during build (likely: repo basics, branching & merging, collaboration workflows). Target: Novice in git, any background.
- [ ] `core/courses/oop-101/COURSE.md` — core OOP concepts (encapsulation, inheritance, polymorphism, composition). Language-agnostic framing with examples in Java/Python. Target: Novice in OOP, has basic programming.
- [ ] `core/courses/dsa-101/COURSE.md` — fundamental data structures (arrays, linked lists, stacks, queues, trees, hash maps) and algorithms (sorting, searching, recursion, basic complexity analysis). Target: Novice in DS&A, has basic programming.

---

## M5: Progress Reporting

Needed for org-ready use cases and the self-directed engineer to track learning.

- [ ] `generate-report` skill — generate + commit a timestamped progress report. Includes `generate-report.js` script.
- [ ] `send-report` skill — email report to coordinator(s). Includes `send-report.js` script.
- [ ] Shared `scripts/utils/` — parse-journal.js, parse-course.js, git-utils.js (extracted during M2 skill builds)

---

## M6: Learning Paths

The sequenced course bundle concept. Enables the engineering bootcamp and similar curated paths.

- [ ] `LEARNING-PATH.md` schema — YAML frontmatter (title, slug, courses with order/unlock dependencies, milestones) + markdown body
- [ ] `core/learning-paths/` directory structure
- [ ] `engineering-bootcamp/LEARNING-PATH.md` — fresh grad learning path bundling Go Lang for Developers (M3), git-101, oop-101, dsa-101 (M4), with sequencing and prerequisites
- [ ] `start-learning-path` skill — initialise journals for all courses in sequence, show roadmap (defer if `start-course` per course is sufficient)

---

## M7: Static Site

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
- [ ] Tool-specific skill discovery symlinks (`.claude/skills/` etc.) — document when providers converge
- [ ] CI validation for SKILL.md frontmatter
- [ ] Course contribution workflow (CONTRIBUTING.md, PR templates)

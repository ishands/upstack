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

- [x] `core/courses/go-lang-for-developers/COURSE.md` — full course definition with YAML frontmatter, two assignments (HostManager, FeedCatcher), suggested milestones, design questions, paradigm shift flags, reasoning review prompts, and Market Data Gateway capstone. Includes learning objectives and topic checklists for both assignments. Learner context: developer with experience in at least one general-purpose language (Java, C#, Python, C++) — Novice in Go, Competent+ in general programming. Source: `learning-go/` repo. Course stands independent inside Upstack. Also updated `create-course` skill and COURSE-SCHEMA.md with lessons learned (milestones, design questions, paradigm shifts, scope notes, simplified directory structure).
- [x] Sample progress block — curate `learning-go/meta/ASSIGNMENT2-JOURNEY.md` into `core/courses/go-lang-for-developers/references/SAMPLE-PROGRESS.md`. Concrete calibration example for the AI scribe: milestone structure, error→fix→concept rhythm, "Got It Right" pattern, summary tables. Lightly edited for broadened learner context. Raw chats stay private in `upstack-the-making/`. The sample should not carry any personal details of the learner from the `learning-go/` repo — content should be generalized and abstracted.
- [x] Domain-neutrality pass on framework artefacts. The go-lang course build introduced programming-flavored language into two framework-level files. Fix `COURSE-SCHEMA.md` and `create-course/SKILL.md`: "build" → "produce/create", "code" → "work", "architectural" → "structural/design", "idiom" → "approach". Add non-CS examples alongside CS ones (accounting, Excel, project management) per AGENTS.md architecture decision. Also reframe "Learner code lives in the learner's own separate project" to be domain-neutral — not all courses produce code.
- [x] Add domain scaffolding to `TUTOR-CONTRACT.md` §4.3 or §2.3 — the tutor should proactively help with domain knowledge that isn't the learning objective (e.g., API docs in a Go course, tax form structure in an accounting course) so struggle stays focused on the course subject. Also add a one-liner to `AGENTS.md` "When to answer directly" block.
- [ ] Add scribe calibration reference to `TUTOR-CONTRACT.md` §6 (Scribe Protocol) — the scribe should check if the course has a `references/SAMPLE-PROGRESS.md` and use it to calibrate detail level, structure, and tone before writing the first journal entry. Currently §6.4 says "read before writing" for style continuity but doesn't mention the sample progress concept.
- [ ] Verify end-to-end: smoke test the skill chain with `go-lang-for-developers`. Run `parse-course.js` against the new COURSE.md (highest risk — schema changed with `**Topics:**` label, milestones, design questions). Then: configure-profile → start-course → check-progress. Full assignment completion is out of scope — that's using the product, not verifying it.

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

# Changelog

All notable changes to Upstack are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/).

---

## [0.3.0] — 2026-04-29

The largest release since open-sourcing. Skills move to the cross-provider
`.agents/skills/` location, seven engineering fundamentals courses land,
and the first curated learning path ships.

### Added

- **Engineering Bootcamp learning path** —
  `core/learning-paths/engineering-bootcamp/LEARNING-PATH.md`. Sequences
  the seven fundamentals courses around one capstone project the
  learner picks at enrolment. Three project options: Personal Library
  Catalogue, Recipe Manager, Job Application Tracker. Each course
  contributes an integration task that adds another component to the
  project; the capstone assembles the components into a working CLI
  application. Targets fresh-graduate or early-career software engineers.
- **`start-learning-path` skill** —
  `.agents/skills/core/start-learning-path/`. Path-agnostic enrolment:
  discovers available paths, presents project options in plain
  language, records the choice in
  `progress/<path-slug>/learner-context.md`, initialises
  `integration-journal.md`, updates `## Active Learning Path` in
  `AGENTS-CUSTOM.md`, and displays the full course roadmap.
  Distinguishes enrolment (path level, one-time) from starting a
  course (delegates to `start-course`).
- **`LEARNING-PATH.md` schema** — documented in
  `.agents/skills/core/start-learning-path/references/LEARNING-PATH-SCHEMA.md`
  and `docs/UPSTACK-TECH-SPEC.md` §9. YAML frontmatter (courses
  sequence, project options, capstone) plus markdown body
  (Learning Path Narrative, Project Options, Integration Tasks,
  Capstone, For L&D Coordinators).
- **Path-level progress files** —
  `progress/<path-slug>/learner-context.md` (project choice, current
  position, integration-task checklist) and `integration-journal.md`
  (concise record of integration-task outputs, one entry per course).
  Sit alongside course directories in `progress/`.
- **Seven engineering fundamentals courses** —
  `core/courses/git-fundamentals/`, `markdown-fundamentals/`,
  `oop-fundamentals/`, `dsa-fundamentals/`,
  `code-quality-fundamentals/`, `testing-fundamentals/`,
  `agile-fundamentals/`. Each is self-contained with a standalone
  example for solo learners and a learning-path note for path
  learners. No reference material — the AI tutor draws on its own
  knowledge for these fundamentals.
- **`.claude/commands/` slash-command stubs** — one per skill. Each
  stub redirects Claude Code to the canonical `.agents/skills/`
  location, restoring `/configure-profile`, `/start-course`,
  `/start-learning-path`, `/create-course`, `/complete-assignment`,
  and `/check-progress` slash invocation that broke when skills
  moved.
- **Git pre-req check** in the new-learner orientation
  (`AGENTS.md` Step 1, Case 1) — surfaces git as a framework-wide
  dependency before the profile interview rather than after.
- **Learner pushback handling** —
  new `core/meta/TUTOR-CONTRACT.md` §4.4. Distinguishes legitimate
  frustration (blocked on reference knowledge → give the pattern) from
  premature frustration (hasn't attempted → hold Socratic). Pushback
  is never authorisation to provide the composed answer.

### Changed

- **Skills migrated** from `.claude/skills/core/<name>/` →
  `.agents/skills/core/<name>/`. Aligns with the `agentskills.io`
  cross-provider standard. All AGENTS.md references, skill
  cross-references, docs, scripts, and CONTRIBUTING.md updated. Claude
  Code retains slash invocation via the new `.claude/commands/`
  stubs.
- **`configure-profile` interview** — added a CV / professional bio
  fast path. The AI parses what it can from a pasted bio across all
  seven profile fields, presents a conversational draft for
  confirmation, and asks only for what's missing. PDF upload and
  LinkedIn scraping were considered and dropped (cross-provider
  reliability).
- **Skill-level framing in `configure-profile`** — five Dreyfus levels
  presented as a numbered 1–5 scale with plain anchor phrases. The
  framework name no longer appears in learner-facing language.
  "Most people land in the middle" framing added to normalise the
  self-assessment.
- **No-technical-language rule** added to `configure-profile`
  Interview Guidelines — never surface filenames, framework terms, or
  git commands in learner-facing language. File writes and commits
  handled silently.
- **Session Start in `AGENTS.md`** — replaced the single Calibration
  block with an explicit decision tree: Step 1 profile check (with
  warm orientation and git pre-req for new learners), Step 2 active
  learning path / active course check, Step 3 calibration. Closes
  several first-run gaps surfaced in beta testing.
- **"The Work Doer" anti-pattern sharpened** in
  `core/meta/ANTI-PATTERNS.md`. Added "The distinction" section
  separating reference knowledge (always permitted) from composing
  the learner's work (never permitted, even with vocabulary just
  provided). Added the **skeleton rule** — give the pattern, never
  the solution — to TUTOR-CONTRACT.md §2.3.
- **README** — Courses table expanded to all nine curated courses;
  added Learning Paths catalogue section; trimmed "For
  Organisations" to reflect what actually ships.
- **`docs/LEARNING-WITH-UPSTACK.md`** — replaced the "planned
  features" §9 with a proper §9 (Learning Paths) covering enrolment,
  project threading, integration journal, and the engineering-bootcamp
  link. Renumbered "For Organisations" to §10.
- **`docs/UPSTACK-TECH-SPEC.md`** — added §9 Learning Path Model.
  Repository-architecture tree (§2) rebuilt for v0.3.0 reality:
  `.agents/skills/`, `.claude/commands/`, all nine courses,
  `core/learning-paths/`, path-slug variant under `progress/`.
  Status line updated.
- **Milestones renumbered to semver** — pre-public milestones (M1–M4)
  retroactively mapped to v0.1.0 / v0.2.0; this and future releases use
  semver throughout BACKLOG.md and CHANGELOG.md.

### Fixed

- **`/configure-profile`, `/start-course`, etc. broken under Claude
  Code** — slash invocation only discovers skills at
  `.claude/commands/<name>.md`. The earlier `.claude/skills/core/<name>/`
  nesting bypassed that path. Resolved by the migration to
  `.agents/skills/` plus thin `.claude/commands/` stubs.
- **`start-learning-path` token bloat from deriving course titles** —
  the skill previously read every course's `COURSE.md` (seven files
  for the engineering bootcamp) just to extract the human-readable
  course title for orientation tables. Surfaced by a cross-model trial
  (Antigravity / Gemini 3.1 Pro). Resolved at the schema level by
  adding `courses[].title` as a required field on `LEARNING-PATH.md`.
  The skill now reads the title verbatim — zero `COURSE.md` reads at
  enrolment, no fragile slug-titlecasing heuristics (which mangled
  acronyms like "OOP" → "Oop").
- **Stale references** surfaced by the v0.3.0 final review:
  - AGENTS.md skills table marked `generate-report` and `send-report`
    as if implemented; both are planned. Marked _(planned)_.
  - `.claude/commands/generate-report.md` and `send-report.md` told
    the AI to load skill files that do not exist. Replaced with
    explicit "not yet implemented" instruction so the slash command
    degrades gracefully.
  - `progress/README.md` referenced `generate-report` as the active
    producer of `report-YYYYMMDD.md`. Marked planned.

### Known limitations

- **Progress reports not yet implemented.** `/generate-report` and
  `/send-report` remain on the roadmap; the journal is the source of
  truth in the meantime and is already a credible understanding
  artefact for L&D 1-on-1s.
- **Other AI tools' learning-path support depends on skill
  invocation.** `start-learning-path` works natively in Claude Code via
  `.claude/commands/start-learning-path.md`. Other tools require
  `@`-mentioning the skill file or following the steps manually until
  they adopt the Agent Skills specification.

---

## [0.2.0] — 2026-03-28

### Added

- **Java Web Programming course** — `core/courses/java-web-programming/COURSE.md`. Four modules (Java foundations, Spring Boot, JPA persistence, production concerns), four assignments, multi-tenant booking system capstone. Targets experienced developers from C++, C#, or Python — new to Java web development. Includes paradigm shift annotations bridging from multiple source languages.
- **Quick reference cheat sheet** — one-page visual summary of the Upstack workflow, key commands, tutor behaviour, and file ownership (`refs/assets/upstack-quick-reference-v1.jpg`).

### Changed

- **Concept paper moved** — `refs/UPSTACK-CONCEPT-PAPER.md` → `docs/UPSTACK-CONCEPT-PAPER.md`. Learner-facing content belongs in `docs/`.
- **Learning guide** — marked unbuilt features (learning paths, progress reports) to set accurate expectations.
- **README** — added Java Web Programming to courses table, added quick reference link.

---

## [0.1.0] — 2026-03-18

First public release.

### Added

- **Framework core** — tutor contract, eight learning principles, seven named anti-patterns, self-correction protocol
- **Two-mode AI configuration** — Guide (Socratic questioning, hint escalation) and Scribe (journey documentation, error cataloguing)
- **Dreyfus-based calibration** — novices get rules, experts get nuance. Two-layer model: learner profile (global) + learner context (per-course)
- **Five skills** — `configure-profile`, `create-course`, `start-course`, `complete-assignment`, `check-progress`
- **Go Lang for Developers** — fully-worked course with two assignments (HostManager, FeedCatcher), suggested milestones, design questions, paradigm shift flags, sample progress block, and Market Data Gateway capstone
- **Progress tracking** — journal-based completion state with git timestamps, `collect-progress.js` script
- **Open standards** — built on [AGENTS.md](https://agents.md/) and [Agent Skills](https://agentskills.io/). Works with Claude Code, Cursor, Codex, Gemini, and any AGENTS.md-compatible tool. Plain chat interfaces via copy-paste.
- **Fork-and-own model** — learner progress, custom courses, and tutor customisations live in the fork. Zero merge conflicts on upstream pulls.
- **Dual license** — MIT for code, CC-BY-SA 4.0 for content
- **Community infrastructure** — CONTRIBUTING.md, CODE_OF_CONDUCT.md, issue templates, PR template
- **Learner guide** — `docs/LEARNING-WITH-UPSTACK.md` covering the full learning experience
- **AI limitations guide** — `docs/AI-LIMITATIONS.md` with honest coverage of drift symptoms and mitigation

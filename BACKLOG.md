# Upstack — Product Backlog

**Last updated:** 2026-04-29
**Status key:** `[ ]` todo · `[~]` in progress · `[x]` done · `[-]` descoped

---

## MVP Goal

Three users can learn with Upstack:

1. **Individual learner** — starts a curated course (Go Lang for Developers, or any of the seven engineering fundamentals courses), works through assignments with the AI tutor, tracks progress
2. **Self-directed engineer** — configures their profile, creates their own course (Java Spring Boot), learns with the AI tutor
3. **Bootcamp participant** — enrols in the engineering bootcamp learning path, picks a capstone project (Personal Library Catalogue, Recipe Manager, or Job Application Tracker), works through seven fundamentals courses with integration tasks that accumulate into a working application

---

## v0.1.0

Tagged on `main`. Open-sourced.

### Framework Core

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
- [x] `package.json` — root manifest (scripts added as later items are built)

### First Skills

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

### Go Lang for Developers Course

The fully-worked showcase course. Repackage the existing `learning-go` project as the first curated Upstack course.

- [x] `core/courses/go-lang-for-developers/COURSE.md` — full course definition with YAML frontmatter, two assignments (HostManager, FeedCatcher), suggested milestones, design questions, paradigm shift flags, reasoning review prompts, and Market Data Gateway capstone. Includes learning objectives and topic checklists for both assignments. Learner context: developer with experience in at least one general-purpose language (Java, C#, Python, C++) — Novice in Go, Competent+ in general programming. Source: `learning-go/` repo. Course stands independent inside Upstack. Also updated `create-course` skill and COURSE-SCHEMA.md with lessons learned (milestones, design questions, paradigm shifts, scope notes, simplified directory structure).
- [x] Sample progress block — curate a worked example into `core/courses/go-lang-for-developers/references/SAMPLE-PROGRESS.md`. Concrete calibration example for the AI scribe: milestone structure, error→fix→concept rhythm, "Got It Right" pattern, summary tables. Lightly edited for broadened learner context. The sample should not carry any personal details of the learner — content should be generalized and abstracted.
- [x] Domain-neutrality pass on framework artefacts. The go-lang course build introduced programming-flavored language into two framework-level files. Fix `COURSE-SCHEMA.md` and `create-course/SKILL.md`: "build" → "produce/create", "code" → "work", "architectural" → "structural/design", "idiom" → "approach". Add non-CS examples alongside CS ones (accounting, Excel, project management) per AGENTS.md architecture decision. Also reframe "Learner code lives in the learner's own separate project" to be domain-neutral — not all courses produce code.
- [x] Add domain scaffolding to `TUTOR-CONTRACT.md` §4.3 or §2.3 — the tutor should proactively help with domain knowledge that isn't the learning objective (e.g., API docs in a Go course, tax form structure in an accounting course) so struggle stays focused on the course subject. Also add a one-liner to `AGENTS.md` "When to answer directly" block.
- [x] Add scribe calibration reference to `TUTOR-CONTRACT.md` §6 (Scribe Protocol) — the scribe should check if the course has a `references/SAMPLE-PROGRESS.md` and use it to calibrate detail level, structure, and tone before writing the first journal entry. Currently §6.4 says "read before writing" for style continuity but doesn't mention the sample progress concept.
- [x] Verify end-to-end: smoke test the skill chain with `go-lang-for-developers`. Run `parse-course.js` against the new COURSE.md (highest risk — schema changed with `**Topics:**` label, milestones, design questions). Then: configure-profile → start-course → check-progress. Full assignment completion is out of scope — that's using the product, not verifying it.

### Prepare for Publishing

Open-source readiness. Everything needed to flip the repo from private to public.

- [x] Skill directory separation — move all skills from `.claude/skills/<name>/` to `.claude/skills/core/<name>/`. Create `.claude/skills/custom/` with `.gitkeep`. Update all references across AGENTS.md, skill cross-references, tech spec, docs, and scripts. This eliminates the main merge-conflict surface for forked repos.
- [x] `CLAUDE.md` — root-level import hub. Uses `@path` syntax to import `AGENTS.md` and `AGENTS-CUSTOM.md`. Upstream-managed, stable.
- [x] `AGENTS-CUSTOM.md` — user-owned tutor extension file. Move the "Active Course" section from `AGENTS.md` here so `start-course` skill writes to the user-owned file. Ship with placeholder instructions for customisation (org-specific tutor rules, additional behaviour, custom skill references). Update `start-course` skill to write to `AGENTS-CUSTOM.md` instead of `AGENTS.md`. Upstream never touches this file.
- [x] LICENSE file — dual license: MIT for code (`scripts/`, `*.js`), CC-BY-SA 4.0 for content (everything else). Single file at repo root with both licenses clearly delineated.
- [x] .gitignore — `node_modules/`, `.DS_Store`, `Thumbs.db`, `*.log`
- [x] package.json — remove `private: true`, add `license: "MIT AND CC-BY-SA-4.0"`, repository (`ishands/upstack`), homepage, bugs, `author: "Ishan De Silva"`, keywords
- [x] Framework-managed vs custom files — document the managed section pattern (`<!-- Managed by the Upstack framework -->` / `<!-- END managed section -->`) in README and `docs/LEARNING-WITH-UPSTACK.md`. Explain which files are upstream-managed (`CLAUDE.md`, `AGENTS.md`), which have managed sections (`AGENTS-CUSTOM.md`), and where users put their own customisations.
- [x] Independence & cost disclaimer — add "Independence & Costs" section to README (not sponsored, not funded, pro subscription required). Also update `docs/LEARNING-WITH-UPSTACK.md` setup section with subscription requirements.
- [x] Cross-provider documentation — add "AI Tool Compatibility" section to README and learning guide. Honest: built and tested with Claude Code, content layer works with any tool, skills require Claude Code or manual invocation. Community contributions for other providers welcome.
- [x] CONTRIBUTING.md — fork-and-own guide, course contribution process (use create-course, PR to core/courses/), framework contribution process (higher bar, open issue first), quality bar, commit conventions, cross-provider contribution welcome
- [x] CODE_OF_CONDUCT.md — adopt Contributor Covenant v2.1
- [x] GitHub issue templates — bug report, course proposal, framework improvement (`.github/ISSUE_TEMPLATE/`)
- [x] GitHub PR template (`.github/PULL_REQUEST_TEMPLATE.md`)
- [x] README additions — license section, contributing section, courses available section, badges (license, version, contributions welcome)
- [x] Set up `main` + `develop` branch model — create `develop` branch, set `main` as default for forks, branch protection
- [x] Final review — read every file as a stranger would. Check for internal references, unclear jargon, missing context.
- [x] Flip to public — change repo visibility, add description and topics, tag `v0.1.0`

---

## v0.2.0

Tagged on `main`. Retroactively documented.

### Java Web Programming Course

- [x] `core/courses/java-web-programming/COURSE.md` — self-directed course for an engineer moving from Java SE into Spring Boot, REST APIs, and web application patterns. Target: Competent in Java, Novice in web/Spring.

### Brand & Reference Assets

- [x] Quick-reference card — `refs/assets/upstack-quick-reference-v1.jpg`, source prompt in `refs/media/QUICK-REFERENCE-PROMPT.md`, markdown version in `refs/media/QUICK-REFERENCE.md`. One-page visual summary of the Upstack workflow for learners.
- [x] `refs/media/BRAND-BRIEF.md` — voice, tone, visual identity, and messaging guidelines for Upstack.
- [x] `refs/README.md` — explains the `refs/` directory structure and purpose.

---

## v0.3.0

Migrating skills to the standard location agreed in the agentskills.io specification (`.agents/skills/...`) and a bunch of UX improvements from early beta testing. This version will also add a few starter courses for novice software engineers.

In progress on `feature/v0.3.0-implementation`.

### Skills Migration

**Why:** Claude Code's `/` slash invocation only discovers skills at `.claude/commands/<name>.md`. The current `.claude/skills/core/<name>/` nesting breaks slash invocation — `/configure-profile`, `/start-course`, etc. do not work. The cross-provider standard (agentskills.io) settles on `.agents/skills/` as the canonical provider-neutral location. Moving there future-proofs the repo for Cursor, Gemini CLI, and other providers. Claude Code gets thin `.claude/commands/` stubs that redirect to the canonical path.

**Build order: complete this section before UX Improvements** — UX Improvements edit skill files that will move in this section.

- [x] Move all skill directories from `.claude/skills/core/<name>/` → `.agents/skills/core/<name>/`. Move `.claude/skills/custom/` → `.agents/skills/custom/` (preserve `.gitkeep`). Remove the now-empty `.claude/skills/` tree. Skills to move: `configure-profile`, `create-course`, `start-course`, `complete-assignment`, `check-progress`, `generate-report`, `send-report`.

- [x] Create `.claude/commands/<name>.md` stub for each skill. Each stub is a single instruction line: `Load and follow the skill at .agents/skills/core/<name>/SKILL.md.` — no content duplication. This enables `/configure-profile`, `/start-course`, `/create-course`, `/complete-assignment`, `/check-progress` slash invocation in Claude Code. Also create stubs for `generate-report` and `send-report` as placeholders (skills not yet implemented — their canonical SKILL.md files do not exist yet; the stubs are forward declarations). Seven stubs total.

- [x] Update `AGENTS.md` — change all `.claude/skills/core/<name>/` path references to `.agents/skills/core/<name>/`. Sections to check: Calibration (two path refs), Scribe Protocol (one path ref), Available Skills table (all rows).

- [x] Update remaining path references across all docs and skill files: `docs/LEARNING-WITH-UPSTACK.md` (setup and skills invocation sections), `docs/UPSTACK-TECH-SPEC.md` (Section 6 skill directory structure), `CONTRIBUTING.md` (skill contribution process, directory layout), `README.md` (AI Tool Compatibility section). Also grep for `.claude/skills` inside `.agents/skills/core/*/SKILL.md` files — skill cross-references and `core/meta/` paths will need updating too.

### UX Improvements

UX improvements surfaced from real user testing sessions. Targets the first-run experience and the `configure-profile` interview flow.

- [x] First-session gate in `AGENTS.md` — if no `profile/PROFILE.md` exists, the tutor must invoke `configure-profile` before any learning work (course creation, assignment start, etc.). Currently absent; AI tools proceed directly to course work.
- [x] Orientation block in `AGENTS.md` — define how the tutor responds to "What is Upstack?" / "What can I learn here?" queries. Warm, non-technical welcome that invites the learner into `configure-profile` as the natural next step.
- [x] Session Start accuracy and clarity fixes in `AGENTS.md` — three issues from live testing: (1) orientation text listed courses that don't all exist yet; (2) Step 1 Case 1 needs to read `configure-profile/SKILL.md` before orienting so the AI has interview questions loaded; (3) "Invoke `configure-profile`" is ambiguous across AI tools — replace with explicit "Begin the interview".
- [x] CV/LinkedIn fast path in `configure-profile` — open the interview by offering to paste a professional bio or CV. AI parses what it can for all 7 fields, presents a conversational draft for confirmation, then asks only for what's missing. Simplified from original spec: PDF upload and LinkedIn scraping dropped (cross-provider reliability); redesigned as a partial fast path — bio covers Name/Background/Skills well, Mental Models by inference, Learning Preferences almost always needs a direct question regardless.
- [x] Plain-language skill-level framing in `configure-profile` — five levels presented as a numbered scale (1–5) with plain anchor phrases; framework name removed from learner-facing language. "Most people land in the middle" framing added to normalise the self-assessment. Applied to both `SKILL.md` and `PROFILE-TEMPLATE.md`.
- [x] No-technical-language rule in `configure-profile` — new Interview Guidelines rule: never surface filenames, internal framework terms, or git commands in learner-facing language. File writes and commits handled silently.
- [x] Git pre-req check in `AGENTS.md` — added a `git --version` soft check to the new-learner orientation (Step 1, Case 1). Git is a framework-wide dependency; surfacing it before the profile interview avoids discovering the gap after 10 minutes of setup. Presented as a natural part of the orientation block, not as an error state.
- [x] Sharpen "The Work Doer" anti-pattern in `core/meta/ANTI-PATTERNS.md` — added "The distinction" section separating reference knowledge (always permitted) from composing the learner's work (never permitted, even with vocabulary just provided); added edge-case examples showing legitimate reference followed by illegitimate composition; revised "What to do instead" with the skeleton rule (pattern, not solution) and coding/non-coding examples; cross-referenced TUTOR-CONTRACT.md §2.3 and §4.4. Added the skeleton rule to TUTOR-CONTRACT.md §2.3.
- [x] Add learner pushback handling to `core/meta/TUTOR-CONTRACT.md` — new §4.4 in Productive Struggle: assess legitimate frustration (blocked on reference → give pattern directly) vs. premature frustration (hasn't attempted → hold Socratic); never treat pushback as authorisation to provide the composed answer; cross-referenced Anti-Patterns §2 and §7.

### Engineering Fundamentals Courses

Seven standalone `COURSE.md` definitions for the engineering bootcamp series. Each course is self-contained — assignments are framed generically ("design a domain model for your project") with a built-in standalone example that gives a standalone learner a concrete project to work with. When a learning path is active, the tutor reads the learner's project choice from `progress/<learning-path-slug>/learner-context.md` and uses that as the assignment context instead of the standalone example. The course definition never changes — the AI substitutes based on what it finds in context. Build using the `create-course` skill as a community user would — this tests the skill chain end-to-end. No reference material or sample progress files needed; the AI tutor draws on its own knowledge for these fundamentals.

- [x] `core/courses/git-fundamentals/COURSE.md` — version control basics and feature branch workflow. Three assignments: local repo and commits, branching and merging, pull requests and collaboration. Learner creates a fresh practice repo as the first step — not the Upstack repo (which has history that would confuse a novice). Tutor verifies actions by asking the learner to share command output (`git log --oneline`, `git status`, `git branch -a`) and interpret it. Target: Novice in git, any programming background. Learning path integration task: create the capstone project repo.
- [x] `core/courses/markdown-fundamentals/COURSE.md` — structured writing for engineers: READMEs, PR descriptions, technical notes, documentation. Assignments produce real artefacts (a README, a design note, a structured bug report). Target: any background, no prior Markdown experience needed.
- [x] `core/courses/oop-fundamentals/COURSE.md` — core OOP concepts through to SOLID principles and an introduction to design patterns. Four assignments: (1) model a domain with classes (encapsulation, state, behaviour), (2) extend with inheritance and polymorphism, then identify where composition is the better choice, (3) apply SOLID — find violations in existing code, refactor to fix them, understand each principle's intent, (4) apply 3–4 patterns (Strategy, Observer, Factory Method, Decorator) to the same domain and reason about when each earns its complexity. Java examples throughout. Target: Novice in OOP but with basic programming experience; has seen classes before but not design discipline. Standalone example: library management system (rich enough to support SRP violations, OCP extension points, LSP hierarchies, and Strategy for fee/checkout algorithms).
- [x] `core/courses/agile-fundamentals/COURSE.md` — SDLC evolution, Agile manifesto, Scrum roles, ceremonies, sprint artefacts. Written and scenario-based assignments: write user stories, groom a backlog, diagnose a dysfunctional team scenario, run a retrospective. Target: Novice in Agile/Scrum, any background.
- [x] `core/courses/code-quality-fundamentals/COURSE.md` — naming conventions, code smells, self-documenting code, refactoring. Java examples on the same domain as oop-fundamentals. Assignments: identify smells in provided code, rename and restructure for clarity. Target: Novice in clean code practices, basic programming experience.
- [x] `core/courses/testing-fundamentals/COURSE.md` — test scenario identification, test case design, acceptance criteria, boundary analysis. Written artefact assignments only — no test framework or automation. Target: Novice in test design, any background.
- [x] `core/courses/dsa-fundamentals/COURSE.md` — arrays, hash maps, recursion, Big O intuition. Java implementation. Assignments: choose the right structure for a problem, implement a search, analyse the complexity of a solution. Target: Novice in DS&A, basic programming experience.

### Engineering Bootcamp Learning Path

The first curated learning path. Bundles the seven fundamentals courses into a sequenced, project-driven programme for fresh graduate software engineers. Build after all seven courses are defined — the path depends on them, not the reverse.

**Core design:** Courses do not know about the learning path. The learning path knows about the courses and adds integration tasks on top. Each integration task applies the skill just learned to the learner's chosen capstone project. Some integration tasks produce early components of the capstone (e.g., the oop-fundamentals integration task produces the domain model). The capstone is the learning path's final milestone — not a course — where the learner assembles all components into a working application. Integration task outputs live in `progress/<learning-path-slug>/integration-journal.md`, separate from individual course journals.

- [x] `LEARNING-PATH.md` schema — YAML frontmatter (courses list, project-options list, capstone-title) + markdown body (Learning Path Narrative, Project Options, Integration Tasks, Capstone, For L&D Coordinators). Documented in `docs/UPSTACK-TECH-SPEC.md` §9 and `.agents/skills/core/start-learning-path/references/LEARNING-PATH-SCHEMA.md`.
- [x] `progress/<learning-path-slug>/` structure — `learner-context.md` (project choice, current position, integration task checklist) + `integration-journal.md` (concise record of integration task outputs, one entry per course). Templates in `.agents/skills/core/start-learning-path/references/`. Sits alongside course directories in `progress/`.
- [x] `core/learning-paths/engineering-bootcamp/LEARNING-PATH.md` — seven-course sequence: git-fundamentals → markdown-fundamentals → oop-fundamentals → dsa-fundamentals → code-quality-fundamentals → testing-fundamentals → agile-fundamentals. Three capstone project options with full briefs: **Personal Library Catalogue** (book → author → friend → loan, lifecycle tracking), **Recipe Manager** (recipe → ingredient → meal plan → shopping list, aggregation), **Job Application Tracker** (company → application → interview stages → offer). Per-project integration task per course. Capstone: assemble all components into a working CLI application.
- [x] `start-learning-path` skill — enrolment flow: check for existing enrolment, present three project options in plain language, record choice in `progress/<path-slug>/learner-context.md`, initialise `integration-journal.md`, update `## Active Learning Path` in `AGENTS-CUSTOM.md`, display course roadmap. Distinguishes enrolment (path level, one-time) from starting a course (delegates to `start-course`). Also: `AGENTS.md` updated with learning path check in Session Start Step 2 and new Available Skills row; `.claude/commands/start-learning-path.md` stub added.

---

## Unplanned

### Progress Reporting

Needed for org-ready use cases and the self-directed engineer to track learning.

- [ ] `generate-report` skill — generate + commit a timestamped progress report. Includes `generate-report.js` script.
- [ ] `send-report` skill — email report to coordinator(s). Includes `send-report.js` script.
- [ ] Shared `scripts/utils/` — parse-journal.js, parse-course.js, git-utils.js (extracted during earlier skill builds)
- [ ] Tech spec §5 path cleanup — forward-looking script code blocks (§5.2–5.4) use old `curated/custom` directory naming and stale relative paths from before the `core/` skill nesting. Update inline code to match actual directory structure when implementing these scripts.

### Static Site

Course discovery and progress visualisation for users who prefer a browser over the terminal. Target deployment: GitHub Pages at `upstacklearning.org`.

- [ ] Site framework choice (static site generator TBD)
- [ ] Course catalogue page — list all courses from `core/courses/` and `custom/courses/`
- [ ] Course detail page — show structure, progress, reasoning review prompts
- [ ] Learning path view — show sequenced courses with progress
- [ ] `scripts/generate-catalogue.js` — build catalogue data for the site

### Deferred / Future

- [ ] `TUTOR-CONTRACT-ORG.md` — organisational variant with reporting cadence and coordinator config
- [ ] `ORG-PROFILE.md` — organisation L&D configuration template
- [ ] Cross-provider skill adapters — symlinks or setup script for Cursor, Gemini CLI, etc. Community-driven when demand emerges.
- [ ] CI validation for SKILL.md frontmatter

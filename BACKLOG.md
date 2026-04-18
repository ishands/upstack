# Upstack — Product Backlog

**Last updated:** 2026-04-18
**Status key:** `[ ]` todo · `[~]` in progress · `[x]` done · `[-]` descoped

---

## MVP Goal

Two real users can learn with Upstack:

1. **Individual learner** — starts a curated course (Go Lang for Developers, Git-101, OOP-101, or DS&A-101), works through assignments with the AI tutor, tracks progress
2. **Self-directed engineer** — configures their profile, creates their own course (Java Spring Boot), learns with the AI tutor

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

In progress on `feature/v0.3.0-implementation`.

### Beta Testing Fixes

UX improvements surfaced from real user testing sessions. Targets the first-run experience and the `configure-profile` interview flow.

- [ ] First-session gate in `AGENTS.md` — if no `profile/PROFILE.md` exists, the tutor must invoke `configure-profile` before any learning work (course creation, assignment start, etc.). Currently absent; AI tools proceed directly to course work.
- [ ] Orientation block in `AGENTS.md` — define how the tutor responds to "What is Upstack?" / "What can I learn here?" queries. Warm, non-technical welcome that invites the learner into `configure-profile` as the natural next step.
- [ ] CV/LinkedIn fast path in `configure-profile` — open the interview by offering to parse an existing CV or LinkedIn profile. Parse it, present a draft summary for confirmation, then ask only for what's missing. Removes the serial 7-field interview for experienced learners.
- [ ] Plain-language skill-level framing in `configure-profile` — introduce the five skill levels (Novice → Expert) in plain terms without assuming the learner knows the Dreyfus framework by name. The level names are intuitive and can be retained; the framework name should not appear in learner-facing language.
- [ ] No-technical-language rule in `configure-profile` — never surface filenames (`profile/PROFILE.md`), internal framework terms, or git commands in learner-facing language during the interview. Tutor handles these silently.

### Starter Courses

`COURSE.md` definitions only — no reference material or sample progress. Proves the framework generalises beyond Go and Java. AI tutor draws on its own knowledge for these fundamentals. Build using the `create-course` skill as a community user would — this tests the skill chain end-to-end.

- [ ] `core/courses/git-101/COURSE.md` — version control fundamentals. Assignments TBD during build (likely: repo basics, branching & merging, collaboration workflows). Target: Novice in git, any background.
- [ ] `core/courses/oop-101/COURSE.md` — core OOP concepts (encapsulation, inheritance, polymorphism, composition). Language-agnostic framing with examples in Java/Python. Target: Novice in OOP, has basic programming.
- [ ] `core/courses/dsa-101/COURSE.md` — fundamental data structures (arrays, linked lists, stacks, queues, trees, hash maps) and algorithms (sorting, searching, recursion, basic complexity analysis). Target: Novice in DS&A, has basic programming.

---

## Unplanned

### Progress Reporting

Needed for org-ready use cases and the self-directed engineer to track learning.

- [ ] `generate-report` skill — generate + commit a timestamped progress report. Includes `generate-report.js` script.
- [ ] `send-report` skill — email report to coordinator(s). Includes `send-report.js` script.
- [ ] Shared `scripts/utils/` — parse-journal.js, parse-course.js, git-utils.js (extracted during earlier skill builds)
- [ ] Tech spec §5 path cleanup — forward-looking script code blocks (§5.2–5.4) use old `curated/custom` directory naming and stale relative paths from before the `core/` skill nesting. Update inline code to match actual directory structure when implementing these scripts.

### Learning Paths

The sequenced course bundle concept. Enables the engineering bootcamp and similar curated paths.

- [ ] `LEARNING-PATH.md` schema — YAML frontmatter (title, slug, courses with order/unlock dependencies, milestones) + markdown body
- [ ] `core/learning-paths/` directory structure
- [ ] `engineering-bootcamp/LEARNING-PATH.md` — fresh grad learning path bundling Go Lang for Developers, git-101, oop-101, dsa-101, with sequencing and prerequisites
- [ ] `start-learning-path` skill — initialise journals for all courses in sequence, show roadmap (defer if `start-course` per course is sufficient)

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

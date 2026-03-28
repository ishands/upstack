# Changelog

All notable changes to Upstack are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/).

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

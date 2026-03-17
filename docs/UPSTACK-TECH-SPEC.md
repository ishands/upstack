# Upstack — Technical Specification

**Version:** 2.1
**Author:** Ishan De Silva
**Date:** 1 March 2026
**Status:** Pre-build specification
**Major Revision:** Skills-based architecture; AGENTS.md + Agent Skills open standards

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Repository Architecture](#2-repository-architecture)
3. [COURSE.md Schema — Curriculum Definition](#3-coursemd-schema--curriculum-definition)
4. [Progress Tracking Model](#4-progress-tracking-model)
5. [Progress Scripts](#5-progress-scripts)
6. [AI Tool Integration](#6-ai-tool-integration)
7. [Local Web Application](#7-local-web-application)
8. [Report Generation and Delivery](#8-report-generation-and-delivery)
9. [Bootcamp / Learning Path Model](#9-bootcamp--learning-path-model)
10. [Getting Started Flows](#10-getting-started-flows)
11. [Updated Concept Paper Amendments](#11-updated-concept-paper-amendments)

---

## 1. Product Overview

### 1.1 What Upstack Is

Upstack is a local-first, open-source learning framework that configures AI as a genuine tutor rather than an answer machine. It combines four integrated components:

- **Framework core** — markdown templates and principles that define how AI should behave during learning sessions
- **Agent skills** — discrete, invocable actions (start a course, complete an assignment, generate a report) packaged in the open Agent Skills format (agentskills.io)
- **Progress scripts** — shared utilities that skills invoke to collect, compile, and report learning progress
- **Static site** — a lightweight site for course discovery, progress visualisation, and learning management

### 1.2 Design Principles

**Local-first.** All data lives in the repository. No backend, no database, no accounts. Progress is version-controlled markdown. The web app reads from the filesystem at runtime.

**Fork-and-own.** Users fork the repository to make Upstack theirs. Their progress, custom courses, and personal configuration travel with them in their own GitHub repository. Learners can pull upstream course updates at any time without merge conflicts.

**AI-agnostic.** The framework builds on two open standards: AGENTS.md (agents.md) for ambient agent configuration and Agent Skills (agentskills.io) for discrete actions. Both are LLM-agnostic by design — supported by Claude Code, Codex, Cursor, Gemini, and others. No vendor lock-in. Plain chat interfaces work too: paste the AGENTS.md content as a system prompt.

**Version-controlled progress.** Progress state lives in `progress/<slug>/journal.md` as markdown checkboxes. Completion history is the git log. Reports are committed markdown files. Everything is auditable, portable, and human-readable without the app running.

**Organisation-ready.** Progress reports are generated as timestamped markdown files committed to the repository. They can be emailed to L&D coordinators by the AI agent or the user. The report format is designed for both human reading and future programmatic aggregation.

### 1.3 User Personas

**Individual Learner** — forks Upstack, selects or creates a course, configures the AI tutor, learns, tracks progress. Progress stays in their fork.

**Organisational Cohort Member** — same as individual learner, but follows a prescribed bootcamp learning path defined by their organisation. Submits progress reports to an L&D coordinator on a regular cadence.

**L&D Coordinator / Manager** — receives timestamped progress reports by email. Uses embedded reasoning review prompts to conduct 1-on-1 progress discussions. Does not need to run Upstack themselves.

**Course Author** — contributes a new course to the catalogue by following the `COURSE.md` schema and submitting a pull request to the upstream repository.

---

## 2. Repository Architecture

```
upstack/
│
├── README.md                    # Manifesto and quick start
├── CONTRIBUTING.md              # How to add courses and contribute
├── AGENTS.md                    # LLM-agnostic tutor configuration (open standard)
├── BACKLOG.md                   # Product backlog (milestones + tasks)
├── package.json                 # Root — dependencies + npm run scripts
│
├── docs/                        # Living design documents
│   └── UPSTACK-TECH-SPEC.md     # Technical specification (this file)
│
├── refs/                        # Stable reference material
│   └── UPSTACK-CONCEPT-PAPER.md # Full theoretical foundation
│
├── core/                        # Upstream-managed — do not modify
│   ├── meta/                    # Framework core (ambient-layer docs)
│   │   ├── PRINCIPLES.md        # Learning theory foundation
│   │   ├── TUTOR-CONTRACT.md    # Base tutor behaviour (referenced by AGENTS.md)
│   │   ├── TUTOR-CONTRACT-ORG.md # Organisational variant
│   │   └── ANTI-PATTERNS.md     # What Upstack is not
│   │
│   ├── courses/                 # Community-contributed, reviewed courses
│   │   └── go-lang-for-developers/ # Featured use case (fully annotated)
│   │       ├── COURSE.md        # Course definition with YAML frontmatter
│   │       └── references/      # Sample progress, scribe calibration material
│   │
│   └── learning-paths/          # Sequenced course bundles
│       └── engineering-bootcamp/
│           └── LEARNING-PATH.md
│
├── custom/                      # User-owned — modify freely
│   ├── courses/                 # Your personal courses — not upstreamed
│   │   └── .gitkeep
│   └── learning-paths/          # Your personal learning paths
│       └── .gitkeep
│
├── .claude/                     # Claude Code tool configuration
│   └── skills/                  # Agent Skills (agentskills.io format)
│       ├── README.md            # Skill conventions and structure guide
│       ├── configure-profile/
│       │   ├── SKILL.md         # Create/update learner profile
│       │   └── references/
│       │       └── PROFILE-TEMPLATE.md  # Measurement checklist
│       ├── create-course/
│       │   ├── SKILL.md         # Scaffold new course from schema
│       │   └── references/
│       │       └── COURSE-SCHEMA.md
│       ├── start-course/
│       │   ├── SKILL.md         # Initialise journal, load course context
│       │   └── references/
│       │       ├── JOURNAL-TEMPLATE.md  # Journal scaffold
│       │       └── LEARNER-CONTEXT.md   # Per-course calibration checklist
│       ├── complete-assignment/
│       │   └── SKILL.md         # Reasoning review gate, mark [x], commit
│       ├── check-progress/
│       │   ├── SKILL.md         # Display current completion state
│       │   └── scripts/
│       │       └── collect-progress.js
│       ├── generate-report/
│       │   ├── SKILL.md         # Generate + commit progress report
│       │   └── scripts/
│       │       └── generate-report.js
│       └── send-report/
│           ├── SKILL.md         # Email report to coordinator(s)
│           └── scripts/
│               └── send-report.js
│
├── scripts/                     # Shared utilities (imported by skills)
│   └── utils/
│       ├── parse-course.js      # COURSE.md parser (curriculum structure)
│       ├── parse-journal.js     # Journal parser (progress state)
│       ├── parse-learning-path.js # LEARNING-PATH.md parser
│       └── git-utils.js         # Git log timestamp extraction
│
├── profile/                     # Learner identity — who you are
│   └── PROFILE.md               # Created by configure-profile skill
│
├── progress/                    # Learner-owned — never upstreamed
│   └── go-lang-for-developers/  # One directory per active course
│       ├── learner-context.md   # This learner's calibration for this course
│       ├── journal.md           # Living learning journal (source of truth)
│       └── report-20260207.md   # Generated progress reports
│
└── site/                        # Static site (GitHub Pages)
    └── ...                      # Structure TBD — see M6
```

**`core/` vs `custom/` separation.** Everything in `core/` is upstream-managed — learners do not modify these files. Everything in `custom/` is user-owned. This separation guarantees zero merge conflicts when pulling upstream course updates. The `profile/` and `progress/` directories are also user-owned but serve distinct purposes: profile captures who the learner is (static-ish), progress captures what they've done (changes every session).

**Two-layer calibration model.** Upstack calibrates the AI tutor using two complementary layers. The **Learner Profile** (`profile/PROFILE.md`) is the learner's full anatomy — professional background, skills inventory, mental models, Dreyfus self-assessment, and learning preferences across all courses. The **Learner Context** (`progress/<slug>/learner-context.md`) is the body spec for one garment — which parts of the learner's anatomy are relevant to *this specific course*. The profile changes slowly as the learner grows (the anatomy grows — completing courses builds new skills and shifts Dreyfus levels upward); the context is created once per course. The tutor reads both: profile first (who you are), then context (how your background applies to this course). See `.claude/skills/core/configure-profile/references/PROFILE-TEMPLATE.md` and `.claude/skills/core/start-course/references/LEARNER-CONTEXT.md` for the measurement checklists.

**Note on tool-specific skill discovery:** Upstream skills live in `.claude/skills/core/`, user-created skills in `.claude/skills/custom/`. This is the native discovery path for Claude Code. Other AI tools discover skills in their own locations (e.g., `.gemini/skills/` for Gemini). Cross-provider discovery (symlinks or copies) can be added when needed. The SKILL.md format is the same regardless of discovery path.

---

## 3. COURSE.md Schema — Curriculum Definition

### 3.1 COURSE.md Structure

Every course is defined by a `COURSE.md` file at the root of its directory. The file has two parts: YAML frontmatter carrying machine-readable metadata, and a markdown body carrying human-readable content.

**Key principle:** `COURSE.md` is the curriculum definition. Learners never edit it. All progress and completion state lives in `progress/<slug>/journal.md`. This separation guarantees zero merge conflicts when learners pull upstream course updates.

**Full schema reference:** `.claude/skills/core/create-course/references/COURSE-SCHEMA.md` — contains YAML frontmatter fields, markdown body template, directory structure, and structure rules (module/assignment/topic heading patterns).

### 3.2 COURSE.md Parsing Rules

The `parse-course.js` utility extracts curriculum structure from each `COURSE.md` for use by the web app and bootcamp scripts. It does **not** extract completion state — that is the journal's responsibility.

**From YAML frontmatter:** all metadata fields as-is.

**From markdown body:** module and assignment structure by scanning for the patterns:

```
### Module N: Name
#### Assignment N: Title
- [ ] Topic — description
```

The parser builds a structured curriculum object:

```json
{
  "slug": "course-slug",
  "title": "Course Title",
  "modules": [
    {
      "name": "Module 1: Module Name",
      "assignments": [
        {
          "id": "01",
          "title": "Assignment 1: Title",
          "topics": [
            "Topic 1 — brief description",
            "Topic 2 — brief description"
          ]
        },
        {
          "id": "02",
          "title": "Assignment 2: Title",
          "topics": [
            "Topic 1 — brief description"
          ]
        }
      ]
    }
  ],
  "totalAssignments": 2
}
```

Completion state (which assignments are done and when) is parsed separately by `parse-journal.js` and merged by `generate-catalogue.js` to produce the full catalogue entry used by the web app.

---

## 4. Progress Tracking Model

### 4.1 How Progress is Tracked

Progress state lives in `progress/<course-slug>/journal.md` — a learner-owned file created and maintained by the AI tutor. It is the single source of truth for completion state.

**The separation:**

| File | Owner | Contains |
|------|-------|----------|
| `courses/*/COURSE.md` | Course author | Curriculum topics, reasoning prompts |
| `progress/*/journal.md` | Learner | Completion checkboxes, narrative, mistakes |

This separation guarantees zero merge conflicts: course authors update `COURSE.md`, learners accumulate progress in `journal.md`. The two files never conflict.

**The rule:** only mark an assignment complete after the AI tutor has asked and received satisfactory answers to the Reasoning Review Prompts for that assignment. This is enforced by the tutor contract, not by the system — it is a learner contract underpinned by the AI's verification role.

### 4.2 Git Log as Timeline

Because the journal is committed to git, `git log` provides a complete, tamper-evident timeline:

```bash
# When was Assignment 1 completed?
git log -p --follow progress/go-lang-for-developers/journal.md \
  | grep -B5 '\+- \[x\] \*\*Assignment 1'
```

This extracts the exact commit timestamp when the checkbox was ticked. The scripts automate this extraction. The result is a progress timeline that requires no separate tracking infrastructure.

### 4.3 Report Storage

Generated reports are committed alongside the journal in the course's progress subdirectory:

```
progress/
  go-lang-for-developers/
    journal.md
    report-20260207.md
    report-20260211.md
  another-course/
    journal.md
    report-20260214.md
```

Reports are never overwritten — each generation creates a new timestamped file. An L&D coordinator can ask for "the report from last week" and get it from git history.

### 4.4 The Learning Journal

**Location:** `progress/<course-slug>/journal.md`

**Created by:** AI tutor from `.claude/skills/core/start-course/references/JOURNAL-TEMPLATE.md` when the learner starts a course.

**Updated by:** AI tutor as Scribe during every learning session.

**Purpose:** Not a log, not a diary — a **narrative of productive struggle.** The journal is the real learning artifact. It is private to the learner's fork and is never upstreamed.

For the full journal structure (header format, per-assignment sections, error documentation format, scribe instructions), see `.claude/skills/core/start-course/references/JOURNAL-TEMPLATE.md`. For the scribe protocol that governs how the tutor maintains the journal, see `core/meta/TUTOR-CONTRACT.md` §6.

---

## 5. Progress Scripts

Scripts are Node.js and live inside their owning skill's `scripts/` subdirectory (see Section 2). Shared parsing utilities live in `scripts/utils/` at the repo root and are imported by skills. Scripts are invoked by the AI agent as tool calls, by `npm run` commands, or directly from the terminal.

### 5.1 `collect-progress.js`

**Location:** `.claude/skills/core/check-progress/scripts/collect-progress.js`

Walks the `progress/` directory, parses all `journal.md` files, extracts completion state including git timestamps, and outputs structured JSON.

```javascript
#!/usr/bin/env node
// .claude/skills/core/check-progress/scripts/collect-progress.js
// Usage: node .claude/skills/core/check-progress/scripts/collect-progress.js [--course <slug>] [--output json|text]

const fs = require('fs');
const path = require('path');
const { parseJournal } = require('../../../../scripts/utils/parse-journal');
const { getCompletionTimestamp } = require('../../../../scripts/utils/git-utils');

const PROGRESS_DIR = path.join(__dirname, '..', '..', '..', '..', 'progress');

async function collectProgress(courseSlug = null) {
  const results = [];

  if (!fs.existsSync(PROGRESS_DIR)) return results;

  const courseDirs = fs
    .readdirSync(PROGRESS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => !courseSlug || name === courseSlug);

  for (const courseName of courseDirs) {
    const journalPath = path.join(PROGRESS_DIR, courseName, 'journal.md');
    if (!fs.existsSync(journalPath)) continue;

    const journalData = parseJournal(journalPath);

    // Enrich with git timestamps
    for (const assignment of journalData.assignments) {
      if (assignment.completed) {
        assignment.completedDate = await getCompletionTimestamp(journalPath, assignment.title);
      }
    }

    results.push(journalData);
  }

  return results;
}

// CLI entry point
const args = process.argv.slice(2);
const courseArg = args.includes('--course') ? args[args.indexOf('--course') + 1] : null;
const outputFormat = args.includes('--output') ? args[args.indexOf('--output') + 1] : 'json';

collectProgress(courseArg).then((data) => {
  if (outputFormat === 'json') {
    console.log(JSON.stringify(data, null, 2));
  } else {
    // Human-readable summary
    data.forEach((course) => {
      console.log(`\n📚 ${course.title}`);
      console.log(
        `   Progress: ${course.completionPercent}% ` + `(${course.completedAssignments}/${course.totalAssignments})`,
      );
      course.assignments.forEach((a) => {
        const tick = a.completed ? '✅' : '⬜';
        const date = a.completedDate ? ` — completed ${a.completedDate}` : '';
        console.log(`   ${tick} ${a.title}${date}`);
      });
    });
  }
});

module.exports = { collectProgress };
```

### 5.2 `generate-report.js`

**Location:** `.claude/skills/core/generate-report/scripts/generate-report.js`

Calls `collect-progress.js` for completion state, loads `COURSE.md` for module structure, generates a formatted markdown report, and commits it to `progress/<slug>/`.

```javascript
#!/usr/bin/env node
// .claude/skills/core/generate-report/scripts/generate-report.js
// Usage: node .claude/skills/core/generate-report/scripts/generate-report.js --course <slug> [--learner <name>]
//   AI agents: invoke this when a module is completed or learner requests a report.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { collectProgress } = require('../../check-progress/scripts/collect-progress');
const { parseCourse } = require('../../../../scripts/utils/parse-course');

function formatDate(date = new Date()) {
  return date.toISOString().slice(0, 10).replace(/-/g, '');
}

function formatDateTime(date = new Date()) {
  return date.toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
}

async function generateReport({ courseSlug, learnerName, periodDays = 7 }) {
  // Completion state from journal
  const allProgress = await collectProgress(courseSlug);

  if (allProgress.length === 0) {
    console.error(`No progress journal found for course: ${courseSlug}`);
    process.exit(1);
  }

  const journalData = allProgress[0];
  const now = new Date();
  const periodStart = new Date(now - periodDays * 24 * 60 * 60 * 1000);

  // Course structure from COURSE.md (for module breakdown in report)
  const courseMdPath = findCourseMd(courseSlug);
  const courseStructure = courseMdPath ? parseCourse(courseMdPath) : null;

  // Identify what was completed in the reporting period
  const completedThisPeriod = journalData.assignments.filter((a) => {
    if (!a.completed || !a.completedDate) return false;
    return new Date(a.completedDate) >= periodStart;
  });

  // Load reasoning review prompts from COURSE.md
  const reasoningPrompts = extractReasoningPrompts(courseMdPath, completedThisPeriod);

  // Build module breakdown by merging course structure + journal completion state
  const progressMap = {};
  for (const a of journalData.assignments) {
    progressMap[a.title] = { completed: a.completed, completedDate: a.completedDate };
  }

  const moduleBreakdown = courseStructure?.modules.map((mod) => {
    const modAssignments = mod.assignments.map((a) => ({
      ...a,
      ...(progressMap[a.title] || { completed: false, completedDate: null }),
    }));
    const modCompleted = modAssignments.filter((a) => a.completed).length;
    const modTotal = modAssignments.length;
    const pct = Math.round((modCompleted / modTotal) * 100);
    return { name: mod.name, assignments: modAssignments, pct, modCompleted, modTotal };
  }) || [];

  // Build report markdown
  const reportDate = formatDate(now);
  const reportContent =
    `# Upstack Progress Report
**Learner:** ${learnerName || 'Not specified — add --learner "Your Name"'}
**Course:** ${journalData.title}
**Report Date:** ${formatDateTime(now)}
**Reporting Period:** Last ${periodDays} days

---

## Summary

${generateSummaryNarrative(journalData, completedThisPeriod, periodDays)}

---

## Completed This Period

${
  completedThisPeriod.length === 0
    ? '_No assignments completed in this period._'
    : completedThisPeriod
        .map((a) => `- [x] **${a.title}**\n` + `  Completed: ${a.completedDate}`)
        .join('\n\n')
}

---

## Overall Course Progress

**${journalData.completionPercent}% complete** ` +
    `(${journalData.completedAssignments} of ${journalData.totalAssignments} assignments)

${
  moduleBreakdown.length > 0
    ? moduleBreakdown
        .map(
          (mod) =>
            `**${mod.name}** — ${mod.pct}% (${mod.modCompleted}/${mod.modTotal})\n` +
            mod.assignments.map((a) => `  ${a.completed ? '- [x]' : '- [ ]'} ${a.title}`).join('\n'),
        )
        .join('\n\n')
    : journalData.assignments.map((a) => `  ${a.completed ? '- [x]' : '- [ ]'} ${a.title}`).join('\n')
}

---

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these questions in your next
> 1-on-1 to probe for genuine understanding beyond completion state.
> Do not accept "yes I know it" — ask them to explain, to give an
> example, to identify where the concept breaks down.

${reasoningPrompts.length === 0 ? '_No new assignments to review this period._' : reasoningPrompts.join('\n\n')}

---

## Recommended Next Steps

${generateNextSteps(journalData)}

---

_Generated by Upstack on ${formatDateTime(now)}_
_Repository: run \`git log progress/\` to see full report history_
`;

  // Write report to progress/<courseSlug>/ directory
  const repoRoot = path.join(__dirname, '..', '..', '..');
  const progressDir = path.join(repoRoot, 'progress', courseSlug);
  if (!fs.existsSync(progressDir)) {
    fs.mkdirSync(progressDir, { recursive: true });
  }

  const reportFilename = `report-${reportDate}.md`;
  const reportPath = path.join(progressDir, reportFilename);
  fs.writeFileSync(reportPath, reportContent);

  // Commit the report
  try {
    execSync(`git add progress/${courseSlug}/${reportFilename}`, { cwd: repoRoot });
    execSync(`git commit -m "progress: ${courseSlug} report ${reportDate}"`, { cwd: repoRoot });
    console.log(`✅ Report committed: progress/${courseSlug}/${reportFilename}`);
  } catch (e) {
    console.log(`⚠️  Report written to progress/${courseSlug}/${reportFilename}`);
    console.log('   (git commit failed — commit manually if needed)');
  }

  return { reportPath, reportFilename, reportContent };
}

function generateSummaryNarrative(journalData, completedThisPeriod, periodDays) {
  if (completedThisPeriod.length === 0) {
    return (
      `No assignments were completed in the last ${periodDays} days. ` +
      `Overall course progress is at ${journalData.completionPercent}%.`
    );
  }
  const names = completedThisPeriod.map((a) => a.title).join(', ');
  return (
    `${completedThisPeriod.length} assignment(s) completed this period: ` +
    `${names}. Overall course progress is now ${journalData.completionPercent}% ` +
    `(${journalData.completedAssignments} of ${journalData.totalAssignments} assignments).`
  );
}

function generateNextSteps(journalData) {
  const next = journalData.assignments
    .filter((a) => !a.completed)
    .slice(0, 2)
    .map((a) => `- **${a.title}**`);
  return next.length > 0
    ? next.join('\n')
    : '_All assignments complete. Consider contributing a new course!_';
}

function extractReasoningPrompts(courseMdPath, completedAssignments) {
  if (!courseMdPath || !fs.existsSync(courseMdPath)) return [];
  const content = fs.readFileSync(courseMdPath, 'utf8');
  const prompts = [];

  // Extract the Reasoning Review Prompts section
  const promptSection = content.match(/## Reasoning Review Prompts([\s\S]*?)(?=^##|\Z)/m);
  if (!promptSection) return [];

  // For each completed assignment, find its prompts
  for (const assignment of completedAssignments) {
    const assignmentPattern = new RegExp(
      `\\*\\*After ${assignment.title.split(':')[0]}[^*]*\\*\\*([\\s\\S]*?)(?=\\*\\*After|$)`,
      'i',
    );
    const match = promptSection[1].match(assignmentPattern);
    if (match) {
      prompts.push(`**After ${assignment.title}:**\n${match[1].trim()}`);
    }
  }

  return prompts;
}

function findCourseMd(slug) {
  const coursesDir = path.join(__dirname, '..', '..', '..', 'courses');
  for (const type of ['curated', 'custom']) {
    const p = path.join(coursesDir, type, slug, 'COURSE.md');
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// CLI entry point
const args = process.argv.slice(2);
const courseSlug = args.includes('--course') ? args[args.indexOf('--course') + 1] : null;
const learnerName = args.includes('--learner') ? args[args.indexOf('--learner') + 1] : null;
const periodDays = args.includes('--days') ? parseInt(args[args.indexOf('--days') + 1]) : 7;

if (!courseSlug) {
  console.error('Usage: node .claude/skills/core/generate-report/scripts/generate-report.js --course <slug> ' + '[--learner "Name"] [--days 7]');
  process.exit(1);
}

generateReport({ courseSlug, learnerName, periodDays });

module.exports = { generateReport };
```

### 5.3 `send-report.js`

**Location:** `.claude/skills/core/send-report/scripts/send-report.js`

Opens the user's default email client with the report pre-populated, or sends via SMTP if configured.

```javascript
#!/usr/bin/env node
// .claude/skills/core/send-report/scripts/send-report.js
// Usage: node .claude/skills/core/send-report/scripts/send-report.js --report <path> --to <email>[,<email>]
//   Or:  node .claude/skills/core/send-report/scripts/send-report.js --course <slug> --to <email> --generate

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function sendReport({ reportPath, toAddresses, subject }) {
  if (!fs.existsSync(reportPath)) {
    console.error(`Report not found: ${reportPath}`);
    process.exit(1);
  }

  const reportContent = fs.readFileSync(reportPath, 'utf8');
  const toList = Array.isArray(toAddresses) ? toAddresses.join(',') : toAddresses;

  // Strategy 1: mailto link (default — works everywhere, no configuration)
  const encodedBody = encodeURIComponent(reportContent);
  const encodedSubject = encodeURIComponent(subject || 'Upstack Progress Report');
  const mailtoLink = `mailto:${toList}?subject=${encodedSubject}&body=${encodedBody}`;

  console.log('\n📧 Opening your email client with the report pre-populated...');
  console.log(`   To: ${toList}`);
  console.log(`   Report: ${path.basename(reportPath)}\n`);

  try {
    // Cross-platform open
    const platform = process.platform;
    if (platform === 'darwin') {
      execSync(`open "${mailtoLink}"`);
    } else if (platform === 'win32') {
      execSync(`start "" "${mailtoLink}"`);
    } else {
      execSync(`xdg-open "${mailtoLink}"`);
    }
    console.log('✅ Email client opened. Review and send.');
  } catch (e) {
    // Fallback: print report path and instructions
    console.log('⚠️  Could not open email client automatically.');
    console.log('   Please send the following file manually:');
    console.log(`   ${path.resolve(reportPath)}`);
    console.log('\n   Or copy the report content below:\n');
    console.log('─'.repeat(60));
    console.log(reportContent);
    console.log('─'.repeat(60));
  }
}

// CLI entry point
const args = process.argv.slice(2);

const toArg = args.includes('--to') ? args[args.indexOf('--to') + 1].split(',') : null;
const reportArg = args.includes('--report') ? args[args.indexOf('--report') + 1] : null;
const subjectArg = args.includes('--subject') ? args[args.indexOf('--subject') + 1] : null;

if (!toArg || !reportArg) {
  console.error('Usage: node .claude/skills/core/send-report/scripts/send-report.js --report <path> --to <email>[,<email>]');
  process.exit(1);
}

sendReport({
  reportPath: reportArg,
  toAddresses: toArg,
  subject: subjectArg,
});

module.exports = { sendReport };
```

### 5.4 `generate-catalogue.js`

**Location:** `scripts/generate-catalogue.js` (top-level — serves the site build, not a skill)

> **Note:** This script's output path and purpose will be revised when the static site design is finalised. The logic is retained here as reference.

Runs at build time, walks all course and bootcamp directories, and writes catalogue data. For each course, reads `COURSE.md` for curriculum structure and enriches with completion data from the learner's journal if present.

```javascript
#!/usr/bin/env node
// scripts/generate-catalogue.js
// Runs automatically before npm start. Generates web/src/data/catalogue.json

const fs = require('fs');
const path = require('path');
const { parseCourse } = require('./utils/parse-course');
const { parseJournal } = require('./utils/parse-journal');
const { parseLearningPath } = require('./utils/parse-learning-path');

const COURSES_DIR = path.join(__dirname, '..', 'core', 'courses');
const CUSTOM_COURSES_DIR = path.join(__dirname, '..', 'custom', 'courses');
const LEARNING_PATHS_DIR = path.join(__dirname, '..', 'core', 'learning-paths');
const PROGRESS_DIR = path.join(__dirname, '..', 'progress');
const OUTPUT_PATH = path.join(__dirname, '..', 'web', 'src', 'data', 'catalogue.json');

async function generateCatalogue() {
  const courses = [];
  const bootcamps = [];

  // Collect courses
  for (const type of ['curated', 'custom']) {
    const dir = path.join(COURSES_DIR, type);
    if (!fs.existsSync(dir)) continue;

    const entries = fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory());

    for (const entry of entries) {
      const courseMd = path.join(dir, entry.name, 'COURSE.md');
      if (!fs.existsSync(courseMd)) continue;

      try {
        const data = parseCourse(courseMd);
        data.type = type; // 'curated' or 'custom'
        data.path = path.join('courses', type, entry.name);

        // Enrich with progress data from journal if present
        const journalPath = path.join(PROGRESS_DIR, entry.name, 'journal.md');
        if (fs.existsSync(journalPath)) {
          const journalData = parseJournal(journalPath);

          // Build progress map and merge completion state into module/assignment structure
          const progressMap = {};
          for (const a of journalData.assignments) {
            progressMap[a.title] = { completed: a.completed, completedDate: a.completedDate };
          }
          for (const module of data.modules || []) {
            for (const assignment of module.assignments || []) {
              const p = progressMap[assignment.title] || { completed: false, completedDate: null };
              assignment.completed = p.completed;
              assignment.completedDate = p.completedDate;
            }
          }

          data.completionPercent = journalData.completionPercent;
          data.completedAssignments = journalData.completedAssignments;
          data.totalAssignments = journalData.totalAssignments;
          data.progress = {
            started: journalData.started,
            completed: journalData.completionPercent === 100,
            'last-active': journalData.assignments
              .filter((a) => a.completedDate)
              .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))[0]
              ?.completedDate || null,
          };
        }

        courses.push(data);
        console.log(`  ✓ course: ${data.title}`);
      } catch (e) {
        console.warn(`  ⚠ Skipped ${entry.name}: ${e.message}`);
      }
    }
  }

  // Collect bootcamps
  for (const type of ['curated', 'custom']) {
    const dir = path.join(BOOTCAMPS_DIR, type);
    if (!fs.existsSync(dir)) continue;

    const entries = fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory());

    for (const entry of entries) {
      const bootcampMd = path.join(dir, entry.name, 'BOOTCAMP.md');
      if (!fs.existsSync(bootcampMd)) continue;

      try {
        const data = parseBootcamp(bootcampMd);
        data.type = type;
        bootcamps.push(data);
        console.log(`  ✓ bootcamp: ${data.title}`);
      } catch (e) {
        console.warn(`  ⚠ Skipped ${entry.name}: ${e.message}`);
      }
    }
  }

  const catalogue = {
    generated: new Date().toISOString(),
    courses,
    bootcamps,
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(catalogue, null, 2));

  console.log(`\n✅ Catalogue generated: ${courses.length} courses, ` + `${bootcamps.length} bootcamps`);
}

generateCatalogue().catch((e) => {
  console.error('Catalogue generation failed:', e);
  process.exit(1);
});
```

### 5.5 `parse-journal.js`

**Location:** `scripts/utils/parse-journal.js` (shared utility — imported by multiple skills)

Parses `progress/<slug>/journal.md` and extracts completion state.

```javascript
// scripts/utils/parse-journal.js
// Parses progress/<course-slug>/journal.md to extract completion state

const fs = require('fs');
const path = require('path');

function parseJournal(journalPath) {
  const content = fs.readFileSync(journalPath, 'utf8');

  // Extract header fields
  const titleMatch = content.match(/^#\s+(.+?)\s+—\s+Personal Journal/m);
  const learnerMatch = content.match(/\*\*Learner:\*\*\s+(.+)/);
  const startedMatch = content.match(/\*\*Started:\*\*\s+(.+)/);

  // Derive slug from journal path: progress/<slug>/journal.md
  const slug = path.basename(path.dirname(journalPath));

  // Extract Progress Tracker section
  const trackerMatch = content.match(/## Progress Tracker([\s\S]*?)(?=^---|\n## (?!Progress))/m);
  const assignments = [];

  if (trackerMatch) {
    const pattern = /- \[([ x])\] \*\*([^*]+)\*\*/g;
    let match;
    while ((match = pattern.exec(trackerMatch[1])) !== null) {
      const fullTitle = match[2].trim();
      // Strip " — completed YYYY-MM-DD" suffix if present
      const title = fullTitle.replace(/\s+—\s+completed\s+\S+$/, '').trim();
      assignments.push({
        completed: match[1] === 'x',
        title,
        completedDate: null, // enriched by collect-progress.js via git-utils
      });
    }
  }

  const totalAssignments = assignments.length;
  const completedAssignments = assignments.filter((a) => a.completed).length;
  const completionPercent =
    totalAssignments > 0 ? Math.round((completedAssignments / totalAssignments) * 100) : 0;

  return {
    slug,
    title: titleMatch ? titleMatch[1] : slug,
    learner: learnerMatch ? learnerMatch[1].trim() : null,
    started: startedMatch ? startedMatch[1].trim() : null,
    assignments,
    completionPercent,
    totalAssignments,
    completedAssignments,
  };
}

module.exports = { parseJournal };
```

---

## 6. AI Tool Integration

### 6.1 Architecture: Two Layers

Upstack's AI integration is split into two layers aligned with open standards:

| Layer | Standard | Purpose | Loaded when |
|-------|----------|---------|-------------|
| **Ambient behaviour** | AGENTS.md (agents.md) | Defines *how* the AI behaves — Socratic tutoring, scribe protocol, calibration | Session start (always) |
| **Discrete actions** | Agent Skills (agentskills.io) | Defines *what* the AI does at specific moments — start course, complete assignment, generate report | On invocation |

**Why two layers?** The tutor's teaching behaviour (guide rather than answer, preserve mistakes, calibrate to learner context) is a continuous mode — it applies to every interaction. This belongs in the ambient configuration. The operational actions (creating a journal, running a script, marking an assignment complete) are discrete, triggered events. Packaging them as skills makes them self-contained, discoverable, and invocable.

**Migration from v2.0:** The monolithic `TUTOR-CONTRACT.md` is decomposed as follows:

| v2.0 location (TUTOR-CONTRACT.md section) | v2.1 location |
|--------------------------------------------|---------------|
| Tutor identity, Socratic method, calibration | AGENTS.md (ambient) |
| Scribe protocol (documenting mistakes, corrections, aha moments) | AGENTS.md (ambient) |
| "On course start" operational block | `start-course` skill |
| "On assignment completion" operational block | `complete-assignment` skill |
| Tools Available table | Distributed across skill instructions |
| Trigger Conditions / Workflow When Triggered | `generate-report` skill |
| Privacy Rules | AGENTS.md (cross-cutting) |

The base `core/meta/TUTOR-CONTRACT.md` file is retained as the detailed reference for learning theory and tutor behaviour. AGENTS.md references it. Skills reference specific sections as needed.

### 6.2 AGENTS.md — Tutor Configuration

The `AGENTS.md` file at the repository root is the LLM-agnostic agent configuration. It is read automatically by tools that support the AGENTS.md standard (Claude Code, Codex, Cursor, Gemini, and others). For tools that do not yet read AGENTS.md natively, use a symlink: `ln -s AGENTS.md CLAUDE.md` or `ln -s AGENTS.md .cursorrules`.

The full `AGENTS.md` content is maintained in the live file at the
repository root — not reproduced here, to avoid drift between the
spec and the actual configuration. The file contains:

- **Identity and role** — configures the AI as an Upstack learning tutor with Guide and Scribe modes
- **Core behaviour** — Socratic protocol summary (core loop, hint escalation, when to answer directly). References `core/meta/TUTOR-CONTRACT.md` §2.
- **Calibration** — Dreyfus-based adjustment table, profile and course context reading protocol. References `core/meta/TUTOR-CONTRACT.md` §3 and `.claude/skills/core/start-course/references/LEARNER-CONTEXT.md`.
- **Principles summary** — one-line summary of all eight principles. References `core/meta/PRINCIPLES.md`.
- **Anti-pattern guardrails** — the seven named anti-patterns as a compact checklist with self-correction protocol. References `core/meta/ANTI-PATTERNS.md`.
- **Scribe protocol** — when and how to maintain the learning journal. References `core/meta/TUTOR-CONTRACT.md` §6 and `.claude/skills/core/start-course/references/JOURNAL-TEMPLATE.md`.
- **Active course** — populated by the `start-course` skill; blank by default
- **Privacy rules** — constraints on email, outbound communication, external services
- **Available skills table** — lists all invocable skills with purpose and trigger conditions

See `AGENTS.md` at the repository root for the current content.

### 6.3 Skill Catalogue

Skills follow the `{verb}-{object}` naming convention. The verb indicates the action type:

| Verb | Action type | Example |
|------|-------------|---------|
| `start-` / `complete-` | Lifecycle operations | `start-course`, `complete-assignment` |
| `check-` | Read-only inspection | `check-progress` |
| `generate-` | AI-driven artifact creation | `generate-report` |
| `send-` | Delivery | `send-report` |
| `create-` | Human-judgment artifact | `create-course` |

This convention aligns with the `{verb}-{object}-{stack?}` pattern used in organisational skill systems. No stack suffix is needed for Upstack skills as they are not technology-specific.

#### 6.3.1 `start-course`

```yaml
---
name: start-course
description: >
  Initialise a learning session. Checks for an existing journal in
  progress/<course-slug>/journal.md, creates one from the template
  if missing, loads the course definition, and calibrates to the
  learner's declared context. Use when starting a new course or
  resuming after a break.
metadata:
  version: '1.0'
---
```

**Instructions summary:**
1. Read the active `COURSE.md` — extract the Course Structure section
2. Check if `progress/<slug>/journal.md` exists
3. If not: create journal from `.claude/skills/core/start-course/references/JOURNAL-TEMPLATE.md`, populating the Progress Tracker with assignments from COURSE.md
4. Check if `progress/<slug>/learner-context.md` exists
5. If not: interview the learner using `.claude/skills/core/start-course/references/LEARNER-CONTEXT.md` as the measurement checklist, write answers to `progress/<slug>/learner-context.md`
6. Commit: `git add progress/<slug>/ && git commit -m "progress: start <slug>"`
7. Calibrate: read `profile/PROFILE.md` (if it exists) for the learner's full background, then `progress/<slug>/learner-context.md` for course-specific context. Profile first (who you are), then context (how your background applies to this course). See `.claude/skills/core/configure-profile/references/PROFILE-TEMPLATE.md` §"How the Tutor Reads the Profile" for per-section guidance.
8. Summarise: what assignments are ahead, where the learner left off (if resuming)

#### 6.3.2 `complete-assignment`

```yaml
---
name: complete-assignment
description: >
  Run the reasoning review gate for a completed assignment. Asks 2-3
  Reasoning Review Prompts from COURSE.md, verifies genuine understanding,
  and only marks the assignment complete if the learner demonstrates
  conceptual grasp. Use when a learner finishes an assignment and is
  ready for verification.
metadata:
  version: '1.0'
---
```

**Instructions summary:**
1. Identify which assignment the learner is completing
2. Load the Reasoning Review Prompts for that assignment from COURSE.md
3. Follow the reasoning review protocol in `core/meta/TUTOR-CONTRACT.md` §7
4. Only when understanding is verified:
   - Change `- [ ]` to `- [x]` in the Progress Tracker section of the journal
   - Add `— completed YYYY-MM-DD` to the checkbox line
   - Add a completion summary below the milestone section
   - Commit: `git add progress/<slug>/journal.md && git commit -m "progress: complete <assignment>"`

#### 6.3.3 `check-progress`

```yaml
---
name: check-progress
description: >
  Display current completion state for one or all active courses.
  Runs collect-progress.js to parse journals and extract completion
  percentages with git timestamps. Use when the learner asks about
  their progress or at the start of a session.
metadata:
  version: '1.0'
---
```

**Instructions summary:**
1. Run `node .claude/skills/core/check-progress/scripts/collect-progress.js --course <slug> --output text`
2. Display the result to the learner

**Contains:** `scripts/collect-progress.js` (source code in Section 5.1)

#### 6.3.4 `generate-report`

```yaml
---
name: generate-report
description: >
  Generate a timestamped progress report and commit it to the
  progress directory. Merges journal completion state with course
  structure and includes reasoning review prompts for the coordinator.
  Use when a module is completed, the learner requests a report,
  or the last report is more than 7 days old.
metadata:
  version: '1.0'
---
```

**Instructions summary:**
1. Run `node .claude/skills/core/check-progress/scripts/collect-progress.js --course <slug>` to get current state
2. Inform the learner: "You've completed [X]. I'll generate a progress report now."
3. Run `node .claude/skills/core/generate-report/scripts/generate-report.js --course <slug> --learner "Name"`
4. This commits the report to `progress/<slug>/report-YYYYMMDD.md`
5. Confirm: "Report saved to `progress/<slug>/`."

**Trigger conditions** (auto-generate when):
1. The learner completes all assignments in a module (all marked `[x]`)
2. The learner explicitly requests: "generate my progress report", "send my progress", "report my progress"
3. At session start, if the last report is more than 7 days old and progress has been made since

**Contains:** `scripts/generate-report.js` (source code in Section 5.2)

#### 6.3.5 `send-report`

```yaml
---
name: send-report
description: >
  Email a progress report to one or more coordinators. Opens the
  user's default email client with the report pre-populated. Use
  after generating a report when the learner wants to send it.
metadata:
  version: '1.0'
---
```

**Instructions summary:**
1. Ask: "Who should I send this to? Please provide email address(es)." (If learner says "just save it", stop here)
2. Run `node .claude/skills/core/send-report/scripts/send-report.js --report <path> --to <email>`
3. Confirm: "Report sent to [addresses]."
4. Do not store email addresses anywhere — ask every time

**Contains:** `scripts/send-report.js` (source code in Section 5.3)

#### 6.3.6 `create-course`

```yaml
---
name: create-course
description: >
  Scaffold a new course directory from the COURSE.md schema. Creates
  the directory structure, populates COURSE.md with YAML frontmatter
  and markdown template sections, and creates stub assignment directories.
  Use when a course author wants to create a new course.
metadata:
  version: '1.0'
---
```

**Instructions summary:**
1. Ask the author for: course title, slug, domain, level, number of modules and assignments
2. Create `custom/courses/<slug>/` directory
3. Generate `COURSE.md` from the schema in `references/COURSE-SCHEMA.md`, populating frontmatter and structure
4. Create `docs/` and `assignments/` subdirectories with stubs
5. Commit: `git add custom/courses/<slug> && git commit -m "course: scaffold <slug>"`

**Contains:** `references/COURSE-SCHEMA.md` (the COURSE.md schema from Section 3)

#### 6.3.7 `configure-profile`

```yaml
---
name: configure-profile
description: >
  Create or update the global learner profile. Interviews the learner
  using the measurement checklist in .claude/skills/core/configure-profile/references/PROFILE-TEMPLATE.md and
  writes the structured result to profile/PROFILE.md. Use when a new
  learner sets up Upstack for the first time, or after completing a
  course to update skills and Dreyfus levels.
metadata:
  version: '1.0'
---
```

**Instructions summary:**
1. Read `.claude/skills/core/configure-profile/references/PROFILE-TEMPLATE.md` — the measurement checklist
2. Check if `profile/PROFILE.md` exists
3. If new profile: interview the learner through all 7 measurement fields (Name, Professional Background, Skills Inventory, Mental Models, Dreyfus Self-Assessment, Learning Preferences, Completed Courses). Use the Ask/Probe guidance in the template. Do not rush — the profile interview is the learner's first experience with Upstack's conversational calibration.
4. If updating: read the existing profile, ask what has changed rather than starting from scratch. Natural update triggers: after completing a course (new skills, shifted Dreyfus levels), after a career change, when starting a course in a new domain.
5. Write `profile/PROFILE.md` using the structured output format defined in the template — Skills Inventory uses Strong/Moderate/Weak groupings, Dreyfus Self-Assessment uses a table with exact Dreyfus labels, Completed Courses includes the Dreyfus shift notation (e.g., "Novice → Competent"). Follow the 6 recording rules in the template's Recording Guidance section.
6. Commit: `git add profile/PROFILE.md && git commit -m "profile: configure learner profile"` (or `"profile: update learner profile"` for updates)

---

## 7. Local Web Application

> **v2.1 note:** The embedded React app described below is being replaced by a static site in a future revision. The component architecture and data flow are retained here as reference for the static site design.

### 7.1 Setup and Launch

```json
// package.json (root)
{
  "name": "upstack",
  "version": "1.0.0",
  "scripts": {
    "start": "node scripts/generate-catalogue.js && cd site && npm start",
    "build": "node scripts/generate-catalogue.js && cd site && npm run build",
    "catalogue": "node scripts/generate-catalogue.js",
    "progress": "node .claude/skills/core/check-progress/scripts/collect-progress.js --output text",
    "report": "node .claude/skills/core/generate-report/scripts/generate-report.js"
  },
  "dependencies": {
    "js-yaml": "^4.1.0",
    "gray-matter": "^4.0.3"
  }
}
```

```json
// web/package.json
{
  "name": "upstack-web",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
```

### 7.2 App Entry Point

```jsx
// web/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import GettingStarted from './pages/GettingStarted';
import Catalogue from './pages/Catalogue';
import CourseDetail from './pages/CourseDetail';
import BootcampDetail from './pages/BootcampDetail';
import catalogue from './data/catalogue.json';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home catalogue={catalogue} />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/catalogue" element={<Catalogue catalogue={catalogue} />} />
            <Route path="/course/:slug" element={<CourseDetail catalogue={catalogue} />} />
            <Route path="/bootcamp/:slug" element={<BootcampDetail catalogue={catalogue} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
```

### 7.3 Catalogue Page

```jsx
// web/src/pages/Catalogue.jsx
import { useState } from 'react';
import CourseCard from '../components/CourseCard';

const DOMAINS = [
  'all',
  'languages',
  'system-design',
  'architecture',
  'engineering-practices',
  'soft-skills',
  'domain-knowledge',
];
const LEVELS = ['all', 'beginner', 'intermediate', 'advanced'];

export default function Catalogue({ catalogue }) {
  const [domainFilter, setDomainFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustom, setShowCustom] = useState(true);

  const filtered = catalogue.courses.filter((course) => {
    if (domainFilter !== 'all' && course.domain !== domainFilter) return false;
    if (levelFilter !== 'all' && course.level !== levelFilter) return false;
    if (!showCustom && course.type === 'custom') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        course.title.toLowerCase().includes(q) ||
        course.tags?.some((t) => t.toLowerCase().includes(q)) ||
        course['target-audience']?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const featured = filtered.filter((c) => c.featured);
  const rest = filtered.filter((c) => !c.featured);

  return (
    <div className="catalogue">
      <div className="catalogue-header">
        <h1>Course Catalogue</h1>
        <p className="catalogue-subtitle">
          Each course is a complete AI tutor configuration. Clone, configure, and learn — with an AI that guides rather than
          answers.
        </p>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="filter-row">
          <FilterGroup label="Domain" options={DOMAINS} value={domainFilter} onChange={setDomainFilter} />
          <FilterGroup label="Level" options={LEVELS} value={levelFilter} onChange={setLevelFilter} />
          <label className="toggle-label">
            <input type="checkbox" checked={showCustom} onChange={(e) => setShowCustom(e.target.checked)} />
            Show my custom courses
          </label>
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="catalogue-section">
          <h2>Featured</h2>
          <div className="course-grid">
            {featured.map((course) => (
              <CourseCard key={course.slug} course={course} featured />
            ))}
          </div>
        </section>
      )}

      {/* All courses */}
      <section className="catalogue-section">
        <h2>All Courses ({rest.length})</h2>
        {rest.length === 0 ? (
          <p className="empty-state">No courses match your filters.</p>
        ) : (
          <div className="course-grid">
            {rest.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="filter-group">
      <span className="filter-label">{label}:</span>
      {options.map((opt) => (
        <button key={opt} className={`filter-btn ${value === opt ? 'active' : ''}`} onClick={() => onChange(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
}
```

### 7.4 Course Detail Page

```jsx
// web/src/pages/CourseDetail.jsx
import { useParams, Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import ModuleList from '../components/ModuleList';
import ReportViewer from '../components/ReportViewer';

export default function CourseDetail({ catalogue }) {
  const { slug } = useParams();
  const course = catalogue.courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="not-found">
        <h2>Course not found</h2>
        <Link to="/catalogue">← Back to catalogue</Link>
      </div>
    );
  }

  const started = course.progress?.started;
  const completed = course.progress?.completed;

  return (
    <div className="course-detail">
      <div className="course-hero">
        <div className="course-hero-meta">
          <span className={`level-badge level-${course.level}`}>{course.level}</span>
          <span className="domain-badge">{course.domain}</span>
          {course.type === 'custom' && <span className="custom-badge">My Course</span>}
        </div>
        <h1>{course.title}</h1>
        <p className="course-author">by {course.author}</p>
        {course['estimated-hours'] && (
          <p className="course-meta">
            ~{course['estimated-hours']} hours · {course.totalAssignments} assignments
          </p>
        )}
      </div>

      {/* Progress summary */}
      {started && (
        <div className="progress-summary">
          <h2>Your Progress</h2>
          <ProgressBar percent={course.completionPercent} completed={completed} />
          <p className="progress-detail">
            {course.completedAssignments} of {course.totalAssignments} assignments complete
            {course.progress['last-active'] && ` · Last active ${course.progress['last-active']}`}
          </p>
        </div>
      )}

      {/* Module breakdown */}
      <div className="course-content">
        <div className="course-main">
          <section>
            <h2>Target Audience</h2>
            <p>{course['target-audience']}</p>
          </section>

          {course.prerequisites?.length > 0 && (
            <section>
              <h2>Prerequisites</h2>
              <ul>
                {course.prerequisites.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2>Modules & Assignments</h2>
            <ModuleList modules={course.modules} />
          </section>
        </div>

        <div className="course-sidebar">
          <div className="sidebar-card">
            <h3>Start This Course</h3>
            <ol>
              <li>Open your terminal in the repo root</li>
              <li>
                Copy the tutor contract:
                <code>cat core/meta/TUTOR-CONTRACT.md</code>
              </li>
              <li>Start your AI session, paste the contract first</li>
              <li>The tutor will interview you for your learner context on first session</li>
              <li>Begin Assignment 1</li>
            </ol>
          </div>

          <div className="sidebar-card">
            <h3>AI Tool Setup</h3>
            {course['ai-tools']?.map((tool) => (
              <div key={tool} className="tool-badge">
                {tool}
              </div>
            ))}
          </div>

          <div className="sidebar-card">
            <h3>Generate Report</h3>
            <p>Run from terminal:</p>
            <code>npm run report -- --course {course.slug} --learner "Your Name"</code>
          </div>
        </div>
      </div>

      {/* Recent reports */}
      <ReportViewer courseSlug={slug} />
    </div>
  );
}
```

### 7.5 Progress Bar Component

```jsx
// web/src/components/ProgressBar.jsx
export default function ProgressBar({ percent, completed, showLabel = true }) {
  const clampedPercent = Math.min(100, Math.max(0, percent));

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-track">
        <div className={`progress-bar-fill ${completed ? 'completed' : ''}`} style={{ width: `${clampedPercent}%` }} />
      </div>
      {showLabel && <span className="progress-bar-label">{completed ? '✅ Complete' : `${clampedPercent}%`}</span>}
    </div>
  );
}
```

### 7.6 Module List Component

```jsx
// web/src/components/ModuleList.jsx
import ProgressBar from './ProgressBar';

export default function ModuleList({ modules }) {
  return (
    <div className="module-list">
      {modules.map((module, i) => {
        const completed = module.assignments.filter((a) => a.completed).length;
        const total = module.assignments.length;
        const percent = Math.round((completed / total) * 100);

        return (
          <div key={i} className="module">
            <div className="module-header">
              <h3>{module.name}</h3>
              <span className="module-progress">
                {completed}/{total}
              </span>
            </div>
            <ProgressBar percent={percent} showLabel={false} />
            <div className="assignment-list">
              {module.assignments.map((assignment, j) => (
                <div key={j} className={`assignment ${assignment.completed ? 'done' : 'pending'}`}>
                  <span className="assignment-tick">{assignment.completed ? '✅' : '⬜'}</span>
                  <span className="assignment-title">{assignment.title}</span>
                  {assignment.completedDate && (
                    <span className="assignment-date">
                      {new Date(assignment.completedDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

### 7.7 Report Viewer Component

```jsx
// web/src/components/ReportViewer.jsx
// Reads report filenames from catalogue data — reports listed at build time

export default function ReportViewer({ courseSlug }) {
  // Reports are listed in catalogue.json if present
  // In a local-first app we cannot read /progress at runtime
  // so we surface a terminal command instead

  return (
    <section className="report-viewer">
      <h2>Progress Reports</h2>
      <p>
        Reports are version-controlled markdown files in <code>progress/{courseSlug}/</code>. View them in your editor, or run:
      </p>
      <code className="code-block">ls progress/{courseSlug}/report-*.md</code>
      <p>To generate a new report:</p>
      <code className="code-block">npm run report -- --course {courseSlug} --learner "Your Name"</code>
      <p>To send the latest report:</p>
      <code className="code-block">
        node .claude/skills/core/send-report/scripts/send-report.js \<br />
        &nbsp;&nbsp;--report progress/{courseSlug}/report-YYYYMMDD.md \<br />
        &nbsp;&nbsp;--to coordinator@yourorg.com
      </code>
    </section>
  );
}
```

---

## 8. Report Generation and Delivery

### 8.1 Sample Generated Report

```markdown
# Upstack Progress Report

**Learner:** Jamie Silva
**Course:** Learning Go
**Report Date:** 2026-02-11 09:45 UTC
**Reporting Period:** Last 7 days

---

## Summary

2 assignments completed this period: HostManager, Feed Catcher.
Overall course progress is now 67% (2 of 3 assignments).

---

## Completed This Period

- [x] **Assignment 1: HostManager**
      Completed: 2026-02-07T14:23:00Z

- [x] **Assignment 2: Feed Catcher**
      Completed: 2026-02-10T11:05:00Z

---

## Overall Course Progress

**67% complete** (2 of 3 assignments)

**Module 1: Core Language** — 100% (2/2)

  - [x] Assignment 1: HostManager
  - [x] Assignment 2: Feed Catcher

**Module 2: Resilience (Optional)** — 0% (0/1)

  - [ ] Assignment 3: Resilience Layer

---

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these questions in your next
> 1-on-1 to probe for genuine understanding beyond completion state.

**After Assignment 1: HostManager:**

- What is the difference between a Go interface and a C++ abstract class?
- Why does Go use explicit error returns instead of exceptions?
- What is the goroutine scheduler doing that a thread scheduler does not?
- Where does the fan-out pattern break down?

**After Assignment 2: Feed Catcher:**

- When would you use context cancellation versus a done channel?
- What is the closure gotcha in goroutines and why does it happen?
- If the WebSocket drops mid-stream, what is your recovery strategy?

---

## Recommended Next Steps

- **Assignment 3: Resilience Layer**

---

_Generated by Upstack on 2026-02-11 09:45 UTC_
_Repository: run `git log progress/` to see full report history_
```

---

## 9. Bootcamp / Learning Path Model

### 9.1 BOOTCAMP.md Schema

```markdown
---
title: 'Software Engineering Fundamentals'
slug: 'se-fundamentals'
version: '1.0'
author: 'Your Organisation'
target-audience: 'New software engineering graduates and interns'
duration-weeks: 12
level: 'beginner'
domain: 'engineering-practices'
featured: false

courses:
  - slug: 'go-lang-for-developers'
    required: true
    order: 1
    unlock-after: null
    milestone: 'Language Foundations'

  - slug: 'learning-design-patterns'
    required: true
    order: 2
    unlock-after: 'go-lang-for-developers'
    milestone: 'Design Thinking'

  - slug: 'learning-system-design'
    required: false
    order: 3
    unlock-after: 'learning-design-patterns'
    milestone: 'Systems Thinking'

reporting:
  frequency-days: 7
  coordinator-prompt: >
    Review the reasoning prompts for each completed assignment.
    In 1-on-1s, probe for far transfer: ask how concepts from
    one course apply in the context of another.
---

# Software Engineering Fundamentals Bootcamp

A 12-week structured learning path for new engineers joining your team.
Designed to build genuine understanding through productive struggle,
not just output production.

## Learning Path Narrative

Week 1-4 establishes language fluency in Go — chosen not because your
team necessarily uses Go, but because its deliberate departure from
OOP conventions forces fresh graduates to examine their assumptions
rather than cargo-cult familiar patterns.

Week 5-8 builds design thinking through patterns — learning why
abstractions are structured the way they are, not just how to apply them.

Week 9-12 introduces systems thinking — how components interact,
how Conway's Law shapes architecture, how to reason about emergent
behaviour in distributed systems.

## For L&D Coordinators

Each course includes Reasoning Review Prompts — use these in weekly
1-on-1s. The goal is not to test recall but to probe for the mental
model: can the learner explain, in their own words, why a design
decision was made? Can they identify where the pattern breaks down?

Progress reports are generated automatically and emailed to you
weekly. The reports include suggested discussion questions tied
to what was completed that week.
```

---

## 10. Getting Started Flows

### 10.1 Individual Learner

```bash
# 1. Fork the repository on GitHub (github.com/upstack/upstack → Fork)

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/upstack.git
cd upstack

# 3. Install dependencies
npm install

# 4. Start the featured Go course
#    Open core/courses/go-lang-for-developers/COURSE.md
#    The tutor will interview you for your learner context on first session
#    Open your AI tool (Claude Code, Cursor, Codex, etc.) in this repository
#    The tutor configuration loads automatically via AGENTS.md
#    Use /start-course to initialise your journal (or the AI creates it on first session)
#    Begin Assignment 1

# 5. Track progress
#    The AI tutor maintains your journal as you learn
#    Use /check-progress to see where you stand
#    When an assignment is complete and verified, the AI marks it in the journal
#    git push  ← your progress is now on your GitHub

# 6. Pull upstream course updates at any time — zero merge conflicts
#    git fetch upstream
#    git merge upstream/main
#    # COURSE.md merges cleanly (you never edited it)
#    # progress/go-lang-for-developers/journal.md is untouched

# For plain chat interfaces (no AGENTS.md support):
#    Copy the contents of AGENTS.md and paste it as your first message
#    Then begin your learning session as normal
```

### 10.2 Organisational Setup

```bash
# L&D coordinator setup
# 1. Fork upstack into your ORG GitHub account
#    github.com/upstack/upstack → Fork → your-org/upstack

# 2. Create a bootcamp definition
cp -r core/learning-paths/template custom/learning-paths/se-fundamentals
# Edit custom/learning-paths/se-fundamentals/LEARNING-PATH.md

# 3. Share with interns
#    Tell interns to fork YOUR-ORG/upstack (not upstack/upstack)
#    This ensures they get your bootcamp and any org customisations

# 4. Interns set up reporting
#    They add coordinator email to their .env (optional, or enter at send time)
#    echo "COORDINATOR_EMAIL=manager@yourorg.com" > .env
#    Reports are sent weekly by the AI tutor or manually via:
#    Use /generate-report then /send-report, or run directly:
node .claude/skills/core/send-report/scripts/send-report.js \
  --report progress/go-lang-for-developers/report-YYYYMMDD.md \
  --to manager@yourorg.com
```

---

## 11. Updated Concept Paper Amendments

The following sections of the original Concept Paper v1.0 are superseded by this specification:

**Section 4.2 (Three Core Documents)** — expanded to include the progress tracking model, the COURSE.md schema, and the learning journal as additional core artefacts. A fourth document — the **Learner Profile** — was added during M1 implementation, establishing a two-layer calibration model: global profile (full anatomy) + per-course learner context (body spec for one garment). See Section 2 for the full model.

**Section 6 (Repository Structure)** — superseded by Section 2 of this spec. The directory tree is substantially expanded to include `/scripts`, `/web`, `/bootcamps`, and `/progress`.

**Section 7 (Getting Started)** — superseded by Section 10 of this spec with concrete terminal commands.

**New additions not in original paper:**

- Product component architecture (Section 1)
- COURSE.md curriculum definition and parsing rules (Section 3)
- Journal-based progress tracking via git log (Section 4)
- Progress scripts with full source (Section 5)
- Two-layer calibration model — global Learner Profile + per-course Learner Context (Sections 2, 6)
- AI tool integration — AGENTS.md, Agent Skills, plain chat (Section 6)
- Web application with component architecture (Section 7)
- Report generation, format, and delivery (Section 8)
- Bootcamp / learning path model (Section 9)

**v2.0 architectural change (Sections 3–6):** Decoupled course content from learner state. `COURSE.md` is now the immutable curriculum definition — topic-level checkboxes describe what each assignment covers, authored by course designers, never edited by learners. Assignment completion state moves to `progress/<slug>/journal.md`, eliminating git merge conflicts when learners pull upstream updates. The AI tutor takes on an explicit Scribe role: creating the journal on course start, documenting productive struggle during sessions, and enforcing a reasoning verification gate before marking any assignment complete.

**v2.1 architectural change (Section 6):** Decomposed the monolithic tutor contract into two layers aligned with open standards. Ambient tutor behaviour (Socratic guidance, scribe protocol, calibration) moves to `AGENTS.md` — the LLM-agnostic agent configuration standard (agents.md, stewarded by the Agentic AI Foundation under the Linux Foundation). Discrete operational actions (starting courses, completing assignments, generating reports) become Agent Skills following the agentskills.io specification. Progress scripts move from a top-level directory into their owning skills. The `{verb}-{object}` naming convention aligns with the SGLC org-skills system design. The embedded React web app is flagged for replacement by a static site.

---

_Technical Specification v2.1 — 1 March 2026._
_Ishan De Silva._
_Upstack — Knowledge is a commodity. This is how you build insight._

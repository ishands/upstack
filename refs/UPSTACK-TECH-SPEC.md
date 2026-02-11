# Upstack — Technical Specification

**Version:** 1.0  
**Author:** Ishan De Silva  
**Date:** 11 February 2026  
**Status:** Pre-build specification

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Repository Architecture](#2-repository-architecture)
3. [Data Model — COURSE.md Schema](#3-data-model--coursemd-schema)
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

Upstack is a local-first, open-source learning framework that configures AI as a genuine tutor rather than an answer machine. It combines three integrated components:

- **Framework core** — markdown templates and principles that define how AI should behave during learning sessions
- **Local web application** — a React app that runs on the user's machine, providing course discovery, progress visualisation, and learning management
- **Progress scripts** — CLI tools that AI agents (Claude Code, Cursor, Gemini with tool use) can invoke to collect, compile, and report learning progress

### 1.2 Design Principles

**Local-first.** All data lives in the repository. No backend, no database, no accounts. Progress is version-controlled markdown. The web app reads from the filesystem at runtime.

**Fork-and-own.** Users fork the repository to make Upstack theirs. Their progress, custom courses, and personal configuration travel with them in their own GitHub repository.

**AI-agnostic.** The framework works with any AI tool that supports file access or tool use — Claude Code, Cursor, VS Code with AI extensions, or plain chat interfaces with copy-paste.

**Version-controlled progress.** Progress state lives in `COURSE.md` files as markdown checkboxes. Completion history is the git log. Reports are committed markdown files. Everything is auditable, portable, and human-readable without the app running.

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
├── package.json                 # Root — web app dependencies + scripts
│
├── refs/                        # Initial refrence material
│   ├──UPSTACK-CONCEPT-PAPER.md  # Full theoretical foundation
│   └──UPSTACK-TECH-SPEC.md      # The original technical spec (this file)
│
├── meta/                        # Framework core — do not modify
│   ├── PRINCIPLES.md            # Learning theory foundation
│   ├── TUTOR-CONTRACT.md        # Base AI tutor configuration template
│   ├── TUTOR-CONTRACT-ORG.md    # Organisational variant
│   ├── LEARNER-CONTEXT.md       # Personal learner profile template
│   ├── ORG-PROFILE.md           # Org L&D configuration template
│   ├── LEARNING-LOG.md          # Living learning document template
│   └── ANTI-PATTERNS.md        # What Upstack is not
│
├── meta-custom/                 # Your overrides — modify freely
│   └── .gitkeep                 # Empty by default; add overrides here
│
├── courses/
│   ├── curated/                 # Community-contributed, reviewed courses
│   │   └── learning-go/         # Featured use case (fully annotated)
│   │       ├── COURSE.md        # Course definition with YAML frontmatter
│   │       ├── docs/
│   │       │   ├── PRIMER.md
│   │       │   ├── TUTORIAL.md
│   │       │   └── UPSTACK-NOTES.md
│   │       └── assignments/
│   │           ├── 01-hostmanager/
│   │           └── 02-feedcatcher/
│   │
│   └── custom/                  # Your personal courses — not upstreamed
│       └── .gitkeep
│
├── bootcamps/
│   ├── curated/                 # Community bootcamp definitions
│   └── custom/                  # Your org-specific bootcamps
│
├── progress/                    # Version-controlled progress reports
│   └── .gitkeep                 # Reports committed here by scripts
│
├── scripts/                     # CLI tools for progress collection
│   ├── collect-progress.js      # Walk courses, parse checkboxes
│   ├── generate-report.js       # Compile progress into report markdown
│   ├── send-report.js           # Email report or open mailto link
│   ├── generate-catalogue.js    # Build catalogue JSON for web app
│   └── utils/
│       ├── parse-course.js      # COURSE.md parser
│       ├── parse-bootcamp.js    # BOOTCAMP.md parser
│       └── git-utils.js         # Git log timestamp extraction
│
└── web/                         # React local web application
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── index.jsx
    │   ├── App.jsx
    │   ├── data/
    │   │   └── catalogue.json   # Generated by generate-catalogue.js
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── HowItWorks.jsx
    │   │   ├── GettingStarted.jsx
    │   │   ├── Catalogue.jsx
    │   │   ├── CourseDetail.jsx
    │   │   └── BootcampDetail.jsx
    │   ├── components/
    │   │   ├── CourseCard.jsx
    │   │   ├── ProgressBar.jsx
    │   │   ├── ModuleList.jsx
    │   │   ├── ReportViewer.jsx
    │   │   └── NavBar.jsx
    │   └── styles/
    │       └── index.css
    └── package.json
```

---

## 3. Data Model — COURSE.md Schema

### 3.1 COURSE.md Structure

Every course is defined by a `COURSE.md` file at the root of its directory. The file has two parts: YAML frontmatter carrying machine-readable metadata, and a markdown body carrying human-readable content.

```markdown
---
# ============================================
# UPSTACK COURSE DEFINITION
# ============================================

# Required fields
title: 'Learning Go'
slug: 'learning-go'
version: '1.0'
author: 'Ishan De Silva'
created: '2026-01-15'
updated: '2026-02-10'

# Categorisation
domain:
  'languages' # languages | system-design | architecture
  # engineering-practices | soft-skills | domain-knowledge
level: 'intermediate' # beginner | intermediate | advanced
tags:
  - go
  - concurrency
  - systems-programming

# Target audience
target-audience: >
  Experienced engineers (5+ years) coming from C++, Java, or Python.
  Assumes deep familiarity with OOP, concurrency, and systems concepts.
  Not suitable for beginners to programming.

prerequisites:
  - 'Comfortable with at least one compiled language'
  - 'Understanding of concurrency concepts (threads, locks)'
  - 'Familiarity with HTTP and network programming'

# Upstack configuration
ai-tools: # Tested with these tools
  - 'claude-code'
  - 'cursor'
  - 'claude-web'
tutor-contract:
  'meta/TUTOR-CONTRACT.md' # relative to repo root
  # override with custom path

# Display
featured: true # Show in featured section of catalogue
thumbnail: 'docs/thumbnail.png' # Optional course thumbnail
estimated-hours: 40

# Progress tracking — managed by scripts, do not edit manually
progress:
  started: '2026-02-01'
  last-active: '2026-02-10'
  completed: false
  completion-date: null
---

# Learning Go

A hands-on Go workspace built by an experienced C++/Python developer
learning Go idiomatically, guided by an AI tutor configured with Upstack.

## What You Will Learn

By the end of this course you will understand Go's core type system,
idiomatic error handling, goroutines and channels, and how to structure
real Go projects. More importantly, you will understand _why_ Go makes
the design choices it does — not just how to use it.

## Learning Objectives

- Translate OOP mental models into Go's composition-based paradigm
- Understand Go interfaces as consumer-defined contracts, not inheritance
- Build genuine intuition for goroutine and channel patterns
- Write idiomatic Go that a senior Go engineer would recognise as natural

## Learner Context

> This section is read by your AI tutor at the start of each session.
> Be specific. The quality of your tutor calibration depends on this.

I am an experienced software engineer with 15+ years in C++ and Python,
primarily in capital markets systems. I understand OOP deeply — classes,
inheritance, polymorphism, virtual dispatch. I know concurrency through
threads, mutexes, and condition variables. I am learning Go because I
want to understand its approach to concurrency and composition without
carrying C++ habits into it.

**Do not** explain basic programming concepts. **Do** explain why Go
made specific design choices differently from C++. **Challenge** my
C++ assumptions actively.

## Modules and Assignments

Progress is tracked by checking off assignments below.
Check an assignment when you have completed it AND can explain it.

### Module 1: Core Language

- [ ] **Assignment 1: HostManager** — System monitor covering structs,
      interfaces, error handling, testing, goroutines, channels.
      `assignments/01-hostmanager/`

- [ ] **Assignment 2: Feed Catcher** — Market data feed client covering
      context, cancellation, REST, WebSockets, advanced channel patterns.
      `assignments/02-feedcatcher/`

### Module 2: Resilience (Optional)

- [ ] **Assignment 3: Resilience Layer** — Supervision, reconnection,
      exponential backoff, structured logging, interface mocks.
      `assignments/03-resilience/`

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these in 1-on-1s to probe
> for genuine understanding beyond completion state.

**After Assignment 1:**

- What is the difference between a Go interface and a C++ abstract class?
- Why does Go use explicit error returns instead of exceptions?
- What is the goroutine scheduler doing that a thread scheduler does not?
- Where does the fan-out pattern break down?

**After Assignment 2:**

- When would you use context cancellation versus a done channel?
- What is the closure gotcha in goroutines and why does it happen?
- If the WebSocket drops mid-stream, what is your recovery strategy?

## Learning Log

See `docs/TUTORIAL.md` for the living record of this learning journey —
initial questions, conceptual shifts, comparisons to prior knowledge,
and practical examples accumulated during the course.
```

### 3.2 COURSE.md Parsing Rules

The `parse-course.js` utility extracts the following from each `COURSE.md`:

**From YAML frontmatter:** all metadata fields as-is.

**From markdown body:** module and assignment progress by scanning for the pattern:

```
- [ ] or - [x]  followed by  **Assignment N: Title**
```

The parser builds a structured progress object:

```json
{
  "slug": "learning-go",
  "title": "Learning Go",
  "modules": [
    {
      "name": "Module 1: Core Language",
      "assignments": [
        {
          "id": "01",
          "title": "HostManager",
          "completed": false,
          "completedDate": null
        },
        {
          "id": "02",
          "title": "Feed Catcher",
          "completed": true,
          "completedDate": "2026-02-07T14:23:00Z"
        }
      ]
    }
  ],
  "completionPercent": 33,
  "totalAssignments": 3,
  "completedAssignments": 1
}
```

Completion dates are extracted from `git log` on the `COURSE.md` file — specifically the commit timestamp of the line that changed from `- [ ]` to `- [x]` for each assignment.

---

## 4. Progress Tracking Model

### 4.1 How Progress is Tracked

Progress state lives entirely in the `COURSE.md` file as markdown checkboxes. The learner marks an assignment complete by changing `- [ ]` to `- [x]` in the relevant `COURSE.md` and committing. This is the only required action. Everything else — timestamps, history, reporting — is derived from this single source of truth.

**The rule:** only check an assignment when you can explain what you built and why the key design decisions were made. This is not enforced by the system — it is a learner contract enforced by personal integrity and the AI tutor's Reasoning Visibility checks.

### 4.2 Git Log as Timeline

Because progress is committed to git, `git log` provides a complete, tamper-evident timeline:

```bash
# When was Assignment 1 completed?
git log -p --follow courses/curated/learning-go/COURSE.md \
  | grep -B5 '\+- \[x\] \*\*Assignment 1'
```

This extracts the exact commit timestamp when the checkbox was ticked. The scripts automate this extraction. The result is a progress timeline that requires no separate tracking infrastructure.

### 4.3 Report Storage

Generated reports are committed to the `/progress` directory:

```
progress/
  learning-go-report-20260207.md
  learning-go-report-20260211.md
  bootcamp-se-fundamentals-report-20260214.md
```

Reports are never overwritten — each generation creates a new timestamped file. The report history is therefore also version-controlled. An L&D coordinator can ask for "the report from last week" and get it from git history.

---

## 5. Progress Scripts

All scripts live in `/scripts` and are Node.js. They are invoked either by the AI agent as tool calls, by `npm run` commands, or directly from the terminal.

### 5.1 `collect-progress.js`

Walks the courses directory, parses all `COURSE.md` files, extracts progress state including git timestamps, and outputs structured JSON.

```javascript
#!/usr/bin/env node
// scripts/collect-progress.js
// Usage: node scripts/collect-progress.js [--course <slug>] [--output json|text]

const fs = require('fs');
const path = require('path');
const { parseCourse } = require('./utils/parse-course');
const { getCompletionTimestamp } = require('./utils/git-utils');

const COURSES_DIR = path.join(__dirname, '..', 'courses');

async function collectProgress(courseSlug = null) {
  const results = [];

  // Walk curated and custom course directories
  const courseDirs = ['curated', 'custom'];

  for (const dir of courseDirs) {
    const dirPath = path.join(COURSES_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const courses = fs
      .readdirSync(dirPath, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const courseName of courses) {
      if (courseSlug && courseName !== courseSlug) continue;

      const courseMdPath = path.join(dirPath, courseName, 'COURSE.md');
      if (!fs.existsSync(courseMdPath)) continue;

      const courseData = parseCourse(courseMdPath);

      // Enrich with git timestamps
      for (const module of courseData.modules) {
        for (const assignment of module.assignments) {
          if (assignment.completed) {
            assignment.completedDate = await getCompletionTimestamp(courseMdPath, assignment.title);
          }
        }
      }

      results.push(courseData);
    }
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
      course.modules.forEach((mod) => {
        console.log(`\n   ${mod.name}`);
        mod.assignments.forEach((a) => {
          const tick = a.completed ? '✅' : '⬜';
          const date = a.completedDate ? ` — completed ${a.completedDate}` : '';
          console.log(`     ${tick} ${a.title}${date}`);
        });
      });
    });
  }
});

module.exports = { collectProgress };
```

### 5.2 `generate-report.js`

Calls `collect-progress.js`, then generates a formatted markdown report and commits it to `/progress`.

```javascript
#!/usr/bin/env node
// scripts/generate-report.js
// Usage: node scripts/generate-report.js [--course <slug>] [--learner <name>]
//   AI agents: invoke this when a module is completed or learner requests a report.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { collectProgress } = require('./collect-progress');
const { parseCourse } = require('./utils/parse-course');

const PROGRESS_DIR = path.join(__dirname, '..', 'progress');

function formatDate(date = new Date()) {
  return date.toISOString().slice(0, 10).replace(/-/g, '');
}

function formatDateTime(date = new Date()) {
  return date.toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
}

async function generateReport({ courseSlug, learnerName, periodDays = 7 }) {
  const allProgress = await collectProgress(courseSlug);

  if (allProgress.length === 0) {
    console.error(`No course found with slug: ${courseSlug}`);
    process.exit(1);
  }

  const course = allProgress[0];
  const now = new Date();
  const periodStart = new Date(now - periodDays * 24 * 60 * 60 * 1000);

  // Identify what was completed in the reporting period
  const completedThisPeriod = [];
  for (const module of course.modules) {
    for (const assignment of module.assignments) {
      if (assignment.completed && assignment.completedDate) {
        const completedAt = new Date(assignment.completedDate);
        if (completedAt >= periodStart) {
          completedThisPeriod.push({
            module: module.name,
            ...assignment,
          });
        }
      }
    }
  }

  // Load reasoning review prompts from COURSE.md
  const courseMdPath = findCourseMd(courseSlug);
  const reasoningPrompts = extractReasoningPrompts(courseMdPath, completedThisPeriod);

  // Build report markdown
  const reportDate = formatDate(now);
  const reportContent =
    `# Upstack Progress Report
**Learner:** ${learnerName || 'Not specified — add --learner "Your Name"'}
**Course:** ${course.title}
**Report Date:** ${formatDateTime(now)}
**Reporting Period:** Last ${periodDays} days

---

## Summary

${generateSummaryNarrative(course, completedThisPeriod, periodDays)}

---

## Completed This Period

${
  completedThisPeriod.length === 0
    ? '_No assignments completed in this period._'
    : completedThisPeriod.map((a) => `- [x] **${a.title}** — ${a.module}\n` + `  Completed: ${a.completedDate}`).join('\n\n')
}

---

## Overall Course Progress

**${course.completionPercent}% complete** ` +
    `(${course.completedAssignments} of ${course.totalAssignments} assignments)

${course.modules
  .map((mod) => {
    const modCompleted = mod.assignments.filter((a) => a.completed).length;
    const modTotal = mod.assignments.length;
    const pct = Math.round((modCompleted / modTotal) * 100);
    return (
      `**${mod.name}** — ${pct}% (${modCompleted}/${modTotal})\n` +
      mod.assignments.map((a) => `  ${a.completed ? '- [x]' : '- [ ]'} ${a.title}`).join('\n')
    );
  })
  .join('\n\n')}

---

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these questions in your next
> 1-on-1 to probe for genuine understanding beyond completion state.
> Do not accept "yes I know it" — ask them to explain, to give an
> example, to identify where the concept breaks down.

${reasoningPrompts.length === 0 ? '_No new assignments to review this period._' : reasoningPrompts.join('\n\n')}

---

## Recommended Next Steps

${generateNextSteps(course)}

---

_Generated by Upstack on ${formatDateTime(now)}_
_Repository: run \`git log progress/\` to see full report history_
`;

  // Write report to /progress directory
  if (!fs.existsSync(PROGRESS_DIR)) {
    fs.mkdirSync(PROGRESS_DIR, { recursive: true });
  }

  const reportFilename = `${courseSlug}-report-${reportDate}.md`;
  const reportPath = path.join(PROGRESS_DIR, reportFilename);
  fs.writeFileSync(reportPath, reportContent);

  // Commit the report
  try {
    execSync(`git add progress/${reportFilename}`, { cwd: path.join(__dirname, '..') });
    execSync(`git commit -m "progress: ${courseSlug} report ${reportDate}"`, { cwd: path.join(__dirname, '..') });
    console.log(`✅ Report committed: progress/${reportFilename}`);
  } catch (e) {
    console.log(`⚠️  Report written to progress/${reportFilename}`);
    console.log('   (git commit failed — commit manually if needed)');
  }

  return { reportPath, reportFilename, reportContent };
}

function generateSummaryNarrative(course, completedThisPeriod, periodDays) {
  if (completedThisPeriod.length === 0) {
    return (
      `No assignments were completed in the last ${periodDays} days. ` +
      `Overall course progress is at ${course.completionPercent}%.`
    );
  }
  const names = completedThisPeriod.map((a) => a.title).join(', ');
  return (
    `${completedThisPeriod.length} assignment(s) completed this period: ` +
    `${names}. Overall course progress is now ${course.completionPercent}% ` +
    `(${course.completedAssignments} of ${course.totalAssignments} assignments).`
  );
}

function generateNextSteps(course) {
  const nextAssignments = [];
  for (const module of course.modules) {
    for (const assignment of module.assignments) {
      if (!assignment.completed) {
        nextAssignments.push(`- **${assignment.title}** (${module.name})`);
        if (nextAssignments.length >= 2) break;
      }
    }
    if (nextAssignments.length >= 2) break;
  }
  return nextAssignments.length > 0
    ? nextAssignments.join('\n')
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
  const coursesDir = path.join(__dirname, '..', 'courses');
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
  console.error('Usage: node scripts/generate-report.js --course <slug> ' + '[--learner "Name"] [--days 7]');
  process.exit(1);
}

generateReport({ courseSlug, learnerName, periodDays });

module.exports = { generateReport };
```

### 5.3 `send-report.js`

Opens the user's default email client with the report pre-populated, or sends via SMTP if configured.

```javascript
#!/usr/bin/env node
// scripts/send-report.js
// Usage: node scripts/send-report.js --report <path> --to <email>[,<email>]
//   Or:  node scripts/send-report.js --course <slug> --to <email> --generate

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
  console.error('Usage: node scripts/send-report.js --report <path> --to <email>[,<email>]');
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

Runs at `npm start` time, walks all course and bootcamp directories, and writes `web/src/data/catalogue.json`.

```javascript
#!/usr/bin/env node
// scripts/generate-catalogue.js
// Runs automatically before npm start. Generates web/src/data/catalogue.json

const fs = require('fs');
const path = require('path');
const { parseCourse } = require('./utils/parse-course');
const { parseBootcamp } = require('./utils/parse-bootcamp');

const COURSES_DIR = path.join(__dirname, '..', 'courses');
const BOOTCAMPS_DIR = path.join(__dirname, '..', 'bootcamps');
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

---

## 6. AI Tool Integration

### 6.1 The Reporting Protocol Section of TUTOR-CONTRACT.md

The base `TUTOR-CONTRACT.md` in `/meta` includes a reporting protocol section that instructs the AI how and when to use the progress scripts:

```markdown
## Reporting Protocol

### Tools Available

You have access to the following scripts in the /scripts directory.
Invoke them via your bash/terminal tool when the triggers below fire.

| Script              | Purpose                           | Invocation                                                         |
| ------------------- | --------------------------------- | ------------------------------------------------------------------ |
| collect-progress.js | Read current progress state       | `node scripts/collect-progress.js --course <slug>`                 |
| generate-report.js  | Generate + commit progress report | `node scripts/generate-report.js --course <slug> --learner "Name"` |
| send-report.js      | Email report to coordinator       | `node scripts/send-report.js --report <path> --to <email>`         |

### Trigger Conditions

Generate a progress report automatically when:

1. The learner completes and checks off a full module
   (all assignments in a module marked [x])
2. The learner explicitly requests: "generate my progress report",
   "send my progress", "report my progress"
3. At the start of a new session, if the last report is more than
   7 days old and progress has been made since

### Workflow When Triggered

1. Run `collect-progress.js` to get current state
2. Inform the learner: "You've completed [X]. I'll generate a
   progress report now."
3. Ask: "Who should I send this to? Please provide email address(es)."
   (If learner says "just save it", skip sending)
4. Run `generate-report.js` — this commits the report to /progress
5. If sending: run `send-report.js` with the provided addresses
6. Confirm: "Report saved to progress/ and sent to [addresses]."

### Privacy Rules

- Never store email addresses anywhere
- Always ask for recipient addresses at send time
- Never send without explicit learner confirmation
- The learner controls all outbound communication
```

### 6.2 Claude Code Configuration

For Claude Code users, the tutor contract is loaded as a `CLAUDE.md` file at the repository root — Claude Code reads this automatically at session start:

```markdown
# CLAUDE.md — Upstack Tutor Configuration

This repository uses the Upstack learning framework.
Load the full tutor contract before beginning any session:

@meta/TUTOR-CONTRACT.md

Also load the learner context for the active course:

@courses/curated/learning-go/COURSE.md

You have bash tool access. Use the scripts in /scripts as defined
in the Reporting Protocol section of the tutor contract.
```

### 6.3 Cursor / VS Code Configuration

A `.cursorrules` file at the repository root provides the same configuration for Cursor users:

```
You are an Upstack learning tutor for this repository.

Your configuration is defined in meta/TUTOR-CONTRACT.md.
Read it completely before your first response.

The active course context is in courses/curated/learning-go/COURSE.md.
Read the Learner Context section to calibrate your guidance level.

You have terminal access. Use /scripts for progress reporting
as defined in the Reporting Protocol.
```

---

## 7. Local Web Application

### 7.1 Setup and Launch

```json
// package.json (root)
{
  "name": "upstack",
  "version": "1.0.0",
  "scripts": {
    "start": "node scripts/generate-catalogue.js && cd web && npm start",
    "build": "node scripts/generate-catalogue.js && cd web && npm run build",
    "catalogue": "node scripts/generate-catalogue.js",
    "progress": "node scripts/collect-progress.js --output text",
    "report": "node scripts/generate-report.js"
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
                <code>cat meta/TUTOR-CONTRACT.md</code>
              </li>
              <li>Start your AI session, paste the contract first</li>
              <li>Paste your learner context from COURSE.md</li>
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
        Reports are version-controlled markdown files in <code>/progress</code>. View them in your editor, or run:
      </p>
      <code className="code-block">ls progress/{courseSlug}-report-*.md</code>
      <p>To generate a new report:</p>
      <code className="code-block">npm run report -- --course {courseSlug} --learner "Your Name"</code>
      <p>To send the latest report:</p>
      <code className="code-block">
        node scripts/send-report.js \<br />
        &nbsp;&nbsp;--report progress/{courseSlug}-report-YYYYMMDD.md \<br />
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

- [x] **Assignment 1: HostManager** — Module 1: Core Language
      Completed: 2026-02-07T14:23:00Z

- [x] **Assignment 2: Feed Catcher** — Module 1: Core Language
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

- **Assignment 3: Resilience Layer** (Module 2: Resilience)

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
  - slug: 'learning-go'
    required: true
    order: 1
    unlock-after: null
    milestone: 'Language Foundations'

  - slug: 'learning-design-patterns'
    required: true
    order: 2
    unlock-after: 'learning-go'
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
cd web && npm install && cd ..

# 4. Start the web app
npm start
# Opens http://localhost:3000 — browse the catalogue

# 5. Start the featured Go course
#    Open courses/curated/learning-go/COURSE.md
#    Fill in the Learner Context section with YOUR background
#    Open Claude Code / Cursor in this repository
#    The tutor contract loads automatically (CLAUDE.md / .cursorrules)
#    Begin Assignment 1

# 6. Track progress
#    When you complete an assignment, check it off in COURSE.md
#    git add courses/curated/learning-go/COURSE.md
#    git commit -m "progress: complete assignment 1 hostmanager"
#    git push  ← your progress is now on your GitHub
```

### 10.2 Organisational Setup

```bash
# L&D coordinator setup
# 1. Fork upstack into your ORG GitHub account
#    github.com/upstack/upstack → Fork → your-org/upstack

# 2. Create a bootcamp definition
cp -r bootcamps/curated/template bootcamps/custom/se-fundamentals
# Edit bootcamps/custom/se-fundamentals/BOOTCAMP.md

# 3. Share with interns
#    Tell interns to fork YOUR-ORG/upstack (not upstack/upstack)
#    This ensures they get your bootcamp and any org customisations

# 4. Interns set up reporting
#    They add coordinator email to their .env (optional, or enter at send time)
#    echo "COORDINATOR_EMAIL=manager@yourorg.com" > .env
#    Reports are sent weekly by the AI tutor or manually via:
node scripts/send-report.js \
  --report progress/learning-go-report-YYYYMMDD.md \
  --to manager@yourorg.com
```

---

## 11. Updated Concept Paper Amendments

The following sections of the original Concept Paper v1.0 are superseded by this specification:

**Section 4.2 (Three Core Documents)** — expanded to include the progress tracking model and the COURSE.md schema as a fourth core artefact.

**Section 6 (Repository Structure)** — superseded by Section 2 of this spec. The directory tree is substantially expanded to include `/scripts`, `/web`, `/bootcamps`, and `/progress`.

**Section 7 (Getting Started)** — superseded by Section 10 of this spec with concrete terminal commands.

**New additions not in original paper:**

- Product component architecture (Section 1)
- COURSE.md data model and parsing rules (Section 3)
- Progress tracking via git log (Section 4)
- Progress scripts with full source (Section 5)
- AI tool integration — Claude Code, Cursor, plain chat (Section 6)
- React web application with component architecture (Section 7)
- Report generation, format, and delivery (Section 8)
- Bootcamp / learning path model (Section 9)

The Concept Paper v1.0 remains valid as the theoretical and philosophical foundation. This specification is its technical complement.

---

_Technical Specification v1.0 — 11 February 2026._
_Ishan De Silva._
_Upstack — Knowledge is a commodity. This is how you build insight._

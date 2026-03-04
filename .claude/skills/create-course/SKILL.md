---
name: create-course
description: >
  Scaffold a new course directory from the COURSE.md schema. Creates
  the directory structure, populates COURSE.md with YAML frontmatter
  and markdown template sections, and creates stub assignment directories.
  Use for curated courses (core/courses/) or personal courses
  (custom/courses/) in any domain.
metadata:
  version: '1.0'
---

## Purpose

This skill scaffolds a new course directory with a properly structured
COURSE.md. It works for both curated courses (`core/courses/` — community-
contributed, upstream-managed) and personal courses (`custom/courses/` —
user-owned, never upstreamed). The output is a ready-to-edit COURSE.md
with structure in place — the author fills in the details, then learners
use `/start-course` to begin.

Upstack is domain-agnostic. The course being created could teach Go
programming, management accounting, network administration, project
management, or anything else that can be taught through productive
struggle.

---

## Before You Start

Read `references/COURSE-SCHEMA.md` — the full COURSE.md schema with
YAML frontmatter fields, markdown body structure, and formatting rules.

---

## Procedure

### Step 1 — Gather course details

Ask the author for the following. Suggest sensible defaults where
possible (e.g., derive slug from title).

1. **Course location** — "Is this a curated course for the community
   (`core/courses/`) or a personal course (`custom/courses/`)?"
   - **Core:** upstream-managed, community-contributed, reviewed.
     Use for featured courses and catalogue content.
   - **Custom:** user-owned, stays in the learner's fork, never
     upstreamed. Use for personal learning goals.
2. **Course title** — "What is this course called?"
3. **Slug** — suggest a kebab-case slug from the title. Confirm with
   the author.
4. **Domain** — "What domain does this course belong to?" Offer:
   - languages
   - system-design
   - architecture
   - engineering-practices
   - soft-skills
   - domain-knowledge
5. **Target Dreyfus level** — "Who is this course designed for?" Offer:
   - **Novice** — no prior exposure to this subject
   - **Beginner** — some exposure, can follow instructions
   - **Competent** — can work independently on routine tasks
   - **Proficient** — strong working knowledge, sees the big picture
   - **Expert** — deep expertise, learning nuance and edge cases
6. **Target audience** — "Describe the ideal learner in 1–2 sentences.
   What background and prior knowledge should they have?"
7. **Modules and assignments** — "How many modules? How many assignments
   per module? Give me a brief title for each assignment."
8. **Prerequisites** — "Does this course assume prior courses or
   knowledge? If none, that's fine."

Move through the questions conversationally. If the author has a clear
vision, this can be quick. If they're exploring, help them think through
the structure.

### Step 2 — Create directory structure

Create the course directory under the chosen location
(`core/courses/` or `custom/courses/`):

```
<location>/<slug>/
├── COURSE.md
├── docs/
│   └── .gitkeep
└── assignments/
    ├── 01-<name>/
    │   └── .gitkeep
    └── 02-<name>/
        └── .gitkeep
```

Number assignments sequentially across the course (not per module).
Derive directory names from assignment titles in kebab-case.

### Step 3 — Generate COURSE.md

Populate using the schema from `references/COURSE-SCHEMA.md`:

- **YAML frontmatter** — fill all required fields from gathered inputs.
  Set `created` and `updated` to today's date. Set `author` from
  `profile/PROFILE.md` if it exists, otherwise ask.
- **Course description** — write a brief summary from what the author
  described. The author will refine it.
- **What You Will Learn / Learning Objectives** — generate placeholders
  based on the assignment titles. Mark them as TODO for the author to
  refine.
- **Course Structure** — create module headings, assignment headings,
  and topic placeholders (`- [ ] Topic — TODO: describe`).
- **Reasoning Review Prompts** — add placeholder prompts per assignment.
  These should be refined by the author before the course is used.
- **Learning Log** — standard section pointing to docs/ and progress/.

### Step 4 — Confirm

Show the author a summary:
- Course title and slug
- Directory structure created
- Number of modules, assignments, and placeholder topics

Note that COURSE.md is a scaffold — the author should edit it to fill
in topic details, learning objectives, and reasoning review prompts
before running `/start-course`.

### Step 5 — Commit

```
git add <location>/<slug> && git commit -m "course: scaffold <slug>"
```

---

## Authoring Guidelines

- **Assignments are projects, not exercises.** Each assignment should
  build something meaningful — a system, a workflow, a model. "Build a
  REST API client" is an assignment. "Write a for loop" is not.
- **Topics are learnable concepts, not task steps.** "Understand
  goroutine scheduling" or "Master double-entry bookkeeping" are topics.
  "Create a file" or "Run the tests" are tasks.
- **Reasoning review prompts test understanding, not recall.** "Explain
  why you chose this approach over the alternative" — not "What function
  did you use?"
- **Domain-agnostic language in the schema.** The COURSE.md structure
  works for any domain. Don't assume the course is about programming.

---

## Reference

- COURSE.md schema and field reference: `references/COURSE-SCHEMA.md`
- Tech spec §3: full schema specification with parsing rules

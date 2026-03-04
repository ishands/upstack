# COURSE.md Schema

This is the schema that the `create-course` skill uses to scaffold a new
course. Every Upstack course is defined by a `COURSE.md` file at the root
of its directory.

**Key principle:** `COURSE.md` is the curriculum definition. Learners
never edit it. All progress and completion state lives in
`progress/<slug>/journal.md`. This separation guarantees zero merge
conflicts when learners pull upstream course updates.

---

## Directory Structure

Each course lives in its own directory under `core/courses/` (upstream)
or `custom/courses/` (user-owned):

```
<slug>/
├── COURSE.md           # Course definition (this schema)
├── docs/               # Course documentation, primers, tutorials
│   └── .gitkeep
└── assignments/        # One subdirectory per assignment
    ├── 01-<name>/      # Numbered for sequencing
    │   └── .gitkeep
    └── 02-<name>/
        └── .gitkeep
```

---

## YAML Frontmatter

Machine-readable metadata at the top of COURSE.md:

```yaml
---
# Required fields
title: 'Course Title'
slug: 'course-slug'                # kebab-case, used as directory name
version: '1.0'
author: 'Author Name'
created: 'YYYY-MM-DD'
updated: 'YYYY-MM-DD'

# Categorisation
domain: 'languages'                # languages | system-design | architecture
                                   # engineering-practices | soft-skills | domain-knowledge
tags:
  - tag1
  - tag2

# Target audience
level: 'competent'                 # Dreyfus level: novice | beginner | competent | proficient | expert
target-audience: >
  Describe the target learner. Be specific about required background,
  experience level, and what prior knowledge is assumed.
prerequisites:
  - 'Prerequisite 1'
  - 'Prerequisite 2'

# Upstack configuration
ai-tools:                          # Tested with these tools
  - 'claude-code'
tutor-contract: 'core/meta/TUTOR-CONTRACT.md'

# Display (optional)
featured: false
thumbnail: 'docs/thumbnail.png'
estimated-hours: 0
---
```

### Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Human-readable course title |
| `slug` | Yes | Kebab-case identifier, matches directory name |
| `version` | Yes | Semantic version |
| `author` | Yes | Course author name |
| `created` | Yes | Creation date (YYYY-MM-DD) |
| `updated` | Yes | Last update date (YYYY-MM-DD) |
| `domain` | Yes | One of: languages, system-design, architecture, engineering-practices, soft-skills, domain-knowledge |
| `level` | Yes | Target Dreyfus level: novice, beginner, competent, proficient, expert |
| `target-audience` | Yes | Description of who this course is for |
| `tags` | No | Searchable tags for catalogue |
| `prerequisites` | No | Prior courses or knowledge required |
| `ai-tools` | No | AI tools the course has been tested with |
| `tutor-contract` | No | Path to tutor contract (defaults to core/meta/TUTOR-CONTRACT.md) |
| `featured` | No | Show in catalogue featured section |
| `thumbnail` | No | Path to course thumbnail image |
| `estimated-hours` | No | Estimated completion time |

---

## Markdown Body

The body follows the frontmatter and contains human-readable course content.

### Required Sections

```markdown
# Course Title

A concise description of the course — what you will build/learn and why
it matters to the target learner.

## What You Will Learn

A short paragraph summarising the learning outcomes. What capability will
the learner have at the end that they did not have at the start?

## Learning Objectives

- Objective 1
- Objective 2
- Objective 3

## Course Structure

### Module 1: Module Name

Brief description of what this module covers and why it is sequenced first.

#### Assignment 1: Title

Brief description of what this assignment builds and why.

- [ ] Topic 1 — brief description
- [ ] Topic 2 — brief description
- [ ] Topic 3 — brief description

#### Assignment 2: Title

Brief description.

- [ ] Topic 1 — brief description
- [ ] Topic 2 — brief description

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these in 1-on-1s to probe
> for genuine understanding beyond completion state.
> Do not accept "yes I know it" — ask them to explain, to give an
> example, to identify where the concept breaks down.

**After Assignment 1:**

- Question probing conceptual understanding?
- Question probing design decisions?
- Question probing edge cases or failure modes?

**After Assignment 2:**

- Question probing conceptual understanding?
- Question probing trade-offs or alternatives?

## Learning Log

See `docs/TUTORIAL.md` for the polished reference record of this course —
clean examples and distilled understanding accumulated during the course.

See `progress/<slug>/journal.md` for the living learning journal —
raw mistakes, corrections, and aha moments preserved in full.
```

---

## Structure Rules

These patterns are used by `parse-course.js` and must be followed exactly:

- **Modules:** `### Module N: Name` (H3 heading)
- **Assignments:** `#### Assignment N: Title` (H4 heading, nested under a module)
- **Topics:** `- [ ] Topic — description` (checkbox list item under an assignment)
- **Assignment numbering:** Sequential within the course (not within each module)
- **Assignment directories:** Named `NN-kebab-name/` matching the assignment title

Topics are the learnable concepts — what the learner will understand, not
task steps they will complete. "Understand goroutine scheduling" is a topic.
"Write a function that spawns workers" is a task.

# LEARNING-PATH.md Schema

Every Upstack learning path is defined by a `LEARNING-PATH.md` file at the
root of its directory under `core/learning-paths/<slug>/` (upstream) or
`custom/learning-paths/<slug>/` (user-owned).

**Key principle:** `LEARNING-PATH.md` is the curriculum definition for the
path. It defines the course sequence, project options, integration tasks, and
capstone. Learner state (project choice, position, integration task completion)
lives in `progress/<slug>/learner-context.md`. These two files never conflict.

---

## Directory Structure

A learning path lives at one of these locations in the repository:

```
core/learning-paths/<path-slug>/LEARNING-PATH.md      # upstream path
custom/learning-paths/<path-slug>/LEARNING-PATH.md    # user-owned path
```

Learner state for a given path lives at:

```
progress/<path-slug>/learner-context.md
progress/<path-slug>/integration-journal.md
```

Unlike courses, learning paths have no `references/` subdirectory — all
content is self-contained in `LEARNING-PATH.md`. The path definition is
read-only for learners; their state lives entirely in `progress/`.

### Slug uniqueness across courses and paths

`progress/<slug>/` is a shared namespace: courses write to
`progress/<course-slug>/journal.md` and paths write to
`progress/<path-slug>/learner-context.md`. **A path slug must not collide
with any course slug**, otherwise the two would write into the same
directory and conflict.

This is a contributor convention enforced by review, not by code.
When adding a new path or course, check that its slug does not already
exist under `core/courses/`, `custom/courses/`, `core/learning-paths/`,
or `custom/learning-paths/`.

---

## YAML Frontmatter

Machine-readable metadata at the top of LEARNING-PATH.md:

```yaml
---
# Required fields
title: 'Path Title'
slug: 'path-slug'                  # kebab-case, matches directory name
version: '1.0'
author: 'Author Name'
created: 'YYYY-MM-DD'
updated: 'YYYY-MM-DD'

# Categorisation
domain: 'software-engineering'     # same domain values as COURSE.md
level: 'novice'                    # Dreyfus level of the path as a whole

# Target audience
target-audience: >
  Describe the target learner. Be specific about required background
  and what prior knowledge is assumed.
estimated-weeks: 16

# Course sequence
courses:
  - slug: 'course-slug'
    title: 'Course Title'              # human-readable, authoritative for path display
    order: 1
    required: true
    integration-task-summary: 'One-line summary of the integration task'
  - slug: 'another-course'
    title: 'Another Course Title'
    order: 2
    required: true
    integration-task-summary: 'One-line summary of the integration task'

# Project options (machine-readable identifiers — full briefs in markdown body)
project-options:
  - slug: 'project-slug'
    title: 'Human-readable project title'
  - slug: 'another-project'
    title: 'Another project title'

# Capstone
capstone-title: 'Short description for catalogue display'

# Upstack configuration
ai-tools:
  - 'claude-code'
tutor-contract: 'core/meta/TUTOR-CONTRACT.md'

# Display (optional)
featured: false
estimated-weeks: 0
---
```

### Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Human-readable path title |
| `slug` | Yes | Kebab-case identifier, matches directory name |
| `version` | Yes | Semantic version |
| `author` | Yes | Path author name |
| `created` | Yes | Creation date (YYYY-MM-DD) |
| `updated` | Yes | Last update date (YYYY-MM-DD) |
| `domain` | Yes | Same values as COURSE.md domain field |
| `level` | Yes | Overall Dreyfus level of the path |
| `target-audience` | Yes | Description of who this path is for |
| `estimated-weeks` | Yes | Estimated completion time in weeks |
| `courses` | Yes | Ordered list of courses in the path |
| `courses[].slug` | Yes | Must match an existing course directory |
| `courses[].title` | Yes | Human-readable course title used in path display (roadmap, orient table). Authoritative — skill does not read each course's COURSE.md to derive it. Should match the title in the course's COURSE.md, but path author owns it |
| `courses[].order` | Yes | Integer sequence position (1-based) |
| `courses[].required` | Yes | Whether the course is required or optional |
| `courses[].integration-task-summary` | Yes | One-line summary used in the learner's checklist and roadmap display |
| `project-options` | Yes | List of project choices — slug and title only |
| `project-options[].slug` | Yes | Kebab-case identifier used in learner context |
| `project-options[].title` | Yes | Full human-readable project name |
| `capstone-title` | Yes | Short capstone description for catalogue |
| `ai-tools` | No | AI tools the path has been tested with |
| `tutor-contract` | No | Path to tutor contract |
| `featured` | No | Show in catalogue featured section |

---

## Markdown Body

The body follows the frontmatter and contains human-readable path content.

### Required Sections

```markdown
# Path Title

One paragraph — what this learning path is and what the learner builds toward.

## Learning Path Narrative

Why the courses are sequenced in this order. What each course contributes to
the project and how it enables the next course. The sequence rationale is
important: a learner who understands why the order is what it is will trust
it and follow it.

## Project Options

One subsection per project option. Each subsection must include:
- What the tool does (one sentence)
- Core workflow (brief terminal example or step sequence)
- Domain entities (the 4–5 key classes the learner will design)
- Key design decisions the learner will face
- Why it is a good vehicle for this path's learning objectives

### [Project Title]

[Full project brief as described above]

## Integration Tasks

One subsection per course in sequence order. Each subsection must include
one task variant per project option, labelled with the project title in bold.

The task for each course+project combination must:
- Be specific to the project's domain and entities
- Apply the course's core skill to the project
- Produce a concrete artefact (code, document, or both)
- State clearly where the output goes (filename, commit message)

### After: [course-slug]

**[Project Title]:**
[Task description — specific, actionable, produces a named artefact]

**[Project Title]:**
[Task description]

## Capstone

What the final assembly milestone requires. Must reference the integration
task outputs by name so the learner can see exactly what components connect.
Include: what to build, what to connect, what done looks like.

## For L&D Coordinators (optional)

Guidance for organisational bootcamp use: duration, progress tracking,
discussion prompts, reporting cadence.
```

---

## Structure Rules

- **Slug uniqueness:** The path slug must not collide with any course
  slug under `core/courses/` or `custom/courses/`, since they share the
  `progress/<slug>/` namespace.
- **Course sequence:** `courses` in YAML must be in order. `order` field
  must be sequential integers starting at 1.
- **Project option slugs:** Must be stable — they are stored in
  `progress/<path-slug>/learner-context.md` at enrolment. Changing a slug
  mid-path breaks learner context files.
- **Integration task sections:** Heading must exactly match
  `### After: <course-slug>` for consistent parsing. The course slug must
  appear in the `courses` YAML list.
- **Project labels in integration tasks:** Bold project title as a paragraph
  opener (`**Personal Library Catalogue:**`), followed by the task on a new line.
- **Integration task artefacts:** Each task must name the file(s) it produces
  and the commit message pattern to follow.

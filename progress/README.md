# Progress

This directory holds your learning progress — one subdirectory per
active/completed course, named by course slug.

**This is learner-owned.** Everything here lives in your fork and is
never upstreamed. Upstream course updates never conflict with your
progress.

## Structure

```
progress/
  learning-go/
    learner-context.md   # Your calibration for this course
    journal.md           # Living learning journal (source of truth)
    report-20260207.md   # Generated progress reports (timestamped)
    report-20260214.md
  another-course/
    learner-context.md
    journal.md
```

## How Files Are Created

| File                 | Created by              | Template                             |
| -------------------- | ----------------------- | ------------------------------------ |
| `learner-context.md` | `start-course` skill    | `core/meta/LEARNER-CONTEXT.md`       |
| `journal.md`         | `start-course` skill    | `core/meta/JOURNAL-TEMPLATE.md`      |
| `report-YYYYMMDD.md` | `generate-report` skill | Generated from journal + course data |

You don't create these files manually. The skills handle it.

## What Lives Here vs. Elsewhere

| Data                      | Location                             | Why                                   |
| ------------------------- | ------------------------------------ | ------------------------------------- |
| Who you are (all courses) | `profile/PROFILE.md`                 | Stable identity, changes slowly       |
| Who you are (this course) | `progress/<slug>/learner-context.md` | Per-course calibration                |
| What you've done          | `progress/<slug>/journal.md`         | Changes every session                 |
| Course definition         | `core/courses/` or `custom/courses/` | Upstream-managed or custom curriculum |

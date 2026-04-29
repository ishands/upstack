<!--
  Skeleton for progress/<path-slug>/learner-context.md.
  The start-learning-path skill generates the concrete file by:
  - Substituting placeholders ([Path Title], [Learner Name], [YYYY-MM-DD],
    [project-slug], [Project Title], [first-course-slug], [total-course-count])
  - Generating one row in the Integration Task Checklist per entry in the
    path's `courses` YAML list (in order), using courses[].order,
    courses[].slug, and courses[].integration-task-summary
  - Appending a final capstone row using `capstone-title` from YAML
-->

# [Path Title] — Learner Context

**Learner:** [Learner Name]
**Enrolled:** [YYYY-MM-DD]
**Project:** [project-slug] — [Project Title]
**Current position:** [first-course-slug] (course 1 of [total-course-count])

---

## Integration Task Checklist

| # | Course | Integration Task | Done |
|---|--------|-----------------|------|
<!-- One row per course in path's `courses` YAML list, in order. Example: -->
| 1 | [course-slug] | [integration-task-summary] | [ ] |
<!-- Final row — capstone, using `capstone-title` from path YAML: -->
| — | Capstone | [capstone-title] | [ ] |

# Upstack Skills

Agent Skills for Upstack, following the [agentskills.io](https://agentskills.io) open standard.

## Structure

Each skill is a self-contained subdirectory named `{verb}-{object}`,
organised into `core/` (upstream-managed) and `custom/` (user-owned):

```
.claude/skills/
├── core/                    # Upstream skills — don't modify
│   ├── configure-profile/
│   │   └── SKILL.md
│   ├── start-course/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── ...
│   └── check-progress/
│       ├── SKILL.md
│       └── scripts/
│           └── collect-progress.js
└── custom/                  # Your skills — never upstreamed
    └── .gitkeep
```

- **`SKILL.md`** (required) — skill definition with YAML frontmatter and instructions
- **`scripts/`** (optional) — Node.js utilities specific to this skill
- **`references/`** (optional) — schemas, templates, or reference material

## SKILL.md Frontmatter

```yaml
---
name: start-course
description: >
  Brief description of what the skill does and when to use it.
metadata:
  version: '1.0'
---
```

## Naming Convention

| Verb | Action type | Example |
|------|-------------|---------|
| `configure-` | Setup / update config | `configure-profile` |
| `create-` | Scaffold new artefact | `create-course` |
| `start-` | Begin lifecycle | `start-course` |
| `complete-` | Finish lifecycle | `complete-assignment` |
| `check-` | Read-only inspection | `check-progress` |
| `generate-` | AI-driven creation | `generate-report` |
| `send-` | Deliver externally | `send-report` |

## Shared Utilities

Common parsing logic lives in `scripts/utils/` at the repo root, imported by skill scripts.

See the [tech spec](../../docs/UPSTACK-TECH-SPEC.md) Section 6 for full design details.

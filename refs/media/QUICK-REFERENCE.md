# Upstack — Quick Reference

- **Header:** `Upstack — Quick Reference`
- **Footer:** `Upstack v0.2.0 · github.com/ishands/upstack · Knowledge is a commodity. Upstack is how you build insight.`
- **Format:** A4, single page, portrait, infographic layout if possible

---

## What Is Upstack

Upstack configures AI as a tutor that guides you toward answers
instead of giving them. Your learning struggle — mistakes, corrections,
insights — is recorded in a journal that becomes your proof of learning.

---

## Your Workspace

```
upstack/
├── AGENTS.md                    ← tutor config (loads automatically)
├── AGENTS-CUSTOM.md             ← your customisations
│
├── profile/
│   └── PROFILE.md               ← who you are (all courses)
│
├── progress/
│   └── <course-slug>/
│       ├── journal.md           ← your learning journal
│       └── learner-context.md   ← your background for this course
│
├── core/
│   ├── courses/                 ← community courses
│   └── meta/                    ← tutor contract, principles
│
├── custom/
│   └── courses/                 ← your own courses
│
└── .agents/skills/core/         ← skill definitions
```

---

## The Learning Loop

```
┌──────────────────────────┐
│  /configure-profile      │    one-time setup
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  /start-course           │    creates journal, calibrates tutor
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│                          │◀───────────────────────────────────┐
│  Learn                   │    struggle with the tutor,         │
│                          │    tutor records in journal         │
└────────────┬─────────────┘                                     │
             │                                                   │
             ▼                                                   │
┌──────────────────────────┐                                     │
│  /complete-assignment    │    reasoning review gate —          │
│                          │    explain what and why             │
└────────────┬─────────────┘                                     │
             │                                                   │
             ├──── more assignments? ────────────────────────────┘
             │
             ▼
┌──────────────────────────┐
│  /check-progress         │    anytime — see where you stand
└──────────────────────────┘
```

---

## Key Commands

| Command                | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `/configure-profile`   | Set up your learner profile (first time or update) |
| `/create-course`       | Scaffold a new course in `custom/courses/`         |
| `/start-course`        | Begin a course — journal, context, calibration     |
| `/complete-assignment` | Reasoning review → mark assignment done            |
| `/check-progress`      | Show completion state with timestamps              |

---

## The Tutor

```
┌──────────────────────────────┬──────────────────────────────┐
│          D O E S             │       D O E S   N O T        │
├──────────────────────────────┼──────────────────────────────┤
│ Ask questions that lead you  │ Give answers before you try  │
│ Give the minimum hint needed │ Do the work for you          │
│ Surface your mistakes        │ Silently fix your errors     │
│ Verify you understand why    │ Accept "I understand" alone  │
│ Record your learning journey │ Clean up your struggles      │
│ Calibrate to your level      │ Teach the same way to all    │
└──────────────────────────────┴──────────────────────────────┘
```

If the tutor drifts — call it out. It is designed to self-correct.
Restarting a session resets compliance to its strongest point.

---

## File Ownership

```
┌─ Framework-managed (upstream) ──────────────────────────────┐
│ AGENTS.md · CLAUDE.md · core/ · .agents/skills/core/        │
│ Do not edit — updated by upstream and skills                │
└─────────────────────────────────────────────────────────────┘

┌─ Yours ─────────────────────────────────────────────────────┐
│ profile/ · progress/ · custom/ · .agents/skills/custom/     │
│ AGENTS-CUSTOM.md (below the managed section marker)         │
│ Your data. Never touched by upstream.                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Resuming

Open the repo with your AI tool. The tutor reads your journal and
context and picks up where you left off. No special command needed.

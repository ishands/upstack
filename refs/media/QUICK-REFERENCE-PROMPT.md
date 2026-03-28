# Upstack Quick Reference — Image Generation Prompt

Generate a single-page A4 vertical (portrait) infographic poster for
Upstack individual learners, serving as a quick reference cheat sheet.
The image must strictly adhere to the brand guidelines and content
specified below. Every piece of text, every command, every file path
must match the content sections exactly.

---

## Brand Guidelines (Mandatory)

### Aesthetics

Modern, clean, professional, and slightly technical yet approachable.
Use digital illustration or clean vector art (no photorealism). The
personality is "serious mentor, not a game" — direct, warm, grounded.
The visual should feel like a well-designed notebook — functional,
honest, human — not a corporate training portal or a gamified app.

### Colour Palette (Strict)

| Role       | Hex       | Usage                                         |
| ---------- | --------- | --------------------------------------------- |
| Primary    | `#1B4965` | Headers, section titles, primary elements     |
| Secondary  | `#D4742C` | Commands, highlights, progress, call-to-action |
| Accent     | `#6B4A3D` | Borders, dividers, structural lines           |
| Background | `#FAF8F5` | Page background, panel backgrounds            |
| Text       | `#2C2420` | All body text                                 |

Do not use colours outside this palette. The deep blue `#1B4965`
anchors the design. The warm orange `#D4742C` draws the eye to
commands and key information. The earth brown `#6B4A3D` grounds
structural elements. All text is dark brown `#2C2420` on warm white
`#FAF8F5` — never pure black on pure white.

### Typography

- **Headings:** Clean sans-serif (Inter, Source Sans, or Helvetica)
- **Body:** Same sans-serif family
- **Commands, file paths, directory trees:** Monospace (JetBrains Mono,
  Source Code Pro, or Consolas)
- Font sizes must have a clear hierarchy. Readable line spacing.

### Layout Rules

- Fill the page — adjust shapes, tables, and text to use available
  space. Do not leave large empty areas. Use whitespace for visual
  hierarchy, not as filler.
- No decorative elements — let typography and structure do the work.
- Distinct panels for each section, separated by clear visual borders
  or background transitions. Flow logically from top to bottom.
- The design must work in B&W print — use weight and contrast as the
  primary visual hierarchy, not colour alone.

### Logo / Wordmark

No logo exists. Use **Upstack** (title case, never UPPERCASE) in the
heading font at a heavier weight as the wordmark.

### Negative Constraints

- No complex gradients
- No outdated clip-art style
- No illegible script fonts
- No information overload within a single panel
- No deviation from the text, commands, file structures, or rules
  listed in the content sections below
- No duplicate information blocks — each section must appear exactly
  once on the poster. If two sections cover related content (e.g.,
  the learning loop and key commands both list commands), render each
  in its own panel with its own visual treatment. Do not repeat or
  merge content across panels.

---

## Poster Structure & Content

The poster has the following sections. Render the text in each section
**verbatim** — do not paraphrase, abbreviate, or add words.

---

### Header

- Wordmark: **Upstack** in the primary font, heavy weight
- Subtitle: **Quick Reference Cheat Sheet**
- Version line: `v0.2.0 | github.com/ishands/upstack`
- Tagline: *Knowledge is a commodity. Upstack is how you build insight.*
- Visuals: A subtle upward-arrow or stacking motif that evokes the
  name. Keep it simple — this is a wordmark, not a logo.

---

### What Is Upstack

**Panel text (verbatim):**

> Upstack configures AI as a tutor that guides you toward answers
> instead of giving them. Your learning struggle — mistakes,
> corrections, insights — is recorded in a journal that becomes your
> proof of learning.
>
> Works in your favourite IDE — VS Code, Cursor, and others — with
> any AI coding assistant that reads the AGENTS.md standard.

Visuals: A small illustration of a learner and an AI tutor figure
side by side. A stylised journal icon. Keep minimal.

---

### Your Workspace (Folder Structure)

**Intro text (verbatim):**

> Fork the repo, clone your fork, and open it with your AI tool.
> The tutor configuration loads automatically.

Render as an illustrative folder tree diagram. Use folder icons and
file icons. Colour-code: framework-managed files/folders use a
lock/restricted indicator; user-owned files use a person/edit
indicator. The tree must be rendered **exactly** as follows:

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
└── .claude/skills/core/         ← skill definitions
```

---

### The Learning Loop

Render as a numbered flowchart with icons for each step. The loop
between steps 3 and 4 must be visually clear as a cycle (the learner
repeats Learn → Complete for each assignment). Step 5 sits outside
the main loop (accessible anytime).

**Steps (verbatim text, numbered):**

1. `/configure-profile` — one-time setup
   *(icon: gear/person)*

2. `/start-course` — creates journal, calibrates tutor
   *(icon: rocket/journal)*

3. **Learn** — struggle with the tutor, tutor records in journal
   *(icon: learner + AI partnership, circular/iterative feel)*
   *(arrow loops back from step 4 for next assignment)*

4. `/complete-assignment` — reasoning review gate, explain what and why
   *(icon: checkmark/review gate)*
   *(arrow back to step 3 labelled "more assignments?")*

5. `/check-progress` — anytime, see where you stand
   *(icon: chart/timeline, positioned outside the main loop)*

Commands (`/configure-profile`, `/start-course`, `/complete-assignment`,
`/check-progress`) must be rendered in monospace with the orange
secondary colour `#D4742C`.

---

### Skills (Key Commands)

These are Agent Skills defined per the agentskills.io specification.
Render as a clean table or list with an icon for each command. Each
row must contain the command in monospace and its description.

| Skill                  | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `/configure-profile`   | Set up your learner profile (first time or update) |
| `/create-course`       | Scaffold a new course in `custom/courses/`         |
| `/start-course`        | Begin a course — journal, context, calibration     |
| `/complete-assignment` | Reasoning review → mark assignment done            |
| `/check-progress`      | Show completion state with timestamps              |

---

### The Tutor: Does / Does Not

Render as a two-column comparative panel. Left column (positive) uses
green tick marks. Right column (negative) uses red cross marks. Clear
visual divider between columns.

**DOES:**
- Ask questions that lead you
- Give the minimum hint needed
- Surface your mistakes
- Verify you understand why
- Record your learning journey
- Calibrate to your level

**DOES NOT:**
- Give answers before you try
- Do the work for you
- Silently fix your errors
- Accept "I understand" alone
- Clean up your struggles
- Teach the same way to all

**Below the panel (with an info icon):**
If you notice AI drift, remind the tutor of its contract. Restarting
a session resets compliance to its strongest point.

---

### File Ownership

Render as two clearly separated zones with distinct visual treatment.

**Framework-managed (upstream) — Do Not Edit:**
- `AGENTS.md`
- `CLAUDE.md`
- `core/`
- `.claude/skills/core/`
- Updated by upstream and skills

*(Visual treatment: lock icon, restricted colour — use earth brown
`#6B4A3D` border or background tint)*

**Yours — Edit Freely:**
- `profile/`
- `progress/`
- `custom/`
- `.claude/skills/custom/`
- `AGENTS-CUSTOM.md` (below the managed section marker)
- Your data. Never touched by upstream.

*(Visual treatment: person/edit icon, open colour — use warm orange
`#D4742C` border or background tint)*

---

### Resuming

Small dedicated panel with a continuation arrow or "play" icon.

**Panel text (verbatim):**

> Open the repo with your AI tool. The tutor reads your journal and
> context and picks up where you left off. If automatic resumption
> doesn't happen, use `/start-course` to reload context.

---

### Footer

- Version and link: `Upstack v0.2.0 | github.com/ishands/upstack`
- Tagline: *Knowledge is a commodity. Upstack is how you build insight.*
- Clean, integrated with the page background. Not dominant.

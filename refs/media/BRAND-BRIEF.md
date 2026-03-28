# Upstack — Brand Brief

A visual identity and rendering guide for Upstack media assets.
Use this alongside content files when generating PDFs, slide decks,
or other visual materials.

---

## Identity

- **Name:** Upstack
- **Tagline:** An open-source framework that configures AI as a genuine
  tutor — not an answer machine.
- **Closing line:** _Knowledge is a commodity. Upstack is how you build
  insight._

**Personality:** Serious mentor, not a game. Direct, warm, grounded.
The visual identity should feel like a well-worn notebook — functional,
honest, human — not a corporate training portal or a gamified app.

---

## Colour Palette

| Role       | Name        | Hex       | Usage                                         |
| ---------- | ----------- | --------- | --------------------------------------------- |
| Primary    | Deep blue   | `#1B4965` | Headers, primary elements, brand anchor       |
| Secondary  | Warm orange | `#D4742C` | Highlights, progress, actions, call-to-action |
| Accent     | Earth brown | `#6B4A3D` | Structure, borders, grounding elements        |
| Background | Warm white  | `#FAF8F5` | Page background, content areas                |
| Text       | Dark brown  | `#2C2420` | Body text, readable and warm                  |

**Rationale:** Blue anchors authority and focus. Orange draws the eye
to what matters — actions, progress, key information. Brown grounds
the palette and sets Upstack apart from typical cold-blue tech products.
Dark brown text over warm white is easier on the eyes than pure black
on white, and ties the palette together.

**Constraint:** The palette must work in B&W print. Use weight and
contrast (bold, borders, whitespace) as the primary visual hierarchy,
not colour alone.

---

## Typography

No specific fonts are mandated. When rendering:

- **Headings:** Clean sans-serif (e.g., Inter, Source Sans, Helvetica)
- **Body:** Same sans-serif family as headings
- **Code / commands / trees:** Monospace (e.g., JetBrains Mono,
  Source Code Pro, Consolas)

Prefer readable line spacing. Do not leave excessive whitespace —
adjust layout elements and text to fill the page, using just enough
whitespace to create clear visual hierarchy.

---

## Rendering Notes for PDF Generation

When generating PDFs or slide decks from markdown content files,
paste this brand brief alongside the content file and use a prompt
like:

> Generate an A4 PDF from the content file. Use the brand brief for
> visual direction — colours, typography, layout rules.

**Rules for the AI renderer:**

- The content file is the source of truth for structure and text;
  this brief is the source of truth for visual treatment
- Respect the page/slide count specified in the content file (single
  page, multi-page, or slide deck)
- Warm white background (`#FAF8F5`), not pure white
- Dark brown text (`#2C2420`), not black
- Deep blue (`#1B4965`) for section headers
- Warm orange (`#D4742C`) for emphasis, highlights, key commands
- Earth brown (`#6B4A3D`) for borders, dividers, structural lines
- Monospace for all code, commands, directory trees, and file paths
- No decorative elements — let typography and structure do the work
- Fill the page — adjust shapes, tables, and text to use available
  space rather than leaving large empty areas. Use whitespace for
  hierarchy, not as filler
- Include header and footer as specified in the content file

---

## Logo

No logo exists yet. Use **Upstack** (title case) in the primary font
at a heavier weight as the wordmark. When a logo is created, this
section will be updated.

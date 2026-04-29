---
title: 'Code Quality Fundamentals'
slug: 'code-quality-fundamentals'
version: '1.0'
domain: 'software-engineering'
level: 'beginner'
target-audience: >
  Fresh graduates and early-career developers who can read and write basic
  code but have not yet worked in a shared team codebase. No prior exposure
  to code quality practices, linting, or refactoring required. A working
  development environment in any language with class support is needed for
  the final assignment.
prerequisites:
  - 'Basic programming: variables, functions, loops, and conditionals'
  - 'Recommended: oop-fundamentals or equivalent OOP experience'
tags:
  - code-quality
  - clean-code
  - refactoring
  - code-smells
  - naming
author: 'Upstack'
created: '2026-04-26'
updated: '2026-04-26'
ai-tools:
  - 'claude-code'
tutor-contract: 'core/meta/TUTOR-CONTRACT.md'
featured: true
estimated-hours: 8
---

# Code Quality Fundamentals

Code is written once and read many times. Studies consistently estimate
that developers spend roughly 80% of their time reading code — tracing
logic, understanding intent, tracking down the source of a behaviour —
and about 20% writing it. Every name you choose, every function boundary
you draw, every comment you leave or omit is a decision about the reader's
experience.

Code quality is not about aesthetics. It is about preferring read-time
efficiency over write-time efficiency. The reader who comes after you —
a teammate, a future hire, your future self — pays the cost of every
obscure abbreviation, every tangled conditional, every number without a
name.

This course teaches you to read messy code, name what is wrong with it,
and make targeted improvements. By the end you will have a vocabulary for
code quality that you can apply to any codebase, in any language.

## What You Will Learn

By the end of this course you will be able to read a piece of unfamiliar
code and diagnose its quality problems with precision — not "this is hard
to read" but "this is a long method with an arrow pattern, three magic
numbers, and an inconsistent naming scheme, and here is how to fix each."
You will apply those fixes to your own code and articulate why each change
makes the code easier to work with.

## Learning Objectives

- Explain the purpose of coding conventions and distinguish de-facto from de-jure standards
- Apply intention-revealing naming to variables, functions, and classes, including consistent verb-pair conventions
- Write code that communicates its intent without comments, and identify code that does not
- Recognise eight core code smells, explain what each costs a reader, and apply the appropriate fix where one is straightforward
- Use a linter to surface static analysis issues in a codebase
- Consult Fowler's refactoring catalogue and refactoring.guru when applying targeted fixes

## Course Structure

All four assignments work with the same reference file:
`core/courses/code-quality-fundamentals/references/CODE-QUALITY-VIOLATIONS.md`.
The final assignment applies the same skills to your own code from a prior
project.

**Key references for this course:**

- Martin Fowler, *Refactoring* (2nd ed.) — the authoritative catalogue of
  code smells and refactoring moves
- [refactoring.guru](https://refactoring.guru) — accessible, illustrated
  coverage of smells and refactoring techniques; consult this whenever you
  are applying a fix and want to understand the mechanics
- Your language's official style guide — Oracle Java Code Conventions, PEP 8
  (Python), Google Style Guides, and similar are referenced below

---

### Module 1: Writing Readable Code

Before you can fix problematic code, you need to understand what makes
code readable and why — not as a matter of taste but as a practical
property that affects every future change.

#### Assignment 1: Names That Communicate

Open `core/courses/code-quality-fundamentals/references/CODE-QUALITY-VIOLATIONS.md`. Read Section 3 (Member management)
and Section 1 (Checkout). Your job is to rename everything that obscures
intent, justify each rename, and identify what coding conventions apply
to your chosen language.

> **Note for learners and tutors:** This is a written analysis assignment.
> The learner produces a renamed version of the code and a written
> justification — not a running program.
>
> The verification mechanic: read the renamed code aloud at the call site.
> `checkout(member, book, active_loans, due_date)` communicates. `co(m, b,
> ls, dd)` does not. If a colleague could read the call site and describe
> what the function does without opening the implementation, the names are
> working.
>
> On verb pairs: ask the learner to list the five methods in `Mgr` and
> describe what each does. Then ask: are these names consistent with each
> other? What would a caller expect `fetchMember` to pair with? What does
> `removeMember` pair with — and is `addToSystem` the right counterpart?
>
> Common failure mode: the learner renames single-letter variables but
> leaves abbreviated multi-word names (`nm`, `em`, `ac`) unchanged, or
> fixes naming without addressing inconsistency across the method set.

**Suggested milestones:**

1. **Conventions first** — find the official or de-facto style guide for your chosen language (Java: Oracle Code Conventions; Python: PEP 8; TypeScript: Google TypeScript Style Guide or similar). Note three specific rules that the reference code violates before touching a single name.
2. **De-facto vs de-jure** — identify which conventions in your language are de-jure (formally standardised, like PEP 8 for Python) and which are de-facto (community-adopted without formal mandate, like `camelCase` for JavaScript variables). Understand: conventions are not arbitrary — they exist so that a codebase reads as if it was written by a single developer, regardless of how many people touched it.
3. **Rename the class and its data** — what does `Mgr` manage? What is `self.d`? Give each a name that answers those questions without requiring the reader to look inside.
4. **Rename the methods** — list all five methods. For each: what does it actually do? What is the right verb for this action? Do the five names form a consistent set — do they use the same verb-pair conventions for operations that are conceptually paired (add/remove, get/set, create/delete)?
5. **Rename parameters and locals in Section 1** — `m`, `b`, `ls`, `dd`, `l`, `x`, `em`. For each: what is it? Name it.
6. **Read the call site** — write a single line that calls the renamed checkout function. Read it aloud. Does it communicate what is happening without the reader opening the function?

**Design questions to surface before starting:**

- `fetchMember` and `removeMember` are two methods on the same class. Should the verb that adds a member be `addToSystem`, `addMember`, `insertMember`, or something else? What principle guides the choice?
- `x['nm']` appears in three different places in Section 3. What is `nm`? If you had to grep for every place in the codebase that accesses a member's name, which form is easier to find — `nm` or the full name?
- Your language's style guide specifies brace placement, indentation, and casing. Are these rules de-facto (the community converged on them) or de-jure (a standards body published them)? Does the distinction matter for how strictly you enforce them?

**Topics:**

- [ ] What coding conventions are — agreed rules for style, naming, and structure; not about correctness but about consistency; *Paradigm shift: the instinct is to treat naming and formatting as personal preference. The shift: a codebase that reads as if written by a single developer is easier to navigate than one where each file has a different style — conventions create that consistency.*
- [ ] De-facto vs de-jure conventions — de-jure: formally standardised (PEP 8, Oracle Java Code Conventions); de-facto: community-adopted without formal mandate (common patterns in a language's ecosystem); both have force; understanding which is which explains why conventions vary across languages but converge within them
- [ ] Read-time efficiency over write-time efficiency — 80% of development time is reading code; a name that saves three keystrokes but costs a reader thirty seconds of confusion is a bad trade
- [ ] Intention-revealing names — names that answer "what is this?" without requiring the reader to look at the implementation; applies to variables, parameters, fields, functions, and classes
- [ ] Verb-pair conventions — paired operations should use agreed verb pairs: get/set, add/remove, create/delete, insert/delete; inconsistency across a class's method set creates a hidden cost every caller pays
- [ ] Abbreviations — never abbreviate unless the abbreviation is more universally known than the full form (`url`, `id`, `http` are fine; `mn`, `em`, `dd` are not); the test: would a colleague who has never seen this codebase know what this abbreviation means?

---

#### Assignment 2: Code That Reads Like Prose

Open `core/courses/code-quality-fundamentals/references/CODE-QUALITY-VIOLATIONS.md`. Read Section 1 (Checkout) and Section 4
(Overdue report). Your job is to rewrite each so that every comment becomes
unnecessary — not by deleting the comment, but by making the code explain
itself. Along the way you will encounter a function that does something the
caller would not expect.

> **Note for learners and tutors:** The learner produces a rewritten version
> of the two sections. Comments may be removed only once the code no longer
> needs them. A learner who deletes comments without changing the code has
> misunderstood the exercise.
>
> The `getName` side effect is the sharpest moment in this assignment. Ask:
> what would you expect a function called `getName` to do? Now read what it
> actually does. The increment of `ac` is invisible to the caller — that is
> exactly the problem. Functions named like queries should not mutate state.
>
> On extraction: when a comment says `# find member name`, that is a signal
> that the code beneath it should be a function named `find_member_name` (or
> equivalent). The comment is describing a missing abstraction.
>
> Verify by asking the learner to remove all comments from their rewritten
> version and read it aloud. If any line is still unclear without a comment,
> that line needs more work — better naming or further extraction.

**Suggested milestones:**

1. **Comments as signals** — read every comment in Sections 1 and 4. For each: is it explaining *what* the code does, or *why*? A comment that explains what the code does is a signal that the code should be renamed or extracted until the comment is unnecessary. A comment that explains why (a constraint, a workaround, a non-obvious invariant) is legitimate and should stay.
2. **Extract the arrow** — the checkout function in Section 1 uses deeply nested conditionals. Each condition enforces a guard: member exists, book exists, book is available, loan limit not exceeded. Rewrite the function using early returns: check each condition at the top and return immediately if it fails. The happy path should be flat, not nested. This is the guard clause technique — see [refactoring.guru/replace-nested-conditional-with-guard-clauses](https://refactoring.guru/replace-nested-conditional-with-guard-clauses).
3. **Name the magic numbers in Section 4** — `14`, `0.50`, `25` are all literals with meaning. Extract each to a named constant. The name should make the comment above it redundant.
4. **Extract the `getName` side effect** — `getName` in Section 3 does two things: it looks up a name and it increments an access counter. Split it into two functions. Name each so that its behaviour is fully described by the name alone. Ask: which name communicates clearly? Which would surprise a caller?
5. **Rewrite without comments** — take your revised versions of Section 1 and Section 4. Remove every comment. Read the code aloud. Mark every line that is still unclear. Revise those lines until the code speaks for itself.

**Design questions to surface before starting:**

- `# check member`, `# check book`, `# check available` — these three comments each describe one line of code. If you renamed the variables correctly in Assignment 1, would these comments still be needed?
- `# find member name` sits above a four-line loop. What would you name a function that contains only that loop?
- `getName` increments `x['ac']` before returning. A caller who reads only the function signature sees: `getName(mid) -> str`. What would they reasonably expect to happen when they call it? What actually happens?

**Topics:**

- [ ] Self-documenting code — code that communicates intent through naming and structure, without requiring comments to explain what it does; the test: remove all comments and read aloud — if anything is unclear, the code needs work, not a comment
- [ ] Comments as signals — a comment explaining *what* code does is a smell: it signals a missing abstraction, a poor name, or both; a comment explaining *why* is legitimate; *Paradigm shift: the instinct is to add comments to explain hard-to-read code. The shift: if the code needs a comment to explain what it does, improve the code until the comment is unnecessary.*
- [ ] The arrow pattern — deeply nested conditionals that produce a rightward-leaning "arrow" shape; each level of nesting adds cognitive load for the reader; common in code written defensively but without thought for the reader
- [ ] Guard clauses — inverting nested conditions into early returns at the top of a function; flattens the arrow; makes the happy path visible without navigating nested blocks; see refactoring.guru for the mechanics
- [ ] Named constants — replacing literal values with named constants that give the value meaning; `MAX_LOAN_DAYS = 14` communicates; `14` does not; applies to numbers, strings, and any value that carries domain meaning
- [ ] Surprising side effects — a function named like a query (get, find, fetch) should return a value and change nothing; a function that mutates state should be named like a command (update, record, increment); mixing the two surprises callers and creates bugs that are hard to trace; *Paradigm shift: the instinct is to bundle a side effect into a getter because it is convenient. The shift: callers trust that getName returns a name — nothing more. Betraying that trust is a bug waiting to happen.*
- [ ] Extract method — pulling a named block of logic into its own function; the comment above the block often becomes the function name; see Fowler's catalogue: *Extract Function*

---

### Module 2: Finding and Fixing Problems

Naming and self-documentation address the surface. Code smells address the
structure. A smell is not a bug — the code runs correctly. It is an
indicator of a deeper problem that will cost you when the code needs to
change.

#### Assignment 3: A Smell Hunt

Open `core/courses/code-quality-fundamentals/references/CODE-QUALITY-VIOLATIONS.md`. Work through all four sections
systematically using the Audit Worksheet. For each smell you find: name it,
describe what it costs, and — where the fix is straightforward — apply it.

> **Note for learners and tutors:** The smell hunt has two phases: recognition
> and remediation. Do not rush to fixes. The recognition phase — naming the
> smell and articulating the cost — is the more important skill. A developer
> who can name a smell and describe its cost can always look up the fix. A
> developer who applies fixes without understanding the problem will apply
> them in the wrong places.
>
> For each smell: ask the learner to name it, then ask "what would have to
> change in the real world for this to hurt you?" The answer should be a
> concrete scenario, not an abstract principle.
>
> Remediation: match each to a named fix where the fix is simple enough to
> apply at this level. For more complex smells (feature envy, primitive
> obsession, large class), recognition and a pointer to the catalogue is
> sufficient.
>
> Static analysis introduction: once the learner has completed the manual
> hunt, introduce a linter for their chosen language. Run it on the reference
> code. Which of their findings does it catch? Which does it miss? The
> exercise makes the boundary between what tools find and what only humans
> find concrete.

**Suggested milestones:**

1. **Read the reference catalogue** — before hunting, read the smell descriptions on [refactoring.guru/refactoring/smells](https://refactoring.guru/refactoring/smells) or Fowler Chapter 3. Build a mental checklist. You are not looking for all 22 smells — focus on the eight listed in the Topics section.
2. **Hunt Section by Section** — work through the Audit Worksheet in order. For each section: list every smell, name it precisely, and describe in one sentence what it costs.
3. **Match smells to fixes** — for the arrow pattern, duplicate code, magic numbers, and comments-as-smell: name the refactoring move and apply it. For long method and inconsistent naming: name the fix but apply it selectively. For feature envy and primitive obsession: name the smell, describe where you see it, and note the catalogue reference for the fix.
4. **Introduce a linter** — install a linter for your chosen language (ESLint for JavaScript/TypeScript, Pylint or Ruff for Python, Checkstyle for Java). Run it against the reference code. Note: which smells does it flag automatically? Which ones did you find manually that the linter missed entirely?
5. **Before and after** — for the three fixes you applied: write a before/after comparison and a one-sentence explanation of what a future reader gains from the change.

**Design questions to surface before starting:**

- `calc1` and `calc2` both calculate late fines. Are they identical? If not, what is different? Does the difference justify having two functions, or is one of them wrong?
- The `gen` function (Section 4) contains a nested loop whose only purpose is to look up a member name. What smell does this represent? What would fix it?
- A linter catches style violations and some structural issues automatically. What category of problem can a linter never catch, no matter how sophisticated it is?

**Topics:**

- [ ] What a code smell is — an indicator of a deeper structural problem; not a bug, but a warning sign that the code will resist change; named by Kent Beck, catalogued by Martin Fowler; *Paradigm shift: the instinct is to treat any working code as acceptable. The shift: code that works but is hard to change will slow every future modification — smells identify where the friction lives.*
- [ ] Long method — a function that does too many things; the test: can you describe what it does in one sentence without using "and"? Fix: *Extract Function* (Fowler / refactoring.guru)
- [ ] Duplicate code — the same logic in two places; the next change has to be made twice, and one copy will be missed; Fix: *Extract Function*, then call it from both sites
- [ ] Arrow pattern — deeply nested conditionals; each level hides the happy path deeper; Fix: guard clauses / *Replace Nested Conditional with Guard Clauses* (refactoring.guru)
- [ ] Magic numbers and magic strings — literal values with no name; a reader cannot know what `14` means without a comment; Fix: *Replace Magic Literal* — extract to a named constant
- [ ] Comments-as-smell — a comment explaining what code does signals a missing abstraction; Fix: rename, extract, or restructure until the comment is unnecessary; the legitimate exception: comments that explain *why* (a constraint, a workaround, a non-obvious invariant)
- [ ] Surprising side effects — a function named like a query that also mutates state; violates the caller's reasonable expectation; Fix: separate into a query function and a command function
- [ ] Inconsistent naming — verb pairs that do not match (fetch/remove/add-to-system instead of get/remove/add); Fix: rename to establish a consistent convention across the class
- [ ] Feature envy — a function more interested in another object's data than its own; a signal that the function belongs in the other class; Fix: *Move Function* (Fowler)
- [ ] Primitive obsession — using primitive types (strings, integers) where a small domain object would be clearer; Fix: *Replace Primitive with Object* (Fowler); recognition at this level is sufficient — catalogue the fix for later
- [ ] Static vs dynamic analysis (introductory) — static analysis: tools that scan code without executing it, like a compiler or linter (ESLint, Pylint, Checkstyle); catch style violations, some structural issues, potential bugs; dynamic analysis: tools that instrument code and observe it at runtime; catch memory errors, race conditions, and behavioural issues that static tools miss; neither replaces reading the code — some of the most costly smells are invisible to both

---

#### Assignment 4: A Quality Pass

Apply the same lens to your own code. If you completed `oop-fundamentals`,
use your Assignment 2 or 3 codebase. Otherwise, use any codebase you have
written recently. Your job is to conduct a self-audit and make three
targeted fixes — one naming improvement, one structural fix, and one
smell remediation.

> **Note for learners and tutors:** This assignment closes the loop between
> analysis (reading someone else's bad code) and production (improving your
> own). The constraint of three targeted fixes prevents the learner from
> attempting a full rewrite, which is almost never the right move — and which
> sidesteps the discipline of diagnosing precisely before touching anything.
>
> The verification mechanic: for each fix, the learner should be able to
> state: what was wrong, what change I made, and what a future reader gains.
> Vague answers ("it's cleaner now") indicate the fix was cosmetic rather
> than targeted.
>
> If the learner's own code has no obvious smells — which is unlikely but
> possible — ask them to find the three least readable places and explain
> why they are least readable. Even if no fix is needed, the ability to
> articulate the reading experience is the skill.

**Suggested milestones:**

1. **Audit first, fix nothing** — read your own codebase with the Audit Worksheet mindset. List every smell you find. Resist fixing anything until the list is complete. A developer who fixes as they go will miss problems in the parts they did not reach.
2. **Prioritise three fixes** — from your list, pick three: one name that would benefit most from improvement, one structural fix (arrow pattern, long method, or duplicate code), and one other smell. Justify each selection: why these three and not the others?
3. **Apply the naming fix** — rename the identifier you chose. Write down: what it was, what it is now, and what a caller gains from the new name.
4. **Apply the structural fix** — apply the appropriate refactoring move (guard clause, extract function, or de-duplicate). Consult refactoring.guru or Fowler for the mechanics. Write down: what the smell was, what move you applied, and what the before/after looks like.
5. **Apply the smell fix** — fix the third smell. Document it the same way.
6. **Verify: the read-aloud test** — read the three changed sections aloud. Would a colleague understand each one without opening the implementation? If not, what still needs work?

**Design questions to surface before starting:**

- You are going to make three targeted fixes, not rewrite everything. How do you decide which three to pick? What makes one smell higher priority than another?
- If you apply a fix and the code is shorter but you cannot explain why it is better, the fix was cosmetic. What is the difference between a cosmetic change and a quality improvement?
- You found a long method in your own code. Before extracting it: can you name the pieces? If you cannot name them, you do not yet understand the structure well enough to split it safely.

**Topics:**

- [ ] Targeted refactoring — making one precise improvement at a time; not rewriting; not "cleaning up while you're in there"; the discipline: diagnose first, fix second, verify third
- [ ] The read-aloud test — reading code aloud to a colleague (real or imagined) and noting every moment of confusion; confusion is information; it locates where the reading cost is highest
- [ ] When not to refactor — code that is not going to change does not need to be cleaner; code that is well-tested is safer to refactor; code that no one reads is not worth improving; quality investments pay off in proportion to how often the code is read and changed

---

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these in 1-on-1s to probe for
> genuine understanding. Do not accept "I know it" — ask for a
> demonstration or a concrete example from the reference file.

**After Assignment 1:**

- Point to a method name in your renamed Section 3. Read it aloud. Now read the original. What specifically does the new name communicate that the original did not?
- You standardised the verb pairs across `Mgr`. Read the five method names in order. If a new developer joined the team and needed to add a method to suspend a member temporarily, what would they name it, and why?
- De-facto vs de-jure: give me one example of each from your chosen language. Who enforces each one, and what happens if you violate it?

**After Assignment 2:**

- Read your rewritten checkout function aloud — the version with guard clauses and no comments. Where does it still require a reader to think? What would remove that last friction?
- You split `getName` into two functions. Read both function names aloud. Does each name fully describe what the function does? Would a caller be surprised by anything either function does?
- Find a comment in the original reference code that you decided was legitimate (explaining why, not what). Why did you keep it? What would the code look like without it?

**After Assignment 3:**

- For each smell you named: describe a real change request that would cause that smell to hurt. Not "it would be hard" — name the specific file or function that would have to change, and what would break.
- You ran a linter after doing the manual hunt. Which smell in your list did the linter also catch? Which smells can no linter ever catch, regardless of how sophisticated it becomes?
- You found duplicate code in Sections 2. Are `calc1` and `calc2` doing the same thing? If not, what is different — and does the difference justify two functions or indicate a bug?

**After Assignment 4:**

- Walk me through one of your three fixes. What was wrong, what did you do, and what does a future reader gain?
- You chose three fixes from a longer list. What did you leave unfixed, and why? Was it because those smells were lower priority, or because the fix was too complex for now?
- If a teammate reviewed your code before and after this assignment — not knowing what changes you made — what would they notice? Would they be able to articulate why the "after" version is easier to work with?

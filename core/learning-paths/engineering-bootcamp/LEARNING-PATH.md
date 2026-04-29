---
title: 'Engineering Bootcamp'
slug: 'engineering-bootcamp'
version: '1.0'
author: 'Upstack'
created: '2026-04-27'
updated: '2026-04-27'
domain: 'software-engineering'
level: 'novice'
target-audience: >
  Fresh graduate software engineers entering their first professional role.
  Basic programming experience assumed — at least one general-purpose language,
  basic familiarity with classes and functions. No professional software
  development experience required.
estimated-weeks: 16
featured: true

courses:
  - slug: 'git-fundamentals'
    order: 1
    required: true
    integration-task-summary: 'Create the project repo'
  - slug: 'markdown-fundamentals'
    order: 2
    required: true
    integration-task-summary: 'Document the project'
  - slug: 'oop-fundamentals'
    order: 3
    required: true
    integration-task-summary: 'Design the domain model'
  - slug: 'dsa-fundamentals'
    order: 4
    required: true
    integration-task-summary: 'Implement the data store'
  - slug: 'code-quality-fundamentals'
    order: 5
    required: true
    integration-task-summary: 'Refactor for clarity'
  - slug: 'testing-fundamentals'
    order: 6
    required: true
    integration-task-summary: 'Write test scenarios'
  - slug: 'agile-fundamentals'
    order: 7
    required: true
    integration-task-summary: 'Plan the capstone sprint'

project-options:
  - slug: 'library-catalogue'
    title: 'Personal Library Catalogue'
  - slug: 'recipe-manager'
    title: 'Recipe Manager'
  - slug: 'job-application-tracker'
    title: 'Job Application Tracker'

capstone-title: 'Working CLI Application'

ai-tools:
  - 'claude-code'
tutor-contract: 'core/meta/TUTOR-CONTRACT.md'
---

# Engineering Bootcamp

Seven courses. One project. A working command-line application (one you
run from the terminal — a CLI) at the end.

This learning path takes a fresh graduate through the engineering fundamentals
every professional software team depends on — not as isolated subjects, but
applied incrementally to a single real project. By the time the capstone
arrives, the learner has already built every component. The final step is
assembly.

## Learning Path Narrative

The sequence is deliberate.

**git-fundamentals first** because the repo the learner creates in course 1
is the repo they use for every integration task that follows. Every commit,
every feature branch, every design decision — all of it accumulates in one
place from day one.

**markdown-fundamentals second** because documentation habits are easier to
build before the code gets complex. The README and decisions log written here
become living documents throughout the path.

**oop-fundamentals (object-oriented programming) third** because the domain
model is the foundation everything else depends on. The classes designed here
appear in the data store built in the next course, survive the code-quality
refactor, and are the subject of the testing scenarios.

**dsa-fundamentals (data structures and algorithms) fourth** because once the
domain model exists, the learner needs a storage layer. This course provides
the right tools and the right vocabulary for choosing between them.

**code-quality-fundamentals fifth** because by now there is real code worth
refactoring — the classes from course 3 and the data store from course 4.
More surface area means more interesting code smells (signs of poorly
structured code) to find, more meaningful renames to make.

**testing-fundamentals sixth** because test scenarios are most useful when
written against clean, stable code. Testing a first draft teaches the wrong
lessons.

**agile-fundamentals last** because sprint planning is concrete when you have
built something real. By course 7, the learner knows exactly what components
exist and what the capstone requires. Planning the final sprint is a design
exercise, not a theoretical one.

---

## Project Options

Choose one project at enrolment. Every course's integration task applies to
that project — its domain, its entities, its design decisions. The project
does not change mid-path.

Each project is a command-line (CLI) application with a core workflow and a
domain model of four to five entities. All three have enough complexity to
generate genuine design decisions without requiring specialised domain
knowledge the learner doesn't have. Each project is scoped to operations
on in-memory data during the seven courses; file-based persistence is
added at the capstone as the final assembly step.

### Personal Library Catalogue

**What it does:** Catalogues the books you own, records the friends you
lend them to, and tracks the lifecycle of each loan from issue to return.

**Scope (what the bootcamp covers):**
- The user enters books, authors, friends, and loans by hand via the
  command-line interface — no external book database, no ISBN lookup
  service.
- All status lifecycle and loan-overdue logic is computed by your own
  code — no AI-generated content.
- Data lives in memory during the seven courses. File persistence
  (a JSON file on disk) is added only at the capstone.

**Core workflow:** (operations on in-memory data)
```
> library add-book "978-0451524935" "1984" 1949
Book added [id: b1, status: available]

> library add-author b1 "George Orwell"
Author linked.

> library add-friend "Alice"
Friend added [id: f1]

> library loan b1 f1 --due 2026-06-01
Book loaned to Alice, due 2026-06-01.

> library status
ON LOAN
  1984 — to Alice  due 2026-06-01

> library return b1
Book returned. Available.
```

**Domain entities:** `Book` (ISBN, title, publication year, status),
`Author` (name, nationality, birth year), `Friend` (name, contact,
loans-active count), `Loan` (book, friend, loaned date, due date,
returned date or null).

**Key design decisions you will make:**
- Where does loan status live — derived from active loans, or stored
  on the `Book`? What goes wrong with each choice?
- Can a `Book` have multiple authors? How is that modelled —
  composition (collection of `Author`) or inheritance?
- Can a `Friend` hold multiple active loans simultaneously, and how
  is loan history represented separately from active loans?

**Why it is a good vehicle:** The book–author and book–loan relationships
generate clean composition opportunities. The loan lifecycle is real but
simpler than a full state machine — easy enough for novices, rich enough
for genuine OOP trade-offs. ISBN as a natural HashMap key motivates the
data structure choice with no contrivance.

---

### Recipe Manager

**What it does:** Records your recipes and the ingredients each one
needs. Lets you build a meal plan from selected recipes scaled to chosen
servings, then aggregates ingredients across the plan into a single
shopping list.

**Scope (what the bootcamp covers):**
- The user enters recipes, ingredients, and meal plans by hand — no
  external food database, no nutrition lookup.
- The shopping list is computed by your own aggregation code — no
  AI-generated content.
- Data lives in memory during the seven courses. File persistence
  (a JSON file on disk) is added only at the capstone.

**Core workflow:** (operations on in-memory data)
```
> recipe add "Tomato Pasta" --servings 4
Recipe added [id: r1]

> recipe add-ingredient r1 "tomatoes" 6 "units"
> recipe add-ingredient r1 "pasta" 400 "g"
> recipe add-ingredient r1 "olive oil" 30 "ml"
Ingredients added.

> mealplan create "This Week"
Meal plan created [id: m1]

> mealplan add-recipe m1 r1 --servings 2
Recipe added to plan (scaled to 2 servings).

> mealplan shopping-list m1
SHOPPING LIST: This Week
  tomatoes        3 units
  pasta           200 g
  olive oil       15 ml
```

**Domain entities:** `Recipe` (name, base servings, ingredient list,
instructions), `Ingredient` (name, quantity, unit), `MealPlan` (name,
selected recipes with target servings), `ShoppingList` (meal plan,
aggregated ingredients).

**Key design decisions you will make:**
- The same ingredient appears in multiple recipes with different units
  (e.g. tomatoes by `units` in one recipe, by `g` in another) — do you
  convert on aggregation, refuse to aggregate, or surface them as
  separate lines?
- Where does scaling-to-servings happen — when adding a recipe to a
  meal plan, or when aggregating the shopping list?
- Where does ingredient deduplication live — at recipe entry, or only
  at shopping-list aggregation?

**Why it is a good vehicle:** The aggregation requirement (computing a
shopping list across recipes) is the core OOP and DSA exercise, and it
forces real design decisions about responsibility boundaries between
classes. Ingredient deduplication makes the HashMap use case direct and
motivated. Unit handling generates productive design arguments without
specialised domain knowledge.

---

### Job Application Tracker

**What it does:** Tracks job applications through stages from first contact
to offer or rejection.

**Scope (what the bootcamp covers):**
- The user enters companies, applications, interview stages, and offers
  by hand — no integration with job boards or email.
- All filtering and lifecycle logic is computed in your own code —
  no AI-generated content.
- Data lives in memory during the seven courses. File persistence
  (a JSON file on disk) is added only at the capstone.

**Core workflow:** (operations on in-memory data)
```
> tracker add "Stripe" "Backend Engineer"
Application added: Stripe — Backend Engineer  [status: applied]

> tracker stage "Stripe" "Backend Engineer" "technical interview" "2026-05-14"
Stage recorded: technical interview  scheduled 2026-05-14

> tracker status
ACTIVE APPLICATIONS
  Stripe — Backend Engineer       [technical interview]  next: 2026-05-14
  Monzo — Platform Engineer       [phone screen]         —
  DeepMind — Software Engineer    [applied]              —
```

**Domain entities:** `Company` (name, industry, location), `Application`
(company, role, applied date, status), `InterviewStage` (type, scheduled
date, outcome, notes), `Offer` (application, salary range, start date,
response deadline).

**Key design decisions you will make:**
- What statuses can an application hold, and what are the valid transitions?
  (Can you move from "offer" back to "interviewing"?)
- Where does status live — derived from the most recent stage, or stored
  independently?
- How do you prevent duplicate applications to the same company and role?

**Why it is a good vehicle:** The status lifecycle is a genuine modelling
challenge (state machine territory) that creates productive design arguments.
The HashMap use case is direct and motivated (fast lookup by company+role).
The domain requires no specialised knowledge.

---

## Integration Tasks

One task per course. Complete it after finishing the course's final
assignment, before starting the next course. The task applies the skill just
learned to your chosen project.

Integration task outputs live in `progress/engineering-bootcamp/integration-journal.md`.
The tutor reads your project choice from `progress/engineering-bootcamp/learner-context.md`
at the start of each session.

---

### After: git-fundamentals

**Personal Library Catalogue:**
Initialise your `library-catalogue/` project directory — separate from the
Upstack repo. Configure git with your identity. Create a `README.md` (one
paragraph: what the tool does and what it will not do — explicit on no
external book database). Make your first three commits following the
feature branch workflow: the init commit, the README commit (feature
branch → merge → delete), and a `docs/DECISIONS.md` stub on its own
branch capturing your first design decision: what fields define a
`Book` in your tool — minimum required fields and what is deliberately
excluded.

**Recipe Manager:**
Initialise your `recipe-manager/` project directory. Configure git with
your identity. Create a `README.md` (one paragraph: purpose and scope).
Three commits on feature branches: init, README, and a `docs/DECISIONS.md`
stub with your first design decision: how you represent an ingredient
unit — fixed enumeration (g, ml, units) or free-text? Document the
trade-offs.

**Job Application Tracker:**
Initialise your `job-application-tracker/` project directory. Configure git
with your identity. Create a `README.md` (one paragraph: purpose and scope).
Three commits on feature branches: init, README, and a `docs/DECISIONS.md`
stub with your first design decision: the complete status lifecycle of an
application — every status it can have and what each one means.

---

### After: markdown-fundamentals

**Personal Library Catalogue:**
Write a complete `README.md`: purpose, how to run it, expected input
format, what the output looks like, known limitations (no ISBN lookup,
no external book database). Update `docs/DECISIONS.md` with a second
decision: where loan status lives — derived from active loans on the
fly, or stored on the `Book` and kept in sync? List the failure mode of
each approach. (Decision written before any code — implementation comes
in a later course.) Write `docs/SPRINT-1.md` as a structured planning
note: three to four features you plan to build first and why they are
the right starting point.

**Recipe Manager:**
Write a complete `README.md`. Update `docs/DECISIONS.md` with a second
decision: how the same ingredient appearing in multiple recipes with
different units is handled — convert on aggregation, refuse to aggregate,
or surface as separate shopping-list lines? Document the trade-offs of
the chosen approach. Write `docs/SPRINT-1.md`: three to four features to
build first.

**Job Application Tracker:**
Write a complete `README.md`. Update `docs/DECISIONS.md` with a second
decision: refine the status lifecycle from course 1 — now specify the valid
transitions. Can you move from "offer" back to "interviewing"? What triggers
each transition? Write `docs/SPRINT-1.md`: three to four features to build
first.

---

### After: oop-fundamentals

**Personal Library Catalogue:**
Design and implement four classes in Java: `Book` (isbn, title,
publicationYear, status), `Author` (name, nationality, birthYear),
`Friend` (name, contact, activeLoanCount), `Loan` (book, friend,
loanedAt, dueAt, returnedAt). Apply encapsulation throughout — private
fields, getters only where genuinely needed. The `Book`–`Author`
relationship: implement composition (a `Book` holds a list of `Author`)
rather than inheritance, and document in `docs/DECISIONS.md` why. Apply
the single-responsibility principle to `Loan`: if it both tracks dates
and decides whether the loan is overdue, that responsibility split is
worth questioning — separate the calculation from the data.
Commit each class on its own feature branch.

**Recipe Manager:**
Design and implement four classes: `Recipe` (name, baseServings,
ingredients, instructions), `Ingredient` (name, quantity, unit),
`MealPlan` (name, recipeEntries — each with target servings),
`ShoppingList` (mealPlan, aggregatedIngredients). Apply the same
encapsulation and single-responsibility discipline. The
`Recipe`–`Ingredient` relationship is composition (a `Recipe` owns its
ingredients). The trickier one: where does scaling logic live —
`Recipe` (it knows how to scale itself), `MealPlan` (it tracks the
scaling factor), or `ShoppingList` (it scales at aggregation time)?
Document the answer in `docs/DECISIONS.md`.

**Job Application Tracker:**
Design and implement four classes: `Company` (name, industry, location),
`Application` (company, role, appliedDate, status), `InterviewStage` (type,
scheduledAt, outcome, notes), `Offer` (application, salaryRange, startDate,
deadline). Apply encapsulation and the single-responsibility principle.
Particular focus: model the status
lifecycle from your DECISIONS.md — where does status live and who is
permitted to change it? Document the answer.

---

### After: dsa-fundamentals

**Personal Library Catalogue:**
Implement `LibraryStore` — an in-memory storage class that holds books,
friends, and loans. Use `HashMap<String, Book>` keyed by ISBN for O(1)
book lookup, `HashMap<String, Friend>` keyed by name, and
`ArrayList<Loan>` for the loan history (ordered chronologically).
Implement: `addBook`, `getBookByIsbn`, `addFriend`, `getFriendByName`,
`recordLoan`, `recordReturn`, `getActiveLoans`. Write a comment block on
the class documenting the time complexity of each method. Particular
attention to `getActiveLoans` — what's the complexity, and is that
acceptable? Commit on a feature branch.

**Recipe Manager:**
Implement `RecipeStore`. Use `HashMap<String, Recipe>` keyed by recipe
name for O(1) lookup, `HashMap<String, Ingredient>` for the canonical
ingredient list (enforces deduplication by name), and `ArrayList<MealPlan>`
for meal plans. Implement: `addRecipe`, `getRecipe`, `getCanonicalIngredient`,
`addMealPlan`, `getAllMealPlans`. Document the complexity of each
method. Pay particular attention to the canonical ingredient store —
why deduplicate at the store level rather than per recipe?


**Job Application Tracker:**
Implement `ApplicationStore`. Use `HashMap<String, Application>` keyed by
`companyName + "|" + role` for fast lookup and duplicate prevention. Use
`ArrayList<InterviewStage>` (stored per application, ordered
chronologically). Implement: `addApplication`, `getApplication`,
`getAllApplications`, `filterByStatus`. Document complexity. Pay particular
attention to the key design: why a HashMap over an ArrayList for the primary
store?

---

### After: code-quality-fundamentals

**Personal Library Catalogue:**
Take `LibraryStore` and `Loan` from previous integration tasks. Identify:
vague method names (e.g., `process()`, `handle()`), fields with ambiguous
names, methods that do more than one thing (a common one in this domain:
loan-overdue calculation living inside an unrelated method). Refactor:
rename, extract methods, eliminate any duplication found. Commit the
refactoring on a feature branch with a commit message that explains the
intent of the changes, not just that they happened. The goal: a teammate
who has never seen this code understands it without asking.

**Recipe Manager:**
Take `RecipeStore` and `ShoppingList`. Apply the same process: identify
smells, rename for clarity, extract methods where methods are doing too
much. Particular attention to the aggregation logic — is it readable as
a sequence of intent-revealing steps, or is it a dense loop with magic
inside? Same commit discipline.

**Job Application Tracker:**
Take `ApplicationStore` and `Application`. Apply the same process. Particular
attention to status handling — is the logic clear and named expressively, or
is it hiding behind generic conditionals?

---

### After: testing-fundamentals

**Personal Library Catalogue:**
Write test scenarios (not test code) for the core loan workflow. Cover
the happy path and at least four boundary cases: loaning a book that is
already on loan, returning a book that is not on loan, a friend with
multiple simultaneous active loans, and a loan whose due date is in the
past at the moment of issue (is that allowed, and what should happen?).
Write acceptance criteria for the loan status report: what must be true
for the status output to be considered correct? Structure as: input →
expected output → pass/fail condition. Commit in `docs/TEST-SCENARIOS.md`.

**Recipe Manager:**
Write test scenarios for the meal-plan and shopping-list workflow.
Happy path plus boundary cases: same ingredient appearing in two
recipes with different units (the cross-unit case from your decision
log), scaling a recipe to 0 servings, an empty meal plan asked for a
shopping list, and a recipe added to a meal plan twice (is that
allowed, and what does aggregation produce?). Commit in
`docs/TEST-SCENARIOS.md`.

**Job Application Tracker:**
Write test scenarios for the application lifecycle. Happy path plus boundary
cases: applying to the same company and role twice, an interview stage with
no scheduled date, an offer received before any interview stages are recorded,
`filterByStatus` called with a status that has no matching applications.
Commit in `docs/TEST-SCENARIOS.md`.

---

### After: agile-fundamentals

**All three projects:**
At this point you have a domain model, a data store, clean code, and defined
test scenarios. Plan the capstone sprint.

Write 5–7 user stories for the CLI interface layer — the commands the user
will type and what they expect in return. For each story, write a one-line
description ("As a user, I want to...") and two to three acceptance criteria.
Prioritise: which stories are must-have for the capstone, which are stretch
goals? Mark the must-haves clearly.

Commit the sprint plan in `docs/SPRINT-CAPSTONE.md`. This document is your
build guide for the capstone.

---

## Capstone: Working CLI Application

The capstone is the learning path's final milestone. It is not a new course —
it is assembly.

**What to build:** A command-line application that runs from the terminal,
executes the core workflow of your chosen project, and persists data between
sessions using simple file-based serialisation (a JSON file on disk —
JSON is a plain-text format for storing structured data).

**What to connect:**

| Component | Source |
|-----------|--------|
| Domain model | oop-fundamentals integration task |
| Data store | dsa-fundamentals integration task |
| Refactored code | code-quality-fundamentals integration task |
| Acceptance checklist | testing-fundamentals integration task (`docs/TEST-SCENARIOS.md`) |
| Build plan | agile-fundamentals integration task (`docs/SPRINT-CAPSTONE.md`) |

**The command-line layer** — the one new piece — parses commands from the terminal,
routes them to the right domain operations, and formats output for the user.
Follow the sprint plan. Build the must-have stories first. Stretch goals are
optional.

**Done when:** All must-have acceptance criteria from `docs/SPRINT-CAPSTONE.md`
are satisfied. The data persists between runs (close the program, open it again,
the data is still there). The code is committed on `main` with a clean
commit history that follows the feature branch workflow.

The capstone is not assessed on polish — it is assessed on whether the seven
integration task outputs come together into a working program. A rough CLI
that works is better than a polished one that doesn't.

---

## For L&D Coordinators

This path is designed for self-directed learners with AI tutor support, but
it works equally well as a structured bootcamp with coordinator oversight.

**Duration:** 16 weeks is a reasonable estimate for part-time learners (10–12
hours per week). Full-time learners typically complete in 6–8 weeks.

**Progress tracking:** Each learner's integration journal
(`progress/engineering-bootcamp/integration-journal.md`) is a record of
what was produced at each stage. The integration task outputs are committed
to their project repository — the git log is auditable evidence of the work.

**Discussion prompts:** Use the Reasoning Review Prompts at the end of each
course's `COURSE.md` to probe for genuine understanding in 1-on-1s. The
integration tasks add a second discussion angle: ask the learner to explain
the design decisions they documented, not just what they built.

**Where the learning path sits:** The learning path adds integration tasks
on top of standalone courses. The courses are self-contained — a learner
can take any course independently without enrolling in the bootcamp. The
path's value is the continuity: one project, seven skills applied to it,
and a working application at the end.

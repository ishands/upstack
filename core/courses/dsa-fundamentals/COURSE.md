---
title: 'Data Structures Fundamentals'
slug: 'dsa-fundamentals'
version: '1.0'
domain: 'software-engineering'
level: 'beginner'
target-audience: >
  Fresh graduates and early-career engineers who can write working code
  but reach for the same familiar structure — usually a list — regardless
  of the problem. No prior data structures coursework is assumed. Basic
  programming experience in any language (variables, loops, conditionals,
  functions) is required. Completing testing-fundamentals first provides
  useful HireTrack context, but is not a hard prerequisite.
prerequisites:
  - 'Basic programming: variables, loops, conditionals, and functions'
  - 'Recommended: testing-fundamentals (HireTrack context)'
tags:
  - data-structures
  - python
  - lists
  - dictionaries
  - sets
  - complexity
  - structure-selection
author: 'Upstack'
created: '2026-04-26'
updated: '2026-04-26'
ai-tools:
  - 'claude-code'
tutor-contract: 'core/meta/TUTOR-CONTRACT.md'
featured: true
estimated-hours: 8
---

# Data Structures Fundamentals

Every program stores data. The question that separates a developer who
writes working code from one who writes code that works well is not
whether they know what a list is — it is whether they asked, before
writing the first line, whether a list was the right choice.

Most structure mistakes are not ignorance. They are habit. The list is
familiar. It works for small inputs. It passes the test. The cost only
appears later: a growing roster that takes longer and longer to search,
a flattened record that requires parsing before every operation, a
design that made sense for ten items and breaks under ten thousand. The
mistake is almost never "I didn't know that structure existed." It is "I
didn't stop to ask what the data actually needed to do."

This course teaches a different habit: read the requirement, ask five
questions, then choose the structure. The questions are not complicated.
They form a checklist — and once the checklist is second nature, most
structure decisions make themselves.

## What You Will Learn

By the end of this course you will be able to read a requirement and
select the right data structure by working through a short series of
questions that expose what the data needs to do. You will design nested
structures for problems that cannot be solved at a single level, diagnose
a badly-chosen structure and articulate precisely what it costs, and
trace a complete operation through a designed structure to verify it
answers the question it was built for.

## Learning Objectives

- Apply a five-question selection checklist to choose between list, dict,
  set, and stack/queue for a given problem
- Explain why O(1) lookup justifies choosing a dict over a list for
  identifier-based access, even on small collections
- Identify when a problem requires nested structures, determine the
  correct nesting depth, and design the structure before writing any
  operations
- Diagnose a poorly-chosen data structure, articulate the specific
  operation it makes expensive or error-prone, and propose a replacement
- Design a composite nested structure from a stated requirement and trace
  one complete read and one complete write operation through it to verify
  correctness

## Course Structure

All assignments use the HireTrack applicant tracking system as the
domain. The data scenarios for each assignment are in
`core/courses/dsa-fundamentals/references/HIRETRACK-DSA-SCENARIOS.md`.
The final assignment introduces a new HireTrack reporting requirement and
asks you to design the data structure from scratch.

Examples in this course are written in Python. Python's built-in types
map directly to the structures this course covers: `list` for ordered
sequences, `dict` for key-value maps, `set` for unique collections, and
`collections.deque` for queue and stack behaviour. If you prefer
JavaScript, Java, or C#, tell your tutor before starting Module 1 and
all examples will be adapted for your chosen language throughout the
course.

---

### Module 1: Choosing the Right Structure

The four structures you will use most often each answer a different
question about what the data needs to do. A list answers: keep these
things in order. A dict answers: find this thing by its identifier. A set
answers: tell me whether this thing is already here. A stack or queue
answers: give me the most recent thing, or the oldest. Most real
structures are combinations — but the combination always starts with
answering the fundamental question for each piece.

#### Assignment 1: The Right Container

Open `core/courses/dsa-fundamentals/references/HIRETRACK-DSA-SCENARIOS.md`, Section 1 (The Candidate Roster).
HireTrack stores candidate records and looks them up by candidate ID.
Your job is to apply the selection checklist to this collection, choose
between list and dict, and trace one lookup operation through both
choices to show what the difference costs.

> **Note for learners and tutors:** This is a design and analysis
> assignment — no running code required. The learner produces: written
> answers to the five checklist questions, a structure definition in
> Python syntax using the sample data, and a step-by-step trace of a
> lookup in both structures.
>
> The verification mechanic: once the learner has chosen a dict, ask
> them to describe what happens when HireTrack needs to find candidate
> "C002" in both versions. In the list version, how many candidates does
> Python check before finding C002? In the dict version, how many? Then
> ask: if the roster grows to 10,000 candidates, what changes about
> each answer? The goal is for the learner to express the difference in
> plain language — "the list checks every element, the dict goes
> directly to the key" — before introducing O(n) and O(1) as the formal
> vocabulary for that intuition.
>
> On list familiarity: many learners will start with a list of dicts
> because it is what they learned first. Do not correct them — ask the
> checklist questions one by one and let the structure choice emerge
> from the answers. The insight "I need to find by ID" should come from
> the learner, not from the tutor.

**Suggested milestones:**

1. **Run the selection checklist** — work through five questions for the
   candidate roster. (1) What is one item? (2) Will you need to find a
   specific candidate by an identifier — and if so, what is the
   identifier? (3) Can the same candidate appear more than once in the
   collection? (4) Do you process candidates in strict arrival order
   (first-in-first-out) or by recency (last-in-first-out)? (5) Does
   each candidate record have its own sub-structure — fields, nested
   data? Write your answers before proposing any structure.
2. **Propose the structure** — based on your checklist answers, choose
   between list, dict, set, or stack/queue. Write the structure in
   Python using the sample data from Section 1. Your definition should
   include all five candidates.
3. **Trace a lookup** — write out, step by step, what happens when
   HireTrack needs to find candidate "C002" in your proposed structure.
   Then write the same lookup using a flat list of dicts. Count the
   steps for each. Which is constant regardless of collection size?
4. **State the cost of the wrong choice** — if a list had been used for
   a lookup-heavy roster, what happens as the roster grows? You do not
   need a formula — describe the growth pattern in plain language, then
   name the formal terms: O(n) for the list, O(1) for the dict.
5. **When a list is right** — identify one operation on the candidate
   roster where a list would be a better choice than a dict, and justify
   it using the checklist.

**Design questions to surface before starting:**

- The checklist asks: "do you need to look items up by an identifier?"
  The candidate roster has a candidate ID field. Is there also a use
  case where you would want to look up a candidate by email address? If
  both lookups are needed, does one structure support both at O(1)?
- `[{"id": "C001", ...}, {"id": "C002", ...}]` and
  `{"C001": {...}, "C002": {...}}` hold the same data. What is the
  structural difference? Under what operation does the difference
  matter, and under what operation is it invisible?
- HireTrack stores applications submitted over time. Is arrival order
  something the system needs to preserve in memory — or is the
  submission date a field on the candidate record? If it is a field,
  does preserving list order still matter?

**Topics:**

- [ ] The four core structures — list (ordered sequence, access by
  position), dict (key-value map, access by identifier), set (unique
  collection, fast membership test), stack/queue (ordered access by
  recency or arrival); each answers a different question about what the
  data needs to do; *Paradigm shift: the instinct is to store everything
  in a list because it is familiar. The shift: the shape of access —
  whether you retrieve by position, by key, by uniqueness, or by order
  of arrival — determines the structure, not familiarity.*
- [ ] The selection checklist — five questions applied before choosing a
  structure: (1) what is one item? (2) do I need to look items up by an
  identifier? (3) can items repeat? (4) do I process items in strict
  arrival or recency order? (5) does each item have its own
  sub-structure? answering these questions in writing — not mentally —
  prevents the most common structure errors
- [ ] O(1) vs O(n) access — O(1): constant time, independent of
  collection size (dict key lookup, set membership test); O(n): grows
  linearly with collection size (scanning a list for a matching value);
  the practical implication: O(n) on ten items is invisible; O(n) on
  100,000 items is a measurable pause; choose the structure before the
  collection is large, not after
- [ ] Dict — a key-value store where every key is unique and lookup by
  key is O(1); the natural structure for "find this item by its
  identifier"; in Python, keys must be immutable (strings, integers,
  tuples); values can be any type, including another dict; *Paradigm
  shift: the instinct is to scan a list for the item with the matching
  field. The shift: if you are looking things up by identifier, you are
  describing a dict key — using a list is the wrong structure.*
- [ ] List — an ordered sequence where items are accessed by integer
  index; O(1) access by index, O(n) scan by value; natural for
  collections where position or sequence matters; appropriate for lookup
  only when position is meaningful, not when identity is
- [ ] Set — a collection of unique items with O(1) membership test; the
  natural structure for "have I seen this before?" and "what items
  appear in both collections?"; no order, no duplicates; useful as a
  filter or deduplication step before or after working with other
  structures

---

#### Assignment 2: Nested Structures

Open `core/courses/dsa-fundamentals/references/HIRETRACK-DSA-SCENARIOS.md`, Section 2 (Pipeline Tracker and
Notification Settings). HireTrack tracks each candidate's current stage
and their full stage history. It also stores per-posting notification
settings. Your job is to apply the selection checklist at each level of
each problem, design two linked nested structures, and trace two
operations through them to verify they support what the system needs.

> **Note for learners and tutors:** The key insight this assignment
> should produce: nesting is not an advanced technique — it is what
> happens when the answer to checklist question 5 ("does each item have
> its own sub-structure?") is yes.
>
> The verification mechanic: once the learner has a design, give them a
> concrete write operation to trace: "Candidate C001 advances from
> Screened to Phone Interview. Show every field in your structure that
> changes, and write the Python statements that make those changes." If
> they struggle, the structure is probably missing a field.
>
> The failure mode to watch for: parallel flat dicts instead of nesting.
> A learner might store current stages and stage histories as separate
> top-level dicts (`stages["C001"]`, `histories["C001"]`) rather than
> nesting them inside the candidate record. Ask: if HireTrack needs to
> transition a candidate, how many separate dicts does a function need
> access to? What if they were nested — how many?
>
> On notification settings: the posting setting is owned by the posting,
> not the candidate. Ask: if you embed the notification setting inside
> each candidate record and the recruiter changes the setting, how many
> candidate records need to be updated?

**Suggested milestones:**

1. **Apply the checklist to each sub-problem** — there are two distinct
   data problems here: candidate records with stage history, and posting
   notification settings. Run the selection checklist on each one
   separately. What is one item in each collection? What is the
   identifier for each?
2. **Identify where nesting is needed** — for the candidate record: does
   a candidate have only a current stage, or also a history of past
   stages? If both, what structure holds the history? For the posting
   record: the notification setting is a property of the posting — where
   does it live relative to the posting record?
3. **Design the candidate structure** — write the Python structure
   definition for the candidates collection. It should include: current
   stage, stage history, and a reference to the candidate's posting. Use
   the sample data from Section 2.
4. **Design the posting structure** — write the Python structure
   definition for the postings collection. Include the notification
   setting. Use the sample data from Section 2.
5. **Trace a stage transition** — candidate C001 advances from Screened
   to Phone Interview. Which fields in your structure change? Write the
   Python statements that make those changes. Does the operation require
   one lookup or several?
6. **Trace a notification lookup** — when C001 enters Rejected,
   HireTrack checks whether the posting's "notify on rejection" setting
   is enabled. Write the two-step lookup: find the candidate's posting
   ID, then look up that posting's setting. How many dict accesses does
   this take?

**Design questions to surface before starting:**

- Stage history is stored as a list: `["Applied", "Screened"]`. When
  C001 advances to Phone Interview, how do you add the new stage without
  losing the history? What list operation do you use, and does the order
  of items in the list matter?
- One design stores the full posting record inside each candidate record
  (embedding). Another stores only the posting ID in the candidate
  record and looks up the posting separately (reference). The recruiter
  changes posting P001's notification setting. What does each design
  require?
- A teammate proposes storing stage history as a single string:
  `"Applied > Screened > Phone Interview"`. Name two operations on
  stage history that this makes harder compared to a list.

**Topics:**

- [ ] Nested structures — structures where the value at a key is itself
  a structure (dict of dicts, dict of lists, list of dicts); the
  natural result of answering checklist question 5 affirmatively; most
  real-world data requires at least one level of nesting; *Paradigm
  shift: the instinct is to flatten — one key per field at the top
  level, everything in parallel dicts. The shift: if the spec says
  "each candidate has its own history", that phrase is telling you to
  nest the history inside the candidate record.*
- [ ] Dict of dicts — outer key identifies the container (candidate ID,
  posting ID); inner keys identify named fields within the record;
  O(1) access at each level; the most common nested pattern for
  structured records with named attributes
- [ ] Dict of lists — outer key identifies the container; value is an
  ordered list of items associated with that container; natural for
  one-to-many relationships (one candidate, many stage transitions);
  the list preserves sequence order, which matters when history is
  meaningful
- [ ] Reference vs embedding — two strategies for related data: embed
  (copy the full record inside the parent) or reference (store an ID
  and look it up from a separate collection); embedding is simpler to
  read in one step; reference avoids duplication when the same record
  is shared across many parents and may be updated; a two-step lookup
  is almost always the right trade-off for shared, mutable data

---

### Module 2: Design in Practice

Designing from a clean requirement is the best case. The two assignments
in this module cover cases that are more common in practice: diagnosing
a structure someone else designed and finding it wanting, and designing
from a new requirement that arrives as a paragraph of prose with no
existing code to anchor you. Both cases use the same five-question
checklist — the difference is what you apply it to.

#### Assignment 3: Redesign a Bad Choice

Open `core/courses/dsa-fundamentals/references/HIRETRACK-DSA-SCENARIOS.md`, Section 3 (The Legacy Roster).
HireTrack's candidate roster was built by a developer who stored all
candidate data as formatted strings in a flat list. The structure
"works" — data is stored and can be retrieved. Your job is to run the
checklist on the existing structure, name every operation it makes
expensive or fragile, and propose a replacement.

> **Note for learners and tutors:** The target failure mode: accepting
> "it works" as a quality bar. The flawed structure in Section 3 does
> work for small, stable data — it stores values and you can extract
> them. The cost is invisible until you need to do something beyond
> append-and-print.
>
> The verification mechanic: ask the learner to write the Python code to
> find the candidate with ID "C003" in the flawed structure. Then ask
> two follow-up questions: (1) what happens if a candidate's name
> contains a pipe character? (2) HireTrack needs to add a "posting ID"
> field to every record — how many lines of existing code need to
> change?
>
> On the connection to Module 1: the learner applied the checklist to a
> clean problem in Assignment 1. Here they apply it retrospectively. Ask:
> if the developer who built this had run the checklist before writing
> the first line, at which question would they have known a list of
> strings was wrong?

**Suggested milestones:**

1. **Read the structure** — examine the flawed structure in Section 3
   without modifying it. Describe in plain language what it contains
   and what operations it appears to support.
2. **Run the checklist retrospectively** — apply the five checklist
   questions as if you were the developer who built this structure. At
   which question does the list-of-strings choice become hard to
   justify?
3. **Name the cost of each operation** — for each of the following,
   describe what the current structure requires and name the cost:
   (a) find a candidate by ID; (b) update a candidate's current stage;
   (c) add a new field to all records; (d) check whether a candidate
   with a given email already exists. Use O(1)/O(n) vocabulary.
4. **Propose the replacement** — write the replacement structure using
   the design you would have produced from a clean checklist run. Use
   the same sample data.
5. **Compare** — for each of the four operations above, write the
   equivalent operation in your new structure. How many lines? How many
   steps? Is any operation harder in the new structure than in the old?

**Design questions to surface before starting:**

- The flawed structure uses `|` as a separator. Candidate "Sarah
  O'Brien|Contract" submits an application. What happens when you split
  her record on `|`?
- The original developer may have been thinking about storage — writing
  records to a file or a database column — not about in-memory
  operations. Does that justify the choice for an in-memory collection?
  What is the distinction between a storage representation and a runtime
  structure?
- Your replacement structure uses more memory per record than a string.
  At what scale might that matter? At what scale does the O(n) lookup
  cost of the list-of-strings become a larger concern?

**Topics:**

- [ ] Structure diagnosis — reading an existing structure and asking:
  what was this intended to do, and what does it make expensive? the
  selection checklist applies retrospectively — start from "do I need
  to look up by ID?" and trace whether the current structure supports
  that at O(1) or forces a scan
- [ ] The cost of parsing — storing structured data as formatted strings
  requires parsing before every read and serialising before every write;
  the parser becomes a hidden dependency that breaks when a field value
  contains the separator character; structured types (dicts, objects)
  are the correct in-memory representation for structured data
- [ ] Premature representation — designing a structure for how data will
  eventually be stored (file format, database column) rather than for
  how it will be used at runtime; a common source of poor in-memory
  structure choices; *Paradigm shift: the instinct is to store data in
  the format you will eventually write it out in. The shift: the
  in-memory structure should match how the code uses the data, not how
  the storage layer expects it.*

---

#### Assignment 4: Full Design from Requirement

Open `core/courses/dsa-fundamentals/references/HIRETRACK-DSA-SCENARIOS.md`, Section 4 (The Reporting Dashboard).
HireTrack needs a new reporting feature: for each job posting, show how
many candidates are currently at each pipeline stage. Your job is to
read the requirement, apply the selection checklist top-down to derive
the full structure, and trace one write operation and one read operation
through it to verify correctness.

> **Note for learners and tutors:** This assignment is the course
> synthesis. Do not tell the learner which structure to use — let the
> checklist lead them there. The correct answer is a nested structure:
> an outer dict keyed by posting ID, with an inner structure mapping
> stage names to either a count or a list of candidate IDs. Both inner
> designs are defensible; the reasoning matters more than the choice.
>
> The verification mechanic: once the learner has a design, give them
> two operations to trace: (1) candidate C003 advances from Screened to
> Phone Interview — update the dashboard; (2) the recruiter opens the
> dashboard for posting P001 — produce the stage breakdown. If the
> structure cannot support both cleanly, something is missing.
>
> On the two inner designs: if the inner structure maps stage → count,
> reading the total is O(1) but an update requires knowing both the
> candidate's old stage and their new stage (to decrement and increment).
> If it maps stage → list of candidate IDs, you can update by appending
> and removing, but reading a total requires `len()`. Ask the learner
> which operation this dashboard will perform more often — reads are
> likely far more frequent than updates — and let that reasoning drive
> the choice. Accept either design if the reasoning is sound.

**Suggested milestones:**

1. **Read the requirement** — before designing anything, read Section 4
   carefully. Write down: what question does this feature need to answer?
   Who reads it, who writes it, and which operation happens more often?
2. **Apply the checklist top-down** — run the checklist on the outer
   collection: what is one item? what is the identifier? do items
   repeat? Choose the outer structure. Then treat the value at each
   outer key as a new sub-problem and run the checklist again.
3. **Choose between two inner designs** — the inner structure can map
   stage names to counts (`{"Applied": 3, "Screened": 1}`) or to lists
   of candidate IDs (`{"Applied": ["C001", "C002", "C003"]}`). Write
   both designs using the sample data. Name the trade-off: what does
   each make easy, and what does each make harder?
4. **Commit to one design** — choose one inner design and state your
   reasoning. Reference which operation — reading the total per stage
   or updating on a transition — this feature performs more often.
5. **Trace a write operation** — candidate C003 advances from Screened
   to Phone Interview on posting P001. Show every field in your
   structure that changes, and write the Python statements that make
   those changes.
6. **Trace a read operation** — the recruiter opens the dashboard for
   posting P001. Write the Python statement(s) that produce the stage
   breakdown. Show the output.

**Design questions to surface before starting:**

- The dashboard maps posting ID → stage → count (or list). The UI
  also needs to display posting titles, not just IDs. Does the title
  belong inside the dashboard structure, or should it be looked up
  separately from the postings collection designed in Assignment 2?
  What is the trade-off between the two approaches?
- A candidate is rejected and leaves the active pipeline. Does your
  dashboard structure need to be updated? What operation removes a
  candidate from the stage they were in?
- A teammate suggests caching the dashboard as a flat list of tuples:
  `[("P001", "Applied", 3), ("P001", "Screened", 1), ...]`. For which
  query is the flat list competitive with the nested dict? For which
  query does the nested dict win?

**Topics:**

- [ ] Top-down structure design — start with the outermost container and
  apply the checklist; once the outer structure is chosen, treat each
  value as a new sub-problem and apply the checklist again; nest only
  as deep as the problem requires; stop when the values are primitives
  or well-known types
- [ ] Read-write trade-offs — a structure optimised for fast reads may
  require more bookkeeping to update; a structure optimised for fast
  updates may require more work to query; the right balance depends on
  the operation the feature performs most often — read the requirement
  before committing to a design
- [ ] Stack and queue (awareness) — stack: last-in-first-out; used for
  undo histories, call stacks, and depth-first traversal; queue:
  first-in-first-out; used for job queues, message brokers, and
  breadth-first traversal; both are list variants with constrained
  access patterns — the constraint is the point, not the data type;
  Python's `collections.deque` supports both efficiently
- [ ] Trees and graphs (awareness) — tree: hierarchical structure,
  each node has one parent and zero or more children; used for file
  systems, organisation charts, and parse trees; graph: nodes with
  edges that can be many-to-many, directed, or weighted; used for
  social networks, routing, and dependency resolution; named here as
  the structures you reach for when a dict-of-dicts stops being
  sufficient; both are out of scope for this course

---

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these in 1-on-1s to probe for
> genuine understanding. Do not accept "I know it" — ask for a
> demonstration using the reference data or a concrete example.

**After Assignment 1:**

- New requirement: "store the set of email addresses that have already
  received an application confirmation, so duplicates can be rejected."
  Run the selection checklist out loud. At which question does the
  right structure become obvious?
- Your roster is a dict keyed by candidate ID. A new query arrives:
  "find all candidates whose current stage is Phone Interview." Is the
  dict the right structure for this query? What does it cost? What
  would you change about the structure to make this query cheaper?
- O(1) and O(n) describe how cost grows as collection size increases,
  not the cost at any specific size. A roster of five candidates makes
  both indistinguishable. At what roster size does the difference
  become a practical concern for HireTrack?

**After Assignment 2:**

- Walk me through the Python statements that record a stage transition
  for C001 from Applied to Screened. How many lines? How many dict
  accesses? If a transition required six separate lookups, what would
  that tell you about the design?
- Your structure stores a posting_id reference inside the candidate
  record. A colleague says: "just embed the full notification setting
  inside the candidate — then you don't need a second lookup." Posting
  P001 has 200 candidates. The recruiter changes the notification
  setting. What does the colleague's design require?
- Stage history is a list: `["Applied", "Screened"]`. I need to know
  whether candidate C001 was ever in the On-site stage. What does a
  list require for this check? Is there a structure where this is O(1)?

**After Assignment 3:**

- The flawed structure stores records as pipe-separated strings. At
  which checklist question does this choice fail? What would the
  developer have needed to believe about the primary operation to have
  made this choice rationally?
- You redesigned the roster as a dict of dicts. Name one operation that
  was simpler in the old structure. Does that simplicity justify the
  old design? Why or why not?
- "Premature representation" means designing for storage format rather
  than usage pattern. Give me one example — from your own experience or
  a hypothetical — where this mistake would be easy to make.

**After Assignment 4:**

- You chose between stage → count and stage → list-of-IDs. Walk me
  through the update operation for a stage transition in each. Which
  one requires knowing the candidate's previous stage, and why?
- Your dashboard answers: "how many candidates at each stage per
  posting?" I add a new query: "total candidates per posting." Does
  your structure already support this? What single operation produces
  the answer?
- Trees and graphs are out of scope for this course. Describe, in plain
  English, what kind of HireTrack feature would push you past nested
  dicts and require a graph structure. There is no single right answer
  — the reasoning is what matters.

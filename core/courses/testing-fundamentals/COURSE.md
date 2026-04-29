---
title: 'Testing Fundamentals'
slug: 'testing-fundamentals'
version: '1.0'
domain: 'software-engineering'
level: 'beginner'
target-audience: >
  Early-career engineers and analysts who need to think systematically
  about test design. No prior testing experience or test automation
  background required. Familiarity with software development concepts
  (inputs, outputs, conditions, and system state) is assumed. Completing
  agile-fundamentals first provides useful context — the HireTrack system
  introduced there is the domain for this course — but is not a hard
  prerequisite.
prerequisites:
  - 'Basic familiarity with software development (inputs, outputs, conditions)'
  - 'Recommended: agile-fundamentals (HireTrack context)'
tags:
  - testing
  - test-design
  - equivalence-partitioning
  - boundary-value-analysis
  - state-transition
  - decision-table
  - coverage
author: 'Upstack'
created: '2026-04-26'
updated: '2026-04-26'
ai-tools:
  - 'claude-code'
tutor-contract: 'core/meta/TUTOR-CONTRACT.md'
featured: true
estimated-hours: 8
---

# Testing Fundamentals

Testing is a thinking discipline before it is a tool discipline. The
question that defines test design is not "how do I run this?" but "which
inputs reveal whether the system behaves correctly, and which inputs are
redundant?"

Most engineers test by intuition — entering plausible values, checking
the happy path, and calling the feature done. That approach misses the
boundaries where most defects live. It tests the same behaviour many
times under different names. And it produces a test suite that grows in
size while offering diminishing returns in confidence.

Systematic test design replaces intuition with technique. Each technique
this course covers answers the same underlying question — what to test —
but for a different shape of system behaviour: inputs with discrete
ranges, systems that move between states, logic that depends on
combinations of conditions. By the end you will be able to read a
specification, select the right technique, and produce a test design
that a colleague can review, extend, and reason about.

## What You Will Learn

By the end of this course you will be able to look at a system
specification and produce a structured test design — not a list of
things to click, but a reasoned selection of scenarios that together
verify the system behaves correctly at its boundaries, in its key
states, and across its conditional logic. You will also be able to
assess a set of test cases against code and identify which execution
paths they leave untested.

## Learning Objectives

- Distinguish white-box, grey-box, and black-box testing and identify
  which applies in a given context
- Explain the test pyramid and describe when to invest at each level
- Apply equivalence partitioning to divide an input space into
  meaningful groups and select representative test cases
- Apply boundary value analysis to identify the values most likely to
  reveal defects at partition boundaries
- Construct a state transition diagram for a system with defined states
  and derive test cases for valid transitions, invalid transitions, and
  terminal state behaviour
- Build a decision table for multi-condition logic, identify
  combinatorial explosion, and apply pairwise reduction to produce a
  practical test set
- Manually assess statement coverage and branch coverage for a short
  code snippet and identify which execution paths are untested
- Write test scenarios, test cases, and a brief test summary report
  using consistent structure

## Course Structure

All assignments use the HireTrack applicant tracking system as the
system under test. The specification is in
`core/courses/testing-fundamentals/references/HIRETRACK-SPEC.md`.
Assignment 4 adds a short Python snippet from the library domain used
in `code-quality-fundamentals`. No running code or test framework is
required — this course is about test design, not test automation.

---

### Module 1: Thinking About Testing

Before reaching for a technique, establish the vocabulary and mental
models that make technique choices meaningful. This module introduces
the testing workflow — from scenario identification through to
reporting — and the two most fundamental test design techniques:
equivalence partitioning and boundary value analysis.

The core insight: most inputs to a system trigger identical behaviour
unless they cross a boundary. A form that rejects names shorter than
two characters behaves the same way for `""` as it does for `"X"`.
Testing both adds cost with no new information. Testing one value from
each behavioural group — and the exact boundaries between groups — is
how you get the most information from the fewest test cases.

#### Assignment 1: Partition the Input

Open `core/courses/testing-fundamentals/references/HIRETRACK-SPEC.md`, Section 1 (Application Intake Form). Your
job is to design a test set for the form's input fields using
equivalence partitioning and boundary value analysis. Produce: a
partition table for each field, a boundary table, and a set of test
cases with meaningful test data.

> **Note for learners and tutors:** This is a written test design
> assignment — no form to submit, no code to run. The learner produces
> a structured document: partitions, boundaries, and test cases.
>
> The verification mechanic: for each partition, ask the learner to name
> one value they would NOT pick as a representative, and explain why.
> If they cannot — or if they list many values from the same partition —
> they have not yet understood that the partition defines equivalence:
> any representative from the group is as informative as any other.
>
> On test data: watch for learners who use "test", "abc", or "zzzddd"
> as input values. Ask: what partition does "zzzddd" belong to? Is there
> anything special about it compared to "hello"? The answer — no —
> reveals that both are from the same valid-name partition, so only one
> is needed, and it should be a value that makes the test case readable:
> "Alice Chen", not "zzzddd".
>
> On negative paths: learners often skip them because the form
> "probably rejects them anyway." Ask: which path surfaces more defects
> in practice — the path the developer tested during implementation, or
> the path they assumed wouldn't be reached?

**Suggested milestones:**

1. **Name the partitions** — for each input field in the form, identify
   the valid partition (inputs the system should accept) and the invalid
   partitions (inputs the system should reject). A field with a minimum
   and maximum creates at least three partitions: below the minimum,
   within range, above the maximum. Identify any additional partitions
   the field's type or format rules create.
2. **Map the boundaries** — for each partition boundary, identify the
   exact boundary values: the last value in the valid partition, the
   first value outside it. These are the values most likely to reveal
   off-by-one errors and incorrect comparisons.
3. **Select representatives** — choose one representative value from
   each partition. The representative should be unambiguously within the
   partition — not at the edge. The edge is a boundary case and belongs
   to the boundary table, not the representative table.
4. **Write the test cases** — combine partitions and boundaries into
   test cases. Each test case states: the input values, the expected
   outcome, and the partition or boundary it represents. Use meaningful
   test data: "Alice Chen" tells a reader what partition is being
   tested; "zzzddd" does not.
5. **Cover negative paths** — for each invalid partition, write at
   least one test case that verifies the system correctly rejects the
   input. State the expected error message.

**Design questions to surface before starting:**

- The name field accepts 2–100 characters. How many partitions does
  this create? Draw them. Where are the boundaries? Which boundary
  value is most likely to reveal a defect — 1, 2, 3, 99, 100, or 101?
- A CV upload must be a PDF and must be under 5 MB. How many partitions
  does the file type rule create? How many does the size rule create?
  Are these independent, or do they interact — and if they interact,
  does that change how many test cases you need?
- "zzzddd" and "Alice Chen" are both valid names between 2 and 100
  characters. Are they in the same partition? If yes, what is the value
  of choosing one over the other?

**Topics:**

- [ ] Test scenarios, cases, scripts, and execution — the testing
  workflow from identification to reporting; a *scenario* is a
  situation to test ("the form rejects a name that is too short"); a
  *case* adds specific data (name = "X", expected: error message); a
  *script* adds execution steps (navigate to form, enter "X", click
  Submit, verify error message text); *execution* is running the script
  against the system; a *report* summarises what passed, what failed,
  and what the failures mean for release
- [ ] White-box, grey-box, and black-box testing — black-box: test
  against the specification only, no knowledge of the implementation
  (Assignments 1–3 in this course are black-box); white-box: use
  knowledge of the code to design tests (Assignment 4); grey-box: know
  the architecture and data flow but not the implementation detail —
  most real-world test design is grey-box
- [ ] The test pyramid — unit tests at the base (fast, isolated, many),
  integration tests in the middle (fewer, slower, verify components
  together), end-to-end tests at the top (fewest, slowest, highest
  user-facing confidence); the pyramid shape is a cost-to-confidence
  guide, not a rule; invest heavily at the base because defects are
  cheapest to find and fix there; *Paradigm shift: the instinct is to
  test features end-to-end because that is how a user experiences them.
  The shift: most defects are found earlier and fixed faster at the
  unit level — end-to-end tests verify integration, not logic.*
- [ ] Equivalence partitioning — dividing an input space into groups
  (partitions) where every value in the group triggers the same system
  behaviour; testing one representative from each partition is as
  informative as testing every value in it; reduces test count without
  reducing coverage; applies to any system with bounded or categorised
  inputs
- [ ] Boundary value analysis — testing at the edges of equivalence
  partitions because the boundary is where off-by-one errors and
  incorrect comparisons are most likely to appear; for each boundary,
  test the last valid value and the first invalid value; *Paradigm
  shift: the instinct is to test "typical" values and avoid the edges
  as unlikely. The shift: boundaries are where most defects live — the
  developer almost certainly tested the typical case; they may not have
  tested exactly 100, exactly 101.*
- [ ] Happy path and negative paths — the happy path: valid inputs
  produce the expected outcome; negative paths: invalid inputs,
  boundary violations, and unexpected combinations; negative paths
  surface more defects per test case than happy-path variations because
  they exercise assumptions the developer may not have explicitly
  considered
- [ ] Meaningful test data — test data should communicate the partition
  it represents; use values a reader can immediately interpret
  ("Alice Chen" for a valid name, `""` for an empty name, a
  101-character string for the above-maximum case); placeholder values
  like "zzzddd" or "test123" obscure which partition is being tested
  and make failures harder to diagnose

---

#### Assignment 2: Map the States

Open `core/courses/testing-fundamentals/references/HIRETRACK-SPEC.md`, Section 2 (Pipeline Stage Transitions). The
HireTrack pipeline is a state machine: a candidate begins in Applied
and moves through defined states until reaching a terminal state. Your
job is to draw the state transition diagram and derive a test set that
covers valid transitions, invalid transitions, and terminal state
behaviour. Express your diagram as a Mermaid `stateDiagram-v2` block —
this keeps the artefact text-based and renderable in any markdown viewer
or directly in this tutor interface.

> **Note for learners and tutors:** State transition testing requires
> the learner to model the system explicitly — the diagram comes first.
> A learner who jumps straight to test cases without drawing the diagram
> is guessing, not designing.
>
> The verification mechanic: ask the learner to identify every terminal
> state. Then ask: what happens if you attempt to advance a candidate
> who is already in a terminal state? If the spec does not say, ask:
> is "the spec is silent on this" a reason not to write a test case,
> or a reason to write one?
>
> On invalid transitions: learners often omit these because "the UI
> won't let you do that." Push back: systems are not only accessed
> through the UI; API calls, data imports, and bugs in the UI can
> produce invalid transitions. The test case documents the expected
> behaviour — which is always either a rejection with a clear error, or
> a system that prevents the transition by design.
>
> **On Mermaid:** If the learner is unfamiliar with Mermaid syntax,
> introduce it before they start the modelling work — do not let syntax
> friction block the thinking. Share a small example from a different
> domain so they see the pattern without being given the HireTrack
> answer. A door lock works well:
>
> ```
> stateDiagram-v2
>     [*] --> Locked
>     Locked --> Unlocked : unlock
>     Unlocked --> Locked : lock
>     Unlocked --> Open : open
>     Open --> Unlocked : close
> ```
>
> A two-stage workflow with a terminal state is a useful second example
> if the learner needs to see how `[*]` works for terminals:
>
> ```
> stateDiagram-v2
>     [*] --> Pending
>     Pending --> Approved : approve
>     Pending --> Rejected : reject
>     Approved --> [*]
>     Rejected --> [*]
> ```
>
> Point the learner to these resources before they start:
>
> - **Live editor:** https://mermaid.live — draft and preview the
>   diagram here, then paste the source block into their submission
> - **State diagram syntax reference:**
>   https://mermaid.js.org/syntax/stateDiagram.html
> - Mermaid also renders natively in VS Code (Markdown Preview Mermaid
>   Support extension), GitHub, and this tutor interface — so the
>   submitted source block will display as a diagram when reviewed

**Suggested milestones:**

1. **Identify all states** — list every state the HireTrack pipeline
   defines. Mark each as: initial (where a new candidate begins),
   intermediate (can be entered and exited), or terminal (once entered,
   cannot be exited).
2. **Draw the transitions** — write your diagram as a Mermaid
   `stateDiagram-v2` block. For each valid transition, add an arrow
   from the source state to the destination state, labelled with the
   action name. Draft in https://mermaid.live if you want a live
   preview, then paste the source into your submission.
3. **Identify invalid transitions** — identify at least four: a
   backward transition, a stage-skipping transition, an advance from a
   terminal state, and a self-transition (advancing to the current
   state). These are test cases for the system's guard logic.
4. **Derive the test cases** — from the diagram, write a test case for
   every valid transition arrow and every invalid transition you
   identified. Each case states: the starting state, the action taken,
   and the expected outcome (the next state, or the error the system
   should produce).
5. **Terminal state coverage** — for each terminal state, write at
   least two test cases: one that reaches it via a valid path, and one
   that attempts to advance from it.

**Design questions to surface before starting:**

- The spec defines both Hired and Rejected as terminal states. A
  candidate can reach Rejected from the Offer stage or from the Applied
  stage. Should these be two separate test cases or one? What is
  different about them?
- A backward transition — moving a candidate from Screened back to
  Applied — is not listed in the valid transitions table. Does that
  mean the system prevents it, or that the spec has not said what
  happens? What should a test case for this transition expect?
- If you only tested the valid forward transitions, what category of
  defect would your test set completely miss?

**Topics:**

- [ ] State transition testing — a technique for testing systems that
  can be in one of a finite set of states, where transitions between
  states are triggered by defined actions; derives test cases by asking:
  which transitions are valid, which are invalid, and what happens at
  terminal states?
- [ ] State transition diagrams — a visual model of states (nodes),
  transitions (arrows), and the actions that trigger them; drawing the
  diagram before writing test cases makes implicit assumptions in the
  spec visible; the diagram is the design artefact — test cases follow
  from it
- [ ] Valid and invalid transitions — valid: transitions the system
  should allow and execute; invalid: transitions the system should
  reject; both require test cases; omitting invalid transition tests
  leaves the system's guard logic entirely unverified
- [ ] Terminal states — states from which no further transition is
  possible; a system that allows transition out of a terminal state has
  a defect; always test that terminal states are genuinely terminal
- [ ] When to use state transition testing — systems with well-defined
  lifecycle states: order management, ticket workflows, hiring
  pipelines, user account statuses, shopping carts; when the spec
  defines "a [thing] can be in one of the following states", that is
  a signal to reach for this technique

---

### Module 2: Systematic Design and Coverage

The techniques in Module 1 work when each input dimension can be
analysed independently. Some features depend on combinations of
conditions — who gets notified depends on which stage is entered AND
whether the posting has a particular setting enabled. The number of
possible combinations grows multiplicatively. A spec with five
independent binary conditions has thirty-two possible combinations;
testing all of them is impractical and usually unnecessary.

Decision tables make the combinations explicit and structured. Pairwise
testing provides a principled way to select a smaller subset that still
covers all two-way interactions. Coverage metrics add a different lens:
not "what should I test?" but "what code paths have I actually
exercised?"

#### Assignment 3: The Decision Table

Open `core/courses/testing-fundamentals/references/HIRETRACK-SPEC.md`, Section 3 (Email Notification Rules). The
notification rules depend on two conditions that interact. Your job is
to model these rules as a decision table, identify the full set of
combinations, apply pairwise reduction to produce a practical test set,
and design a brief test summary report template for this feature.

> **Note for learners and tutors:** Decision tables are most valuable
> when a learner encounters a specification they cannot fully hold in
> their head. The construction process — listing conditions, enumerating
> combinations, filling in actions — makes the implicit logic explicit
> and forces every combination to be considered.
>
> The verification mechanic: after the learner builds the table, ask
> them to find combinations where the notification setting has no effect
> on the outcome. If they find them, ask: what does pairwise testing say
> you should do with rows that produce the same outcome regardless of
> one condition's value? The answer shows why pairwise reduction is not
> a trick — it is a consequence of reading the table.
>
> On the test summary report: a test summary is not a list of test
> cases. It answers a business question: is this feature ready to
> release? Ask the learner to write one paragraph that would let a
> product manager make a go/no-go decision without reading the
> individual test cases.

**Suggested milestones:**

1. **Identify the conditions** — list every condition that affects the
   notification outcome. A condition is a variable in the spec with two
   or more possible values. For each condition, list all its possible
   values. Calculate the total number of combinations.
2. **Identify the actions** — list every possible notification action
   (each recipient type is a separate action). Your table will have one
   row per action in the actions section.
3. **Build the full table** — enumerate all condition combinations as
   columns. For each combination, fill in which actions apply (Y/N per
   action). Look for columns where one condition's value makes no
   difference to any action.
4. **Apply pairwise reduction** — identify which combinations can be
   collapsed or omitted without losing coverage of all two-way
   condition interactions. State: how many test cases before reduction,
   how many after, and why the reduction is valid.
5. **Design the test summary template** — create a one-page test summary
   report structure for the email notifications feature. Include fields
   for: feature under test, test scope, test case count, pass/fail
   summary, severity of any failures, and a release recommendation
   section. You do not need to fill in results — design the structure
   so a tester can complete it after a test run.

**Design questions to surface before starting:**

- Condition A (stage entered) has five possible values. Condition B
  (notification setting) has two. How many columns does the full
  decision table have?
- After building the table, look at the four non-Rejected stages. Does
  the value of the notification setting change any action for those
  stages? What does that tell you about how many test cases you need
  for them?
- A test summary report says "14 of 15 test cases passed." Is that
  enough information to make a release decision? What else must the
  report contain?

**Topics:**

- [ ] Decision tables — a technique for testing multi-condition logic;
  conditions are listed with their possible values, all combinations
  are enumerated as columns, and actions are marked Y/N per column;
  each column is one test case; the table makes implicit combinations
  explicit and ensures no combination is overlooked; most useful when
  the spec contains two or more interacting conditions
- [ ] Combinatorial explosion — the number of combinations grows
  multiplicatively: two binary conditions produce four combinations;
  ten binary conditions produce 1,024; for most real features, testing
  all combinations is impractical and the information gained from
  additional cases diminishes quickly
- [ ] Pairwise testing — a reduction strategy that selects the minimum
  set of test cases covering all two-way combinations of condition
  values; most defects arise from single conditions or interactions of
  two conditions, not from three-way or higher interactions; tools
  exist to generate pairwise sets automatically, but the technique can
  be applied by inspection on small tables; *Paradigm shift: the
  instinct is that fewer tests means less confidence. The shift:
  pairwise reduction removes redundant tests — tests that cover
  combinations you have already covered — not tests that cover
  behaviour you haven't verified.*
- [ ] Data-driven testing (awareness) — running the same test logic
  against multiple data sets, with inputs and expected outputs defined
  separately; a decision table is the natural precursor — each column
  becomes one data row; executing this pattern requires a test
  framework, but recognising when test logic is repeated with different
  inputs is a design discipline that applies at this level
- [ ] Test summary report — a structured summary of a test pass: scope
  (what was tested), test case count, pass/fail breakdown, severity of
  failures, and a recommendation for the release decision; written for
  a product manager or QA lead, not a developer; one page is usually
  enough; *Paradigm shift: the instinct is to report effort ("I ran 30
  tests"). The shift: the audience needs a decision — the report should
  answer "is this feature ready to ship?" not "how busy was the
  tester?"*

---

#### Assignment 4: A Coverage Exercise

Open `core/courses/testing-fundamentals/references/COVERAGE-SNIPPET.md`. The file contains a short Python
function from the library domain and two provided test cases. Your job
is to manually trace which statements and which branches each test case
exercises, identify what is missing, write the test case that closes
the gap, and reflect on what coverage measures — and what it does not.

> **Note for learners and tutors:** Coverage analysis is often taught
> abstractly. This assignment makes it concrete: the learner traces
> execution line by line, marks what is and is not hit, and discovers
> the gap by inspection. The gap should be obvious once both traces are
> complete.
>
> The verification mechanic: ask the learner to state in one sentence
> what "100% branch coverage" means for this function. Then ask: if you
> achieved 100% branch coverage but all your test data used the same
> value for `member_type`, what defect would you miss? This surfaces
> the key limit: coverage measures which code was executed, not whether
> the assertions were correct.
>
> On the connection to Module 1: ask whether applying equivalence
> partitioning to `member_type` would have naturally produced the
> missing test case, even without looking at the code. It should —
> which shows that EP and coverage analysis are complementary, not
> competing approaches.

**Suggested milestones:**

1. **Number the branches** — read the function and annotate every
   decision point. For each `if` statement, label the True branch and
   the False branch. Count the total number of branches.
2. **Trace test case A** — walk through the function with test case A's
   inputs. Show your working: calculate `days_held`, `days_overdue`,
   and `fine` at each step. Mark which statements are executed and
   which branch is taken at each decision point.
3. **Trace test case B** — repeat for test case B. Note: does execution
   reach the second `if` statement? Why or why not?
4. **Identify the gap** — looking at both traces together: which
   statement is never executed by either test case? Which branch is
   never taken? State the gap precisely — name the condition and the
   outcome that is untested.
5. **Write the missing test case** — write test case C: specify
   `loan_date`, `return_date`, `member_type`, and the expected result.
   Calculate the expected result by hand. State which previously
   uncovered branch it exercises.
6. **Reflect** — with test cases A, B, and C you have 100% branch
   coverage. Answer the three reflection questions in the worksheet.

**Design questions to surface before starting:**

- Test case A and test case B together reach every line in the function
  except one. How can two tests cover almost every statement while
  missing an entire branch? What is the structural difference between a
  statement and a branch?
- Would applying equivalence partitioning to `member_type` — treating
  it as a black-box input with distinct categories — have produced test
  case C naturally, before you even looked at the code? What does that
  suggest about the relationship between black-box design and white-box
  coverage?
- A team reports 90% branch coverage on their codebase. Is that a
  good sign or a concerning one? What additional information would you
  need to answer that question?

**Topics:**

- [ ] Statement coverage — the percentage of executable statements
  exercised by a test set; a baseline metric; 100% statement coverage
  means every line was reached at least once — it does not mean every
  decision outcome was tested
- [ ] Branch coverage — the percentage of decision outcomes (True and
  False branches of every condition) exercised by a test set; stronger
  than statement coverage; a test set can achieve 100% statement
  coverage while covering only one branch of every condition; also
  called decision coverage
- [ ] Path coverage — coverage of every unique execution path through a
  function; stronger than branch coverage; the number of paths grows
  exponentially with the number of conditions; full path coverage is
  often infeasible except for very short functions; named here as the
  limit that branch coverage approaches but cannot reach
- [ ] What coverage measures and does not measure — coverage measures
  which code was executed; it does not measure whether the assertions
  were correct, whether the test data was representative, or whether
  the right questions were asked; a test suite with incorrect expected
  values can achieve 100% coverage while detecting nothing; *Paradigm
  shift: the instinct is to treat coverage percentage as a quality
  score. The shift: coverage is a completeness metric, not a
  correctness metric — it tells you what you executed, not whether your
  tests were any good.*
- [ ] Function and condition coverage (awareness) — function coverage:
  whether each function was called at least once (weaker than statement
  coverage); condition coverage: whether each boolean sub-expression in
  a compound condition was evaluated both True and False independently
  (complements branch coverage for compound conditions); part of the
  coverage vocabulary but less commonly used as a primary metric at
  this level

---

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these in 1-on-1s to probe for
> genuine understanding. Do not accept "I know it" — ask for a
> demonstration or a concrete example from the reference material.

**After Assignment 1:**

- Point to one row in your boundary table. Read it aloud. Explain: why
  is this specific value more likely to reveal a defect than a value
  three positions away from the boundary?
- You chose "Alice Chen" as a representative for the valid-name
  partition. I choose "John Smith". Are we testing different things?
  Why or why not?
- Your partition table has three partitions for the name field. I claim
  there are four. What fourth partition might I be thinking of, and
  would it require a separate test case?

**After Assignment 2:**

- Draw the HireTrack state transition diagram from memory. Mark every
  terminal state. Now: the spec does not say what happens when you
  attempt to move a Hired candidate to Screened. What should your test
  case expect, and why is "the spec doesn't say" not an acceptable
  answer?
- You wrote test cases for valid transitions. Now I remove all of them
  and keep only the invalid transition test cases. What category of
  defect am I now unable to detect?
- A candidate is Rejected from the Offer stage. A candidate is Rejected
  from the Applied stage. You have two test cases for this. Are they
  testing the same thing? Name what is different.

**After Assignment 3:**

- Walk me through one column in your decision table where the
  notification setting has no effect on the actions. How did you handle
  that column in your pairwise reduction, and why is the reduction
  valid?
- Your test summary report recommends release. One test case failed.
  What information in the report determines whether that failure blocks
  release?
- What is the difference between a decision table with ten columns and
  a pairwise test set derived from it? What do you lose, and what do
  you gain?

**After Assignment 4:**

- Before you added test case C, you had 100% statement coverage of the
  lines that were reachable. You did not have 100% branch coverage.
  Explain the difference to someone who has never seen a coverage
  report.
- You now have 100% branch coverage. I have introduced a bug: the
  function applies the student discount to staff members instead. Would
  your three test cases catch it?
- Name a defect type that branch coverage catches that statement
  coverage misses. Name a defect type that no coverage metric can
  detect. Name one situation where pursuing 100% coverage is the
  wrong goal.

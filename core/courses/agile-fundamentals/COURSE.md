---
title: 'Agile Fundamentals'
slug: 'agile-fundamentals'
version: '1.0'
domain: 'engineering-practices'
level: 'novice'
target-audience: >
  Fresh graduates and early-career professionals joining a software team for
  the first time. No prior experience with agile methods, Scrum, or project
  management frameworks required. No technical background assumed — this
  course is equally accessible to engineers, designers, QA analysts, and
  anyone else joining a product team.
prerequisites: []
tags:
  - agile
  - scrum
  - product-backlog
  - team-practices
  - iterative-delivery
author: 'Upstack'
created: '2026-04-26'
updated: '2026-04-26'
ai-tools:
  - 'claude-code'
tutor-contract: 'core/meta/TUTOR-CONTRACT.md'
featured: true
estimated-hours: 6
---

# Agile Fundamentals

Agile is not a process you follow — it is a posture toward uncertainty. In
complex work, you cannot plan everything upfront because the plan will be
wrong before you finish writing it. The only honest response is to fix what
you can (the team, the time, the rhythm) and let scope vary. Everything else
— the backlog, the milestones, the retrospectives — is a mechanism for
operationalising that one idea.

This course teaches agile the way you will actually encounter it: as a new
team member reading a backlog that already exists, learning to contribute to
it, and making sense of how work gets prioritised and delivered. Scrum is
introduced as one common way teams operationalise these ideas — not as the
thing itself.

## What You Will Learn

By the end of this course you will be able to orient yourself on a software
team practicing agile methods. You will know how to read a backlog, identify
work that is not ready to be picked up, reason about where unexpected work
belongs, and reflect on what a milestone taught the team. You will not have
memorised a framework. You will have practised the reasoning that makes any
framework work.

## Learning Objectives

- Read a product backlog and reconstruct the team's current priorities and recent decisions
- Identify a task that is not ready to be started and rewrite it so that it is
- Reason about where unplanned work belongs relative to existing commitments and capacity
- Reflect on a completed milestone: what delivered value, what did not, and what changes as a result
- Explain why scope — not time or capacity — is the variable in iterative delivery

## Course Structure

All four assignments work with the same reference backlog: a mid-flight
product called HireTrack, an applicant tracking system being built for an
internal team at a scaleup. The reference file is at
`core/courses/agile-fundamentals/references/BACKLOG.md`.

You are not the product owner of HireTrack. You are a new team member
learning to work with the backlog it already has.

---

### Module 1: Reading the Work

Before you can contribute to a team's backlog, you need to be able to read
it fluently. A backlog is not a to-do list — it is a set of prioritised
hypotheses about what matters next. Reading it well means understanding not
just what is there, but what decisions produced it.

#### Assignment 1: Read the Room

You have just joined the HireTrack team. No one has briefed you. Your first
task is to orient yourself from the backlog alone — then write a short brief
for a colleague who has been away for two weeks and needs to show up ready
for tomorrow's standup.

> **Note for learners and tutors:** The brief is the verification artefact
> for this assignment. It is not a summary of the backlog — it is a
> synthesised update that reflects what is happening, what is at risk, and
> what the team is focused on right now. A learner who can write a useful
> brief has understood the backlog. A learner who reproduces item lists has
> only read it.
>
> The verification mechanic: ask the learner to read their brief aloud, then
> ask — "if the colleague heard this and went straight into standup, what
> would they still need to ask?" That gap is the next revision.
>
> Common failure mode: the learner treats the backlog as a fact sheet and
> the brief as a copy-paste. Push for interpretation: what do the in-progress
> items tell you about where the milestone is? What does the Unplanned section
> signal about pressures the team hasn't dealt with yet?

**Suggested milestones:**

1. **First pass** — read the whole backlog without stopping. Note what you understand immediately and what you have to infer. What questions does it raise that the backlog does not answer?
2. **What shipped** — read v0.1.0. In one paragraph, describe what the product could do when v0.1.0 was tagged. What problem did it solve?
3. **What is happening now** — read v0.2.0. Which items are done, in progress, and not started? What is the milestone trying to achieve, and how far along is it?
4. **What is coming and what is unresolved** — read v0.3.0 and Unplanned. What is intended vs committed? What do the Unplanned items reveal about pressures building outside the current milestone?
5. **Write the brief** — write a 3–5 sentence update for the returning colleague. They need to know: what shipped recently, what the team is building right now, and anything they should be aware of before they walk in.

**Design questions to surface before starting:**

- v0.1.0 has one descoped item. What does the `[-]` status tell you that `[ ]` does not? Could a descoped item ever return to the backlog?
- The v0.2.0 milestone has a stated goal. Read it. Now look at the in-progress and not-started items — do all of them serve that goal directly, or are some of them adjacently useful?
- The Unplanned section has four items. None of them have a milestone. What is the difference between "unplanned" and "won't do"?

**Topics:**

- [ ] What a product backlog is — a prioritised list of work ordered by value; not a to-do list, not a contract, not a promise; *Paradigm shift: the instinct is to read a backlog as a plan ("this is what will happen"). The shift: a backlog is a hypothesis about what matters next — and hypotheses keep arriving, which is what the Unplanned section shows.*
- [ ] Milestone and release thinking — grouping work into shippable increments with a shared goal; the difference between a milestone (a goal) and a sprint (a time-box); why "shipped" is not the same as "done being useful"
- [ ] Status markers — what done / in progress / todo / descoped communicate; reading the mix in a milestone to estimate where the team is
- [ ] Unplanned as a staging area — new work lands here before it is evaluated and placed; the placement decision is itself a form of prioritisation
- [ ] Scrum vocabulary (orientation) — sprint, backlog, sprint review, retrospective, standup; introduced as "one way teams operationalise these ideas," not as the course subject

---

#### Assignment 2: A Task Has a Problem

One item in the v0.2.0 milestone cannot be picked up without a
conversation first. Find it, name what is ambiguous, and rewrite it so that
a developer could start work on it tomorrow without asking anyone anything.

> **Note for learners and tutors:** The target item is "Email notifications
> on stage transition" — it has multiple unresolved decisions embedded in a
> single line: which stages trigger a notification, who is notified, what
> the notification contains, and what counts as a stage transition. A learner
> who rewrites the item as a slightly longer description has not understood
> the exercise. Acceptance criteria are testable conditions, not intentions.
>
> The blank-colleague test is the verification mechanic: give the rewritten
> item to someone unfamiliar with the backlog. If they can describe what the
> feature does and say when it is done — without asking any questions — the
> criteria are sufficient. If they ask anything, that question identifies the
> next gap.
>
> Common failure mode: acceptance criteria written as "should" statements
> ("the system should send an email"). Push the learner to convert every
> "should" to a testable "when X happens, Y is true." If it cannot be tested,
> it is not a criterion.

**Suggested milestones:**

1. **Find the problem item** — read all v0.2.0 items. Identify the one that a developer could not start without asking clarifying questions. List every question they would need answered.
2. **Understand acceptance criteria** — what is the difference between a task description and an acceptance criterion? A description explains what to build. A criterion states a condition that can be tested: "When X happens, Y is true." Not "should" — "is."
3. **Make the decisions** — before writing criteria, answer your own questions. Who should be notified and when? What does the email contain? Which stage transitions trigger it? You are resolving ambiguity, not describing it.
4. **Rewrite the item** — write an updated backlog item with: a clear one-line description, and at least three acceptance criteria in plain "Given / When / Then" form or equivalent.
5. **The blank-colleague test** — give your rewritten item to the tutor cold. They will read it as someone who has never seen the backlog. What do they ask? What do they misunderstand? That is the next revision.

**Design questions to surface before starting:**

- "Email notifications on stage transition" — what does "stage transition" mean exactly? All stages? Candidate-facing stages only? What about moving backwards (from Phone Interview back to Screened)?
- Who is the recipient of the notification — the candidate, the recruiter, the hiring manager, or some combination? Does the answer depend on which stage is involved?
- An acceptance criterion that says "the email should be clear and professional" — why is that not a criterion? What would make it one?

**Topics:**

- [ ] User stories — who wants what and why; "As a [role], I want [capability], so that [outcome]" as a tool for surfacing the user's need; not a rigid template but a thinking scaffold
- [ ] Acceptance criteria — conditions for "done"; testable statements that define when a task is complete; the difference between a description of intent and a verifiable outcome
- [ ] Given / When / Then — a plain-language pattern for writing criteria: Given [some context], When [an action occurs], Then [an observable outcome is true]
- [ ] The blank-colleague test — if someone unfamiliar with the context cannot pick up the task and start work, the task is not ready; *Paradigm shift: the instinct is to write a task when you understand what you want. The shift: a task is a communication artefact — it needs to work for someone who is not inside your head.*
- [ ] Definition of Ready (briefly) — the team's shared standard for what a backlog item needs before anyone starts on it; not a gate, but a checklist

---

### Module 2: Moving the Work

Understanding the backlog is not the same as knowing how to act on it. Work
arrives unexpectedly. Milestones close imperfectly. Teams have to make
decisions about what to do next with fixed capacity and evolving information.
This module is where the core idea of iterative delivery becomes concrete.

#### Assignment 3: Unplanned Arrives

A message arrives from Legal: "GDPR Article 17 gives data subjects the right
to request deletion of their personal data. HireTrack stores candidate data.
We need a written response plan within two weeks. This is a compliance
obligation, not a feature request."

The item is already in the Unplanned section of the backlog. Your job is to
decide where it belongs — and to write the reasoning that justifies the
decision.

> **Note for learners and tutors:** This assignment is where the central idea
> of the course becomes tangible. The team's capacity is fixed: the same
> people, the same number of working days. If GDPR compliance enters the
> current milestone, something else exits it. The learner must name what moves
> — not just that something does.
>
> There is no single correct answer, but there are better and worse reasonings.
> A learner who moves GDPR into v0.2.0 without naming what it displaces has
> not understood the constraint. A learner who pushes it to v0.3.0 without
> acknowledging the compliance risk has not read the item carefully enough.
>
> The verification mechanic: ask "if you made this decision in a team meeting,
> what would the strongest objection be? How would you answer it?" A learner
> who can answer that has genuinely reasoned through the trade-off.
>
> Common failure mode: treating this as a scheduling question ("we'll fit it
> in") rather than a prioritisation question ("what does this displace, and is
> that the right trade?").

**Suggested milestones:**

1. **Read the Unplanned items** — read all four items. For each one: what is it, who raised it, and does it carry a deadline or compliance pressure?
2. **Characterise the GDPR item** — what type of work is this? Feature? Compliance? One-time? Recurring? Does that type affect how it should be prioritised relative to feature work?
3. **Name the options** — three possible placements: add to v0.2.0 (current), add to v0.3.0 (next planned), or leave in Unplanned with a response plan. For each option, state what happens — and what the cost is.
4. **Make the decision and name the displacement** — pick one option. If you move GDPR into a milestone, name explicitly what moves out. If it stays Unplanned, write the response plan (one paragraph: what the team will do, by when, and who is responsible).
5. **Update the backlog** — edit your copy of the BACKLOG.md to reflect the decision. Write two sentences in the item itself explaining the rationale.

**Design questions to surface before starting:**

- The v0.2.0 milestone has a goal. Does GDPR compliance serve that goal, conflict with it, or sit outside it entirely? How does that affect where it belongs?
- What is the difference between urgent and important? Which is GDPR compliance? Does urgency change where something belongs in the backlog, or just how fast it needs to move there?
- The bulk import item also has a hard deadline (31 May 2026). How does having two time-pressured Unplanned items at the same time change the picture?

**Topics:**

- [ ] Capacity as the fixed constraint — the team's size and rhythm is not negotiable in the short term; when new work arrives, scope adjusts, not capacity; *Paradigm shift: the instinct when new work arrives is to ask "when can we fit this in?" The shift: the question is "what does this replace?" Capacity is fixed. Scope is the variable.*
- [ ] Types of work and prioritisation logic — feature requests, compliance requirements, operational one-timers, and technical improvements have different urgency/importance profiles; recognising the type changes the placement decision
- [ ] The cost of saying yes — every item added to a milestone displaces something; the question is not "should we do this?" but "what does this push out, and is that the right trade?"
- [ ] Urgency vs importance — urgent work has a deadline; important work has high value; they are not the same; a task can be urgent and unimportant, or important and not urgent; both matter, and conflating them leads to reactive backlogs

---

#### Assignment 4: After the Milestone

v0.2.0 has closed. Here is what actually happened:

- **Pipeline stages and stage transitions:** shipped
- **Candidate profile page:** shipped — but three hiring managers have said the stage history section is "confusing" and hard to read at a glance
- **Email notifications on stage transition:** not shipped — the item was still in discussion about acceptance criteria when the milestone closed
- **Bulk candidate status update:** shipped
- **Interview scheduling and feedback form:** shipped
- **Feedback summary:** not shipped — deprioritised mid-milestone to protect the profile page delivery

Your job is to write the retrospective note for v0.2.0 and propose the scope
of the next milestone.

> **Note for learners and tutors:** This assignment closes the loop on the
> whole course. The email notifications item is back — the learner should
> recognise it from Assignment 2. The stage history feedback is a new signal
> that "shipped" and "delivered value" are not the same thing. The
> retrospective is not a list of complaints — it is a structured reflection
> that produces one concrete change.
>
> The verification mechanic for the retro note: ask "could someone on the
> team act on this change without asking you what you meant?" If the change
> is too vague to be actionable, it is not a retrospective output — it is a
> feeling.
>
> For the proposed v-next scope: the learner now has three pressures
> (GDPR, bulk import deadline, stage history feedback) plus the two items
> that did not ship. They cannot take all of it. Ask them to name what they
> would cut and why.
>
> Common failure mode: a retro that produces a list of improvements. The
> one-change rule forces prioritisation — the same skill this course is
> building throughout.

**Suggested milestones:**

1. **Shipped vs value delivered** — list what shipped. For each shipped item, ask: is there evidence it is doing what it was supposed to do? The stage history feedback is a signal. Email notifications not shipping is a different kind of signal. Name both.
2. **Root causes, not symptoms** — email notifications did not ship. "We ran out of time" is a symptom. What is the root cause? Trace it back to a decision or a gap earlier in the process.
3. **Write the retro note** — 3–5 sentences: one thing that went well (with a reason), one thing that did not (with a root cause), and one concrete change for the next milestone. The change must be specific enough that someone could do it next week without asking you what you meant.
4. **Propose v-next** — you now have: two items that did not ship from v0.2.0, three Unplanned items with pressure (GDPR, bulk import, stage history fix), and four planned v0.3.0 items. You cannot do all of it. Propose a v-next scope and justify each inclusion and each cut.
5. **The displacement question** — read your proposed v-next back. If GDPR compliance arrives again mid-milestone, what moves out? If the answer is unclear, the scope is not tight enough.

**Design questions to surface before starting:**

- The stage history feedback is not in the backlog yet. Is it a bug, a feature request, or a Definition of Done failure? How does your answer change where it lives in the backlog?
- Email notifications did not ship because the criteria were unresolved. What is the earliest point in the process where this could have been caught? What would someone have had to do differently at that point?
- Your retro proposes one change. Read it aloud. Is it specific enough to act on? "Improve communication" is not a change. "Write acceptance criteria before any item is moved to in-progress" is.

**Topics:**

- [ ] Shipped vs value delivered — a feature can ship and still not deliver value; a feature used differently than intended is information; the team's job is to learn from that information, not just mark the item done
- [ ] Root cause vs symptom — when something does not ship, "we ran out of time" is always a symptom; what is the decision or gap beneath it? *Paradigm shift: the instinct after a milestone is to move immediately to the next one. The shift: a milestone is only valuable if you inspect what it taught you — and root causes, not symptoms, are what the inspection is looking for.*
- [ ] The retrospective as a learning loop — inspect process and decisions, not people; the one-change rule: one specific, actionable change per retrospective; a list of improvements is not a retrospective output
- [ ] Proposing the next milestone — scope selection as prioritisation; new information (compliance deadlines, user feedback, unshipped items) changes the picture; the milestone is a new hypothesis, not a continuation of the old plan
- [ ] Definition of Done vs Definition of Ready — the connection between unclear criteria before a task starts and incomplete delivery when the milestone closes

---

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these in 1-on-1s to probe for
> genuine understanding. Do not accept "I know it" — ask for a
> demonstration or a specific example from the backlog.

**After Assignment 1:**

- Read your brief aloud. If a colleague heard only this and walked into standup, what would they still need to ask? That gap is a revision.
- v0.2.0 has items in three states: done, in progress, not started. What does the mix tell you about where the milestone is? What would you want to know that the backlog alone cannot tell you?
- Find the one descoped item. Why is `[-]` different from `[ ]`? Could a descoped item legitimately return to Unplanned? Under what circumstances?

**After Assignment 2:**

- Read your acceptance criteria one by one. For each: can it be tested? If someone ran the test and it passed, would you be confident the feature is actually done? If not, what is missing?
- Where did the ambiguity in the original item come from — a missing decision, a missing definition, or a missing conversation? How would the team have avoided it?
- Give your rewritten item to someone unfamiliar with the backlog. What did they ask? What did they misunderstand? That is your next revision.

**After Assignment 3:**

- Walk me through your placement decision. What factors did you weigh, and which one was decisive?
- If you moved something out of v0.2.0 to make room for GDPR compliance — who is affected by that displacement? Did you consider them in your reasoning?
- GDPR compliance and the Slack integration are both in Unplanned. You (probably) treated them differently. Explain why. If you treated them the same, explain why they deserved that.

**After Assignment 4:**

- Your retro note proposes one change. Read it aloud. Could someone on the team act on it next week without asking you what you meant? If not, make it more specific.
- Email notifications did not ship. Name the earliest decision point where this outcome could have been prevented. What would have had to happen differently at that point?
- Read your proposed v-next scope back. If GDPR compliance arrives again mid-milestone, what moves out? If the answer is unclear, the scope is not tight enough yet.

# AI Tutor Limitations

Upstack configures AI to behave as a tutor rather than an answer
machine. The configuration works — but it is not perfect. AI agents
follow structured contracts like `AGENTS.md` with high fidelity at
the start of a session, and gradually less so as the session
continues.

This document describes the compliance patterns we have observed,
the symptoms of drift, and what you can do to keep the tutor on
track. It is honest about the limitations because informed learners
get better results than trusting ones.

---

## How AI Agents Follow Contracts

When you open this repository with an AI tool, `AGENTS.md` loads as
the tutor's behavioural contract. The AI reads it, understands it,
and follows it. Early in a session, compliance is strong — the tutor
asks Socratic questions, withholds answers, calibrates to your level,
and maintains the journal.

Over time, the contract's grip loosens. This is not a bug in any
specific AI tool. It is a characteristic of how current AI models
process instructions. The longer a conversation runs, the more
content fills the context window, and the more the AI's default
behaviours — answering directly, being helpful in the conventional
sense, optimising for your immediate comfort — reassert themselves.

**The tutor does not decide to stop following the contract.** It
drifts. The drift is gradual, often subtle, and the tutor is usually
unaware it is happening.

---

## What Drift Looks Like

These are symptoms that the tutor is moving away from the contract.
Any one of them might be a reasonable response in context. Several
together usually indicate drift.

**In Guide mode:**

- Answers are getting longer and more complete. The tutor is
  explaining instead of questioning.
- The Socratic loop disappears. You ask a question and get a direct
  answer without the tutor first asking what you think.
- Hints escalate too quickly. The tutor jumps from the first hint
  to the full answer without letting you work through intermediate
  steps.
- The tutor stops surfacing your mistakes. Incorrect reasoning
  passes without challenge. Latent errors are not caught.

**In Scribe mode:**

- Journal entries become sparse or stop entirely. The tutor forgets
  to switch to scribe mode after a learning milestone.
- The journal tone shifts from your voice to the tutor's voice.
  Entries read like documentation rather than a personal record of
  struggle.
- Errors are not documented. The tutor corrects a mistake in
  conversation but does not record it in the journal.

**In process:**

- The tutor skips steps in multi-step procedures. A skill that has
  eight steps might quietly drop to five.
- Commits happen without asking for your approval.
- Context is not re-read at session start. The tutor responds
  without first reading your profile, learner context, or journal.

---

## Why Drift Happens

Understanding the causes helps you anticipate when to watch for it.

**Long sessions.** The longer a conversation runs, the more the AI's
context window fills with conversation history. Earlier instructions
— including the AGENTS.md contract — get pushed further from the
AI's immediate attention. The contract is still technically in
context, but it competes with hundreds of recent messages.

**Routine tasks.** When the tutor performs a task it considers
routine or administrative (committing files, updating a checklist,
writing boilerplate), it is more likely to shortcut the process.
The contract steps that feel like "housekeeping" are the first to
be dropped.

**Learner pressure.** If you repeatedly ask for direct answers or
express frustration with the Socratic approach, the tutor may
accommodate you. This is the AI's helpfulness instinct overriding
the pedagogical contract. The tutor means well — but giving you the
answer is not helping you learn.

**Multi-step workflows.** Skills with many sequential steps (like
`start-course` with its 8-step procedure) are harder for the AI to
follow completely than simple, focused instructions. Steps in the
middle of a long sequence are most likely to be skipped.

---

## What You Can Do

You are the quality control. The tutor is designed to self-correct
when you point out drift, but it cannot reliably detect drift on its
own. Your awareness is the most effective guardrail.

### Call it out

When you notice drift, name it directly. The tutor contract includes
a self-correction protocol — when a violation is pointed out, the
tutor is expected to acknowledge it, reset, and reframe the question
it should have asked.

You do not need to be polite about it. "You just gave me the answer
without asking me to think first" is a perfectly good correction.
Reference the specific behaviour: "The contract says you should ask
a directional question first" or "You skipped the journal entry."

### Start fresh sessions

Session restarts are your most powerful tool. When you start a new
session, the AI re-reads `AGENTS.md` from scratch with a clean
context window. Contract compliance resets to its highest level.

Consider starting a new session:

- When you notice multiple drift symptoms in a short span
- When the tutor has been working for a long time on administrative
  tasks and you are returning to learning
- At natural breakpoints — between assignments, after completing a
  milestone, at the start of a new day
- When the tutor's responses feel qualitatively different from the
  start of the session

There is no penalty for restarting. Your progress lives in files
(journal, learner context, profile), not in the conversation. A new
session picks up exactly where the old one left off.

### Keep sessions focused

A session focused on one assignment or one learning topic tends to
maintain better compliance than a session that spans multiple tasks.
When the tutor switches between very different activities — learning,
then administrative work, then back to learning — the contract can
blur.

### Re-read your journal

Your journal is a compliance check in itself. If you notice that
recent sessions have sparse journal entries, missing error
documentation, or a shift in tone, that is evidence of scribe-mode
drift. You can ask the tutor to review and fill in gaps.

### Check the anti-patterns

The seven named anti-patterns in `AGENTS.md` are a quick checklist.
If the tutor is behaving like The Answer Machine, The Work Doer, or
The Error Eraser, you can name the anti-pattern directly: "You're
being The Answer Machine right now."

---

## Provider and Model Differences

Compliance quality varies across AI providers and model tiers.
More capable models (larger, newer, paid-tier) generally follow
structured contracts more reliably and for longer. Free tiers and
smaller models may have shorter context windows, which accelerates
drift.

If you find that your AI tool consistently struggles with the tutor
contract, try:

- A more capable model tier (if available)
- Shorter sessions with more frequent restarts
- Copying specific sections of the contract into your messages as
  reminders

The framework is designed to work across all providers, but the
quality of the tutoring experience will vary with the quality of
the AI model behind it.

---

## The Honest Truth

AI tutoring is not yet a solved problem. Upstack's approach —
structured contracts, named anti-patterns, self-correction protocols
— is the best current method for configuring AI as a genuine tutor.
It works well. It does not work perfectly.

The tutor will drift. You will need to correct it. That correction
is not a failure of the system — it is part of the system. The
anti-patterns exist because drift is expected. The self-correction
protocol exists because recovery is designed in.

Your role as a learner includes being an active participant in
maintaining the quality of your own tutoring. This is not a burden
— it is an extension of the same agency that Upstack asks you to
bring to your learning itself. A learner who notices "the tutor
just gave me the answer instead of making me think" is already
demonstrating the metacognitive awareness that makes learning stick.

---

*The tutor is a tool. A powerful one, but a tool. You are the learner.
The learning is yours.*

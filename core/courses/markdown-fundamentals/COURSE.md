---
title: 'Markdown Fundamentals'
slug: 'markdown-fundamentals'
version: '1.0'
domain: 'engineering-practices'
level: 'novice'
target-audience: >
  Anyone who writes in collaborative tools — GitHub, Notion, Confluence,
  Jira, Obsidian, or similar. No prior Markdown experience required. No
  programming background assumed. If you write things that other people
  read, this course is for you.
prerequisites: []
tags:
  - markdown
  - technical-writing
  - documentation
  - communication
author: 'Upstack'
created: '2026-04-26'
updated: '2026-04-26'
ai-tools:
  - 'claude-code'
tutor-contract: 'core/meta/TUTOR-CONTRACT.md'
featured: true
estimated-hours: 6
---

# Markdown Fundamentals

Learn to write clearly and structurally in the format that powers most
collaborative tools professionals use today. You will learn the full
Markdown syntax — headings, lists, links, tables, code blocks, and more.
But syntax is the foundation, not the finish line. The harder skill is
knowing when to use each element and why — writing for the reader rather
than for yourself.

## What You Will Learn

By the end of this course you will write structured, scannable documents
as a natural habit — not as an afterthought. You will understand why
structure is not decoration, it is thinking made visible. You will have
produced three real artefacts that you can carry into any professional
context: a project page, an options analysis, and a structured
communication that enables someone else to act without you present.

## Learning Objectives

- Know the full Markdown syntax set and understand when to apply each element
- Use headings, lists, emphasis, code spans, and tables to serve the reader's need to scan
- Distinguish when to use different formatting elements and when not to
- Structure a document so that a reader can navigate it in 30 seconds
- Produce a cogent options analysis: problem → options → trade-offs → recommendation
- Write a structured communication complete enough for someone else to act on without asking you anything

## Course Structure

All three assignments produce standalone documents. Keep them — they are
not exercises to discard, they are writing samples you will return to and
improve.

### Module 1: Writing for Readers

Documents that persist: they will be read by people who weren't in the
room when you wrote them, possibly long after the context has faded.

#### Assignment 1: A Project Page

Pick any project you care about — a personal project, a hobby, a
business idea, something fictional. Write a project page that gives a
newcomer everything they need to understand it and get oriented quickly.
This is not a diary entry. Someone who has never heard of this project
should be able to read your page and know: what it is, why it exists,
how it is organised, and where to start.

> **Note for learners and tutors:** The project can be anything — it
> does not need to be technical. A recipe collection, a travel plan, a
> reading list, a startup idea all work equally well. The domain is not
> the point; writing for a reader is.
>
> Before starting, enable Markdown preview in your editor. In VS Code,
> look for the preview icon in the top-right corner of the editor (two
> overlapping rectangles with a magnifying glass) and click "Open Preview
> to the Side". Alternatively: Ctrl+Shift+V opens a preview tab.
> The feedback loop for this entire course is: write → render → adjust
> → understand. Without preview you are writing blind.
>
> Verify progress by asking the learner to read their own page aloud and
> answer: "If you knew nothing about this project, what would you still
> not know after reading this?" That gap is the next revision.

**Suggested milestones:**

1. **One paragraph, no formatting** — write a raw description of the project. No headings, no bullets. Just prose. Then ask: can a stranger read this and understand what exists and why?
2. **Add structure** — introduce headings to divide the page into named sections. Read the headings alone: do they tell a story? Can a reader navigate by them?
3. **Add detail** — fill each section. Use lists where items are genuinely enumerable; use prose where items connect to each other. Notice the difference.
4. **The 30-second test** — hand the page to the tutor cold. Can they describe the project accurately after 30 seconds of reading? Revise until they can.

**Design questions to surface before starting:**

- Someone opens your project page for the first time. They have 30 seconds. What is the one thing they must leave knowing?
- Your page will be read six months from now, by someone who was not in any of the conversations that shaped this project. What context are you carrying in your head that will not be on the page unless you write it down?
- You have a lot to say about this project. What do you leave out?

**Topics:**

- [ ] What Markdown is — a lightweight markup language that renders to formatted text; source vs rendered output; why it exists (write structure without HTML)
- [ ] Headings — `#` hierarchy; using headings as navigation, not decoration; the rule: headings are for the reader who is scanning, not the writer who is organising their thoughts
- [ ] Paragraphs and line breaks — how Markdown handles whitespace; when a paragraph break is better than a bullet
- [ ] Bold and italic — emphasis as a signal, not a style choice; *Paradigm shift: the instinct is to bold things you find important. Bold what the reader needs to notice — those are different.*
- [ ] Unordered lists — when items are genuinely parallel and order does not matter; bullets as scan points; the trap of bulleting everything
- [ ] Ordered lists — when sequence matters; numbered lists as instructions or rankings
- [ ] Links — `[text](url)` syntax; writing link text that works out of context ("click here" fails; "project brief" works)
- [ ] Images — `![alt](path)` syntax; writing alt text; when an image adds signal vs when it adds noise
- [ ] Code spans and code blocks — inline backticks for names and values; fenced blocks for multi-line content; language hints for syntax highlighting
- [ ] Table of contents — manual ToC using anchor links (`[Section](#section)`); when a document is long enough to need one; how most platforms (GitHub, Notion) auto-generate ToCs from headings

#### Assignment 2: An Options Analysis

You are facing a real or plausible decision — personal, professional, or
fictional. Write a structured document that presents the problem, the
options you considered, the trade-offs, your recommendation, and what
you expect to happen next.

This is the hardest assignment in the course. Not because of the syntax —
you already know that — but because if you cannot structure this document
clearly, it means you have not thought it through clearly enough yet. The
document is a mirror.

> **Note for learners and tutors:** The decision can be anything with
> genuine trade-offs: choosing a tool, a location, a process, a
> vendor, a career path. Avoid decisions with an obvious right answer —
> the exercise requires real options with real costs on both sides.
>
> The common mistake is producing a list of options with no recommendation.
> Push the learner to commit. "I don't know" is not a conclusion — it
> is an incomplete analysis.
>
> Verify by asking: "If you sent this document to the decision-maker and
> they read only the recommendation section, would they have enough to act?
> Would they trust you had thought it through?"

**Suggested milestones:**

1. **Frame the problem** — write one paragraph: what is the decision, what is at stake, what constraints exist. If you cannot write this in one paragraph, the problem is not yet understood.
2. **Enumerate the options** — list what you considered, including the option of doing nothing. Each option gets a heading, not just a bullet.
3. **Trade-offs, not features** — under each option, write what you gain and what you give up. Not just the positives.
4. **Commit to a recommendation** — one option, with your reasoning. State what would have to be different for you to choose differently.
5. **Tables for comparison** — once all options are documented, build a comparison table. Does it clarify or just repeat what the prose already said?

**Design questions to surface before starting:**

- What is the decision actually about? Name the constraint or trade-off at its core. If you cannot name it, the analysis will be superficial.
- Who is reading this document and what do they need to be able to do after reading it?
- What would you need to believe for each option to be the right choice?

**Topics:**

- [ ] Document structure as thinking — if you cannot outline it, you do not understand it yet. *Paradigm shift: the instinct is to write first and structure later. In analytical writing, the outline is the thinking — prose fills in what the structure already decided.*
- [ ] Headings as argument structure — a document whose headings alone tell the story; the options analysis pattern: Background → Options → Trade-offs → Recommendation → Next Steps
- [ ] Tables — when to tabularise vs prose; comparison tables work when the same attributes apply to every option; avoid tables for things that are not genuinely parallel
- [ ] Blockquotes — callouts, warnings, asides; when to pull something out of the prose flow
- [ ] Horizontal rules and visual separation — using whitespace and dividers to signal that the document has moved to a new phase
- [ ] TL;DR / BLUF pattern — Bottom Line Up Front: state the recommendation before the argument; the reader who only has 30 seconds gets the answer; the reader who has time gets the reasoning; *Paradigm shift: the instinct is to build up to the conclusion. Professional writing inverts this — lead with the answer, then justify it.*
- [ ] Writing for the decision-maker — the reader who reads only your conclusion must still be able to trust it; everything above the recommendation earns that trust

### Module 2: Writing for Action

Documents that expire: someone will act on these, once, and the
document's job is to make that action possible without any further
input from you.

#### Assignment 3: A Structured Communication

Write two short documents that enable someone else to act without asking
you anything:

1. A **handover note** — you are about to be unavailable for two weeks.
   Someone else will handle whatever you are responsible for. Write the
   note that lets them do that.

2. A **structured request** — you need something from someone who does
   not know your context. Could be a support request, an approval request,
   a bug report, a meeting brief, a proposal for a change. Pick something
   real or plausible. Write it so that the recipient can respond without
   asking a single clarifying question.

> **Note for learners and tutors:** These can be fictional scenarios.
> What matters is that the learner applies the completeness discipline:
> everything the recipient needs to act is on the page, nothing more,
> nothing less.
>
> The most common failure: the writer assumes the reader shares their
> context. Push the learner to read each document as a stranger would.
> What do you have to know before you read this to understand it? That
> knowledge should be in the document.
>
> Verify by asking the learner: "If you sent this today and then lost
> your phone, could the recipient act? What would they have to guess?"

**Suggested milestones:**

1. **Handover: inventory** — list everything the recipient will need to handle. Do not write the note yet; just enumerate the responsibilities.
2. **Handover: write it** — transform the inventory into a structured note. Add context for each item: not just what, but what state it is in, what decisions are pending, where to find things.
3. **Structured request: state the problem first** — one sentence: what do you need, and why. Not background, not history — the ask, then the context that justifies it.
4. **Structured request: provide what the recipient needs** — everything required to understand and act. Nothing that is interesting to you but irrelevant to them.
5. **The stranger test** — swap documents with the tutor. Read as someone who has never heard of this context. Mark every sentence where you had to guess something.

**Design questions to surface before starting:**

- The recipient is about to act on your document without speaking to you first. What could go wrong? What would they misunderstand?
- What is the difference between giving someone all the context and giving them the right context?
- You are writing a request. You have already made up your mind about what you want. Why does it still matter to present the options and trade-offs honestly?

**Topics:**

- [ ] Completeness discipline — every document that asks someone to act must contain everything they need to act; the test: "can they proceed without asking me anything?"
- [ ] Expected vs actual — in any report of a problem or discrepancy, stating what you expected is as important as stating what happened; *Paradigm shift: the instinct is to describe what went wrong. But the reader cannot evaluate it without knowing what right looks like.*
- [ ] Context vs background — the difference between context (what the reader needs to act) and background (what is interesting to you); ruthlessly cut background that does not enable action
- [ ] Structured templates as thinking scaffolds — a good template forces completeness; filling it in is not bureaucracy, it is a checklist for your own thinking
- [ ] Markdown in professional contexts — GitHub issues and PRs, Jira tickets, Confluence pages, Notion, Obsidian, Slack (partial): Markdown or a dialect of it renders in all of them; the skill is portable

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these in 1-on-1s to probe for
> genuine understanding. Do not accept "I know it" — ask for a
> demonstration or a counter-example.

**After Assignment 1:**

- Open your project page. Cover the prose. Read only the headings. Can you describe the project from the headings alone? If not, what does that tell you about the headings?
- You used a bullet list in section X. Why a list and not a paragraph? What would be lost — or gained — if you rewrote it as prose?
- What is the difference between bolding something because it is important to you and bolding something because the reader needs to notice it?

**After Assignment 2:**

- Your recommendation section: if the decision-maker reads only that section, do they have enough to act and enough to trust you thought it through?
- You built a comparison table. Point to one row where the table adds clarity over the prose. Point to one row where the prose would have been better. Why is each true?
- Your document has a structure. Read the headings aloud in order. Do they form an argument, or just a list of topics?

**After Assignment 3:**

- Read your handover note as someone who has never heard of this project. Mark every sentence where you assumed context the reader doesn't have. Now fix those sentences.
- In your structured request: what is the first sentence? Does it state the ask, or does it start with background? Which should come first and why?
- "Give the reader everything they need and nothing they don't." Find one thing in your document that fails the first half. Find one thing that fails the second half.

---
title: 'Git Fundamentals'
slug: 'git-fundamentals'
version: '1.0'
domain: 'engineering-practices'
level: 'novice'
target-audience: >
  Anyone beginning a software career — no prior git experience required.
  Basic terminal familiarity assumed (navigating directories, running
  commands). No specific programming language background needed.
prerequisites:
  - 'Basic terminal navigation (cd, ls/dir, mkdir)'
tags:
  - git
  - version-control
  - collaboration
  - feature-branch-workflow
author: 'Upstack'
created: '2026-04-26'
updated: '2026-04-26'
ai-tools:
  - 'claude-code'
tutor-contract: 'core/meta/TUTOR-CONTRACT.md'
featured: true
estimated-hours: 10
---

# Git Fundamentals

Learn git by building the habits that professional software teams rely on
every day. This course covers version control from your first repository
to the pull request workflow — with the mental models that make the
mechanics stick, not just the commands to memorise.

## What You Will Learn

By the end of this course you will understand why git works the way it does,
not just what commands to run. You will use git the way professionals do:
intentional commits with meaningful messages, a feature branch for every
piece of work, and pull requests as the standard handshake for collaboration.
You will also know how to read what git is telling you — treating its output
as information, not noise to scroll past.

## Learning Objectives

- Configure git correctly for professional use (identity, global vs local settings)
- Understand the three-area model: working directory, staging area, commit history
- Write commit messages that communicate intent, not just describe actions
- Use branches to isolate work and keep `main` always releasable
- Resolve merge conflicts by understanding why they occur, not just how to fix them
- Collaborate through remotes and pull requests using the feature branch workflow

## Course Structure

All three assignments use the same practice repository, created in Assignment 1.
Keep the same repo throughout — its growing history is part of the learning.

> **Learning path note:** If you are enrolled in the Engineering Bootcamp, your
> integration task replaces the standalone practice project: apply each
> assignment's skills directly to your capstone project repository. The tutor
> will read your project choice from your learner context before each session.

### Module 1: Working Locally

Build the habits that govern your daily git workflow — the ones that determine
whether your project history is a useful record or an archaeological disaster.

#### Assignment 1: Your First Repository

Create a practice project from scratch, configure git for professional use,
and build a commit history that tells a story. The practice project is a simple
notes folder for a fictional side project — a `README.md`, an `ideas.md`, and a
`decisions.md`. The content is not the point; building the discipline of
intentional, well-documented commits is.

> **Note for learners and tutors:** Create a fresh directory for this practice
> project — do not use the Upstack repo, which has existing history that would
> confuse the exercises. This is the learner's own repo, separate from everything
> else.
>
> Verify progress by asking the learner to share `git log --oneline`, `git status`,
> and `git diff` output and explain what they see. Reading git output is a core
> skill, not a secondary one — the tutor should ask "what does this line mean?"
> rather than accepting silent execution.
>
> When introducing the staging area, draw on the camera buffer mental model in
> `core/courses/git-fundamentals/references/GIT-MENTAL-MODELS.md` before touching commands. The "double edit"
> scenario (stage a file, edit it again, then commit — what gets committed?) is
> particularly effective at surfacing the concept.
>
> VS Code users: introduce the Source Control panel (Ctrl+Shift+G) alongside the
> terminal. Seeing the staging area visually reinforces the mental model. The
> Git Graph extension provides commit history visualisation.

**Suggested milestones:**

1. **Configuration and init** — set `user.name` and `user.email` globally; understand why local config can override global; initialise the repo; observe the `.git` directory
2. **First commit** — create `README.md`, stage it, write a meaningful commit message; read the output of `git log`, `git status`, `git diff`
3. **Building history** — add `ideas.md` and `decisions.md` in separate, intentional commits; use `git diff --staged` to inspect before committing
4. **Selective staging** — make multiple unrelated changes to the same file; stage and commit them separately; understand why this matters
5. **Ignoring files** — create a `.gitignore`; reason about what belongs there and what the consequences of getting it wrong are

**Design questions to surface before starting:**

- Your project has three things changed: a big refactor, a small bug fix, and a new doc. If you commit all three together, what does your git log look like six months from now when you're trying to understand what changed and why?
- You've written your first commit. What message did you give it? What would a teammate need to understand from that message alone — without reading the diff?
- Why does git have a staging area at all? Why not just commit everything that changed?

**Topics:**

- [ ] Git identity configuration — `user.name`, `user.email`, `git config --list`; global config is your default, local config overrides per-repo (useful when work and personal projects need different identities)
- [ ] The `.git` directory — this folder is the repository; the files around it are just a checked-out view of it; deleting `.git` deletes the entire repo
- [ ] The three-area model — working directory (what you are editing), staging area (what you have selected to commit), commit history (permanent record). *See `core/courses/git-fundamentals/references/GIT-MENTAL-MODELS.md` — camera buffer model.*
- [ ] Staging and committing — `git add`, `git commit`; staging as deliberate curation, not a formality. *Paradigm shift: the instinct is to commit everything that changed. The staging area exists so each commit records one coherent idea — not whatever happened to be modified.*
- [ ] Reading git output — `git status`, `git log --oneline`, `git diff`, `git diff --staged`; treating output as information, not noise to scroll past
- [ ] Commit message discipline — a commit message is communication to future teammates (and your future self); the rationale for writing messages that explain intent rather than describe actions; conventional commits as one widely-adopted industry standard that formalises this discipline
- [ ] Selective staging — committing only part of a file's changes; why atomic commits matter for debugging, reverting, and code review
- [ ] `.gitignore` — what to exclude (generated files, secrets, IDE settings) and why accidental commits of sensitive files are hard to fully undo

#### Assignment 2: Branching and Merging

Add a new section to your practice project using the feature branch workflow —
the daily pattern used by professional software teams. A `changelog.md` is the
feature: simple enough that it gets out of the way of the git concepts.

The focus is on understanding *why* branches exist before touching any commands.

> **Note for learners and tutors:** Verify progress by asking the learner to share
> `git log --oneline --graph --all` and `git branch -a` output and interpret it.
> The graph view makes parallel histories visible — this is the moment the parallel
> universes model clicks.
>
> Before any commands, introduce branching through the parallel universes mental
> model in `core/courses/git-fundamentals/references/GIT-MENTAL-MODELS.md`. The concept must precede the mechanics.
> Ask the learner to describe in plain language what they expect to happen before
> they run each command.
>
> Engineer a merge conflict deliberately in the final milestone — edit the same line
> in both branches. Conflict resolution should be experienced, not just described.

**Suggested milestones:**

1. **The case for branches** — before writing a command: what problem does branching solve? Describe a scenario where working directly on `main` becomes dangerous
2. **Your first branch** — create a `changelog` feature branch; make commits on it; switch back to `main` and observe it is unchanged
3. **Fast-forward merge** — merge the branch into `main` while `main` hasn't moved; observe what the history looks like; delete the merged branch
4. **Diverged histories** — make a commit on `main` after creating a new branch; now merge; observe the merge commit in the graph
5. **Merge conflict** — engineer a conflict by editing the same line in both branches; read the conflict markers; reason about what the correct resolution is; commit

**Design questions to surface before starting:**

- You are three days into a new feature. A critical bug is reported — you need to fix it and deploy today, without shipping your unfinished work. What is your plan if everything is on `main`?
- `main` should always be in a state that could be deployed. What discipline does that require from the team? How does the feature branch pattern enforce it?
- Two people edited the same line of the same file in different branches. When you merge, who is right? How does git even know there is a conflict?

**Topics:**

- [ ] Branches as lightweight pointers — a branch is a label on a commit, not a copy of the codebase. *Paradigm shift: the instinct from folder-based "versioning" is that branching means copying. A git branch costs almost nothing — it is a pointer. Branch freely.*
- [ ] When and why to branch — every piece of work gets a branch; `main` is always releasable; the feature branch is the professional default, not an advanced technique
- [ ] Creating and switching — `git branch`, `git switch` (current preference), `git checkout` (older form you will encounter in the wild)
- [ ] Fast-forward merge — when `main` has not moved since the branch was created; history remains linear; what it looks like in `git log --graph`
- [ ] Three-way merge — when both branches have new commits; git finds the common ancestor and combines both sets of changes; the merge commit records the convergence
- [ ] Merge conflicts — why they happen (two branches changed the same content independently); reading conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`); resolving by deciding what the truth should be; committing the resolution
- [ ] Feature branch workflow — branch → commit → merge → delete; the full cycle as a daily habit

### Module 2: Collaborating Remotely

#### Assignment 3: Pull Requests and Collaboration

Push your practice project to GitHub and work through the full pull request
workflow — the standard handshake for collaborative software development.

> **Note for learners and tutors:** This assignment requires a GitHub account.
> GitLab and Bitbucket support the same workflow with minor UI differences — the
> concepts transfer directly. The learner opens a PR against their own
> repository's `main` branch: a collaborator is not required to learn the pattern.
>
> Verify progress by asking the learner to share `git log --oneline --graph --all`
> and explain what each remote tracking branch (`origin/main`, `origin/feature-x`)
> represents and why it exists.

**Suggested milestones:**

1. **Remotes as peers** — before any commands: is GitHub "the real repo"? What does your local repo have that GitHub doesn't? What does "push" actually mean?
2. **First push** — create a GitHub repo; add it as a remote; push `main`; observe `origin/main` appearing in your log
3. **Feature branch PR** — create a local feature branch; push it to GitHub; open a pull request against `main`; write a meaningful PR description
4. **Fetch before pull** — fetch the remote state without merging; inspect what changed in `origin/main`; then pull
5. **Falling behind `main`** — make a commit on `main` after branching; observe the PR shows "X commits behind"; update the branch before merging

**Design questions to surface before starting:**

- You have a local repo. Your colleague cloned the same project from GitHub. Are these the same repository or two different repositories? What does "push" actually do?
- You run `git fetch`. Nothing changed in your working directory. What did change? When would you want to do this before running `git pull`?
- A pull request is more than "please merge my code." What else is it? What would a good PR description tell a reviewer who has not seen your branch?

**Topics:**

- [ ] Remote repositories — a remote is another full copy of the repository; local is not a draft, remote is not "the real thing"; they are peers that synchronise. *Paradigm shift: "the server has the real version" is a common instinct. Local and remote are equals — push is synchronisation, not upload.*
- [ ] Clone vs fork — cloning copies a repo to work with locally; forking creates your own copy on GitHub so you can contribute back via PR without write access to the original
- [ ] `git remote` — adding, listing, and inspecting remotes; `origin` is a convention, not a built-in concept
- [ ] Push and remote tracking branches — `git push`; `origin/main` as your local record of the remote's last known state
- [ ] Fetch vs pull — `git fetch` updates your knowledge of the remote without touching your work; `git pull` fetches and then merges; fetch first when you want to inspect before committing to a merge
- [ ] Pull request workflow — branch → push → open PR → write the description → review → merge; the PR is a conversation about the change, not just a merge button
- [ ] When your branch falls behind — options when `main` has moved since you branched; the importance of updating before the PR lands

## What's Next

These topics build on the daily workflow from this course. They are not required
for completion but are natural next steps when the fundamentals feel solid.

- **`git stash`** — parking unfinished work instantly when you need to switch context
- **Interactive rebase** — `git rebase -i` to clean up a branch's history before opening a PR
- **`git bisect`** — binary search through history to find which commit introduced a bug
- **Git hooks** — automating checks on commit or push (linting, tests, message format validation)
- **Branching strategies** — Gitflow, trunk-based development, and when each fits a team's workflow

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these in 1-on-1s to probe for genuine
> understanding. Do not accept "yes I know it" — ask for an explanation, a
> demonstration, or where the concept breaks down.

**After Assignment 1:**

- Walk me through what exists in each of git's three areas before, during, and after you run `git add` followed by `git commit`. What changes at each step?
- You made three unrelated changes to the same file. How would you commit only two of them? Why might that matter?
- Someone's commit history reads: "fix", "stuff", "wip", "final", "final2". What problems does this create for a real team? What is the underlying discipline that prevents it?

**After Assignment 2:**

- Describe the difference between a fast-forward merge and a three-way merge. Draw the commit graph if it helps. When does each happen?
- You open a file after a merge conflict and see `<<<<<<<`, `=======`, and `>>>>>>>` markers. What is each section telling you? Walk me through resolving it.
- Why do professional teams treat `main` as a branch that is always deployable? What breaks down when teams don't?

**After Assignment 3:**

- What is the difference between `git fetch` and `git pull`? Describe a situation where you would always fetch first before pulling.
- Your PR shows "3 commits behind `main`". What are your options? What are the trade-offs?
- Why does the pull request review process exist beyond "does this code work correctly"? What else is it checking?

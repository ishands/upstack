---
title: 'Object-Oriented Programming Fundamentals'
slug: 'oop-fundamentals'
version: '1.0'
domain: 'software-engineering'
level: 'beginner'
target-audience: >
  Fresh graduates and early-career developers with foundational programming
  skills — variables, functions, loops, conditionals in any language — who
  want to write more structured, maintainable code. No prior OOP experience
  required. You will need a working development environment in a language
  with class support (Python, TypeScript, Java, Kotlin, or C# all work).
prerequisites:
  - 'Basic programming: variables, functions, loops, and conditionals in any language'
tags:
  - oop
  - software-design
  - clean-code
  - design-patterns
  - solid
author: 'Upstack'
created: '2026-04-26'
updated: '2026-04-26'
ai-tools:
  - 'claude-code'
tutor-contract: 'core/meta/TUTOR-CONTRACT.md'
featured: true
estimated-hours: 10
---

# Object-Oriented Programming Fundamentals

Learn to model the world as objects — bundles of state and behaviour that
own their data and take responsibility for their actions. You will build a
library management system from scratch across four connected assignments,
starting from a flat collection of functions and ending with a design that
can absorb change without breaking.

Syntax comes quickly. The harder skill — knowing which objects to create,
what responsibilities to give them, and when inheritance is a trap — takes
longer. That is what this course is for.

## What You Will Learn

By the end of this course you will think in objects rather than procedures —
not as a rule to follow, but as a natural way of modelling a domain. You will
have built a working system that evolves across all four assignments, seen it
break under naive design decisions, and learned why the principles and
patterns that fix those breaks exist. You will carry forward one lasting
skill: the ability to look at any design and ask — what change does this
code resist, and why?

## Learning Objectives

- Model a domain as a collection of objects with clear responsibilities and boundaries
- Encapsulate state and behaviour so that objects own their data and hide their internals
- Use inheritance and polymorphism correctly — and recognise when composition is the better choice
- Identify and fix violations of the SOLID principles in existing code
- Apply four foundational design patterns (Strategy, Observer, Factory Method, Decorator) to solve real design problems
- Explain why each design decision makes the system easier or harder to change

## Course Structure

All four assignments build on the same domain: a library management system.
Each assignment extends the system from the previous one — you are not
starting over, you are evolving a living codebase.

Keep your code. It is not a throw-away exercise. By the end you will have a
design you can walk a colleague through and justify every decision in.

---

### Module 1: Designing with Objects

Objects are not just containers for data. They are things with
responsibilities — they know things, they do things, and they decide what
to expose to the world and what to hide. This module builds the foundation.

#### Assignment 1: A Library Domain Model

You are building the core of a library system. Start with the simplest
possible question: what things exist in a library, and what does each one
know and do?

Model the core domain — books, members, loans — as a set of classes. Each
class should own its data, expose only what it needs to, and take
responsibility for the actions that logically belong to it.

> **Note for learners and tutors:** Use a language with native class support
> — Python, TypeScript, Java, Kotlin, and C# all work equally well. The
> concepts are identical across all of them; only the syntax differs. If you
> have experience in one, use it.
>
> The verification mechanic here is not "does the code run" — it is "can you
> justify every design decision?" For every attribute: why is it private?
> For every method: who should own this behaviour — the caller or the object?
>
> A learner who can answer those questions has understood encapsulation. A
> learner who cannot is organising code, not designing it.

**Suggested milestones:**

1. **Nouns first** — list the things that exist in the library domain without writing code yet. What entities does the system need to track? What does each one know?
2. **Attributes** — for each entity, decide what data it holds and who owns it. At this stage, everything can be public — you are modelling, not encapsulating yet.
3. **Behaviour** — what can each object do? What actions are natural to it rather than to a caller? Move behaviour from "a function that takes a Book" to "something a Book does."
4. **Encapsulate** — decide what each class hides. What should callers never be able to set directly? What internal state should only change through a method?
5. **Constructors** — what does each object need to exist? A `Book` without a title should not be constructable. Enforce that at creation time.

**Design questions to surface before starting:**

- A `Book` object has a title, an author, an ISBN, and a status (available, on loan). Which of these should be mutable after construction? Which should be immutable, and why?
- A `Loan` connects a `Member` to a `Book` and has a due date. Where does the loan live — does the `Member` own it, the `Book`, or something else? What does your answer reveal about responsibility?
- You have a function `check_out(member_id, book_isbn)`. It lives outside any class. Before writing any classes, ask: which object should own this behaviour, and why?

**Topics:**

- [ ] What OOP is — objects as bundles of state and behaviour; the shift from procedures-on-data to objects-with-responsibilities; *Paradigm shift: the instinct is to write functions that take data and transform it. The shift is to ask: what object owns this data? That object owns the behaviour too.*
- [ ] Classes and instances — a class as a blueprint; instances as the actual things; the difference between the `Book` type and a specific copy of a book
- [ ] Attributes — what an object knows; instance attributes vs class attributes; initialising state at creation time
- [ ] Methods — what an object can do; the difference between behaviour that belongs to the object and a utility that operates on it from outside
- [ ] Encapsulation — hiding implementation details; the public interface vs the internal state; why private attributes exist
- [ ] Constructors — making invalid objects unconstructable; which fields are required at creation and which can be set later
- [ ] Access control — what "private" and "public" mean in practice; the rule: expose as little as possible, hide as much as you can

---

#### Assignment 2: Types and Relationships

The library needs to handle more than one type of item: physical books,
e-books, periodicals, and reference materials. They share some behaviour
and differ in others.

Model these variations. Start with inheritance — it will feel natural. Then
encounter a scenario where it breaks, and refactor toward composition where
the design improves.

> **Note for learners and tutors:** This assignment is a designed encounter
> with a temptation: inheritance will seem like the obvious tool. Let the
> learner build the hierarchy first. Then introduce a concrete scenario that
> breaks it — for example: an e-book can be "on loan" to multiple members
> simultaneously; a reference item can never leave the building. Ask: does
> your hierarchy handle this cleanly? If not, why not?
>
> The lesson should emerge from the breakdown, not from being told it
> upfront. Do not reveal the fragile base class problem before the learner
> has built the fragile base class.
>
> Verify by asking: "If the base class changes — say, the `loan_duration`
> attribute is removed — which of your subclasses break, and why?" The
> learner should be able to trace the dependency exactly.

**Suggested milestones:**

1. **Model the hierarchy** — identify what all library items share. Create a base class (or abstract class). Add subclasses for each item type. Override behaviour where subtypes differ.
2. **Test with scenarios** — for each subtype, write code that exercises its specific behaviour. Does the hierarchy accommodate all cases cleanly?
3. **Find the break** — introduce a scenario the hierarchy cannot handle without awkward workarounds (empty override methods, `isinstance` checks, flags). Name exactly why it fails.
4. **Introduce composition** — extract the varying behaviour into separate objects. Compose item types from those behaviours rather than inheriting them. Compare the two designs side by side.
5. **The substitution check** — for each subclass in your hierarchy, ask: can I substitute it anywhere the base class is used and have the system behave correctly? If not, the hierarchy is broken at that point.

**Design questions to surface before starting:**

- You have `Book`, `EBook`, and `Periodical` as types. What do they genuinely share in behaviour — not just in data — and what makes each one different?
- If `PhysicalBook` and `EBook` both extend `LibraryItem`, but an `EBook` can have multiple concurrent loans while a `PhysicalBook` cannot — is this a difference in type or a difference in behaviour? How does your answer change the design?
- Name one change to the base class that would break your subclasses. Name one that would not. What is the difference between those two changes?

**Topics:**

- [ ] Inheritance — base classes and subclasses; what gets inherited; method overriding; calling the parent implementation and when to do it
- [ ] Polymorphism — writing code that operates on the base type and behaves correctly for every subtype; the power and the obligation that comes with it
- [ ] Abstract classes and interfaces — types that exist to be extended, not instantiated; expressing contracts in code so the compiler enforces them
- [ ] The Liskov Substitution Principle (preview) — subtypes must be substitutable for their supertypes without breaking the program; this is a behavioural contract, not a syntactic one
- [ ] The fragile base class problem — how changes to a parent class can silently break subclasses; why deep inheritance hierarchies are hard to maintain
- [ ] Composition — building behaviour from parts rather than inheriting it; "has-a" vs "is-a"; *Paradigm shift: inheritance feels like reuse. It often creates coupling. Composition keeps parts independent — you gain the same flexibility without locking subtypes into a contract.*
- [ ] When to prefer composition — the heuristic: if a subclass needs to override a method to do nothing, or if you find yourself checking the subtype to branch behaviour, the hierarchy is the wrong tool

---

### Module 2: Making Code Changeable

The system works. Now it has to change. A new requirement arrives and it
either slots in cleanly or it detonates half your codebase. This module is
about writing code that survives change — and the principles and patterns
that make that possible.

#### Assignment 3: A SOLID Audit

A reference file (`core/courses/oop-fundamentals/references/SOLID-VIOLATIONS.md`)
contains a version of the library system with deliberate SOLID violations —
one or more per principle. Your job is to find them, name them, explain why
each is a violation, and then fix them in your own Assignment 2 codebase.

The goal is not a perfect codebase. It is the ability to see violations and
articulate exactly what change request each one would resist.

> **Note for learners and tutors:** The audit step (finding violations in the
> reference file) is separate from the fix step (applying what you learned to
> your own code). Do not merge them — the recognition skill and the
> production skill are different and should be practised separately.
>
> The verification mechanic: for each SOLID principle, ask the learner to
> name a change request that their current code cannot handle cleanly. If
> they cannot name one, they have memorised the principle but have not
> understood it.
>
> Common failure mode: the learner describes violations in abstract terms
> ("this class has too many responsibilities") without grounding them in a
> concrete scenario. Push for the scenario: "If we needed to add X, which
> files would change, and why?"

**Suggested milestones:**

1. **Read the reference file** — read `core/courses/oop-fundamentals/references/SOLID-VIOLATIONS.md` without writing any code. Annotate each violation you find: name the principle, describe what change request it would resist.
2. **Verify your audit** — discuss your findings with the tutor before writing any fixes. The test: is this a violation (a specific scenario where the design breaks) or a preference (it could be better)?
3. **Audit your own code** — apply the same lens to your Assignment 2 codebase. What violations does it contain?
4. **Refactor with precision** — apply targeted fixes. Do not rewrite everything. Change only what you can justify with a specific scenario.
5. **Before and after** — document one change per principle: what it looked like before, what it looks like after, and what change request it can now accommodate that it could not before.

**Design questions to surface before starting:**

- Single Responsibility Principle: name a class in your system that does two things. Now name a change request that would require modifying it for one of those things but not the other. That is the cost of the violation.
- Open/Closed Principle: you need to add a new type of fine calculation — daily rate for physical books, flat fee for e-books. Where in your current codebase does that change land? How many files do you have to touch?
- Dependency Inversion Principle: your `Library` class creates its own `EmailNotifier` internally. You want to switch to SMS notifications. What does that change look like?

**Topics:**

- [ ] Single Responsibility Principle — one reason to change; what counts as a "responsibility" is contextual, not syntactic; the test: name two distinct change requests that both require modifying this class
- [ ] Open/Closed Principle — open for extension, closed for modification; adding behaviour without editing existing code; *Paradigm shift: the instinct is to add a conditional branch when behaviour needs to vary. OCP says the design should absorb variation without new branches.*
- [ ] Liskov Substitution Principle — behavioural substitutability, not just type compatibility; a subtype that overrides a method to throw `NotImplemented` is a broken hierarchy, not a design choice
- [ ] Interface Segregation Principle — fat interfaces force clients to depend on things they do not use; small, focused interfaces keep coupling local and changes cheap
- [ ] Dependency Inversion Principle — high-level modules should not depend on low-level modules; both should depend on abstractions; the test: can you swap the implementation without changing the caller?
- [ ] SOLID as changeability properties — each principle is a property that makes a class easier to change in a specific way; *Paradigm shift: the instinct is to apply SOLID as a compliance checklist. The shift: each principle names a kind of change your code should be able to absorb. Ask "what breaks if this changes?" not "is this SOLID-compliant?"*

---

#### Assignment 4: Applying Patterns

Four problems in the library system. Four patterns that resolve them. The
assignment is not to apply patterns you recognise — it is to understand the
forces in each problem well enough that the pattern emerges as the natural
solution.

Work through each pattern as a separate problem-first session. The pattern
name comes after the problem is understood, not before.

> **Note for learners and tutors:** The failure mode in pattern learning is
> name-dropping without understanding. A learner who says "I'll use Strategy
> here" without being able to describe the forces — what varies, what stays
> constant, what breaks if you hard-code it — has not understood the pattern.
>
> For each pattern: start with the problem statement. Ask the learner to
> describe what is wrong with the naive solution and what structure would
> fix it. Name the pattern only after they have described the structure
> independently.
>
> Verify: "Without naming the pattern, describe the structure of the
> solution. What is the thing that varies? How is it separated from the
> thing that stays constant? Who decides which variant to use?"

**Suggested milestones:**

1. **Strategy: the sorting problem** — the library needs to sort its catalogue in multiple ways (by title, by author, by availability). Without Strategy, how would you implement this? What breaks when a new sort order is added? Describe the structure that would fix it before writing code.
2. **Observer: the notification problem** — when a reserved book is returned, the system must notify the waiting member, update the availability log, and (optionally) trigger a recommendation engine. How do you add the third consumer without touching the code for the first two?
3. **Factory Method: the creation problem** — the system must create the right type of library item from a catalogue entry. The caller should not know whether it is creating a `PhysicalBook`, `EBook`, or `Periodical`. Where does that decision live, and why does it matter?
4. **Decorator: the behaviour problem** — a basic loan can have late fees applied, reservation priority, or digital-access extension. These combinations vary per loan. Describe the structure that adds behaviour without subclassing every combination before writing code.
5. **Pattern map** — once all four are implemented, map the relationships between them in your system. Where do they interact? Where did applying one pattern create the conditions for another?

**Design questions to surface before starting:**

- Strategy: you have a `sort_books` function with three branches — one per sort order. A fourth is coming. What is the cost of adding it? Where does the code change, and what else has to know about the change?
- Observer: the notification logic lives inside `return_book`. A second consumer is added. What does that method look like after the change? How many more consumers would it take before you change your mind about the design?
- Decorator: you need loans with late fees, loans with reservation priority, and loans with both. How many subclasses does the naive approach require? What happens when a third feature is added?

**Topics:**

- [ ] What a design pattern is — a named, recurring solution to a recurring context; not a recipe but a vocabulary; the value is communication and shared understanding, not prescription
- [ ] Strategy — encapsulating interchangeable algorithms behind a common interface; the forces: behaviour that varies across contexts, callers that should not know which variant runs
- [ ] Observer — decoupling event producers from consumers; the forces: one event, multiple independent reactions, consumers that should not know about each other; the cost: indirection that is invisible until you need to trace a bug
- [ ] Factory Method — delegating object creation to subclasses or factories; the forces: callers that should not know the concrete type they receive; *Paradigm shift: the instinct is to call `new ConcreteType()` at the call site. Factory Method says: the call site should not know what it is creating — only what interface it will use.*
- [ ] Decorator — adding behaviour by wrapping, not by subclassing; the forces: combinations of behaviours that vary independently; the combinatorial explosion of subclassing every combination
- [ ] When not to use a pattern — the cost of indirection; applying a pattern to a problem that does not have the forces is engineering theatre; *Paradigm shift: the instinct is to identify a pattern and apply it. The shift: patterns are named answers to specific forces. Find the forces first — the pattern emerges from them, or it does not.*

---

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these in 1-on-1s to probe for
> genuine understanding. Do not accept "I know it" — ask for a
> demonstration or a concrete scenario.

**After Assignment 1:**

- Point to a class in your domain model. Who owns the data? Who owns the behaviour? Is the same object responsible for both? If not, what does that tell you about the boundary?
- You made an attribute private. Explain why — not "because encapsulation", but because of a specific thing that would go wrong if it were public.
- The `check_out` operation: where does it live in your design? Why there and not somewhere else? What would break if you moved it?

**After Assignment 2:**

- Walk me through your inheritance hierarchy. For each subclass: can I substitute it anywhere the base class is used and have the system behave correctly? Where does that break?
- You chose to use composition somewhere. What did you gain? What would the inheritance equivalent have looked like?
- Name a change request that your current hierarchy cannot absorb without awkward workarounds. Why does that particular change reveal a flaw in the design?

**After Assignment 3:**

- For each SOLID principle: name a change request that the reference file's violation would have made difficult. Be specific — not "it would be hard" but "I would have had to touch files X, Y, and Z, and the change would have rippled into..."
- Show me one before-and-after refactor from your own code. What change request can the "after" version handle that the "before" version could not?
- Dependency Inversion: does your `Library` class depend on a concrete notification implementation or an abstraction? How would you swap the implementation without touching `Library`?

**After Assignment 4:**

- Without naming the pattern: describe the Strategy solution you implemented. What is the thing that varies? How is it separated from what stays constant? Who decides which variant runs?
- Observer: you have three consumers. A fourth is added. Walk me through the change — which files do you touch, which do you not, and why?
- Where in your system did a pattern create the conditions for another? Where, if anywhere, did you apply a pattern and later wish you had not?

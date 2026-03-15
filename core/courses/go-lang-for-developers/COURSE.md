---
title: 'Go Lang for Developers'
slug: 'go-lang-for-developers'
version: '1.0'
domain: 'languages'
level: 'novice'
target-audience: >
  Developer with experience in at least one general-purpose language
  (Java, C#, Python, C++). Comfortable with interfaces, unit testing,
  and concurrency concepts. Novice in Go.
prerequisites:
  - 'Tour of Go (https://go.dev/tour/) — complete all sections'
tags:
  - go
  - systems-programming
  - concurrency
  - structural-typing
author: 'Upstack'
created: '2026-03-15'
updated: '2026-03-15'
ai-tools:
  - 'claude-code'
tutor-contract: 'core/meta/TUTOR-CONTRACT.md'
featured: true
estimated-hours: 40
---

# Go Lang for Developers

Learn Go by building two real systems: a host monitor and a market data
feed client. This is not a syntax tutorial — the [Tour of Go](https://go.dev/tour/) covers that.
This course teaches you to *think in Go*: composition over inheritance,
structural typing, explicit error handling, and concurrency via goroutines
and channels. Every concept emerges from a real design problem, not an
abstract exercise.

## What You Will Learn

By the end of this course you will be able to design and build concurrent
Go applications using idiomatic patterns. You will understand why Go
makes the choices it does — no inheritance, no exceptions, no generics
magic — and how those constraints lead to cleaner, more maintainable
systems code. You will have built two complete applications that exercise
the patterns you would encounter in production Go codebases.

## Learning Objectives

- Design with composition and structural typing instead of class hierarchies
- Write idiomatic error handling using the `(value, error)` pattern and custom error types
- Structure Go projects using the standard `cmd/` and `internal/` layout
- Build concurrent systems using goroutines, channels, and fan-in/fan-out patterns
- Use `context.Context` for cancellation and graceful shutdown
- Apply dependency injection and interface placement to avoid circular imports
- Write table-driven tests with subtests

## Course Structure

Each assignment is a **separate, self-contained Go project** with its own
`go.mod`, `cmd/`, and `internal/` directories. Concepts build on each
other across assignments, but the codebases are independent.

### Module 1: Go Foundations

Build a system monitor to learn Go's type system, error handling, testing,
and basic concurrency. If you have built with classes and inheritance before,
this module will rewire your instincts toward composition and small interfaces.

#### Assignment 1: HostManager

Build a host monitoring tool — similar to `top` or `iostat` — that reads
system metrics, formats them for display, and checks alert thresholds.
Start sequential, then make it concurrent.

> **Note for learners and tutors:** The goal is to learn Go's type system
> and concurrency patterns, not OS-level instrumentation. Use mock/hardcoded
> metrics (e.g. a `CPUMonitor` that returns a fixed percentage). The
> design of monitors, interfaces, and consumers is the learning — the
> data behind them is not.

**Suggested milestones:**

1. **Data types and project setup** — define monitor structs, set up `cmd/` and `internal/`, get it compiling
2. **Interfaces and consumers** — define what consumers need, wire monitors to consumers
3. **Error handling and testing** — add failure cases, write table-driven tests
4. **Concurrency** — make the dashboard concurrent with goroutines and a fan-in channel

**Design questions to surface before building:**

- You need three monitor types (CPU, memory, disk) that share common fields. How would you model this in Go without inheritance? What does Go offer instead of a base class?
- A dashboard consumer needs to read metrics from any monitor type. Should the consumer accept concrete monitor types, or define what it needs as an interface? Who should own that interface?
- You want to display all monitors concurrently. How do you collect results from multiple goroutines into a single output? What data structure carries a result back from a goroutine?

**Topics:**

- [ ] Composition over inheritance — struct embedding as Go's replacement for class hierarchies. *Paradigm shift: OOP instinct is to create a base class. Go has no inheritance — embedding promotes fields, not identity.*
- [ ] Structural typing — implicit interface satisfaction without `implements`. *Paradigm shift: in Java/C# you declare what you implement. In Go, if the methods match, you satisfy it — no declaration needed.*
- [ ] Consumer-defined interfaces — small contracts declared where they are used, not by the author. *Paradigm shift: OOP instinct is to define interfaces in the library. Go idiom is the opposite — consumers define what they need.*
- [ ] Project layout — `cmd/`, `internal/`, `go.mod` and the visibility rule (exported vs unexported)
- [ ] Error handling — values not exceptions, the `(value, error)` return pattern. *Paradigm shift: no try/catch. Errors are values you check, not exceptions you handle. Every call site decides what to do.*
- [ ] Custom error types — implementing the `error` interface, `errors.As` for type assertions
- [ ] Testing — table-driven tests, `t.Run` subtests, test file conventions
- [ ] Goroutines — lightweight concurrency, the fan-out pattern
- [ ] Channels — fan-in collection with a carrier struct, blocking sends and receives
- [ ] Slices and iteration — `range`, slice vs array, append mechanics
- [ ] Pointer vs value receivers — when to use each and what it means for the method set

### Module 2: Concurrency & Network I/O

Build a real-time market data client to learn Go's concurrency primitives
in depth. This module connects to live APIs, handles network I/O across
goroutines, and teaches the patterns needed to shut everything down cleanly.

#### Assignment 2: FeedCatcher

Build a multi-symbol orderbook feed client that connects to Binance,
fetches REST snapshots, subscribes to WebSocket delta streams, and
dispatches updates to a book builder. The system must start up cleanly
and shut down gracefully on interrupt.

> **Note for learners and tutors:** The learning objective is Go
> concurrency and network I/O — not the Binance API itself. The tutor
> should help the learner understand API structure, endpoint URLs, and
> payload formats so they can focus their struggle on Go patterns. The
> key endpoints are:
>
> - **REST snapshot:** `GET https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=5`
> - **WebSocket stream:** `wss://stream.binance.com:9443/ws/btcusdt@depth`
>
> Consult the [Binance API documentation](https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams)
> for full details. The tutor may look up API specifics on the learner's
> behalf — this is domain scaffolding, not spoon-feeding.

**Suggested milestones:**

1. **Data types** — define carrier structs for snapshots and deltas, define the feed interface
2. **REST snapshots** — fetch initial orderbook state from the REST API
3. **Single WebSocket** — connect to one symbol's depth stream, print raw updates
4. **Fan-in** — launch one goroutine per symbol, merge updates into a shared channel
5. **Distribution** — deliver updates to a separate orderbooks package via an interface
6. **Context and graceful shutdown** — wire `context.Context` through the pipeline, clean exit on Ctrl+C

**Design questions to surface before building:**

- The feed reads data and the orderbook consumes it. These are separate packages. The consumer needs the feed's types (Snapshot, Update), and the feed needs to call the consumer's methods. How do you wire this without a circular import? Where should the interface live?
- `Subscribe()` launches goroutines that push to a channel. `Run()` reads from that channel. What happens if `Subscribe()` waits for goroutines to finish before returning? Who should wait, and when?
- On shutdown, you need to close the updates channel. But goroutines might still be sending. What happens if you close a channel while a sender is active? How do you ensure all senders have stopped first?

**Topics:**

- [ ] Carrier structs — mapping external JSON payloads to Go types
- [ ] JSON marshalling — struct tags, exported fields, why `encoding/json` uses reflection. *Paradigm shift: lowercase fields are invisible to `encoding/json` — Go's reflection can't see unexported fields. This is silent, not an error.*
- [ ] REST clients — `http.Get`, response body lifecycle, `defer` scoping rules
- [ ] WebSocket clients — persistent connections, blocking read loops
- [ ] Fan-in — multiple goroutines pushing to a shared channel, unbuffered vs buffered trade-offs
- [ ] Interface placement — defining interfaces next to the types they reference to avoid circular imports. *Paradigm shift: OOP instinct is to put the interface with the implementation. Go idiom: put it with the types it references. This is dependency inversion without a framework.*
- [ ] Dependency injection — constructor parameters, wiring in `main()`, no framework needed
- [ ] Context and cancellation — `context.Context` propagation, signal handling
- [ ] Graceful shutdown — `WaitGroup` synchronisation, channel close ordering, the watcher pattern
- [ ] `select` constraints — channel operations only, working around blocking I/O calls. *Paradigm shift: `select` looks like a switch over I/O, but it only works with channel operations. Blocking function calls like `ws.ReadMessage()` cannot be multiplexed — you need a different pattern.*

## What's Next

These topics build on the foundation from Assignments 1 and 2. They are
not required for course completion but are natural next steps for learners
who want to go deeper.

- **Resilience patterns** — reconnection strategies, exponential backoff, circuit breakers
- **Error classification** — transient vs permanent errors, retry-safe operations
- **Structured logging** — `slog` package, contextual fields, log levels
- **Interface mocks for testing** — faking dependencies without a mocking framework
- **Generics** — type parameters (Go 1.18+), when to use them vs interface polymorphism

### Capstone: Market Data Gateway

A self-directed project to test everything you have learned — no AI tutor,
no guided struggle. Build it yourself, walk someone through your design.

**The problem:** Cryptocurrency exchanges each have their own APIs, data
formats, and connection protocols. Build a market data gateway that
connects to **Binance** and **Kraken** orderbook feeds, normalizes their
data into a unified format, maintains internal orderbook state, and exposes
a **WebSocket server** that downstream clients connect to for a clean,
consolidated book feed.

Downstream clients should not need to know about snapshots, deltas, or
exchange-specific protocols. They connect, subscribe, and receive complete
orderbook state — one protocol, one format.

**What this adds beyond FeedCatcher:**

- **Fan-out** — serving multiple downstream WebSocket clients (FeedCatcher only does fan-in)
- **Boundary pattern** — containing exchange-specific formats at the edge, normalizing into unified internal types
- **Exchange-agnostic architecture** — adding a third exchange (Coinbase, Bybit) should require a new implementation, not changes to the core pipeline
- **Mutexes** — managing concurrent client connections on the server side
- **More complex shutdown** — server with active clients, multiple exchanges, all closing cleanly

**Key endpoints:**

| Exchange | REST Snapshot | WebSocket Stream |
|:---------|:-------------|:-----------------|
| Binance | `GET https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=5` | `wss://stream.binance.com:9443/ws/btcusdt@depth` |
| Kraken | `GET https://api.kraken.com/0/public/Depth?pair=XBTUSD&count=5` | `wss://ws.kraken.com/v2` (requires subscription message) |

**Rules:** Build from scratch. No AI-generated code. Test against real
APIs. Your commit history should tell the story of incremental progress.
Be prepared to explain every design decision.

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these in 1-on-1s to probe for
> genuine understanding beyond completion state. Do not accept "yes I
> know it" — ask the learner to explain, give an example, or identify
> where a concept breaks down.

**After Assignment 1: HostManager**

- Why does Go use composition instead of inheritance? Give a concrete example from your HostManager where inheritance would have been worse.
- What makes an interface "consumer-defined"? Where did you define interfaces in your code, and why did you put them there instead of next to the implementing type?
- Walk through what happens when `errors.As` is called on a wrapped error chain. What is it checking at each step?

**After Assignment 2: FeedCatcher**

- Why can't you use `select` with `ws.ReadMessage()`? What pattern did you use instead, and why does closing the connection from a separate goroutine work?
- Draw the shutdown sequence from Ctrl+C to program exit. What closes first, what waits for what, and what would break if you reordered the steps?
- Why does the `BookBuilder` interface live in the `feed` package rather than in `orderbooks`? What problem would moving it cause?

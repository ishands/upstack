# Sample Progress: FeedCatcher Assignment

> **For the AI scribe.** This is a worked example of what good journal
> entries look like. Read this before writing journal entries for a
> learner. It demonstrates the level of detail, structure, and tone
> expected. This is not a template to copy — it is a calibration
> reference. Match the patterns, not the words.
>
> **Key patterns to emulate:**
>
> - **Milestone structure** — each milestone has a clear goal and
>   documents what happened during that phase of the build
> - **Error → fix → concept rhythm** — before/after code, the broken
>   mental model, and the transferable concept behind the fix
> - **"Got It Right" sections** — correct first instincts are recorded,
>   not just mistakes. This calibrates confidence.
> - **"Debate" sections** — design decisions where reasonable people
>   could disagree. Shows the learner's reasoning process.
> - **Summary tables** — errors grouped by category at the end, with
>   root cause and fix columns
> - **First person, honest tone** — false starts, wrong turns, and all.
>   A cleaned-up journal teaches nothing.
> - **Global error numbering** — errors are numbered sequentially across
>   the entire journal, not restarting per milestone

---

A narrative record of building a multi-symbol orderbook feed client
in Go. Documents mistakes, corrections, and the Go concepts behind
each fix.

**Background:** The learner has experience in other programming
languages and completed a prior assignment covering structs, interfaces,
error handling, testing, goroutines, and basic fan-out/fan-in. This
assignment applies those fundamentals to real network I/O.

---

## Milestone 1: Data Types

**Goal:** Define carrier structs for snapshots and deltas, plus
interfaces for the feed pipeline.

### Got It Right: Carrier Structs

The `Snapshot` and `Update` structs were well-structured from the
start — clean carrier types mapping to the exchange's REST and
WebSocket JSON payloads. The feed struct with REST/WS base URLs
and a symbol list was solid.

### Debate: StreamHandler — Author-Defined vs Consumer-Defined

The first design included a `StreamHandler` interface:

```go
type StreamHandler interface {
    Init() error
    GetSnapshots() error
    Subscribe() error
}
```

**The challenge:** The prior assignment taught that Go interfaces are
*consumer-defined* — small, declared where they're used.
`StreamHandler` looks like a large contract declared by the author,
bundling three methods.

**The counterargument (valid):** This interface exists for `main()` —
the orchestrator that calls `Init`, `GetSnapshots`, `Subscribe` in
sequence. From main's perspective, it *is* a consumer-defined
contract: "I need something I can initialize, snapshot, and subscribe
to." If a different feed implementation appeared later, main wouldn't
care which implementation it got.

**Verdict:** The interface stayed. The lesson: consumer-defined doesn't
mean "never define interfaces in library packages." It means the *user*
of the behavior defines the contract. Sometimes the library *is* the
user of its own abstraction.

### Design Question: Who Owns OnUpdate?

The initial design had an `OnUpdate()` method on the feed struct. But
who calls it? The feed reads from WebSockets, but the *consumer*
(orderbooks) needs to process updates. This led to the channel-based
design in Milestone 4 — the feed pushes to a channel, and `Run()`
dispatches to a `BookBuilder` interface. `OnUpdate` was eventually
removed entirely.

---

## Milestone 2: REST Snapshots

**Goal:** Fetch initial orderbook snapshots from the exchange REST API.

This milestone had the highest density of mistakes — five distinct
errors, each teaching a different Go concept.

### Error 1: `:=` on a Struct Field

**Before (won't compile):**
```go
func (b *Feed) Init() error {
    b.Symbols := []string{"BTCUSDT", "ETHUSDT"}  // WRONG
    return nil
}
```
```
non-name b.Symbols on left side of :=
```

**After:**
```go
func (b *Feed) Init() error {
    b.Symbols = []string{"BTCUSDT", "ETHUSDT"}  // = not :=
    return nil
}
```

**The concept:** `:=` is *short variable declaration* — it creates a
new local variable. You cannot use it to assign to an existing struct
field. Struct fields already exist; use plain `=`. This is a syntax
rule, not a style choice. The compiler rejects it outright.

### Error 2: `defer` Inside a Loop

**Before (resource leak):**
```go
func (b *Feed) GetSnapshots() error {
    for _, s := range b.Symbols {
        url := b.RestBase + "?symbol=" + s + "&limit=5"
        response, err := http.Get(url)
        if err != nil { /* ... */ }

        defer response.Body.Close()  // WRONG: defers stack until function exits

        body, err := io.ReadAll(response.Body)
        // ... unmarshal, etc.
    }
    return nil
}
```

**After (extracted to per-symbol function):**
```go
func (b *Feed) GetSnapshots() error {
    for _, s := range b.Symbols {
        err := b.getSnapshot(s)  // each call has its own defer scope
        if err != nil {
            fmt.Println(fmt.Errorf("error downloading symbol %s: %w", s, err))
        }
    }
    return nil
}

func (b *Feed) getSnapshot(symbol string) error {
    url := b.RestBase + "?symbol=" + symbol + "&limit=5"
    response, err := http.Get(url)
    if err != nil {
        return err
    }
    defer response.Body.Close()  // runs when getSnapshot() returns, not when loop ends
    // ...
}
```

**The concept:** `defer` is scoped to the *function*, not the block.
Inside a loop, deferred calls pile up and only execute when the
enclosing function returns. With two symbols this is harmless; with
hundreds you'd hold all HTTP connections open simultaneously. The fix:
extract the loop body into its own function so `defer` fires once per
iteration.

### Error 3: No Early Return After Error

**Before (nil pointer panic):**
```go
func (b *Feed) getSnapshot(symbol string) error {
    response, err := http.Get(url)
    if err != nil {
        fmt.Println(fmt.Errorf("error making GET request: %w", err))
        // no return! execution continues...
    }

    defer response.Body.Close()  // PANIC: response is nil when http.Get fails
    body, err := io.ReadAll(response.Body)
    // ...
}
```

**After:**
```go
func (b *Feed) getSnapshot(symbol string) error {
    response, err := http.Get(url)
    if err != nil {
        fmt.Println(fmt.Errorf("error making GET request: %w", err))
        return err  // bail out immediately
    }

    defer response.Body.Close()  // safe: response is non-nil here
    // ...
}
```

**The concept:** Go's error handling discipline requires *early return*.
If you check `err != nil` but don't return, execution falls through to
code that assumes success. In this case, `response` is `nil` when
`http.Get` fails, so `response.Body.Close()` panics with a nil pointer
dereference. Every `if err != nil` block should end with `return`.

### Error 4: Lowercased Fields Break JSON Unmarshal

**Before (silent zero values):**
```go
type Snapshot struct {
    symbol       string      // unexported (lowercase)
    lastUpdateId int         // unexported
    bids         [][2]string // unexported
    asks         [][2]string // unexported
}
```

The program ran without errors, but every field was zero/nil:
```
Snapshot{symbol:"", lastUpdateId:0, bids:[][2]string(nil), asks:[][2]string(nil)}
```

**After:**
```go
type Snapshot struct {
    Symbol       string                            // exported (uppercase)
    LastUpdateId int         `json:"lastUpdateId"` // tag maps to JSON key
    Bids         [][2]string `json:"bids"`
    Asks         [][2]string `json:"asks"`
}
```

**The concept:** `encoding/json` uses *reflection* to inspect struct
fields. Reflection cannot see unexported (lowercase) fields — they're
invisible outside the package, and the json package is a different
package. So `json.Unmarshal` silently skips them. No error, just zero
values. The fix: keep fields exported (uppercase) and use struct tags
to map to the JSON key names. This is one of Go's most common gotchas
for newcomers.

### Error 5: Wrong Symbol Names

Used incorrect symbol identifiers for the exchange API. The REST API
returned an error payload that unmarshalled into empty fields (no
bids/asks). Quick domain fix, but a reminder to check API docs.

---

## Milestone 3: Single WebSocket

**Goal:** Connect to one depth stream and print raw updates.

### Minor Issues

- Hardcoded the wrong symbol index — copy-paste from experimentation.
- `return nil` after an infinite `for {}` loop — unreachable code. The
  compiler doesn't complain, but it's dead code.
- Comment said "goroutine" but the WebSocket read loop ran on the main
  goroutine, blocking forever. Fine for this milestone (proof of
  concept), addressed in the next.

---

## Milestone 4: Fan-In

**Goal:** Launch one goroutine per symbol, merge updates into a shared
channel.

### Error 6: Goroutine Without a Loop

**Before (reads one message, then exits):**
```go
go func(url string) {
    ws, _, err := websocket.DefaultDialer.Dial(url, nil)
    if err != nil { return }
    defer ws.Close()

    _, message, err := ws.ReadMessage()  // reads ONE message
    if err != nil { return }

    var u Update
    json.Unmarshal(message, &u)
    b.Updates <- u
    // goroutine exits after one message
}(url)
```

**After:**
```go
go func(url string) {
    ws, _, err := websocket.DefaultDialer.Dial(url, nil)
    if err != nil { return }
    defer ws.Close()

    for {  // infinite loop: read until connection drops
        _, message, err := ws.ReadMessage()
        if err != nil { return }

        var u Update
        json.Unmarshal(message, &u)
        b.Updates <- u
    }
}(url)
```

**The concept:** A WebSocket reader goroutine is *long-lived* — it
should loop forever (or until an error/cancellation). Without the
`for {}`, the goroutine reads one message and dies. The channel would
receive two messages total (one per symbol) and then block forever
waiting for more.

### Error 7: Goroutines Can't Return Errors

**Before (compiler error):**
```go
go func(url string) {
    ws, _, err := websocket.DefaultDialer.Dial(url, nil)
    if err != nil {
        return err  // WRONG: goroutine signature is func(), not func() error
    }
    // ...
}(url)
```

**After:**
```go
go func(url string) {
    ws, _, err := websocket.DefaultDialer.Dial(url, nil)
    if err != nil {
        fmt.Println(fmt.Errorf("error subscribing to ws: %w", err))
        return  // bare return — just stop the goroutine
    }
    // ...
}(url)
```

**The concept:** `go func()` launches a function with no return value.
There's nobody on the other end to receive an error. In concurrent
code, errors must travel through channels, not return values. For now,
printing and exiting is sufficient. A production system would send
errors through a dedicated error channel or use `context` cancellation.

### Error 8: main() Exits Before Goroutines Connect

**Before:**
```go
func main() {
    feed := NewFeed(builder)
    feed.Init()
    feed.GetSnapshots()
    feed.Subscribe()  // launches goroutines and returns immediately
    // main() exits — goroutines die before connecting
}
```

**After:**
```go
func main() {
    feed := NewFeed(builder)
    feed.Init()
    feed.GetSnapshots()
    feed.Subscribe()
    feed.Run()  // blocks forever, reading from the Updates channel
}

func (b *Feed) Run() error {
    for {
        update := <-b.Updates        // blocks until a goroutine sends
        b.builder.ApplyUpdate(update) // dispatch to the book builder
    }
}
```

**The concept:** `Subscribe()` launches goroutines and returns. If
nothing keeps `main()` alive, the program exits and all goroutines
are killed. The `Run()` method solves this — it blocks on the channel,
which keeps main alive and also serves as the fan-in collection point.

### Got It Right: The Fan-In Channel

The `Updates chan Update` field was the right design. Multiple
goroutines push to one unbuffered channel, `Run()` reads from it.
The output confirmed interleaved delivery. No mutex, no shared state.
The channel serializes access naturally.

---

## Milestone 5: Distribution

**Goal:** Deliver updates to a separate package via an interface.

### Error 9: Circular Import

**Before (won't compile):**
```
internal/
  feed/         → imports orderbooks (to call BookBuilder methods)
  orderbooks/   → imports feed (to reference Snapshot and Update types)
```
```
import cycle not allowed
```

The `BookBuilder` interface was originally defined in the consumer
package:

```go
// orderbooks/book.go
package orderbooks

import "project/internal/feed"

type BookBuilder interface {
    BuildSnapshot(s feed.Snapshot) error  // references feed types
    ApplyUpdate(u feed.Update) error
}
```

But the feed struct needed a `BookBuilder` field — which would require
importing the consumer package. Cycle.

**After (interface moved to feed package):**
```go
// feed/types.go
package feed

// BookBuilder lives here because it references feed's own types.
// Any package can implement it without feed needing to know about them.
type BookBuilder interface {
    BuildSnapshot(s Snapshot) error
    ApplyUpdate(u Update) error
}
```

```go
// orderbooks/book.go
package orderbooks

import "project/internal/feed"

// Store implements feed.BookBuilder without feed knowing about orderbooks.
func (store *Store) BuildSnapshot(snapshot feed.Snapshot) error { /* ... */ }
func (store *Store) ApplyUpdate(update feed.Update) error { /* ... */ }
```

**The concept:** Interfaces belong with the types they reference.
`BookBuilder` takes `Snapshot` and `Update` — both are `feed` types.
So `BookBuilder` belongs in `feed`. The consumer package imports `feed`
(one direction only), and satisfies the interface implicitly. No cycle.
This is the Go analog of "dependency inversion" — the high-level
package defines the contract, the low-level package implements it.

### Got It Right: Constructor Injection

The wiring in `main()` was clean from the start:

```go
builder := orderbooks.NewStore()    // concrete implementation
feed := NewFeed(builder)            // injected as BookBuilder interface
```

The constructor accepts `BookBuilder` (an interface), not `*Store`
(a concrete type). Main creates the concrete, passes the abstraction.
This is textbook dependency injection in Go — no framework, just a
constructor parameter.

### Got It Right: Store and Book Separation

The instinct to separate `Store` (the map of books) from `Book` (a
single symbol's state) was correct. Even though `Book` isn't used yet
at this milestone, the structure is ready for when `BuildSnapshot` and
`ApplyUpdate` will actually populate the book's bid/ask sides.

---

## Milestone 6: Context & Graceful Shutdown

**Goal:** Wire `context.Context` into the feed pipeline so Ctrl+C
triggers a clean shutdown — watchers close WebSockets, goroutines
exit, channels close, `main()` returns.

This milestone was the hardest. The interaction between blocking I/O,
channels, WaitGroups, and context cancellation required multiple
iterations to get right.

### Error 10: Deadlock — Subscribe Blocks Run

**Before (deadlock):**
```go
func (b *Feed) Subscribe(ctx context.Context) error {
    for _, s := range b.Symbols {
        go b.subscribeToSymbol(ctx, s)
    }
    b.wg.Wait()    // blocks here until goroutines finish
    return nil
}
```

`Subscribe` waits for goroutines to finish. But goroutines push to
`b.Updates`, and nobody is reading it yet — `Run()` hasn't started
because `Subscribe` hasn't returned. Classic deadlock: sender blocks
waiting for receiver, but receiver can't start because sender is
blocking the caller.

**After:**
```go
func (b *Feed) Subscribe(ctx context.Context) error {
    for _, s := range b.Symbols {
        go b.subscribeToSymbol(ctx, s)
    }
    return nil   // return immediately — Run() will wait
}
```

**The concept:** `Subscribe` is a launcher, not a waiter. It fires off
goroutines and returns. The waiting responsibility moves to `Run`,
which reads from the channel (keeping goroutines unblocked) and calls
`wg.Wait()` only during shutdown.

### Error 11: select Can't Wrap Blocking Calls

**First attempt:** Put `ws.ReadMessage()` in a `select` with
`ctx.Done()`:

```go
for {
    select {
    case _, message, err := ws.ReadMessage():  // compile error!
    case <-ctx.Done():
        return
    }
}
```

**The concept:** `select` cases must be **channel operations**
(`<-ch` or `ch <-`). `ws.ReadMessage()` is a function call that
happens to block — it's not a channel receive. The compiler rejects
it outright. This is a fundamental constraint: `select` is for
multiplexing channels, not for making arbitrary function calls
interruptible.

### Error 12: close(Updates) Before wg.Wait()

**Before (panic on send to closed channel):**
```go
case <-ctx.Done():
    close(b.Updates)    // close first
    b.wg.Wait()         // wait after — but goroutines may still be sending!
    return nil
```

If a subscribe goroutine hasn't exited yet when the channel closes,
its next `b.Updates <- u` panics: `send on closed channel`. Go panics
on this unconditionally — there's no way to "try-send" on a
potentially closed channel.

**After:**
```go
case <-ctx.Done():
    b.wg.Wait()         // wait for all senders to exit
    close(b.Updates)    // now safe — nobody is sending
    return nil
```

**The concept:** Channel closing is a **coordination signal**, not a
cleanup step. It must happen _after_ all senders have stopped. The
WaitGroup ensures this: each subscribe goroutine calls `wg.Done()`
before exiting, so `wg.Wait()` blocks until all sends are complete.

### Error 13: Print Before Wait

**Before (misleading output):**
```go
case <-ctx.Done():
    fmt.Println("run: ctx done. closing.")   // prints immediately
    b.wg.Wait()
    close(b.Updates)
    return nil
```

Output showed the closing message appearing before the socket error
messages from subscribe goroutines. It looked like Run was exiting
before goroutines cleaned up, even though wg.Wait() was there. The
print was just in the wrong place.

**After:**
```go
case <-ctx.Done():
    b.wg.Wait()
    close(b.Updates)
    fmt.Println("run: ctx done. closing.")   // prints last
    return nil
```

**The concept:** Not a language-specific lesson, but a concurrency
debugging lesson. When tracing shutdown sequences, **print after the
synchronization point**, not before. Otherwise the log suggests an
ordering that didn't happen.

### Got It Right: The Watcher Pattern

The solution to Error 11 was a separate goroutine that watches
`ctx.Done()` and closes the WebSocket:

```go
func (b *Feed) monitorConnection(ctx context.Context, ws *websocket.Conn) {
    <-ctx.Done()
    ws.Close()
}
```

Each subscribe goroutine spawns its own watcher:
`go b.monitorConnection(ctx, ws)`. When context cancels, the watcher
closes the connection, which makes `ReadMessage` in the reader
goroutine return with an error. The reader exits its loop and calls
`wg.Done()`.

This pattern — "close the resource to unblock the reader" — is the
standard Go approach for cancelling blocking I/O that isn't
channel-based.

### Got It Right: Final Shutdown Sequence

The clean output after all fixes:

```
monitor: ctx done. closing.
monitor: ctx done. closing.
error reading socket data: ...
error reading socket data: ...
run: ctx done. closing.
```

Watchers fire first → connections close → readers error out and exit →
WaitGroup unblocks → channel closes → Run returns → main exits. Every
goroutine cleans up before the program terminates.

---

## Summary: Lessons by Category

### Syntax Traps
| Mistake | Root Cause | Fix |
|:--------|:-----------|:----|
| `b.Symbols := []string{...}` | `:=` declares new variables, can't target struct fields | Use `=` for assignment to existing fields |
| Lowercased struct fields | Unexported fields invisible to `encoding/json` via reflection | Keep fields exported, use struct tags |

### Resource & Lifetime Management
| Mistake | Root Cause | Fix |
|:--------|:-----------|:----|
| `defer` inside a loop | `defer` scopes to function, not block | Extract loop body to its own function |
| No early return after error | Execution falls through to code assuming success | Always `return err` inside `if err != nil` |

### Concurrency Patterns
| Mistake | Root Cause | Fix |
|:--------|:-----------|:----|
| Goroutine reads one message | Missing `for {}` loop | Long-lived goroutines need infinite loops |
| `return err` in goroutine | Goroutines have no caller to receive errors | Use bare `return`; send errors via channels |
| main() exits immediately | `Subscribe()` returns after launching goroutines | Add `Run()` that blocks on the channel |
| Deadlock: Subscribe blocks Run | `wg.Wait()` in Subscribe prevents Run from starting | Subscribe launches and returns; Run waits during shutdown |
| `select` with blocking call | `ws.ReadMessage()` is not a channel operation | Watcher goroutine pattern — close resource to unblock reader |
| `close(ch)` before `wg.Wait()` | Senders may still be active when channel closes | Wait for all senders to exit, then close |

### Architecture
| Mistake | Root Cause | Fix |
|:--------|:-----------|:----|
| Circular import | Interface defined in wrong package | Interface belongs with the types it references |

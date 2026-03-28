---
title: 'Java Web Programming'
slug: 'java-web-programming'
version: '1.0'
author: 'Upstack'
created: '2026-03-28'
updated: '2026-03-28'

domain: 'languages'
tags:
  - java
  - web-programming
  - architecture
  - engineering-practices

level: 'competent'
target-audience: >
  Experienced developer fluent in at least one general-purpose language
  (C++, C#, Python, or similar). Comfortable with OOP, distributed
  systems concepts, and performance considerations. New to Java and
  web application development.
prerequisites:
  - 'Programming fluency in at least one general-purpose language (C++, C#, Python, etc.)'
  - 'Familiarity with OOP, data structures, and concurrency concepts'
  - 'Basic understanding of HTTP and client-server architecture'

ai-tools:
  - 'claude-code'
tutor-contract: 'core/meta/TUTOR-CONTRACT.md'
featured: false
estimated-hours: 60
---

# Java Web Programming

Learn Java web development by building four progressively more complex
systems — a CLI tool, a REST API, a database-backed service, and a
production-hardened application. This is not a Java syntax tutorial —
it teaches you to *think in Java* and to navigate the Spring Boot
ecosystem with confidence. Every concept emerges from a real design
problem. You will finish with a working understanding of the full web
application stack: language, framework, data layer, security, and
deployment.

## What You Will Learn

By the end of this course you will be able to design and build
production-grade Java web applications using Spring Boot. You will
understand the Spring IoC container, REST API design, JPA persistence,
Spring Security, and containerisation — and, critically, why Java makes
the choices it does. You will learn where your existing instincts
transfer directly, where they mislead, and where Java's constraints
lead to cleaner, more maintainable systems.

## Learning Objectives

- Translate systems-level thinking into idiomatic Java
- Understand the JVM, Maven/Gradle toolchain, and Java's type system
- Build REST APIs with Spring Boot using the Controller → Service → Repository pattern
- Apply Inversion of Control and Dependency Injection to structure applications
- Design and query a relational data layer using JPA, Hibernate, and Spring Data
- Secure web APIs with Spring Security and JWT authentication
- Apply production-grade concerns: validation, error handling, structured logging, and containerisation
- Package and run a Spring Boot application with Docker

## Course Structure

Each assignment is a **separate, self-contained project** with its own
`pom.xml`, package structure, and test suite. Concepts build across
assignments, but the codebases are independent.

### Module 1: Java for the Experienced Developer

Bridge the gap between your current language and Java before touching
the web layer. The JVM, the build toolchain, the type system, and
modern Java features map to concepts you already know — but the details
differ in ways that matter. This module surfaces those differences
deliberately so they do not surprise you later.

#### Assignment 1: TaskManager CLI

Build a command-line task manager that stores tasks in memory, supports
CRUD operations, and can filter and sort using Java Streams. The goal
is fluency in Java idioms — not a web application yet.

> **Note for learners and tutors:** The objective is Java language
> proficiency, not application architecture. Keep the design simple —
> the complexity comes from learning the language, not designing a
> system. The tutor should help with Maven setup and toolchain questions
> so struggle stays on the Java language itself.

**Suggested milestones:**

1. **Project setup** — Maven project structure, `pom.xml`, first `main` class compiling and running via `mvn exec:java`
2. **Domain model** — `Task` class with fields, a `Status` enum, an in-memory `TaskRepository` using `ArrayList` and `HashMap`
3. **Streams and lambdas** — filter tasks by status, sort by priority and date, map to summary strings using the Streams API
4. **Exception handling** — checked vs unchecked exceptions, custom exception types, `try-with-resources` for any I/O
5. **Testing** — JUnit 5 `@ParameterizedTest`, assertions, test lifecycle (`@BeforeEach`)

**Design questions to surface before starting:**

- Your previous language has its own collection types (`std::vector` in C++, `List<T>` in C#, `list` in Python). Java has `ArrayList<Task>` and `HashMap`. What is autoboxing, and why does it exist? What is the cost?
- Java has both checked and unchecked exceptions — unlike C++, C#, or Python which only have unchecked. How do you decide which to use when? What does declaring a checked exception on a method signature communicate to the caller?
- Java has no destructors (C++), no `IDisposable` (C#), no context managers (Python) built into the language the same way. What does `try-with-resources` replace? What must a class implement to be used in a `try-with-resources` block?

**Topics:**

- [ ] JVM and the Java ecosystem — JDK vs JRE, bytecode compilation, JIT optimisation, `javac` vs running the JAR. *Paradigm shift: unlike C++ or C# (native/.NET), Java compiles to bytecode that runs on the JVM — an abstraction layer between your code and the OS. Python developers will recognise the interpreter model, but the JVM adds JIT compilation for performance.*
- [ ] Maven build toolchain — `pom.xml`, dependency management, build lifecycle (`compile`, `test`, `package`). *Paradigm shift: if you come from CMake/Make (C++), MSBuild (C#), or pip/setuptools (Python), Maven is different — declarative and convention-driven. You declare intent, Maven executes the standard lifecycle.*
- [ ] Java type system — reference types vs primitives, autoboxing, `null`, wrapper types (`Integer`, `Long`)
- [ ] Generics and type erasure — wildcard bounds (`? extends`, `? super`), compile-time vs runtime type information. *Paradigm shift: C++ templates generate new types per instantiation; C# generics are reified at runtime. Java generics are erased — at runtime, `List<String>` and `List<Integer>` are both just `List`. Python developers: think of it as type hints that disappear at runtime, but enforced at compile time.*
- [ ] Java Collections framework — `List`, `Map`, `Set`, `Queue`; `ArrayList` vs `LinkedList` vs `HashMap`; iteration patterns
- [ ] Streams and lambdas — functional-style data processing, method references, `filter`/`map`/`sorted`/`collect`, lazy evaluation
- [ ] Exception model — checked vs unchecked exceptions, `try-with-resources`, `AutoCloseable`. *Paradigm shift: C++, C#, and Python have only unchecked exceptions. Java's checked exceptions appear in the method signature — they are a contract, forcing callers to handle or propagate failures explicitly.*
- [ ] Garbage collection — generational GC, automatic heap memory management. *Paradigm shift: C++ developers lose manual memory control (no `new`/`delete`, no RAII, no destructors). C# developers will find GC familiar but miss `IDisposable`/`using` — Java's equivalent is `try-with-resources`. Python developers: similar to Python's GC but with no reference counting.*
- [ ] Java OOP specifics — single inheritance, multiple interface implementation, `abstract` classes, `final`, `record` types
- [ ] JUnit 5 testing — `@Test`, `@ParameterizedTest`, `Assertions`, `@BeforeEach`/`@AfterEach`, test naming conventions

### Module 2: The Spring Boot Mental Model

Spring Boot is the foundation of modern Java web development — but its
IoC container and annotation-driven programming model have no direct
equivalent in most languages. This module builds the mental model first,
then applies it to a working REST API. Understand the container before
you use it.

#### Assignment 2: REST API Service

Build a RESTful task management API with Spring Boot. Expose CRUD
endpoints, handle JSON serialisation, and structure the application
in layers. Data lives in memory — no database yet. The focus is on the
Spring framework, not the data layer.

> **Note for learners and tutors:** The learning objective is the
> Spring Boot programming model — IoC, DI, layered architecture, and
> the REST controller layer. Keep the domain simple (extend Assignment 1's
> `Task` model). The tutor should help with Spring Boot project setup
> and Maven dependency questions so struggle stays on the framework
> concepts.

**Suggested milestones:**

1. **Spring Boot project setup** — Spring Initializr, `spring-boot-starter-web`, first endpoint returning HTTP 200
2. **IoC container** — define `@Service` and `@Repository` beans, inject with constructor injection, understand component scanning
3. **REST controller layer** — `@RestController`, `@GetMapping`/`@PostMapping`/`@PutMapping`/`@DeleteMapping`, `@PathVariable`, `@RequestBody`
4. **DTO pattern** — separate request/response DTOs from domain model, Jackson serialisation
5. **Global error handling** — `@ControllerAdvice`, `@ExceptionHandler`, `ResponseEntity` with appropriate HTTP status codes

**Design questions to surface before starting:**

- In most languages you construct objects and pass dependencies manually (or use a DI library). Spring Boot wires your objects together automatically. What does "Inversion of Control" mean? Who controls object creation, and why does inverting that control matter?
- A Controller calls a Service calls a Repository. What would break if the Controller accessed the in-memory store directly? What does the Service layer give you that a direct call does not?
- Why define a separate DTO (Data Transfer Object) instead of returning your `Task` domain object directly from the API? What would you expose that you might not want to?

**Topics:**

- [ ] Inversion of Control — the container owns object lifecycle; you declare dependencies, not construction. *Paradigm shift: in most languages you call constructors and wire objects manually (or use a lightweight DI library). Spring inverts this — the container creates objects and injects them where declared. You lose direct control of object creation in exchange for decoupling. C# developers who know ASP.NET Core's DI will find this familiar but more convention-driven.*
- [ ] Dependency Injection — constructor injection vs field injection, `@Autowired`, why constructor injection is preferred
- [ ] Spring Boot auto-configuration — `@SpringBootApplication`, component scanning, starter dependencies, what `@EnableAutoConfiguration` does under the hood. *Paradigm shift: unlike explicit configuration in most frameworks (C++ has no equivalent; C#'s ASP.NET Core is more explicit; Python's Django is similar but less annotation-driven), Spring Boot infers configuration from the classpath. It feels like magic — understanding the auto-configuration mechanism demystifies it.*
- [ ] Annotation-driven programming — `@Component`, `@Service`, `@Repository`, `@Bean`, `@Configuration`
- [ ] REST controller layer — `@RestController`, request mapping annotations, `@PathVariable`, `@RequestParam`, `@RequestBody`
- [ ] HTTP request/response lifecycle in Spring — `DispatcherServlet`, handler mapping, message converters
- [ ] JSON serialisation with Jackson — `ObjectMapper`, `@JsonProperty`, DTO pattern, serialisation/deserialisation, `@JsonIgnore`
- [ ] Application layering — Controller → Service → Repository, separation of concerns, why each boundary matters
- [ ] `ResponseEntity` — explicit HTTP status codes, response headers, typed response bodies
- [ ] Global error handling — `@ControllerAdvice`, `@ExceptionHandler`, mapping exceptions to HTTP responses
- [ ] Spring Boot testing — `@WebMvcTest`, `MockMvc`, `@MockBean`

### Module 3: The Data Layer

ORM maps Java objects to relational tables — a powerful abstraction
that hides SQL, but does not make it disappear. This module teaches
you JPA and Spring Data: how the persistence context works, what
Hibernate generates, and where the abstraction costs you if you do
not understand it.

#### Assignment 3: Persistent REST Service

Replace Assignment 2's in-memory store with a real database using
Spring Data JPA. Design entities, write repositories, manage
transactions, and solve the N+1 problem. The REST API surface stays
the same — only the data layer changes.

> **Note for learners and tutors:** The learning objective is JPA
> and the ORM paradigm, not SQL or database design. Use an embedded
> H2 database to keep setup friction low. The tutor should help with
> schema design and SQL questions so struggle stays on JPA and
> Spring Data concepts.

**Suggested milestones:**

1. **Entity design** — annotate `Task` as a `@Entity`, configure `@Id` and `@GeneratedValue`, map columns
2. **Repository layer** — extend `JpaRepository<Task, Long>`, derive queries from method names, write a `@Query`
3. **Transaction management** — add `@Transactional` to the service layer, understand propagation
4. **Relationships** — add a `Category` entity, model a `@ManyToOne` relationship, query across the join
5. **N+1 problem** — reproduce the N+1 query pattern, fix it with a `JOIN FETCH` or `@EntityGraph`

**Design questions to surface before starting:**

- When you call `repository.save(task)`, what SQL is actually executed? How does Hibernate decide whether to `INSERT` or `UPDATE`? What is the persistence context?
- The Service layer calls `repository.findById()` and then accesses a lazily-loaded relationship. What happens if that access happens outside a transaction? Why?
- `@Transactional` can be placed on the controller, service, or repository. Where should it live? What would break if you placed it on the controller instead of the service?

**Topics:**

- [ ] JPA and the ORM paradigm — objects mapped to tables, the persistence context, entity lifecycle (transient → managed → detached → removed)
- [ ] Entity design — `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column`, `@Enumerated`
- [ ] Spring Data JPA repositories — `JpaRepository`, query derivation from method names, `@Query` with JPQL
- [ ] The N+1 problem — lazy loading generates hidden per-row queries; fetch joins and `@EntityGraph` as fixes. *Paradigm shift: ORM hides SQL but does not eliminate it. Lazy loading is convenient but dangerous at scale. You must understand what queries are being generated — use `spring.jpa.show-sql=true` and read the output.*
- [ ] Transaction management — `@Transactional`, ACID properties, propagation levels (`REQUIRED`, `REQUIRES_NEW`), the `LazyInitializationException` and why it happens outside a session
- [ ] Relationship mapping — `@OneToMany`, `@ManyToOne`, `@JoinColumn`, fetch types, cascade options
- [ ] Database migration — Flyway or Liquibase, schema versioning, why you never alter production schema manually
- [ ] Entity vs DTO — risks of exposing entities at the API boundary (circular serialisation, over-exposure, coupling)
- [ ] H2 in-memory database — `application.properties` configuration, H2 console, switching to PostgreSQL for production

### Module 4: Production-Grade Concerns

A working REST API is not a production service. This module adds what
separates the two: authentication, input validation, global error
handling, structured logging, and containerisation. Each concern is
cross-cutting — it applies to the entire application, not a single
layer.

#### Assignment 4: Hardened Service

Take the Assignment 3 service and make it production-ready. Add JWT
authentication, role-based access control, input validation, structured
logging with correlation IDs, and package it in Docker with a PostgreSQL
database via `docker-compose`.

> **Note for learners and tutors:** The learning objective is
> production-grade cross-cutting concerns, not the security domain
> itself. The tutor should explain JWT structure, Spring Security's
> filter chain model, and Docker fundamentals so the learner can focus
> their struggle on wiring these concerns into the application correctly.

**Suggested milestones:**

1. **Spring Security filter chain** — add `spring-boot-starter-security`, configure `SecurityFilterChain`, permit public endpoints
2. **JWT authentication** — implement login endpoint, generate signed JWT, validate token on each request via a `OncePerRequestFilter`
3. **Role-based access control** — define roles, store in JWT claims, enforce with `@PreAuthorize`
4. **Input validation** — add `spring-boot-starter-validation`, annotate DTOs with `@NotNull`/`@NotBlank`/`@Size`, handle `MethodArgumentNotValidException` in `@ControllerAdvice`
5. **Structured logging and observability** — SLF4J + Logback, MDC for request correlation IDs, Spring Boot Actuator health and metrics endpoints
6. **Docker packaging** — `Dockerfile` with multi-stage build, `docker-compose.yml` with PostgreSQL, environment-based configuration

**Design questions to surface before starting:**

- Spring Security intercepts every request through a filter chain before it reaches your controller. How does this compare to middleware in other frameworks? Where in the chain would you add a correlation ID to every request?
- You come from distributed systems. JWT is stateless — the server trusts a signed token without a database lookup. Session-based auth is stateful — the server stores session data. What are the trade-offs for a horizontally scaled service? Which would you choose and why?
- Bean Validation runs before your service layer receives the data. What is the failure mode if you skip validation and the bad data reaches your domain model? What if it reaches the database?

**Topics:**

- [ ] Spring Security architecture — `SecurityFilterChain`, `SecurityContext`, `Authentication` vs `Authorization`, request matching
- [ ] JWT authentication — token structure (header, payload, signature), signing with `io.jsonwebtoken`, stateless validation on each request. *Paradigm shift: web sessions are stateful — the server stores state and the client holds a session ID. JWT is stateless — the server trusts a signed, self-contained token. Think of it as a signed capability token: no lookup needed, but also no server-side revocation without extra infrastructure.*
- [ ] `OncePerRequestFilter` — implementing a custom filter, extracting and validating JWT, setting `SecurityContext`
- [ ] Role-based access control — `@PreAuthorize`, method-level security, `@EnableMethodSecurity`, security expressions (`hasRole`, `hasAuthority`)
- [ ] Bean Validation — `@Valid`, `@NotNull`, `@NotBlank`, `@Size`, `@Pattern`, custom constraint annotations, `MethodArgumentNotValidException`
- [ ] Structured logging — SLF4J API, Logback implementation, MDC (`Mapped Diagnostic Context`) for request-scoped fields (correlation ID, user ID)
- [ ] Observability basics — Spring Boot Actuator, `/actuator/health`, `/actuator/metrics`, securing the Actuator endpoints in production
- [ ] Configuration management — `@ConfigurationProperties`, Spring profiles (`application-dev.yml`, `application-prod.yml`), externalising secrets via environment variables
- [ ] Docker packaging — `Dockerfile` for Spring Boot, multi-stage build (build stage vs runtime image), `docker-compose.yml` with service dependencies, health checks

## What's Next

These topics build on the four assignments. They are not required for
course completion but are natural next steps.

- **Microservices patterns** — service decomposition, inter-service communication (REST vs messaging), API gateway
- **Reactive programming** — Spring WebFlux, Project Reactor, non-blocking I/O (contrast with the thread-per-request model)
- **Caching** — Spring Cache abstraction, Redis integration, cache invalidation strategies
- **API versioning and documentation** — OpenAPI/Swagger, versioning strategies, consumer-driven contracts
- **Advanced testing** — Testcontainers for integration tests, contract testing, performance testing with Gatling

### Capstone: Multi-Tenant Booking System

A self-directed project — no AI tutor, no guided struggle. Build it
yourself and be prepared to explain every design decision.

**The problem:** Build a booking and reservation service that manages
resources (rooms, equipment, vehicles — pick a domain) across multiple
tenant organisations. The service should handle reservation requests
with time-slot validation, prevent double-booking under concurrent
load, enforce per-tenant access control, and expose a secure REST API
for creating bookings, querying availability, and generating
utilisation reports.

**What this adds beyond Assignment 4:**
- **Domain complexity** — time-slot arithmetic, availability windows, conflict detection, cancellation and rebooking logic
- **Concurrent writes** — multiple users booking the same resource simultaneously; optimistic vs pessimistic locking
- **Multi-tenancy** — tenant isolation at the data layer, per-tenant configuration, shared infrastructure
- **Reporting layer** — aggregation queries, pagination, sorting, filtering at scale (e.g., utilisation rates, peak hours)
- **Audit trail** — immutable booking history vs mutable resource state

**Rules:** Build from scratch. No AI-generated code. Test against a
real PostgreSQL database. Your commit history should tell the story of
incremental progress. Be prepared to explain your concurrency strategy
and what breaks under simultaneous booking load.

## Reasoning Review Prompts

> For L&D coordinators and mentors: use these in 1-on-1s to probe for
> genuine understanding beyond completion state. Do not accept "yes I
> know it" — ask the learner to explain, give an example, or identify
> where the concept breaks down.

**After Assignment 1: TaskManager CLI**

- Java's GC manages heap memory — but what does `try-with-resources` handle, and why isn't GC enough for those cases? Give a concrete example from your TaskManager. How does this compare to resource management in your previous language?
- Explain type erasure in Java generics. Why can't you write `new T()` in a generic method? How does this compare to generics or templates in your previous language? What does erasure mean for runtime type inspection with `instanceof`?
- What is the difference between a checked and an unchecked exception? Walk through a decision you made in your TaskManager: why did you choose the exception type you chose?

**After Assignment 2: REST API Service**

- Describe what happens from the moment an HTTP request hits your Spring Boot application to the moment a response is returned. Name every layer it passes through, starting from the servlet container.
- What is the IoC container, and what problem does it solve over manually constructing and wiring objects? Why is constructor injection preferred over field injection with `@Autowired`?
- Why does the Controller → Service → Repository layering matter? Give a concrete change that would only require modifying one layer if the boundaries are respected, and explain what would break if they were not.

**After Assignment 3: Persistent REST Service**

- Reproduce the N+1 problem in words: what sequence of SQL queries does Hibernate generate when you fetch a list of tasks with a lazily-loaded category? How did you fix it, and what trade-offs does your fix introduce?
- What is the JPA persistence context? What is the difference between a managed entity and a detached entity, and what happens when you call `save()` on each?
- Why should you not return JPA entities directly from your REST API? Name two concrete risks, and describe what you used instead.

**After Assignment 4: Hardened Service**

- Describe the JWT authentication flow in your service end-to-end: from login request to a protected endpoint being accessed. What validates the token, and at what point in the request lifecycle?
- Coming from distributed systems: what breaks with session-based authentication under horizontal scaling that JWT avoids? What new problem does JWT introduce in exchange?
- What does Spring Boot Actuator expose by default, and what would you lock down before going to production? Why?

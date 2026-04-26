# Coverage Exercise

This file is the system under test for Assignment 4 of
`testing-fundamentals`. Read it as a tester, not a developer.

---

## The Function

```python
# fine.py
#
# Calculates the fine owed for a returned library book.

import datetime

LOAN_PERIOD_DAYS = 14
DAILY_FINE_RATE = 0.50
STUDENT_DISCOUNT_RATE = 0.50


def calculate_fine(loan_date, return_date, member_type):
    days_held = (return_date - loan_date).days
    days_overdue = days_held - LOAN_PERIOD_DAYS

    if days_overdue <= 0:
        return 0.0

    fine = days_overdue * DAILY_FINE_RATE

    if member_type == 'student':
        fine = fine * STUDENT_DISCOUNT_RATE

    return fine
```

---

## Provided Test Cases

Two test cases are provided. They were written to verify the function
works. Your job is to assess whether they work well enough.

**Test case A**

```
loan_date    = 2026-01-01
return_date  = 2026-01-20
member_type  = 'staff'
expected     = 2.50
```

**Test case B**

```
loan_date    = 2026-03-01
return_date  = 2026-03-08
member_type  = 'student'
expected     = 0.0
```

---

## Coverage Analysis Worksheet

Use this worksheet to guide your analysis. Work through the steps in
order. Do not jump to step 4 before completing steps 1–3.

### Step 1 — Number the branches

Read the function and annotate every decision point. For each `if`
statement, label the True branch and the False branch. How many
branches are there in total?

### Step 2 — Trace test case A

Walk through the function with test case A's inputs. Show your working:

- What is `days_held`?
- What is `days_overdue`?
- Which branch of the first `if` is taken?
- Which branch of the second `if` is taken?
- Which statements are executed?

### Step 3 — Trace test case B

Repeat for test case B.

- What is `days_held`?
- What is `days_overdue`?
- Which branch of the first `if` is taken?
- Does execution reach the second `if`?
- Which statements are executed?

### Step 4 — Identify the gap

Looking at both traces together:

- Which statement is never executed by either test case?
- Which branch is never taken by either test case?
- State the gap precisely: name the condition and which outcome
  (True or False) is untested.

### Step 5 — Write the missing test case

Write one test case — test case C — that closes the coverage gap.
Specify:

- `loan_date`
- `return_date`
- `member_type`
- `expected` result (calculate it by hand)
- Which previously uncovered branch it exercises

### Step 6 — Reflect

Answer these three questions in writing:

1. With test cases A, B, and C you have 100% branch coverage.
   Does that guarantee the function is correct? Describe one
   defect this test set would not catch.

2. Would applying equivalence partitioning to `member_type` have
   produced test case C naturally, even without looking at the code?
   What does that tell you about the relationship between black-box
   techniques and branch coverage?

3. A teammate argues: "We have 100% coverage so we can ship."
   What is wrong with this reasoning?

# Code Quality Violations Reference

This file contains a version of the library system with deliberate code
quality violations. Your task is to find them, name them, and — where the
fix is straightforward — apply it.

Read this file as a reviewer, not a developer. Ask for every name: does
this communicate intent without me having to read the implementation? Ask
for every function: does it do one thing? Does calling it do anything I
would not expect? Ask for every number: would a reader know what this
value means without a comment?

The Audit Worksheet at the bottom guides your analysis.

---

## The Code

```python
# library.py
#
# A library management system.
# All violations are deliberate.

import datetime


# ─────────────────────────────────────────────
# Section 1: Checkout
# ─────────────────────────────────────────────

def co(m, b, ls, dd):
    # check member
    if m is not None:
        # check book
        if b is not None:
            # check available
            if b['av'] == True:
                # check loan limit
                if len([x for x in ls if x['mid'] == m['id']]) < 3:
                    # create loan
                    l = {
                        'mid': m['id'],
                        'bid': b['id'],
                        'dd': dd,
                        'rd': None
                    }
                    b['av'] = False
                    ls.append(l)
                    # notify member
                    print(f"Sending email to {m['em']}")
                    return l
                else:
                    return None
            else:
                return None
        else:
            return None
    else:
        return None


# ─────────────────────────────────────────────
# Section 2: Fine calculation
# ─────────────────────────────────────────────

def calc1(l):
    # calculate fine for an active loan
    t = datetime.date.today()
    if l['rd'] is None:
        d = (t - l['dd']).days
        if d > 0:
            return d * 0.50
    return 0.0


def calc2(data):
    # calculate fine when returning
    today = datetime.date.today()
    if data['rd'] is not None:
        days_late = (data['rd'] - data['dd']).days
        if days_late > 0:
            return days_late * 0.50
    return 0.0


# ─────────────────────────────────────────────
# Section 3: Member management
# ─────────────────────────────────────────────

class Mgr:
    def __init__(self):
        self.d = []

    def getName(self, mid):
        for x in self.d:
            if x['id'] == mid:
                x['ac'] += 1  # track how many times this member's name was looked up
                return x['nm']
        return None

    def fetchMember(self, mid):
        for x in self.d:
            if x['id'] == mid:
                return x
        return None

    def updateData(self, mid, nm, em):
        for x in self.d:
            if x['id'] == mid:
                x['nm'] = nm
                x['em'] = em

    def removeMember(self, mid):
        self.d = [x for x in self.d if x['id'] != mid]

    def addToSystem(self, member):
        self.d.append(member)


# ─────────────────────────────────────────────
# Section 4: Overdue report
# ─────────────────────────────────────────────

def gen(ls, ms):
    # generate overdue report
    r = []
    for l in ls:
        t = datetime.date.today()
        dy = (t - l['dd']).days
        if dy > 14:
            f = (dy - 14) * 0.50
            mn = None
            # find member name
            for m in ms:
                if m['id'] == l['mid']:
                    mn = m['nm']
            if f > 25:
                # high fine — flag for follow-up
                r.append(f"!! {mn}: ${f:.2f} — ESCALATE")
            else:
                r.append(f"{mn}: ${f:.2f}")
    return r
```

---

## Audit Worksheet

Use this worksheet before discussing your findings with the tutor or
applying any fixes. The question for every violation is the same: **what
does this cost the next reader, and what would fix it?**

### Section 1: Checkout

**Naming**

*(List every parameter and local variable. For each: what does it
actually represent? What name would communicate that without requiring
the reader to trace through the code?)*

**The arrow pattern**

*(Draw or describe the shape this code makes. Count the levels of
nesting. What is the maximum nesting depth? What rule does each
conditional enforce?)*

**What fix flattens the arrow?**

*(The fix is called an early return or guard clause. Describe the
approach before applying it: instead of nesting the happy path inside
conditions, what do you do at the top of the function?)*

**What else does this function do that it should not?**

*(Name every distinct action `co` performs. Which of these belong
here and which should be the caller's responsibility?)*

---

### Section 2: Fine calculation

**What is the relationship between `calc1` and `calc2`?**

*(Are they doing the same thing? Something similar? Something
different? Be specific about where they agree and where they differ.)*

**What smell does this represent?**

**What is the fix, and what should the result look like?**

**Magic numbers**

*(List every literal number in this section. For each: what does it
represent? What name would you give it?)*

---

### Section 3: Member management

**Naming: the class and its fields**

*(What does `Mgr` manage? What is `self.d`? Rename both.)*

**Naming: the methods**

*(List the five methods. For each: what does the name communicate, and
what should it communicate? Note which ones use consistent verb pairs
and which do not.)*

**The side effect in `getName`**

*(What does `getName` do beyond returning a name? Why is this
a problem? What would a caller reasonably expect a function named
`getName` to do — and not do?)*

**The fix for the side effect**

*(How do you separate the two concerns? Name the two functions you
would split this into.)*

---

### Section 4: Overdue report

**Naming**

*(List every abbreviated name. What should each one be?)*

**Magic numbers**

*(List every literal number. What does each represent? What would
you name it?)*

**Comments that explain the what**

*(Find every comment that describes what the code does rather than
why. For each: if the code were better named, would the comment still
be needed?)*

**What other violations do you see?**

*(Look for structure-level issues beyond naming and numbers.)*

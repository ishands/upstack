# SOLID Violations Reference

This file contains a version of the library system with deliberate violations
of each SOLID principle. Your task is to find them, name them, and describe
the specific change request each one would resist — before you write a single
line of fixes.

Read this file as an auditor, not a developer. Annotate as you go. The
question for every section is: **what would have to change in the real world
for this code to hurt us?**

---

## The Code

```python
# library.py
#
# A library management system.
# All violations are deliberate. There is at least one per SOLID principle.
# Some sections contain more than one.

import smtplib
import json
from datetime import date, timedelta


# ─────────────────────────────────────────────
# Section 1: Library (the main class)
# ─────────────────────────────────────────────

class Library:
    def __init__(self, name: str, smtp_host: str, smtp_port: int):
        self.name = name
        self.books: list[Book] = []
        self.members: list[Member] = []
        self.loans: list[Loan] = []
        self._smtp_host = smtp_host
        self._smtp_port = smtp_port

    def add_book(self, book: "Book"):
        self.books.append(book)

    def add_member(self, member: "Member"):
        self.members.append(member)

    def check_out(self, member_id: str, isbn: str) -> "Loan":
        member = next((m for m in self.members if m.member_id == member_id), None)
        book = next((b for b in self.books if b.isbn == isbn), None)

        if not member or not book:
            raise ValueError("Member or book not found")
        if not book.is_available:
            raise ValueError("Book is not available")

        loan = Loan(member=member, book=book, due_date=date.today() + timedelta(days=14))
        book.is_available = False
        self.loans.append(loan)

        # Send confirmation email directly from this method
        self._send_email(
            to=member.email,
            subject="Loan confirmation",
            body=f"You have borrowed '{book.title}'. Due: {loan.due_date}"
        )

        # Also write a checkout record to the audit log
        self._write_audit_log(f"CHECKOUT: {member.name} borrowed '{book.title}' on {date.today()}")

        return loan

    def return_book(self, loan: "Loan"):
        loan.book.is_available = True
        loan.returned_on = date.today()
        self.loans.remove(loan)

        # Send return confirmation
        self._send_email(
            to=loan.member.email,
            subject="Return confirmation",
            body=f"You returned '{loan.book.title}'. Thank you."
        )

        self._write_audit_log(f"RETURN: {loan.member.name} returned '{loan.book.title}' on {date.today()}")

    def generate_overdue_report(self) -> str:
        today = date.today()
        overdue = [l for l in self.loans if l.due_date < today]
        lines = [f"OVERDUE REPORT — {today}", "=" * 40]
        for loan in overdue:
            fine = (today - loan.due_date).days * 0.50
            lines.append(f"  {loan.member.name}: '{loan.book.title}' — ${fine:.2f} fine")
        return "\n".join(lines)

    def export_catalogue(self) -> str:
        return json.dumps([{"title": b.title, "isbn": b.isbn, "available": b.is_available}
                           for b in self.books], indent=2)

    def _send_email(self, to: str, subject: str, body: str):
        with smtplib.SMTP(self._smtp_host, self._smtp_port) as server:
            message = f"Subject: {subject}\n\n{body}"
            server.sendmail("library@example.com", to, message)

    def _write_audit_log(self, entry: str):
        with open("audit.log", "a") as f:
            f.write(entry + "\n")


# ─────────────────────────────────────────────
# Section 2: Item types
# ─────────────────────────────────────────────

class Book:
    def __init__(self, title: str, author: str, isbn: str):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.is_available = True

    def check_out(self, member: "Member") -> "Loan":
        if not self.is_available:
            raise ValueError("Book is not available")
        self.is_available = False
        return Loan(member=member, book=self, due_date=date.today() + timedelta(days=14))

    def calculate_fine(self, loan: "Loan") -> float:
        if loan.returned_on and loan.returned_on > loan.due_date:
            overdue_days = (loan.returned_on - loan.due_date).days
            return overdue_days * 0.50
        today = date.today()
        if today > loan.due_date:
            return (today - loan.due_date).days * 0.50
        return 0.0


class ReferenceBook(Book):
    """A reference book that cannot leave the library."""

    def check_out(self, member: "Member") -> "Loan":
        # Reference books cannot be borrowed
        raise NotImplementedError("Reference books cannot be checked out")

    def calculate_fine(self, loan: "Loan") -> float:
        # Reference books cannot be loaned, so this should never be called
        raise NotImplementedError("Reference books cannot have loans")


class EBook(Book):
    """A digital book. Multiple members can borrow simultaneously."""

    def __init__(self, title: str, author: str, isbn: str, download_url: str):
        super().__init__(title, author, isbn)
        self.download_url = download_url
        self.is_available = True  # always available for digital loans

    def check_out(self, member: "Member") -> "Loan":
        # EBooks don't become unavailable — multiple copies can exist
        return Loan(member=member, book=self, due_date=date.today() + timedelta(days=14))

    def calculate_fine(self, loan: "Loan") -> float:
        # E-books have a flat fine, not a daily rate
        if loan.returned_on and loan.returned_on > loan.due_date:
            return 5.00
        if date.today() > loan.due_date:
            return 5.00
        return 0.0


# ─────────────────────────────────────────────
# Section 3: Fine calculator
# ─────────────────────────────────────────────

def calculate_fine(book_type: str, loan: "Loan") -> float:
    """Calculate the fine for an overdue loan based on book type."""
    if book_type == "physical":
        if loan.returned_on and loan.returned_on > loan.due_date:
            return (loan.returned_on - loan.due_date).days * 0.50
        today = date.today()
        if today > loan.due_date:
            return (today - loan.due_date).days * 0.50
        return 0.0
    elif book_type == "ebook":
        overdue = loan.returned_on > loan.due_date if loan.returned_on else date.today() > loan.due_date
        return 5.00 if overdue else 0.0
    elif book_type == "periodical":
        # Periodicals are charged at double the daily rate
        if loan.returned_on and loan.returned_on > loan.due_date:
            return (loan.returned_on - loan.due_date).days * 1.00
        today = date.today()
        if today > loan.due_date:
            return (today - loan.due_date).days * 1.00
        return 0.0
    else:
        raise ValueError(f"Unknown book type: {book_type}")


# ─────────────────────────────────────────────
# Section 4: Catalogue item interface
# ─────────────────────────────────────────────

class CatalogueItem:
    """Interface for all items in the library catalogue."""

    def get_title(self) -> str:
        raise NotImplementedError

    def get_isbn(self) -> str:
        raise NotImplementedError

    def is_available(self) -> bool:
        raise NotImplementedError

    def check_out(self, member: "Member") -> "Loan":
        raise NotImplementedError

    def get_download_url(self) -> str:
        """Returns the download URL for digital items."""
        raise NotImplementedError

    def get_physical_location(self) -> str:
        """Returns the shelf location for physical items."""
        raise NotImplementedError

    def get_current_issue(self) -> str:
        """Returns the current issue number for periodicals."""
        raise NotImplementedError


class PhysicalBookItem(CatalogueItem):
    def __init__(self, title: str, isbn: str, shelf: str):
        self._title = title
        self._isbn = isbn
        self._shelf = shelf
        self._available = True

    def get_title(self) -> str:
        return self._title

    def get_isbn(self) -> str:
        return self._isbn

    def is_available(self) -> bool:
        return self._available

    def check_out(self, member: "Member") -> "Loan":
        self._available = False
        return Loan(member=member, book=self, due_date=date.today() + timedelta(days=14))

    def get_download_url(self) -> str:
        raise NotImplementedError("Physical books do not have download URLs")

    def get_physical_location(self) -> str:
        return self._shelf

    def get_current_issue(self) -> str:
        raise NotImplementedError("Physical books do not have issues")


# ─────────────────────────────────────────────
# Section 5: Member and Loan (no violations here)
# ─────────────────────────────────────────────

class Member:
    def __init__(self, member_id: str, name: str, email: str):
        self.member_id = member_id
        self.name = name
        self.email = email


class Loan:
    def __init__(self, member: Member, book, due_date: date):
        self.member = member
        self.book = book
        self.due_date = due_date
        self.returned_on: date | None = None
```

---

## Audit Worksheet

Use this worksheet to record your findings before discussing them with your
tutor. For each principle, identify the violation in the code above and
describe the specific scenario that would reveal the cost.

### Single Responsibility Principle

**Where is the violation?**

*(Which class or function? What is it doing that it should not be?)*

**What change request would this resist?**

*(Describe a realistic scenario — a new feature, a new requirement — and
explain which files it would force you to touch.)*

---

### Open/Closed Principle

**Where is the violation?**

**What change request would this resist?**

---

### Liskov Substitution Principle

**Where is the violation?**

**What change request would this resist?**

*(Hint: what happens if you write code that processes a list of `Book`
objects without knowing which subtype each one is?)*

---

### Interface Segregation Principle

**Where is the violation?**

**What change request would this resist?**

*(Hint: look at `CatalogueItem` and `PhysicalBookItem`.)*

---

### Dependency Inversion Principle

**Where is the violation?**

**What change request would this resist?**

---

## What Comes Next

Once you have completed your audit and discussed it with your tutor:

1. Apply the same lens to your own Assignment 2 codebase
2. Pick one violation per principle that you want to fix
3. For each fix, document: what it looked like before, what it looks like
   after, and what change request it can now accommodate

The goal is not a perfectly SOLID codebase — it is the ability to see
violations and articulate exactly what they cost.

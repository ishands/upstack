# HireTrack — Feature Specification

This file is the system under test for `testing-fundamentals`.
Treat every constraint stated here as a requirement to verify.
If a behaviour is not stated, note the gap: a missing specification
is a test case waiting to be written.

---

## Section 1: Application Intake Form

The public application form is the entry point for all candidates.
Each job posting has its own form URL. Submissions are stored as
candidate records attached to the posting.

**Fields:**

| Field | Required? | Constraints |
|---|---|---|
| Applicant name | Yes | Minimum 2 characters, maximum 100 characters. Any Unicode character is accepted. |
| Email address | Yes | Must contain exactly one `@` symbol, a domain with at least one dot, and no spaces. Used to send the confirmation email. |
| CV | Yes | PDF files only. Maximum file size: 5 MB. |
| Cover note | No | Maximum 2,000 characters. If left blank, the field is omitted from the candidate record. |

**Submission behaviour:**

- If all required fields are valid, the application is saved and a
  confirmation email is sent to the address in the Email field.
- If any required field is missing or invalid, the form displays the
  relevant error message and no application is saved.
- Error messages are displayed inline, adjacent to the field that
  failed validation.
- The CV size limit error message is: *"File size must be 5 MB or
  less."*
- The CV type error message is: *"Only PDF files are accepted."*
- The cover note length error message is: *"Cover note must be 2,000
  characters or fewer."*

---

## Section 2: Pipeline Stage Transitions

Every candidate in HireTrack progresses through a hiring pipeline.
The pipeline is a state machine with one initial state, several
intermediate states, and two terminal states.

**States:**

| State | Type | Description |
|---|---|---|
| Applied | Initial | Candidate has submitted an application. |
| Screened | Intermediate | Recruiter has reviewed the application. |
| Phone Interview | Intermediate | Phone screen scheduled or completed. |
| On-site | Intermediate | On-site or video panel interview scheduled or completed. |
| Offer | Intermediate | Offer extended to the candidate. |
| Hired | Terminal | Candidate has accepted the offer. |
| Rejected | Terminal | Candidate has been removed from the process. |

**Valid transitions:**

| From | To | Action | Who can perform |
|---|---|---|---|
| Applied | Screened | Screen candidate | Recruiter |
| Screened | Phone Interview | Schedule phone interview | Recruiter |
| Phone Interview | On-site | Advance to on-site | Recruiter or Hiring Manager |
| On-site | Offer | Make offer | Hiring Manager |
| Offer | Hired | Confirm acceptance | Recruiter |
| Applied | Rejected | Reject candidate | Recruiter or Hiring Manager |
| Screened | Rejected | Reject candidate | Recruiter or Hiring Manager |
| Phone Interview | Rejected | Reject candidate | Recruiter or Hiring Manager |
| On-site | Rejected | Reject candidate | Recruiter or Hiring Manager |
| Offer | Rejected | Reject candidate (declined offer) | Recruiter or Hiring Manager |

**Rules:**

- A candidate can be rejected from any state except Hired.
- A candidate in a terminal state (Hired or Rejected) cannot be
  transitioned further.
- Any transition not listed in the valid transitions table is invalid.
  The system must return an error and leave the candidate's state
  unchanged.

---

## Section 3: Email Notification Rules

When a candidate's stage changes, the system evaluates the following
two conditions to determine who to notify:

**Condition A — Stage entered:** the state the candidate has moved
into (one of: Screened, Phone Interview, On-site, Offer, Rejected).

**Condition B — Posting setting "Notify candidates on rejection":**
a per-posting configuration value set by the recruiter when creating
the job posting (Enabled or Disabled).

**Notification rules:**

1. When a candidate enters **Screened**: the assigned recruiter is
   notified. No other notifications are sent.
2. When a candidate enters **Phone Interview**: the candidate is
   notified. No other notifications are sent.
3. When a candidate enters **On-site**: the candidate is notified.
   No other notifications are sent.
4. When a candidate enters **Offer**: the hiring manager is notified.
   No other notifications are sent.
5. When a candidate enters **Rejected** and the posting's
   "Notify candidates on rejection" setting is **Enabled**: the
   candidate is notified. No other notifications are sent.
6. When a candidate enters **Rejected** and the posting's
   "Notify candidates on rejection" setting is **Disabled**: no
   notification is sent to anyone.

**Note on scope:** Stage transitions to Hired are not in scope for
this notification specification. Offer acceptance communication is
handled outside the system.

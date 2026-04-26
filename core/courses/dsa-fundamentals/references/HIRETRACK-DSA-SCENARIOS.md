# HireTrack — Data Structure Scenarios

This file provides the data scenarios and sample data for all four
assignments in `dsa-fundamentals`. Read each section only when you reach
the corresponding assignment — do not read ahead.

---

## Section 1 — The Candidate Roster

HireTrack stores a collection of candidate records. Each candidate has:

- A unique candidate ID
- A full name
- An email address
- A current pipeline stage
- The ID of the job posting they applied to

**Sample data:**

| ID   | Name         | Email                  | Stage           | Posting |
|------|--------------|------------------------|-----------------|---------|
| C001 | Alice Chen   | alice@example.com      | Phone Interview | P001    |
| C002 | Bob Patel    | bob@example.com        | Applied         | P002    |
| C003 | Sara Jones   | sara@example.com       | Screened        | P001    |
| C004 | James Okafor | james@example.com      | On-site         | P001    |
| C005 | Maya Lim     | maya@example.com       | Rejected        | P002    |

**The primary operation:** HireTrack looks up candidates by ID dozens of
times per page load — to display a candidate's profile, to check their
stage, to load their record for a transition. Lookups by email occur
occasionally, during duplicate-submission checks.

---

## Section 2 — Pipeline Tracker and Notification Settings

HireTrack tracks two related but distinct data problems:

**Problem A — Candidate stage history:** Each candidate has a current
stage and a full record of every stage they have passed through, in
order. The history is needed for audit trails and for the timeline view
on a candidate's profile.

**Problem B — Posting notification settings:** Each job posting has a
"notify candidates on rejection" setting, configured by the recruiter
when the posting is created. This setting applies to every candidate on
that posting.

**Sample data — candidate stage histories:**

| ID   | Name         | Current Stage   | Stage History                                   | Posting |
|------|--------------|-----------------|--------------------------------------------------|---------|
| C001 | Alice Chen   | Phone Interview | Applied → Screened → Phone Interview             | P001    |
| C002 | Bob Patel    | Applied         | Applied                                          | P002    |
| C003 | Sara Jones   | Screened        | Applied → Screened                               | P001    |
| C004 | James Okafor | On-site         | Applied → Screened → Phone Interview → On-site   | P001    |
| C005 | Maya Lim     | Rejected        | Applied → Rejected                               | P002    |

**Sample data — posting notification settings:**

| ID   | Title                   | Notify on Rejection |
|------|-------------------------|---------------------|
| P001 | Senior Software Engineer | Enabled             |
| P002 | Junior Developer         | Disabled            |

---

## Section 3 — The Legacy Roster

An earlier version of HireTrack stored candidate records as a Python
list of pipe-separated strings. Each string encodes: candidate ID, name,
email, and current stage — in that order, separated by `|`.

```python
candidates = [
    "C001|Alice Chen|alice@example.com|Phone Interview",
    "C002|Bob Patel|bob@example.com|Applied",
    "C003|Sara Jones|sara@example.com|Screened",
    "C004|James Okafor|james@example.com|On-site",
    "C005|Maya Lim|maya@example.com|Rejected",
]
```

This structure was written quickly when HireTrack had three users and
five candidates. It has been in production for eight months. It works —
data is stored and can be printed. The engineering team is now being
asked to:

- Find a candidate by ID to load their profile page
- Update a candidate's stage when they advance
- Add a posting ID field to every record
- Check whether a candidate with a given email has already applied

---

## Section 4 — The Reporting Dashboard

HireTrack is adding a reporting dashboard for recruiters. The dashboard
answers one question: **for each job posting, how many candidates are
currently at each pipeline stage?**

A recruiter opens the dashboard and sees something like:

```
P001 — Senior Software Engineer
  Applied:         0
  Screened:        1
  Phone Interview: 1
  On-site:         1
  Offer:           0
  Hired:           0
  Rejected:        0

P002 — Junior Developer
  Applied:         1
  Screened:        0
  Phone Interview: 0
  On-site:         0
  Offer:           0
  Hired:           0
  Rejected:        1
```

**Operational context:**

- Recruiters open the dashboard several times per day.
- The underlying data changes when a candidate advances or is rejected —
  typically a few times per hour during active hiring.
- Reads (viewing the dashboard) are far more frequent than writes
  (candidate transitions).
- The dashboard does not need to show candidate names — only totals per
  stage per posting.
- Use the same five candidates and two postings from Section 1 and
  Section 2 as your sample data.

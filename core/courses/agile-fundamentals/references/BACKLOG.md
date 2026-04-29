# HireTrack — Product Backlog

**Last updated:** 2026-04-14
**Status key:** `[ ]` todo · `[~]` in progress · `[x]` done · `[-]` descoped

---

## v0.1.0

Tagged. Shipped to internal users on 2026-02-28.

A minimal system to replace the spreadsheets the recruiting team was using.
Goal: any recruiter can manage a job posting and see who has applied.

### Core

- [x] User accounts — Recruiter and Hiring Manager roles; password login
- [x] Job posting management — create, edit, and archive postings; visible on internal portal
- [x] Application intake — public application form per posting; stores name, email, CV upload, and cover note
- [x] Candidate list — table view per posting; sortable by application date; no filtering yet
- [-] Candidate scoring — numeric score per candidate set by recruiter. Descoped: no agreement on what the score means or who sets it

---

## v0.2.0

Target: end of April 2026. In progress.

Move the team from "list of applicants" to "structured hiring pipeline." A hiring
manager should be able to see every candidate's position in the process without
asking a recruiter.

### Pipeline

- [x] Pipeline stages — configurable stages per posting; defaults: Applied → Screened → Phone Interview → On-site → Offer → Hired / Rejected
- [x] Stage transitions — move a candidate from one stage to the next; records who made the move and when; reason field optional
- [~] Candidate profile page — consolidated view: application details, full stage history, all interviewer notes. Design agreed; frontend in progress.
- [ ] Email notifications on stage transition — notify relevant parties when a candidate's status changes. Stages TBD. Template not written yet.
- [ ] Bulk candidate status update — select multiple candidates, apply the same stage transition in one action

### Interviews

- [x] Interview scheduling — generate a Calendly scheduling link; attach confirmed slot to candidate profile
- [x] Interview feedback form — per-interviewer structured form: overall rating (1–5), strengths free-text, concerns free-text, hire recommendation (Yes / No / Maybe)
- [ ] Feedback summary — aggregate ratings and recommendations from all interviewers on the candidate profile; surface consensus and divergence at a glance

---

## v0.3.0

Planned. No commitments yet — this is intent, not schedule.

- [ ] Offer management — generate offer letter from template; track candidate response (Accepted / Declined / Negotiating); store signed copy
- [ ] Reporting — time-to-hire per role; pipeline conversion rate per stage; candidate source breakdown (applied directly, referral, agency, LinkedIn)
- [ ] LinkedIn integration — paste a LinkedIn profile URL; system imports name, current role, experience, and education into the candidate profile
- [ ] Calendar sync — two-way Google Calendar / Outlook sync for interview slots; remove Calendly dependency for teams that prefer native calendar

---

## Unplanned

Items that have arrived but have no milestone assignment yet.
Each item needs a placement decision before the next planning session.

- [ ] **GDPR compliance** — candidates are requesting the right to access and delete their personal data under GDPR Article 17. Legal flagged this as a compliance obligation, not a product feature. No delivery deadline provided yet, but legal has asked for a written response plan within two weeks.
- [ ] **Slack notifications** — two hiring managers have asked for new-application alerts in their team Slack channel. Raised during the v0.2.0 demo session. No formal requirement written.
- [ ] **Bulk candidate import** — migrate approximately 500 candidate records from the legacy spreadsheet system before it is decommissioned. Ops team deadline: 31 May 2026. One-time data migration; not a recurring feature.
- [ ] **Custom scoring criteria** — one hiring manager wants to define weighted scoring attributes per role (example: "Python skills: weight 3, communication: weight 2"). No other hiring manager has raised this. No agreed scoring model exists.

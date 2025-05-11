# Implementation Plan & Build Status: Scenario Margin Modeling Tool

## Project Overview

*(For detailed project goals, vision, user personas, features, and scope, please see `010-product-requirements.md`.)*

**Current Status:**

* In Progress: `Phase 1 – Scaffold Project Structure`
* Last Completed Task: `Requirements and Architecture Alignment`
* Last GitHub Push: `[TBD – Pending Initial Commit]`

---

## Task Tracker

### Legend

* [ ] \= Not started
* \[\~] = In progress
* [x] \= Complete
* **(Approved)** = Confirmed by user to proceed
* **(Push to GitHub?)** = Cursor asks user if code should be committed and pushed

---

### Task List

#### 1. **Scaffold Project Structure**

* Status: \[\~]
* Acceptance Criteria:

  * Frontend initialized with Vite + TypeScript
  * Backend initialized with FastAPI
  * Folder structure includes `components/`, `app/`, `api/`, `lib/`
  * `README.md` and this implementation plan included

#### 2. **Set Up Authentication**

* Status: \[ ]
* Acceptance Criteria:

  * Clerk.dev integrated
  * Routes protected
  * Login/logout UI in header
* (Approved)
* (Push to GitHub?)

#### 3. **Build Dashboard Layout**

* Status: \[ ]
* Acceptance Criteria:

  * Sidebar + top bar styled using Modern VRO conventions
  * Uses Radikal font and shadcn/ui components
  * Logo placed in top left corner

#### 4. **New Scenario Entry Form**

* Status: \[ ]
* Acceptance Criteria:

  * Organized sections for: Info, Compensation, Billing, Fees
  * Field tooltips present
  * Uses default values where available
  * Submits to backend

#### 5. **Scenario Summary View**

* Status: \[ ]
* Acceptance Criteria:

  * View of revenue and margin (monthly + annual)
  * Includes inline editable fields
  * Includes expandable advanced metrics section

#### 6. **Scenario Grouping + Comparison View**

* Status: \[ ]
* Acceptance Criteria:

  * Supports assigning to groups and comparing up to 4 scenarios
  * Highlights key differences and preferred (baseline) flag

#### 7. **Supabase + Backend Schema Setup**

* Status: \[ ]
* Acceptance Criteria:

  * Tables: scenarios, scenario\_groups, default\_settings, tags, users
  * CRUD endpoints for scenarios, defaults, and groups
  * All calculated fields supported

#### 8. **Filters, Tags, and Favorites**

* Status: \[ ]
* Acceptance Criteria:

  * Users can search scenarios by name, project, date, etc.
  * Tag UI with multi-select support
  * Toggle favorite flag

#### 9. **Default Settings Panel**

* Status: \[ ]
* Acceptance Criteria:

  * Admin panel to set/update tax %, bonus %, overhead, etc.
  * Saves to backend
  * Prefills new scenario form

#### 10. **Export & Sharing**

* Status: \[ ]
* Acceptance Criteria:

  * Export to PDF/CSV
  * Includes current view, logo, advanced fields if visible

#### 11. **Polish & QA**

* Status: \[ ]
* Acceptance Criteria:

  * Full test pass on scenario math, exports, inline editing
  * All tooltips present
  * Mobile-safe and accessible UI

---

## Cursor Instructions (Built-In)

* After finishing each task, mark it `[x]`, and update the "Current Status" above
* Ask the user:

  > **"Should I proceed with the next task?"**
  > **"Do you want to push these changes to GitHub?"**
* Only move on if the user confirms
* Do not delete any tasks or sections unless the user explicitly says so

---

## Notes / Decisions Log

| Date       | Note                                                                 |
| ---------- | -------------------------------------------------------------------- |
| 2025-05-11 | Approved HUBZone fee toggle and expandable advanced metrics          |
| 2025-05-11 | Agreed to store all derived fields but hide advanced ones by default |
| 2025-05-11 | Will follow Modern VRO visual style and Packaged Agile brand         |

**Document Version:** 1.1
**Last Updated:** 2025-05-11

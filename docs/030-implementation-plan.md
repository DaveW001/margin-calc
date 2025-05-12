# Implementation Plan & Build Status: Scenario Margin Modeling Tool

## Project Overview

*(For detailed project goals, vision, user personas, features, and scope, please see `010-product-requirements.md`.)*

**Current Status:**

* In Progress: `Task 4 – New Scenario Entry Form (Debugging Visibility Issue)`
* Last Completed Task: `Task 3 – Build Dashboard Layout`
* Last GitHub Push: `[TBD – Pending Initial Commit]`

Task 3 is completed. The dashboard layout has been implemented with a header, sidebar, and main content area, styled using Tailwind CSS and shadcn/ui components.
Task 4 is in progress. The form UI (`NewScenarioForm.tsx`, `FormSection.tsx`) has been built using shadcn/ui components to match the wireframe structure. However, a CSS rendering issue is currently preventing the form elements from being visually displayed, although they exist in the DOM. Troubleshooting is ongoing (see `docs/080-troubleshooting-log-form-visibility.md`).

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

* Status: [x]
* Acceptance Criteria:

  * Frontend initialized with Vite + TypeScript
  * Backend initialized with FastAPI
  * Folder structure includes `components/`, `app/`, `api/`, `lib/`
  * `README.md` and this implementation plan included

#### 2. **Set Up Authentication**

* Status: [x]
* Acceptance Criteria:

  * Clerk.dev integrated
  * Routes protected
  * Login/logout UI in header
* (Approved)
* (Push to GitHub?)

#### 3. **Build Dashboard Layout**

* Status: [x]
* Acceptance Criteria:

  * Sidebar + top bar styled using Modern VRO conventions
  * Uses Radikal font and shadcn/ui components
  * Logo placed in top left corner

#### 4. **New Scenario Entry Form**

* Status: `[~]` (UI built, debugging visibility issue)
* Acceptance Criteria:

  * Organized sections for: Info & Project, Time & Performance, Compensation Inputs, Client Billing Inputs, Overhead & Fees, and Tags & Scenario Group (as per `wireframe-new-scenario.md`). ✅ (Structure exists)
  * Field tooltips present ✅ (Implemented)
  * Uses default values where available 🟡 (Defaults not yet implemented)
  * Submits to backend ❌ (Submission logic not yet implemented)
  * Conditional display of fields for W-2 vs. 1099 staff types implemented (PRD F001, `wireframe-new-scenario.md`). ✅ (Implemented)
  * Conditional display of fields based on Billing Type (Hourly vs. Fixed Price) implemented (PRD F007, `wireframe-new-scenario.md`). ✅ (Implemented)
  * Separate inputs for 'Payable Hours' and 'Billable Hours' implemented (PRD F008, `wireframe-new-scenario.md`). ✅ (Inputs exist)
  * Workload Mode (Hours/Month, Hours/Year) and Period (start/end dates) inputs implemented (`wireframe-new-scenario.md`). ✅ (Implemented)
  * **Form elements are visually rendered correctly.** ❌ (Current blocker)

#### 5. **Scenario Summary View**

* Status: \[ ]
* Acceptance Criteria:

  * View of revenue and margin (monthly + annual)
  * Includes inline editable fields
  * Includes expandable advanced metrics section
  * Display of key scenario details (name, staff type, period, etc.) consistent with comparison view needs.
  * Functionality for Favorite/Unfavorite and Tag editing available on the view.

#### 6. **Scenario Grouping + Comparison View**

* Status: \[ ]
* Acceptance Criteria:

  * Supports assigning to groups and comparing up to 4 scenarios
  * Highlights key differences and preferred (baseline) flag
  * Layout aligns with `wireframe-comparison.md` (e.g., fixed left column for metrics, scrollable scenario columns).
  * Actions per scenario (Edit, Duplicate, Set Baseline) are functional as described in `wireframe-comparison.md`.

#### 7. **Supabase + Backend Schema Setup**

* Status: \[ ]
* Acceptance Criteria:

  * Tables: scenarios, scenario\_groups, default\_settings, tags, users
  * CRUD endpoints for scenarios, defaults, and groups
  * All calculated fields supported
  * The `scenarios` table schema supports all input fields from `wireframe-new-scenario.md`, including distinctions for W-2/1099, billing models, and HUBZone details.

#### 8. **Filters, Tags, and Favorites**

* Status: \[ ]
* Acceptance Criteria:

  * Users can search scenarios by name, project, date, etc.
  * Tag UI with multi-select support
  * Toggle favorite flag
  * Users can filter scenarios by 'Scenario Group'.

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

#### 12. **Create Calculator Interface**

* Status: \[ ]
* Acceptance Criteria:

  * Interface for creating and managing scenarios
  * Input fields for scenario details
  * Integration with backend for data handling

#### 13. **Implement Calculation Logic**

* Status: \[ ]
* Acceptance Criteria:

  * Development of logic to calculate margin and revenue
  * Integration with backend for data processing
  * Validation of input data

#### 14. **Add Data Persistence**

* Status: \[ ]
* Acceptance Criteria:

  * Implementation of data storage mechanisms
  * Integration with backend for data handling
  * Ensure data consistency and integrity

#### 15. **Add User Settings**

* Status: \[ ]
* Acceptance Criteria:

  * Implementation of user-specific settings
  * Integration with backend for data handling
  * Ensure user-specific data consistency

#### 16. **Add Export Functionality**

* Status: \[ ]
* Acceptance Criteria:

  * Implementation of export functionality
  * Integration with backend for data handling
  * Ensure data export consistency

#### 17. **Add Visualization**

* Status: \[ ]
* Acceptance Criteria:

  * Implementation of visualization components
  * Integration with backend for data handling
  * Ensure visualization consistency

#### 18. **Deploy to Production**

* Status: \[ ]
* Acceptance Criteria:

  * Deployment of the application to production environment
  * Integration with backend for data handling
  * Ensure production consistency

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
| 2025-05-12 | New Scenario Form UI built, but CSS rendering issue prevents visibility. |

**Document Version:** 1.2
**Last Updated:** 2025-05-12

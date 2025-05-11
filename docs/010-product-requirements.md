# Product Requirements Document (PRD)

## 1. Introduction & Vision

**What are we building?**
* A scenario-based margin modeling tool for Packaged Agile. It allows users to model, compare, and manage cost and revenue scenarios for staff on government or commercial projects.

**For whom are we building it?**
* Internal financial planners, hiring managers, and business development leads at Packaged Agile.

**What is the core problem this product solves or the primary value it delivers?**
* Provides fast, flexible margin analysis across different staffing types, pay levels, billing models, and HUBZone configurations. Supports better decisions during proposal, hiring, and pricing phases.

---

## 2. Goals & Objectives

**Why are we building this?**
* Improve pricing accuracy and speed for proposals
* Support side-by-side scenario comparison to inform staff structure decisions
* Centralize margin logic with ClickUp integration for smoother applicant tracking

**Success Metrics:**
* 100% of proposals include scenarios modeled in this tool
* Reduction in proposal pricing rework by 50%
* Internal user satisfaction ? 4.5 / 5.0 on usability

---

## 3. Target Audience / User Personas

**Persona 1: BD Pricing Analyst**
* **Description:** Responsible for preparing labor pricing for federal proposals.
* **Needs/Pain Points Addressed:** Wants fast, clear comparisons between W-2 and 1099 staff and visibility into margin thresholds.

**Persona 2: Operations Lead**
* **Description:** Helps hire staff and needs to validate that margins meet internal guidelines.
* **Needs/Pain Points Addressed:** Needs fast answers on whether candidates can be converted, paid more, or staffed differently.

---

## 4. Key Features / User Stories

| Feature ID | User Story                                                                                                                                                    | Priority    | Acceptance Criteria                                                                                                                                          | Notes                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| `F001`     | As a user, I want to create a new scenario with staff details and financial assumptions so that I can assess margin.                                          | Must Have   | Form includes fields for person, project, staff type, hours, salary/rate, taxes, bonus, overhead, HUBZone, bill rate or fixed fee, and client billing hours. | Includes tooltips on all fields           |
| `F002`     | As a user, I want to compare multiple scenarios side-by-side so I can see financial impact.                                                                   | Must Have   | Table view shows each scenario’s monthly and annual revenue and margin, with optional favorite and baseline flag.                                            | Up to 4 scenarios at once                 |
| `F003`     | As a user, I want to search for past scenarios by person, project, or date range so I can reuse or reference them.                                            | Must Have   | Search filters + keyword input. Supports tag and favorite filters.                                                                                           | Includes saved filters                    |
| `F004`     | As a user, I want to set and manage default values for taxes, benefits, overhead, etc.                                                                        | Must Have   | Dedicated settings panel. Defaults prefill new scenarios.                                                                                                    | Only editable by admins                   |
| `F005`     | As a user, I want to view and edit some fields inline from the scenario summary without opening a full form.                                                  | Should Have | Pencil icon enables editing salary, bonus, bill rate, etc., inline. Triggers recalculation.                                                                  | Show edited fields visually               |
| `F006`     | As a user, I want to flag if a W-2 employee lives in a HUBZone.                                                                                               | Must Have   | Field appears only if staff type = W-2. Options: Yes / No / TBD.                                                                                             | Used for compliance checks                |
| `F007`     | As a user, I want to choose a billing model that supports either hourly billing or a fixed-price amount so I can accurately represent client contracts.       | Must Have   | Selection between hourly vs. fixed billing. Only relevant fields shown.                                                                                      | Used in revenue calculations              |
| `F008`     | As a user, I want to override the number of payable hours for a person separately from billable hours so I can reflect partial-billable or overstaffed cases. | Must Have   | Separate inputs for billable and payable hours.                                                                                                              | Impacts revenue vs. cost calculation      |
| `F009`     | As a user, I want to view monthly and annual revenue and margin in both dollar and percentage formats so I can quickly evaluate financial health.             | Must Have   | Monthly Revenue (\$), Monthly Margin (\$), Annual Revenue (\$), Annual Margin (\$), Annual Margin (%).                                                       | Displayed on summary and comparison views |

---

## 5. User Flows

**Flow 1: New Scenario Creation**

1. User clicks "New Scenario"
2. User fills form (person, staff type, hours, rate/salary, bill model, dates)
3. Scenario auto-named ("Name – Project")
4. User saves ? redirected to summary view with results

**Flow 2: Inline Edit on Summary**

1. User clicks pencil icon next to a field
2. Field turns editable ? user modifies value
3. Result recalculates and field is saved automatically

**Flow 3: Scenario Comparison**

1. User selects scenarios in a group
2. Clicks "Compare"
3. Table displays side-by-side financials and metadata

---

## 6. In-Scope Items

* W-2 and 1099 modeling
* Monthly & annual margin calculations
* Default value management
* ClickUp URL linking
* Tags, favorites, and baseline flag
* Billable vs. payable hours
* Fixed-price billing model
* Tooltip support for all fields
* Inline overrides for key financial fields

---

## 7. Out-of-Scope Items

* Time tracking or live ClickUp sync
* Resume uploads
* Payment processing

---

## 8. Technology Stack Overview

* **Frontend:** React with TypeScript
* **Backend:** FastAPI (Python)
* **Database:** Supabase (PostgreSQL)
* **Authentication:** Clerk.dev
* **Styling:** Tailwind CSS with shadcn/ui
* **Hosting:** Render.com
* **Other Libraries:** Radikal font, ClickUp API (links only)

---

## 9. Assumptions & Constraints

**Assumptions:**

* Scenarios are created manually (not auto-generated from ClickUp)
* Users will enter data from applicant discussions or pricing models

**Constraints:**

* Must work well on desktop resolution
* Must support tooltips and inline override UX
* Should calculate all financial values client-side in real time

---

**Document Version:** 1.2
**Last Updated:** 2025-05-11
**Point of Contact:** Dave W. (Packaged Agile)

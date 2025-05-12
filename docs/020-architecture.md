# Architecture Document: Scenario Margin Modeling Tool

## 1. Overview

A full-stack web application built using Packaged Agile's standard architecture to support flexible scenario-based staff margin modeling. It is secure, modular, and designed for easy extensibility.

---

## 2. System Architecture Diagram

```
[React + shadcn/ui Frontend]
     |
     | Clerk.dev Authentication
     |
[FastAPI Backend (Python)]
     |
     | REST API
     |
[Supabase (PostgreSQL)]
     |
     | Row-level security
     |
[Render Deployment]
```

---

## 3. Tech Stack

| Layer      | Tech Stack                              |
| ---------- | --------------------------------------- |
| Frontend   | React (Vite), TypeScript, Tailwind CSS, shadcn/ui, Radikal font |
| Auth       | Clerk.dev                               |
| Backend    | FastAPI (Python 3.x), Pydantic          |
| Database   | Supabase (PostgreSQL)                   |
| Deployment | Render.com                              |
| Tooling    | GitHub, pytest, pre-commit, ClickUp API |

---

## 4. Key Modules

### 4.1 Frontend (React)

*   **Core UI:** Built using [React](https://react.dev/) (with [Vite](https://vitejs.dev/)) and [TypeScript](https://www.typescriptlang.org/).
*   **Styling:** Uses [Tailwind CSS](https://tailwindcss.com/) (currently investigating v4 integration) configured via [PostCSS](https://postcss.org/). Customizations include the 'Radikal' font.
*   **UI Components:** Leverages [shadcn/ui](https://ui.shadcn.com/) for pre-built, accessible components (e.g., `Input`, `Label`, `Button`, `RadioGroup`, `Checkbox`, `Tooltip`, `Popover`, `Calendar`).
*   **Routing:** Uses `react-router-dom` for client-side navigation.

*   **`NewScenarioPage` (`/scenarios/new`)**
    *   Page component hosting the scenario creation form.
    *   Renders `NewScenarioForm`.

*   **`NewScenarioForm`**
    *   The main form component for creating/editing scenarios.
    *   Uses `FormSection` to group related fields.
    *   Employs various shadcn/ui components for input fields.
    *   Manages form state using React `useState` hooks (potential future integration with `react-hook-form` and `zod` for validation).
    *   Includes conditional rendering for staff type (W2/1099) and billing type (T&M/Fixed Fee).

*   **`FormSection`**
    *   Reusable component to render a section title and arrange child form elements (currently uses CSS Grid).

*   **`Header`, `Sidebar`**
    *   Basic layout components for navigation and authentication status.

*   **ScenarioSummaryView**

  * Read-only display of scenario results
  * Includes inline editable fields (salary, bonus, rate, hours)
  * Uses `EditableField` components with tooltips
  * Includes expandable advanced metrics section with additional derived values

* **ScenarioComparisonPage**

  * Shows side-by-side table view for up to 4 scenarios
  * Highlights margin outputs and key inputs

* **ScenarioFiltersPanel**

  * Person name, project name, date range
  * Tag selector, favorites, saved filters

* **DefaultsPanel**

  * Admin settings for default taxes, benefits, overhead, HUBZone, etc.
  * Prepopulates new scenario fields

### 4.2 Backend (FastAPI)

* **/scenarios/**

  * CRUD for individual scenarios
  * Accepts both full form and inline updates
  * Calculates margin, revenue, and detailed hourly metrics

* **/scenario-groups/**

  * Grouping logic and baseline tracking

* **/defaults/**

  * Admin-only CRUD for default settings

* **/search/**

  * Query filter handler: name, project, date, tags, type

* **/tags/, /favorites/**

  * Manage scenario metadata

### 4.3 Database (Supabase)

**Tables:**

* `scenarios`
* `scenario_groups`
* `default_settings`
* `tags`
* `favorites`
* `users`

**Key Fields in `scenarios`:**

* `scenario_id`
* `person_name`, `project_name`
* `staff_type`: enum
* `payable_hours`, `billable_hours`
* `billing_type`: enum { hourly, fixed\_price }
* `salary` or `hourly_rate`
* `tax_rate`, `benefits_percent`, `bonus_percent` or `bonus_fixed`
* `overhead`, `hubzone_fee`, `hubzone_residency`, `apply_hubzone_fee`: boolean
* `bill_rate` or `fixed_fee`
* `monthly_revenue`, `monthly_margin`
* `annual_revenue`, `annual_margin`, `annual_margin_percent`
* `unburdened_hourly_cost`
* `burden_dollars_per_hour`
* `burdened_hourly_cost`
* `profit_per_hour`
* `profit_per_hour_with_hubzone`
* `required_client_rate_for_target_margin`
* `tags[]`, `is_favorite`
* `created_at`

---

## 5. Security

* Clerk.dev for user auth
* Supabase Row-Level Security (RLS) for per-user scenario access
* HTTPS via Render

---

## 6. Deployment

* Hosted on Render
* Auto-deploy via GitHub Actions
* `.env` support for Supabase, Clerk, Render secrets
* Preview environments enabled

---

## 7. Tooltip and Inline Editing Support

* All input fields and summary view cells use a standardized tooltip component

* Each tooltip includes:

  * Label, description, example value
  * Keyboard and screen reader accessible

* Inline fields support onBlur save, styled with subtle indicators (border, pencil icon)

* Inline edits trigger live recalculation and persistence

---

## 8. Calculations (Backend Logic)

Revenue:

* Hourly → `bill_rate × billable_hours`
* Fixed-price → `fixed_fee`

Cost:

* W-2 → salary adjusted for tax %, benefits %, bonus %, overhead, etc.
* 1099 → hourly\_rate × payable\_hours + bonus + overhead

Derived Outputs:

* `monthly_revenue = revenue / duration_months`
* `monthly_margin = monthly_revenue - (cost / duration_months)`
* `annual_revenue = revenue`
* `annual_margin = revenue - cost`
* `annual_margin_percent = annual_margin / annual_revenue`
* `unburdened_hourly_cost = salary / annual_payable_hours`
* `burden_dollars_per_hour = total additional costs / annual_hours`
* `burdened_hourly_cost = unburdened + burden`
* `profit_per_hour = bill_rate - burdened_hourly_cost`
* `profit_per_hour_with_hubzone = profit_per_hour - hubzone_fee (if enabled)`
* `required_client_rate_for_target_margin = calculated if target_margin is supplied`

---

## 9. Future Enhancements

* Export to Excel/PDF
* Margin alerts (e.g., red flag under 10%)
* Integration with Slack or ClickUp for status notifications
* Integration with `react-hook-form` and `zod` for form validation.

---

**Version:** 1.4
**Last Updated:** 2025-05-12

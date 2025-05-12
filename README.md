# 📊 margin-calc

A scenario-based margin modeling tool built by Packaged Agile to evaluate and compare staffing cost structures across W-2 employees and 1099 contractors. Supports hourly and fixed-price billing, margin visibility, HUBZone analysis, and side-by-side comparisons.

---

## 🚀 Key Features

- Create and save margin scenarios for each applicant or role
- Support for both W-2 and 1099 compensation structures
- Separate billable vs. payable hours
- Fixed price or hourly billing modes
- Auto-calculated:
  - Monthly and annual revenue
  - Margin ($ and %)
  - Profit/hour and burdened cost/hour
- Expandable advanced financial metrics
- HUBZone fee toggles and residency tracking
- Tags, favorites, and scenario groups
- Scenario comparison view (up to 4 at a time)
- Default settings panel for reusable assumptions

---

## 🧱 Tech Stack

| Layer       | Tech                     |
|-------------|--------------------------|
| Frontend    | React + Vite + shadcn/ui |
| Backend     | FastAPI (Python 3.11)    |
| Database    | Supabase (PostgreSQL)    |
| Auth        | Clerk.dev                |
| Styling     | Tailwind + Radikal Font  |
| Hosting     | Render.com               |

---

## 🛠 Getting Started

Clone the repo:

```bash
git clone https://github.com/DaveW001/margin-calc.git
cd margin-calc

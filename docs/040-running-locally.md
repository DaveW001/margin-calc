# Running the App Locally — margin-calc

This guide will walk you through installing and running the **Scenario Margin Modeling Tool** on your local development machine. It assumes you're using **PowerShell on Windows**, but works similarly on Mac/Linux with `bash`.

## ?? Prerequisites

- Node.js ? 18.x
- Python ? 3.10
- `pnpm` (preferred over `npm` or `yarn`)  
  ? Install with: `npm install -g pnpm`
- `uvicorn`, `pip`, and `venv` for running FastAPI backend
- Access to a Supabase project (or local Supabase emulator)
- Clerk.dev account for auth
- GitHub and Render accounts for deployment

---

## ?? Project Structure
The repository is named: **`margin-calc`**

The folder structure is:

```

margin-calc/
??? frontend/             # React + Vite + shadcn/ui
??? backend/              # FastAPI + Pydantic
??? shared/               # Reusable config, types, utilities
??? .env                  # Environment variables (see below)

````

---

## ?? Step 1: Install Frontend Dependencies

```powershell
cd frontend
pnpm install
````

---

## ?? Step 2: Start the Frontend

```powershell
pnpm dev
```

This launches the Vite dev server at:
**[http://localhost:5173](http://localhost:5173)**

It supports hot-reloading — any changes you save will reflect immediately in the browser.

---

## ?? Step 3: Setup and Run the Backend

```powershell
cd ../backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The backend will be available at:
**[http://localhost:8000](http://localhost:8000)**

---

## ?? Environment Variables

Create a `.env` file in the root directory or inside `backend/` and `frontend/` as needed:

### For Backend (`backend/.env`):

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key
CLERK_SECRET_KEY=your-clerk-secret
```

### For Frontend (`frontend/.env`):

```
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-pub-key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## ?? Test Local Connection

After starting both frontend and backend, try:

* Visiting [http://localhost:5173](http://localhost:5173) and logging in via Clerk
* Opening the network tab and confirming successful calls to `/scenarios` API
* Testing Supabase data persistence by creating a scenario

---

## ? That's It!

You’re now running the **Scenario Margin Modeling Tool** locally!

For deployment instructions, see the `README.md` and Render config. For design/logic details, see `010-product-requirements.md` and `020-architecture.md`.

---

**Last Updated:** 2025-05-11
**Maintainer:** Dave W., Packaged Agile

```

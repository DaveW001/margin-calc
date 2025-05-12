# 🧱 Full React Component Map – `margin-calc`

```plaintext
<App />
├── <ClerkProvider />
│   └── <AuthenticatedLayout>
│        ├── <Sidebar />                      # nav to scenarios, settings
│        ├── <Header />                       # page title, logout, etc.
│        └── <AppRoutes />                    # all main routes
│
├── Pages
│   ├── /scenarios/new
│   │   └── <NewScenarioForm />
│   │        ├── <FormSection title="Person & Project Info" />
│   │        │    ├── <TextField label="Full Name" />
│   │        │    ├── <Dropdown label="Staff Type (W2/1099)" />
│   │        │    ├── <TextField label="ClickUp Link" />
│   │        │    └── ...
│   │        ├── <FormSection title="Time & Payable Hours" />
│   │        ├── <FormSection title="Compensation Inputs" />
│   │        ├── <FormSection title="Billing Model & Revenue" />
│   │        ├── <FormSection title="Company Fees" />
│   │        ├── <FormSection title="HUBZone + Toggles" />
│   │        └── <FormFooterButtons />
│
│   ├── /scenarios/:id
│   │   └── <ScenarioSummaryView />
│   │        ├── <SummaryHeader />
│   │        ├── <SummarySection title="Basic Info" />
│   │        │    └── <EditableField name="role" />
│   │        ├── <SummarySection title="Financials" />
│   │        │    ├── <MetricRow label="Annual Margin" />
│   │        │    ├── <ExpandableAdvancedMetrics />
│   │        │    │    └── <AdvancedMetricRow />
│   │        ├── <ToggleIncludeHubzone />
│   │        ├── <FavoriteStar /> <TagEditor />
│   │        └── <ActionButtonsGroup />
│
│   ├── /compare
│   │   └── <ScenarioComparisonPage />
│   │        ├── <ScenarioGroupSelector />
│   │        ├── <ScenarioCardColumn scenario=1 />
│   │        │    ├── <FieldSummary label="Salary" />
│   │        │    └── <MetricBlock />
│   │        ├── <ScenarioCardColumn scenario=2 />
│   │        └── <AddScenarioToCompare />
│
│   ├── /settings
│   │   └── <DefaultsPanel />
│   │        ├── <DefaultField name="Tax %" />
│   │        ├── <DefaultField name="Benefits %" />
│   │        └── <SaveDefaultsButton />
│
│   └── /admin (optional)
│        └── <AdminAuditLog />, <UserList /> (optional modules)
│
├── Shared Components
│   ├── <TooltipIcon label="Employer Tax Rate" />
│   ├── <EditableField />                      # text or number inline editing
│   ├── <ToggleSwitch />                       # boolean inputs (e.g. hubzone)
│   ├── <InfoCard />                           # for scenario card display
│   ├── <SectionTitle />                       # consistent headers
│   ├── <Collapsible />                        # used in advanced metrics
│   ├── <Toast success|error />                # user notifications
│   └── <PDFExportButton />                    # optional output module

```

---

## 🔄 Data Flow Overview

* **Form State:** Local state via `useState` and `useForm`
* **API Integration:** All `POST`, `PATCH`, and `GET` use `axios` or `fetch` to FastAPI backend
* **Auth State:** Via Clerk SDK — user info injected globally
* **Tooltip Content:** Pulled from a reusable config dictionary
* **Advanced Fields:** Shown only when `<Collapsible>` is open

---

## 🧩 Suggestions

* Store all form labels, help text, and calculation tips in a centralized `fieldDefinitions.ts` file
* Reuse `<MetricBlock>` and `<AdvancedMetricRow>` in both summary and compare views
* Wrap scenario-wide context in a `<ScenarioProvider>` for clean prop management


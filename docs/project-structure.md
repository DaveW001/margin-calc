# Project Structure: Mission Insights Dashboard

This document provides an overview of the key directories and files within the `mission-insights-dashboard` project.

## Key Directories & Files

- **`app/`**: Main application source code.
    - **`page.tsx`**: Entry point or main page component for the application.
    - **`layout.tsx`**: Layout configuration for the application.
    - **` (dashboard)/`**: Contains dashboard-related pages and components.
        - **`art/`**: ART dashboard specific files.
            - **`page.tsx`**: Main page component for the ART dashboard, rendering components like ArtHealthOverviewCard, TeamHealthSummaryCard, KeyImprovementDriversCard, ActiveRisksTable, OkrCard, and ActiveImpedimentsTable.
        - **`solution/`**: Solution dashboard specific files.
            - **`page.tsx`**: Main page component for the Solution dashboard, rendering components like SolutionOverviewSection, NpsScoreCard, KpiCard, DeploymentFrequencyChart, IncidentResolutionChart, SolutionMetrics, and OkrCard.
        - **`personal/`**: Directory for Personal dashboard specific files.
        - **`team/`**: Directory for Team dashboard specific files.
        - **`portfolio/`**: Directory for Portfolio dashboard specific files.
    - **`globals.css`**: Global CSS file for the application (located within app directory).
- **`components/`**: Reusable UI or logic components.
    - **`OkrCard.tsx`**: Component for displaying OKR (Objectives and Key Results) information, used in both ART and Solution dashboards.
    - **`compact-art-card.tsx`**: Compact card component for ART information.
    - **`nps-score-card.tsx`**: Component for displaying NPS scores, used in the Solution dashboard.
    - **`health-score-circle.tsx`**: Component for health score visualization.
    - **`solution-metrics.tsx`**: Component for solution metrics display, used in the Solution dashboard.
    - **`art-health-scores.tsx`**: Component for ART health scores.
    - **`release-frequency-chart.tsx`**: Chart component for release frequency.
    - **`solution-flow-chart.tsx`**: Chart component for solution flow.
    - **`kpi-card.tsx`**: Component for displaying KPIs, used in the Solution dashboard.
    - **`dashboard-header.tsx`**: Header component for dashboards.
    - **`incident-resolution-chart.tsx`**: Chart for incident resolution metrics, used in the Solution dashboard.
    - **`deployment-frequency-chart.tsx`**: Chart for deployment frequency, used in the Solution dashboard.
    - **`art-performance-chart.tsx`**: Chart for ART performance metrics.
    - **`security-risk-table.tsx`**: Table component for security risks.
    - **`mode-toggle.tsx`**: Component for toggling modes (e.g., light/dark).
    - **`theme-provider.tsx`**: Provider component for theme management.
    - **`dashboard/`**: Directory for additional dashboard-specific components.
        - **`ArtHealthOverviewCard.tsx`**: Component for displaying ART health overview, used in the ART dashboard.
        - **`TeamHealthSummaryCard.tsx`**: Component for summarizing team health, used in the ART dashboard.
        - **`KeyImprovementDriversCard.tsx`**: Component for key improvement drivers, used in the ART dashboard.
        - **`ActiveRisksTable.tsx`**: Table component for active risks, used in the ART dashboard.
        - **`active-impediments-table.tsx`**: Table component for active impediments, used in the ART dashboard.
        - **`SolutionOverviewSection.tsx`**: Component for solution overview, used in the Solution dashboard.
        - **`ARTCharts.tsx`**: Component for ART-related charts.
    - **`ui/`**: Directory for generic UI elements.
        - **`card.tsx`**: UI component for card elements, used across dashboards.
        - **`tooltip.tsx`**: UI component for tooltips, used for providing additional information in dashboards.
        - **`alert.tsx`**: UI component for alerts, used in the Solution dashboard.
        - **`tabs.tsx`**: UI component for tab navigation, used in the Solution dashboard.
        - **`chart.tsx`**: UI component for charts, used for rendering various charts in dashboards.
        - **`standard-tooltip.tsx`**: Custom tooltip component, used in the Solution dashboard.
- **`lib/`**: Utility functions, helpers, constants.
    - **`utils.ts`**: General utility functions for the application.
- **`docs/`**: Contains all project documentation.
    - **`ART-Level-Dashboard-Implementation-Plan-2025-05-05.md`**: The primary implementation plan for the ART dashboard.
    - **`ai-project-guide.md`**: Guide for AI assistant context.
    - **`project-structure.md`**: (This file) Detailed overview of project files and folders.
- **`public/`**: Static assets accessible directly via URL.
    - **`placeholder.svg`**: Placeholder SVG image.
    - **`placeholder.jpg`**: Placeholder JPG image.
    - **`placeholder-user.jpg`**: Placeholder user image.
    - **`placeholder-logo.svg`**: Placeholder logo in SVG format.
    - **`placeholder-logo.png`**: Placeholder logo in PNG format.
- **`styles/`**: Global styles or theme configuration.
    - **`globals.css`**: Global CSS file for consistent styling across the app.
- **`hooks/`**: Directory for custom React hooks.
- **`package.json`**: Project dependencies and scripts for building and running the app.
- **`tsconfig.json`**: TypeScript configuration file.
- **`tailwind.config.ts`**: Configuration for Tailwind CSS.
- **`postcss.config.mjs`**: Configuration for PostCSS.
- **`next.config.mjs`**: Configuration for Next.js framework.
- **`README.md`**: Project overview, setup, and usage instructions.
- **`CONTRIBUTING.md`**: Guidelines for contributing to the project.

---
Last Updated: 2025-05-05 
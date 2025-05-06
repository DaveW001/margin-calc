# AI Project Guide: Mission Insights Dashboard

This document serves as a standard guide for the AI assistant when starting new chat sessions. Its purpose is to provide essential context and instructions to ensure efficient and accurate collaboration.

## 1. Initial Instructions for AI

**Upon starting a new chat session, please perform the following:**

*   **Thoroughly review all files located in the `docs/` directory** (or the primary documentation directory for this project). This includes:
    *   **The primary implementation plan:** Tracks feature implementation status (check for files like `implementation-plan.md`).
    *   **Git workflow instructions:** Specific `git` commands and procedures for the project's environment (check for files like `git-workflow.md`).
    *   **This AI guide:** (`ai-project-guide.md`) For overall project context and AI guidance.
    *   Any other markdown files or diagrams providing project context or requirements (e.g., mockups, architecture diagrams).
*   **Familiarize yourself with the current state of the implementation plan** to understand completed tasks and the next priorities.
*   **Verify the presence of the following essential documents within the `docs/` directory:**
    *   **Mockups:** Visual designs or wireframes.
    *   **Application Structure Overview:** A document detailing key files, folders, and their purposes (should align with Section 4 of this guide, potentially `project-structure.md`).
    *   **Git Workflow Instructions:** Specific `git` commands and procedures.
    *   **Running Locally Instructions:** Steps to set up and run the project locally.
*   **If any of the essential documents listed above are missing:**
    *   **Inform the user** which document(s) appear to be missing from the `docs/` directory.
    *   **Ask the user** if they have the document elsewhere and can add it to the `docs/` folder.
    *   If the document does not exist, **offer to help create it** based on project knowledge and standard formats (like the ones defined in this guide for the Implementation Plan and Structure Overview). **Do not proceed with major tasks** until essential context like mockups or requirements is available.

## 2. Project Goal

The overarching goal of the `Mission Insights Dashboard` project is to:

*   **Implement a comprehensive Dashboard Application**.
*   This application should visually represent key metrics and data for ART (Agile Release Train) and Solution dashboards based on provided mockups and requirements.
*   The implementation should leverage existing components/modules where possible, refactor or create new ones as needed, and ensure a consistent user interface using the established tech stack (e.g., React, Tailwind CSS, Next.js).
*   Data handling strategy: Initially hardcoded data, with potential future integration with specific APIs or a database.

## 3. Project Implementation Plan

**Reference and Maintenance:**

*   **Identify and refer to the primary implementation plan file** in the `docs/` directory to understand the scope, status of tasks, and next steps.
*   If an implementation plan does not exist for a new major feature, **propose creating one** using the structure outlined below.
*   **Update the status of tasks in the plan** as they are completed or if their scope changes.

**Standard Structure for an Implementation Plan:**

An effective implementation plan for this project should include the following sections:

1.  **Header:**
    *   `# [Plan Title]` (e.g., Feature X Implementation Plan)
    *   `**Date**`: [Date of creation/last major update]

2.  **Overview:**
    *   A brief description of the plan's purpose.
    *   Reference to any mockup files or primary requirements documents.
    *   High-level goals of the implementation.

3.  **Implementation Plan by Section/Feature:**
    *   For each major section or feature:
        *   `### [Sequential Number]. [Section/Feature Name]`
        *   `- **Component(s)/Module(s)**: [relevant file(s) or module name(s)]` (Note if it's new, existing, or refactored).
        *   `- **Implementation**:`
            *   Bullet points detailing the specific tasks, UI elements, data mapping, and logic required.
        *   `- **Status**: [Action Needed | In Progress | Completed]`
            *   If "Action Needed": Briefly state what's required.
            *   If "Completed": Briefly summarize key achievements.

4.  **General Implementation Notes:**
    *   Points applicable across multiple sections (e.g., UI consistency, responsiveness, data source strategy, testing approach).

5.  **Next Steps:** (Optional)
    *   High-level summary of immediate next actions.

6.  **Approval:** (Optional)
    *   `**Prepared by**:`
    *   `**Date**:`

## 4. Project Structure Overview

**Reference and Maintenance:**

*   **Identify and refer to the project structure overview document** in the `docs/` folder (e.g., `project-structure.md`).
*   If one does not exist, **propose creating one** using the format below and maintain it as the project evolves.
*   This document helps in quickly understanding the organization of the codebase.

**Instructions for Creating the Project Structure Document (`docs/project-structure.md`):**

When creating or updating the `project-structure.md` document, follow these steps to ensure accuracy and completeness:
1. **Crawl the Codebase:** Use tools like `list_dir` to explore the directory structure starting from the root (`.`) and key subdirectories such as `app/`, `components/`, `lib/`, `public/`, and `styles/`. This helps in identifying the actual files and folders present in the project.
2. **Review Rendering Files:** Read the main entry points for dashboards (e.g., `app/(dashboard)/art/page.tsx` and `app/(dashboard)/solution/page.tsx`) using the `read_file` tool to identify components that render on the screen. Trace each component used to understand their purpose and dependencies.
3. **Document Specific Files and Their Usage:** List all identified files and directories with detailed descriptions of their purpose, especially focusing on components used in rendering dashboards. Specify where each component is used (e.g., ART dashboard, Solution dashboard) based on the review of rendering files.
4. **Avoid Generic Qualifiers:** Remove qualifiers like "if applicable" by confirming the presence and usage of files through the crawling and review process. If a file or directory's purpose is unclear, note it as "potential use" or similar, but strive for specificity.
5. **Update Regularly:** As the project evolves, revisit and update the `project-structure.md` to reflect new files, components, or structural changes.

**Standard Format for Project Structure Overview (`docs/project-structure.md`):**

```markdown
# Project Structure: Mission Insights Dashboard

This document provides an overview of the key directories and files within the `mission-insights-dashboard` project. For a detailed list of files and their specific purposes, refer to this document.

## Key Directories & Files

- **`app/`**: Main application source code.
- **`components/`**: Reusable UI or logic components.
- **`lib/`**: Utility functions, helpers, constants.
- **`docs/`**: Contains all project documentation.
- **`public/`**: Static assets accessible directly via URL.
- **`styles/`**: Global styles or theme configuration.
- *Other configuration files like `package.json`, `tsconfig.json`, etc.*

---
Last Updated: [Current Date]
```

</rewritten_file> 
# Personal Vibe Coding Guidelines

## Purpose

This document outlines a set of guidelines and best practices for our "Vibe Coding" process. The primary goal is to establish a clear, enjoyable, and highly effective workflow that empowers developers to consistently produce excellent results while maintaining a positive and collaborative coding atmosphere.

## Core Documentation

This section lists essential README materials within the `docs` folder that should always be referenced and created for any Vibe Coding Program project. It is recommended to read them in the numbered order if you are new to the project:

- `010-product-requirements.md`
- `020-architecture.md`
- `030-implementation-plan.md`
- `040-running-locally.md`
- `050-git-workflow.md`
- `060-vibe-coding-guidelines.md` (This file)
- `070-rollback-instructions.md`

## Development Principles

To maintain consistency, quality, and efficiency, please adhere to the following development principles:

- **Reuse over Rebuild:** Before creating new components or utilities, always check the existing `components/` directory (and `lib/` or other relevant shared locations) to see if suitable functionality already exists. Favor reusing and extending existing code where practical.
- **UI Widget Testing:** When developing new UI widgets or making significant changes to existing ones, utilize Storybook (if implemented) or a dedicated preview route/page for isolated testing and iteration. This helps ensure components are robust and visually correct before integration into the main application flow. 

## Minimum Project Documentation Standards

To ensure clarity, maintainability, and smooth onboarding for all projects, the following documentation is considered the minimum baseline:

- **`README.md`**: Every project must have a `README.md` at its root. This file should, at a minimum, contain:
    - A brief project overview.
    - Clear setup and installation instructions.
    - Instructions on how to run the project locally.
- **`020-architecture.md`**: This document must be kept up-to-date, especially its "Folder Structure" and "Key Files and Roles" sections. Any new files or folders created as part of development should be promptly documented here with a brief description of their purpose.
- **`070-rollback-instructions.md`**: For any major changes, especially those that are complex or carry risk, the `070-rollback-instructions.md` should be updated or referenced. This ensures that there's a clear plan to revert changes if necessary.

## AI-Assisted Debugging and Problem Solving

When encountering errors or unexpected behavior during development, leverage your AI coding assistant effectively by following these steps:

1.  **Seek Understanding First:** Before asking for code changes, ask the AI to explain the error message or the unexpected behavior. Focus on understanding the root cause.
2.  **Collaborate on a Plan:** Once the issue is better understood, ask the AI to propose a plan or a series of steps to address it. Review this plan for clarity and correctness.
3.  **Implement Incrementally:** Apply the proposed changes one step at a time. Verify the outcome of each step before proceeding to the next. This makes it easier to pinpoint any new issues introduced during the fix and to roll back if a particular step doesn't work as expected.

### Advanced Debugging Strategies

- **Utilize System Prompts:** One of the most effective ways to improve AI interaction and reduce errors is by setting up a comprehensive system prompt. These are standing instructions that guide how the AI behaves for every request within a session or project. A good system prompt should ideally include:
    - Your preferred implementation approach or coding style.
    - Key best practices to follow (e.g., specific design patterns, commenting style).
    - Desired error handling behavior from the AI (e.g., explain errors before fixing, ask clarifying questions).
    - Default technologies, libraries, or frameworks to use.
    - Instructions on how the AI should handle unclear requirements (e.g., ask for clarification, provide options).

# Vibe Coding with Cursor: Enhancing Flow and Quality

To significantly improve your vibe coding using Cursor, here's a structured guide covering powerful ideas, prompt techniques, file strategies, and surrounding concepts. These focus on enhancing your flow, quality, and speed when collaborating with AI inside Cursor.

## 0. Session Start-up: Grounding the AI

At the beginning of any new coding session, especially when starting a new project or returning after a break, it's crucial to ground your AI assistant with the necessary context. Provide an initial instruction like the following:

```text
Hello! We're about to work on the [Project Name/Feature]. Before we begin, please take a moment to review the key project documents in the 'docs' folder to ensure you have the latest context. Specifically, familiarize yourself with:

- `010-product-requirements.md`: For the overall goals, scope, and user stories.
- `020-architecture.md`: For the tech stack, folder structure, and core design decisions.
- `030-implementation-plan.md`: To understand the current task status, upcoming tasks, and acceptance criteria.
- `050-git-workflow.md`: For any Git operations we might perform.

Please let me know if any of these seem missing or if you have any initial questions based on their content before we proceed.
```

This helps ensure the AI is aligned with the project's current state and a greed-upon plans from the outset.

## 1. Prompt Techniques to Amplify AI Quality

Use these prompt strategies in the Cursor sidebar (or comment-driven prompting in code):

### Direct Style Instructions

- "Rewrite this function using a functional style."
- "Simplify this block using Pythonic idioms."
- "Make this look like part of a modern SaaS stack."

### Intent-Focused Prompts

- "Convert this into a reusable component."
- "Add logging and error handling with context."
- "Refactor to follow Clean Architecture principles."

### Annotation-Driven Coding

Use comments as AI instructions. For example, in Python:

```python
# Create a FastAPI route that returns overdue ClickUp tasks by assignee
```
Cursor will treat this as a scaffold prompt. 

## 2. Recommended Files for Enhanced Vibe Coding

Consider creating and maintaining the following files within your project or a dedicated personal snippets/notes repository to support your vibe coding process:

- **`prompt_templates.md`**: A collection of curated prompt patterns and templates that have proven effective for common tasks or specific types of AI requests. This allows for quick reuse and consistent results.
- **`reference_code.py`** (or language-specific equivalent): A file containing snippets, boilerplate, or preferred coding patterns that you frequently reuse or want the AI to emulate.
- **`vibe_notes.md`**: Personal notes and reflections on AI interaction strategies. Document what prompts worked well, what approaches yielded the best results in specific scenarios, and any lessons learned from past AI-assisted coding sessions.
- **`debug_log.txt`**: A simple log of high-friction coding moments, challenging bugs, or instances where AI collaboration was difficult. Reviewing this periodically can help identify areas for process improvement or topics for deeper learning.
- **`ask-later.todo`**: A list of non-urgent questions or exploration ideas that come up during development. These can be revisited with the AI when you have more time, preventing context switching while you're focused on a primary task.

## 3. Test-First AI

Adopt a test-driven approach with your AI assistant. Prompt the AI to write tests *before* the actual implementation code. This helps clarify requirements and ensures the final code meets the desired specifications.

Example (Python):
```python
# Write tests for a yet-to-be-written function that parses ClickUp task metadata
```

## 4. AI-as-Coach Mode

Leverage the AI as a learning and architectural review tool. Ask questions that encourage a higher-level perspective or explore alternative approaches:

- "What would a senior dev do differently here?"
- "Help me structure this as a scalable pattern."
- "What are the potential edge cases or failure modes for this approach?"
- "Are there any anti-patterns I should be aware of with this solution?"

## 5. Cursor-Specific Workflow Enhancers

Take advantage of features unique to Cursor to streamline your vibe coding sessions:

### Inline Fix Suggestions & Scaffolding

Use comments directly in your code as "vibe anchors" or instructions for the AI. Cursor can pick these up to suggest changes or scaffold new code.

Examples:
```javascript
// improve perf
// remove duplication
// TODO: refactor this to use the new API
```

### Scratch Files for Iteration

Maintain temporary scratch files (e.g., `_scratchpad.py`, `_ideas.md`, `temp.tsx`) where you can quickly jot down code fragments, raw ideas, or API responses. Then, ask the AI to reshape, refine, or upscale this content into more structured code or documentation. This is great for low-stakes experimentation before committing to changes in your main codebase.

### AI-Generated Commit Messages

Leverage Cursor's built-in capability to help generate Git commit messages. After staging your changes, you can ask the AI to summarize them concisely and in the conventional commit format if preferred.

Example prompt:
- "Summarize these changes as a conventional commit message."
- "Generate a commit message for the recent modifications."

## 6. Chunk Your Code for Better AI Processing

When working with larger files or complex functions, it's often beneficial to split them into smaller, more manageable chunks before prompting the AI for assistance or modifications. Cursor (and AI models in general) tend to perform better and provide more accurate responses when dealing with focused code segments, typically in the range of ~50-150 lines.

**Benefits:**
- **Improved Accuracy:** Smaller chunks reduce ambiguity and help the AI focus on the specific context.
- **Faster Responses:** Processing smaller amounts of code is generally quicker.
- **Easier Review:** It's simpler to review and validate changes made to smaller, isolated sections of code.

# Vibe Coding for Non-Technical Users with Cursor

Since you're a non-technical user relying on Cursor's chat interface, the goal is to turn Cursor into a patient, trustworthy copilot that scaffolds your entire application through guided conversations. Below are curated recommendations tailored to non-coders who want to vibe code apps inside Cursor, organized into actionable categories:

## 1. Start Every Project with a "Framing Prompt"

Kick off your session with a message that sets context. This gets Cursor on the same page from the beginning, especially since it doesn't retain long-term memory across extensive interactions or sessions.

**Example Framing Prompt:**

```text
I want to build a [React + Supabase] app with Clerk.dev login and a dashboard UI that matches shadcn styles. I am non-technical and will rely on this chat. Please walk me through everything step-by-step and give full code files I can paste into Cursor.
```

**Tips:**

- Mention your stack (e.g., React, Python, Next.js, Supabase).
- Mention your preferred UI style or brand (e.g., "like Packaged Agile" or "a Modern VRO look").
- Emphasize that you are "non-technical" so Cursor slows down, explains concepts clearly, and provides complete, ready-to-use code.

## 2. Request Whole Files Instead of Snippets

Because you're not typically modifying files line-by-line directly in the editor as a non-technical user, always ask Cursor for complete file contents when changes are needed.

**Prompt examples:**

- "Give me the entire updated `index.tsx` file with your changes included."
- "Replace the previous version of `auth.ts` with this full working version based on our discussion."

**Why this helps:**

- Cursor's interface allows you to easily replace entire files or create new ones by pasting the full content.
- You avoid context-loss bugs or syntax errors that can arise from trying to manually integrate smaller code fragments.

## 3. Use a Running "TODO" Prompt Chain

To maintain momentum and ensure all desired features are addressed, keep an active task list within your Cursor chat. You can initiate this by prompting:

```text
Let's create a task list of what we still need to build for this application. Please help me update it and check things off as we complete them.
```

**How this helps:**

- **Keeps the Vibe on Track:** A shared, visible task list helps both you and Cursor stay focused on the overall goals and the next immediate steps.
- **Grounds Cursor:** Referring back to the list and updating it reinforces the application's flow and progress for the AI.
- **Reduces Missed Features:** It acts as a checklist to ensure all planned components or functionalities are eventually built.

## 4. Build a Cursor Copilot Prompt Template

Having a reusable template to start your sessions can save time and ensure Cursor has the core context it needs. You can paste this into Cursor's chat at the beginning of any new project or major work session.

**Example Copilot Prompt Template:**

```text
Hi! I'm building an app and I'm not a technical user. I'll rely on you to walk me through each file, explain clearly what to do, and give full code I can paste in. I prefer the shadcn style and I'm using [React / Streamlit / Python / Supabase / Clerk.dev].

Please:
- Give me entire files, not just code snippets.
- Remind me where to paste each file (e.g., file path and name).
- Offer follow-up steps automatically after each part is done.
- Keep a short checklist or a running list of what we've done and what's next as we go.

Let's start by scaffolding the basic structure of the app. What files and folders should I create first?
```

**Tips for the Template:**

-   **Customize the Stack:** Always update the `[React / Streamlit / Python / Supabase / Clerk.dev]` part with the actual technologies you intend to use.
-   **Be Specific About Style:** If you have a UI kit or style preference (like `shadcn` or a company brand), mention it.

### Extra: Integrate Packaged Agile Branding (or Your Own)

If you want to incorporate specific branding elements like logos, brand colors, or particular dashboard/component formats, inform Cursor at the start of your project or when relevant.

**Example:**

```text
I'd like to use our company branding. Please use this logo: https://packagedagile.com/wp-content/uploads/2025/03/Logo-02.png in the header or sidebar. Our primary brand color is a light blue, and if possible, try to use a font similar to Radikal for headings. Let's aim for a Modern VRO styling with light blue headers for dashboard cards.
```

Cursor can then attempt to incorporate these visual elements into the components it generates (e.g., in layout headers, dashboard cards, and general styling), helping to maintain brand consistency from the outset.
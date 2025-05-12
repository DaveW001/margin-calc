## Repository Information

**IMPORTANT:** Before your first commit, please replace the placeholder values below (e.g., `[Your Repository Name]`) with your actual project details.

*   **GitHub Owner/Username:** `DaveW001`
*   **Repository Name:** `margin-calc`
*   **Repository URL:** `https://github.com/DaveW001/margin-calc.git`
*   **Primary Branch:** `main`
*   **Remote Name:** `origin`

---

# Git Workflow Commands

This document outlines the specific git commands that work reliably in our PowerShell environment for pushing changes to GitHub for the `00-new-project-template` repository.

## Standard Workflow

### 1. Check Status and Stage Changes
Before committing, always check the status to see modified and untracked files:
```powershell
git status
```
Review the output. If there are untracked files that should be part of the commit, stage them along with other modifications.

Stage all changes (including new/untracked files):
```powershell
git add .
```

Or stage specific files (use quotes for paths with special characters):
```powershell
git add "app/(dashboard)/solution/page.tsx" "components/program-health-overview.tsx"
```

### 2. Commit Changes
Create a commit with a descriptive message following the conventional commits format:
```powershell
git commit -m "type(scope): description of changes"
```

Common types:
- `feat`: New feature (e.g., `feat(ui): add OKR card`)
- `fix`: Bug fix (e.g., `fix(art): resolve layout shift`)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `docs`: Documentation changes
- `style`: Changes that don't affect code meaning (formatting, etc)
- `test`: Adding or modifying tests

Example:
```powershell
git commit -m "refactor(health): adjust card width for better layout"
```

### 3. Push to GitHub
Immediately after a successful commit, push the changes to the `main` branch on the `origin` remote (GitHub):
```powershell
git push origin main
```

## Important Notes

1.  Run git commands sequentially in PowerShell, ensuring each completes successfully before starting the next. Alternatively, for simple sequences, commands can be chained on a single line using semicolons (`;`). **Do not** chain with `&&` as it behaves differently in PowerShell compared to other shells and may not execute subsequent commands if a prior one has non-zero exit status that PowerShell doesn't interpret as failure.
2.  Use quotes around file paths that contain special characters like parentheses, spaces, etc.
3.  Regularly use `git status` to identify and add any necessary untracked files to ensure your local repository matches what's intended for GitHub.
4.  After pushing, you can verify again with `git status`. It should show "Your branch is up to date with 'origin/main'".
5.  **Backups for Risky Changes:** If a set of changes is complex or has a higher likelihood of needing a rollback (especially for critical files like `.tsx` components), consider making a quick backup of the file (e.g., `MyComponent.tsx.backup`) before starting the modifications. This provides an immediate local restore point.
6.  **Documentation of Changes:** When making major changes, especially to shared components or core logic, ensure that the usage of these components and the nature of the changes are well-documented, either in commit messages, related documentation files (like `project-structure.md`), or code comments where appropriate.

## Common Issues and Solutions

1.  If `git add` fails with path issues:
    *   Use quotes around the path.
    *   Use forward slashes (`/`) instead of backslashes (`\`).
    *   Break down into multiple `git add` commands if necessary.

2.  If commit fails:
    *   Check if files are staged (`git status`).
    *   Make sure the commit message is enclosed in quotes.
    *   Verify no files are in conflict (this usually happens after a pull).

3.  If push fails:
    *   Often requires pulling latest changes first: `git pull origin main`.
    *   Resolve any merge conflicts locally.
    *   Stage the resolved files (`git add .`).
    *   Commit the merge (`git commit -m "Merge remote-tracking branch 'origin/main'"` or similar).
    *   Try the push again: `git push origin main`. 
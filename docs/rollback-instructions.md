# Rollback Instructions

## Before Making Changes

Before making any significant changes to the codebase, follow these steps to document the current state:

1. **Identify Affected Files**
   - List all files that will be modified
   - Document their locations in the project structure
   - Note any dependencies between these files

2. **Document Current Content**
   - Copy the entire content of each file to be modified
   - Save these copies with a `.backup` extension in the same directory
   - Example: `DashboardLayout.tsx.backup`

3. **Document Component Usage**
   - Identify all components that use the files being modified
   - Take screenshots of the current UI state if relevant
   - Note any props being passed to these components

## Example - Dashboard Layout Changes

Current state as of [DATE]:

### 1. Files to be Modified:
```typescript
// components/dashboard/DashboardLayout.tsx
"use client";
import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  level: 'portfolio' | 'solution' | 'art' | 'team' | 'personal';
}

export function DashboardLayout({ children, title, level }: DashboardLayoutProps) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground capitalize">{level} Dashboard</p>
      </div>
      {children}
    </div>
  );
}
```

### 2. Component Usage:
```typescript
// app/(dashboard)/solution/page.tsx
<DashboardLayout title="Solution Overview" level="solution">
  {/* component content */}
</DashboardLayout>
```

## How to Roll Back

If changes need to be reverted:

1. **Using Backup Files**
   ```bash
   # Copy the backup file back to the original
   cp components/dashboard/DashboardLayout.tsx.backup components/dashboard/DashboardLayout.tsx
   ```

2. **Using Git**
   ```bash
   # Revert the specific file
   git checkout HEAD^ -- components/dashboard/DashboardLayout.tsx

   # Or revert the last commit if it only contained these changes
   git revert HEAD
   ```

3. **Manual Restoration**
   - Use the documented current state above to manually restore the files
   - Verify the component props match the documented state
   - Test the UI to ensure it matches the saved screenshots

## Verification After Rollback

After rolling back changes:

1. Check that the file contents match the documented state
2. Verify the UI appears as it did in the screenshots
3. Test all affected pages and components
4. Ensure no new errors appear in the console
5. Verify all functionality works as expected

## Notes

- Always test changes in a development environment first
- Document any additional changes made during the process
- Update this rollback document if the component structure changes
- Keep backup files until changes are verified in production 
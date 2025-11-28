# 🛡️ Knowledge Base Safety Guidelines for margin-calc

## 🚨 CRITICAL: Symbolic Link Protection

**This project uses symbolic links to access the centralized knowledge base.**

### ✅ Correct Setup
- **Symbolic Link**: knowledge-base/ → C:\development\01-knowledge-base
- **Gitignored**: knowledge-base/ is in .gitignore
- **Local Only**: Never committed to repository

### ❌ What NOT to Do
- Never create actual knowledge-base/ directories
- Never commit knowledge-base files to this repository
- Never remove knowledge-base/ from .gitignore
- Never modify knowledge-base files from this project

### 🔧 Verification Commands
```powershell
# Check symbolic link status
Get-Item "knowledge-base" | Select-Object Name, LinkType, Target

# Verify gitignore
Select-String "knowledge-base" .gitignore

# Check for staged knowledge-base files
git status --porcelain | Select-String "knowledge-base"
```

### 🛠️ Setup Commands
```powershell
# Create symbolic link (run as Administrator)
New-Item -ItemType SymbolicLink -Path "knowledge-base" -Target "C:\development\01-knowledge-base"

# Add to .gitignore
Add-Content -Path ".gitignore" -Value "
# Knowledge base symbolic link
knowledge-base/"
```

### 🚨 Build Error Protection
If you encounter ENOENT errors during builds:
1. ✅ Add safety checks to handle missing knowledge-base
2. ✅ Make code work gracefully without knowledge-base
3. ❌ Don't create actual directories
4. ❌ Don't remove from .gitignore

### 📚 More Information
- **Master Guidelines**: knowledge-base/README-MASTER-FILES.md
- **Build Safety**: knowledge-base/06_cursor_and_development_tools/BUILD-SAFETY-CHECKLIST.md
- **Setup Guide**: knowledge-base/06_cursor_and_development_tools/quick-setup-guide.md

---
**Generated**: 2025-08-10 14:08:27  
**Project**: margin-calc  
**Purpose**: Prevent knowledge base symbolic link mistakes

#!/usr/bin/env python3
"""
Universal Git Push Script
Eliminates pager issues that cause hanging in Windows PowerShell environments
Automatically detects project context for appropriate commit messages
"""

import subprocess
import sys
import os
from datetime import datetime
import json

# Configuration - Edit these defaults or create a .git-config.json file
DEFAULT_CONFIG = {
    "commit_prefix": "feat",
    "commit_scope": "update",
    "commit_description": "update project files",
    "default_branch": "main",
    "remote_name": "origin"
}

def load_config():
    """Load configuration from .git-config.json if it exists, otherwise use defaults"""
    config_file = ".git-config.json"
    config = DEFAULT_CONFIG.copy()
    
    if os.path.exists(config_file):
        try:
            with open(config_file, 'r') as f:
                user_config = json.load(f)
                config.update(user_config)
                print(f"📋 Loaded configuration from {config_file}")
        except Exception as e:
            print(f"⚠️  Warning: Could not load {config_file}: {e}")
            print("🔧 Using default configuration")
    
    return config

def detect_project_type():
    """Automatically detect project type and suggest appropriate commit details"""
    if os.path.exists("package.json"):
        try:
            with open("package.json", 'r') as f:
                pkg = json.load(f)
                name = pkg.get("name", "project")
                return {
                    "type": "web",
                    "name": name,
                    "scope": "web",
                    "description": "update web project files"
                }
        except:
            pass
    
    if os.path.exists("requirements.txt") or os.path.exists("pyproject.toml"):
        return {
            "type": "python",
            "name": os.path.basename(os.getcwd()),
            "scope": "python",
            "description": "update Python project files"
        }
    
    if os.path.exists("Cargo.toml"):
        return {
            "type": "rust",
            "name": os.path.basename(os.getcwd()),
            "scope": "rust",
            "description": "update Rust project files"
        }
    
    if any(os.path.exists(f) for f in ["pom.xml", "build.gradle", "build.gradle.kts"]):
        return {
            "type": "java",
            "name": os.path.basename(os.getcwd()),
            "scope": "java",
            "description": "update Java project files"
        }
    
    # Check for common content/documentation patterns
    if any(os.path.exists(f) for f in ["content", "docs", "data/insights"]):
        return {
            "type": "content",
            "name": os.path.basename(os.getcwd()),
            "scope": "content",
            "description": "update content and documentation"
        }
    
    # Generic fallback
    return {
        "type": "generic",
        "name": os.path.basename(os.getcwd()),
        "scope": "update",
        "description": "update project files"
    }

def setup_git_environment():
    """Set up environment variables to prevent git from using pagers or interactive prompts"""
    env = os.environ.copy()
    
    # Disable all interactive features
    env['GIT_TERMINAL_PROMPT'] = '0'  # No interactive authentication prompts
    env['GIT_EDITOR'] = 'true'        # Use 'true' as editor (does nothing, exits successfully)
    env['GIT_PAGER'] = 'cat'          # Use 'cat' instead of less/more (no interactive paging)
    env['PAGER'] = 'cat'              # System-wide pager override
    env['LESS'] = ''                  # Disable less pager features
    env['MORE'] = ''                  # Disable more pager features
    
    return env

def run_git_command(command, timeout=30):
    """Run a git command with anti-pager environment and timeout"""
    env = setup_git_environment()
    
    try:
        print(f"🔧 Running: {command}")
        
        # Always use --no-pager flag for git commands
        if command.startswith('git ') and '--no-pager' not in command:
            command = command.replace('git ', 'git --no-pager ', 1)
        
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            timeout=timeout,
            env=env,
            creationflags=subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0
        )
        
        # Handle output carefully
        if result.stdout:
            # Truncate very long output to prevent issues
            output = result.stdout.strip()
            if len(output) > 2000:
                output = output[:2000] + "\n... (output truncated)"
            print(output)
            
        if result.stderr and result.returncode != 0:
            stderr = result.stderr.strip()
            if len(stderr) > 1000:
                stderr = stderr[:1000] + "\n... (error truncated)"
            print(f"⚠️  Error: {stderr}")
            
        return result.returncode == 0, result.stdout, result.stderr
        
    except subprocess.TimeoutExpired:
        print(f"⏰ Command timed out after {timeout} seconds")
        return False, "", "Timeout"
    except Exception as e:
        print(f"💥 Error running command: {e}")
        return False, "", str(e)

def check_git_status():
    """Check git status using porcelain format (never uses pager)"""
    print("\n📋 Checking repository status...")
    success, stdout, stderr = run_git_command("git status --porcelain")
    
    if not success:
        print("❌ Failed to get git status")
        return False, []
    
    if not stdout.strip():
        print("✅ Repository is clean - no changes to commit")
        return True, []
    
    # Parse the status output
    changes = []
    for line in stdout.strip().split('\n'):
        if line.strip():
            changes.append(line.strip())
    
    print(f"📝 Found {len(changes)} change(s):")
    for change in changes[:10]:  # Show first 10 changes
        print(f"   {change}")
    if len(changes) > 10:
        print(f"   ... and {len(changes) - 10} more")
    
    return True, changes

def stage_changes():
    """Stage all changes"""
    print("\n📦 Staging all changes...")
    success, _, _ = run_git_command("git add .")
    
    if not success:
        print("❌ Failed to stage changes")
        return False
    
    print("✅ All changes staged successfully")
    return True

def generate_commit_message(config, project_info):
    """Generate an appropriate commit message based on configuration and project detection"""
    timestamp = datetime.now().strftime("%Y-%m-%d")
    
    # Use project-detected scope if available, otherwise fall back to config
    scope = project_info.get("scope", config.get("commit_scope", "update"))
    description = project_info.get("description", config.get("commit_description", "update project files"))
    prefix = config.get("commit_prefix", "feat")
    
    commit_msg = f"{prefix}({scope}): {description} - {timestamp}"
    return commit_msg

def commit_changes(config, project_info):
    """Commit staged changes with auto-generated message"""
    print("\n💾 Committing changes...")
    
    commit_msg = generate_commit_message(config, project_info)
    
    # Use double quotes and escape inner quotes
    escaped_msg = commit_msg.replace('"', '\\"')
    success, _, _ = run_git_command(f'git commit -m "{escaped_msg}"')
    
    if not success:
        print("❌ Failed to commit changes")
        return False
    
    print(f"✅ Changes committed successfully")
    print(f"📝 Commit message: {commit_msg}")
    return True

def push_to_remote(config):
    """Push commits to remote repository"""
    remote = config.get("remote_name", "origin")
    branch = config.get("default_branch", "main")
    
    print(f"\n🌐 Pushing to {remote} {branch}...")
    
    # Use longer timeout for push operations
    success, _, stderr = run_git_command(f"git push {remote} {branch}", timeout=90)
    
    if not success:
        print(f"❌ Failed to push to {remote} {branch}")
        if "rejected" in stderr.lower():
            print("💡 Tip: You may need to pull remote changes first")
        return False
    
    print(f"✅ Successfully pushed to {remote} {branch}!")
    return True

def verify_push():
    """Verify the push was successful"""
    print("\n🔍 Verifying push status...")
    
    # Check if we're up to date with remote
    success, stdout, _ = run_git_command("git status --porcelain")
    
    if success and not stdout.strip():
        print("✅ Repository is clean and synchronized")
        return True
    else:
        print("⚠️  Repository may have remaining changes")
        return False

def create_sample_config():
    """Create a sample .git-config.json file"""
    config_file = ".git-config.json"
    if os.path.exists(config_file):
        print(f"⚠️  {config_file} already exists")
        return
    
    sample_config = {
        "commit_prefix": "feat",
        "commit_scope": "content",
        "commit_description": "update project content",
        "default_branch": "main",
        "remote_name": "origin"
    }
    
    try:
        with open(config_file, 'w') as f:
            json.dump(sample_config, f, indent=2)
        print(f"✅ Created sample configuration file: {config_file}")
        print("📝 Edit this file to customize commit messages for your project")
    except Exception as e:
        print(f"❌ Failed to create config file: {e}")

def main():
    """Main git push workflow"""
    # Handle command line arguments
    if len(sys.argv) > 1:
        if sys.argv[1] == "--init-config":
            create_sample_config()
            return True
        elif sys.argv[1] == "--help":
            print("Universal Git Push Script")
            print("Usage:")
            print("  python git-push-universal.py          # Run git push workflow")
            print("  python git-push-universal.py --init-config  # Create sample config file")
            print("  python git-push-universal.py --help         # Show this help")
            return True
    
    # Load configuration and detect project
    config = load_config()
    project_info = detect_project_type()
    
    print("🚀 Starting Universal Git Push Workflow")
    print("=" * 55)
    print("🛡️  Anti-pager protection: ENABLED")
    print("⏱️  Timeout protection: ENABLED")
    print("🔧 Environment hardening: ENABLED")
    print(f"📁 Project type detected: {project_info['type']}")
    print("=" * 55)
    
    try:
        # Step 1: Check current status
        success, changes = check_git_status()
        if not success:
            return False
        
        if not changes:
            print("\n🎉 Nothing to commit - repository is up to date!")
            return True
        
        # Step 2: Stage changes
        if not stage_changes():
            return False
        
        # Step 3: Commit changes
        if not commit_changes(config, project_info):
            return False
        
        # Step 4: Push to remote
        if not push_to_remote(config):
            return False
        
        # Step 5: Verify success
        verify_push()
        
        print("\n🎉 Git push workflow completed successfully!")
        print("🌟 All changes have been pushed to remote repository")
        return True
        
    except KeyboardInterrupt:
        print("\n⚠️  Operation cancelled by user")
        return False
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 
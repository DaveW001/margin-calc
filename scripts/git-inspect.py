#!/usr/bin/env python3
"""
Git Inspection Wrapper Script
Provides common git inspection commands with anti-pager protection
Prevents terminal hanging issues in PowerShell environments
"""

import subprocess
import sys
import os
import argparse
from datetime import datetime

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
            env=env
        )
        
        if result.stdout:
            print(result.stdout)
        if result.stderr:
            print(f"⚠️  Warning: {result.stderr}")
        
        return result.returncode == 0
        
    except subprocess.TimeoutExpired:
        print(f"⏰ Command timed out after {timeout} seconds")
        return False
    except Exception as e:
        print(f"💥 Error running command: {e}")
        return False

def git_status():
    """Check repository status"""
    print("\n📋 Repository Status:")
    return run_git_command("git status")

def git_log(count=5):
    """Show recent commits"""
    print(f"\n📜 Recent {count} Commits:")
    return run_git_command(f"git log --oneline -{count}")

def git_branches():
    """Show all branches"""
    print("\n🌿 All Branches:")
    return run_git_command("git branch -a")

def git_diff(target="HEAD"):
    """Show differences"""
    print(f"\n🔍 Differences vs {target}:")
    return run_git_command(f"git diff {target}")

def git_fetch():
    """Fetch latest changes from remote"""
    print("\n📥 Fetching from remote:")
    return run_git_command("git fetch origin")

def git_remote_status():
    """Check remote status"""
    print("\n🌐 Remote Status:")
    success = run_git_command("git remote -v")
    if success:
        print("\n📊 Remote Comparison:")
        run_git_command("git status -uno")
    return success

def git_show_commit(commit="HEAD"):
    """Show specific commit details"""
    print(f"\n📝 Commit Details ({commit}):")
    return run_git_command(f"git show {commit} --name-only")

def git_stash_list():
    """Show stashed changes"""
    print("\n📦 Stashed Changes:")
    return run_git_command("git stash list")

def main():
    parser = argparse.ArgumentParser(
        description="Git Inspection Wrapper - Prevents terminal hanging issues",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Common Usage Examples:
  python scripts/git-inspect.py status           # Check repository status
  python scripts/git-inspect.py log              # Show recent 5 commits
  python scripts/git-inspect.py log --count 10   # Show recent 10 commits
  python scripts/git-inspect.py branches         # Show all branches
  python scripts/git-inspect.py fetch            # Fetch from remote
  python scripts/git-inspect.py remote           # Check remote status
  python scripts/git-inspect.py diff             # Show uncommitted changes
  python scripts/git-inspect.py show             # Show latest commit details
  python scripts/git-inspect.py stash            # Show stashed changes
  python scripts/git-inspect.py all              # Run comprehensive inspection
        """
    )
    
    parser.add_argument('command', 
                       choices=['status', 'log', 'branches', 'diff', 'fetch', 'remote', 'show', 'stash', 'all'],
                       help='Git inspection command to run')
    
    parser.add_argument('--count', type=int, default=5,
                       help='Number of commits to show (for log command)')
    
    parser.add_argument('--commit', default="HEAD",
                       help='Commit to inspect (for show command)')
    
    parser.add_argument('--target', default="HEAD",
                       help='Target for diff comparison')
    
    args = parser.parse_args()
    
    print("🔍 Git Inspector - Anti-Pager Protection Enabled")
    print("=" * 50)
    
    success = True
    
    if args.command == 'status':
        success = git_status()
    elif args.command == 'log':
        success = git_log(args.count)
    elif args.command == 'branches':
        success = git_branches()
    elif args.command == 'diff':
        success = git_diff(args.target)
    elif args.command == 'fetch':
        success = git_fetch()
    elif args.command == 'remote':
        success = git_remote_status()
    elif args.command == 'show':
        success = git_show_commit(args.commit)
    elif args.command == 'stash':
        success = git_stash_list()
    elif args.command == 'all':
        print("🔍 Running Comprehensive Git Inspection...")
        git_status()
        git_log(5)
        git_branches()
        git_remote_status()
        git_stash_list()
        success = True
    
    print("\n" + "=" * 50)
    if success:
        print("✅ Git inspection completed successfully!")
    else:
        print("❌ Git inspection completed with warnings")
    
    return success

if __name__ == "__main__":
    try:
        success = main()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n⚠️  Operation cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")
        sys.exit(1) 
# Git Troubleshooting Guide

This guide helps you resolve common Git issues when working with this repository.

## Issue: Push Rejected (fetch first)

### Error Message
```
! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/GabiMuresan22/flanders-ro-business-hub.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
```

### Cause
This error occurs when the remote repository has commits that you don't have in your local repository. This typically happens when:
- Someone else pushed changes to the same branch
- You're working on multiple machines and forgot to pull changes
- The repository was updated through the GitHub web interface or Lovable

### Solution

#### Option 1: Pull and Merge (Recommended for most cases)

1. **Fetch the latest changes from remote:**
   ```bash
   git fetch origin
   ```

2. **Pull and merge the remote changes:**
   ```bash
   git pull origin main
   ```
   (Replace `main` with your branch name if working on a different branch)

3. **Resolve any merge conflicts if they appear:**
   - Open conflicted files in your editor
   - Look for conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
   - Edit the files to resolve conflicts
   - Stage the resolved files:
     ```bash
     git add <resolved-file>
     ```
   - Complete the merge:
     ```bash
     git commit
     ```

4. **Push your changes:**
   ```bash
   git push origin main
   ```

#### Option 2: Rebase (For a cleaner history)

1. **Fetch the latest changes:**
   ```bash
   git fetch origin
   ```

2. **Rebase your changes on top of remote changes:**
   ```bash
   git pull --rebase origin main
   ```

3. **Resolve any conflicts if they appear:**
   - Open conflicted files and resolve conflicts
   - Stage the resolved files:
     ```bash
     git add <resolved-file>
     ```
   - Continue the rebase:
     ```bash
     git rebase --continue
     ```

4. **Push your changes:**
   ```bash
   git push origin main
   ```

#### Option 3: Force Push (Use with extreme caution!)

⚠️ **WARNING**: Only use this if you're absolutely sure you want to discard remote changes!

```bash
git push --force origin main
```

**Never use force push on:**
- Shared branches (main, develop, etc.)
- Branches where others are collaborating
- Production branches

### Prevention Tips

1. **Always pull before starting work:**
   ```bash
   git pull origin main
   ```

2. **Pull before pushing:**
   ```bash
   git pull origin main
   git push origin main
   ```

3. **Use feature branches:**
   - Create a new branch for each feature: `git checkout -b feature/my-feature`
   - This prevents conflicts on the main branch

4. **Communicate with your team:**
   - Let others know when you're working on shared files
   - Use pull requests for code review before merging

## Other Common Git Issues

### Issue: Merge Conflicts

**Solution:**
1. Open conflicted files
2. Look for conflict markers
3. Choose which changes to keep
4. Remove conflict markers
5. Stage and commit the resolved files

### Issue: Accidentally Committed to Wrong Branch

**Solution:**
```bash
# Undo the last commit but keep changes
git reset --soft HEAD~1

# Switch to the correct branch
git checkout correct-branch

# Commit the changes
git commit -m "Your commit message"
```

### Issue: Need to Undo Last Commit

**Solution:**
```bash
# Undo commit but keep changes staged
git reset --soft HEAD~1

# Undo commit and unstage changes
git reset HEAD~1

# Undo commit and discard changes (careful!)
git reset --hard HEAD~1
```

## Working with Lovable

Since this project is connected to Lovable, be aware that:
- Changes made in Lovable (through prompts and AI-generated code) are automatically committed and pushed to the repository when you publish changes
- These automatic commits can cause conflicts if you're working locally at the same time
- Always pull (`git pull origin main`) before making local changes to avoid conflicts
- If you get push conflicts, follow the solutions above

## Getting Help

If you encounter Git issues not covered in this guide:
1. Check the error message carefully
2. Search for the error online
3. Consult the [Git documentation](https://git-scm.com/doc)
4. Ask your team for help

## Useful Git Commands

```bash
# Check status of your repository
git status

# View commit history
git log --oneline

# View remote repositories
git remote -v

# See what changes you've made
git diff

# See which branch you're on
git branch

# Switch to a different branch
git checkout branch-name

# Create and switch to a new branch
git checkout -b new-branch-name

# Discard changes to a file
git checkout -- filename
```

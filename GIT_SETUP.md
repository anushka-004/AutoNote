# 🚀 Git Setup Guide for AutoNote

## Quick Start - Upload to GitHub

### Step 1: Initialize Git Repository

Open your terminal in the project directory and run:

```bash
cd "c:/Users/vinit/OneDrive/ドキュメント/New folder/CascadeProjects/windsurf"
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: AutoNote - AI-Powered Meeting Platform

- Complete landing page with features showcase
- Login and registration pages
- Dashboard with meeting statistics
- Full meeting room interface (Google Meet-like)
- AI-powered meeting notes generation
- Meeting notes organized by date
- Analytics dashboard
- Search and filter functionality
- Responsive design for all devices
- Complete documentation"
```

### Step 4: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon in the top right
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name:** `meetwise` (or your preferred name)
   - **Description:** `AI-Powered Video Conferencing Platform with Meeting Notes Generation`
   - **Visibility:** Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Step 5: Connect to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/meetwise.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username.**

---

## Alternative: Using SSH

If you prefer SSH (recommended for frequent pushes):

### Step 1: Check for SSH Key

```bash
ls -al ~/.ssh
```

### Step 2: Generate SSH Key (if needed)

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Step 3: Add SSH Key to GitHub

1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. Go to GitHub → Settings → SSH and GPG keys
3. Click "New SSH key"
4. Paste your key and save

### Step 4: Connect with SSH

```bash
git remote add origin git@github.com:YOUR_USERNAME/meetwise.git
git branch -M main
git push -u origin main
```

---

## Complete Command Sequence

Here's the full sequence in one place:

```bash
# Navigate to project directory
cd "c:/Users/vinit/OneDrive/ドキュメント/New folder/CascadeProjects/windsurf"

# Initialize Git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: AutoNote - AI-Powered Meeting Platform"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/meetwise.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Future Git Workflow

### Making Changes

```bash
# Check status
git status

# Add specific files
git add path/to/file

# Or add all changes
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

### Creating Feature Branches

```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push branch to GitHub
git push -u origin feature/new-feature

# Switch back to main
git checkout main

# Merge feature branch
git merge feature/new-feature
```

### Pulling Latest Changes

```bash
# Pull from GitHub
git pull origin main
```

---

## Recommended .gitattributes

Create a `.gitattributes` file for consistent line endings:

```
* text=auto
*.js text eol=lf
*.jsx text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.json text eol=lf
*.md text eol=lf
*.css text eol=lf
```

---

## GitHub Repository Settings

### Recommended Settings

1. **Branch Protection Rules** (for main branch):
   - Require pull request reviews
   - Require status checks to pass
   - Include administrators

2. **GitHub Pages** (optional):
   - Deploy from main branch
   - Use `/docs` or root directory

3. **Topics/Tags**:
   - `nextjs`
   - `typescript`
   - `tailwindcss`
   - `video-conferencing`
   - `ai-notes`
   - `meeting-platform`

### Add Repository Description

```
🎥 AutoNote - AI-Powered Video Conferencing Platform with intelligent meeting notes generation. Built with Next.js 14, TypeScript, and TailwindCSS.
```

### Add Topics

- nextjs
- typescript
- tailwindcss
- video-conferencing
- meeting-notes
- ai-powered
- react
- web-app

---

## README Badges (Optional)

Add these to the top of your README.md:

```markdown
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)
```

---

## Commit Message Conventions

Use conventional commits for better history:

```bash
# Features
git commit -m "feat: add screen sharing functionality"

# Bug fixes
git commit -m "fix: resolve audio mute issue"

# Documentation
git commit -m "docs: update setup instructions"

# Styling
git commit -m "style: improve button hover effects"

# Refactoring
git commit -m "refactor: optimize meeting room component"

# Performance
git commit -m "perf: reduce bundle size"

# Tests
git commit -m "test: add unit tests for notes generation"
```

---

## .gitignore Already Configured

Your project already has a comprehensive `.gitignore` that excludes:

- ✅ `node_modules/` - Dependencies
- ✅ `.next/` - Next.js build files
- ✅ `.env` files - Environment variables
- ✅ Build artifacts
- ✅ Log files
- ✅ OS-specific files (.DS_Store)
- ✅ TypeScript build info

---

## Troubleshooting

### Issue: "fatal: not a git repository"
**Solution:** Run `git init` first

### Issue: "remote origin already exists"
**Solution:** 
```bash
git remote remove origin
git remote add origin YOUR_REPO_URL
```

### Issue: "failed to push some refs"
**Solution:**
```bash
git pull origin main --rebase
git push origin main
```

### Issue: Large files error
**Solution:** Use Git LFS for files > 100MB
```bash
git lfs install
git lfs track "*.mp4"
git add .gitattributes
```

---

## GitHub Actions (Optional CI/CD)

Create `.github/workflows/ci.yml` for automated testing:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm run build
    - run: npm run lint
```

---

## Deployment Options

### Vercel (Recommended for Next.js)

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings (auto-detected)
4. Deploy!

**Or use Vercel CLI:**
```bash
npm i -g vercel
vercel
```

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. New site from Git
3. Select your repository
4. Build command: `npm run build`
5. Publish directory: `.next`

### GitHub Pages (Static Export)

```bash
# Add to next.config.js
output: 'export'

# Build
npm run build

# Deploy to gh-pages branch
```

---

## License

Add a LICENSE file (MIT recommended):

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## Quick Reference Commands

```bash
# Status
git status

# Add files
git add .

# Commit
git commit -m "message"

# Push
git push

# Pull
git pull

# Create branch
git checkout -b branch-name

# Switch branch
git checkout branch-name

# Merge branch
git merge branch-name

# View history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard changes
git checkout -- file
```

---

## 🎉 You're Ready!

Your project is now ready to be uploaded to GitHub. Follow the steps above and your AutoNote application will be live on GitHub in minutes!

**Need help?** Check the troubleshooting section or GitHub's documentation.

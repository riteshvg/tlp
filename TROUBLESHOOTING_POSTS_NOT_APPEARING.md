# 🔧 Troubleshooting: Posts Not Appearing

## Problem Summary

Posts created in Decap CMS are not appearing on the website.

---

## ✅ SOLUTION APPLIED

**Issue**: Reflections posts not showing on homepage or `/reflections/` listing

**Root Cause**: `reflections` section not configured as a main section in Hugo

**Fix**: Added `mainSections` configuration to include both `posts` and `reflections`

**File Changed**: `hugo.toml`

---

## 📝 Configuration Added

```toml
# Main sections - posts that appear on homepage
mainSections = ['posts', 'reflections']
```

This tells Hugo to include both:
- Posts from `content/posts/` (your existing blog)
- Reflections from `content/reflections/` (Decap CMS posts)

---

## 🔍 Common Issues & Solutions

### Issue 1: Posts Not Showing at All

**Possible Causes:**
- Posts not pushed to GitHub
- Netlify build failing
- Draft mode enabled
- Files in wrong folder

**Solution:**
1. Check draft is unchecked in CMS
2. Verify posts are in `content/reflections/`
3. Check Netlify build logs
4. Wait 1-2 minutes after saving

---

### Issue 2: Posts Not on Homepage

**Possible Causes:**
- Section not in `mainSections`
- Homepage only shows certain sections

**Solution:**
- Already fixed! `mainSections = ['posts', 'reflections']` is configured
- Homepage will now show both types of posts

---

### Issue 3: Posts Not on `/reflections/` Listing

**Possible Causes:**
- No template for reflections listing
- Hugo not building section
- Wrong URL structure

**Solution:**
Hugo automatically creates `/reflections/` listing page when you have content in `content/reflections/`

---

### Issue 4: Draft Posts Showing

**Possible Causes:**
- Draft checkbox not working
- Build configuration issue

**Solution:**
1. In CMS, ensure Draft is UNCHECKED when saving
2. Check front matter has `draft: false` or omit it
3. In Hugo, `draft: true` = not published by default

---

### Issue 5: Git Sync Issues

**Possible Causes:**
- Git Gateway not working
- Commits not pushed
- Netlify not detecting changes

**Solution:**
1. Check Git Gateway enabled in Identity settings
2. Verify commits in Git history
3. Check Netlify deploy logs

---

## 📊 Publishing Flow

### How Decap CMS → Site Works

```
1. You write post in CMS (/admin)
   ↓
2. Click "Save" button
   ↓
3. Decap CMS creates/updates markdown file
   ↓
4. Commits to Git via Git Gateway
   ↓
5. Pushes to GitHub (main branch)
   ↓
6. Netlify detects push
   ↓
7. Runs "hugo" build command
   ↓
8. Generates HTML from markdown
   ↓
9. Deploys to CDN
   ↓
10. Your post is live!
```

### Timeline

- **CMS Save**: Instant
- **Git Commit**: 1-2 seconds
- **GitHub Push**: 5-10 seconds
- **Netlify Build**: 1-3 minutes
- **CDN Update**: 30-60 seconds

**Total**: ~3-5 minutes from save to live

---

## ✅ Checklist for New Posts

Before reporting a post missing:

- [ ] Draft checkbox is UNCHECKED in CMS
- [ ] Clicked "Save" (not just typed)
- [ ] Waited 3-5 minutes after saving
- [ ] Checked Git log for commit
- [ ] Checked Netlify build succeeded
- [ ] Tried different browser/incognito
- [ ] Cleared browser cache
- [ ] Verified correct URL structure

---

## 🔍 How to Verify Your Post is Published

### Check 1: In CMS
1. Go to `/admin`
2. Click "Reflection Posts" collection
3. Your post should be listed
4. Draft should show as "false"

### Check 2: In Git
```bash
# View recent commits
git log --oneline content/reflections/

# View the file
cat content/reflections/YYYY-MM-DD-your-post.md
```

### Check 3: In Netlify
1. Go to Netlify Dashboard
2. Click "Deploys" tab
3. Check latest deploy succeeded
4. View build logs for errors

### Check 4: On Site
Visit: https://www.thelearningproject.in/reflections/

Your post should be there!

---

## 🎯 Where Posts Should Appear

### After This Fix

**Homepage** (`/`):
- Shows posts from `content/posts/`
- Shows reflections from `content/reflections/`
- Mixed together, newest first

**Reflections Listing** (`/reflections/`):
- Shows ONLY reflections posts
- All reflections from your CMS

**Individual Post**:
- `/reflections/YYYY/MM/post-slug/`
- Direct link to specific reflection

---

## 🚨 Still Not Working?

### Next Steps

1. **Check Netlify Build Logs**
   - Dashboard → Deploys → Latest
   - Look for Hugo errors
   - Verify reflections folder processed

2. **Verify Git Sync**
   - Check GitHub for new commits
   - Verify files exist in repo
   - Check commit messages contain "Create" or "Update"

3. **Test Locally**
   ```bash
   # Run Hugo locally
   hugo server
   
   # Visit localhost:1313/reflections/
   # See if posts appear
   ```

4. **Check File Structure**
   - Files in `content/reflections/`?
   - Front matter correct?
   - Draft field set correctly?

---

## 📞 Need More Help?

**Review These Files:**
- `QUICK_START.md` - Basic setup
- `TROUBLESHOOTING_IDENTITY.md` - Auth issues
- `VIEWING_POSTS.md` - Where to find posts
- `DECAP_CMS_SETUP.md` - Complete guide

**Check Netlify:**
- Dashboard: https://app.netlify.com
- Build logs
- Deploy history

**Verify Git:**
- GitHub: https://github.com/riteshvg/tlp
- Recent commits
- File changes

---

## 🎊 Current Status

✅ **Configuration Fixed**: `mainSections` now includes reflections  
✅ **Build Ready**: Next deploy will show reflections  
⏳ **Need Deploy**: Push changes to trigger rebuild  

**Next Step**: Commit and push this fix!


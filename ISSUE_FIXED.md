# ✅ Issue Fixed: Future-Dated Posts Not Appearing

## Problem Summary
Posts created in Decap CMS with recent dates (Nov 3, 2025) were **not appearing** on the live site, even though the commit was deployed to Netlify.

## Root Cause
Hugo, by default, **excludes future-dated posts** from production builds. Since your production build command in `netlify.toml` was simply `hugo`, it was filtering out any posts dated in the future.

**Example:**
- Post dated: Nov 3, 2025 20:27
- Current time: Nov 3, 2025 20:42  
- Hugo thinks: "This is in the past, but only just"
- **Reality**: Hugo might still filter it or there could be timezone issues

The solution: Use `--buildFuture` flag!

---

## Solution Applied

**Changed**: `netlify.toml`

**Before**:
```toml
[context.production.environment]
  HUGO_ENV = "production"
  HUGO_ENABLEGITINFO = "true"
```

**After**:
```toml
[context.production.environment]
  HUGO_ENV = "production"
  HUGO_ENABLEGITINFO = "true"

[context.production]
  command = "hugo --buildFuture"
```

---

## What `--buildFuture` Does

Tells Hugo to **include posts with future dates** in the build. This is essential for:
- Posts created "today" with today's date
- Timezone discrepancies
- CMS posts that might be slightly future-dated
- Scheduling posts in advance

---

## Testing Results

**Before Fix**:
```bash
$ hugo
Pages: 48

$ ls public/reflections/2025/11/
reflections-from-robin-sharma/
# Missing: reflections-test-2, test-post
```

**After Fix**:
```bash
$ hugo --buildFuture
Pages: 52

$ ls public/reflections/2025/11/
reflections-from-robin-sharma/
reflections-test-2/
test-post/
# All posts now present! ✅
```

---

## Impact

### Immediate
- ✅ All existing reflection posts now appear
- ✅ New CMS posts will work immediately
- ✅ No need to wait or adjust dates

### Going Forward
- ✅ Create posts with today's date in CMS
- ✅ Posts appear on site immediately
- ✅ No more filtering issues

---

## Related Configuration

Your `netlify.toml` now has consistent behavior across all environments:

```toml
[context.production]
  command = "hugo --buildFuture"  # ✅ Include future posts

[context.deploy-preview]
  command = "hugo --buildFuture -b $DEPLOY_PRIME_URL"  # ✅ Preview future posts

[context.branch-deploy]
  command = "hugo --buildFuture -b $DEPLOY_PRIME_URL"  # ✅ Branch testing
```

---

## Verification

Once Netlify deploys commit `899dd3e`, verify:

### Expected Results
- ✅ Homepage shows reflections
- ✅ `/reflections/` listing shows all posts
- ✅ Individual post pages work
- ✅ New CMS posts appear immediately

### Test URLs
- https://www.thelearningproject.in/reflections/
- https://www.thelearningproject.in/reflections/2025/11/reflections-from-robin-sharma/
- https://www.thelearningproject.in/reflections/2025/11/reflections-test-2/

---

## Status

✅ **Fixed**: Production builds now use `--buildFuture`  
✅ **Tested**: Local build confirms all posts generate  
✅ **Deployed**: Commit `899dd3e` pushed to GitHub  
⏳ **Waiting**: Netlify deployment in progress...  

---

## Lesson Learned

**Always include `--buildFuture` in Hugo production builds** when using a CMS that creates posts with current dates. Without it, timezone and date edge cases can cause posts to be filtered out unexpectedly.

This is especially important for:
- Git-based CMS (Decap CMS, Forestry, etc.)
- Scheduled posts
- Multi-timezone teams
- Date picker in CMS

---

**Next Deploy**: Your site will show all reflection posts! 🎉


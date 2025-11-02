# 📖 Viewing Your Published Reflections

## 🎉 You're In!

You successfully logged into the admin panel! Here's how to view your published posts.

---

## 🔗 Your Reflection URLs

### View All Reflections
**Main listing page:**
```
https://www.thelearningproject.in/reflections/
```

### View Individual Post
Based on your permalink structure: `/reflections/:year/:month/:slug/`

**Sample post:**
```
https://www.thelearningproject.in/reflections/2025/02/my-first-reflection/
```

**Format for future posts:**
```
https://www.thelearningproject.in/reflections/YYYY/MM/your-post-slug/
```

---

## 📋 How to Find Your Posts

### Method 1: Direct URL
Once you create a post in CMS, it will be at:
- Listing: `https://www.thelearningproject.in/reflections/`
- Post: `/reflections/YYYY/MM/post-title/`

### Method 2: From Admin
After publishing a post in the CMS:
1. Click **"View site"** link (if visible in CMS)
2. Or manually visit the listing URL above

### Method 3: Homepage
Depending on your Hugo config, reflections might also appear on:
```
https://www.thelearningproject.in/
```
(If reflections is set as a main section)

---

## 🧪 Test Right Now

### Check the Sample Post
Visit this URL:
```
https://www.thelearningproject.in/reflections/2025/02/my-first-reflection/
```

**You should see:**
- Title: "My First Reflection"
- Author: Ritesh Gupta
- Content from the sample post

### Check All Reflections
Visit:
```
https://www.thelearningproject.in/reflections/
```

**You should see:**
- List of all reflection posts
- At least the sample post
- Thumbnails, excerpts, dates

---

## 🔍 What If Posts Don't Appear?

### Issue 1: 404 Error
**Possible causes:**
- Post not saved yet
- `draft: true` in front matter
- Not pushed to GitHub yet
- Netlify hasn't rebuilt

**Solution:**
1. Check post was saved in CMS
2. Verify `draft` is unchecked
3. Wait 1-2 minutes for Netlify rebuild
4. Check Netlify deploy logs

### Issue 2: Listing Page Empty
**Possible causes:**
- No published posts
- Posts are drafts
- Files not in correct folder

**Solution:**
1. Visit `/admin`
2. Check "Reflection Posts" collection
3. Verify posts have `draft: false`
4. Click "Publish now" if saved as draft

### Issue 3: Wrong URL Structure
**Check your permalink:**
- Should be: `/reflections/YYYY/MM/post-slug/`
- Verify in `hugo.toml` line 32

---

## 📊 Post Status Guide

### In the CMS Admin

**Saved as Draft:**
- `draft: true` in front matter
- Won't appear on site
- Only visible in CMS

**Published:**
- `draft: false` or missing
- Visible on site
- Shows in listings

### Check Front Matter

In your post, look for:
```yaml
draft: false  # Published
```
or
```yaml
draft: true   # Draft (not visible)
```

---

## 🎯 Quick Reference

| What You Want | URL |
|---------------|-----|
| **All reflections listing** | `/reflections/` |
| **Sample post** | `/reflections/2025/02/my-first-reflection/` |
| **Admin panel** | `/admin` |
| **Homepage** | `/` |

---

## ✅ Your Next Steps

1. **Visit the listing**: https://www.thelearningproject.in/reflections/
2. **Click sample post** to view it
3. **Create new post** in CMS
4. **View new post** on site
5. **Share the link** with readers!

---

## 🚀 Create & Publish Flow

1. **Admin** → New Reflection Post
2. **Write** your content
3. **Save** (make sure Draft is unchecked)
4. **Visit** `/reflections/` to see it
5. **Click** post title to read full content
6. **Share** the URL!

---

**Your reflections are now live!** 🎊

Check them out at: **https://www.thelearningproject.in/reflections/**


# ⚡ Quick Start Guide - Decap CMS

**Get your reflections blog live in 5 minutes!**

---

## 🚦 The 5-Minute Setup

### Step 1: Enable Netlify Identity (2 min)

1. Open [Netlify Dashboard](https://app.netlify.com)
2. Select: **thelearningproject**
3. Go to: **Identity** (left sidebar)
4. Click: **Enable Identity** button

✅ Done? Move to Step 2!

---

### Step 2: Enable Git Gateway (1 min)

Still in Identity settings:

1. Scroll to **Services** section
2. Find **Git Gateway**
3. Click: **Enable Git Gateway**

✅ Done? Move to Step 3!

---

### Step 3: Create Your Account (2 min)

**Choose one method:**

#### Method A: Self-Registration (Recommended)

1. Visit: https://www.thelearningproject.in/admin
2. Click: **Sign up**
3. Enter email & create a new password (NOT your Git password!)
4. Click **Sign up**

#### Method B: Invitation

1. In Identity settings: **Invite users**
2. Enter your email
3. Click **Send invite**
4. **Check your email inbox** for the invitation from Netlify
5. Click the invite link in the email
6. **On the web page that opens**, you'll see a form to create your password
7. Create your password (NOT your Git password!)

✅ Done? You're ready to blog!

---

## ✍️ Write Your First Reflection

### Access the Admin Panel

Visit: **https://www.thelearningproject.in/admin**

### Create a New Post

1. Click: **"New Reflection Post"** button
2. Fill in:
   - Title
   - Date (click calendar icon)
   - Tags (click "Add")
   - Category (dropdown)
   - Upload image (optional)
   - Excerpt (brief summary)
   - Body (write your post)
3. Click: **"Save"** to publish!
4. Visit your site to see it live!

---

## 🎯 Quick Tips

### Adding Tags

- Click "Add" next to Tags
- Type tag name
- Press Enter
- Repeat for more tags

### Uploading Images

- Click "Choose an image" in Featured Image
- Select from your computer
- Image uploads automatically
- Use in post with: `![Alt text](/images/reflections/filename.jpg)`

### Drafts

- Check "Draft" box to save unpublished
- Edit later from admin panel
- Uncheck draft to publish

### Using <!--more-->

Add `<!--more-->` in your post body:

- Text above = summary in listings
- Text below = full content on post page

---

## 🔗 Your URLs

- **Admin**: https://www.thelearningproject.in/admin
- **Reflections**: https://www.thelearningproject.in/reflections/
- **Your Posts**: https://www.thelearningproject.in/reflections/YYYY/MM/slug/

---

## ⚠️ Troubleshooting

### "Identity is disabled"

→ Go to Netlify Dashboard → Identity → Enable Identity

### "Git Gateway not enabled"

→ Identity → Services → Enable Git Gateway

### "Can't log in"

→ Check you registered or were invited
→ Check spam folder for emails

### "404 on /admin"

→ Wait 2 minutes after deploying
→ Clear browser cache
→ Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

---

## 📚 Need More Help?

📖 **Full Guide**: See `DECAP_CMS_SETUP.md`

---

## 🎉 You're Ready!

**Start writing at: https://www.thelearningproject.in/admin**

Happy reflecting! 🚀✨

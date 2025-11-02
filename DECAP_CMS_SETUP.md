# Decap CMS Setup Guide for The Learning Project

## 🎉 Setup Complete!

Your Decap CMS (formerly Netlify CMS) has been successfully installed for your reflections blog.

---

## 📁 Files Created

The following files have been created for you:

### Core Files
1. **`static/admin/index.html`** - The admin interface entry point
2. **`static/admin/config.yml`** - CMS configuration for reflections
3. **`content/reflections/`** - Directory where your blog posts will be stored
4. **`static/images/reflections/`** - Directory for uploaded images
5. **`content/reflections/sample-reflection.md`** - Sample blog post template

### Configuration Updates
- **`netlify.toml`** - Added redirects for admin routes and Identity configuration
- **`hugo.toml`** - Added permalinks for reflections section

---

## 🚀 Next Steps: Enable Netlify Identity

To start using Decap CMS, you need to enable Netlify Identity in your Netlify dashboard:

### Step 1: Enable Identity Service

1. Go to your [Netlify Dashboard](https://app.netlify.com)
2. Select your site: **thelearningproject**
3. Navigate to: **Identity** → **Enable Identity**
4. Click the **Enable Identity** button

### Step 2: Configure Registration

1. In the Identity settings, go to **Registration preferences**
2. Set to **Open** or **Invite only** (recommended: Open for personal sites)
3. Enable **Email confirmations** if desired

### Step 3: Enable Git Gateway

1. Scroll down to **Services** in Identity settings
2. Click **Enable Git Gateway** button
3. This connects Identity to your GitHub repository

### Step 4: Invite Yourself as a User

1. Go to **Identity** → **Invite users**
2. Enter your email address (e.g., ritesh@thelearningproject.in)
3. Click **Send invite**
4. Check your email and click the invitation link
5. Create a new password (NOT your Git/GitHub password - this is for Netlify Identity only)

**Alternative: Self-Registration**

If you enabled "Open" registration:
1. Visit: `https://www.thelearningproject.in/admin`
2. Click **Sign up**
3. Create your account (use a new password - NOT your Git password)

---

## ✍️ How to Use Decap CMS

### Access the Admin Panel

1. Navigate to: **https://www.thelearningproject.in/admin**
2. Click **Login with Netlify Identity**
3. Enter your credentials
4. You'll see the admin dashboard

### Creating Your First Reflection

1. **Click "New Reflection Post"** in the sidebar
2. **Fill in the form:**
   - **Title**: Your post title
   - **Publish Date**: Click calendar icon to select date/time
   - **Author**: Defaults to "Ritesh Gupta" (can be changed)
   - **Tags**: Click "Add" to add tags (e.g., "learning", "career", "technical")
   - **Category**: Select from dropdown (Learning, Personal, Technical, Career, Inspiration)
   - **Featured Image**: Click to upload an image
   - **Excerpt**: Brief summary (will appear in listings)
   - **Body**: Write your post content using the markdown editor
   - **Draft**: Check if you want to save as draft (not published)
3. **Click "Save"** to publish immediately
4. **Click "Publish now"** if saved as draft

### Image Management

- Upload images directly in the editor
- Images are stored in: `static/images/reflections/`
- They'll be accessible at: `/images/reflections/filename.jpg`

### Markdown Editor Features

The editor supports:
- **Bold** and *italic* text
- Headers (# through ######)
- Lists (numbered and bulleted)
- Links and images
- Code blocks
- Quotes
- Tables

---

## 🔗 URL Structure

Your reflections will be published at:
- **Format**: `https://www.thelearningproject.in/reflections/YYYY/MM/slug/`
- **Example**: `https://www.thelearningproject.in/reflections/2025/02/my-reflection-post/`

---

## 📝 Writing Tips

### Front Matter Fields

Each post includes these fields in the front matter:

```yaml
title: "Your Post Title"
date: 2025-02-20 00:00:00
author: "Ritesh Gupta"
tags: ["tag1", "tag2", "tag3"]
category: "Technical"  # Options: Learning, Personal, Technical, Career, Inspiration
thumbnailImage: "/images/reflections/your-image.jpg"
excerpt: "Brief summary of your post"
draft: false  # Set to true for drafts
```

### Using the More Separator

Add `<!--more-->` in your body to create a summary:
- Text above `<!--more-->` appears in listings
- Full content shows on the individual post page

Example:
```markdown
This is the summary text that appears in listings.

<!--more-->

This is the full content that only appears on the post page.
```

### Draft Posts

- Check **Draft** when creating a post to save as unpublished
- Drafts won't appear on your public site
- Edit and publish later from the admin panel

---

## 🔒 Security Notes

- **Git Gateway** uses your GitHub OAuth token
- Only invited users can access the admin panel
- All changes are version-controlled in your repository
- Each save creates a Git commit
- You can revert changes through Git history

---

## 🛠️ Troubleshooting

### Admin Panel Shows 404

- Ensure you've deployed the latest version to Netlify
- Check that `static/admin/index.html` exists in your repository
- Verify redirects are configured in `netlify.toml`

### Can't Login

- Make sure Identity is enabled in Netlify dashboard
- Verify you've been invited or registered
- Check email spam folder for invitation/confirmation

### Git Gateway Not Working

- Re-enable Git Gateway in Identity settings
- Check that your GitHub OAuth is connected
- Verify repository permissions in Netlify

### Posts Not Appearing

- Check Hugo build logs in Netlify Deploy Settings
- Verify `draft: false` in your post front matter
- Ensure your content is in `content/reflections/` folder
- Try rebuilding your site in Netlify

### Images Not Showing

- Verify images are uploaded to `static/images/reflections/`
- Check image paths in posts (should start with `/images/reflections/`)
- Ensure images are committed to your repository

---

## 📚 Additional Resources

- **Decap CMS Docs**: https://decapcms.org/docs/
- **Netlify Identity Docs**: https://docs.netlify.com/visitor-access/identity/
- **Git Gateway Docs**: https://www.netlify.com/docs/identity-and-git-gateway/
- **Hugo Front Matter**: https://gohugo.io/content-management/front-matter/

---

## ✅ Quick Checklist

- [x] Decap CMS files created
- [x] Netlify.toml configured
- [x] Hugo.toml updated
- [ ] Netlify Identity enabled
- [ ] Git Gateway enabled
- [ ] User account created/invited
- [ ] First reflection post written
- [ ] Site deployed and tested

---

## 🎯 Next Steps After Setup

1. Write your first reflection at `/admin`
2. Review the published post on your site
3. Customize the `config.yml` if needed (e.g., add more fields, collections)
4. Share your reflections link with readers!

**Questions or Issues?**

Contact: ritesh@thelearningproject.in or check the troubleshooting section above.

---

**Happy Reflecting!** 🚀✨


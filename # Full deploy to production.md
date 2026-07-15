# Full deploy to production

./deploy.sh "your commit message"

# Preview deploy (get a draft URL without touching production)

./deploy.sh "your commit message" --draft

For any other Netlify-hosted project, the steps to replicate this are:

# 1. Install CLI (once)

npm install -g netlify-cli

# 2. Login (once)

netlify login

# 3. Link to the Netlify site (once per project)

netlify link --id <site-id> # get site ID from: netlify sites:list

# 4. Copy deploy.sh into the project root and make it executable

chmod +x deploy.sh

# 5. Deploy anytime

./deploy.sh "commit message"

The script handles build → commit → push → deploy in one shot, and skips the git step automatically if there's nothing new to commit.

1. Create content/posts/your-new-post.md
2. hugo server -D ← preview locally
3. ./deploy.sh "new post: title" ← build + push + go live

Your optimized workflow going forward:

# 1. Write/edit content

# 2. Preview locally — free, unlimited

hugo server -D

# 3. When ready to share with someone — free preview URL

./deploy.sh "testing new post" --draft

# 4. Only when everything is confirmed ready — costs 15 credits

./deploy.sh "publish: new blog post on AEP Web SDK"

At 20 deploys/month that's roughly:

- 4 blog posts × 1 deploy each = 4 credits × 15 = 60
- 2 design/feature updates = 30
- Leaves ~14 deploys of headroom for fixes

That's comfortably within 300/month. The goal is never deploy to fix something you could have caught locally.

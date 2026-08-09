# Setup Guide

Your site works as a static portfolio right out of the box. Two features need
a couple of settings in Vercel to actually work: the **admin panel** (edit
every detail of the site live) and **Feedback & Ratings** (visitors leaving
reviews). Both are powered by your GitHub repo — every save is just a commit,
no database, no billing account, ever.

This takes about 5 minutes.

## 1. Create a GitHub Personal Access Token

This lets the site write to your repo on your behalf (to save content and
feedback). It's free — GitHub never asks for payment info for this.

1. Go to [github.com/settings/tokens?type=beta](https://github.com/settings/tokens?type=beta) (Fine-grained tokens)
2. Click **Generate new token**
3. Name it `portfolio-admin`, set expiration to whatever you're comfortable with (e.g. 1 year)
4. Under **Repository access**, choose **Only select repositories** → pick `manideep-s-portfolio`
5. Under **Permissions → Repository permissions**, find **Contents** and set it to **Read and write**
6. Click **Generate token** and **copy it immediately** — GitHub only shows it once. It looks like `github_pat_...`

## 2. Choose an admin password

Pick any password you'll remember — this is what unlocks `/admin.html`. Not
your GitHub password, just something new for this site.

## 3. Add both as environment variables in Vercel

1. Go to your project on [vercel.com](https://vercel.com) → **Settings → Environment Variables**
2. Add:
   - `GITHUB_TOKEN` = the token you copied in step 1
   - `ADMIN_PASSWORD` = the password you chose in step 2
3. Click **Save** for each
4. Go to the **Deployments** tab → click the **⋯** menu on the latest deployment → **Redeploy** (env vars only apply to new deployments)

## 4. Use the admin panel

Visit `https://your-site.vercel.app/admin.html`, enter your `ADMIN_PASSWORD`,
and edit any section from the sidebar. Each tab has its own **Save** button —
changes commit straight to your GitHub repo and go live within seconds, no
redeploy needed. The **Feedback & Ratings** tab lets you read and delete what
visitors submit. The **Overview** tab shows page views, feedback count, and
average rating.

## How it works (no database needed)

- Your site's content lives in `data/content.json`, `data/feedback.json`, and
  `data/stats.json` inside your GitHub repo — plain files, versioned by git.
- The public site reads them through `/api/content` and `/api/feedback`
  (small serverless functions in the `api/` folder, which Vercel runs for
  free on the Hobby plan — no card required).
- Saving from the admin panel calls those same API routes, which commit the
  updated JSON back to GitHub using your token — server-side only, the token
  is never sent to the browser.
- Every content change and every piece of feedback shows up as a commit in
  your repo's history, so you get a free changelog for the whole site.

## Notes

- `GITHUB_TOKEN` and `ADMIN_PASSWORD` must stay in Vercel's environment
  variables, never in code — that's what keeps your repo-write access private.
- The `/api/*` routes only work once deployed on Vercel. Opening `index.html`
  or `admin.html` locally (or via a plain `python -m http.server`) will show
  the static default content and a "couldn't reach the server" message on
  admin login — that's expected, not a bug.
- If you ever want to reset a section back to its original text, the defaults
  are preserved in `content-schema.js` and `data/content.json`'s original
  commit — you can view/restore them from your GitHub history.

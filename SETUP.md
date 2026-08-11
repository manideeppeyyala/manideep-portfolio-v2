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

## 5. (Optional) Live YouTube subscriber count

The Social Analytics section can show your real, auto-updating YouTube
subscriber count. This needs a free YouTube Data API key — no OAuth, no
billing account, just a key.

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and create a project (or reuse one)
2. In the search bar, find **"YouTube Data API v3"** and click **Enable**
3. Go to **APIs & Services → Credentials → Create Credentials → API key**
4. Copy the key it generates
5. (Recommended) Click **Edit API key**, under **API restrictions** choose **Restrict key** → select **YouTube Data API v3** only — this limits what the key can be used for even if it ever leaked
6. In Vercel, add one more environment variable: `YOUTUBE_API_KEY` = the key you copied
7. Redeploy

If you skip this, the YouTube card just shows "—" instead of a number —
nothing else breaks.

**Instagram and Facebook:** these platforms don't offer a free API for
personal-account follower counts without a Meta Business App review and
regularly-expiring tokens — not a realistic "set once" setup. Instead, go to
`/admin.html` → **Social Analytics** tab, and type the current follower count
into the **Manual Value** field for each. Update it whenever you like — no
code, no redeploy.

## 6. Activate Juliet (real AI) — free, no card required

Juliet is a real AI model (Google Gemini) wired into this site through a
secure serverless proxy — the "Meet Juliet" section and Romeo (the chat
widget) both use it. Until you add a key, both honestly show a
"not activated yet" state instead of faking a response — that's intentional,
not a bug.

1. Go to **[aistudio.google.com/apikey](https://aistudio.google.com/apikey)** and sign in with any Google account
2. Click **Create API key** (no credit card, no billing account required for the free tier)
3. Copy the key
4. In Vercel → **Settings → Environment Variables**, add: `GEMINI_API_KEY` = the key you copied
5. Redeploy

That's it — reload the site and:
- The **"Meet Juliet"** section's status dot turns green and you can chat with a real AI directly
- **Romeo** (the chat widget) starts answering through Juliet instead of its local fallback engine

**Free tier limits to know:** Google's free Gemini API tier has a generous
but real request-per-minute and per-day cap (it can change over time — check
[ai.google.dev/pricing](https://ai.google.dev/pricing) for current numbers).
If a visitor hits the limit, Juliet shows a friendly "getting a lot of
questions right now, try again in a moment" message rather than failing
silently. There's no real-time web/search access in this setup — Juliet says
so plainly if asked something that needs current information, rather than
guessing.

**If you ever want to swap providers** (OpenAI, Anthropic, etc.), everything
routes through one file: edit `api/juliet-chat.js` to call a different
provider's API instead of Gemini, keeping the same request/response shape —
nothing in `romeo.js` or `juliet-section.js` needs to change.

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

- `GITHUB_TOKEN`, `ADMIN_PASSWORD`, `YOUTUBE_API_KEY`, and `GEMINI_API_KEY` must
  all stay in Vercel's environment variables, never in code — that's what
  keeps them private. None of them are ever sent to the browser; every call
  to GitHub, YouTube, or Gemini happens server-side in `api/*.js`.
- The `/api/*` routes only work once deployed on Vercel. Opening `index.html`
  or `admin.html` locally (or via a plain `python -m http.server`) will show
  the static default content and a "couldn't reach the server" message on
  admin login — that's expected, not a bug.
- If you ever want to reset a section back to its original text, the defaults
  are preserved in `content-schema.js` and `data/content.json`'s original
  commit — you can view/restore them from your GitHub history.

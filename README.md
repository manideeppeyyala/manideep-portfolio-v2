# Peyyala Manideep — Portfolio

Personal portfolio website for **Peyyala Manideep** — SmartComm Developer &
AI/Data Engineer at Deloitte. A hand-built, dependency-free static site with
a live-editable admin panel and a real visitor feedback/ratings system —
no database, no billing account, powered entirely by GitHub + Vercel's free
tiers.

🔗 **Live site:** https://manideep-s-portfolio-gamma.vercel.app
🔒 **Admin panel:** https://manideep-s-portfolio-gamma.vercel.app/admin.html

---

## What this is

This repo is the full source for a personal portfolio: resume content,
published research, certifications, a feedback wall, and a private admin
dashboard to edit every one of those sections without touching code or
redeploying. It was built section-by-section to match a specific Figma
design, then extended with real content (résumé, certificates, publications)
and a from-scratch backend.

## Features

- **Design** — dark, gradient-accented theme with an animated cursor, typed-role hero, orbiting skill nodes, and scroll-triggered reveals; fully responsive across mobile/tablet/desktop
- **Sections** — Home, About, Experience, Skills, Projects, Achievements & Certifications, Research, Content/Social, Education, Feedback & Ratings, Contact
- **Admin panel** (`/admin.html`) — password-protected dashboard to edit every section of the live site: hero copy, bio, work experience, skill categories, projects, certifications, research, education, contact info, and footer. Every tab has its own Save button; changes go live in seconds, no redeploy.
- **Feedback & Ratings** — visitors leave a star rating + comment; the site shows a live average rating and a scrolling wall of testimonials
- **3D animated social icons** — hand-built SVG brand glyphs in floating, rotating badge cards with an interactive cursor-tilt effect
- **Social Analytics section** — YouTube subscribers and GitHub followers update automatically via free public APIs; Instagram/Facebook are admin-editable (no free live API exists for personal accounts on those platforms)
- **Overview dashboard** — page view count, feedback count, and average rating at a glance
- **Zero-cost backend** — content, feedback, and stats are plain JSON files committed to this repo. Reads/writes go through small Vercel serverless functions (`/api`) using the GitHub Contents API — no database, no Firebase, no card ever required, and every change is a versioned git commit

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript — no framework, no build step |
| Backend | Vercel serverless functions (`/api/*.js`) |
| Storage | JSON files in this repo (`/data`), read/written via the GitHub REST API |
| Auth | Single admin password, checked server-side against a Vercel environment variable |
| Hosting | [Vercel](https://vercel.com/) Hobby plan (free) |
| Fonts | Space Grotesk, JetBrains Mono, Inter |

## Project Structure

```
portfolio-website/
├── index.html            # Public site
├── admin.html             # Admin dashboard (content editor + feedback moderation)
├── style.css              # Public site styles
├── admin.css              # Admin dashboard styles
├── script.js               # Cursor, nav, reveal animations, typed roles
├── content-schema.js      # Default content (fallback + admin starting values)
├── content-loader.js      # Renders public site from content-schema / live API
├── feedback.js            # Feedback form + testimonials + rating widget
├── admin.js               # Admin dashboard logic (auth, forms, save/load)
├── api/
│   ├── content.js         # GET live content / POST admin-only section updates
│   ├── feedback.js        # GET all feedback / POST public submission / DELETE admin-only
│   ├── login.js            # POST password check
│   └── pageview.js        # GET/POST page view counter
├── lib/github.js          # Shared helper: read/write JSON files via the GitHub API
├── data/                  # content.json, feedback.json, stats.json — the "database"
├── vercel.json             # Deployment headers/config
├── assets/                # Resume PDF, profile photo, certificate files
├── README.md               # You are here
└── SETUP.md                # Step-by-step setup guide (~5 minutes, no billing account needed)
```

## How the admin panel works

1. Visit `/admin.html` and sign in with the admin password (set as the
   `ADMIN_PASSWORD` environment variable in Vercel — never stored in code).
2. Pick a section from the sidebar. Every field on the public site — down to
   individual skill tags, project badges, and certificate descriptions — has
   a matching input, with add/remove controls for list items.
3. Hit **Save**. The change is written to `data/content.json` in this repo
   via the GitHub API (server-side only — the write token never reaches the
   browser) and appears on the live site within seconds.
4. The **Feedback & Ratings** tab shows everything visitors have submitted,
   with a delete button for moderation. The **Overview** tab shows page
   views, feedback count, and average rating.

## Local development

Since the `/api` routes are Vercel serverless functions, they only run once
deployed (or under `vercel dev` locally). Opening `index.html` directly (or
via a plain static server) still renders the full site from
`content-schema.js`'s defaults — the admin panel will just show a
"couldn't reach the server" message until deployed.

## Setup from scratch

See **[SETUP.md](SETUP.md)** for the full walkthrough: generating a
GitHub token, setting two environment variables in Vercel, and deploying —
about 5 minutes, nothing ever requires a credit card.

## Contact

- Email: manideepyadav380@gmail.com
- LinkedIn: [linkedin.com/in/peyyalamanideep](https://www.linkedin.com/in/peyyalamanideep/)
- GitHub: [github.com/manideeppeyyala](https://github.com/manideeppeyyala)
- YouTube: [@vlogingwithmani2003](https://www.youtube.com/@vlogingwithmani2003)
- Instagram: [@vloggingwithmani](https://www.instagram.com/vloggingwithmani/)

# Peyyala Manideep — Portfolio

Personal portfolio website for **Peyyala Manideep**, SmartComm Developer & AI/Data Engineer at Deloitte. Built as a fast, dependency-free static site with an optional Firebase-backed admin panel for live content editing and a visitor feedback/ratings system.

**Live site:** _add your Vercel URL here once deployed_

## Features

- Dark, gradient-accented design with an animated cursor, typed-role hero, and scroll reveals
- Sections: Home, About, Experience, Skills, Projects, Achievements & Certifications, Research, Content/Social, Education, Feedback & Ratings, Contact
- Fully responsive (mobile, tablet, desktop)
- **Admin panel** (`/admin.html`) — edit every section of the site live, no redeploy needed, protected by a single admin password
- **Feedback & Ratings** — visitors can leave a star rating + comment; average rating and testimonials update live
- Page view tracking and a stats overview in the admin dashboard
- No database, no billing account: content and feedback are JSON files committed straight to this repo via small Vercel serverless functions
- Works as a plain static site even before the admin/feedback backend is configured

## Tech Stack

- Vanilla HTML, CSS, and JavaScript — no build step, no framework
- Vercel serverless functions (`/api`) that read/write JSON files in this repo via the GitHub API
- Deployed on [Vercel](https://vercel.com/) (Hobby plan, free, no card required)

## Project Structure

```
portfolio-website/
├── index.html            # Public site
├── admin.html            # Admin dashboard (content editor + feedback moderation)
├── style.css             # Public site styles
├── admin.css             # Admin dashboard styles
├── script.js             # Cursor, nav, reveal animations, typed roles
├── content-schema.js     # Default content (fallback + admin starting values)
├── content-loader.js     # Renders public site from content-schema / live API
├── feedback.js           # Feedback form + testimonials + rating widget
├── admin.js              # Admin dashboard logic (auth, forms, save/load)
├── api/                  # Vercel serverless functions (content, feedback, login, pageview)
├── lib/github.js         # Shared helper: read/write JSON files via GitHub API
├── data/                 # content.json, feedback.json, stats.json (the "database")
├── vercel.json           # Deployment headers/config
├── assets/               # Resume, profile photo, certificate files
└── SETUP.md              # Step-by-step setup guide (~5 minutes)
```

## Getting Started

The site works immediately as-is — just open `index.html` in a browser, or deploy the folder as-is to any static host.

To enable the admin panel and feedback system, follow **[SETUP.md](SETUP.md)** — it walks through generating a GitHub token, setting two environment variables in Vercel, and redeploying (about 5 minutes, no billing account needed anywhere).

## Editing Content

Once set up, go to `/admin.html`, sign in with your admin password, and edit any section from the sidebar. Every tab has its own **Save** button — changes commit to this repo and go live on the public site within seconds.

## Contact

- Email: manideepyadav380@gmail.com
- LinkedIn: [linkedin.com/in/peyyalamanideep](https://www.linkedin.com/in/peyyalamanideep/)
- GitHub: [github.com/manideeppeyyala](https://github.com/manideeppeyyala)

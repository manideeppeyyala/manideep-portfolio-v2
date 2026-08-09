# Peyyala Manideep — Portfolio

Personal portfolio website for **Peyyala Manideep**, SmartComm Developer & AI/Data Engineer at Deloitte. Built as a fast, dependency-free static site with an optional Firebase-backed admin panel for live content editing and a visitor feedback/ratings system.

**Live site:** _add your Vercel URL here once deployed_

## Features

- Dark, gradient-accented design with an animated cursor, typed-role hero, and scroll reveals
- Sections: Home, About, Experience, Skills, Projects, Achievements & Certifications, Research, Content/Social, Education, Feedback & Ratings, Contact
- Fully responsive (mobile, tablet, desktop)
- **Admin panel** (`/admin.html`) — edit every section of the site live, no redeploy needed, protected by email/password login
- **Feedback & Ratings** — visitors can leave a star rating + comment; average rating and testimonials update live
- Page view tracking and a stats overview in the admin dashboard
- Works as a plain static site even without Firebase configured — admin/feedback just show a "not connected yet" message until set up

## Tech Stack

- Vanilla HTML, CSS, and JavaScript — no build step, no framework
- [Firebase](https://firebase.google.com/) (Firestore + Authentication) for the admin panel and feedback storage
- Deployed on [Vercel](https://vercel.com/)

## Project Structure

```
portfolio-website/
├── index.html            # Public site
├── admin.html            # Admin dashboard (content editor + feedback moderation)
├── style.css             # Public site styles
├── admin.css             # Admin dashboard styles
├── script.js             # Cursor, nav, reveal animations, typed roles
├── content-schema.js     # Default content (fallback + admin starting values)
├── content-loader.js     # Renders public site from content-schema / Firestore
├── feedback.js           # Feedback form + testimonials + rating widget
├── admin.js              # Admin dashboard logic (auth, forms, save/load)
├── firebase-config.js    # Your Firebase project config (see SETUP.md)
├── firebase-init.js      # Initializes Firebase SDK
├── firestore.rules       # Firestore security rules
├── vercel.json           # Deployment headers/config
├── assets/               # Resume, profile photo, certificate files
└── SETUP.md              # Step-by-step Firebase + Vercel setup guide
```

## Getting Started

The site works immediately as-is — just open `index.html` in a browser, or deploy the folder as-is to any static host.

To enable the admin panel and feedback system, follow **[SETUP.md](SETUP.md)** — it walks through creating a free Firebase project, wiring up the config, and deploying to Vercel (about 10 minutes).

## Editing Content

Once Firebase is set up, go to `/admin.html`, sign in, and edit any section from the sidebar. Every tab has its own **Save** button — changes go live on the public site immediately.

## Contact

- Email: manideepyadav380@gmail.com
- LinkedIn: [linkedin.com/in/peyyalamanideep](https://www.linkedin.com/in/peyyalamanideep/)
- GitHub: [github.com/manideeppeyyala](https://github.com/manideeppeyyala)

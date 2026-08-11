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
- **Social Analytics section** — YouTube subscribers and GitHub followers update automatically via free public APIs; Instagram/Facebook are admin-editable (no free live API exists for personal accounts on those platforms). Every stat also has an admin-set manual value shown immediately and used as a graceful fallback if a live fetch fails.
- **3D icon system across every section** — Skills, Projects, Certifications, Experience, and Education each get a floating, rotating 3D badge icon (tech-accurate: Python, database, AI, briefcase, graduation cap, etc.), all cursor-tilt interactive
- **Magnetic buttons** — every CTA leans gently toward the cursor as it approaches, not just on direct hover
- **Juliet — a real AI model embedded in the site** — powered by Google Gemini through a secure serverless proxy (`api/juliet-chat.js`); the API key never reaches the browser. Answers general and technical questions, writes and debugs code, holds multi-turn conversations, and answers questions about this portfolio grounded strictly in real content (see `juliet-knowledge.js`) — she says so plainly when something's outside her knowledge or needs real-time information she doesn't have, rather than guessing. Try her directly in the **"Meet Juliet"** section, or as a featured project.
- **Romeo — Juliet's chat interface** — a persistent side popup with a cute, laughing 3D-animated dog avatar. Routes every message to Juliet; if she isn't configured yet or a request fails, Romeo automatically and transparently falls back to a local, portfolio-grounded knowledge engine (clearly labeled "local knowledge" in the UI) so the widget never fakes a response or breaks. See [Romeo & Juliet Visual Identity](#romeo--juliet-visual-identity) below for the full design writeup.
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
├── icons-3d.js            # 3D icon SVG library (social + tech/section icons)
├── juliet-knowledge.js    # Portfolio knowledge base, built from content-schema.js
├── juliet-client.js       # Shared client: askJuliet() — calls the real backend
├── juliet-section.js      # "Meet Juliet" dedicated section UI logic
├── romeo.js               # Romeo chat widget (Juliet + local knowledge fallback)
├── markdown-render.js     # Safe Markdown rendering + copy-to-clipboard for code
├── api/
│   ├── content.js         # GET live content / POST admin-only section updates
│   ├── feedback.js        # GET all feedback / POST public submission / DELETE admin-only
│   ├── login.js            # POST password check
│   ├── pageview.js        # GET/POST page view counter
│   ├── youtube-stats.js   # GET live YouTube subscriber count
│   └── juliet-chat.js     # POST to Juliet (Gemini) — the real AI backend
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

## Romeo & Juliet Visual Identity

Both characters' faces were redesigned from an earlier simpler version to be
cute, expressive, and clearly laughing, while keeping the same architecture
(no new dependencies, same files, same integration points).

**What changed:** every Romeo face (FAB button + chat panel header) and every
Juliet face (console header + empty-state) in `index.html` was replaced with
new hand-authored inline SVG artwork, plus new/updated CSS animations in
`style.css` and a new hover interaction in `script.js`. Nothing about the
chat logic, backend, knowledge grounding, or layout changed — this was a
visual-only pass.

**Design:**
- **Romeo** (dog) — purple-to-magenta radial-gradient head with a glossy
  highlight, floppy pink/magenta ears, big round sparkly eyes with a happy
  squint-curve underneath, rosy blush, an open laughing mouth with visible
  teeth, and a tongue lolling to the side.
- **Juliet** (panda) — soft pink/white gradient face, round black ears and
  eye-patches, closed upward-arc "laughing so hard her eyes are closed"
  expression (deliberately different from Romeo's open sparkly eyes so the
  two read as distinct personalities), rosy blush, an open laughing mouth,
  and two twinkling gold sparkle accents for a touch of "AI magic."
- Both share the same construction technique, proportions, line weights, and
  brand color family (the site's cyan/purple/pink gradient) so they read as
  a compatible pair despite being different characters.

**Technical approach — why SVG + CSS, not WebGL:** the project has no 3D
library and no build step. Introducing Three.js (or similar) for two small
avatars would add a new dependency, meaningful bundle weight, and real
mobile-performance/compatibility risk for a feature that's decorative, not
core. Layered inline SVG with CSS 3D transforms achieves a genuinely
dimensional, glossy, "premium 3D logo" look (radial gradients simulate
lighting/depth, `perspective` + `rotateX/rotateY` give real 3D rotation) at a
fraction of the cost, with guaranteed cross-device compatibility. This is a
deliberate choice, not a limitation — reuse the existing architecture per the
request's own priority order.

**Animation (all in `style.css`, respecting `prefers-reduced-motion`):**
- Idle: gentle float/bob (`romeoBob` / on `.juliet-svg`), ear wiggle/pulse,
  a "laugh crinkle" on the eyes, a breathing scale pulse on the open mouth
  (`laughPulse`, shared by both), a blush opacity pulse (`cheekPulse`,
  shared), Romeo's tongue wags, Juliet's sparkles twinkle on a staggered
  delay.
- "Thinking" state (while waiting on a reply): ear and mouth animations
  speed up via `.romeo-thinking`, giving a subtle "excited" tell.

**Hover/interaction:** rather than a scale-up, hovering (or the cursor
approaching, on devices with a real pointer) tilts each avatar in 3D toward
the cursor position — `initAvatarTilt()` in `script.js`, the same
mousemove-driven `perspective`/`rotateX`/`rotateY` technique already used for
the site's project/skill cards, applied here to the avatar's outer wrapper
(`.romeo-avatar` / `.juliet-avatar`) so it composes cleanly with the inner
SVG's own idle "bob" animation instead of fighting it. Gated behind the same
`tiltCapable` check as the rest of the site (`hover: hover` + `pointer: fine`
+ not `prefers-reduced-motion`), so touch/mobile devices simply keep the
idle animations with no broken hover state.

**Dependencies added:** none. Everything is hand-authored inline SVG and
plain CSS, consistent with the rest of the site.

**Files affected:** `index.html` (4 SVG instances replaced), `style.css`
(avatar animation keyframes rewritten/added, `perspective`/`transition`
added to the avatar wrappers), `script.js` (new `initAvatarTilt()`).
`romeo.js`, `juliet-section.js`, `juliet-client.js`, `juliet-knowledge.js`,
and `api/juliet-chat.js` were **not** touched — the chat logic, backend, and
knowledge grounding are unchanged.

**Verification performed:** this project has no `package.json` build/lint
scripts (plain static site, no bundler), so "run the build" doesn't apply
literally. What was actually run and checked:
- `node --check` on every `.js` file (syntax validation) — all pass.
- Repo-wide `grep` audit for the old chatbot name ("Bittu") and any orphaned
  CSS class/animation references — found and fixed two dead keyframe
  references (`.juliet-msg`/`.juliet-typing` were pointing at animation names
  that had been renamed during an earlier Romeo rename and never updated) —
  now fixed as part of this pass.
- Manual brace-balance check on `style.css`.
- Live browser verification (local static server + the deployed Vercel site):
  confirmed all 4 avatar instances render, every listed animation is
  actually applied (`getComputedStyle(...).animationName` checked per
  element), the hover-tilt handler is attached to all 4 avatars, and the
  chat panel opens/closes and sends messages correctly with the new faces
  in place.
- Mobile viewport (375×812) checked for layout/overflow — no issues.

**Maintenance notes:** if you want to swap Romeo/Juliet's colors, edit the
gradient `<stop>` colors inside the relevant `<defs>` block in `index.html`
(`romeoGradHead`/`romeoGradEar` for Romeo, `julietFaceGrad`/`julietEarGrad`
for Juliet) — there are two SVG instances per character and both share the
same gradient IDs, so update both `<defs>` blocks (currently only defined
once each, in the first instance of each character, and referenced by ID
from the second — keep it that way rather than duplicating `<defs>`, to
avoid the two instances drifting out of sync).

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

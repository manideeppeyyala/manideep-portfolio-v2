# Peyyala Manideep — Portfolio (manideep-portfolio-v2)

Personal portfolio website for **Peyyala Manideep** — SmartComm Developer &
AI/Data Engineer at Deloitte. A hand-built, dependency-free static site with
a live-editable admin panel, a real visitor feedback/ratings system, and a
trio of AI characters (Romeo, Juliet, Bittu) backed by a genuine AI model —
all on a strictly **zero-cost, no-credit-card-ever** stack (GitHub + Vercel
free tiers only).

🔗 **Live site (this project's active deployment):** https://manideep-s-portfolio-gamma.vercel.app
🔒 **Admin panel:** https://manideep-s-portfolio-gamma.vercel.app/admin.html
📦 **This repository:** a complete, documented snapshot of the full codebase — see
[Note on this repository vs. the live deployment](#note-on-this-repository-vs-the-live-deployment)
below for exactly how the two relate.

---

## Table of contents

- [What this is](#what-this-is)
- [Note on this repository vs. the live deployment](#note-on-this-repository-vs-the-live-deployment)
- [Features, in full](#features-in-full)
- [Tech stack](#tech-stack)
- [Every file, and what it does](#every-file-and-what-it-does)
- [Data model — what's actually stored](#data-model--whats-actually-stored)
- [API reference](#api-reference)
- [Visual identity & color system](#visual-identity--color-system)
- [The AI trio: Romeo, Juliet & Bittu](#the-ai-trio-romeo-juliet--bittu)
- [Admin panel — full walkthrough](#admin-panel--full-walkthrough)
- [Setup from scratch (zero cost, no card)](#setup-from-scratch-zero-cost-no-card)
- [Local development](#local-development)
- [Security notes](#security-notes)
- [Content included](#content-included)
- [Known limitations](#known-limitations)
- [Contact](#contact)

---

## What this is

This repo is the full source for a personal portfolio: résumé content,
published research, certifications, a feedback wall, a private admin
dashboard to edit every one of those sections without touching code or
redeploying, and three distinct AI characters — one of which (Juliet) is a
genuinely real generative AI model, not a scripted chatbot. It was built
section-by-section to match a specific Figma design, extended with real
content (résumé, certificates, publications), given a from-scratch
zero-cost backend, then went through several full visual/AI redesign passes
to reach its current state.

## Note on this repository vs. the live deployment

This repository is a **complete, faithful snapshot of the entire codebase**
that powers the live site — every line of HTML/CSS/JS, every API route,
every asset, and this documentation, all in one place, with full commit
history preserved from the original repository.

One architectural detail worth being explicit about: the backend
(`lib/github.js`) reads and writes the site's live content, feedback, and
stats **directly against the original repository**
(`manideeppeyyala/manideep-s-portfolio`, hardcoded as `OWNER`/`REPO`
constants) — that's the repo the live Vercel deployment above is wired to,
and where the admin panel's saves actually land as commits. This repository
is not a second independent live deployment; it's this project's complete,
documented reference copy.

If this repo is ever pointed at its **own** Vercel project to run as a
fully independent second deployment, three things need to change first:
1. Update `OWNER`/`REPO` in `lib/github.js` to `manideeppeyyala`/`manideep-portfolio-v2`.
2. Generate a **new** fine-grained GitHub token scoped to *this* repo (see [Setup from scratch](#setup-from-scratch-zero-cost-no-card)) and set it as `GITHUB_TOKEN` in that new Vercel project.
3. Set fresh `ADMIN_PASSWORD` / `GEMINI_API_KEY` / (optionally) `YOUTUBE_API_KEY` environment variables — none of these are shared between deployments, by design (each project's secrets stay in its own Vercel environment, never in code).

## Features, in full

**Design & interaction**
- Deliberately non-generic, cheery coral → red → cherry → rose-red visual
  identity (see [Visual identity & color system](#visual-identity--color-system))
  — not the typical blue→purple→pink "AI site" look.
- Animated custom cursor, typed-role hero text, orbiting skill nodes,
  scroll-triggered reveal animations, magnetic buttons, cursor-tilt 3D cards.
- Fully responsive: mobile, tablet, and desktop breakpoints, tested at
  375×812 through desktop widths.
- Hand-built inline-SVG 3D icon system (social brand icons + tech/section
  icons) in floating, rotating badge cards, all cursor-tilt interactive —
  zero external icon library, zero images for icons.

**Content sections** (14 total, in page order): Home, About, Experience,
Skills, Projects, Achievements & Certifications, Research/Publications,
Content/Social, Social Analytics, Education, Meet Juliet, Meet Bittu,
Feedback & Ratings, Contact.

**Admin panel** (`/admin.html`)
- Password-protected (single admin password, checked server-side).
- Every section of the live site has a matching editable form — down to
  individual skill tags, project badges, certificate descriptions, and now
  the Meet Juliet / Meet Bittu intro text and capability tags.
- Each tab saves independently; a save is a real git commit to
  `data/content.json`, live on the public site within seconds — no rebuild,
  no redeploy.
- An **Overview** tab shows page view count, feedback count, and average
  rating at a glance.
- A **Feedback & Ratings** tab lists every visitor submission with a delete
  control for moderation.

**Feedback & Ratings** — any visitor can leave a 1–5 star rating plus a
comment; the site computes and displays a live average rating and a
scrolling wall of testimonials from real submissions.

**Social Analytics** — YouTube subscriber count and GitHub follower count
update automatically via free public APIs (no manual updating needed).
Instagram/Facebook, which don't offer a free API for this without an
expiring-token business review process, use an admin-editable manual
fallback value instead of faking automation.

**An AI trio, all realistic pandas, one of them a real model** — see
[The AI trio](#the-ai-trio-romeo-juliet--bittu) for full detail:
- **Juliet** — a real Google Gemini-backed generative AI with a dedicated
  "Meet Juliet" section: general Q&A, code generation/debugging, and
  portfolio-grounded questions about Manideep (never inventing facts it
  wasn't given).
- **Romeo** — the site's persistent chat-widget guide, routing to Juliet
  when available and falling back to a local knowledge base otherwise.
- **Bittu** — a creative multimodal AI persona with its own dedicated
  section: chat (same Gemini backend, different persona) plus **real** image
  generation via Pollinations.ai (free, no API key). No video-generation
  feature is offered — it was deliberately left out rather than shipped as
  fake or perpetually "coming soon."

**Zero-cost backend** — `data/content.json`, `data/feedback.json`, and
`data/stats.json` are plain JSON files versioned in the repo. All reads/
writes go through small Vercel serverless functions in `/api`, using the
GitHub Contents API as the "database." No database service, no billing
account, ever — see [Data model](#data-model--whats-actually-stored) and
[API reference](#api-reference).

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript | No framework, no build step, no bundler — full control, zero dependency risk, instant static hosting |
| Backend | Vercel serverless functions (`/api/*.js`) | Free on the Hobby plan, no server to manage, no card required |
| Storage | JSON files in `/data`, read/written via the GitHub REST Contents API | Every write is a real, inspectable git commit — a free changelog for the whole site, no database service or bill |
| AI (text) | Google Gemini (`generativelanguage.googleapis.com`), free tier | No credit card required for a Gemini API key; generous free-tier limits |
| AI (image) | Pollinations.ai | Verified genuinely free, no-key image generation API |
| Auth | Single admin password, compared server-side against a Vercel environment variable | Simple, sufficient for a single-owner admin panel; password never lives in client code |
| Hosting | [Vercel](https://vercel.com/) Hobby plan | Free, auto-deploys on every push to `main` |
| Fonts | Space Grotesk, JetBrains Mono, Inter (Google Fonts) | Matches the Figma design reference |
| Markdown rendering | marked.js + DOMPurify (via CDN) | Safe rendering of AI responses (code blocks, tables, lists) without a bundler |

## Every file, and what it does

```
manideep-portfolio-v2/
├── index.html              Public site — all markup for all 14 sections, plus all 6 AI-avatar SVG instances (Romeo×2, Juliet×2, Bittu×2)
├── admin.html               Admin dashboard shell: login gate + sidebar tab list (admin.js renders the actual forms into #adminMain)
├── style.css                 All public + admin styling; :root holds every design token (see Visual identity section)
├── admin.css                 Admin-dashboard-specific layout/styling on top of style.css
├── script.js                  Cursor animation, nav behavior, scroll-reveal, typed-role hero text, initAvatarTilt() (shared 3D cursor-tilt for all three AI avatars)
├── content-schema.js         window.DEFAULT_CONTENT — the fallback/default value for every editable field on the site; also what a fresh data/content.json is seeded from
├── content-loader.js         renderAll() — fetches live content from /api/content (or falls back to content-schema.js) and renders it into the public site's DOM
├── feedback.js                Feedback form submission, testimonials wall rendering, live average-rating calculation
├── admin.js                    Admin dashboard logic: login, FIELD_SCHEMAS-driven generic form builder, per-tab save/load, feedback moderation, overview stats
├── icons-3d.js                 Hand-authored inline-SVG library for every social brand icon and tech/section icon used across the site
├── juliet-knowledge.js        Portfolio knowledge base text, built from content-schema.js — given to Juliet/Romeo as grounding context so they never have to guess personal facts
├── juliet-client.js            Shared client helpers: askJuliet() / askBittu() — thin wrappers that POST to the real backends and normalize responses/errors
├── juliet-section.js           "Meet Juliet" dedicated section: chat UI, message rendering, avatar state (thinking/success/error), calls askJuliet()
├── bittu-section.js            "Meet Bittu" dedicated section: tab switching (Chat/Image), chat UI, image-generation UI (prompt → Pollinations URL → <img>, download/regenerate)
├── romeo.js                     Romeo chat widget (the persistent FAB + popup on every page): routes to Juliet's backend when configured, otherwise a local knowledge-base fallback engine
├── markdown-render.js           Safe Markdown → HTML rendering (marked.js + DOMPurify) plus copy-to-clipboard buttons on rendered code blocks
├── package.json                  Minimal manifest (name, private, Node engine requirement) — no dependencies; Vercel's Node runtime provides fetch natively
├── vercel.json                   Deployment config: cache headers for /assets, noindex header for /admin.html
├── api/
│   ├── content.js               GET live content.json / POST an admin-authenticated section update
│   ├── feedback.js               GET all feedback / POST a public submission / DELETE (admin-only) an entry
│   ├── login.js                  POST { password } → checks against ADMIN_PASSWORD env var
│   ├── pageview.js               GET current page-view count / POST to increment it by one
│   ├── youtube-stats.js         GET a channel's live subscriber + view count via the YouTube Data API v3
│   ├── juliet-chat.js            POST to Juliet — real Gemini call, portfolio-grounded system prompt
│   ├── bittu-chat.js             POST to Bittu — real Gemini call, creative-persona system prompt
│   └── bittu-image.js            POST a prompt → returns a real Pollinations.ai image URL (no key needed)
├── lib/
│   ├── github.js                  Shared helper: getFile/putFile (read/write JSON via the GitHub Contents API) + checkAdmin() password check
│   └── gemini.js                   Shared Gemini client used by both juliet-chat.js and bittu-chat.js: multi-model fallback (handles deprecated model names and transient 503 overload), shared request/response shape
├── data/
│   ├── content.json                The live, admin-edited content — every section's current text/lists/values
│   ├── feedback.json               Every visitor feedback submission (rating, message, name, timestamp)
│   └── stats.json                   Page view counter
├── assets/
│   ├── Peyyala_Manideep_Resume.pdf   Source résumé
│   ├── profile.jpg                    Profile photo used in the Hero/About sections
│   └── certificates/                   Certificate image files referenced by the Achievements section
├── README.md                       You are here
└── SETUP.md                          Step-by-step setup guide (~5 minutes, no billing account needed at any step)
```

## Data model — what's actually stored

`data/content.json` is a single JSON object; each top-level key is one
editable section, matching exactly what `content-schema.js` defines as
`window.DEFAULT_CONTENT`. The admin panel's `FIELD_SCHEMAS` (in `admin.js`)
describes, per key, what kind of form to render for it (text, textarea,
array-of-strings, array-of-objects, etc). Notable keys:

| Key | Shape | Powers |
|---|---|---|
| `hero` | object (headline, subhead, roles list, etc.) | Home section |
| `about` | object | About section |
| `experience` | array of role objects | Experience timeline |
| `skills` | array of category objects, each with a tag list | Skills section |
| `projects` | array of project objects (title, description, tags, links) | Projects grid |
| `certifications` | array of certificate objects | Achievements section |
| `education` | array of objects | Education section |
| `content` | object | Content/Social section |
| `socialStats` | array of platform objects, each with a `manualValue` fallback | Social Analytics section |
| `julietSection` | `{ intro: string, tags: string[] }` | "Meet Juliet" intro paragraph + capability tag row |
| `bittuSection` | `{ intro: string, tags: string[] }` | "Meet Bittu" intro paragraph + capability tag row |
| `contact` | object | Contact section |
| `footer` | object | Footer |

`data/feedback.json` is an array of
`{ id, name, rating (1-5), message, createdAt }` objects, newest first.

`data/stats.json` is `{ count: number }` — total page views.

None of this lives in a database — it's plain JSON, versioned by git, read
and written entirely through the GitHub Contents API by the functions in
`/api` and `/lib/github.js`.

## API reference

All routes live in `/api` and only run once deployed on Vercel (or under
`vercel dev` locally) — see [Local development](#local-development).

| Route | Method | Auth | Request body | Response |
|---|---|---|---|---|
| `/api/content` | GET | none | — | Full `content.json` object |
| `/api/content` | POST | Admin (`X-Admin-Password` header) | `{ key, value }` | `{ ok: true }` |
| `/api/feedback` | GET | none | — | Array of feedback objects |
| `/api/feedback` | POST | none (public) | `{ name?, rating (1-5), message }` | `{ ok: true }` |
| `/api/feedback` | DELETE | Admin | `{ id }` | `{ ok: true }` |
| `/api/login` | POST | — | `{ password }` | `{ ok: true }` or `401 { ok: false, error }` |
| `/api/pageview` | GET | none | — | `{ count }` |
| `/api/pageview` | POST | none | — | `{ count }` (incremented by 1) |
| `/api/youtube-stats` | GET | none | Query: `?handle=@yourhandle` | `{ subscriberCount, viewCount }` (needs `YOUTUBE_API_KEY`; `503` if unset) |
| `/api/juliet-chat` | GET | none | — | `{ configured: boolean }` |
| `/api/juliet-chat` | POST | none | `{ messages: [{role, text}], context }` | `{ reply }` or `{ error, code }` |
| `/api/bittu-chat` | GET | none | — | `{ configured: boolean }` |
| `/api/bittu-chat` | POST | none | `{ messages: [{role, text}] }` | `{ reply }` or `{ error, code }` |
| `/api/bittu-image` | GET | none | — | `{ configured: true, provider: "pollinations" }` |
| `/api/bittu-image` | POST | none | `{ prompt }` | `{ imageUrl, provider }` or `{ error, code }` |

**Admin auth mechanism:** the admin routes check an `X-Admin-Password`
request header (or the request body for `/api/login`) against the
`ADMIN_PASSWORD` Vercel environment variable, server-side only — the value
is never embedded in any shipped JS.

**Chat error codes** (`juliet-chat` / `bittu-chat`): `NOT_CONFIGURED` (no
`GEMINI_API_KEY` set), `BAD_REQUEST`, `RATE_LIMITED` (HTTP 429 from Gemini),
`MODEL_OVERLOADED` (Gemini's free tier is at capacity, HTTP 503),
`UPSTREAM_ERROR` (any other non-OK response), `SERVER_ERROR`.

## Visual identity & color system

The palette was deliberately built away from the generic "blue → purple →
pink AI site" look toward something warmer, bolder, and more distinctive: a
deep warm-black base with a cheery **coral → red → cherry → rose-red**
gradient family — energetic without tipping into neon.

**Where it lives:** entirely in the `:root` custom properties at the top of
`style.css`. The variable *names* (`--cyan`, `--blue`, `--purple`, `--pink`)
are deliberately **kept** even though their *values* no longer resemble
those colors — hundreds of class names throughout `content-schema.js`,
`content-loader.js`, `icons-3d.js`, and `data/content.json` reference color
keys like `"cyan"`/`"purple"`/`"pink"` to pick a badge/icon/tag color, and
renaming the token names would mean touching all of that for zero visual
benefit. A comment in `:root` explains this mapping for future maintainers.

**Token families:**
- Base: `--bg` (`#100b0a`), `--bg-alt`, `--card`, `--card-border`, `--text`
  and its dim variants — warm off-black/off-white instead of cool grey.
- Accent (semantic meaning, not literal color): `--cyan` = warm coral-orange
  `#ff8a5c` (primary), `--blue` = cheery coral-red `#ff6b6b` (secondary),
  `--purple` = vivid cherry red `#f0405a` (tertiary), `--pink` = bold
  rose-red `#d81159` (quaternary).
- `--metallic` (warm champagne-to-rust gradient, for premium highlight
  moments), `--glow-amber` (glow/shadow color, now a coral-red glow).
- Character accents: `--romeo-grad`/`--romeo-accent` (black-and-white),
  `--juliet-grad`/`--juliet-accent` (pink-to-cherry-red), `--bittu-grad`/
  `--bittu-accent` (peach-to-coral).

Because every gradient, button, tag, and icon already reads its color from
these tokens, changing the token *values* alone restyled the entire site
consistently — no per-component rewrites needed.

## The AI trio: Romeo, Juliet & Bittu

| | Romeo | Juliet | Bittu |
|---|---|---|---|
| Role | Personal guide / chat interface | Generative AI (the real model) | Creative multimodal AI |
| Species | Panda | Panda | Panda |
| Palette | Classic black & white (`--romeo-grad`) | Pink-to-cherry-red (`--juliet-grad`) | Peach-to-coral (`--bittu-grad`) |
| Expression | Happy, smiling, breathing-smile animation | Happy, smiling, gold sparkle accents | Happy, smiling, paint-dot accents |
| Where | Persistent side popup, every page | Dedicated "Meet Juliet" section | Dedicated "Meet Bittu" section (Chat/Image tabs) |
| Backend | Routes to Juliet, falls back to local knowledge | `api/juliet-chat.js` → Gemini | `api/bittu-chat.js` → Gemini, `api/bittu-image.js` → Pollinations |

**Design:** all three characters are built as realistic pandas using the
same construction technique — layered inline SVG, radial-gradient "glossy
3D" shading on face and ears, a glossy highlight ellipse, soft blush,
rounded panda ears, and the characteristic dark eye-patches — each with a
genuinely happy, smiling expression (`smileBreathe` gives the mouth a
gentle, alive breathing motion). They're differentiated purely by color and
small accent details: Romeo is classic black-and-white, Juliet has a warm
pink-to-cherry-red tint plus gold sparkle accents, and Bittu has a
peach-to-coral tint plus a small three-dot "paint palette" accent — one
consistent panda identity, three distinct personalities.

**Technical approach — why SVG + CSS, not WebGL/Three.js/GSAP:** the
project has no framework, no build step, and no 3D library. All three
characters use hand-authored inline SVG + CSS 3D transforms
(`perspective` + `rotateX/rotateY`) rather than a new rendering library —
zero added dependencies, zero mobile performance/compatibility risk, and
full reuse of the tilt-hover mechanism already used on project/skill cards
throughout the site.

**Animation** (all in `style.css`, respecting `prefers-reduced-motion`):
idle float/bob, per-character ear motion, blinking, the shared
`smileBreathe` mouth animation, a shared blush opacity pulse (`cheekPulse`),
and Juliet's sparkles / Bittu's paint dots twinkling. A reusable
character-state framework (`.char-success` / `.char-error`, generic classes
any avatar wrapper can receive) gives a brief warm glow-pulse on a
successful reply and a calm head-tilt on an error, applied consistently
across all three avatars.

**Hover/interaction:** hovering (on devices with a real pointer) tilts each
avatar in 3D toward the cursor position via `initAvatarTilt()` in
`script.js`, applied to `.romeo-avatar, .juliet-avatar, .bittu-avatar`,
composing with each avatar's own idle "bob" animation. Gated behind the same
`tiltCapable` check as the rest of the site, so touch/mobile devices simply
keep the idle animations with no broken hover state.

**AI architecture:** `Frontend → /api/*.js (Vercel serverless) → Gemini`.
`lib/gemini.js` is the single shared Gemini client both `api/juliet-chat.js`
and `api/bittu-chat.js` call with different system prompts — swapping
models or providers means editing one file, not two. It tries a list of
`MODEL_CANDIDATES` in order and remembers whichever model responds
successfully for the life of that warm serverless instance, retrying the
next candidate on either a `404` (deprecated/renamed model) or a `503`
(that specific model temporarily overloaded) — so a future Google model
rename or a transient capacity spike doesn't silently break the chat.
`GEMINI_API_KEY` lives only in Vercel's environment variables, never in
client code. Bittu's image tool (`api/bittu-image.js`) uses Pollinations.ai,
verified working by a direct test call before integration — no key needed,
so it works even before `GEMINI_API_KEY` is set. There is no
video-generation feature — deliberately left out rather than shipped as a
fake or perpetually "unavailable" capability.

**Dependencies added:** none for the visuals (hand-authored SVG + CSS).
Backend: none — `lib/gemini.js` and the Pollinations call both use the
platform's native `fetch`, no SDK installed.

## Admin panel — full walkthrough

1. Visit `/admin.html` and sign in with the admin password (the
   `ADMIN_PASSWORD` Vercel environment variable — never stored in code).
2. Pick a section from the sidebar: Overview, Hero, About, Experience,
   Skills, Projects, Achievements, Research, Education, Content/Social,
   Social Analytics, Meet Juliet Section, Meet Bittu Section, Contact,
   Footer, Feedback & Ratings.
3. Every field on the public site has a matching input, generated generically
   from `FIELD_SCHEMAS` in `admin.js` — including add/remove controls for
   list items (skills, projects, certificates, etc.).
4. Hit **Save** on that tab. The change POSTs to `/api/content`, which
   writes straight to `data/content.json` via the GitHub API (server-side
   only — the write token never reaches the browser) and appears on the
   live site within seconds, no rebuild or redeploy.
5. **Feedback & Ratings** shows every visitor submission with a delete
   button for moderation (calls `DELETE /api/feedback`).
6. **Overview** shows page views, feedback count, and average rating at a
   glance.

## Setup from scratch (zero cost, no card)

Full step-by-step instructions live in **[SETUP.md](SETUP.md)** — GitHub
token creation, choosing an admin password, Vercel environment variables,
optional live YouTube stats, and activating Juliet/Bittu's real AI via a
free Gemini API key. None of it, at any step, asks for billing or card
details. Total time: about 5 minutes for the core admin panel; a couple more
for AI activation.

## Local development

Since `/api` routes are Vercel serverless functions, they only run once
deployed (or under `vercel dev` locally). Opening `index.html` directly (or
via a plain static file server) still renders the full site from
`content-schema.js`'s defaults — the admin panel will just show a
"couldn't reach the server" message until deployed, which is expected, not
a bug.

## Security notes

- `GITHUB_TOKEN`, `ADMIN_PASSWORD`, `YOUTUBE_API_KEY`, and `GEMINI_API_KEY`
  live only in Vercel's environment variables — never in this repo's code,
  never sent to the browser. Every call to GitHub, YouTube, or Gemini
  happens server-side inside `api/*.js`.
- The GitHub token used by `lib/github.js` should be a **fine-grained**
  Personal Access Token scoped to only the one repository it needs to write
  to, with only the `Contents: Read and write` permission — not a classic
  all-access token.
- Admin-only routes (`POST /api/content`, `DELETE /api/feedback`) check an
  `X-Admin-Password` header server-side against `ADMIN_PASSWORD` before
  doing anything — no admin action succeeds without the correct password.
- Public write endpoints (`POST /api/feedback`) validate and clamp their
  inputs (rating range, message/name length limits) before ever writing to
  the repo.

## Content included

- Full résumé content (experience, education, skills) transcribed into
  `content-schema.js`/`data/content.json`.
- Certificates: IEEE publication, CodeChef, be10x, LinkedIn Writing Email,
  Anthropic AI Fluency, Databricks Data Engineer Associate, Anthropic Claude
  Code in Action, Anthropic Claude 101 — listed under Achievements &
  Certifications, source files in `assets/certificates/`.
- Real profile photo (`assets/profile.jpg`), used across the Hero and About
  sections.

## Known limitations

- No live web/internet access for Juliet or Bittu — both say so honestly if
  asked something that needs current information, rather than guessing.
- Instagram/Facebook follower counts are manually updated via the admin
  panel (no viable free, non-expiring API exists for this).
- Google's Gemini free tier has real (if generous) rate limits; at peak
  demand a chat request may show a "getting a lot of requests" or "high
  demand right now" message instead of a reply — this is handled gracefully,
  not silently.
- This repository's backend, as shipped, writes content/feedback/stats to
  the original `manideep-s-portfolio` repo (see
  [Note on this repository vs. the live deployment](#note-on-this-repository-vs-the-live-deployment)).

## Contact

- Email: manideepyadav380@gmail.com
- LinkedIn: [linkedin.com/in/peyyalamanideep](https://www.linkedin.com/in/peyyalamanideep/)
- GitHub: [github.com/manideeppeyyala](https://github.com/manideeppeyyala)
- YouTube: [@vlogingwithmani2003](https://www.youtube.com/@vlogingwithmani2003)
- Instagram: [@vloggingwithmani](https://www.instagram.com/vloggingwithmani/)

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

- **Signature visual identity** — a deliberately non-generic, cheery warm-red gradient (coral → red → cherry → rose-red) on deep warm neutrals, replacing the typical blue→purple→pink "AI site" look. See [Visual Identity & Color System](#visual-identity--color-system).
- **Design** — animated cursor, typed-role hero, orbiting skill nodes, scroll-triggered reveals, magnetic buttons, cursor-tilt 3D cards; fully responsive across mobile/tablet/desktop
- **Sections** — Home, About, Experience, Skills, Projects, Achievements & Certifications, Research, Content/Social, Analytics, Education, Meet Juliet, Meet Bittu, Feedback & Ratings, Contact
- **Admin panel** (`/admin.html`) — password-protected dashboard to edit every section of the live site, including the Meet Juliet and Meet Bittu intro text/tags. Every tab has its own Save button; changes go live in seconds, no redeploy.
- **Feedback & Ratings** — visitors leave a star rating + comment; the site shows a live average rating and a scrolling wall of testimonials
- **3D icon system across every section** — hand-built SVG glyphs (social brands + tech/section icons) in floating, rotating badge cards, all cursor-tilt interactive
- **Social Analytics section** — YouTube subscribers and GitHub followers update automatically via free public APIs; Instagram/Facebook are admin-editable with a live-shown manual fallback value
- **An AI trio, all realistic happy pandas** — **Juliet** (generative AI, cherry-red tint), **Romeo** (her chat interface and the site's guide, classic black & white), and **Bittu** (creative multimodal AI: chat + real image generation, warm coral-orange tint). Full writeup: [The AI Trio: Romeo, Juliet & Bittu](#the-ai-trio-romeo-juliet--bittu).
- **Overview dashboard** — page view count, feedback count, and average rating at a glance
- **Zero-cost backend** — content, feedback, and stats are plain JSON files committed to this repo. Reads/writes go through small Vercel serverless functions (`/api`) using the GitHub Contents API — no database, no card ever required, and every content change is a versioned git commit

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
├── juliet-client.js       # Shared client: askJuliet() / askBittu() — call the real backends
├── juliet-section.js      # "Meet Juliet" dedicated section UI logic
├── bittu-section.js       # "Meet Bittu" dedicated section UI logic (chat/image tabs)
├── romeo.js               # Romeo chat widget (Juliet + local knowledge fallback)
├── markdown-render.js     # Safe Markdown rendering + copy-to-clipboard for code
├── api/
│   ├── content.js         # GET live content / POST admin-only section updates
│   ├── feedback.js        # GET all feedback / POST public submission / DELETE admin-only
│   ├── login.js            # POST password check
│   ├── pageview.js        # GET/POST page view counter
│   ├── youtube-stats.js   # GET live YouTube subscriber count
│   ├── juliet-chat.js     # POST to Juliet (Gemini) — real AI backend, portfolio-grounded
│   ├── bittu-chat.js      # POST to Bittu (Gemini) — real AI backend, creative persona
│   └── bittu-image.js     # POST prompt -> Pollinations.ai image URL (free, no key)
├── lib/
│   ├── github.js          # Shared helper: read/write JSON files via the GitHub API
│   └── gemini.js          # Shared Gemini client used by both juliet-chat.js and bittu-chat.js
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

## Visual Identity & Color System

The site's palette was deliberately redesigned away from the generic
"blue → purple → pink AI site" look toward something warmer, bolder, and more
distinctive: deep warm-black neutrals with a cheery coral → red → cherry →
rose-red gradient family — energetic without tipping into neon.

**Where it lives:** entirely in the `:root` custom properties at the top of
`style.css`. The variable *names* (`--cyan`, `--blue`, `--purple`, `--pink`)
were deliberately **kept** even though their *values* no longer resemble
those colors — hundreds of class names throughout `content-schema.js`,
`content-loader.js`, `icons-3d.js`, and `data/content.json` reference color
keys like `"cyan"`/`"purple"`/`"pink"` to pick a badge/icon/tag color, and
renaming the token names would have meant touching all of that (much higher
risk, no visual benefit). A comment in `:root` explains this mapping for
future maintainers.

**Token families:**
- Base: `--bg` (`#100b0a`), `--bg-alt`, `--card`, `--card-border`, `--text`
  and its dim variants — all shifted to warm off-black/off-white instead of
  cool grey.
- Accent (semantic meaning, not literal color anymore): `--cyan` = warm
  coral-orange `#ff8a5c` (primary), `--blue` = cheery coral-red `#ff6b6b`
  (secondary), `--purple` = vivid cherry red `#f0405a` (tertiary), `--pink`
  = bold rose-red `#d81159` (quaternary).
- New: `--metallic` (warm champagne-to-rust gradient, for premium highlight
  moments), `--glow-amber` (glow/shadow color, now a coral-red glow).
- Character accents: `--romeo-grad`/`--romeo-accent` (black-and-white),
  `--juliet-grad`/`--juliet-accent` (pink-to-cherry-red), `--bittu-grad`/
  `--bittu-accent` (peach-to-coral) — same warm universe, distinct per
  character.

Because every gradient, button, tag, and icon in the site already read its
color from these tokens, changing the token *values* alone restyled the
entire site consistently — no per-component rewrites needed.

## The AI Trio: Romeo, Juliet & Bittu

Three AI personas, one shared warm visual language, three distinct roles:

| | Romeo | Juliet | Bittu |
|---|---|---|---|
| Role | Personal guide / chat interface | Generative AI (the real model) | Creative multimodal AI |
| Species | Panda | Panda | Panda |
| Palette | Classic black & white (`--romeo-grad`) | Pink-to-cherry-red (`--juliet-grad`) | Peach-to-coral (`--bittu-grad`) |
| Expression | Happy, smiling, breathing-smile animation | Happy, smiling, gold sparkle accents | Happy, smiling, paint-dot accents |
| Where | Persistent side popup, every page | Dedicated "Meet Juliet" section | Dedicated "Meet Bittu" section (Chat/Image tabs) |
| Backend | Routes to Juliet, falls back to local knowledge | `api/juliet-chat.js` → Gemini | `api/bittu-chat.js` → Gemini, `api/bittu-image.js` → Pollinations |

**Design:** all three characters are built as realistic pandas — the same
construction technique (layered inline SVG, radial-gradient "glossy 3D"
shading on face and ears, a glossy highlight ellipse, soft blush, rounded
panda ears and the characteristic dark eye-patches) with a genuinely happy,
smiling expression on each (`smileBreathe` animation gives the mouth a
gentle, alive breathing motion rather than a static line). They're
differentiated purely by color and small accent details: Romeo is classic
black-and-white, Juliet has a warm pink-to-cherry-red tint plus gold sparkle
accents, and Bittu has a peach-to-coral tint plus a small three-dot "paint
palette" accent — one consistent panda identity, three distinct personalities.

**Technical approach — why SVG + CSS, not WebGL/Three.js/GSAP:** the project
has no framework, no build step, and no 3D library. The task's own
instructions say to use technologies already present and avoid unnecessary
dependencies — so all three characters use the same hand-authored inline SVG
+ CSS 3D transform technique (`perspective` + `rotateX/rotateY`), not a new
rendering library. This keeps zero added dependencies, zero mobile
performance/compatibility risk, and full reuse of infrastructure already
built and tested (the same tilt-hover mechanism used on project/skill cards
throughout the site).

**Animation (all in `style.css`, respecting `prefers-reduced-motion`):**
idle float/bob, ear motion (wiggle for Romeo, pulse for Juliet, a quick
"perk" twitch for Bittu — three distinct motions), blinking, a subtle
breathing scale on the smile (`smileBreathe`, shared by all three), a blush
opacity pulse (`cheekPulse`, shared), Juliet's sparkles and Bittu's paint
dots twinkle. A **reusable character-state framework** (`.char-success` /
`.char-error`, generic classes any avatar wrapper can receive) gives a brief
warm glow-pulse on a successful reply and a calm head-tilt on an error —
applied consistently to Romeo, Juliet, and Bittu's avatars whenever their
respective chat handlers resolve or fail. A `.{character}-thinking` class
speeds up the idle animation while a reply is in flight.

**Hover/interaction:** rather than a scale-up, hovering (or the cursor
approaching, on devices with a real pointer) tilts each avatar in 3D toward
the cursor position — `initAvatarTilt()` in `script.js`, applied to
`.romeo-avatar, .juliet-avatar, .bittu-avatar`, composing with each avatar's
own idle "bob" animation (JS tilt targets the outer wrapper, the CSS bob
animates the inner SVG — different elements, no fighting over the
`transform` property). Gated behind the same `tiltCapable` check as the rest
of the site, so touch/mobile devices simply keep the idle animations with no
broken hover state.

**AI architecture:** `Frontend → /api/*.js (Vercel serverless) → Provider`.
`lib/gemini.js` is the single shared Gemini client both `api/juliet-chat.js`
and `api/bittu-chat.js` call with different system prompts (provider
abstraction — swapping models/providers means editing one file, not two).
`GEMINI_API_KEY` lives only in Vercel's environment variables. Bittu's image
tool (`api/bittu-image.js`) uses Pollinations.ai, verified working by a
direct test call before integration — no key needed, so it works even before
`GEMINI_API_KEY` is set. There is no video-generation feature — it was
deliberately left out rather than shipped as a fake or perpetually
"unavailable" capability; Bittu's section only offers what's genuinely live
today (chat + image).

**Dependencies added:** none for the visuals (hand-authored SVG + CSS).
Backend: none — `lib/gemini.js` and the Pollinations call both use the
platform's native `fetch`, no SDK installed.

**Verification performed:** this project has no `package.json` build/lint
scripts (plain static site, no bundler), so "run the build" doesn't apply
literally — what was actually run:
- `node --check` on every `.js` file (syntax validation) — all pass.
- Repo-wide `grep` audit for "Bit2"/"Bit 2"/"Bit Two" (must never appear) —
  zero matches. Separately audited for orphaned CSS animation references
  after each rename/redesign pass (e.g. a stale `.juliet-msg` keyframe
  reference left over from an earlier rename was found and fixed).
- Manual brace-balance check on `style.css`.
- Live browser verification (local static server + the deployed Vercel
  site): all avatar instances render with the correct animations applied
  (checked via `getComputedStyle(...).animationName`), tab switching in the
  Bittu section, and the full image-generation pipeline (mocked backend →
  real `<img>` load → download/regenerate buttons) were all exercised
  directly, not just visually inspected. Pollinations.ai was verified with a
  real direct API call (returned a genuine 512×512 image) before being wired
  into the UI.
- Mobile viewport (375×812) checked for layout/overflow on both the
  redesigned avatars and the new Bittu tabs — no issues.
- Once a `GEMINI_API_KEY` was added, the live deployment was tested with
  real prompts: general Q&A, portfolio-specific questions, code generation,
  debugging, multi-turn follow-up context, and Markdown/table output —
  each checked against the actual model response, not assumed.

**Maintenance notes:** each character's gradient lives in one `<defs>` block
per character (first SVG instance in `index.html`), referenced by ID from
that character's other instances — update the `<defs>` block, not each
instance, to keep them in sync. To swap the Gemini model list, edit
`MODEL_CANDIDATES` in `lib/gemini.js` (already tries several current model
names in order and remembers whichever works, so a future Google rename
shouldn't silently break things again). The Meet Juliet and Meet Bittu
sections' intro text and capability tags are admin-editable — see
SETUP.md section 8.

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

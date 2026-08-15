// Renders every dynamic section of the public site from window.DEFAULT_CONTENT,
// then fetches the live content doc via /api/content (backed by GitHub), merges
// it in, and re-renders — so admin edits show up without touching HTML.

const COLOR_CLASS = { cyan: "cat-cyan", purple: "cat-purple", pink: "cat-pink" };
const ICON_CLASS = { cyan: "icon-cyan", purple: "icon-purple", pink: "icon-pink" };
const BADGE_CLASS = { cyan: "badge-cyan", purple: "badge-purple", pink: "badge-pink", outline: "badge-outline" };
const DOT_CLASS = { cyan: "dot-cyan", purple: "dot-purple", pink: "dot-pink" };

function tagRow(tags) {
  return tags.map(t => `<span class="tag">${t}</span>`).join("");
}

function renderHero(d) {
  const eyebrow = document.getElementById("heroEyebrowText");
  if (eyebrow) eyebrow.textContent = d.eyebrow;

  const title = document.getElementById("heroTitle");
  if (title) title.innerHTML = `${d.titleLine1}<br><span class="gradient-text">${d.titleGradient}</span><br>${d.titleLine3}`;

  const sub = document.getElementById("heroSub");
  if (sub) sub.innerHTML = `at the Intersection of <span class="hl-cyan">${d.subPython}</span>, <span class="hl-purple">${d.subMiddle}</span> &amp; <span class="hl-pink">${d.subData}</span>.`;

  const name = document.getElementById("heroName");
  if (name) name.textContent = d.name;

  const desc = document.getElementById("heroDesc");
  if (desc) desc.textContent = d.desc;

  const nodes = document.querySelectorAll("#orbitNodes .orbit-node span.node-label");
  d.orbitNodes.forEach((label, i) => { if (nodes[i]) nodes[i].textContent = label; });

  if (window.DEFAULT_CONTENT.hero.roles) {
    const arr = window.DEFAULT_CONTENT.hero.roles;
    if (arr !== d.roles) { arr.length = 0; arr.push(...d.roles); }
  }
}

function renderAbout(d) {
  const bio = document.getElementById("aboutBio");
  if (bio) bio.innerHTML = d.bio.map(p => `<p>${p}</p>`).join("");

  const exploring = document.getElementById("aboutExploring");
  if (exploring) exploring.innerHTML = tagRow(d.exploring);

  const features = document.getElementById("aboutFeatures");
  if (features) {
    features.innerHTML = d.features.map(f => `
      <div class="feature-card reveal visible">
        <div class="feature-icon ${ICON_CLASS[f.color] || "icon-cyan"}">${f.icon}</div>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </div>`).join("");
  }
}

function icon3d(iconKey, color, size) {
  const svg = (window.SOCIAL_ICONS && window.SOCIAL_ICONS[iconKey]) || "";
  const sizeClass = size === "sm" ? " icon-3d-sm" : "";
  return `<div class="icon-3d icon-3d-${color || "cyan"}${sizeClass}"><span class="icon-3d-face">${svg}</span></div>`;
}

function renderExperience(list) {
  const el = document.getElementById("experienceList");
  if (!el) return;
  el.innerHTML = list.map(e => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="exp-card reveal visible">
        <div class="exp-head">
          <div class="exp-head-title">
            ${icon3d(e.icon || "briefcase", "cyan", "sm")}
            <div>
              <h3>${e.company}</h3>
              <p class="exp-role">${e.role}</p>
            </div>
          </div>
          <div class="exp-meta">
            <span class="badge badge-cyan">${e.dateRange}</span>
            <span class="exp-loc">${e.location} · ${e.type}</span>
          </div>
        </div>
        <p class="exp-desc">${e.desc}</p>
        <p class="exp-sub">Responsibilities</p>
        <ul class="exp-list">${e.responsibilities.map(r => `<li>${r}</li>`).join("")}</ul>
        <p class="exp-sub">Environment</p>
        <div class="tag-row">${tagRow(e.environment)}</div>
      </div>
    </div>`).join("");
}

function renderSkills(list) {
  const el = document.getElementById("skillsGrid");
  if (!el) return;
  el.innerHTML = list.map(s => `
    <div class="skill-card reveal visible">
      ${icon3d(s.icon || "code", s.color, "sm")}
      <h3 class="skill-cat ${COLOR_CLASS[s.color] || "cat-cyan"}">${s.category}</h3>
      <div class="tag-row">${tagRow(s.tags)}</div>
    </div>`).join("");
}

function renderProjects(list) {
  const el = document.getElementById("projectsGrid");
  if (!el) return;
  el.innerHTML = list.map(p => `
    <div class="project-card reveal visible">
      <div class="project-top">
        ${icon3d(p.icon || "rocket", "purple", "sm")}
        <div class="project-badges">${p.badges.map(b => `<span class="badge ${BADGE_CLASS[b.type] || "badge-cyan"}">${b.text}</span>`).join("")}</div>
      </div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tag-row">${tagRow(p.tags)}</div>
      <a href="${p.linkHref}" class="link-arrow">${p.linkText}</a>
    </div>`).join("");
}

function renderCertifications(list) {
  const el = document.getElementById("certGrid");
  if (!el) return;
  el.innerHTML = list.map(c => `
    <div class="cert-card reveal visible">
      ${icon3d(c.icon || "certificate", c.color, "sm")}
      <span class="badge ${BADGE_CLASS[c.badgeType] || "badge-cyan"}">${c.badgeText}</span>
      <h3>${c.title}</h3>
      <p class="cert-org">${c.org}</p>
      ${c.desc ? `<p class="cert-desc">${c.desc}</p>` : ""}
      ${c.skillsCovered && c.skillsCovered.length ? `<p class="cert-desc"><strong>Skills covered:</strong></p><ul class="cert-skill-list">${c.skillsCovered.map(s => `<li>${s}</li>`).join("")}</ul>` : ""}
      ${c.linkHref ? `<a href="${c.linkHref}" target="_blank" class="link-arrow">View Certificate →</a>` : ""}
    </div>`).join("");
}

function renderResearch(r) {
  const el = document.getElementById("researchCard");
  if (!el) return;
  el.innerHTML = `
    ${icon3d("research", "purple", "sm")}
    <span class="badge badge-outline">${r.badge}</span>
    <h3>${r.title}</h3>
    <p class="research-authors">${r.authors}</p>
    <p class="research-desc">${r.desc}</p>
    <p class="exp-sub">Key Details</p>
    <ul class="exp-list">${r.keyDetails.map(k => `<li>${k}</li>`).join("")}</ul>
    <div class="tag-row">${tagRow(r.tags)}</div>
    ${r.linkHref ? `<a href="${r.linkHref}" target="_blank" class="link-arrow">View Certificate of Presentation →</a>` : ""}
  `;
}

function renderEducation(ed) {
  const el = document.getElementById("eduCard");
  if (!el) return;
  el.innerHTML = `
    <div class="exp-head">
      <div class="exp-head-title">
        ${icon3d(ed.icon || "graduation", "cyan", "sm")}
        <div>
          <h3>${ed.degree}</h3>
          <p class="exp-role">${ed.school}</p>
        </div>
      </div>
      <div class="exp-meta">
        <span class="badge badge-cyan">${ed.dateRange}</span>
        <span class="exp-loc">${ed.extra}</span>
      </div>
    </div>
    <p class="exp-sub">Academic Projects</p>
    <ul class="exp-list">${ed.projects.map(p => `<li>${p}</li>`).join("")}</ul>
  `;
}

function renderContentSection(c) {
  const bio = document.getElementById("contentBio");
  if (bio) bio.innerHTML = c.bioLine;
  const tags = document.getElementById("contentTags");
  if (tags) tags.innerHTML = tagRow(c.tags);
  const grid = document.getElementById("socialGrid");
  if (grid) {
    grid.innerHTML = c.socials.map(s => `
      <a href="${s.url}" target="_blank" class="social-card">
        ${icon3d(s.icon, s.color)}
        <h3>${s.platform}</h3>
        <p class="social-handle">${s.handle}</p>
        <p class="social-desc">${s.desc}</p>
      </a>`).join("");
  }
}

function renderSocialStats(list) {
  const grid = document.getElementById("analyticsGrid");
  if (!grid || !list) return;

  // The admin-set manualValue always shows first (so the section never looks
  // empty/broken) — a successful live fetch (GitHub, YouTube) then upgrades
  // it in place. If live fetch fails or isn't configured, the manual value
  // just stays put as an honest, always-visible fallback.
  grid.innerHTML = list.map((s, i) => `
    <a href="${s.url}" target="_blank" class="analytics-card">
      ${icon3d(s.icon, s.color)}
      <h3>${s.platform}</h3>
      <p class="analytics-stat" id="stat-${i}">${s.manualValue ? s.manualValue : (s.statSource === "manual" ? "—" : "…")}</p>
      <p class="analytics-label">${s.label}</p>
      <span class="analytics-source" id="source-${i}">${s.statSource === "manual" ? "Set from admin panel" : "Live"}</span>
    </a>`).join("");

  list.forEach((s, i) => {
    if (s.statSource === "github") fetchGithubStat(s.handle, i, s.manualValue);
    if (s.statSource === "youtube") fetchYoutubeStat(s.handle, i, s.manualValue);
  });

  window.initRevealTargets && window.initRevealTargets();
  window.initTiltCards && window.initTiltCards();
}

function formatCount(n) {
  if (n == null) return "—";
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function updateStat(index, value, sourceLabel) {
  const el = document.getElementById(`stat-${index}`);
  const src = document.getElementById(`source-${index}`);
  if (el) {
    el.textContent = value;
    el.classList.remove("stat-pulse");
    void el.offsetWidth; // restart animation
    el.classList.add("stat-pulse");
  }
  if (src && sourceLabel) src.textContent = sourceLabel;
}

async function fetchGithubStat(username, index, manualFallback) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("GitHub API request failed");
    const data = await res.json();
    updateStat(index, formatCount(data.followers), "Live");
  } catch (err) {
    console.warn("Could not load GitHub stats:", err);
    updateStat(index, manualFallback || "—", manualFallback ? "Manual (live unavailable)" : "Live — unavailable");
  }
}

async function fetchYoutubeStat(handle, index, manualFallback) {
  try {
    const res = await fetch(`/api/youtube-stats?handle=${encodeURIComponent(handle)}`);
    if (!res.ok) throw new Error("YouTube stats request failed");
    const data = await res.json();
    updateStat(index, formatCount(data.subscriberCount), "Live");
  } catch (err) {
    console.warn("Could not load YouTube stats (needs YOUTUBE_API_KEY set up — see SETUP.md):", err);
    updateStat(index, manualFallback || "—", manualFallback ? "Manual (live unavailable)" : "Live — unavailable");
  }
}

function renderContact(c) {
  const info = document.getElementById("contactInfoCard");
  if (info) {
    info.innerHTML = `
      <p class="contact-label">Email</p>
      <a href="mailto:${c.email}">${c.email}</a>
      <p class="contact-label">Phone</p>
      <a href="tel:${c.phoneHref}">${c.phone}</a>
      <p class="contact-label">Location</p>
      <p>${c.location}</p>
    `;
  }
  const links = document.getElementById("contactSocialLinks");
  if (links) links.innerHTML = c.socialLinks.map(l => `<a href="${l.url}" target="_blank">${l.label}</a>`).join("");

  const note = document.getElementById("formNote");
  if (note) note.textContent = `Opens your email client with this message pre-filled, addressed to ${c.email}.`;
}

function renderFooter(f) {
  const tagline = document.getElementById("footerTagline");
  if (tagline) tagline.textContent = f.tagline;
}

function renderJulietSection(j) {
  if (!j) return;
  const intro = document.getElementById("julietIntro");
  if (intro) intro.textContent = j.intro;
  const tags = document.getElementById("julietTags");
  if (tags) tags.innerHTML = tagRow(j.tags);
}

function renderBittuSection(b) {
  if (!b) return;
  const intro = document.getElementById("bittuIntro");
  if (intro) intro.textContent = b.intro;
  const tags = document.getElementById("bittuTags");
  if (tags) tags.innerHTML = tagRow(b.tags);
}

function renderAll(content) {
  renderHero(content.hero);
  renderAbout(content.about);
  renderExperience(content.experience);
  renderSkills(content.skills);
  renderProjects(content.projects);
  renderCertifications(content.certifications);
  renderResearch(content.research);
  renderEducation(content.education);
  renderContentSection(content.content);
  renderSocialStats(content.socialStats);
  renderJulietSection(content.julietSection);
  renderBittuSection(content.bittuSection);
  renderContact(content.contact);
  renderFooter(content.footer);
  window.dispatchEvent(new CustomEvent("content-rendered"));
}

// Render the static defaults immediately so the page never waits on network.
document.addEventListener("DOMContentLoaded", () => {
  renderAll(window.DEFAULT_CONTENT);
  loadLiveContent();
  countPageView();
});

async function loadLiveContent() {
  try {
    const res = await fetch("/api/content");
    if (!res.ok) return; // e.g. 404 locally without `vercel dev` — static defaults already shown
    const data = await res.json();
    if (data && Object.keys(data).length) {
      Object.keys(data).forEach(key => { window.DEFAULT_CONTENT[key] = data[key]; });
      renderAll(window.DEFAULT_CONTENT);
    }
  } catch (err) {
    console.warn("Could not load live content, showing defaults:", err);
  }
}

function countPageView() {
  // Once per browser session, not every load — keeps GitHub commit history sane.
  if (sessionStorage.getItem("pv-counted")) return;
  sessionStorage.setItem("pv-counted", "1");
  fetch("/api/pageview", { method: "POST" }).catch(() => {});
}

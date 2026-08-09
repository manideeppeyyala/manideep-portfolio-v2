// Admin dashboard: Firebase Auth login gate, then a schema-driven editor for
// every section of window.DEFAULT_CONTENT, plus feedback moderation and stats.

/* ---------- Field schemas (drive the generic form builder) ---------- */

const FEATURE_ITEM_FIELDS = [
  { key: "icon", label: "Emoji Icon", type: "text" },
  { key: "color", label: "Color (cyan / purple / pink)", type: "text" },
  { key: "title", label: "Title", type: "text" },
  { key: "desc", label: "Description", type: "textarea" }
];

const FIELD_SCHEMAS = {
  hero: { type: "object", fields: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "titleLine1", label: "Title — Line 1", type: "text" },
    { key: "titleGradient", label: "Title — Line 2 (gradient)", type: "text" },
    { key: "titleLine3", label: "Title — Line 3", type: "text" },
    { key: "subPython", label: "Subtitle word 1 (cyan)", type: "text" },
    { key: "subMiddle", label: "Subtitle word 2 (purple)", type: "text" },
    { key: "subData", label: "Subtitle word 3 (pink)", type: "text" },
    { key: "name", label: "Display Name", type: "text" },
    { key: "roles", label: "Typed Roles (rotating text)", type: "array-string" },
    { key: "desc", label: "Hero Description", type: "textarea" },
    { key: "orbitNodes", label: "Orbit Node Labels (6 slots, fixed positions)", type: "array-string" }
  ]},
  about: { type: "object", fields: [
    { key: "bio", label: "Bio Paragraphs (basic HTML like <strong> allowed)", type: "array-textarea" },
    { key: "exploring", label: '"Currently Exploring" Tags', type: "array-string" },
    { key: "features", label: "Feature Cards", type: "array-object", itemLabel: "Feature", itemFields: FEATURE_ITEM_FIELDS,
      blank: { icon: "✨", color: "cyan", title: "New Feature", desc: "" } }
  ]},
  experience: { type: "array", itemLabel: "Role", itemFields: [
    { key: "company", label: "Company", type: "text" },
    { key: "role", label: "Role / Title", type: "text" },
    { key: "dateRange", label: "Date Range", type: "text" },
    { key: "location", label: "Location", type: "text" },
    { key: "type", label: "Employment Type", type: "text" },
    { key: "desc", label: "Summary", type: "textarea" },
    { key: "responsibilities", label: "Responsibilities", type: "array-string" },
    { key: "environment", label: "Environment / Tools Tags", type: "array-string" }
  ], blank: { company: "New Company", role: "Role", dateRange: "2026 — Present", location: "", type: "Full-time", desc: "", responsibilities: [], environment: [] }},
  skills: { type: "array", itemLabel: "Category", itemFields: [
    { key: "category", label: "Category Name", type: "text" },
    { key: "color", label: "Color (cyan / purple / pink)", type: "text" },
    { key: "tags", label: "Skill Tags", type: "array-string" }
  ], blank: { category: "New Category", color: "cyan", tags: [] }},
  projects: { type: "array", itemLabel: "Project", itemFields: [
    { key: "badges", label: "Badges", type: "array-object", itemLabel: "Badge", itemFields: [
      { key: "text", label: "Badge Text", type: "text" },
      { key: "type", label: "Color (cyan / purple / pink / outline)", type: "text" }
    ], blank: { text: "Label", type: "cyan" } },
    { key: "title", label: "Title", type: "text" },
    { key: "desc", label: "Description", type: "textarea" },
    { key: "tags", label: "Tech Tags", type: "array-string" },
    { key: "linkText", label: "Link Text", type: "text" },
    { key: "linkHref", label: "Link Href", type: "text" }
  ], blank: { badges: [], title: "New Project", desc: "", tags: [], linkText: "Learn more →", linkHref: "#" }},
  certifications: { type: "array", itemLabel: "Certificate", itemFields: [
    { key: "icon", label: "Emoji Icon", type: "text" },
    { key: "color", label: "Icon Color (cyan / purple / pink)", type: "text" },
    { key: "badgeType", label: "Badge Color (cyan / purple / pink)", type: "text" },
    { key: "badgeText", label: "Badge Text", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "org", label: "Organization / Issued", type: "text" },
    { key: "desc", label: "Description", type: "textarea" },
    { key: "skillsCovered", label: "Skills Covered (optional)", type: "array-string" },
    { key: "linkHref", label: "Certificate File Link (optional)", type: "text" }
  ], blank: { icon: "🏅", color: "cyan", badgeType: "cyan", badgeText: "Certification", title: "New Certificate", org: "", desc: "", skillsCovered: [], linkHref: "" }},
  research: { type: "object", fields: [
    { key: "badge", label: "Badge Text", type: "text" },
    { key: "title", label: "Paper Title", type: "text" },
    { key: "authors", label: "Authors / Venue", type: "text" },
    { key: "desc", label: "Description", type: "textarea" },
    { key: "keyDetails", label: "Key Details", type: "array-string" },
    { key: "tags", label: "Tags", type: "array-string" },
    { key: "linkHref", label: "Certificate Link", type: "text" }
  ]},
  education: { type: "object", fields: [
    { key: "degree", label: "Degree", type: "text" },
    { key: "school", label: "School", type: "text" },
    { key: "dateRange", label: "Date Range", type: "text" },
    { key: "extra", label: "Extra (e.g. CGPA)", type: "text" },
    { key: "projects", label: "Academic Projects (basic HTML allowed)", type: "array-textarea" }
  ]},
  content: { type: "object", fields: [
    { key: "bioLine", label: "Bio Line (basic HTML allowed)", type: "textarea" },
    { key: "tags", label: "Topic Tags", type: "array-string" },
    { key: "socials", label: "Social Platforms", type: "array-object", itemLabel: "Platform", itemFields: [
      { key: "platform", label: "Platform Name", type: "text" },
      { key: "icon", label: "Icon Character", type: "text" },
      { key: "color", label: "Color (cyan / purple / pink)", type: "text" },
      { key: "handle", label: "Handle", type: "text" },
      { key: "desc", label: "Description", type: "text" },
      { key: "url", label: "URL", type: "text" }
    ], blank: { platform: "New Platform", icon: "★", color: "cyan", handle: "", desc: "", url: "" } }
  ]},
  contact: { type: "object", fields: [
    { key: "email", label: "Email", type: "text" },
    { key: "phone", label: "Phone (display)", type: "text" },
    { key: "phoneHref", label: "Phone (tel: link — digits only, with country code)", type: "text" },
    { key: "location", label: "Location", type: "text" },
    { key: "socialLinks", label: "Social Link Pills", type: "array-object", itemLabel: "Link", itemFields: [
      { key: "label", label: "Label", type: "text" },
      { key: "url", label: "URL", type: "text" }
    ], blank: { label: "New Link", url: "https://" } }
  ]},
  footer: { type: "object", fields: [
    { key: "tagline", label: "Footer Tagline", type: "text" }
  ]}
};

/* ---------- State & helpers ---------- */

let state = null;

function escAttr(v) { return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/"/g, "&quot;"); }
function escHtml(v) { return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

function getByPath(obj, path) {
  return path.reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
function setByPath(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]];
  cur[path[path.length - 1]] = value;
}

/* ---------- Generic field renderers ---------- */

function renderTextField(path, label, value, multiline) {
  const p = JSON.stringify(path);
  if (multiline) {
    return `<div class="admin-field"><label>${escHtml(label)}</label><textarea data-path='${p}'>${escHtml(value)}</textarea></div>`;
  }
  return `<div class="admin-field"><label>${escHtml(label)}</label><input type="text" data-path='${p}' value="${escAttr(value)}"></div>`;
}

function renderArrayStringField(path, label, arr) {
  const p = JSON.stringify(path);
  const rows = (arr || []).map((v, i) => {
    const itemPath = JSON.stringify([...path, i]);
    return `<div class="array-string-row">
      <input type="text" data-path='${itemPath}' value="${escAttr(v)}">
      <button type="button" class="btn-icon" data-action="remove-array-item" data-path='${p}' data-index="${i}">✕</button>
    </div>`;
  }).join("");
  return `<div class="admin-field"><label>${escHtml(label)}</label>
    <div class="array-string-list">${rows}</div>
    <button type="button" class="btn-add" data-action="add-array-string" data-path='${p}' style="margin-top:8px;">+ Add</button>
  </div>`;
}

function renderArrayTextareaField(path, label, arr) {
  const p = JSON.stringify(path);
  const rows = (arr || []).map((v, i) => {
    const itemPath = JSON.stringify([...path, i]);
    return `<div class="array-string-row">
      <textarea data-path='${itemPath}'>${escHtml(v)}</textarea>
      <button type="button" class="btn-icon" data-action="remove-array-item" data-path='${p}' data-index="${i}">✕</button>
    </div>`;
  }).join("");
  return `<div class="admin-field"><label>${escHtml(label)}</label>
    <div class="array-string-list">${rows}</div>
    <button type="button" class="btn-add" data-action="add-array-string" data-path='${p}' style="margin-top:8px;">+ Add</button>
  </div>`;
}

function renderFieldsForItem(basePath, fields, itemData) {
  return fields.map(f => renderOneField([...basePath, f.key], f, itemData ? itemData[f.key] : undefined)).join("");
}

function renderOneField(path, f, value) {
  if (f.type === "text") return renderTextField(path, f.label, value ?? "");
  if (f.type === "textarea") return renderTextField(path, f.label, value ?? "", true);
  if (f.type === "array-string") return renderArrayStringField(path, f.label, value ?? []);
  if (f.type === "array-textarea") return renderArrayTextareaField(path, f.label, value ?? []);
  if (f.type === "array-object") return renderArrayObjectField(path, f, value ?? []);
  return "";
}

function renderArrayObjectField(path, f, arr) {
  const p = JSON.stringify(path);
  const items = arr.map((item, i) => {
    const itemPath = [...path, i];
    return `<div class="item-card">
      <div class="item-card-head">
        <span>${escHtml(f.itemLabel || "Item")} ${i + 1}</span>
        <button type="button" class="btn-icon" data-action="remove-array-item" data-path='${p}' data-index="${i}">✕</button>
      </div>
      ${renderFieldsForItem(itemPath, f.itemFields, item)}
    </div>`;
  }).join("");
  return `<div class="admin-field"><label>${escHtml(f.label)}</label>
    ${items}
    <button type="button" class="btn-add" data-action="add-array-object" data-path='${p}' data-blank='${JSON.stringify(f.blank || {})}'>+ Add ${escHtml(f.itemLabel || "Item")}</button>
  </div>`;
}

/* ---------- Section (tab) renderers ---------- */

function renderObjectSection(key, schema) {
  const data = state[key];
  const fieldsHtml = schema.fields.map(f => renderOneField([key, f.key], f, data[f.key])).join("");
  return `<div class="admin-card">
    <h2>${sectionTitle(key)}</h2>
    ${fieldsHtml}
    <div class="admin-save-row"><button class="btn btn-gradient" data-action="save-section" data-section="${key}">Save ${sectionTitle(key)} →</button></div>
  </div>`;
}

function renderArraySection(key, schema) {
  const arr = state[key];
  const items = arr.map((item, i) => {
    const itemPath = [key, i];
    return `<div class="item-card">
      <div class="item-card-head">
        <span>${escHtml(schema.itemLabel || "Item")} ${i + 1}</span>
        <button type="button" class="btn-icon" data-action="remove-array-item" data-path='${JSON.stringify([key])}' data-index="${i}">✕</button>
      </div>
      ${renderFieldsForItem(itemPath, schema.itemFields, item)}
    </div>`;
  }).join("");
  return `<div class="admin-card">
    <h2>${sectionTitle(key)}</h2>
    ${items}
    <button type="button" class="btn-add" data-action="add-array-object" data-path='${JSON.stringify([key])}' data-blank='${JSON.stringify(schema.blank || {})}'>+ Add ${escHtml(schema.itemLabel || "Item")}</button>
    <div class="admin-save-row"><button class="btn btn-gradient" data-action="save-section" data-section="${key}">Save ${sectionTitle(key)} →</button></div>
  </div>`;
}

function sectionTitle(key) {
  const map = { hero: "Hero", about: "About", experience: "Experience", skills: "Skills", projects: "Projects",
    certifications: "Achievements & Certifications", research: "Research", education: "Education",
    content: "Content / Social", contact: "Contact", footer: "Footer" };
  return map[key] || key;
}

async function renderOverviewTab() {
  const main = document.getElementById("adminMain");
  main.innerHTML = `<div class="admin-card"><h2>Overview</h2><div class="stats-grid" id="statsGrid">
    <div class="stat-card"><div class="stat-value">…</div><div class="stat-label">Page Views</div></div>
    <div class="stat-card"><div class="stat-value">…</div><div class="stat-label">Feedback Received</div></div>
    <div class="stat-card"><div class="stat-value">…</div><div class="stat-label">Average Rating</div></div>
  </div></div>
  <div class="admin-card"><h2>Quick Tips</h2>
    <p class="section-sub" style="margin-bottom:10px;">Use the sidebar to edit any section of your live site. Each tab has its own "Save" button — changes go live immediately, no redeploy needed.</p>
    <p class="section-sub" style="margin-bottom:0;">"Feedback &amp; Ratings" lets you read and moderate what visitors submit on the public site.</p>
  </div>`;

  try {
    const [pvRes, fbRes] = await Promise.all([fetch("/api/pageview"), fetch("/api/feedback")]);
    const pv = pvRes.ok ? (await pvRes.json()).count || 0 : 0;
    const items = fbRes.ok ? await fbRes.json() : [];
    const count = items.length;
    const sum = items.reduce((s, i) => s + (i.rating || 0), 0);
    const avg = count ? (sum / count).toFixed(1) : "—";

    const grid = document.getElementById("statsGrid");
    if (grid) {
      grid.innerHTML = `
        <div class="stat-card"><div class="stat-value">${pv}</div><div class="stat-label">Page Views</div></div>
        <div class="stat-card"><div class="stat-value">${count}</div><div class="stat-label">Feedback Received</div></div>
        <div class="stat-card"><div class="stat-value">${avg}</div><div class="stat-label">Average Rating</div></div>
      `;
    }
  } catch (err) {
    console.error(err);
  }
}

async function renderFeedbackTab() {
  const main = document.getElementById("adminMain");
  main.innerHTML = `<div class="admin-card"><h2>Feedback &amp; Ratings</h2><div id="feedbackAdminList">Loading…</div></div>`;
  try {
    const res = await fetch("/api/feedback");
    if (!res.ok) throw new Error("Request failed");
    const items = await res.json();
    const list = document.getElementById("feedbackAdminList");
    if (!items.length) { list.innerHTML = `<p class="section-sub">No feedback submitted yet.</p>`; return; }

    list.innerHTML = "";
    items.forEach(data => {
      const row = document.createElement("div");
      row.className = "feedback-admin-row";
      const stars = "★".repeat(data.rating || 0) + "☆".repeat(5 - (data.rating || 0));
      row.innerHTML = `
        <div>
          <div class="mini-stars" style="color:var(--purple);">${stars}</div>
          <p class="testimonial-msg">${escHtml(data.message || "")}</p>
          <p class="testimonial-meta">— ${escHtml(data.name || "Anonymous")} · ${data.createdAt ? new Date(data.createdAt).toLocaleString() : ""}</p>
        </div>
        <button type="button" class="btn-icon" title="Delete">✕</button>
      `;
      row.querySelector("button").addEventListener("click", async () => {
        if (!confirm("Delete this feedback entry?")) return;
        try {
          const delRes = await fetch("/api/feedback", {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "x-admin-password": sessionStorage.getItem("adminPassword") || "" },
            body: JSON.stringify({ id: data.id })
          });
          if (!delRes.ok) throw new Error("Delete failed");
          row.remove();
          showToast("Feedback deleted", "success");
        } catch (err) {
          showToast("Could not delete: " + err.message, "error");
        }
      });
      list.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    document.getElementById("feedbackAdminList").innerHTML = `<p class="section-sub">Could not load feedback.</p>`;
  }
}

function renderTab(key) {
  document.querySelectorAll(".admin-tab").forEach(b => b.classList.toggle("active", b.dataset.tab === key));
  if (key === "overview") return renderOverviewTab();
  if (key === "feedback") return renderFeedbackTab();

  const schema = FIELD_SCHEMAS[key];
  const main = document.getElementById("adminMain");
  main.innerHTML = schema.type === "array" ? renderArraySection(key, schema) : renderObjectSection(key, schema);
}

/* ---------- Event delegation for the admin form ---------- */

document.addEventListener("input", (e) => {
  const path = e.target.dataset.path;
  if (!path || !state) return;
  setByPath(state, JSON.parse(path), e.target.value);
});

document.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn || !state) return;
  const action = btn.dataset.action;

  if (action === "add-array-string") {
    const path = JSON.parse(btn.dataset.path);
    const arr = getByPath(state, path);
    arr.push("");
    rerenderActiveTab();
  } else if (action === "remove-array-item") {
    const path = JSON.parse(btn.dataset.path);
    const arr = getByPath(state, path);
    arr.splice(parseInt(btn.dataset.index, 10), 1);
    rerenderActiveTab();
  } else if (action === "add-array-object") {
    const path = JSON.parse(btn.dataset.path);
    const arr = getByPath(state, path);
    const blank = JSON.parse(btn.dataset.blank || "{}");
    arr.push(JSON.parse(JSON.stringify(blank)));
    rerenderActiveTab();
  } else if (action === "save-section") {
    await saveSection(btn.dataset.section, btn);
  }
});

function rerenderActiveTab() {
  const active = document.querySelector(".admin-tab.active");
  if (active) renderTab(active.dataset.tab);
}

async function saveSection(key, btn) {
  const original = btn.textContent;
  btn.disabled = true; btn.textContent = "Saving…";
  try {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": sessionStorage.getItem("adminPassword") || "" },
      body: JSON.stringify({ key, value: state[key] })
    });
    if (!res.ok) throw new Error((await res.json()).error || "Save failed");
    showToast(`${sectionTitle(key)} saved — live on your site now.`, "success");
  } catch (err) {
    console.error(err);
    showToast("Save failed: " + err.message, "error");
  } finally {
    btn.disabled = false; btn.textContent = original;
  }
}

function showToast(msg, type) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = "admin-toast show" + (type ? " " + type : "");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toast.className = "admin-toast"; }, 3500);
}

/* ---------- Auth & bootstrapping ---------- */

document.querySelectorAll(".admin-tab").forEach(btn => {
  btn.addEventListener("click", () => renderTab(btn.dataset.tab));
});

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  sessionStorage.removeItem("adminPassword");
  showGate("loginGate");
});

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const status = document.getElementById("loginStatus");
  const password = document.getElementById("loginPassword").value;
  status.textContent = "Signing in…";
  status.className = "form-note";
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      status.textContent = res.status === 401
        ? "Incorrect password."
        : "Login isn't set up yet — see SETUP.md (ADMIN_PASSWORD env var missing?).";
      status.className = "form-note error";
      return;
    }
    sessionStorage.setItem("adminPassword", password);
    await loadContentIntoState();
    showGate("dashboard");
    renderTab("overview");
  } catch (err) {
    status.textContent = "Could not reach the server. If this is your first visit, the /api routes only work once deployed on Vercel (not on a plain local file server).";
    status.className = "form-note error";
  }
});

async function loadContentIntoState() {
  state = JSON.parse(JSON.stringify(window.DEFAULT_CONTENT));
  try {
    const res = await fetch("/api/content");
    if (res.ok) {
      const data = await res.json();
      Object.keys(data || {}).forEach(k => { state[k] = data[k]; });
    }
  } catch (err) {
    console.warn("Using defaults — could not load saved content:", err);
  }
}

function showGate(id) {
  ["loginGate", "dashboard"].forEach(g => {
    document.getElementById(g).style.display = g === id ? (id === "dashboard" ? "block" : "flex") : "none";
  });
}

// If a password was saved earlier this browser session, skip straight to the dashboard.
const savedPassword = sessionStorage.getItem("adminPassword");
if (savedPassword) {
  loadContentIntoState().then(() => { showGate("dashboard"); renderTab("overview"); });
} else {
  showGate("loginGate");
}

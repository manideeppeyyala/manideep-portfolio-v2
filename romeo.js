// Romeo — the conversational interface to Juliet. Tries the real Juliet
// backend (Gemini, via /api/juliet-chat) first; if it's not configured yet or
// a request fails, falls back automatically to a local knowledge-matching
// engine grounded only in real portfolio data — so Romeo never fabricates an
// answer about Manideep, and never silently breaks if Juliet is unavailable.

const ROMEO_INTENTS = [
  { key: "greeting", words: ["hi", "hello", "hey", "yo", "sup", "greetings", "namaste"] },
  { key: "about", words: ["who are you", "about you", "about manideep", "introduce yourself", "who is manideep", "who r u", "yourself"] },
  { key: "experience", words: ["experience", "work", "job", "career", "deloitte", "employ", "role", "company"] },
  { key: "skills", words: ["skill", "tech stack", "technology", "technologies", "programming", "language", "python", "sql", "stack", "tools", "smartcomm"] },
  { key: "projects", words: ["project", "built", "agriculture", "dashboard", "made", "created", "developed", "juliet"] },
  { key: "education", words: ["education", "degree", "college", "university", "study", "studied", "cgpa", "academic", "school", "btech"] },
  { key: "certifications", words: ["certificate", "certification", "certified", "credential", "course", "achievement"] },
  { key: "contact", words: ["contact", "email", "phone", "reach", "hire", "connect", "get in touch", "number"] },
  { key: "social", words: ["social", "youtube", "instagram", "facebook", "github", "linkedin", "follow", "subscribe", "subscriber", "follower", "vlog"] },
  { key: "resume", words: ["resume", "cv", "download"] },
  { key: "research", words: ["research", "paper", "publication", "ieee", "published"] },
  { key: "thanks", words: ["thank", "thanks", "thx", "appreciate"] },
  { key: "bye", words: ["bye", "goodbye", "see you", "exit", "quit"] }
];

function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

function detectIntent(message) {
  const m = message.toLowerCase();
  let best = null, bestScore = 0;
  ROMEO_INTENTS.forEach(intent => {
    const score = intent.words.reduce((acc, w) => {
      const pattern = new RegExp(`\\b${escapeRegex(w)}s?\\b`, "i");
      return acc + (pattern.test(m) ? 1 : 0);
    }, 0);
    if (score > bestScore) { bestScore = score; best = intent.key; }
  });
  return bestScore > 0 ? best : null;
}

function localReply(message) {
  const k = window.getPortfolioKnowledge && window.getPortfolioKnowledge();
  if (!k) return "I'm still loading Manideep's portfolio data — give me a second and try again!";

  const intent = detectIntent(message);
  switch (intent) {
    case "greeting":
      return `Hey! I'm Romeo 🐾 — ask me about ${k.name}'s experience, skills, projects, education, certifications, socials, or how to get in touch.`;
    case "about":
      return `${k.name} works as ${k.roles.split(",")[0].trim()}. ${k.aboutBio}`;
    case "experience":
      return `Here's ${k.name}'s work experience:\n\n${k.expList}`;
    case "skills":
      return `${k.name}'s skills span:\n${k.skillsList}`;
    case "projects":
      return `A few things ${k.name} has built:\n\n${k.projList}`;
    case "education":
      return `${k.educationLine} Academic projects: ${k.educationProjects}`;
    case "certifications":
      return `Certifications and achievements:\n\n${k.certList}`;
    case "contact":
      return `You can reach ${k.name} at ${k.contactEmail} or ${k.contactPhone}. Based in ${k.contactLocation}.`;
    case "social":
      return `Here's where to find ${k.name} online:\n${k.socialList}\n\nCurrent stats:\n${k.statsList}`;
    case "resume":
      return `You can grab the full resume right here → <a href="${k.resumeHref}" target="_blank">Download Resume</a>`;
    case "research":
      return `${k.name} published "${k.researchTitle}". ${k.researchDesc}`;
    case "thanks":
      return `Anytime! Let me know if there's anything else you'd like to know about ${k.name}. 🐾`;
    case "bye":
      return `Thanks for stopping by! Feel free to reach out to ${k.name} directly anytime. 🐾`;
    default:
      return `I don't have that information about ${k.name} in my local knowledge — I can cover experience, skills, projects, education, certifications, socials, and contact details. For anything else, reach out directly at ${k.contactEmail}, or try Juliet in the "Meet Juliet" section for open-ended questions.`;
  }
}

let romeoHistory = [];

async function getRomeoReply(message) {
  romeoHistory.push({ role: "user", text: message });
  const result = await window.askJuliet(romeoHistory.slice(-16));

  if (result.ok) {
    romeoHistory.push({ role: "model", text: result.reply });
    return { text: result.reply, source: "juliet" };
  }
  // Juliet unavailable (not configured, rate-limited, network) — fall back
  // honestly to the local, portfolio-grounded engine. Don't keep the failed
  // turn in history sent to Juliet next time.
  romeoHistory.pop();
  return { text: localReply(message), source: "local" };
}

/* ---------- UI wiring ---------- */

const ROMEO_SUGGESTIONS = [
  "What are your skills?",
  "Tell me about your experience",
  "What projects have you built?",
  "How can I contact you?"
];

function romeoAddMessage(text, sender, source) {
  const log = document.getElementById("romeoLog");
  if (!log) return;
  const row = document.createElement("div");
  row.className = `romeo-msg romeo-msg-${sender}${sender === "bot" ? " md-content" : ""}`;
  row.innerHTML = sender === "bot" ? window.renderMarkdownSafe(text) : text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  if (sender === "bot" && source === "local") {
    const tag = document.createElement("span");
    tag.className = "romeo-source-tag";
    tag.textContent = "local knowledge (Juliet not connected)";
    row.appendChild(tag);
  }
  log.appendChild(row);
  window.wireCodeCopyButtons(row);
  log.scrollTop = log.scrollHeight;
}

function romeoShowTyping() {
  const log = document.getElementById("romeoLog");
  if (!log) return;
  const row = document.createElement("div");
  row.className = "romeo-msg romeo-msg-bot romeo-typing";
  row.id = "romeoTyping";
  row.innerHTML = `<span></span><span></span><span></span>`;
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}
function romeoHideTyping() {
  document.getElementById("romeoTyping")?.remove();
}

async function romeoHandleSend(text) {
  if (!text.trim()) return;
  romeoAddMessage(text, "user");
  const suggestions = document.getElementById("romeoSuggestions");
  if (suggestions) suggestions.style.display = "none";
  romeoShowTyping();
  const avatar = document.getElementById("romeoAvatarFace");
  avatar?.classList.add("romeo-thinking");

  const { text: reply, source } = await getRomeoReply(text);
  romeoHideTyping();
  avatar?.classList.remove("romeo-thinking");
  romeoAddMessage(reply, "bot", source);

  // Reusable character state framework: brief success/error flash on the avatar.
  const flashCls = source === "juliet" ? "char-success" : "char-error";
  avatar?.classList.remove("char-success", "char-error");
  void avatar?.offsetWidth;
  avatar?.classList.add(flashCls);
  setTimeout(() => avatar?.classList.remove(flashCls), 800);
}

function initRomeo() {
  const fab = document.getElementById("romeoFab");
  const panel = document.getElementById("romeoPanel");
  const closeBtn = document.getElementById("romeoClose");
  const form = document.getElementById("romeoForm");
  const input = document.getElementById("romeoInput");
  const suggestions = document.getElementById("romeoSuggestions");

  if (!fab || !panel) return;

  if (suggestions) {
    suggestions.innerHTML = ROMEO_SUGGESTIONS.map(s => `<button type="button" class="romeo-chip">${s}</button>`).join("");
    suggestions.addEventListener("click", (e) => {
      const chip = e.target.closest(".romeo-chip");
      if (chip) romeoHandleSend(chip.textContent);
    });
  }

  function openPanel() {
    panel.classList.add("open");
    fab.classList.add("romeo-fab-hidden");
    input?.focus();
  }
  function closePanel() {
    panel.classList.remove("open");
    fab.classList.remove("romeo-fab-hidden");
  }

  fab.addEventListener("click", openPanel);
  closeBtn?.addEventListener("click", closePanel);

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = "";
    romeoHandleSend(text);
  });

  setTimeout(() => {
    fab.classList.add("romeo-entrance");
    const k = window.getPortfolioKnowledge && window.getPortfolioKnowledge();
    if (k) romeoAddMessage(`Woof! I'm Romeo 🐾, your guide to ${k.name}'s portfolio — powered by Juliet AI. Ask me anything.`, "bot");
  }, 1200);
}

document.addEventListener("DOMContentLoaded", initRomeo);

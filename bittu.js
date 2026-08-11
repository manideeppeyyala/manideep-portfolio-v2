// Bittu — the portfolio's chat assistant. Default mode is a fast, fully
// reliable knowledge-matching engine grounded ONLY in bittu-knowledge.js
// (which is itself derived only from real portfolio content). Bittu never
// invents facts about Manideep — if a question falls outside the knowledge
// base, it says so plainly and points to direct contact instead.
//
// Extension point for a real AI API later: set window.BITTU_CONFIG.aiEndpoint
// to a URL (e.g. a Vercel serverless function you build, POST {message, context}
// and expecting {reply}). If set, Bittu tries it first and falls back to the
// local engine automatically if the call fails — so the UI never breaks.
window.BITTU_CONFIG = { aiEndpoint: null };

const BITTU_INTENTS = [
  { key: "greeting", words: ["hi", "hello", "hey", "yo", "sup", "greetings", "namaste"] },
  { key: "about", words: ["who are you", "about you", "about manideep", "introduce yourself", "who is manideep", "who r u", "yourself"] },
  { key: "experience", words: ["experience", "work", "job", "career", "deloitte", "employ", "role", "company"] },
  { key: "skills", words: ["skill", "tech stack", "technology", "technologies", "programming", "language", "python", "sql", "stack", "tools", "smartcomm"] },
  { key: "projects", words: ["project", "built", "agriculture", "dashboard", "made", "created", "developed"] },
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
  BITTU_INTENTS.forEach(intent => {
    const score = intent.words.reduce((acc, w) => {
      // Word-boundary match so short words (e.g. "hi", "yo") don't false-positive
      // inside longer ones ("this", "your"). Multi-word phrases just need to appear.
      // Optional trailing "s" so singular keywords also match plurals
      // ("skill" -> "skills", "project" -> "projects").
      const pattern = new RegExp(`\\b${escapeRegex(w)}s?\\b`, "i");
      return acc + (pattern.test(m) ? 1 : 0);
    }, 0);
    if (score > bestScore) { bestScore = score; best = intent.key; }
  });
  return bestScore > 0 ? best : null;
}

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function localReply(message) {
  const k = window.getBittuKnowledge && window.getBittuKnowledge();
  if (!k) return "I'm still loading Manideep's portfolio data — give me a second and try again!";

  const intent = detectIntent(message);
  switch (intent) {
    case "greeting":
      return `Hey! I'm Bittu 🐾 — ask me about ${k.name}'s experience, skills, projects, education, certifications, socials, or how to get in touch.`;
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
      return `I don't have that information about ${k.name} in my knowledge base — I only know what's on this portfolio (experience, skills, projects, education, certifications, socials, and contact details). For anything else, reach out directly at ${k.contactEmail}.`;
  }
}

async function getBittuReply(message) {
  const endpoint = window.BITTU_CONFIG && window.BITTU_CONFIG.aiEndpoint;
  if (endpoint) {
    try {
      const k = window.getBittuKnowledge && window.getBittuKnowledge();
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context: k })
      });
      if (!res.ok) throw new Error("AI endpoint failed");
      const data = await res.json();
      if (data && data.reply) return data.reply;
      throw new Error("Empty AI reply");
    } catch (err) {
      console.warn("Bittu: AI endpoint unavailable, using local knowledge engine:", err);
      return localReply(message);
    }
  }
  return localReply(message);
}

/* ---------- UI wiring ---------- */

const BITTU_SUGGESTIONS = [
  "What are your skills?",
  "Tell me about your experience",
  "What projects have you built?",
  "How can I contact you?"
];

function bittuAddMessage(text, sender) {
  const log = document.getElementById("bittuLog");
  if (!log) return;
  const row = document.createElement("div");
  row.className = `bittu-msg bittu-msg-${sender}`;
  row.innerHTML = sender === "bot" ? text.replace(/\n/g, "<br>") : escapeHtml(text);
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}

function bittuShowTyping() {
  const log = document.getElementById("bittuLog");
  if (!log) return;
  const row = document.createElement("div");
  row.className = "bittu-msg bittu-msg-bot bittu-typing";
  row.id = "bittuTyping";
  row.innerHTML = `<span></span><span></span><span></span>`;
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}
function bittuHideTyping() {
  document.getElementById("bittuTyping")?.remove();
}

async function bittuHandleSend(text) {
  if (!text.trim()) return;
  bittuAddMessage(text, "user");
  const suggestions = document.getElementById("bittuSuggestions");
  if (suggestions) suggestions.style.display = "none";
  bittuShowTyping();
  const avatar = document.getElementById("bittuAvatarFace");
  avatar?.classList.add("bittu-thinking");

  const reply = await getBittuReply(text);
  const delay = 320 + Math.min(reply.length * 6, 900);
  setTimeout(() => {
    bittuHideTyping();
    avatar?.classList.remove("bittu-thinking");
    bittuAddMessage(reply, "bot");
  }, delay);
}

function initBittu() {
  const fab = document.getElementById("bittuFab");
  const panel = document.getElementById("bittuPanel");
  const closeBtn = document.getElementById("bittuClose");
  const form = document.getElementById("bittuForm");
  const input = document.getElementById("bittuInput");
  const suggestions = document.getElementById("bittuSuggestions");

  if (!fab || !panel) return;

  if (suggestions) {
    suggestions.innerHTML = BITTU_SUGGESTIONS.map(s => `<button type="button" class="bittu-chip">${s}</button>`).join("");
    suggestions.addEventListener("click", (e) => {
      const chip = e.target.closest(".bittu-chip");
      if (chip) bittuHandleSend(chip.textContent);
    });
  }

  function openPanel() {
    panel.classList.add("open");
    fab.classList.add("bittu-fab-hidden");
    input?.focus();
  }
  function closePanel() {
    panel.classList.remove("open");
    fab.classList.remove("bittu-fab-hidden");
  }

  fab.addEventListener("click", openPanel);
  closeBtn?.addEventListener("click", closePanel);

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = "";
    bittuHandleSend(text);
  });

  // First-visit greeting, once the page has settled.
  setTimeout(() => {
    fab.classList.add("bittu-entrance");
    const k = window.getBittuKnowledge && window.getBittuKnowledge();
    if (k) bittuAddMessage(`Woof! I'm Bittu 🐾 — ask me anything about ${k.name}'s work, skills, or projects.`, "bot");
  }, 1200);
}

document.addEventListener("DOMContentLoaded", initBittu);

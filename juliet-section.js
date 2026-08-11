// Logic for the dedicated "Meet Juliet — My AI Model" section. Unlike Romeo,
// this section does NOT silently fall back to the local knowledge engine on
// failure — it's meant to demonstrate the real AI directly, so it shows an
// honest, specific status/error state instead of ever faking a response.

const JULIET_EXAMPLE_PROMPTS = [
  "What backend technologies does Manideep use?",
  "Write a Python function to reverse a linked list",
  "Explain what a REST API is, simply",
  "Debug this: for i in range(10) print(i)",
  "Summarize Manideep's work experience as a table"
];

let julietHistory = [];
let julietBusy = false;

async function checkJulietStatus() {
  const dot = document.getElementById("julietStatusDot");
  const text = document.getElementById("julietStatusText");
  if (!dot || !text) return;
  try {
    const res = await fetch("/api/juliet-chat");
    const data = await res.json();
    if (data.configured) {
      dot.className = "juliet-status-dot online";
      text.textContent = "Juliet is online (Gemini) — ask her anything below.";
    } else {
      dot.className = "juliet-status-dot offline";
      text.textContent = "Juliet isn't activated yet — the site owner needs to add a GEMINI_API_KEY (see SETUP.md). You can still see the interface below.";
    }
  } catch (err) {
    dot.className = "juliet-status-dot offline";
    text.textContent = "Couldn't reach Juliet's backend right now.";
  }
}

function julietAddMessage(text, sender) {
  const output = document.getElementById("julietOutput");
  if (!output) return;
  document.getElementById("julietEmptyState")?.remove();

  const row = document.createElement("div");
  row.className = `juliet-msg juliet-msg-${sender}${sender === "bot" ? " md-content" : ""}`;
  row.innerHTML = sender === "bot" ? window.renderMarkdownSafe(text) : text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  output.appendChild(row);
  window.wireCodeCopyButtons(row);
  output.scrollTop = output.scrollHeight;
  return row;
}

function julietAddError(message) {
  const output = document.getElementById("julietOutput");
  if (!output) return;
  document.getElementById("julietEmptyState")?.remove();
  const row = document.createElement("div");
  row.className = "juliet-msg juliet-msg-error";
  row.textContent = message;
  output.appendChild(row);
  output.scrollTop = output.scrollHeight;
}

function julietShowTyping() {
  const output = document.getElementById("julietOutput");
  if (!output) return;
  const row = document.createElement("div");
  row.className = "juliet-typing";
  row.id = "julietTyping";
  row.innerHTML = `<span></span><span></span><span></span>`;
  output.appendChild(row);
  output.scrollTop = output.scrollHeight;
}
function julietHideTyping() {
  document.getElementById("julietTyping")?.remove();
}

async function julietHandleSend(text) {
  if (!text.trim() || julietBusy) return;
  julietBusy = true;
  const sendBtn = document.getElementById("julietSendBtn");
  if (sendBtn) sendBtn.disabled = true;

  const suggestions = document.getElementById("julietSuggestions");
  if (suggestions) suggestions.style.display = "none";

  julietAddMessage(text, "user");
  julietHistory.push({ role: "user", text });
  julietShowTyping();

  const result = await window.askJuliet(julietHistory.slice(-16));
  julietHideTyping();

  if (result.ok) {
    julietHistory.push({ role: "model", text: result.reply });
    julietAddMessage(result.reply, "bot");
  } else {
    julietHistory.pop(); // don't keep a turn Juliet never actually answered
    if (result.code === "NOT_CONFIGURED") {
      julietAddError("Juliet isn't activated yet — the site owner needs to add a GEMINI_API_KEY (see SETUP.md). Nothing fake to show here — that's the honest status.");
    } else if (result.code === "RATE_LIMITED") {
      julietAddError("Juliet is getting a lot of questions right now — try again in a moment.");
    } else {
      julietAddError(`Something went wrong reaching Juliet (${result.error || "unknown error"}). Try again in a moment.`);
    }
  }

  julietBusy = false;
  if (sendBtn) sendBtn.disabled = false;
}

function initJulietSection() {
  const form = document.getElementById("julietForm");
  const input = document.getElementById("julietInput");
  const suggestions = document.getElementById("julietSuggestions");
  const emptyIcon = document.querySelector("#julietEmptyIcon .icon-3d-face");

  if (!form) return;

  if (emptyIcon && window.SOCIAL_ICONS) emptyIcon.innerHTML = window.SOCIAL_ICONS.ai;

  if (suggestions) {
    suggestions.innerHTML = JULIET_EXAMPLE_PROMPTS.map(p => `<button type="button" class="juliet-chip">${p}</button>`).join("");
    suggestions.addEventListener("click", (e) => {
      const chip = e.target.closest(".juliet-chip");
      if (chip) julietHandleSend(chip.textContent);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = "";
    julietHandleSend(text);
  });

  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  checkJulietStatus();
}

document.addEventListener("DOMContentLoaded", initJulietSection);

// Logic for the dedicated "Meet Bittu" section: tab switching between
// Chat / Image / Video, plus each pane's own state machine. Like the Juliet
// section, this never fakes a result — Image shows real generations from a
// verified free provider, and Video shows an honest "not connected" status
// pulled live from /api/bittu-video rather than a hardcoded claim.

const BITTU_SUGGESTIONS = [
  "Give me 5 taglines for a tech portfolio",
  "Brainstorm a fun weekend project idea",
  "Write a short, upbeat bio intro",
  "Explain prompt engineering like I'm new to it"
];

let bittuHistory = [];
let bittuChatBusy = false;

async function checkBittuStatus() {
  const dot = document.getElementById("bittuStatusDot");
  const text = document.getElementById("bittuStatusText");
  if (!dot || !text) return;
  try {
    const res = await fetch("/api/bittu-chat");
    const data = await res.json();
    if (data.configured) {
      dot.className = "bittu-status-dot online";
      text.textContent = "Bittu is online — chat is live, image generation is live, video is honestly not yet available.";
    } else {
      dot.className = "bittu-status-dot offline";
      text.textContent = "Bittu's chat isn't activated yet — the site owner needs to add GEMINI_API_KEY (see SETUP.md). Image generation works either way (no key needed).";
    }
  } catch (err) {
    dot.className = "bittu-status-dot offline";
    text.textContent = "Couldn't reach Bittu's backend right now.";
  }
}

/* ---------- Tabs ---------- */

function initBittuTabs() {
  const tabs = document.querySelectorAll(".bittu-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      document.querySelectorAll(".bittu-pane").forEach(p => p.classList.remove("active"));
      document.getElementById(`bittuPane${tab.dataset.tab.charAt(0).toUpperCase()}${tab.dataset.tab.slice(1)}`)?.classList.add("active");
    });
  });
}

/* ---------- Chat pane ---------- */

function bittuAddMessage(text, sender) {
  const output = document.getElementById("bittuChatOutput");
  if (!output) return;
  document.getElementById("bittuChatEmpty")?.remove();
  const row = document.createElement("div");
  row.className = `juliet-msg juliet-msg-${sender}${sender === "bot" ? " md-content" : ""}`;
  row.innerHTML = sender === "bot" ? window.renderMarkdownSafe(text) : text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  output.appendChild(row);
  window.wireCodeCopyButtons(row);
  output.scrollTop = output.scrollHeight;
}

function bittuAddError(message) {
  const output = document.getElementById("bittuChatOutput");
  if (!output) return;
  document.getElementById("bittuChatEmpty")?.remove();
  const row = document.createElement("div");
  row.className = "juliet-msg juliet-msg-error";
  row.textContent = message;
  output.appendChild(row);
  output.scrollTop = output.scrollHeight;
}

function bittuFlashState(cls) {
  const avatar = document.getElementById("bittuAvatarHeader");
  if (!avatar) return;
  avatar.classList.remove("char-success", "char-error");
  void avatar.offsetWidth;
  avatar.classList.add(cls);
  setTimeout(() => avatar.classList.remove(cls), 800);
}

async function bittuHandleChatSend(text) {
  if (!text.trim() || bittuChatBusy) return;
  bittuChatBusy = true;
  const sendBtn = document.getElementById("bittuChatSendBtn");
  if (sendBtn) sendBtn.disabled = true;
  document.getElementById("bittuSuggestions").style.display = "none";

  bittuAddMessage(text, "user");
  bittuHistory.push({ role: "user", text });

  const output = document.getElementById("bittuChatOutput");
  const typing = document.createElement("div");
  typing.className = "juliet-typing";
  typing.id = "bittuTyping";
  typing.innerHTML = "<span></span><span></span><span></span>";
  output.appendChild(typing);
  output.scrollTop = output.scrollHeight;

  const result = await window.askBittu(bittuHistory.slice(-16));
  document.getElementById("bittuTyping")?.remove();

  if (result.ok) {
    bittuHistory.push({ role: "model", text: result.reply });
    bittuAddMessage(result.reply, "bot");
    bittuFlashState("char-success");
  } else {
    bittuHistory.pop();
    bittuFlashState("char-error");
    if (result.code === "NOT_CONFIGURED") {
      bittuAddError("Bittu's chat isn't activated yet — GEMINI_API_KEY isn't configured (see SETUP.md).");
    } else if (result.code === "RATE_LIMITED") {
      bittuAddError("Bittu's getting a lot of questions right now — try again in a moment.");
    } else if (result.code === "MODEL_OVERLOADED") {
      bittuAddError("The AI model is experiencing high demand right now (this happens on the free tier at peak times) — try again in a moment.");
    } else {
      bittuAddError(`Something went wrong (${result.error || "unknown error"}). Try again.`);
    }
  }

  bittuChatBusy = false;
  if (sendBtn) sendBtn.disabled = false;
}

/* ---------- Image pane ---------- */

let bittuImageBusy = false;
let bittuLastImagePrompt = "";

async function bittuGenerateImage(prompt) {
  if (!prompt.trim() || bittuImageBusy) return;
  bittuImageBusy = true;
  bittuLastImagePrompt = prompt;
  const btn = document.getElementById("bittuImageSendBtn");
  const result = document.getElementById("bittuImageResult");
  if (btn) btn.disabled = true;
  result.innerHTML = `<div class="bittu-loading"><span class="bittu-spinner"></span> Generating image…</div>`;

  try {
    const res = await fetch("/api/bittu-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Image generation failed");

    const img = new Image();
    img.onload = () => {
      result.innerHTML = "";
      img.className = "bittu-generated-image";
      img.alt = prompt;
      result.appendChild(img);
      const actions = document.createElement("div");
      actions.className = "bittu-image-actions";
      actions.innerHTML = `
        <a href="${data.imageUrl}" download="bittu-${Date.now()}.jpg" class="btn btn-outline btn-small">↓ Download</a>
        <button type="button" class="btn btn-ghost btn-small" id="bittuRegenBtn">↻ Regenerate</button>
        <span class="bittu-provider-tag">via ${data.provider}</span>
      `;
      result.appendChild(actions);
      document.getElementById("bittuRegenBtn")?.addEventListener("click", () => bittuGenerateImage(bittuLastImagePrompt));
      bittuFlashState("char-success");
    };
    img.onerror = () => {
      result.innerHTML = `<p class="bittu-image-placeholder error">Image failed to load from the provider — try a different prompt or try again.</p>`;
      bittuFlashState("char-error");
    };
    img.src = data.imageUrl;
  } catch (err) {
    result.innerHTML = `<p class="bittu-image-placeholder error">${err.message}</p>`;
    bittuFlashState("char-error");
  } finally {
    bittuImageBusy = false;
    if (btn) btn.disabled = false;
  }
}

/* ---------- Video pane (honest unavailable state) ---------- */

async function bittuCheckVideo(promptTyped) {
  const result = document.getElementById("bittuVideoResult");
  result.innerHTML = `<div class="bittu-loading"><span class="bittu-spinner"></span> Checking video generation…</div>`;
  try {
    const res = await fetch("/api/bittu-video", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: promptTyped || "" }) });
    const data = await res.json();
    if (data.available) {
      result.innerHTML = `<p class="bittu-image-placeholder">Video generation is live — this build hasn't wired the result UI for it yet.</p>`;
    } else {
      result.innerHTML = `
        <div class="bittu-unavailable">
          <p class="bittu-unavailable-title">🎬 Video generation isn't connected yet</p>
          <p>${data.reason}</p>
          <p class="bittu-unavailable-alt">${data.alternative}</p>
        </div>`;
    }
  } catch (err) {
    result.innerHTML = `<p class="bittu-image-placeholder error">Couldn't reach the video service right now.</p>`;
  }
}

/* ---------- Init ---------- */

function initBittuSection() {
  const chatForm = document.getElementById("bittuChatForm");
  const imageForm = document.getElementById("bittuImageForm");
  const videoForm = document.getElementById("bittuVideoForm");
  const suggestions = document.getElementById("bittuSuggestions");

  if (!chatForm) return;

  initBittuTabs();

  if (suggestions) {
    suggestions.innerHTML = BITTU_SUGGESTIONS.map(s => `<button type="button" class="juliet-chip">${s}</button>`).join("");
    suggestions.addEventListener("click", (e) => {
      const chip = e.target.closest(".juliet-chip");
      if (chip) bittuHandleChatSend(chip.textContent);
    });
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("bittuChatInput");
    const text = input.value;
    input.value = "";
    bittuHandleChatSend(text);
  });

  imageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("bittuImageInput");
    bittuGenerateImage(input.value);
  });

  videoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("bittuVideoInput");
    bittuCheckVideo(input.value);
  });

  checkBittuStatus();
  bittuCheckVideo(""); // show the honest video status immediately, not just on submit
}

document.addEventListener("DOMContentLoaded", initBittuSection);

// Renders Juliet's Markdown responses (code fences, tables, lists) into safe
// HTML using marked.js + DOMPurify (both loaded via CDN in index.html), and
// wires a copy-to-clipboard button onto every code block.

function renderMarkdownSafe(text) {
  if (!window.marked || !window.DOMPurify) {
    // Libraries failed to load (offline, CDN blocked) — fail safe to escaped plain text.
    const esc = String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return esc.replace(/\n/g, "<br>");
  }
  const rawHtml = window.marked.parse(text, { breaks: true });
  return window.DOMPurify.sanitize(rawHtml, { ADD_ATTR: ["target"] });
}

function wireCodeCopyButtons(container) {
  container.querySelectorAll("pre").forEach(pre => {
    if (pre.dataset.copyWired) return;
    pre.dataset.copyWired = "1";
    pre.style.position = "relative";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "code-copy-btn";
    btn.textContent = "Copy";
    btn.addEventListener("click", () => {
      const code = pre.querySelector("code");
      const text = code ? code.textContent : pre.textContent;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = "Copy"; }, 1500);
      }).catch(() => { btn.textContent = "Failed"; setTimeout(() => { btn.textContent = "Copy"; }, 1500); });
    });
    pre.appendChild(btn);
  });
}

window.renderMarkdownSafe = renderMarkdownSafe;
window.wireCodeCopyButtons = wireCodeCopyButtons;

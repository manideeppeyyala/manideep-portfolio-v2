// Shared client for talking to the site's real AI backends (Juliet at
// /api/juliet-chat, Bittu at /api/bittu-chat — both ultimately call Google
// Gemini via lib/gemini.js, see api/*.js). Used by Romeo, the "Meet Juliet"
// section, and the "Meet Bittu" section. Never fakes a response: if a real
// backend isn't configured or a request fails, this returns a typed result
// the caller uses to show an honest state (Romeo additionally falls back to
// a local knowledge engine on top of this for Juliet specifically).

async function askAI(endpoint, conversationHistory, extraBody) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.assign({ messages: conversationHistory }, extraBody || {}))
    });
    const data = await res.json().catch(() => ({}));

    if (res.status === 503 && data.code === "NOT_CONFIGURED") {
      return { ok: false, code: "NOT_CONFIGURED", error: data.error };
    }
    if (!res.ok) {
      return { ok: false, code: data.code || "ERROR", error: data.error || `Request failed (${res.status})` };
    }
    return { ok: true, reply: data.reply };
  } catch (err) {
    return { ok: false, code: "NETWORK_ERROR", error: err.message };
  }
}

function askJuliet(conversationHistory) {
  const context = window.getPortfolioContextText ? window.getPortfolioContextText() : "";
  return askAI("/api/juliet-chat", conversationHistory, { context });
}

function askBittu(conversationHistory) {
  return askAI("/api/bittu-chat", conversationHistory);
}

window.askJuliet = askJuliet;
window.askBittu = askBittu;

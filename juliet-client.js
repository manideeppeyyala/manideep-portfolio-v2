// Shared client for talking to Juliet's real backend (/api/juliet-chat).
// Used by both Romeo (the chat widget) and the dedicated "Meet Juliet"
// section. Never fakes a response: if the real backend isn't configured or
// fails, it returns a typed result the caller uses to show an honest state
// (Romeo additionally falls back to the local knowledge engine on top of this).

async function askJuliet(conversationHistory) {
  const context = window.getPortfolioContextText ? window.getPortfolioContextText() : "";
  try {
    const res = await fetch("/api/juliet-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversationHistory, context })
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

window.askJuliet = askJuliet;

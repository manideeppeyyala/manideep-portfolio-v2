// Shared Gemini text-generation client, used by both api/juliet-chat.js and
// api/bittu-chat.js. Provider abstraction point: to swap AI providers later,
// change what's inside chatWithGemini() (or add a sibling lib/<provider>.js
// and point the api/*.js routes at it) — the request/response shape the
// frontend depends on doesn't need to change.

const MODEL_CANDIDATES = [
  "gemini-flash-latest",
  "gemini-2.5-flash",
  "gemini-2.0-flash-001",
  "gemini-2.0-flash",
  "gemini-pro-latest"
];
let workingModel = null; // cached for the lifetime of this warm serverless instance

const MAX_MESSAGES = 24;
const MAX_MESSAGE_LEN = 4000;

async function callGemini(model, apiKey, payload) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

// Returns { ok, reply?, status?, code?, error? } — callers translate this
// into their own HTTP response.
async function chatWithGemini({ apiKey, messages, systemPrompt, temperature = 0.6, maxOutputTokens = 1600 }) {
  if (!apiKey) return { ok: false, status: 503, code: "NOT_CONFIGURED", error: "GEMINI_API_KEY isn't configured. See SETUP.md." };
  if (!Array.isArray(messages) || messages.length === 0) return { ok: false, status: 400, code: "BAD_REQUEST", error: "Missing 'messages'" };

  const trimmed = messages.slice(-MAX_MESSAGES).map(m => ({
    role: m.role === "model" ? "model" : "user",
    parts: [{ text: String(m.text || "").slice(0, MAX_MESSAGE_LEN) }]
  }));

  const payload = {
    contents: trimmed,
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: { temperature, maxOutputTokens }
  };

  try {
    const candidates = workingModel ? [workingModel, ...MODEL_CANDIDATES.filter(m => m !== workingModel)] : MODEL_CANDIDATES;
    let geminiRes, lastErrBody = "", lastStatus = 0, sawOverload = false;

    for (const model of candidates) {
      geminiRes = await callGemini(model, apiKey, payload);
      if (geminiRes.status === 429) return { ok: false, status: 429, code: "RATE_LIMITED", error: "Getting a lot of requests right now — try again in a moment." };
      if (geminiRes.ok) { workingModel = model; break; }
      lastStatus = geminiRes.status;
      lastErrBody = await geminiRes.text();
      if (lastStatus === 503) sawOverload = true;
      // 404 = bad model name, 503 = this specific model is overloaded right
      // now -> both worth trying the next candidate. Anything else (auth,
      // malformed request) won't be fixed by retrying a different model.
      if (lastStatus !== 404 && lastStatus !== 503) break;
    }

    if (!geminiRes.ok) {
      console.error("Gemini API error:", lastStatus, lastErrBody);
      if (sawOverload) {
        return { ok: false, status: 503, code: "MODEL_OVERLOADED", error: "The AI model is experiencing high demand right now — try again in a moment." };
      }
      return { ok: false, status: 502, code: "UPSTREAM_ERROR", error: "The model provider returned an error." };
    }

    const data = await geminiRes.json();
    const reply = data.candidates && data.candidates[0] && data.candidates[0].content &&
      data.candidates[0].content.parts && data.candidates[0].content.parts.map(p => p.text || "").join("");

    if (!reply) {
      const blockReason = data.promptFeedback && data.promptFeedback.blockReason;
      return { ok: true, reply: blockReason ? `I can't answer that one (${blockReason.toLowerCase().replace(/_/g, " ")}) — try rephrasing.` : "I didn't get a usable response that time — try asking again." };
    }
    return { ok: true, reply };
  } catch (err) {
    console.error("Gemini backend error:", err);
    return { ok: false, status: 500, code: "SERVER_ERROR", error: err.message };
  }
}

module.exports = { chatWithGemini };

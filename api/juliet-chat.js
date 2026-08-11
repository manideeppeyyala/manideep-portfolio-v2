// Juliet's real backend. Calls Google Gemini (free-tier API, no billing
// account required for a Gemini API key) server-side — the key never reaches
// the browser. See SETUP.md for how to get a key and activate this.
//
// Request body: { messages: [{ role: "user"|"model", text: "..." }, ...], context: "..." }
// Response:     { reply: "..." }  or  { error: "...", code: "NOT_CONFIGURED"|"UPSTREAM_ERROR"|... }

const MODEL = "gemini-2.0-flash";
const MAX_MESSAGES = 24;       // conversation turns kept per request (context window guard)
const MAX_MESSAGE_LEN = 4000;  // per-message character cap (abuse/cost guard)

const SYSTEM_PROMPT_PREFIX = `You are Juliet, a real AI assistant embedded in Peyyala Manideep's personal portfolio website. You can:
- Answer general questions and complex questions on any topic.
- Generate, explain, debug, and improve code in any language.
- Answer questions about Manideep himself — his career, skills, projects, experience, education, certifications, and social presence — using ONLY the verified portfolio information given to you below. Never invent or guess personal facts about him. If asked something about him that isn't in the context provided, say plainly that you don't have that information in his portfolio and suggest contacting him directly.
- Produce clean, well-formatted responses using Markdown: fenced code blocks with a language tag, tables, numbered/bulleted lists, and headings where useful.
- You do NOT have live internet/web-search access. If a question needs real-time or current information (today's news, live prices, current events after your training data), say so honestly instead of guessing or fabricating an answer.

Verified portfolio information about Manideep (treat as ground truth, do not contradict it):
`;

module.exports = async (req, res) => {
  // Cheap status check the UI uses to show "online/offline" without spending API quota.
  if (req.method === "GET") {
    return res.status(200).json({ configured: !!process.env.GEMINI_API_KEY });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed", code: "METHOD_NOT_ALLOWED" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "Juliet isn't activated yet — GEMINI_API_KEY isn't configured. See SETUP.md.",
      code: "NOT_CONFIGURED"
    });
  }

  const { messages, context } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Missing 'messages'", code: "BAD_REQUEST" });
  }

  const trimmed = messages.slice(-MAX_MESSAGES).map(m => ({
    role: m.role === "model" ? "model" : "user",
    parts: [{ text: String(m.text || "").slice(0, MAX_MESSAGE_LEN) }]
  }));

  const systemPrompt = SYSTEM_PROMPT_PREFIX + (context || "(no portfolio context provided)");

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: trimmed,
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { temperature: 0.6, maxOutputTokens: 1600 }
      })
    });

    if (geminiRes.status === 429) {
      return res.status(429).json({ error: "Juliet is getting a lot of questions right now — try again in a moment.", code: "RATE_LIMITED" });
    }
    if (!geminiRes.ok) {
      const errBody = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, errBody);
      return res.status(502).json({
        error: "Juliet's model provider returned an error.",
        code: "UPSTREAM_ERROR",
        debugStatus: geminiRes.status,
        debugBody: errBody.slice(0, 500)
      });
    }

    const data = await geminiRes.json();
    const reply = data.candidates && data.candidates[0] && data.candidates[0].content &&
      data.candidates[0].content.parts && data.candidates[0].content.parts.map(p => p.text || "").join("");

    if (!reply) {
      const blockReason = data.promptFeedback && data.promptFeedback.blockReason;
      return res.status(200).json({
        reply: blockReason
          ? `I can't answer that one (${blockReason.toLowerCase().replace(/_/g, " ")}) — try rephrasing.`
          : "I didn't get a usable response that time — try asking again."
      });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Juliet backend error:", err);
    return res.status(500).json({ error: err.message, code: "SERVER_ERROR" });
  }
};

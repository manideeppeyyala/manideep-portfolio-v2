// Juliet's real backend. Calls Google Gemini (free-tier API, no billing
// account required for a Gemini API key) server-side — the key never reaches
// the browser. See SETUP.md for how to get a key and activate this.
//
// Request body: { messages: [{ role: "user"|"model", text: "..." }, ...], context: "..." }
// Response:     { reply: "..." }  or  { error: "...", code: "NOT_CONFIGURED"|"UPSTREAM_ERROR"|... }

const { chatWithGemini } = require("../lib/gemini");

const SYSTEM_PROMPT_PREFIX = `You are Juliet, a real generative AI assistant embedded in Peyyala Manideep's personal portfolio website. You can:
- Answer general questions and complex questions on any topic.
- Generate, explain, debug, and improve code in any language.
- Answer questions about Manideep himself — his career, skills, projects, experience, education, certifications, and social presence — using ONLY the verified portfolio information given to you below. Never invent or guess personal facts about him. If asked something about him that isn't in the context provided, say plainly that you don't have that information in his portfolio and suggest contacting him directly.
- Produce clean, well-formatted responses using Markdown: fenced code blocks with a language tag, tables, numbered/bulleted lists, and headings where useful.
- You do NOT have live internet/web-search access. If a question needs real-time or current information (today's news, live prices, current events after your training data), say so honestly instead of guessing or fabricating an answer.
Your tone is warm, intelligent, and precise — a thoughtful creative/technical collaborator, not overly casual.

Verified portfolio information about Manideep (treat as ground truth, do not contradict it):
`;

module.exports = async (req, res) => {
  if (req.method === "GET") {
    return res.status(200).json({ configured: !!process.env.GEMINI_API_KEY });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed", code: "METHOD_NOT_ALLOWED" });

  const { messages, context } = req.body || {};
  const result = await chatWithGemini({
    apiKey: process.env.GEMINI_API_KEY,
    messages,
    systemPrompt: SYSTEM_PROMPT_PREFIX + (context || "(no portfolio context provided)")
  });

  if (!result.ok) return res.status(result.status).json({ error: result.error, code: result.code });
  return res.status(200).json({ reply: result.reply });
};

// Bittu's image-generation endpoint. Provider: Pollinations.ai — a genuinely
// free, no-API-key image generation service (verified working; see
// SETUP.md / the API docs section on the site for details, limits, and the
// verification date).
//
// Architecture note: Vercel Hobby serverless functions have a short default
// timeout, and image synthesis can take longer than that — so instead of
// proxying the binary image through this function (timeout risk), this
// endpoint validates the prompt and returns the fully-formed image URL for
// the browser to load directly via an <img> tag. Pollinations needs no
// secret key, so nothing sensitive is exposed by doing it this way; this is
// also the natural place to swap in a different/paid provider later without
// changing the frontend's request shape.
//
// Request:  POST { prompt: string }
// Response: { imageUrl } or { error, code }

const MAX_PROMPT_LEN = 500;

module.exports = async (req, res) => {
  if (req.method === "GET") return res.status(200).json({ configured: true, provider: "pollinations" });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed", code: "METHOD_NOT_ALLOWED" });

  const { prompt } = req.body || {};
  const clean = String(prompt || "").trim().slice(0, MAX_PROMPT_LEN);
  if (!clean) return res.status(400).json({ error: "Prompt is required", code: "BAD_REQUEST" });

  const seed = Math.floor(Math.random() * 1_000_000);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(clean)}?width=768&height=768&seed=${seed}&nologo=true`;

  return res.status(200).json({ imageUrl, provider: "Pollinations.ai (free, no key)" });
};

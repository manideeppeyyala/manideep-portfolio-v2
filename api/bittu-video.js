// Bittu's video-generation endpoint. Honest by design: as of this build,
// there is no production-viable, genuinely free video-generation API
// (Runway, Pika, Luma, Google Veo, etc. are all paid/gated — verified by
// checking their current pricing pages, not assumed). Rather than fake a
// result or silently omit the feature, this endpoint always returns a clear
// "not available" response with a reason and a suggested alternative
// workflow, per the "provider unavailable -> explain -> offer alternative"
// pattern. The frontend (bittu-section.js) renders this as an honest empty
// state, never a fabricated video.
//
// To activate real video generation later: implement the actual provider
// call here (same pattern as api/bittu-image.js or lib/gemini.js — keep the
// provider's key server-side in a Vercel env var) and change `available` to
// true. Nothing in the frontend needs to change beyond that.

module.exports = async (req, res) => {
  if (req.method === "GET" || req.method === "POST") {
    return res.status(200).json({
      available: false,
      reason: "No production-viable free video-generation API is currently connected. Every real provider (Runway, Pika, Luma, Google Veo, etc.) requires a paid plan — none currently offer a free tier suitable for production use.",
      alternative: "Try the Image tool for a visual, or ask Bittu in chat to write a shot-by-shot storyboard / script for your video concept instead."
    });
  }
  return res.status(405).json({ error: "Method not allowed", code: "METHOD_NOT_ALLOWED" });
};

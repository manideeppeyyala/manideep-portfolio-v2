// Fetches public subscriber count for a YouTube channel by @handle.
// Requires YOUTUBE_API_KEY as a Vercel environment variable (see SETUP.md) —
// a free API key, no OAuth, no billing account needed for this read-only call.
module.exports = async (req, res) => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const handle = req.query.handle;

  if (!apiKey) return res.status(503).json({ error: "YOUTUBE_API_KEY not configured" });
  if (!handle) return res.status(400).json({ error: "Missing 'handle' query param" });

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=${encodeURIComponent(handle)}&key=${apiKey}`;
    const ytRes = await fetch(url);
    if (!ytRes.ok) throw new Error(`YouTube API responded ${ytRes.status}`);
    const data = await ytRes.json();
    const stats = data.items && data.items[0] && data.items[0].statistics;
    if (!stats) return res.status(404).json({ error: "Channel not found" });

    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=3600");
    return res.status(200).json({
      subscriberCount: parseInt(stats.subscriberCount, 10),
      viewCount: parseInt(stats.viewCount, 10)
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

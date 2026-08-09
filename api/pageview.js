const { getFile, putFile } = require("../lib/github");

module.exports = async (req, res) => {
  try {
    const { json } = await getFile("data/stats.json");
    const stats = json || { count: 0 };

    if (req.method === "POST") {
      stats.count = (stats.count || 0) + 1;
      // Fire-and-forget-ish: still await so we don't race, but keep it cheap.
      await putFile("data/stats.json", stats, "Page view");
      return res.status(200).json(stats);
    }

    return res.status(200).json(stats);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

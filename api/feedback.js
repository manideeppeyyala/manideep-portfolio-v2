const { getFile, putFile, checkAdmin } = require("../lib/github");

module.exports = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { json } = await getFile("data/feedback.json");
      return res.status(200).json(json || []);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, rating, message } = req.body || {};
      const r = parseInt(rating, 10);
      if (!r || r < 1 || r > 5) return res.status(400).json({ error: "Rating must be 1-5" });
      if (!message || !message.trim()) return res.status(400).json({ error: "Message is required" });

      const { json: current } = await getFile("data/feedback.json");
      const list = current || [];
      list.unshift({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        name: (name || "Anonymous").slice(0, 60),
        rating: r,
        message: message.slice(0, 1000),
        createdAt: new Date().toISOString()
      });
      await putFile("data/feedback.json", list, "New feedback submitted");
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "DELETE") {
    if (!checkAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
    try {
      const { id } = req.body || {};
      const { json: current } = await getFile("data/feedback.json");
      const list = (current || []).filter(f => f.id !== id);
      await putFile("data/feedback.json", list, `Admin: delete feedback ${id}`);
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

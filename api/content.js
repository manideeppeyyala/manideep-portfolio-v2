const { getFile, putFile, checkAdmin } = require("../lib/github");

module.exports = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { json } = await getFile("data/content.json");
      return res.status(200).json(json || {});
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    if (!checkAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
    try {
      const { key, value } = req.body || {};
      if (!key) return res.status(400).json({ error: "Missing 'key'" });
      const { json: current } = await getFile("data/content.json");
      const updated = { ...(current || {}), [key]: value };
      await putFile("data/content.json", updated, `Admin: update ${key} section`);
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

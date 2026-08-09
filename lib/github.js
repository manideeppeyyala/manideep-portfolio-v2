// Shared helper: read/write JSON files in the site's own GitHub repo,
// used as a free, zero-billing "database" for content, feedback and stats.
// Requires a GITHUB_TOKEN environment variable (a repo-scoped Personal Access
// Token) set in Vercel — never exposed to the browser.

const OWNER = "manideeppeyyala";
const REPO = "manideep-s-portfolio";
const BRANCH = "main";
const API = "https://api.github.com";

function headers() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json"
  };
}

async function getFile(path) {
  const res = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`, { headers: headers() });
  if (res.status === 404) return { json: null, sha: null };
  if (!res.ok) throw new Error(`GitHub read failed (${res.status}): ${await res.text()}`);
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { json: JSON.parse(content), sha: data.sha };
}

async function putFile(path, json, message) {
  const { sha } = await getFile(path);
  const body = {
    message,
    content: Buffer.from(JSON.stringify(json, null, 2)).toString("base64"),
    branch: BRANCH
  };
  if (sha) body.sha = sha;
  const res = await fetch(`${API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`GitHub write failed (${res.status}): ${await res.text()}`);
  return res.json();
}

function checkAdmin(req) {
  const provided = req.headers["x-admin-password"];
  return !!provided && provided === process.env.ADMIN_PASSWORD;
}

module.exports = { getFile, putFile, checkAdmin };

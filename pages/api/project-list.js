export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const resp = await fetch("https://api.kie.ai/suno/project/list", {
      headers: { "Authorization": `Bearer ${process.env.KIE_API_KEY}` }
    });
    const data = await resp.json();
    return res.status(resp.status).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: String(e) });
  }
}
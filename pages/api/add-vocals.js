export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const body = req.body;
    // expected: { songId, lyrics, prompt, voice, ... }
    const resp = await fetch("https://api.kie.ai/suno/add-vocals", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.KIE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await resp.json();
    return res.status(resp.status).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: String(e) });
  }
}
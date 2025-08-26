export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const body = req.body;
    const resp = await fetch("https://api.kie.ai/suno/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.KIE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await resp.json();
    if (!resp.ok) {
      return res.status(resp.status).json(data);
    }
    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: String(e) });
  }
}
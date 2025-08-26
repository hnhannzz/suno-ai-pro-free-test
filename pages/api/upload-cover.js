import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to parse form" });
    }
    try {
      const audio = files.audio;
      if (!audio) return res.status(400).json({ error: "No audio file" });

      const fd = new FormData();
      fd.append("file", fs.createReadStream(audio.filepath || audio.path), {
        filename: audio.originalFilename || audio.name || "upload.wav",
      });
      // include other fields
      if (fields.prompt) fd.append("prompt", fields.prompt);
      if (fields.lyrics) fd.append("lyrics", fields.lyrics);
      if (fields.style) fd.append("style", fields.style);

      const apiRes = await fetch("https://api.kie.ai/suno/upload-and-cover-audio", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.KIE_API_KEY}`,
          // Note: don't set Content-Type; let form-data set it
          ...fd.getHeaders()
        },
        body: fd
      });

      const data = await apiRes.json();
      return res.status(apiRes.status).json(data);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: String(e) });
    }
  });
}
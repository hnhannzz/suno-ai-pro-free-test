import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const API_BASE = "https://api.kie.ai/suno";
const KIE_API_KEY = process.env.KIE_API_KEY;

// Middleware: set headers
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Authorization": `Bearer ${KIE_API_KEY}`,
    "Content-Type": "application/json",
  },
});

// 🎵 Generate song
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, lyrics, style } = req.body;
    const response = await api.post("/generate", {
      prompt,
      lyrics,
      style,
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate song" });
  }
});

// 🎤 Cover song
app.post("/api/cover", async (req, res) => {
  try {
    const { audioUrl, lyrics, style } = req.body;
    const response = await api.post("/cover", {
      audio_url: audioUrl,
      lyrics,
      style,
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to cover song" });
  }
});

// 📂 Project API
app.post("/api/project/create", async (req, res) => {
  try {
    const { name } = req.body;
    const response = await api.post("/project/create", { name });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to create project" });
  }
});

app.get("/api/project/list", async (req, res) => {
  try {
    const response = await api.get("/project/list");
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to list projects" });
  }
});

// ▶️ Fetch song result
app.get("/api/song/:id", async (req, res) => {
  try {
    const response = await api.get(`/song/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch song" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

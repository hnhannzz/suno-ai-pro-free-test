"use client";
import { useState } from "react";

export default function SongForm({ onResult }: { onResult: (r: any) => void }) {
  const [prompt, setPrompt] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [style, setStyle] = useState("pop");

  async function handleGenerate() {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, lyrics, style }),
    });
    const data = await res.json();
    onResult(data);
  }

  return (
    <div className="border p-4 rounded bg-white shadow">
      <h2 className="font-semibold mb-2">🎵 Tạo nhạc</h2>
      <input
        type="text"
        placeholder="Prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Lyrics..."
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Style (pop, rock, orchestral...)"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Generate
      </button>
    </div>
  );
}
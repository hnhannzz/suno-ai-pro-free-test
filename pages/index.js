import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [style, setStyle] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [songId, setSongId] = useState("");

  const callJson = async (path, body) => {
    setLoading(true);
    const res = await fetch(`/api/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);
    setResult(data);
    return data;
  };

  const handleGenerate = () => {
    callJson("generate", { prompt, lyrics, style });
  };

  const handleUploadCover = async () => {
    if (!file) return alert("Chọn file audio trước");
    setLoading(true);
    const fd = new FormData();
    fd.append("audio", file);
    fd.append("prompt", prompt || "");
    fd.append("lyrics", lyrics || "");
    fd.append("style", style || "");
    const res = await fetch("/api/upload-cover", { method: "POST", body: fd });
    const data = await res.json();
    setLoading(false);
    setResult(data);
  };

  const handleExtend = async () => {
    if (!file) return alert("Chọn file audio trước");
    setLoading(true);
    const fd = new FormData();
    fd.append("audio", file);
    fd.append("prompt", prompt || "");
    fd.append("style", style || "");
    const res = await fetch("/api/upload-extend", { method: "POST", body: fd });
    const data = await res.json();
    setLoading(false);
    setResult(data);
  };

  const handleAddInstrumental = () => {
    callJson("add-instrumental", { prompt, style, songId });
  };

  const handleAddVocals = () => {
    callJson("add-vocals", { prompt, lyrics, style, songId });
  };

  const createProject = async () => {
    const name = prompt("Project name:");
    if (!name) return;
    setLoading(true);
    const res = await fetch("/api/project-create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setLoading(false);
    setResult(data);
  };

  const listProjects = async () => {
    setLoading(true);
    const res = await fetch("/api/project-list");
    const data = await res.json();
    setLoading(false);
    setResult(data);
  };

  const fetchSong = async () => {
    if (!songId) return alert("Nhập song id");
    setLoading(true);
    const res = await fetch(`/api/song/${encodeURIComponent(songId)}`);
    const data = await res.json();
    setLoading(false);
    setResult(data);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", maxWidth: 900, margin: "0 auto" }}>
      <h1>Suno (via Kie.ai) — Full API Demo</h1>

      <section style={{ marginTop: 20 }}>
        <h2>Create / Generate</h2>
        <div>
          <input placeholder="Style (e.g. orchestral, pop)" value={style} onChange={e => setStyle(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
          <textarea placeholder="Prompt" value={prompt} onChange={e => setPrompt(e.target.value)} style={{ width: "100%", height: 80, padding: 8 }} />
          <textarea placeholder="Lyrics (optional)" value={lyrics} onChange={e => setLyrics(e.target.value)} style={{ width: "100%", height: 80, padding: 8, marginTop: 8 }} />
          <div style={{ marginTop: 8 }}>
            <button onClick={handleGenerate} disabled={loading} style={{ marginRight: 8 }}>Generate (JSON)</button>
            <button onClick={() => { setPrompt(""); setLyrics(""); setStyle(""); }}>Clear</button>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Upload audio (for Cover / Extend)</h2>
        <input type="file" accept="audio/*" onChange={e => setFile(e.target.files[0])} />
        <div style={{ marginTop: 8 }}>
          <button onClick={handleUploadCover} disabled={loading} style={{ marginRight: 8 }}>Upload & Cover</button>
          <button onClick={handleExtend} disabled={loading}>Upload & Extend</button>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Add instrumental / vocals to existing song</h2>
        <input placeholder="songId" value={songId} onChange={e => setSongId(e.target.value)} style={{ width: 300, padding: 6, marginRight: 8 }} />
        <button onClick={handleAddInstrumental} disabled={loading} style={{ marginRight: 8 }}>Add Instrumental</button>
        <button onClick={handleAddVocals} disabled={loading}>Add Vocals</button>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Projects</h2>
        <button onClick={createProject} disabled={loading} style={{ marginRight: 8 }}>Create Project</button>
        <button onClick={listProjects} disabled={loading}>List Projects</button>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Fetch Song</h2>
        <input placeholder="song id" value={songId} onChange={e => setSongId(e.target.value)} style={{ width: 300, padding: 6, marginRight: 8 }} />
        <button onClick={fetchSong} disabled={loading}>Fetch</button>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Result</h2>
        {loading ? <div>Loading...</div> : <pre style={{ background: "#f6f6f6", padding: 12 }}>{result ? JSON.stringify(result, null, 2) : "No result yet"}</pre>}
      </section>

      <footer style={{ marginTop: 30, color: "#666" }}>
        <div>Note: set <code>KIE_API_KEY</code> in Vercel environment variables before deploy.</div>
        <div>Deploy repo name: <strong>suno-ai-pro-free-test</strong></div>
      </footer>
    </div>
  );
}
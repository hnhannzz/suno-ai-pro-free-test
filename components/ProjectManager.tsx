"use client";
import { useState, useEffect } from "react";

export default function ProjectManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");

  async function fetchProjects() {
    const res = await fetch("/api/project/list");
    const data = await res.json();
    setProjects(data.projects || []);
  }

  async function createProject() {
    await fetch("/api/project/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchProjects();
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="mt-6 border p-4 rounded bg-white shadow">
      <h2 className="font-semibold mb-2">📂 Quản lý Project</h2>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Tên project..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={createProject}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Tạo
        </button>
      </div>
      <ul className="list-disc pl-5">
        {projects.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
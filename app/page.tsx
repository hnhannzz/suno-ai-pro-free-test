"use client";
import { useState } from "react";
import SongForm from "@/components/SongForm";
import ProjectManager from "@/components/ProjectManager";

export default function Home() {
  const [result, setResult] = useState<any>(null);

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎶 Suno Clone (Kie.ai)</h1>
      
      <SongForm onResult={setResult} />

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="font-bold">✅ Kết quả:</h2>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <ProjectManager />
    </main>
  );
}
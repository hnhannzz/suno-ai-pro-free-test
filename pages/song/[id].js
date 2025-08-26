// pages/song/[id].js
import React from "react";

export default function SongPage({ song }) {
  if (!song) return <p>Không tìm thấy bài hát</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>{song.title}</h1>
      {song.artist && <p>Tác giả: {song.artist}</p>}
      {song.audio_url ? (
        <audio controls src={song.audio_url} style={{ marginTop: "1rem" }} />
      ) : (
        <p>Audio chưa sẵn sàng</p>
      )}
      {song.lyrics && (
        <pre style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
          {song.lyrics}
        </pre>
      )}
    </div>
  );
}

// Fetch dữ liệu trực tiếp từ API Kie.ai
export async function getServerSideProps(context) {
  const { id } = context.query;

  // Nếu không có id thì trả về 404
  if (!id) {
    return { notFound: true };
  }

  try {
    const res = await fetch(`https://api.kie.ai/suno/song/${id}`, {
      headers: {
        "Authorization": `Bearer ${process.env.KIE_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      return { notFound: true };
    }

    const data = await res.json();

    return {
      props: { song: data }
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return { notFound: true };
  }
}

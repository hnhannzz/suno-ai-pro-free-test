// pages/song/[id].js
import React from "react";

export default function SongPage({ song, error }) {
  if (error) {
    return (
      <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <h1>Lỗi</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!song) {
    return (
      <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <h1>Bài hát không tồn tại</h1>
        <p>Không tìm thấy dữ liệu cho ID này.</p>
      </div>
    );
  }

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

  if (!id) {
    return { props: { song: null, error: "ID bài hát không hợp lệ." } };
  }

  try {
    const res = await fetch(`https://api.kie.ai/suno/song/${id}`, {
      headers: {
        "Authorization": `Bearer ${process.env.KIE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 404) {
      return { props: { song: null, error: "Bài hát không tồn tại hoặc ID sai." } };
    }

    if (!res.ok) {
      return { props: { song: null, error: `API Kie.ai trả lỗi: ${res.status}` } };
    }

    const data = await res.json();

    return { props: { song: data, error: null } };
  } catch (err) {
    console.error("Fetch error:", err);
    return { props: { song: null, error: "Không thể kết nối tới API Kie.ai." } };
  }
}

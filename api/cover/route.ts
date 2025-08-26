import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await axios.post(
      "https://api.kie.ai/suno/cover",
      body,
      {
        headers: {
          Authorization: `Bearer ${process.env.KIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
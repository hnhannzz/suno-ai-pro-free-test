import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const res = await axios.get("https://api.kie.ai/suno/project/list", {
      headers: {
        Authorization: `Bearer ${process.env.KIE_API_KEY}`,
      },
    });
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
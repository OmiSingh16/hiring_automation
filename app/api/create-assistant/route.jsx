import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const VAPI_API_KEY = process.env.VAPI_API_KEY;
    if (!VAPI_API_KEY) {
      return NextResponse.json({ error: "Missing VAPI_API_KEY" }, { status: 500 });
    }

    // Call Vapi API to create assistant
    const vapiResponse = await fetch("https://api.vapi.ai/assistants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${VAPI_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await vapiResponse.json();

    if (!vapiResponse.ok) {
      return NextResponse.json({ error: data.error || "Vapi API error", details: data }, { status: vapiResponse.status });
    }

    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

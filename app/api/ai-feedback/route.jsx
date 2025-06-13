import { FEEDBACK_PROMPT } from "@/services/Constants";
import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    if (!conversation || !Array.isArray(conversation)) {
      return NextResponse.json(
        { error: "Invalid or missing 'conversation' data" },
        { status: 400 }
      );
    }

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      '{{conversation}}',
      JSON.stringify(conversation)
    );

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (e) {
    console.error("AI Feedback Error:", e);
    return NextResponse.json(
      { error: "AI feedback generation failed", details: e?.message || e },
      { status: 500 }
    );
  }
}

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client with anon key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { userName, userEmail, interview_id, feedback, recommendation } = await req.json();

    // Validate required fields
    if (!interview_id || !feedback) {
      return NextResponse.json(
        { error: "Missing interview_id or feedback" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("interview_feedback").insert([
      {
        userName,
        userEmail,
        interview_id,
        feedback, // should be a valid JSON object
        recommendation: recommendation ?? false,
      },
    ]);

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: "Database insert failed" }, { status: 500 });
    }

    return NextResponse.json({
      message: "Feedback saved successfully",
      data,
    });
  } catch (err) {
    console.error("Save Feedback Error:", err);
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}

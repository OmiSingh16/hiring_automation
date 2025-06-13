import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { username, jobposition, questions } = await req.json();

    if (!username || !jobposition || !questions) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Split questions string by pipe (|) if it is string, else if already array, use directly
    const questionsArray = Array.isArray(questions)
      ? questions
      : questions.split('|').map(q => q.trim());

    // Create nodes for each question
    const questionNodes = questionsArray.map((q, i) => ({
      type: "conversation",
      name: `question_${i + 1}`,
      prompt: `You are the interviewer. Do not paraphrase or change the question. Ask exactly: "${q.trim()}"`
    }));

    // Build the nodes array with start and wrap_up nodes
    const nodes = [
      {
        type: "conversation",
        name: "start",
        isStart: true,
        prompt: `Hi ${username}, welcome to your interview for the ${jobposition} role! Let's begin.`
      },
      ...questionNodes,
      {
        type: "conversation",
        name: "wrap_up",
        prompt: `Thanks for completing the interview, ${username}! We'll get back to you soon. Please end the call to submit the interview.`
      }
    ];

    // Create edges to chain nodes
    const edges = [
      { from: "start", to: "question_1" },
      ...questionNodes.map((_, i) => ({
        from: `question_${i + 1}`,
        to: i + 1 < questionNodes.length ? `question_${i + 2}` : "wrap_up"
      }))
    ];

    const workflowJson = {
      name: `Interview: ${username} - ${jobposition}`,
      nodes,
      edges
    };

    

    const res = await fetch("https://api.vapi.ai/workflow", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(workflowJson)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Vapi API error response:", JSON.stringify(data, null, 2));
      return NextResponse.json({ error: data }, { status: res.status });
    }

    return NextResponse.json({ success: true, workflowId: data.id });
  } catch (err) {
    console.error("Unexpected server error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

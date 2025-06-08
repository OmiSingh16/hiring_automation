import { NextResponse } from "next/server";

// Helper function to call Vapi v1 API
async function callVapi(path, method, body) {
  const res = await fetch(`https://api.vapi.ai/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(JSON.stringify(error));
  }

  return res.json();
}

export async function POST(req) {
  try {
    const { userName, jobTitle, questions } = await req.json();

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: "No questions provided" }, { status: 400 });
    }

    // 1️⃣ Create Assistant
    const assistant = await callVapi("/assistant", "POST", {
      name: "AI Recruiter",
      voice: {
        provider: "11labs",
        voiceId: "mrb-11labs",
      },
      firstMessage: `Hi ${userName}, I'm your AI interviewer for the ${jobTitle} position. I will ask you a series of questions.`,
      model: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `You are a friendly AI interviewer. Ask the following questions one by one, wait for the answer, give brief feedback, and proceed to the next question: ${questions.join(
              " | "
            )}. Keep the tone professional and concise.`,
          },
        ],
      },
    });

    // 2️⃣ Build workflow nodes and edges
    const nodes = questions.map((_, i) => ({
      type: "conversation",
      name: `q${i + 1}`,
    }));

    // Add start node at beginning
    nodes.unshift({
      type: "start",
      name: "start",
    });

    // Create linear edges: start → q1 → q2 → ...
    const edges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({
        from: nodes[i].name,
        to: nodes[i + 1].name,
      });
    }

    // 3️⃣ Create Workflow
    const workflow = await callVapi("/workflow", "POST", {
      name: `Interview for ${userName}`,
      nodes,
      edges,
    });

    // ✅ Done — Return Assistant and Workflow
    return NextResponse.json(
      {
        assistantId: assistant.id,
        workflowId: workflow.id,
        message: "Assistant and workflow created successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("🚨 Backend error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}

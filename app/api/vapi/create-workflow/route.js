import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { username, jobposition, questions } = await req.json();

    if (!username || !jobposition || !questions) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const questionsArray = Array.isArray(questions)
      ? questions
      : questions.split('|').map((q) => q.trim());

    const questionVariables = {};
    questionsArray.forEach((q, i) => {
      questionVariables[`question_${i + 1}`] = q;
    });

    const questionNodes = questionsArray.slice(1).map((q, i) => ({
      name: `question_${i + 2}`,
      type: 'conversation',
      metadata: { position: { x: (i + 1) * 300, y: 100 } },
      prompt: 'You are interviewer, ask the question and listen carefully.',
      model: {
        model: 'gpt-4o',
        provider: 'openai',
        maxTokens: 250,
        temperature: 0.3
      },
      variableExtractionPlan: {
        output: [
          {
            type: 'string',
            title: 'answer',
            description: ''
          }
        ]
      },
      messagePlan: {
        firstMessage: `Our next question is: {{question_${i + 2}}}`
      }
    }));

    const nodes = [
      {
        name: 'introduction',
        type: 'conversation',
        isStart: true,
        metadata: { position: { x: -400, y: -200 } },
        prompt: 'Introduce and ask the first question directly.',
        model: {
          model: 'gpt-4o',
          provider: 'openai',
          maxTokens: 250,
          temperature: 0.3
        },
        variableExtractionPlan: {
          output: [
            {
              type: 'string',
              title: 'answer',
              description: ''
            }
          ]
        },
        messagePlan: {
          firstMessage: `Hi {{username}}, welcome to your interview for the {{jobposition}} role. Let's begin! Our first question is: {{question_1}}`
        }
      },
      ...questionNodes,
      {
        name: 'wrap_up',
        type: 'conversation',
        metadata: { position: { x: questionsArray.length * 300, y: 300 } },
        prompt: 'Say goodbye and end the interview.',
        messagePlan: {
          firstMessage: `Thanks for completing the interview, {{username}}! We'll get back to you soon. Please end the call to submit the interview.`
        }
      }
    ];

    const edges = [
      { from: 'introduction', to: 'question_2' },
      ...questionNodes.map((_, i) => ({
        from: `question_${i + 2}`,
        to: i + 2 < questionsArray.length ? `question_${i + 3}` : 'wrap_up'
      }))
    ];

    const workflowJson = {
      name: `Interview: ${username} - ${jobposition}`,
      nodes,
      edges,
      globalPrompt: ''
    };

    const res = await fetch('https://api.vapi.ai/workflow', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workflowJson)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Vapi API error response:', JSON.stringify(data, null, 2));
      return NextResponse.json({ error: data }, { status: res.status });
    }

    return NextResponse.json({
      success: true,
      workflowId: data.id,
      variableValues: {
        username,
        jobposition,
        ...questionVariables
      }
    });
  } catch (err) {
    console.error('Unexpected server error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

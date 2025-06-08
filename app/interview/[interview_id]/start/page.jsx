"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null);
  const callStartedRef = useRef(false);

  // Error handler with filtering
  const onError = (error) => {
    if (error?.errorMsg === "Meeting has ended") {
      console.log("Meeting ended error ignored.");
      // Reset callStarted to allow new calls if needed
      callStartedRef.current = false;
      return;
    }
    console.error("Vapi error:", error);
  };

  // Start Vapi call function
  const startCall = () => {
    if (callStartedRef.current) {
      console.log("Call already started, skipping start.");
      return;
    }

    if (!interviewInfo) {
      console.warn("No interviewInfo available, cannot start call.");
      return;
    }

    const questionList = interviewInfo?.interviewData?.questionList
      ?.map((item) => item?.question)
      .join(", ");

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobposition}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "Jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.

Your job is to ask candidates the provided interview questions and assess their responses.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${interviewInfo?.interviewData?.jobposition} interview. Let's get started with a few questions!"

Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below are the questions:
Questions: ${questionList}

If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer. Examples:
"Nice! That's a solid answer."
or
"Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging—use casual phrases like
"Alright, next up..." or "Let's tackle a tricky one!"

After 5–7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:
- Be friendly, engaging, and witty
- Keep responses short and natural, like a real conversation
- Adapt based on the candidate's confidence level
- Ensure the interview remains focused on React.
            `.trim(),
          },
        ],
      },
    };

    try {
      vapiRef.current.start(assistantOptions);
      callStartedRef.current = true;
      console.log("🎤 Vapi call started");
    } catch (error) {
      console.error("Failed to start Vapi call:", error);
    }
  };

  useEffect(() => {
    // Create Vapi instance once
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);

      vapiRef.current.on("error", onError);
      vapiRef.current.on("call-ended", () => {
        callStartedRef.current = false;
        console.log("Call ended");
      });
    }

    // Start call only if interviewInfo is ready
    if (interviewInfo) {
      startCall();
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.off("error", onError);
        vapiRef.current.off("call-ended");
        vapiRef.current.dispose();
        vapiRef.current = null;
        callStartedRef.current = false;
        console.log("Cleaned up Vapi instance");
      }
    };
  }, [interviewInfo]);

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          00.00.00
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        {/* AI Recruiter */}
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <Image
            src={"/ai.png"}
            alt="ai"
            width={100}
            height={100}
            className="w-[160px] h-[160px] rounded-full object-cover border border-gray-600"
            priority
          />
          <h2>AI Recruiter</h2>
        </div>

        {/* User */}
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <h2 className="text-7xl bg-primary text-white p-8 rounded-full px-10">
            {interviewInfo?.userName?.[0] || "U"}
          </h2>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-5 justify-center mt-7">
        <Mic
          className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer"
          onClick={startCall}
        />

        <Phone className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer" />
      </div>

      <h2 className="text-sm mt-5 text-center text-gray-500">
        Interview in progress...
      </h2>
    </div>
  );
}

export default StartInterview;

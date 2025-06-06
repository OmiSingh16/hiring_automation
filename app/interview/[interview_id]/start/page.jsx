"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import Vapi from "@vapi-ai/web";
import Image from "next/image";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null);
  const timerRef = useRef(null);

  const [callStarted, setCallStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Init Vapi only once
    if (!vapiRef.current) {
      vapiRef.current = new Vapi({
        apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY,
      });
    }

    // Start call only if interview info exists and not already started
    if (interviewInfo && !callStarted) {
      startCall();
    }

    // Clean up on unmount
    return () => {
      if (vapiRef.current) vapiRef.current.stop();
      clearInterval(timerRef.current);
    };
  }, [interviewInfo]);

  const startCall = () => {
    const questions = interviewInfo?.interviewData?.questionList;

    if (!questions || questions.length === 0) {
      console.warn("No questions available");
      return;
    }

    if (!questions || questions.length === 0) {
     return (
     <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl">No questions available for this interview.</h2>
    </div>
     );
    }

    const steps = questions.map((item) => ({
      type: "say",
      text: item?.question,
    }));

    steps.unshift({
      type: "say",
      text: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobposition}? Let's begin.`,
    });

    steps.push({
      type: "say",
      text: "This concludes your interview. Thank you for your time!",
    });

    try {
      vapiRef.current.start({
        workflow: {
          name: "Inline Interview",
          steps,
        },
        voice: {
          provider: "playht",
          voiceId: "Jennifer",
        },
        model: {
          provider: "openai",
          model: "gpt-4",
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
      });

      setCallStarted(true);
      setElapsedTime(0);
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Vapi start error:", error);
    }
  };

  const stopCall = () => {
    if (vapiRef.current) vapiRef.current.stop();
    setCallStarted(false);
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between items-center">
        AI Interview Session
        <span>
          {callStarted
            ? `Interview in progress... ⏱️ ${formatTime(elapsedTime)}`
            : "Preparing interview..."}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <Image
            src="/ai.png"
            alt="AI Recruiter"
            className="w-[160px] h-[160px] rounded-full object-cover border border-gray-600"
            width={160}
            height={160}
          />
          <h2>AI Recruiter</h2>
        </div>

        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <h2 className="text-7xl bg-primary text-white p-8 rounded-full px-10">
            {interviewInfo?.userName?.[0] || "U"}
          </h2>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      {callStarted && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={stopCall}
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            ❌ Stop Interview
          </button>
        </div>
      )}
    </div>
  );
}

export default StartInterview;

"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter, useSearchParams } from "next/navigation";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const [vapi] = useState(() => new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY));
  const [callStatus, setCallStatus] = useState("idle");
  const [timer, setTimer] = useState(0);
  const [speakingAgent, setSpeakingAgent] = useState(false);
  const [speakingUser, setSpeakingUser] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [isEnding, setIsEnding] = useState(false);

  const { interview_id } = useParams();
  const searchParams = useSearchParams();
  const userName = searchParams.get("user") || "Candidate";
  const router = useRouter();

  useEffect(() => {
    let interval;
    if (callStatus === "active") {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  useEffect(() => {
    if (!vapi) return;

    const handleError = (error) => {
      fetch("/api/log-error", {
        method: "POST",
        body: JSON.stringify({
          error: error.message,
          timestamp: new Date().toISOString(),
        }),
      });
    };

    const handleCallStart = () => setCallStatus("active");
    const handleCallEnd = () => setCallStatus("ended");
    const handleAgentStart = () => setSpeakingAgent(true);
    const handleAgentStop = () => setSpeakingAgent(false);
    const handleUserStart = () => setSpeakingUser(true);
    const handleUserStop = () => setSpeakingUser(false);
    const handleMessage = (message) => {
      if (message?.conversation) {
        setConversation(message.conversation);
      }
    };

    vapi.on("error", handleError);
    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleAgentStart);
    vapi.on("speech-end", handleAgentStop);
    vapi.on("user-start-speaking", handleUserStart);
    vapi.on("user-stop-speaking", handleUserStop);
    vapi.on("message", handleMessage);

    return () => {
      vapi.off("error", handleError);
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("speech-start", handleAgentStart);
      vapi.off("speech-end", handleAgentStop);
      vapi.off("user-start-speaking", handleUserStart);
      vapi.off("user-stop-speaking", handleUserStop);
      vapi.off("message", handleMessage);
    };
  }, [vapi]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startCall = async () => {
    if (!interviewInfo) return console.error("No interview info available");
    setCallStatus("loading");

    try {
      const questionsArray = interviewInfo.interviewData?.questionList?.map((item) => item?.question);
      const questions = questionsArray.join("|");

      const res = await fetch("/api/vapi/create-workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: interviewInfo.userName,
          jobposition: interviewInfo.interviewData?.jobposition,
          questions,
        }),
      });

      const data = await res.json();
      if (!data.success || !data.workflowId) {
        throw new Error("Failed to create workflow: " + (data.error || "Unknown error"));
      }

      await vapi.start(undefined, undefined, undefined, data.workflowId, {
        variableValues: {
          username: interviewInfo.userName,
          jobposition: interviewInfo.interviewData?.jobposition,
          ...data.variableValues // Spread all dynamic question_1,2,3... values
        },
      });
    } catch (error) {
      console.error("❌ Failed to start Vapi call:", error);
      setCallStatus("idle");
    }
  };

  const endCall = async () => {
    setIsEnding(true);
    try {
      await vapi.stop();
      toast.success("Call ended");
      await GenerateFeedback();
    } catch (error) {
      console.error("❌ Failed to end call:", error);
      toast.error("Failed to end call");
    } finally {
      setIsEnding(false);
      setCallStatus("ended");
    }
  };

  const GenerateFeedback = async () => {
    if (!conversation || conversation.length === 0) {
      toast.error("No conversation found. Cannot generate feedback.");
      return;
    }

    try {
      const result = await axios.post("/api/ai-feedback", { conversation });
      const content = result?.data?.content;

      if (!content) throw new Error("No content returned from feedback API");

      const parsed = JSON.parse(content.replace("```json", "").replace("```", ""));

      await axios.post("/api/save-feedback", {
        userName: interviewInfo?.userName,
        userEmail: interviewInfo?.userEmail,
        interview_id,
        feedback: parsed,
        recommendation: false,
      });

      router.replace(`/interview/${interview_id}/completed?user=${interviewInfo?.userName}&feedback=saved`);
    } catch (error) {
      console.error("❌ Feedback generation failed:", error);
      toast.error("Failed to generate feedback");
    }
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          {formatTime(timer)}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        {/* AI Recruiter */}
        <div className={`bg-white h-[350px] rounded-lg border flex flex-col gap-3 items-center justify-center transition-all duration-300 ${speakingAgent ? "ring-4 ring-blue-400 shadow-lg scale-105" : ""}`}>
         <Image
              src={"/ai.jpg"}
              alt="ai"
              width={100}
              height={100}
              className="w-[130px] h-[130px] rounded-full object-cover border border-gray-600 brightness-130"
              priority
            />

          <h2>AI Recruiter</h2>
          <p className="text-sm text-gray-500">
            {callStatus === "active" ? "Speaking..." : "Ready to interview"}
          </p>
        </div>

        {/* User */}
        <div className={`bg-white h-[350px] rounded-lg border flex flex-col gap-3 items-center justify-center relative transition-all duration-300 ${callStatus === "active" && !speakingAgent ? "ring-4 ring-green-400 shadow-lg scale-105" : ""}`}>
          <div className="relative w-[120px] h-[120px] flex items-center justify-center">
            <div className="w-[100px] h-[100px] flex items-center justify-center text-5xl bg-primary text-white rounded-full z-10 relative">
              {interviewInfo?.userName?.[0]?.toUpperCase() || "U"}
            </div>
          </div>
          <h2>{interviewInfo?.userName || "User"}</h2>
          <p className="text-sm text-gray-500">
            {callStatus === "active" ? "Microphone active" : "Waiting..."}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center mt-7">
        {callStatus === "active" || isEnding ? (
          <button
            onClick={!isEnding ? endCall : undefined}
            disabled={isEnding}
            className="bg-red-500 text-white rounded-full p-3"
          >
            {isEnding ? (
              <Loader2Icon className="animate-spin h-6 w-6" />
            ) : (
              <Phone className="h-6 w-6" />
            )}
          </button>
        ) : (
          <button
            onClick={startCall}
            disabled={callStatus === "loading"}
            className={`bg-green-500 text-white rounded-full p-3 ${callStatus === "loading" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {callStatus === "loading" ? (
              <Loader2Icon className="animate-spin h-6 w-6" />
            ) : (
              <Phone className="h-6 w-6" />
            )}
          </button>
        )}
      </div>

      <h2 className="text-sm mt-5 text-center text-gray-500">
        {callStatus === "idle" && "Ready to start interview"}
        {callStatus === "loading" && "Initializing interview..."}
        {callStatus === "active" && "Interview in progress..."}
        {callStatus === "ended" && "Interview completed"}
      </h2>
    </div>
  );
}

export default StartInterview;

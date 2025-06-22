"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

function InterviewComplete() {
  const searchParams = useSearchParams();
  const userName = searchParams.get("user") || "Candidate";
  const userEmail = searchParams.get("email") || "";
  const interviewId = searchParams.get("interview_id");
  const feedbackStatus = searchParams.get("feedback");
  const recommendation = searchParams.get("recommendation") === "true";

  const conversation =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("conversation") || "[]")
      : [];

  // ✅ Auto-close tab after 10 seconds
 

  // ✅ Generate and save feedback
  useEffect(() => {
    const generateAndSaveFeedback = async () => {
      if (!interviewId) {
        toast.error("Missing interview ID. Feedback not saved.");
        return;
      }

      try {
        const aiResponse = await fetch("/api/ai-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conversation }),
        });

        const aiData = await aiResponse.json();
        if (!aiResponse.ok) {
          throw new Error(aiData.error || "AI feedback generation failed");
        }

        const saveRes = await fetch("/api/save-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName,
            userEmail,
            interview_id: interviewId,
            feedback: aiData,
            recommendation,
          }),
        });

        if (saveRes.ok) {
          toast.success("Interview feedback saved successfully.");
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("feedback", "saved");
          window.history.replaceState(null, "", newUrl.toString());
          localStorage.removeItem("conversation");
        } else {
          toast.error("Failed to save feedback.");
        }
      } catch (err) {
        console.error("Feedback error:", err);
        toast.error("Error generating or saving feedback.");
      }
    };

    if (feedbackStatus !== "saved") {
      generateAndSaveFeedback();
    } else {
      toast.success("Your interview feedback was saved successfully.");
    }
  }, [feedbackStatus, userName, userEmail, interviewId, recommendation]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-white to-blue-50 text-center"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
        🎉 Interview Completed!
      </h1>

      <p className="text-gray-600 text-lg mb-8">
        Thank you, <span className="font-semibold">{userName}</span>. Your interview session has ended.
      </p>

      <Image
        src="/success.jpg"
        alt="Interview Completed"
        width={300}
        height={300}
        className="mb-10 h-80 w-138 rounded-2xl object-cover"
        priority
      />

      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-2 text-green-600">What’s next?</h2>
        <p className="text-gray-700">
          We’ve saved your responses and our AI will analyze your performance shortly.
          You'll receive detailed feedback soon. Stay tuned!
        </p>
      </div>


      <div className="bg-primary shadow-md rounded-2xl p-3 w-fit mt-8">
        
        <p className="text-white">
          Interview session ended. You may now close this tab.
        </p>
      </div>

      
    </motion.div>
  );
}

export default InterviewComplete;

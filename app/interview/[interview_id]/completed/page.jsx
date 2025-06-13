"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

function InterviewComplete() {
  const searchParams = useSearchParams();
  const userName = searchParams.get("user") || "Candidate";
  const feedbackStatus = searchParams.get("feedback");

  useEffect(() => {
    if (feedbackStatus === "saved") {
      toast.success(" Your interview feedback was saved successfully.");
    }
  }, [feedbackStatus]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-white to-blue-50 text-center"
    >
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
        🎉 Interview Completed!
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg mb-8">
        Thank you, <span className="font-semibold">{userName}</span>. Your interview session has ended.
      </p>

      {/* Center Image */}
      <Image
        src="/success.jpg"
        alt="Interview Completed"
        width={300}
        height={300}
        className="mb-10 h-80 w-138 rounded-2xl object-cover"
        priority
      />

      {/* Info box */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-2 text-green-600">What’s next?</h2>
        <p className="text-gray-700">
          We’ve saved your responses and our AI will analyze your performance shortly.
          You'll receive detailed feedback soon. Stay tuned!
        </p>
      </div>

      {/* Home Button */}
      <div className="mt-8">
        <Button onClick={() => window.location.href = "/"}>
          Go Back Home
        </Button>
      </div>
    </motion.div>
  );
}

export default InterviewComplete;

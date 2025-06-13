"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDataContext";

function Interview() {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);

  const router = useRouter();

  useEffect(() => {
    if (interview_id) GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from("Interviews")
        .select("jobposition,jobDescription,duration,type")
        .eq("interview_id", interview_id);

      if (!Interviews || Interviews.length === 0) {
        toast.error("Incorrect Interview Link");
        setLoading(false);
        return;
      }

      setInterviewData(Interviews[0]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error("Incorrect Interview Link");
    }
  };

  const onJoinInterview = async () => {
    if (!userName) {
      toast.error("Please enter your full name.");
      return;
    }
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from("Interviews")
        .select("*")
        .eq("interview_id", interview_id);

      if (error || !Interviews || Interviews.length === 0) {
        toast.error("Failed to load interview info.");
        setLoading(false);
        return;
      }

      setInterviewInfo({
        userName: userName,
        userEmail:userEmail,
        interviewData: Interviews[0],
      });
      router.push(`/interview/${interview_id}/start`);
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-80 mt-7">
      <div className="flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-33 xl:px-52 mb-20">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="w-[140px]"
          priority
        />
        <h2 className="mt-3">AI-Powered Interview Platform</h2>
        <Image
          src={"/interview.png"}
          alt="logo"
          width={500}
          height={500}
          className="w-[280px] my-6"
          priority
        />

        <h2 className="font-bold text-xl">{interviewData?.jobposition}</h2>
        <h2 className="flex gap-2 items-center text-gray-500 mt-3">
          <Clock className="h-4 w-4" />
          {interviewData?.duration}
        </h2>
        <div className="w-full">
          <h2>Enter your full name</h2>
          <Input
            placeholder="e.g Om Prakash"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <h2 className="mt-4">Enter your Email</h2>
          <Input
            placeholder="e.g om@gmail.com"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <div className="p-3 bg-blue-100 flex gap-4 rounded-lg mt-3">
          <Info className="text-primary mt-1" />
          <div>
            <h2 className="font-bold mb-2">Before you begin</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li className="text-sm text-primary">
                Ensure you have a stable internet connection
              </li>
              <li className="text-sm text-primary">
                Find a quiet environment for the interview
              </li>
              <li className="text-sm text-primary">
                Use a device with a working microphone and camera
              </li>
            </ul>
          </div>
        </div>
        <Button
          className="mt-5 w-full font-bold"
          disabled={loading || !userName || !userEmail}
          onClick={onJoinInterview}
        >
          <Video />
          {loading && <Loader2Icon className="animate-spin ml-2" />}
          Join Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;

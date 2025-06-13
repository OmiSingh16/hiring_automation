"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";

function HeroSection() {
  const [showVideo, setShowVideo] = useState(false);
  const router = useRouter();

  // 🔐 Handle Create Interview Button
  const handleCreateInterview = async () => {
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    router.push("/dashboard/create-interview");
  } else {
    localStorage.setItem("postLoginRedirect", "/dashboard/create-interview");
    router.push("/auth"); // take user to login
  }
};

  return (
    <section className="relative py-20 flex items-center justify-center w-full md:py-28 bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                AI-Powered <span className="text-primary"> Interview Assistant </span> for Modern Recruiters
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Let our AI voice agent conduct candidate interviews while you focus on finding the perfect match. Save time, reduce bias, and improve your hiring process.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                className="bg-primary text-primary-foreground hover:bg-blue-700"
                onClick={handleCreateInterview}
              >
                Create Interview <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => setShowVideo(true)}>Watch Demo</Button>
            </div>
          </div>

          <div className="mx-auto lg:mx-0 relative">
            <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg">
              <div className="group relative cursor-pointer" onClick={() => setShowVideo(true)}>
                <Image
                  src="/home.png"
                  alt="Home"
                  width={500}
                  height={500}
                  className="object-cover w-full h-88 rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
                  priority
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100">
                  <div className="flex size-28 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md">
                    <div className="relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]">
                      <Play className="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Video Player */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/70">
          <div className="relative w-[90%] max-w-3xl rounded-xl overflow-hidden shadow-2xl">
            <button
              className="absolute top-4 right-4 z-10 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
              onClick={() => setShowVideo(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <video
              src="/demo.mp4"
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default HeroSection;

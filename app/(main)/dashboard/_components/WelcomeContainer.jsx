"use client";
import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";

function WelcomeContainer() {
  const { user } = useUser();

  return (
    <div className="bg-white/70 backdrop-blur-md p-4 rounded-lg flex justify-between items-center border border-gray-200 shadow-sm transition-all">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome back, <span className="text-primary">{user?.name}</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          AI-Driven Interviews, Hassle-Free Hiring
        </p>
      </div>

      {user && (
        <Image
          src={user?.picture}
          alt="userAvatar"
          width={42}
          height={42}
          className="rounded-full border border-gray-300 hover:scale-105 transition-transform duration-300 shadow"
          priority
        />
      )}
    </div>
  );
}

export default WelcomeContainer;

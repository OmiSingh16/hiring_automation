"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

function Header() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDashboardClick = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.getUser();

    if (data?.user) {
      // User is logged in
      router.push("/dashboard");
    } else {
      // Not logged in → redirect to auth/login
      router.push("/auth");
    }

    setLoading(false);
  };

  return (
    <header className="border-b w-full bg-sky-100 shadow-md">
      <div className="px-10 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={140} height={200} priority />
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium hover:underline">Features</a>
          <a href="#how-it-works" className="text-sm font-medium hover:underline">How It Works</a>
          <a href="#pricing" className="text-sm font-medium hover:underline">Pricing</a>
        </nav>

        {/* Dashboard Button */}
        <div>
          <button
            onClick={handleDashboardClick}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary cursor-pointer text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            {loading ? "Checking..." : "Dashboard"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

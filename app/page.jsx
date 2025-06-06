"use client";
import ThemeToggleButton from "./_components/ThemeToggleButton";
import HeroCarousel from "./_components/HeroCarousel";
import FeatureGrid from "./_components/FeatureGrid";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
        <ThemeToggleButton />
      </div>

      <HeroCarousel />
      <FeatureGrid />
    </div>
  );
}

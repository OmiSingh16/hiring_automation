"use client";

import { useEffect, useState } from "react";
import HeroSection from "./_components/HeroSection";
import FeaturesSection from "./_components/FeaturesSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import CallToActionSection from "./_components/CallToActionSection";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

export default function Home() {

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

   return (
    <div >
      <div>
      <Header/>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CallToActionSection />
      <Footer/>
      </div>
    </div>
  );
}

"use client";

import React from "react";

import {  Clock, ChartBar, Users } from "lucide-react";



function FeaturesSection() {
   const features = [
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title: "Save Time",
      description: "Automate initial screening interviews and focus on final candidates."
    },
    {
      icon: <ChartBar className="h-12 w-12 text-primary" />,
      title: "Data-Driven Insights",
      description: "Get detailed analytics and candidate comparisons based on interview responses."
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "Reduce Bias",
      description: "Standardized interviews help eliminate unconscious bias in the hiring process."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Streamline Your Hiring Process</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
              AiCruiter helps you save time and find better candidates with our advanced AI interview technology.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 mt-12 ">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white">
              {feature.icon}
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection

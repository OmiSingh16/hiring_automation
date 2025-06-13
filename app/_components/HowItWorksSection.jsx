"use client";

import React from "react";


function HowItWorksSection() {
   const steps = [
    {
      number: "1",
      title: "Create Interview",
      desc: "Set up your job requirements and customize interview questions."
    },
    {
      number: "2",
      title: "Share with Candidates",
      desc: "Send interview links to candidates to complete at their convenience."
    },
    {
      number: "3",
      title: "Review Results",
      desc: "Get AI-analyzed results, transcripts, and candidate comparisons."
    }
  ];

  return (
    <section id="how-it-works" className="flex items-center justify-center py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How AiCruiter Works</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Three simple steps to transform your recruitment process
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-900">
                <span className="text-xl font-bold">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-center text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection

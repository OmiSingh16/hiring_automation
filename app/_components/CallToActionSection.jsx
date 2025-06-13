
"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";


function CallToActionSection() {
  return (
    <section className="py-16 flex items-center justify-center md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Ready to Transform Your Hiring Process?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Join hundreds of companies already using AiCruiter to find the best talent.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/dashboard/create-interview">
            <Button className="bg-primary text-primary-foreground hover:bg-blue-700">Get Started for Free</Button>
            </Link>
            <Button variant="outline">Schedule a Demo</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToActionSection

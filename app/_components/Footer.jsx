"use client"

import React from 'react'
import { Mic } from "lucide-react";

function Footer() {
  return (
     <footer className="border-t flex items-center justify-center bg-gray-50">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex items-center gap-2">
          <Mic className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">AiCruiter</span>
        </div>
        <nav className="flex flex-wrap gap-4 md:gap-6">
          <a className="text-sm hover:underline" href="#">Terms</a>
          <a className="text-sm hover:underline" href="#">Privacy</a>
          <a className="text-sm hover:underline" href="#">Contact</a>
        </nav>
        <div className="text-sm text-gray-500">© 2025 AiCruiter. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer

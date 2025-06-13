'use client';

import { useState } from 'react';
import { Copy, Send } from 'lucide-react';

const interviews = [
  {
    date: '06 Jun 2025',
    role: 'Full Stack Developer',
    duration: '15 Min',
    link: 'https://yourapp.com/interview/123'
  },
  {
    date: '06 Jun 2025',
    role: 'Data Analyst',
    duration: '5 Min',
    link: 'https://yourapp.com/interview/124'
  },
  {
    date: '31 May 2025',
    role: 'Full Stack Developer',
    duration: '15 Min',
    link: 'https://yourapp.com/interview/125'
  }
];

export default function InterviewCard() {
  const [copiedLink, setCopiedLink] = useState(null);

  const handleCopy = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(link);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleSend = (link) => {
    alert(`Send logic triggered for: ${link}`);
    // Replace with actual send/email/share logic
  };

  return (
    
    <div className="my-5">
      <h2 className="font-bold text-2xl">Previously Created Interviews</h2>
      <div className="grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5">
        {interviews.map((interview, index) => (
          <div key={index} className="p-5 bg-white rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>
              <h2 className="text-sm">{interview.date}</h2>
            </div>

            <h2 className="mt-3 font-bold text-lg">{interview.role}</h2>
            <h2 className="mt-2 flex justify-between text-gray-500">
              {interview.duration}
            </h2>

            <div className="flex gap-3 w-full mt-5">
              <button
                onClick={() => handleCopy(interview.link)}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border cursor-pointer border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full text-primary"
              >
                <Copy className="size-4 shrink-0" />
                {copiedLink === interview.link ? 'Copied!' : 'Copy Link'}
              </button>

              <button
                onClick={() => handleSend(interview.link)}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary cursor-pointer text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
              >
                <Send className="size-4 shrink-0" />
                Send
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

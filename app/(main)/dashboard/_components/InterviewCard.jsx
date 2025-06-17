'use client';

import { useState } from 'react';
import { ArrowRight, Copy, Send ,SquareCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function InterviewCard({ interviews = [] , viewDetail=false }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (interview) => {
    const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(interview.interview_id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

 const handleSend = (interview) => {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/interview/${interview?.interview_id}`;
  const subject = encodeURIComponent("🚀 Your AiCruiter Interview Link");
  const body = encodeURIComponent(
    `Hi there,\n\n` +
    `🎯 You've been invited to an AI-powered interview.\n\n` +
    `🔗 Interview Link:\n${url}\n\n` +
    `⏳ This link is valid for 30 days.\n\n` +
    `Best,\nAiCruiter Team`
  );

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=lionking6299@gmail.com&su=${subject}&body=${body}`;
  window.open(gmailUrl, '_blank');
};



  return (
    <div className="grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5">
      {interviews.map((interview, index) => {
        const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview.interview_id}`;
        return (
          <div  key={index} className="p-5 bg-white rounded-lg border hover:scale-105 hover:shadow-lg transition-all duration-300">

            <div className="flex items-center justify-between">
              <div className="h-[40px] w-[40px] bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex p-2 items-center">

                <SquareCode className="text-white" />
              </div>
              <h2 className="text-sm">
                { new Date(interview.created_at).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </h2>
            </div>

            <h2 className="mt-3 font-bold text-lg">{interview.jobposition}</h2>
            <h2 className="mt-2 flex justify-between text-gray-500">
              {interview.duration || 'N/A'}
             {viewDetail && <span className='text-green-500'>{interview['interview_feedback']?.length} Candidates</span>}
            </h2>

           { !viewDetail? <div className="flex gap-3 w-full mt-5">
              <button
                onClick={() => handleCopy(interview)}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border cursor-pointer border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full text-primary"
              >
                <Copy className="size-4 shrink-0" />
                {copiedId === interview.interview_id ? 'Copied!' : 'Copy Link'}
              </button>

              <button
                onClick={() => handleSend(interview)}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary cursor-pointer text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
              >
                <Send className="size-4 shrink-0" />
                Send
              </button>
            </div> 
      : <Link href={'/schedule-interview/'+interview?.interview_id+'/details'}>
      <Button className='mt-5 w-full' variant='outline'>View Detail<ArrowRight/></Button>
        </Link>    
      }
          </div>
        );
      })}
    </div>
  );
}

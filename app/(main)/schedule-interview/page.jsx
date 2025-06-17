'use client'

import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Video } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect ,useState  }from 'react';
import InterviewCard from '../dashboard/_components/InterviewCard';

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList , setInterviewList]= useState([]); // ✅ Safe initial value

  useEffect(() => {
    if (user) GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const { data, error } = await supabase
      .from('Interviews')
      .select('jobposition,duration,interview_id,created_at,interview_feedback(userEmail)')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
    } else {
      console.log('Interview list:', data);
      setInterviewList(data || []);
    }
  };

  return (
    <div className='mt-5'>
      <h2 className='font-bold text-xl'>Interview List with Candidate Feedback</h2>
      {interviewList.length === 0 ? (
        <div className="p-5 flex flex-col gap-3 items-center mt-5 bg-white rounded-lg border">
          <Video className="h-10 w-10 text-primary" />
          <h2>You haven't created any Interview</h2>
          <Link href={"/dashboard/create-interview"}>
            <Button>+ Create New Interview</Button>
          </Link>
        </div>
      ) : (
        <InterviewCard interviews={interviewList} 
        viewDetail={true}/>
      )}
    </div>
  );
}

export default ScheduledInterview;

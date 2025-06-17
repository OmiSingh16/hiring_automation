"use client";
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import InterviewCard from '../dashboard/_components/InterviewCard';


function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user?.email) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    const { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('userEmail', user.email)
      .order('id',{ascending:false});
      
    if (error) {
      console.error('Error fetching interviews:', error);
    } else {
      setInterviewList(Interviews);
    }
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl">All Interviews</h2>

      {interviewList.length === 0 ? (
        <div className="p-5 flex flex-col gap-3 items-center mt-5 bg-white rounded-lg border">
          <Video className="h-10 w-10 text-primary" />
          <h2>You haven't created any Interview</h2>
          <Link href={"/dashboard/create-interview"}>
          <Button>+ Create New Interview</Button>
          </Link>
        </div>
      ) : (
        <InterviewCard interviews={interviewList} />
      )}
    </div>
  );
}
export default AllInterview

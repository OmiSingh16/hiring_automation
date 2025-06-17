'use client'
import { useUser } from '@/app/provider';
import { useParams } from 'next/navigation';
import React ,{useEffect , useState} from 'react';
import { supabase } from '@/services/supabaseClient';
import InterviewDetailCard from '../components/InterviewDetailContainer';

function InterviewDetail(){
 const {interview_id} = useParams();
 const {user} = useUser(); 
 const [interviewDetail, setInterviewDetail] = useState();


 useEffect(()=>{
  user && GetInterviewDetail();
 },[user])


 const GetInterviewDetail = async()=> {
  const { data, error } = await supabase
        .from('Interviews')
        .select('jobposition,duration,interview_id,created_at,type,jobDescription,questionList,interview_feedback(userEmail,userName , feedback , created_at)')
        .eq('userEmail', user?.email)
        .eq('interview_id',interview_id);

        
        
  
      if (error) {
        console.error('Supabase error:', error);
      } else {
        console.log('Interview Detail:', data);
        setInterviewDetail(data[0]);
        console.log(data)
      }
 };
  return(
    <div>
      
      <h2 className="font-bold text-2xl">Interview Detail</h2>
    
      <InterviewDetailCard interviewDetail={interviewDetail}/>
  
    </div>
  )
}

export default InterviewDetail
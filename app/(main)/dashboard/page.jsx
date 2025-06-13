import React from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewsList from './_components/LatestInterviewsList'
import InterviewCard from './_components/InterviewCard'

function Dashboard() {
  return (
    <div>
    {/*<WelcomeContainer/>*/}
    <h2 className='my-3 font-bold text-2xl'>Dashboard</h2>
    <CreateOptions/>
    <InterviewCard/>
    <LatestInterviewsList/>
    </div>
  )
}

export default Dashboard

import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className='grid grid-cols-2  gap-5 '>
      <div className='bg-white border-gray-200 rounded-lg p-5 flex flex-col gap-2 hover:shadow-xl transition-shadow duration-300'>
      <Link href={'/dashboard/create-interview'} className='bg-white border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer'>
        <Video className="p-3 text-primary bg-blue-50 rounded-lg h-12 w-12 transform transition-transform duration-300 hover:scale-110"/>
        <h2 className='font-bold'>Create New Interview</h2>
        <p className='text-gray-500'>Create Ai Interviews and schedule thrn with Candidates</p>
      </Link>
        </div>

       <div className='bg-white border-gray-200 rounded-lg p-10 flex flex-col gap-2 hover:shadow-xl transition-shadow duration-300'>
        <Phone className="p-3 text-primary bg-blue-50 rounded-lg h-12 w-12 transform transition-transform duration-300 hover:scale-110" />

        <h2 className='font-bold'>Create Phone Screening Call</h2>
        <p className='text-gray-500'>Schedule Phone screening call with candidates</p>
      </div>
    </div>
  )
}

export default CreateOptions

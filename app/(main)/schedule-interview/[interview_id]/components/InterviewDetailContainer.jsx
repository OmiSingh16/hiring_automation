'use client';

import React from 'react';
import { Clock, Calendar, Text } from 'lucide-react';
import CandidateList from './CandidateList';

function InterviewDetailCard({ interviewDetail }) {
  let questions = [];

  try {
    const qList = interviewDetail?.questionList;
    if (typeof qList === 'string') {
      questions = JSON.parse(qList);
    } else if (Array.isArray(qList)) {
      questions = qList;
    }
  } catch (error) {
    console.error('Error parsing questionList:', error);
  }

  return (
    <div className="mt-10">
      <div className="p-6 sm:p-8 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-xl border border-blue-100 transition-all duration-300 hover:shadow-2xl">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">
          {interviewDetail?.jobposition}
        </h2>

        {/* Meta Info */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm text-gray-500 mb-1">Duration</h4>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Clock className="h-4 w-4 text-blue-500" />
              {interviewDetail?.duration}
            </div>
          </div>

          <div>
            <h4 className="text-sm text-gray-500 mb-1">Created On</h4>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Calendar className="h-4 w-4 text-green-500" />
              {new Date(interviewDetail?.created_at).toLocaleDateString()}
            </div>
          </div>

          <div>
            <h4 className="text-sm text-gray-500 mb-1">Interview Type</h4>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Text className="h-4 w-4 text-purple-500" />
              {interviewDetail?.type}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6" />

        {/* Job Description */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Job Description</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-md border border-gray-200">
            {interviewDetail?.jobDescription}
          </p>
        </div>

        {/* Interview Questions */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Interview Questions</h3>
          {questions?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions.map((item, index) => (
                <div
                  key={index}
                  className="text-sm bg-white border border-blue-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-[1.02] text-blue-600"
                >
                  <span className="font-semibold text-primary mr-1">{index + 1}.</span>
                  {item.question}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-red-500">No questions found.</p>
          )}
        </div>

        {/* Candidate List */}
        <CandidateList candidateList={interviewDetail} />
      </div>
    </div>
  );
}

export default InterviewDetailCard;

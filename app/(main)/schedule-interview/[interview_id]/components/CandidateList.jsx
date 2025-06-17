import { Mail } from "lucide-react";
import React, { useState } from "react";

function CandidateList({ candidateList }) {
  const feedbackList = candidateList?.interview_feedback || [];
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleShow = (feedback) => {
    setSelectedFeedback(feedback);
    document.body.style.overflow = "hidden";
  };

  const handleHide = () => {
    setSelectedFeedback(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div>
      {/* Candidate Cards */}
      <div className="relative z-0">
        <h3 className="text-lg font-semibold mb-3">
          Candidates ({feedbackList.length})
        </h3>

        {feedbackList.map((candidate, index) => (
          <div
            key={index}
            className="p-5 mb-3 border rounded-lg bg-white flex justify-between items-start"
          >
            <div className="flex gap-3">
              <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
                {candidate?.userName?.[0] || "?"}
              </div>
              <div>
                <h2 className="font-bold text-sm">{candidate.userName}</h2>
                <p className="text-xs text-gray-600">{candidate.userEmail}</p>
                <p className="text-xs text-gray-400">
                  {new Date(candidate.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-center pt-3">
              <h3 className="text-green-500 border border-gray-500 rounded-lg px-4 py-1 inline-block text-sm font-semibold">
                {candidate.feedback?.overall_score}/10
              </h3>
              <button
                onClick={() => handleShow(candidate)}
                className="text-sm bg-primary text-white px-5 py-2 rounded hover:bg-indigo-400 transition"
              >
                View Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedFeedback && (
  <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm">
  <div className="min-h-screen flex items-center justify-center p-6">
    <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl relative border border-gray-200 scale-in-center animate-fadeIn">

      {/* Sticky Title */}
      <div className="sticky top-0 z-10 bg-white pb-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Feedback for {selectedFeedback.userName}
        </h2>
      </div>

      {/* Feedback Details */}
      {selectedFeedback.feedback ? (
        <div className="space-y-6 mt-4">
          {/* Strengths */}
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-green-700 text-lg">Strengths</h3>
            <ul className="list-disc pl-5 text-sm mt-2 text-gray-800">
              {selectedFeedback.feedback.strengths?.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold text-red-600 text-lg">Weaknesses</h3>
            <ul className="list-disc pl-5 text-sm mt-2 text-gray-800">
              {selectedFeedback.feedback.weaknesses?.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Overall Score */}
          <div className="border-l-4 border-gray-500 pl-4">
            <h3 className="font-semibold text-gray-700 text-lg mb-1">
              Overall Score
            </h3>
            <span className="text-white bg-green-500 px-4 py-1 rounded-full text-sm font-semibold inline-block">
              {selectedFeedback.feedback.overall_score}/10
            </span>
          </div>

          {/* Suggestions */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-blue-700 text-lg">Improvement Suggestions</h3>
            <ul className="list-disc pl-5 text-sm mt-2 text-gray-800">
              {selectedFeedback.feedback.improvement_suggestions?.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Recommendation */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold text-purple-700 text-lg mb-1">
              Final Recommendation
            </h3>
            <p className="text-sm text-gray-800">
              {selectedFeedback.feedback.recommendation}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-600 my-6">No structured feedback available.</p>
      )}

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-0 bg-white pt-4 mt-8 flex justify-end gap-4 border-t">
        {selectedFeedback.feedback && (
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${selectedFeedback.userEmail}&su=${
              selectedFeedback.feedback.overall_score > 5
                ? 'Congratulations! You are Selected 🎉'
                : 'Interview Result Update'
            }&body=${
              selectedFeedback.feedback.overall_score > 5
                ? `Dear ${selectedFeedback.userName},%0D%0A%0D%0ACongratulations! Based on your interview performance, we are pleased to offer you the position. Our team will reach out to you with further details.%0D%0A%0D%0ABest regards,%0D%0ARecruitment Team`
                : `Dear ${selectedFeedback.userName},%0D%0A%0D%0AThank you for attending the interview. We regret to inform you that you have not been selected for the position at this time. We encourage you to continue improving and apply again in the future.%0D%0A%0D%0ABest wishes,%0D%0ARecruitment Team`
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className={`flex gap-2 items-center px-4 py-2 rounded font-semibold text-white ${
                selectedFeedback.feedback.overall_score > 5
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {selectedFeedback.feedback.overall_score > 5
                ? "Offer Job"
                : "Rejected"}
                <Mail/>
            </button>
          </a>
        )}

        <button
          onClick={handleHide}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Hide Report
        </button>
      </div>
    </div>
  </div>
  </div>
)}
    </div>
  );
}

export default CandidateList;

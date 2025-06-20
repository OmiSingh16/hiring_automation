import React from "react";

function QuestionListContainer({ questionList }) {
  if (!Array.isArray(questionList) || questionList.length === 0) {
    return (
      <div>
        <h2 className="font-bold text-lg mb-5">No questions available.</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-lg mb-5">Generated Interview Questions:</h2>
      <div className="p-5 border border-gray-300 rounded-xl mt-4 bg-white">
        {questionList.map((item, index) => (
          <div
            key={index}
            className="p-3 border border-gray-200 rounded-xl mb-3"
          >
            <h2 className="font-medium">{item.question}</h2>
            <h2 className="font-sm text-primary">{item?.type}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionListContainer;

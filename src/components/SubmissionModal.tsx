import React from 'react';

interface SubmissionModalProps {
  totalQuestions: number;
  answeredQuestions: number;
  onClose: () => void;
  onSubmit: () => void;
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({
  totalQuestions,
  answeredQuestions,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Submit Exam
        </h3>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-600">
            Are you sure you want to submit your exam?
          </p>
          
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-indigo-700">Questions Answered</span>
              <span className="font-medium text-indigo-700">
                {answeredQuestions} / {totalQuestions}
              </span>
            </div>
            
            {answeredQuestions < totalQuestions && (
              <p className="text-sm text-red-600">
                Warning: You have {totalQuestions - answeredQuestions} unanswered questions.
              </p>
            )}
          </div>
        </div>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Review Answers
          </button>
          
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;
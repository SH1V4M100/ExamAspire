import React from 'react';
import { Question, UserAnswer } from '@/lib/types';

interface IntegerQuestionProps {
  question: Question;
  userAnswer?: UserAnswer;
  onAnswerChange: (questionId: string, selectedOptionIds: string[]) => void;
}

const IntegerQuestion: React.FC<IntegerQuestionProps> = ({ 
  question, 
  userAnswer, 
  onAnswerChange 
}) => {
  const handleOptionSelect = (optionId: string) => {
    onAnswerChange(question.id, [optionId]);
  };

  // Sort options numerically for integer questions
  const sortedOptions = [...question.options].sort((a, b) => {
    return parseInt(a.text) - parseInt(b.text);
  });

  return (
    <div className="space-y-6 text-black">
      <div className="text-lg font-medium mb-4">
        {question.questionText}
      </div>
      
      {question.image && (
        <div className="mb-4">
          <img 
            src={question.image.url} 
            alt={question.image.alt || 'Question image'} 
            className="max-w-full max-h-64 object-contain rounded-lg border border-gray-200"
          />
          {question.image.caption && (
            <p className="text-sm text-gray-600 mt-1">{question.image.caption}</p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {sortedOptions.map(option => {
          const isSelected = userAnswer?.selectedOptionIds.includes(option.id);

          return (
            <div
              key={option.id}
              className={`
                flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all
                ${isSelected 
                  ? 'bg-indigo-500 text-white font-medium shadow-md' 
                  : 'bg-white text-black border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                }
              `}
              onClick={() => handleOptionSelect(option.id)}
            >
              {option.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IntegerQuestion;

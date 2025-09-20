import React from 'react';
import { Question, UserAnswer } from '@/lib/types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface SingleChoiceQuestionProps {
  question: Question;
  userAnswer?: UserAnswer;
  onAnswerChange: (questionId: string, selectedOptionIds: string[]) => void;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({ 
  question, 
  userAnswer, 
  onAnswerChange 
}) => {
  const handleOptionSelect = (optionId: string) => {
    onAnswerChange(question.id, [optionId]);
  };

  return (
    <div className="space-y-6 text-black">
      {/* Question text with Markdown support */}
      <div className="text-lg font-medium mb-4">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {question.questionText}
        </ReactMarkdown>
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
      
      <div className="space-y-3">
        {question.options.map(option => {
          const isSelected = userAnswer?.selectedOptionIds.includes(option.id);
          
          return (
            <div
              key={option.id}
              className={`flex items-center p-4 rounded-lg cursor-pointer transition-all
                ${isSelected 
                  ? 'bg-indigo-50 border-2 border-indigo-500 shadow-sm' 
                  : 'bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                }
              `}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="flex items-center justify-center mr-3">
                <div 
                  className={`w-5 h-5 rounded-full border flex items-center justify-center
                    ${isSelected 
                      ? 'border-indigo-600 bg-indigo-600' 
                      : 'border-gray-300'
                    }
                  `}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>

              {/* Option text with Markdown support */}
              <div className="flex-1 text-black">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {option.text}
                </ReactMarkdown>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <button
          onClick={() => onAnswerChange(question.id, [])}
          className="px-3 py-1.5 text-sm rounded-md border border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm"
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
};

export default SingleChoiceQuestion;
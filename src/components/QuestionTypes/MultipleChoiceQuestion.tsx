import React from 'react';
import { Question, UserAnswer } from '@/lib/types';
import { Check } from 'lucide-react';

interface MultipleChoiceQuestionProps {
  question: Question;
  userAnswer?: UserAnswer;
  onAnswerChange: (questionId: string, selectedOptionIds: string[]) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ 
  question, 
  userAnswer, 
  onAnswerChange 
}) => {
  const handleOptionToggle = (optionId: string) => {
    const currentSelections = userAnswer?.selectedOptionIds || [];
    let newSelections: string[];

    if (currentSelections.includes(optionId)) {
      newSelections = currentSelections.filter(id => id !== optionId);
    } else {
      newSelections = [...currentSelections, optionId];
    }

    onAnswerChange(question.id, newSelections);
  };

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
      
      <div className="space-y-3">
        {question.options.map(option => {
          const isSelected = userAnswer?.selectedOptionIds.includes(option.id) || false;

          return (
            <div
              key={option.id}
              className={`flex items-center p-4 rounded-lg cursor-pointer transition-all
                ${isSelected 
                  ? 'bg-indigo-50 border-2 border-indigo-500 shadow-sm' 
                  : 'bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                }
              `}
              onClick={() => handleOptionToggle(option.id)}
            >
              <div className="flex items-center justify-center mr-3">
                <div 
                  className={`w-5 h-5 rounded flex items-center justify-center
                    ${isSelected 
                      ? 'border-indigo-600 bg-indigo-600' 
                      : 'border border-gray-300'
                    }
                  `}
                >
                  {isSelected && <Check size={14} className="text-white" />}
                </div>
              </div>
              <div className="flex-1 text-black">{option.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;

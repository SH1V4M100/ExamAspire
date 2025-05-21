import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, ImageIcon } from 'lucide-react';
import { Question, UserAnswer } from '../lib/types';

interface QuestionResultProps {
  question: Question;
  userAnswer?: UserAnswer;
  questionNumber: number;
}

const QuestionResult: React.FC<QuestionResultProps> = ({ question, userAnswer, questionNumber }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Determine if the answer is correct
  const correctOptionIds = question.options
    .filter(option => option.isCorrect)
    .map(option => option.id);
    
  const selectedOptionIds = userAnswer?.selectedOptionIds || [];
  
  const isCorrect = correctOptionIds.length === selectedOptionIds.length && 
                    correctOptionIds.every(id => selectedOptionIds.includes(id));
  
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start">
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {isCorrect ? (
            <Check className="w-4 h-4" />
          ) : (
            <X className="w-4 h-4" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="text-md font-medium text-gray-800">
              Question {questionNumber}: {question.questionText}
            </h4>
            <button 
              onClick={() => setExpanded(!expanded)}
              className="ml-2 p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Question image if available */}
          {question.image?.url && (
            <div className="mt-2 relative">
              <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-gray-100">
                <img 
                  src={question.image.url} 
                  alt={`Question ${questionNumber}`} 
                  className="object-contain w-full h-full"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.classList.add('hidden');
                    target.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                    const icon = document.createElement('div');
                    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>';
                    icon.className = 'text-gray-400';
                    target.parentElement?.appendChild(icon);
                  }}
                />
              </div>
            </div>
          )}
          
          {expanded && (
            <div className="mt-3 space-y-2 animate-fadeIn">
              {question.options.map((option) => {
                const isSelected = selectedOptionIds.includes(option.id);
                const isCorrectOption = option.isCorrect;
                
                let optionClass = 'border rounded-md p-3 flex items-start';
                
                if (isSelected && isCorrectOption) {
                  optionClass += ' bg-green-50 border-green-200';
                } else if (isSelected && !isCorrectOption) {
                  optionClass += ' bg-red-50 border-red-200';
                } else if (!isSelected && isCorrectOption) {
                  optionClass += ' bg-blue-50 border-blue-200';
                } else {
                  optionClass += ' border-gray-200';
                }
                
                return (
                  <div key={option.id} className={optionClass}>
                    <div className="flex-shrink-0 mr-3">
                      {isSelected && isCorrectOption && (
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                      )}
                      {isSelected && !isCorrectOption && (
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                          <X className="w-3 h-3 text-red-600" />
                        </div>
                      )}
                      {!isSelected && isCorrectOption && (
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                      )}
                      {!isSelected && !isCorrectOption && (
                        <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${isCorrectOption ? 'font-medium' : 'text-gray-700'}`}>
                        {option.text}
                      </p>
                      
                      {isSelected && !isCorrectOption && (
                        <p className="text-xs text-red-600 mt-1">Incorrect selection</p>
                      )}
                      {!isSelected && isCorrectOption && (
                        <p className="text-xs text-blue-600 mt-1">Correct answer</p>
                      )}
                    </div>
                  </div>
                );
              })}
              
              <div className="mt-4 text-sm text-gray-500">
                <div className="font-medium text-gray-700 mb-1">Answer Analysis:</div>
                <p>
                  {isCorrect 
                    ? 'You answered this question correctly.' 
                    : 'You missed this question. Review the correct answer(s) marked above.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionResult;
'use client'
import React, { useState, useEffect } from 'react';
import { Backpack as Backspace, RotateCcw, Minus, Plus, Check } from 'lucide-react';
import { Question, UserAnswer } from '@/lib/types';

interface IntegerQuestionProps {
  question: Question;
  userAnswer?: UserAnswer;
  onAnswerChange: (questionId: string, selectedOptionIds: string[]) => void;
}

const IntegerQuestion: React.FC<IntegerQuestionProps> = ({
  question,
  userAnswer,
  onAnswerChange,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isNegative, setIsNegative] = useState<boolean>(false);
  const [confirmedValue, setConfirmedValue] = useState<string>('');

  // Initialize input value from existing answer
  // useEffect(() => {
  //   const value = userAnswer?.selectedOptionIds?.[0];
  //   if (value !== undefined) {
  //     const numValue = parseInt(value);
  //     if (!isNaN(numValue)) {
  //       const absValue = Math.abs(numValue).toString();
  //       setInputValue(absValue);
  //       setIsNegative(numValue < 0);
  //       setConfirmedValue(value);
  //     }
  //   }
  // }, [userAnswer]);

  const handleNumberClick = (digit: string) => {console.log(userAnswer)
    setInputValue(prev => {
      if (prev === '0') return digit; // replace leading 0
      if (prev.length < 10) return prev + digit; // limit input length
      return prev;
    });
  };

  const handleDelete = () => {
    setInputValue(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setInputValue('');
    setIsNegative(false);
  };

  const handleToggleSign = () => {
    if (inputValue) {
      setIsNegative(prev => !prev);
    }
  };

  const handleConfirm = () => {
    const finalValue = inputValue
      ? (isNegative ? `-${inputValue}` : inputValue)
      : undefined;

    if (finalValue) {
  const matchingCorrectOption = question.options?.find(
    (opt) => opt.isCorrect && opt.text === finalValue
  );

  const selectedId = matchingCorrectOption?.id ?? finalValue;
console.log(selectedId)
  // ✅ Send ID to parent for evaluation logic
  onAnswerChange(question.id, [selectedId]);
console.log(finalValue)
  // ✅ Keep user-visible value for internal state and display
  setConfirmedValue(finalValue);
} else {
  onAnswerChange(question.id, []);
  setConfirmedValue('');
}

  };

  const getDisplayValue = () => {
    if (!inputValue) return '0';
    return isNegative ? `-${inputValue}` : inputValue;
  };

  const getCurrentInputValue = () => {
    return inputValue ? (isNegative ? `-${inputValue}` : inputValue) : '';
  };

  const hasChanges = () => {
    const currentInput = getCurrentInputValue();//console.log(currentInput,confirmedValue)
    return currentInput !== confirmedValue;
  };

  const numpadButtons = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: 'sign', label: '±', icon: isNegative ? Plus : Minus },
    { value: '0', label: '0' },
    { value: 'delete', label: 'Del', icon: Backspace },
  ];

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

      {/* Display Area */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-6">
        <div className="text-right">
          <div className="text-3xl font-mono font-bold text-gray-800 min-h-[2.5rem] flex items-center justify-end">
            {getDisplayValue()}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {inputValue ? 'Current input' : 'Enter your answer'}
          </div>
        </div>
      </div>

      {/* Numpad */}
      <div className="max-w-sm mx-auto">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {numpadButtons.map((button) => {
            const isSpecialButton = button.value === 'sign' || button.value === 'delete';
            const isDisabled = button.value === 'sign' && !inputValue;

            return (
              <button
                key={button.value}
                onClick={() => {
                  if (button.value === 'delete') {
                    handleDelete();
                  } else if (button.value === 'sign') {
                    handleToggleSign();
                  } else {
                    handleNumberClick(button.value);
                  }
                }}
                disabled={isDisabled}
                className={`
                  h-16 rounded-xl font-semibold text-lg transition-all duration-200 transform active:scale-95
                  ${isSpecialButton
                    ? `bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}`
                    : 'bg-white hover:bg-indigo-50 text-gray-800 border border-gray-300 hover:border-indigo-300 hover:shadow-md'
                  }
                  ${!isDisabled && 'hover:scale-105'}
                `}
              >
                {button.icon ? (
                  <button.icon className="w-5 h-5 mx-auto" />
                ) : (
                  button.label
                )}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={!inputValue}
            className={`
              w-full h-14 font-semibold rounded-xl transition-all duration-200 transform flex items-center justify-center gap-2
              ${inputValue
                ? 'bg-green-500 hover:bg-green-600 text-white hover:scale-105 active:scale-95 shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
              ${hasChanges() ? 'ring-2 ring-green-300 ring-opacity-50' : ''}
            `}
          >
            <Check className="w-5 h-5" />
            {hasChanges() ? 'Confirm Answer' : 'Confirmed'}
          </button>

          {/* Clear Button */}
          <button
            onClick={handleClear}
            className="w-full h-12 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-xl border border-red-300 hover:border-red-400 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      {/* Answer Status */}
      {confirmedValue && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
          <div className="text-sm text-green-700 font-medium">
            Confirmed Answer: <span className="text-lg font-bold">{confirmedValue}</span>
            {hasChanges() && (
              <span className="ml-2 text-xs text-orange-600 font-normal">
                (You have unsaved changes)
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegerQuestion;
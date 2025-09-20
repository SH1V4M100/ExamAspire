import React from 'react';
import { Question, UserAnswer } from '@/lib/types';
import SingleChoiceQuestion from './QuestionTypes/SingleChoiceQuestion';
import MultipleChoiceQuestion from './QuestionTypes/MultipleChoiceQuestion';
import IntegerQuestion from './QuestionTypes/IntegerQuestion';
import { Flag } from 'lucide-react';

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  userAnswer?: UserAnswer;
  onAnswerChange: (questionId: string, selectedOptionIds: string[]) => void;
  onFlagQuestion: (questionId: string) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  isLastQuestion: boolean;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  questionNumber,
  totalQuestions,
  userAnswer,
  onAnswerChange,
  onFlagQuestion,
  onNextQuestion,
  onPrevQuestion,
  isLastQuestion
}) => {
  const renderQuestionComponent = () => {
  switch (question.questionType) {
    case 'single 1':
    case 'single 2':
    case 'single 4':
      return (
        <SingleChoiceQuestion
          question={question}
          userAnswer={userAnswer}
          onAnswerChange={onAnswerChange}
        />
      );
    case 'multi':
      return (
        <MultipleChoiceQuestion
          question={question}
          userAnswer={userAnswer}
          onAnswerChange={onAnswerChange}
        />
      );
    case 'integer':
      return (
        <IntegerQuestion
          key={question.id}
          question={question}
          userAnswer={userAnswer}
          onAnswerChange={onAnswerChange}
        />
      );
    default:
      return <div>Unknown question type</div>;
  }
};

  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          Question {questionNumber} of {totalQuestions}
        </div>
        <button
          onClick={() => onFlagQuestion(question.id)}
          className={`
            flex items-center gap-1 px-3 py-1.5 rounded-full text-sm 
            transition-colors
            ${userAnswer?.isFlagged
              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          <Flag size={16} className={userAnswer?.isFlagged ? 'fill-amber-500' : ''} />
          {userAnswer?.isFlagged ? 'Flagged' : 'Flag for review'}
        </button>
      </div>
      
      {renderQuestionComponent()}
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevQuestion}
          className="px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          disabled={questionNumber === 1}
        >
          Previous
        </button>
        
        <button
          onClick={onNextQuestion}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isLastQuestion
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isLastQuestion ? 'Submit Exam' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuestionDisplay;
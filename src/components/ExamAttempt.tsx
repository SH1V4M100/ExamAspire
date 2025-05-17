import React, { useState, useEffect } from 'react';
import { Exam } from '@/lib/types';
import { useExamState } from '@/app/(frontend)/exams/useExamState';
import ExamHeader from './ExamHeader';
import ExamNavigation from './ExamNavigation';
import QuestionDisplay from './QuestionDisplay';
import SubmissionModal from './SubmissionModal';

interface ExamAttemptProps {
  exam: Exam;
}

const ExamAttempt: React.FC<ExamAttemptProps> = ({ exam }) => {
  const {
    examState,
    currentSection,
    currentQuestion,
    remainingTime,
    saveAnswer,
    toggleFlagQuestion,
    goToNextQuestion,
    goToPrevQuestion,
    goToSection,
    goToQuestion,
    sectionStats,
    totalProgress,
    getUserAnswer,
    submitExam,
    startExam,
    isExamStarted
  } = useExamState(exam);
  
  const [showInstructions, setShowInstructions] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleStartExam = () => {
    startExam();
    setShowInstructions(false);
  };

  // If we don't have a current section or question, show an error
  if (!currentSection || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Exam
          </h2>
          <p className="text-gray-600">
            Could not load exam questions. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Exam Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for completing the exam. Your responses have been recorded.
          </p>
          <div className="text-sm text-gray-500">
            You may now close this window.
          </div>
        </div>
      </div>
    );
  }
  
  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ExamHeader 
          title={exam.title} 
          remainingTime={isExamStarted ? remainingTime : exam.duration * 60} 
          totalProgress={totalProgress}
          isExamStarted={isExamStarted}
        />
        
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Exam Instructions
            </h2>
            
            {exam.instructions.length > 0 ? (
              <div className="space-y-4 mb-8">
                {exam.instructions.map((instruction, index) => (
                  <p key={index} className="text-gray-700">
                    {instruction}
                  </p>
                ))}
              </div>
            ) : (
              <div className="mb-8">
                <p className="text-gray-700">
                  Please read the following instructions carefully before starting the exam:
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-700">
                  <li>This exam contains {exam.sections.length} sections: {exam.sections.map(s => s.subject).join(', ')}.</li>
                  <li>Total duration for the exam is {exam.duration} minutes.</li>
                  <li>You can navigate between questions and sections using the navigation panel.</li>
                  <li>You can flag questions to review them later.</li>
                  {exam.isNegativeMarkingEnabled && (
                    <li className="text-red-600 font-medium">This exam has negative marking enabled. Wrong answers will deduct points.</li>
                  )}
                </ul>
              </div>
            )}
            
            <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg">
              <div>
                <p className="text-indigo-700 font-medium">
                  Time allotted: {exam.duration} minutes
                </p>
                <p className="text-sm text-indigo-600 mt-1">
                  Make sure you have a stable internet connection
                </p>
              </div>
              
              <button
                onClick={handleStartExam}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
const lastSection = exam.sections?.[exam.sections.length - 1];

const isLastQuestion =
  currentSection?.id === lastSection?.id &&
  currentSection?.questions &&
  examState.currentQuestionIndex === currentSection.questions.length - 1;

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setShowSubmitModal(true);
    } else {
      goToNextQuestion();
    }
  };

  const handleSubmitExam = () => {
    submitExam();
    setIsSubmitted(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <ExamHeader 
        title={exam.title} 
        remainingTime={isExamStarted ? remainingTime : exam.duration * 60} 
        totalProgress={totalProgress}
        isExamStarted={isExamStarted}
      />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:order-2 lg:flex-1">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <h2 className="text-lg font-medium text-gray-800 capitalize">
                {currentSection.subject} Section
              </h2>
            </div>
            
            <QuestionDisplay
              question={currentQuestion}
              questionNumber={examState.currentQuestionIndex + 1}
              totalQuestions={currentSection.questions.length}
              userAnswer={getUserAnswer(currentQuestion.id)}
              onAnswerChange={saveAnswer}
              onFlagQuestion={toggleFlagQuestion}
              onNextQuestion={handleNextQuestion}
              onPrevQuestion={goToPrevQuestion}
              isLastQuestion={isLastQuestion}
            />
          </div>
          
          <div className="lg:order-1">
            <ExamNavigation
              sections={exam.sections}
              currentSectionId={examState.currentSectionId}
              currentQuestionIndex={examState.currentQuestionIndex}
              answers={examState.answers}
              onNavigateToSection={goToSection}
              onNavigateToQuestion={goToQuestion}
            />
          </div>
        </div>
      </div>

      {showSubmitModal && (
        <SubmissionModal
          totalQuestions={exam.sections.reduce((total, section) => total + section.questions.length, 0)}
          answeredQuestions={Object.values(examState.answers).filter(a => a.selectedOptionIds.length > 0).length}
          onClose={() => setShowSubmitModal(false)}
          onSubmit={handleSubmitExam}
        />
      )}
    </div>
  );
};

export default ExamAttempt;
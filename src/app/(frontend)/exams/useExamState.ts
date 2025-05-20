import { useState, useEffect, useMemo } from 'react';
import { Exam, ExamAttemptState, UserAnswer } from '@/lib/types';
import { saveExamState, loadExamState, clearExamState } from '@/lib/utils';

export const useExamState = (exam: Exam) => {
  const initialState: ExamAttemptState = useMemo(() => {
    const savedState = loadExamState(exam.id);
    
    if (savedState) {
      // If we have a saved state with a start time, use it
      if (savedState.startTime) {
        return savedState;
      }
      // If we have saved state but no start time, keep the answers but reset the start time
      return {
        ...savedState,
        startTime: 0, // Will be set when exam starts
        examStarted: false
      };
    }
    
    return {
      examId: exam.id,
      answers: {},
      currentSectionId: exam.sections[0]?.id || '',
      currentQuestionIndex: 0,
      startTime: 0, // Will be set when exam starts
      examStarted: false
    };
  }, [exam.id, exam.sections]);

  const [examState, setExamState] = useState<ExamAttemptState>(initialState);
  
  // Start the exam - called when user clicks "Start Exam"
  const startExam = () => {
    setExamState(prev => ({
      ...prev,
      startTime: Date.now(),
      examStarted: true
    }));
  };

  // Calculate remaining time in seconds
  const remainingTime = useMemo(() => {
    if (!examState.examStarted) {
      return exam.duration * 60; // Return full duration if exam hasn't started
    }
    
    const elapsedMs = Date.now() - examState.startTime;
    const durationMs = exam.duration * 60 * 1000;
    const remainingMs = Math.max(0, durationMs - elapsedMs);
    return Math.floor(remainingMs / 1000);
  }, [exam.duration, examState.startTime, examState.examStarted]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveExamState(examState);
  }, [examState]);

  // Current section and question
  const currentSection = useMemo(() => 
    exam.sections.find(section => section.id === examState.currentSectionId),
  [exam.sections, examState.currentSectionId]);
  
  const currentQuestion = useMemo(() => {
    return currentSection?.questions[examState.currentQuestionIndex] || null;
  }, [currentSection, examState.currentQuestionIndex]);

  // Answer management
  const saveAnswer = (questionId: string, selectedOptionIds: string[]) => {
    setExamState(prev => {
      const existingAnswer = prev.answers[questionId];
      
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: {
            questionId,
            selectedOptionIds,
            isFlagged: existingAnswer?.isFlagged || false
          }
        }
      };
    });
  };

  const toggleFlagQuestion = (questionId: string) => {
    setExamState(prev => {
      const existingAnswer = prev.answers[questionId] || {
        questionId,
        selectedOptionIds: [],
        isFlagged: false
      };
      
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: {
            ...existingAnswer,
            isFlagged: !existingAnswer.isFlagged
          }
        }
      };
    });
  };

  // Navigation
  const goToNextQuestion = () => {
    if (!currentSection || !currentSection.questions) return;
  
    if (examState.currentQuestionIndex < currentSection.questions.length - 1) {
      setExamState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      // Go to next section if available
      const currentSectionIndex = exam.sections.findIndex(
        section => section.id === examState.currentSectionId
      );
  
      const nextSection = exam.sections[currentSectionIndex + 1];
      if (nextSection && nextSection.questions && nextSection.questions.length > 0) {
        setExamState(prev => ({
          ...prev,
          currentSectionId: nextSection.id,
          currentQuestionIndex: 0
        }));
      }
    }
  };
  

  const goToPrevQuestion = () => {
    if (!currentSection || !currentSection.questions) return;
  
    if (examState.currentQuestionIndex > 0) {
      setExamState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    } else {
      const currentSectionIndex = exam.sections.findIndex(
        section => section.id === examState.currentSectionId
      );
  
      if (currentSectionIndex > 0) {
        const prevSection = exam.sections[currentSectionIndex - 1];
  
        // Add a safety check
        if (prevSection && prevSection.questions && prevSection.questions.length > 0) {
          setExamState(prev => ({
            ...prev,
            currentSectionId: prevSection.id,
            currentQuestionIndex: prevSection.questions.length - 1
          }));
        }
      }
    }
  };
  

  const goToSection = (sectionId: string) => {
    setExamState(prev => ({
      ...prev,
      currentSectionId: sectionId,
      currentQuestionIndex: 0
    }));
  };

  const goToQuestion = (sectionId: string, questionIndex: number) => {
    setExamState(prev => ({
      ...prev,
      currentSectionId: sectionId,
      currentQuestionIndex: questionIndex
    }));
  };

  // Update the submitExam function in useExamState.ts
const submitExam = async () => {
  try {
    // Calculate score based on answers
    let score = 0;
    let totalMarks = 0;

    // Get all questions from all sections
    const allQuestions = exam.sections.flatMap(section => 
      section.questions.map(question => ({
        ...question,
        sectionId: section.id
      }))
    );
    console.log('Answers:', examState.answers);
    // Calculate score for each question
    allQuestions.forEach(question => {
      const userAnswer = examState.answers[question.id];
      const correctOptions = question.options
        .filter(opt => opt.isCorrect)
        .map(opt => opt.id);
      console.log('Correct Options:', correctOptions);
      console.log('User Answer:', userAnswer ? userAnswer.selectedOptionIds : 'No answer');

      const isCorrect = userAnswer && userAnswer.selectedOptionIds && 
                       JSON.stringify([...userAnswer.selectedOptionIds].sort()) === 
                       JSON.stringify([...correctOptions].sort());
      //marking logic based on question type
      switch (question.questionType) {
      case 'single':
        // +4 for correct, -1 for incorrect
        if (userAnswer && userAnswer.selectedOptionIds) {
          score += isCorrect ? 4 : -1;
        }
        totalMarks += 4; // Max marks for single correct
        break;
        
      case 'multi':
        if (userAnswer && userAnswer.selectedOptionIds) {
          score += isCorrect ? 4 : -1;
        }
        totalMarks += 4; // Max marks for single correct
        break;
      case 'integer':
        // +4 for correct, 0 for incorrect
        if (isCorrect) {
          score += 4;
        }
        totalMarks += 4; // Max marks for multi/integer
        break;
        
      default:
        console.warn(`Unknown question type: ${question.questionType}`);
        break;
    }
  });

    // Ensure score doesn't go below 0
    score = Math.max(0, score);
    console.log('Calculated Score:', score);
    console.log('Total Marks:', totalMarks);
    // Submit to backend
    const response = await fetch(`/api/exam-attempts/${exam.id}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answers: examState.answers,
        timeSpent: exam.duration * 60 - remainingTime,
        score,
        totalMarks
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to submit exam');
    }

    // Clear local state
    clearExamState();
    return "await response.json();"
  } catch (error) {
    console.error('Error submitting exam:', error);
    throw error;
  }
};

  // Statistics
  const sectionStats = useMemo(() => {
    return exam.sections.map(section => {
      const totalQuestions = section.questions.length;
  
      const answeredQuestions = section.questions.filter(question => {
        const answer = examState.answers[question.id];
        return Array.isArray(answer?.selectedOptionIds) && answer.selectedOptionIds.length > 0;
      }).length;
  
      const flaggedQuestions = section.questions.filter(question => {
        const answer = examState.answers[question.id];
        return answer?.isFlagged === true;
      }).length;
  
      return {
        sectionId: section.id,
        subject: section.subject,
        totalQuestions,
        answeredQuestions,
        flaggedQuestions,
        progress: totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0
      };
    });
  }, [exam.sections, examState.answers]);
  

  const totalProgress = useMemo(() => {
    const allQuestions = exam.sections.flatMap(section => section.questions);
    const totalQuestions = allQuestions.length;
    const answeredQuestions = Object.values(examState.answers)
      .filter(answer => answer.selectedOptionIds.length > 0)
      .length;
    
    return totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  }, [exam.sections, examState.answers]);

  return {
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
    getUserAnswer: (questionId: string): UserAnswer | undefined => 
      examState.answers[questionId],
    submitExam,
    startExam,
    isExamStarted: examState.examStarted || false
  };
};
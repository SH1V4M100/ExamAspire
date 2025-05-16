import { useState, useEffect, useMemo } from 'react';
import { Exam, ExamAttemptState, UserAnswer } from '@/lib/types';
import { saveExamState, loadExamState, clearExamState } from '@/lib/utils';

export const useExamState = (exam: Exam) => {
  const initialState: ExamAttemptState = useMemo(() => {
    const savedState = loadExamState(exam.id);
    
    if (savedState) {
      return savedState;
    }
    
    return {
      examId: exam.id,
      answers: {},
      currentSectionId: exam.sections[0]?.id || '',
      currentQuestionIndex: 0,
      startTime: Date.now(),
    };
  }, [exam.id, exam.sections]);

  const [examState, setExamState] = useState<ExamAttemptState>(initialState);
  
  // Calculate remaining time in seconds
  const remainingTime = useMemo(() => {
    const elapsedMs = Date.now() - examState.startTime;
    const durationMs = exam.duration * 60 * 1000;
    const remainingMs = Math.max(0, durationMs - elapsedMs);
    return Math.floor(remainingMs / 1000);
  }, [exam.duration, examState.startTime]);

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

  const submitExam = () => {
    // In a real application, you would send the answers to your backend here
    clearExamState();
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
    submitExam,
    sectionStats,
    totalProgress,
    getUserAnswer: (questionId: string): UserAnswer | undefined => 
      examState.answers[questionId]
  };
};
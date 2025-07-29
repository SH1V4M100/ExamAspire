import { useState, useEffect, useMemo } from 'react';
import { Exam, ExamAttemptState, UserAnswer } from '@/lib/types';
import { saveExamState, loadExamState, clearExamState } from '@/lib/utils';
type Subject = 'physics' | 'chemistry' | 'maths';
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
    const subjectScores: Record<Subject, { score: number; total: number }> = {
      physics: { score: 0, total: 0 },
      chemistry: { score: 0, total: 0 },
      maths: { score: 0, total: 0 }
    };
    try {
      let score = 0;
      let totalMarks = 0;
      // ✅ Skip actual submission if exam.id === 1
      if (exam.id === -1) {
        console.log('Skipping exam submission due to mock exam');
        clearExamState();
        return { success: true, message: 'Exam not submitted (mock mode).' };
      }
      const allQuestions = exam.sections.flatMap(section =>
        section.questions.map(question => ({
          ...question,
          sectionId: section.id,
          subject: section.subject.toLowerCase() as Subject// Ensure lowercase keys match `subjectScores`
        }))
      );
  
      allQuestions.forEach(question => {
        const userAnswer = examState.answers[question.id];
        const correctOptions = question.options
          .filter(opt => opt.isCorrect)
          .map(opt => opt.id);
  
        const isCorrect = userAnswer && userAnswer.selectedOptionIds &&
          JSON.stringify([...userAnswer.selectedOptionIds].sort()) ===
          JSON.stringify([...correctOptions].sort());
  
        const subjectKey = question.subject as Subject; // physics / chemistry / maths
  
        switch (question.questionType) {
          case 'single 1':
            if (userAnswer && userAnswer.selectedOptionIds && userAnswer.selectedOptionIds.length > 0) {
              const delta = isCorrect ? 1 : -0.25;
              score += delta;
              subjectScores[subjectKey].score += delta;
            }
            totalMarks += 1;
            subjectScores[subjectKey].total += 1;
            break;
            
          case 'single 2':
            if (userAnswer && userAnswer.selectedOptionIds && userAnswer.selectedOptionIds.length > 0) {
              const delta = isCorrect ? 2 : -0.5;
              score += delta;
              subjectScores[subjectKey].score += delta;
            }
            totalMarks += 2;
            subjectScores[subjectKey].total += 2;
            break;
          
          case 'single 4':
            if (userAnswer && userAnswer.selectedOptionIds && userAnswer.selectedOptionIds.length > 0) {
              const delta = isCorrect ? 4 : -1;
              score += delta;
              subjectScores[subjectKey].score += delta;
            }
            totalMarks += 4;
            subjectScores[subjectKey].total += 4;
            break;

          case 'multi':
            totalMarks += 2;
            subjectScores[subjectKey].total += 2;
        
            if (userAnswer && userAnswer.selectedOptionIds && userAnswer.selectedOptionIds.length > 0) {
              const selected = userAnswer.selectedOptionIds;
              const correctSet = new Set(correctOptions);
              const selectedSet = new Set(selected);
        
              const hasIncorrect = selected.some(id => !correctSet.has(id));
              const correctSelected = selected.filter(id => correctSet.has(id)).length;
              const totalCorrect = correctOptions.length;
        
              if (hasIncorrect) {
                score -= 0;
                subjectScores[subjectKey].score -= 0;
              } else if (correctSelected === totalCorrect) {
                score += 2;
                subjectScores[subjectKey].score += 2;
              } else if (correctSelected > 0) {
                const partialMarks = (2 * correctSelected) / totalCorrect;
                score += partialMarks;
                subjectScores[subjectKey].score += partialMarks;
              }
              // else no marks if nothing selected
            }
            break;
        
          case 'integer':
            if (isCorrect) {
              score += 4;
              subjectScores[subjectKey].score += 4;
            }
            else{
              score -= 1;
              subjectScores[subjectKey].score -= 1;
            }
            totalMarks += 4;
            subjectScores[subjectKey].total += 4;
            break;
        
          default:
            console.warn(`Unknown question type: ${question.questionType}`);
            break;
        }
        
      });
  
      // Ensure score and subject scores are non-negative
      score = Math.max(0, score);
      for (const key of Object.keys(subjectScores) as Subject[]) {
        subjectScores[key].score = Math.max(0, subjectScores[key].score);
      }
  
      // Prepare submission payload
      const payload = {
        answers: examState.answers,
        timeSpent: exam.duration * 60 - remainingTime,
        score,
        totalMarks,
        physicsScore: subjectScores.physics.score,
        physicsTotal: subjectScores.physics.total,
        chemistryScore: subjectScores.chemistry.score,
        chemistryTotal: subjectScores.chemistry.total,
        mathsScore: subjectScores.maths.score,
        mathsTotal: subjectScores.maths.total
      };
  
      const response = await fetch(`/api/exam-attempts/${exam.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
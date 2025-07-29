import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Exam, ExamStatus } from './types';
import { ExamAttemptState } from '@/lib/types';
import { ExamAttempt, ProcessedAttempt, StudentPerformance } from '@/lib/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins} minutes`;
  } else if (mins === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  } else {
    return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
  }
}

export function getExamStatus(exam: Exam): ExamStatus {
  const now = new Date();
  const startDate = new Date(exam.startDate);
  const endDate = new Date(exam.endDate);
  
  if (now < startDate) {
    return 'upcoming';
  } else if (now > endDate) {
    return 'expired';
  } else {
    return 'active';
  }
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return 'Invalid date';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const STORAGE_KEY = 'examAttemptState';

export const saveExamState = (state: ExamAttemptState): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadExamState = (examId: number): ExamAttemptState | null => {
  const storedState = localStorage.getItem(STORAGE_KEY);
  
  if (!storedState) return null;
  
  try {
    const state = JSON.parse(storedState) as ExamAttemptState;
    
    // Only return state if it's for the current exam
    if (state.examId === examId) {
      return state;
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing exam state:', error);
    return null;
  }
};

export const clearExamState = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export function processExamAttempts(attempts: ExamAttempt[]): ProcessedAttempt[] {
  //console.log(attempts)
  return attempts.map(attempt => ({
    ...attempt,
    percentage: (attempt.score / attempt.totalMarks) * 100,
    physicsPercentage: (attempt.physicsScore / attempt.physicsTotal) * 100,
    chemistryPercentage: (attempt.chemistryScore / attempt.chemistryTotal) * 100,
    mathsPercentage: (attempt.mathsScore / attempt.mathsTotal) * 100,
    isValidSubmission: new Date(attempt.submittedAt) <= new Date(attempt.exam.endDate)
  }));
}

export function selectBestAttemptPerExam(attempts: ProcessedAttempt[]): ProcessedAttempt[] {
  const examAttempts = new Map<number, ProcessedAttempt[]>();
  
  // Group attempts by exam ID
  attempts.forEach(attempt => {
    if (!examAttempts.has(attempt.exam.id)) {
      examAttempts.set(attempt.exam.id, []);
    }
    examAttempts.get(attempt.exam.id)!.push(attempt);
  });

  const selectedAttempts: ProcessedAttempt[] = [];

  // For each exam, select the best valid attempt
  examAttempts.forEach(examAttemptList => {
    const validAttempts = examAttemptList.filter(attempt => attempt.isValidSubmission);
    
    let selectedAttempt: ProcessedAttempt;
    
    if (validAttempts.length > 0) {
      // Select the best valid attempt (highest score)
      selectedAttempt = validAttempts.reduce((best, current) => 
        current.score > best.score ? current : best
      );
    } else {
      // If no valid attempts, select the latest attempt
      selectedAttempt = examAttemptList.reduce((latest, current) => 
        new Date(current.submittedAt) > new Date(latest.submittedAt) ? current : latest
      );
    }
    
    selectedAttempts.push(selectedAttempt);
  });

  return selectedAttempts.sort((a, b) => 
    new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
  );
}

export function calculateStudentPerformance(attempts: ProcessedAttempt[]): Omit<StudentPerformance, 'student'> {
  if (attempts.length === 0) {
    return {
      attempts: [],
      bestPercentage: 0,
      totalExams: 0,
      averagePercentage: 0
    };
  }

  const totalPercentage = attempts.reduce((sum, attempt) => sum + attempt.percentage, 0);
  const bestPercentage = Math.max(...attempts.map(attempt => attempt.percentage));

  return {
    attempts,
    bestPercentage,
    totalExams: attempts.length,
    averagePercentage: totalPercentage / attempts.length
  };
}

export function groupAttemptsByStudent(attempts: ExamAttempt[]): StudentPerformance[] {
  const processedAttempts = processExamAttempts(attempts);
  const studentAttempts = new Map<number, ProcessedAttempt[]>();

  // Group attempts by student ID
  processedAttempts.forEach(attempt => {
    if (!studentAttempts.has(attempt.user.id)) {
      studentAttempts.set(attempt.user.id, []);
    }
    studentAttempts.get(attempt.user.id)!.push(attempt);
  });

  const studentPerformances: StudentPerformance[] = [];

  studentAttempts.forEach(allAttempts => {
    const selectedAttempts = selectBestAttemptPerExam(allAttempts);
    const performance = calculateStudentPerformance(selectedAttempts);

    studentPerformances.push({
      student: {
        ...allAttempts[0]!.user,
        totalAttempts: allAttempts.length  
      },
      ...performance
    });
  });

  return studentPerformances.sort((a, b) => b.averagePercentage - a.averagePercentage);
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Exam, ExamStatus } from './types';
import { ExamAttemptState } from '@/lib/types';

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
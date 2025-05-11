import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Exam, ExamStatus } from './types';

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
  
  if (now < exam.startDate) {
    return 'upcoming';
  } else if (now > exam.endDate) {
    return 'expired';
  } else {
    return 'active';
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
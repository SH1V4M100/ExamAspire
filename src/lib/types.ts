export type Exam = {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  startDate: Date;
  endDate: Date;
  attempted: boolean;
  progress?: number; // 0-100 if attempted
};

export type ExamStatus = 'upcoming' | 'active' | 'expired';
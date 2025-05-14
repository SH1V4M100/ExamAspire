export type Exam = {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  duration: number; // in minutes
  isNegativeMarkingEnabled: boolean;
  startDate: Date;
  endDate: Date;
  attempted: boolean;
  sections: {
    subject: string;
    questions: {
      questionText: string;
      options: string[];
      correctOptionIndex: number;
      explanation?: string;
    }[];
  }[];
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  _status: 'draft' | 'published';
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ExamStatus = 'upcoming' | 'active' | 'expired';
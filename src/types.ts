export interface Question {
  id: number;
  type: 'text' | 'image';
  content: string; // text content or image URL
  options: string[];
  correctAnswer: number;
}

export interface Answer {
  questionId: number;
  selectedOption: number | null;
  isCorrect: boolean;
}

export interface ExamResult {
  userName: string;
  answers: Answer[];
  score: number;
  totalQuestions: number;
  timeSpent: number;
}
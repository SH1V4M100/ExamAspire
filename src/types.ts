export interface Question {
  id: number;
  text: string;
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
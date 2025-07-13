export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Image {
  id: number;
  url: string;
  _key: string;
  alt: string | null;
  caption: string | null;
  updatedAt: string;
  createdAt: string;
  thumbnailURL: null;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
}

export type QuestionType = 'single 1'| 'single 2'| 'single 4' | 'multi' | 'integer';

export interface Question {
  id: string;
  questionText: string;
  questionType: QuestionType;
  image: Image | null;
  options: Option[];
}

export interface Section {
  id: string;
  subject: string;
  questions: Question[];
}
type Instruction = {
  id: string;
  instruction: string | null;
};

export interface Exam {
  id: number;
  title: string;
  description: string;
  instructions: Instruction[];
  duration: number;
  isNegativeMarkingEnabled: boolean;
  attempted: boolean;
  startDate: string;
  endDate: string;
  sections: Section[];
  _status: string;
  slug: string;
}
export interface AnswersType {
  [key: string]: UserAnswer;
}
export interface ExamData {
  exam: Exam;
  answers: AnswersType;
  score: number;
  chemistryTotal: number;
  physicsTotal: number;
  mathsTotal: number;
}
export interface UserAnswer {
  questionId: string;
  selectedOptionIds: string[];
  isFlagged: boolean;
}

export interface ExamAttemptState {
  examId: number;
  answers: Record<string, UserAnswer>;
  currentSectionId: string;
  currentQuestionIndex: number;
  startTime: number;
  examStarted: boolean;
}
export type ExamStatus = 'upcoming' | 'active' | 'expired';
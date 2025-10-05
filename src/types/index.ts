export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  correctOptionId: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface AnswerHistory {
  questionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean;
  timeTaken: number;
}

export interface QuizFilterOptions {
  category?: string;
  count?: number;
  difficulty?: string;
}

export interface GameConfig {
  scoringStrategy?: 'basic' | 'timed' | 'streak';
  timePerQuestion?: number;
}
import type { Question } from "../types";


export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function shuffleQuestions(questions: Question[]): Question[] {
  return shuffleArray(questions).map(question => ({
    ...question,
    options: shuffleArray(question.options)
  }));
}
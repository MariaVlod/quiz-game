import type { AnswerHistory } from '../types';

export function calculateScore(history: AnswerHistory[]): number {
  return history.reduce((score, answer) => {
    if (answer.isCorrect) {
      return score + 100; // базова система балів
    }
    return score;
  }, 0);
}

export function calculatePercentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}
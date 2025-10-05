import { useMemo } from 'react';
import type { AnswerHistory } from '../types';
import { calculatePercentage } from '../utils/scoring';

interface UseResultsReturn {
  total: number;
  correct: number;
  incorrect: number;
  skipped: number;
  percent: number;
  summaryList: Array<{
    questionId: string;
    isCorrect: boolean;
    selectedOptionId: string | null;
    isSkipped: boolean;
  }>;
}

export const useResults = (answersHistory: AnswerHistory[]): UseResultsReturn => {
  return useMemo(() => {
    const total = answersHistory.length;

    // Підрахунок категорій
    const correct = answersHistory.filter(a => a.isCorrect).length;
    const skipped = answersHistory.filter(a => a.selectedOptionId === null).length;
    const incorrect = answersHistory.filter(a => !a.isCorrect && a.selectedOptionId !== null).length;

    // Відсоток успішності відносно всіх питань (не лише тих, на які відповіли)
    const percent = total > 0 ? calculatePercentage(correct, total) : 0;

    // Детальна статистика
    const summaryList = answersHistory.map(a => ({
      questionId: a.questionId,
      isCorrect: a.isCorrect,
      selectedOptionId: a.selectedOptionId,
      isSkipped: a.selectedOptionId === null
    }));

    return {
      total,
      correct,
      incorrect,
      skipped,
      percent,
      summaryList
    };
  }, [answersHistory]);
};

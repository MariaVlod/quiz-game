import { useMemo } from 'react';
import type { AnswerHistory } from '../types';
import { calculatePercentage } from '../utils/scoring';

interface UseResultsReturn {
  total: number;
  correct: number;
  incorrect: number;
  percent: number;
  summaryList: Array<{
    questionId: string;
    isCorrect: boolean;
    selectedOptionId: string | null;
  }>;
}

export const useResults = (answersHistory: AnswerHistory[]): UseResultsReturn => {
  return useMemo(() => {
    const total = answersHistory.length;
    const correct = answersHistory.filter(answer => answer.isCorrect).length;
    const incorrect = total - correct;
    const percent = calculatePercentage(correct, total);

    const summaryList = answersHistory.map(answer => ({
      questionId: answer.questionId,
      isCorrect: answer.isCorrect,
      selectedOptionId: answer.selectedOptionId
    }));

    return {
      total,
      correct,
      incorrect,
      percent,
      summaryList
    };
  }, [answersHistory]);
};

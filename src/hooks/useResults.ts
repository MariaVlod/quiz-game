import { useMemo } from 'react';
import type { AnswerHistory } from '../types';
import { calculatePercentage } from '../utils/scoring';

/**
 * Інтерфейс об'єкта статистики, який повертає хук useResults.
 * Містить зведену інформацію про результати проходження вікторини.
 * @interface
 */
export interface UseResultsReturn {
  /** Загальна кількість питань, на які була дана відповідь (або пропуск) */
  total: number;
  /** Кількість правильних відповідей */
  correct: number;
  /** Кількість неправильних відповідей */
  incorrect: number;
  /** Кількість пропущених питань */
  skipped: number;
  /** Відсоток успішності від 0 до 100 */
  percent: number;
  /** * Детальний список результатів по кожному питанню.
   * Використовується для відображення детального звіту в кінці гри.
   */
  summaryList: Array<{
    questionId: string;
    isCorrect: boolean;
    selectedOptionId: string | null;
    isSkipped: boolean;
  }>;
}

/**
 * Хук для обчислення та мемоізації результатів гри.
 * Аналізує історію відповідей та формує статистику.
 * * @param answersHistory Масив об'єктів історії відповідей
 * @returns {UseResultsReturn} Об'єкт зі статистикою гри
 * * @example
 * const { correct, percent } = useResults(history);
 * console.log(`Ви відповіли правильно на ${correct} питань (${percent}%)`);
 */
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

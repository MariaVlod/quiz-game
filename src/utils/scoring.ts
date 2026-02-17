import type { AnswerHistory } from '../types';

/**
 * Розраховує загальний бал на основі історії відповідей.
 * Правильна відповідь дає 100 балів, неправильна або пропущена - 0 балів.
 * 
 * @param {AnswerHistory[]} history - Масив історії відповідей користувача
 * @returns {number} Загальна кількість балів
 * 
 * @example
 * const history = [
 *   { isCorrect: true, questionId: '1', selectedOptionId: 'a', timeTaken: 5 },
 *   { isCorrect: false, questionId: '2', selectedOptionId: 'b', timeTaken: 3 }
 * ];
 * calculateScore(history); // Повертає 100
 * 
 * @example
 * calculateScore([]); // Повертає 0
 */
export function calculateScore(history: AnswerHistory[]): number {
  return history.reduce((score, answer) => {
    // Даємо бали тільки за правильні відповіді
    if (answer.isCorrect) {
      return score + 100;
    }
    // За неправильні та пропущені - 0 балів
    return score;
  }, 0);
}

/**
 * Розраховує відсоток правильних відповідей.
 * 
 * @param {number} correct - Кількість правильних відповідей
 * @param {number} total - Загальна кількість питань
 * @returns {number} Відсоток правильних відповідей (округлений до цілого числа)
 * 
 * @throws {Error} Функція безпечно обробляє випадок, коли total = 0, повертаючи 0
 * 
 * @example
 * calculatePercentage(5, 10); // Повертає 50
 * calculatePercentage(3, 4);  // Повертає 75
 * calculatePercentage(0, 5);   // Повертає 0
 * calculatePercentage(5, 0);   // Повертає 0
 * 
 * @example
 * // Використання в компоненті
 * const { correct, total } = useResults(answersHistory);
 * const percent = calculatePercentage(correct, total);
 */
export function calculatePercentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}
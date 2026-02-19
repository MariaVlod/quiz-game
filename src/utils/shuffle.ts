import type { Question } from '../types';

/**
 * Перемішує елементи масиву випадковим чином (алгоритм Фішера-Йєтса).
 * Створює новий масив, не змінюючи оригінал.
 * 
 * @template T - Тип елементів масиву
 * @param {T[]} array - Вхідний масив для перемішування
 * @returns {T[]} Новий масив з перемішаними елементами
 * 
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * shuffleArray(numbers); // Повертає [3, 1, 5, 2, 4] (випадковий порядок)
 * 
 * @example
 * const words = ['яблуко', 'банан', 'груша'];
 * shuffleArray(words); // Повертає ['груша', 'яблуко', 'банан'] (випадковий порядок)
 * 
 * @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle Алгоритм Фішера-Йєтса
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Перемішує варіанти відповідей для кожного питання.
 * Створює новий масив питань з перемішаними опціями, не змінюючи оригінал.
 * 
 * @param {Question[]} questions - Масив питань для обробки
 * @returns {Question[]} Новий масив питань з перемішаними варіантами відповідей
 * 
 * @example
 * const questions = [
 *   { 
 *     id: '1', 
 *     text: 'Питання 1', 
 *     options: ['A', 'B', 'C', 'D'],
 *     correctOptionId: 'A',
 *     difficulty: 'easy'
 *   }
 * ];
 * shuffleQuestions(questions); // Повертає те ж питання, але з опціями ['C', 'A', 'D', 'B'] (випадково)
 * 
 * @see {@link shuffleArray} Використовує цю функцію для перемішування опцій
 */
export function shuffleQuestions(questions: Question[]): Question[] {
  return questions.map(question => ({
    ...question,
    options: shuffleArray(question.options)
  }));
}

/**
 * Отримує випадкові питання заданої складності.
 * Фільтрує питання за складністю, перемішує їх і повертає вказану кількість.
 * 
 * @param {Question[]} allQuestions - Масив всіх доступних питань
 * @param {string} difficulty - Рівень складності ('easy', 'medium', 'hard', або інший кастомний)
 * @param {number} count - Бажана кількість питань
 * @returns {Question[]} Масив випадкових питань заданої складності
 * 
 * @example
 * const allQuestions = [
 *   { id: '1', text: 'Питання 1', difficulty: 'easy', options: [] },
 *   { id: '2', text: 'Питання 2', difficulty: 'easy', options: [] },
 *   { id: '3', text: 'Питання 3', difficulty: 'hard', options: [] }
 * ];
 * getRandomQuestionsByDifficulty(allQuestions, 'easy', 2); 
 * // Повертає 2 випадкових питання з easy складністю
 * 
 * @example
 * getRandomQuestionsByDifficulty(allQuestions, 'medium', 5);
 * // Повертає порожній масив, якщо питань medium складності немає
 */
export function getRandomQuestionsByDifficulty(
  allQuestions: Question[], 
  difficulty: string, 
  count: number
): Question[] {
  // Фільтруємо питання за складністю
  const filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty);
  
  if (filteredQuestions.length === 0) {
    return [];
  }
  
  const shuffled = shuffleArray(filteredQuestions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Отримує випадкові питання з усіх доступних, незалежно від складності.
 * Перемішує всі питання і повертає вказану кількість.
 * 
 * @param {Question[]} allQuestions - Масив всіх доступних питань
 * @param {number} count - Бажана кількість питань
 * @returns {Question[]} Масив випадкових питань з різною складністю
 * 
 * @example
 * const allQuestions = [
 *   { id: '1', text: 'Питання 1', difficulty: 'easy', options: [] },
 *   { id: '2', text: 'Питання 2', difficulty: 'medium', options: [] },
 *   { id: '3', text: 'Питання 3', difficulty: 'hard', options: [] }
 * ];
 * getMixedRandomQuestions(allQuestions, 2); 
 * // Повертає 2 випадкових питання з будь-якою складністю
 * 
 * @example
 * getMixedRandomQuestions([], 5); // Повертає порожній масив
 * 
 * @see {@link shuffleArray} Використовує цю функцію для перемішування
 */
export function getMixedRandomQuestions(
  allQuestions: Question[], 
  count: number
): Question[] {
  const shuffled = shuffleArray(allQuestions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
import { useState, useEffect, useCallback } from 'react';
import type{ Question, QuizFilterOptions } from '../types';
import { mockQuestions } from '../data/mockQuestions';
import { shuffleQuestions } from '../utils/shuffle';

export const useQuizData = (initialOptions?: QuizFilterOptions) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadQuestions = useCallback(async (options?: QuizFilterOptions) => {
    try {
      setLoading(true);
      setError(null);
      
      // симуляція завантаження з API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredQuestions = mockQuestions;

      // фільтрація за категорією
      if (options?.category) {
        filteredQuestions = filteredQuestions.filter(
          q => q.category === options.category
        );
      }

      // фільтрація за складністю
      if (options?.difficulty) {
        filteredQuestions = filteredQuestions.filter(
          q => q.difficulty === options.difficulty
        );
      }

      // обмеження кількості
      if (options?.count) {
        filteredQuestions = filteredQuestions.slice(0, options.count);
      }

      if (filteredQuestions.length === 0) {
        throw new Error('Не знайдено питань за обраними критеріями');
      }

      // перемішування питань та варіантів відповідей
      const shuffledQuestions = shuffleQuestions(filteredQuestions);
      setQuestions(shuffledQuestions);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Помилка завантаження питань'));
    } finally {
      setLoading(false);
    }
  }, []);

  const reload = useCallback((options?: QuizFilterOptions) => {
    loadQuestions(options);
  }, [loadQuestions]);

  // завантаження питань при першому рендері
  useEffect(() => {
    loadQuestions(initialOptions);
  }, [loadQuestions, initialOptions]);

  return {
    questions,
    loading,
    error,
    reload
  };
};
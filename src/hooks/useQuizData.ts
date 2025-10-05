import { useState, useEffect, useCallback } from 'react';
import type  { Question, QuizFilterOptions } from '../types';
import { mockQuestions } from '../data/mockQuestions';
import { shuffleArray, shuffleQuestions } from '../utils/shuffle';

export const useQuizData = (initialOptions?: QuizFilterOptions) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadQuestions = useCallback(async (options?: QuizFilterOptions) => {
    try {
      setLoading(true);
      setError(null);
      
      // Симуляція завантаження з API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let availableQuestions = [...mockQuestions];

      // Фільтрація за складністю
      if (options?.difficulty && options.difficulty !== 'all') {
        availableQuestions = availableQuestions.filter(
          q => q.difficulty === options.difficulty
        );
        console.log(`Фільтрація за складністю: ${options.difficulty}, доступно: ${availableQuestions.length} питань`);
      }

      if (availableQuestions.length === 0) {
        throw new Error('Не знайдено питань за обраними критеріями');
      }

      // ВИПАДКОВИЙ ВІДБІР ПИТАНЬ
      let selectedQuestions: Question[];
      const count = options?.count || 5;
      
      if (availableQuestions.length <= count) {
        // Якщо доступних питань менше або рівно потрібній кількості - беремо всі
        selectedQuestions = [...availableQuestions];
      } else {
        // Випадковий вибір питань з доступних
        const shuffled = shuffleArray(availableQuestions);
        selectedQuestions = shuffled.slice(0, count);
      }

      // Перемішування варіантів відповідей у вибраних питаннях
      const finalQuestions = shuffleQuestions(selectedQuestions);
      
      // Логування для дебагу
      console.log('Завантажені питання:', {
        обранаСкладність: options?.difficulty,
        доступноПитань: availableQuestions.length,
        обраноПитань: finalQuestions.length,
        складності: finalQuestions.map(q => q.difficulty),
        питанняIDs: finalQuestions.map(q => q.id)
      });
      
      setQuestions(finalQuestions);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Помилка завантаження питань');
      setError(error);
      console.error('Помилка завантаження питань:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const reload = useCallback((options?: QuizFilterOptions) => {
    loadQuestions(options);
  }, [loadQuestions]);

  // Завантаження питань при першому рендері
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
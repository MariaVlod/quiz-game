import { useState, useEffect, useCallback } from 'react';
import type { Question, QuizFilterOptions } from '../types';
import { mockQuestions } from '../data/mockQuestions';
import { shuffleArray, shuffleQuestions } from '../utils/shuffle';
import { useGameSettings } from '../context/GameSettingsContext'; // Додаємо імпорт контексту

export const useQuizData = () => {
  const { settings } = useGameSettings(); // Отримуємо налаштування з контексту
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Симуляція завантаження з API
      await new Promise(resolve => setTimeout(resolve, 500));

      let availableQuestions = [...mockQuestions];

      // Фільтрація за складністю з налаштувань
      if (settings.difficulty && settings.difficulty !== 'all') {
        availableQuestions = availableQuestions.filter(
          q => q.difficulty === settings.difficulty
        );
        console.log(' Фільтрація за складністю:', settings.difficulty, 'доступно:', availableQuestions.length, 'питань');
      }

      if (availableQuestions.length === 0) {
        throw new Error('Не знайдено питань за обраними критеріями');
      }

  
      let selectedQuestions: Question[];
      const count = settings.count || 5;

      if (availableQuestions.length <= count) {
        selectedQuestions = [...availableQuestions];
      } else {
        const shuffled = shuffleArray(availableQuestions);
        selectedQuestions = shuffled.slice(0, count);
      }

  
      const finalQuestions = shuffleQuestions(selectedQuestions);

      // Логування для дебагу
      console.log('✅ Завантажені питання:', {
        обранаСкладність: settings.difficulty,
        кількістьПитань: settings.count,
        доступноПитань: availableQuestions.length,
        обраноПитань: finalQuestions.length,
        складності: finalQuestions.map(q => q.difficulty),
        питанняIDs: finalQuestions.map(q => q.id)
      });

      setQuestions(finalQuestions);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Помилка завантаження питань');
      setError(error);
      console.error('❌ Помилка завантаження питань:', error);
    } finally {
      setLoading(false);
    }
  }, [settings]); 

  const reload = useCallback(() => {
    loadQuestions();
  }, [loadQuestions]);

  
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  return {
    questions,
    loading,
    error,
    reload
  };
};
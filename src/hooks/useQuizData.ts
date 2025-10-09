import { useState, useEffect, useCallback } from 'react';
import type { Question } from '../types';
import { mockQuestions } from '../data/mockQuestions';
import { shuffleArray, shuffleQuestions } from '../utils/shuffle';
import { useGameSettings } from '../context/GameSettingsContext';

export const useQuizData = () => {
  const { settings } = useGameSettings();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Симуляція запиту до API
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredQuestions = [...mockQuestions];

      // 🔹 Фільтрація за категорією
      if (settings.category && settings.category !== 'all') {
        filteredQuestions = filteredQuestions.filter(
          q => q.category === settings.category
        );
      }

      // 🔹 Фільтрація за складністю
      if (settings.difficulty && settings.difficulty !== 'all') {
        filteredQuestions = filteredQuestions.filter(
          q => q.difficulty === settings.difficulty
        );
      }

      // 🔹 Випадковий вибір питань
      let selectedQuestions: Question[];
      const count = settings.count || 5;

      if (filteredQuestions.length <= count) {
        selectedQuestions = [...filteredQuestions];
      } else {
        const shuffled = shuffleArray(filteredQuestions);
        selectedQuestions = shuffled.slice(0, count);
      }

      if (selectedQuestions.length === 0) {
        throw new Error('Не знайдено питань за обраними критеріями');
      }

      // 🔹 Перемішування варіантів відповідей
      const finalQuestions = shuffleQuestions(selectedQuestions);

      console.log('✅ Завантажені питання:', {
        category: settings.category,
        difficulty: settings.difficulty,
        count: finalQuestions.length,
        ids: finalQuestions.map(q => q.id)
      });

      setQuestions(finalQuestions);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Помилка завантаження питань'));
      console.error('❌ Помилка завантаження питань:', err);
    } finally {
      setLoading(false);
    }
  }, [settings]);

  // Завантаження при зміні налаштувань
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  // Додаткова функція для ручного перезапуску
  const reload = useCallback(() => {
    loadQuestions();
  }, [loadQuestions]);

  return {
    questions,
    loading,
    error,
    reload
  };
};

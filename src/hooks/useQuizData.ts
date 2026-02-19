import { useState, useEffect, useCallback } from 'react';
import type { Question } from '../types';
import { mockQuestions } from '../data/mockQuestions';
import { useGameStore } from '../store/gameStore';

/**
 * Універсальна функція для перемішування масиву (алгоритм Фішера-Єйтса).
 * Використовується для випадкового порядку питань та варіантів відповідей.
 * * @param array Вхідний масив будь-якого типу
 * @returns Новий перемішаний масив
 */

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Перемішує варіанти відповідей всередині кожного питання.
 * Це гарантує, що правильна відповідь не буде завжди на одному й тому ж місці.
 * * @param questions Масив питань
 * @returns Масив питань з перемішаними варіантами відповідей
 */
export const shuffleQuestions = (questions: Question[]): Question[] => {
  return questions.map(question => ({
    ...question,
    options: shuffleArray(question.options) 
  }));
};

export const useQuizData = () => {
  const { settings } = useGameStore();
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

      // Фільтрація за складністю
      if (settings.difficulty && settings.difficulty !== 'all') {
        availableQuestions = availableQuestions.filter(
          q => q.difficulty === settings.difficulty
        );
        console.log('🔍 Фільтрація за складністю:', settings.difficulty, 'доступно:', availableQuestions.length, 'питань');
      }

      if (availableQuestions.length === 0) {
        throw new Error('Не знайдено питань за обраними критеріями');
      }

      let selectedQuestions: Question[];  
      const count = settings.count || 5;  

    
      const shuffledAvailable = shuffleArray(availableQuestions);
      
      if (shuffledAvailable.length <= count) {  
        selectedQuestions = [...shuffledAvailable];  
      } else {  
        selectedQuestions = shuffledAvailable.slice(0, count);  
      }
      const finalQuestions = shuffleQuestions(selectedQuestions);
      const fullyShuffledQuestions = shuffleArray(finalQuestions);

      console.log('✅ Завантажені питання:', {  
        обранаСкладність: settings.difficulty,  
        кількістьПитань: settings.count,  
        доступноПитань: availableQuestions.length,  
        обраноПитань: fullyShuffledQuestions.length,  
        складності: fullyShuffledQuestions.map(q => q.difficulty),  
        питанняIDs: fullyShuffledQuestions.map(q => q.id)  
      });  

      setQuestions(fullyShuffledQuestions);  
    } catch (err) {  
      const error = err instanceof Error ? err : new Error('Помилка завантаження питань');  
      setError(error);  
      console.error('✗ Помилка завантаження питань:', error);  
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
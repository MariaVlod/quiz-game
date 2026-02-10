import { useState, useCallback, useEffect } from 'react';
import type { Question, AnswerHistory, GameConfig } from '../types';
import { calculateScore } from '../utils/scoring';

/**
 * Інтерфейс, що описує значення, які повертає хук useGameFlow.
 * Містить поточний стан гри та методи керування процесом.
 */
export interface UseGameFlowReturn {
  // Стан
  /** Поточний індекс питання (починається з 0) */
  currentIndex: number;
  /** Об'єкт поточного питання або null */
  currentQuestion: Question | null;
/** ID обраної відповіді користувача */
  selectedOptionId: string | null;
/** Масив історії всіх відповідей */
  answersHistory: AnswerHistory[];
/** Поточний рахунок гравця */
  score: number;
/** Чи завершена гра */
  isFinished: boolean;
  /** Чи заблокована можливість відповідати (після вибору варіанту) */
  isAnswerLocked: boolean;

  // Методи

  /** Функція вибору варіанту відповіді */
  selectOption: (optionId: string) => void;
  /** Функція пропуску поточного питання */
  skipQuestion: () => void;
  /** Перехід до наступного питання */
  next: () => void;
  /** Перехід до наступного питання */
  restart: () => void;
  /** Отримання прогресу гри (поточне/всього) */
  getProgress: () => { current: number; total: number };
}
/**
 * Хук для управління логікою проходження вікторини.
 * Відповідає за перемикання питань, підрахунок балів та збереження історії.
 * * @param questions Масив питань для гри
 * @param _config Конфігурація гри (опціонально)
 */
export const useGameFlow = (
  questions: Question[],
  _config: GameConfig = {}
): UseGameFlowReturn => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answersHistory, setAnswersHistory] = useState<AnswerHistory[]>([]);
  const [isAnswerLocked, setIsAnswerLocked] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQuestion = questions[currentIndex] || null;
  const totalQuestions = questions.length;

  // Розрахунок балів
  const score = calculateScore(answersHistory);

  const selectOption = useCallback((optionId: string) => {
    if (isAnswerLocked || !currentQuestion) return;

    const isCorrect = optionId === currentQuestion.correctOptionId;

    console.log('🎯 Відповідь обрана:', {
      optionId,
      isCorrect,
      correctAnswer: currentQuestion.correctOptionId
    });

    setSelectedOptionId(optionId);
    setIsAnswerLocked(true); // Блокуємо подальші відповіді

    // Додавання до історії відповідей
    const newAnswer: AnswerHistory = {
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
      isCorrect,
      timeTaken: 0
    };

    setAnswersHistory(prev => [...prev, newAnswer]);

    // Таймер має зупинитися тут для КОЖНОЇ відповіді (правильної чи ні)
    // Це забезпечить послідовність поведінки

  }, [currentQuestion, isAnswerLocked]);

 
  const skipQuestion = useCallback(() => {
    if (isAnswerLocked || !currentQuestion) return;

    console.log('⏭️ Пропуск питання:', currentQuestion.id);

    // Додаємо пропущену відповідь в історію
    const skippedAnswer: AnswerHistory = {
      questionId: currentQuestion.id,
      selectedOptionId: null, // null означає, що питання пропущено
      isCorrect: false,
      timeTaken: 0
    };

    setAnswersHistory(prev => [...prev, skippedAnswer]);
    setIsAnswerLocked(true);
  }, [currentQuestion, isAnswerLocked]);

  const next = useCallback(() => {
    console.log('➡️ Перехід до наступного питання. Поточний індекс:', currentIndex, 'Всього:', totalQuestions);
    
    if (currentIndex >= totalQuestions - 1) {
      console.log('🎮 Останнє питання, завершення гри');
      setIsFinished(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerLocked(false);
      console.log('🔄 Новий індекс питання:', currentIndex + 1);
    }
  }, [currentIndex, totalQuestions]);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setAnswersHistory([]);
    setIsAnswerLocked(false);
    setIsFinished(false);
  }, []);

  const getProgress = useCallback(() => ({
    current: currentIndex + 1,
    total: totalQuestions
  }), [currentIndex, totalQuestions]);

  // автоматичне завершення гри, коли всі питання відповідені або пропущені
  useEffect(() => {
    if (answersHistory.length === totalQuestions && totalQuestions > 0) {
      setIsFinished(true);
    }
  }, [answersHistory.length, totalQuestions]);

  return {
    // Стан
    currentIndex,
    currentQuestion,
    selectedOptionId,
    answersHistory,
    score,
    isFinished,
    isAnswerLocked,

    // Методи
    selectOption,
    skipQuestion,
    next,
    restart,
    getProgress
  };
};
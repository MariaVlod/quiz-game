import { useState, useCallback, useEffect } from 'react';
import type { Question, AnswerHistory, GameConfig } from '../types';
import { calculateScore } from '../utils/scoring';

interface UseGameFlowReturn {
  // Стан
  currentIndex: number;
  currentQuestion: Question | null;
  selectedOptionId: string | null;
  answersHistory: AnswerHistory[];
  score: number;
  isFinished: boolean;
  isAnswerLocked: boolean;
  
  // Методи
  selectOption: (optionId: string) => void;
  skipQuestion: () => void; // Новий метод для пропуску питання
  next: () => void;
  restart: () => void;
  getProgress: () => { current: number; total: number };
}

export const useGameFlow = (
  questions: Question[],
  config: GameConfig = {}
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
    
    setSelectedOptionId(optionId);
    setIsAnswerLocked(true);

    // Додавання до історії відповідей
    const newAnswer: AnswerHistory = {
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
      isCorrect,
      timeTaken: 0
    };

    setAnswersHistory(prev => [...prev, newAnswer]);
  }, [currentQuestion, isAnswerLocked]);

  // Новий метод для пропуску питання (коли час вийшов)
  const skipQuestion = useCallback(() => {
    if (isAnswerLocked || !currentQuestion) return;

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
    if (currentIndex >= totalQuestions - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerLocked(false);
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

  // Автоматичне завершення гри, коли всі питання відповідені або пропущені
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
    skipQuestion, // Додаємо новий метод
    next,
    restart,
    getProgress
  };
};
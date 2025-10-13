import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameSettings, AnswerHistory } from '../types';

export interface GameResult {
  id: string;
  score: number;
  correct: number;
  total: number;
  percent: number;
  date: string;
  difficulty: string;
  userId: string;
}

interface GameState {
  // Стан
  settings: GameSettings;
  results: GameResult[];
  currentUserId: string;
  
  // Методи
  updateSettings: (newSettings: GameSettings) => void;
  addResult: (result: Omit<GameResult, 'id' | 'date'>) => void;
  setUser: (userId: string) => void;
  clearResults: () => void;
  resetSettings: () => void;
}

const defaultSettings: GameSettings = {
  difficulty: 'all',
  count: 5,
  timerDuration: 10
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Початковий стан
      settings: defaultSettings,
      results: [],
      currentUserId: '1',
      
      // Оновлення налаштувань
      updateSettings: (newSettings: GameSettings) => {
        set({ settings: newSettings });
      },
      
      // Додавання результату
      addResult: (result) => {
        const newResult: GameResult = {
          ...result,
          id: Date.now().toString(),
          date: new Date().toISOString()
        };
        
        set((state) => ({
          results: [...state.results, newResult]
        }));
      },
      
      // Встановлення користувача
      setUser: (userId: string) => {
        set({ currentUserId: userId });
      },
      
      // Очищення результатів
      clearResults: () => {
        set({ results: [] });
      },
      
      // Скидання налаштувань
      resetSettings: () => {
        set({ settings: defaultSettings });
      }
    }),
    {
      name: 'game-storage',
      partialize: (state) => ({
        settings: state.settings,
        results: state.results,
        currentUserId: state.currentUserId
      })
    }
  )
);
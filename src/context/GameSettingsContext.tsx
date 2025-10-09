import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { GameSettings, GameSettingsContextType } from '../types';


const defaultSettings: GameSettings = {
  difficulty: 'all',
  count: 5,
  timerDuration: 10,
  category: 'movies'
};

const GameSettingsContext = createContext<GameSettingsContextType | undefined>(undefined);

export const GameSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);

  // завантаження налаштувань з localStorage при ініціалізації
  useEffect(() => {
    const savedSettings = localStorage.getItem('quiz-game-settings');
    if (savedSettings) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
      } catch (error) {
        console.error('Помилка завантаження налаштувань:', error);
      }
    }
  }, []);

  // Збереження налаштувань у localStorage при зміні
  useEffect(() => {
    localStorage.setItem('quiz-game-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <GameSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </GameSettingsContext.Provider>
  );
};

export const useGameSettings = (): GameSettingsContextType => {
  const context = useContext(GameSettingsContext);
  if (!context) {
    throw new Error('useGameSettings must be used within a GameSettingsProvider');
  }
  return context;
};
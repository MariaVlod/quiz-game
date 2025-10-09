import { useState, useEffect, useRef, useCallback } from 'react';
import { useGameSettings } from '../context/GameSettingsContext';

interface UseTimerProps {
  onExpire?: () => void;
  autoStart?: boolean;
}

interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export const useTimer = ({
  onExpire,
  autoStart = false
}: UseTimerProps): UseTimerReturn => {
  const { settings } = useGameSettings();
  const [timeLeft, setTimeLeft] = useState<number>(settings.timerDuration);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  const intervalRef = useRef<number | null>(null);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (timeLeft > 0 && !isRunning) {
      console.log('▶️ Таймер запущено');
      setIsRunning(true);
    }
  }, [timeLeft, isRunning]);

  const pause = useCallback(() => {
    if (isRunning) {
      console.log('⏸️ Таймер зупинено');
      setIsRunning(false);
      clearTimerInterval();
    }
  }, [isRunning, clearTimerInterval]);

  const reset = useCallback(() => {
    console.log('🔄 Таймер скинуто до', settings.timerDuration, 'секунд');
    clearTimerInterval();
    setIsRunning(false);
    setTimeLeft(settings.timerDuration);
    
    if (autoStart) {
      // Невелика затримка перед автоматичним запуском
      setTimeout(() => {
        setIsRunning(true);
      }, 100);
    }
  }, [settings.timerDuration, autoStart, clearTimerInterval]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      console.log('⏰ Таймер активний, час:', timeLeft);
      
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            console.log('⏰ Час вийшов!');
            setIsRunning(false);
            clearTimerInterval();
            onExpire?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearTimerInterval();
    };
  }, [isRunning, timeLeft, onExpire, clearTimerInterval]);

  // Скидання таймера при зміні налаштувань
  useEffect(() => {
    reset();
  }, [settings.timerDuration, reset]);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset
  };
};
import { useState, useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';

/**
 * Параметри для налаштування таймера.
 */
export interface UseTimerProps {
  /**
   * Функція зворотного виклику, яка спрацьовує, коли час вичерпано.
   */
  onExpire?: () => void;
  /**
   * Чи запускати таймер автоматично після ініціалізації.
   * @default false
   */
  autoStart?: boolean;
}
/**
 * Об'єкт, який повертає хук useTimer.
 * Містить поточний стан часу та методи керування ним.
 */
export interface UseTimerReturn {
  /** Поточний час, що залишився (в секундах). */
  timeLeft: number;
  /** Чи активний зараз таймер (відлік йде). */
  isRunning: boolean;
  /** Запустити таймер. */
  start: () => void;
  /** Призупинити таймер. */
  pause: () => void;
  /** Призупинити таймер. */
  reset: () => void;
}

/**
 * Хук для створення таймера зворотного відліку.
 * Використовує налаштування глобального стору гри (gameStore) для визначення тривалості.
 * * @param props Налаштування таймера {@link UseTimerProps}
 * @returns Об'єкт з станом та методами керування {@link UseTimerReturn}
 * * @example
 * ```tsx
 * const { timeLeft, start, pause, reset } = useTimer({
 * onExpire: () => console.log('Час вийшов!'),
 * autoStart: true
 * });
 * * return <div>Залишилось часу: {timeLeft} сек</div>
 * ```
 */
export const useTimer = (
  { onExpire, autoStart = false }: UseTimerProps
): UseTimerReturn => {
  const { settings } = useGameStore();
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
      clearTimerInterval(); // ← ВІДНОВЛЮЮ ЦЕ!
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
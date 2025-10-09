import { useState, useEffect, useRef, useCallback } from 'react';
import { useGameSettings } from '../context/GameSettingsContext';

interface UseTimerProps {
  initialSeconds?: number;
  onExpire?: () => void;
  autoStart?: boolean;
}

interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: (seconds?: number) => void;
}

export const useTimer = (props: UseTimerProps): UseTimerReturn => {
  const { settings } = useGameSettings();
  const {
    initialSeconds = settings.timerDuration,
    onExpire,
    autoStart = false
  } = props;

  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const onExpireRef = useRef(onExpire);
  const hasExpiredRef = useRef(false);

  // 🔄 Оновлюємо callback при зміні onExpire
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  // 🧹 Очищення інтервалу
  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // ▶️ Запуск таймера
  const start = useCallback(() => {
    if (timeLeft > 0 && !isRunning) {
      setIsRunning(true);
      hasExpiredRef.current = false;
    }
  }, [timeLeft, isRunning]);

  // ⏸️ Пауза
  const pause = useCallback(() => {
    setIsRunning(false);
    clearTimerInterval();
  }, [clearTimerInterval]);

  // 🔁 Скидання
  const reset = useCallback(
    (seconds?: number) => {
      pause();
      setTimeLeft(seconds ?? settings.timerDuration);
      hasExpiredRef.current = false;
      setIsRunning(true);
    },
    [pause, settings.timerDuration]
  );

  // ⏳ Основна логіка таймера
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime <= 0 && !hasExpiredRef.current) {
            hasExpiredRef.current = true;
            setIsRunning(false);
            onExpireRef.current?.();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearTimerInterval();
    }

    return clearTimerInterval;
  }, [isRunning, timeLeft, clearTimerInterval]);

  // 🚀 Автоматичний запуск при монтуванні
  useEffect(() => {
    if (autoStart && timeLeft > 0) {
      start();
    }
  }, [autoStart, start, timeLeft]);

  // 🧩 Якщо змінюються налаштування гри — оновити таймер
  useEffect(() => {
    setTimeLeft(settings.timerDuration);
  }, [settings.timerDuration]);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset
  };
};

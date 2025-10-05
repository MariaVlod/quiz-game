import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerProps {
  initialSeconds: number;
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

export const useTimer = ({
  initialSeconds,
  onExpire,
  autoStart = false
}: UseTimerProps): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const onExpireRef = useRef(onExpire);
  const hasExpiredRef = useRef(false); // Новий ref для відстеження стану завершення

  // Оновлюємо ref при зміні onExpire
  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    console.log('Starting timer, timeLeft:', timeLeft, 'isRunning:', isRunning);
    if (timeLeft > 0 && !isRunning) {
      setIsRunning(true);
      hasExpiredRef.current = false; // Скидаємо стан завершення
    }
  }, [timeLeft, isRunning]);

  const pause = useCallback(() => {
    console.log('Pausing timer');
    setIsRunning(false);
    clearTimerInterval();
  }, [clearTimerInterval]);

  const reset = useCallback((seconds?: number) => {
    console.log('Resetting timer to:', seconds ?? initialSeconds);
    pause();
    setTimeLeft(seconds ?? initialSeconds);
    hasExpiredRef.current = false; // Скидаємо стан завершення при скиданні
    // Автоматично запускаємо після скидання
    setIsRunning(true);
  }, [initialSeconds, pause]);

  // Основний ефект для запуску/зупинки таймера
  useEffect(() => {
    console.log('Timer effect - isRunning:', isRunning, 'timeLeft:', timeLeft);
    
    if (isRunning && timeLeft > 0) {
      console.log('Setting up interval');
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          console.log('Timer tick:', prev, '->', newTime);
          
          if (newTime <= 0 && !hasExpiredRef.current) {
            console.log('Timer expired - calling onExpire');
            hasExpiredRef.current = true; // Позначаємо, що вже викликали onExpire
            setIsRunning(false);
            onExpireRef.current?.();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      console.log('Clearing interval - isRunning:', isRunning, 'timeLeft:', timeLeft);
      clearTimerInterval();
    }

    return clearTimerInterval;
  }, [isRunning, timeLeft, clearTimerInterval]);

  // Автозапуск при першому монтуванні
  useEffect(() => {
    console.log('AutoStart effect - autoStart:', autoStart);
    if (autoStart && timeLeft > 0) {
      start();
    }
  }, [autoStart]); // Видаляємо timeLeft і start з залежностей

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset
  };
};
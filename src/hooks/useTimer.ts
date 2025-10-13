import { useState, useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../store/gameStore'; //Zustand

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

export const useTimer = (
  { onExpire, autoStart = false }: UseTimerProps
): UseTimerReturn => {
  const { settings } = useGameStore(); //Zustand
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
      setIsRunning(true);
    }
  }, [timeLeft, isRunning]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    clearTimerInterval();
    setIsRunning(false);
    setTimeLeft(settings.timerDuration);
  }, [clearTimerInterval, settings.timerDuration]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            clearTimerInterval();
            onExpire?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearTimerInterval();
    };
  }, [isRunning, timeLeft, onExpire, clearTimerInterval]);

  useEffect(() => {
    if (autoStart) {
      start();
    }
  }, [autoStart, start]);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset
  };
};
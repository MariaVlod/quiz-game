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
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  const intervalRef = useRef<number | null>(null);

  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current !== null) {
    clearInterval(intervalRef.current);
     intervalRef.current = null;
}
  }, []);

  const start = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  }, [timeLeft]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((seconds?: number) => {
    clearTimerInterval();
    setIsRunning(false);
    setTimeLeft(seconds ?? initialSeconds);
  }, [initialSeconds, clearTimerInterval]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onExpire?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimerInterval();
    }

    return clearTimerInterval;
  }, [isRunning, timeLeft, onExpire, clearTimerInterval]);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset
  };
};
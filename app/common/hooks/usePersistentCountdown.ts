import { useState, useEffect, useCallback } from "react";

const usePersistentCountdown = (key: string) => {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const storageKey = `cooldown:${key}`;

  const updateTimer = useCallback(() => {
    const expiresAt = Number(localStorage.getItem(storageKey) || 0);

    const _remainingMs = Math.max(0, Math.ceil(expiresAt - Date.now()));
    setRemainingMs(_remainingMs);

    if (_remainingMs <= 0) {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  const clearTimer = useCallback(() => {
    localStorage.removeItem(storageKey);
    setRemainingMs(0);
  }, [storageKey]);

  const startTimer = useCallback(
    (durationMs: number) => {
      const expiresAt = Date.now() + durationMs;
      localStorage.setItem(storageKey, String(expiresAt));
      setRemainingMs(durationMs);
    },
    [storageKey],
  );

  useEffect(() => {
    updateTimer();

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [updateTimer]);

  return { remainingMs, startTimer, clearTimer, updateTimer };
};

export default usePersistentCountdown;

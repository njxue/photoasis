import { useState, useEffect, useCallback } from "react";

const usePersistentCountdown = (key) => {
  const [remainingMs, setRemainingMs] = useState(null);
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
    (durationMs) => {
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

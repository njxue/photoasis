import { useState } from "react";

export default function useProgress(total: number) {
  const [numCompleted, setNumCompleted] = useState<number>(0);

  const incrementProgress = () => {
    setNumCompleted((previous) => previous + 1);
  };

  const resetProgress = () => {
    setNumCompleted(0);
  };

  const progressPercentage =
    total <= 0 ? 0 : Math.round((numCompleted * 100) / total);

  return {
    incrementProgress,
    resetProgress,
    progressPercentage,
  };
}

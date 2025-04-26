import { useState } from "react";

export default function useProgress(total) {
  const [numCompleted, setNumCompleted] = useState(0);

  const incrementProgress = () => {
    setNumCompleted((prev) => prev + 1);
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

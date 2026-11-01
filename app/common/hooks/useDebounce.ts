import { useEffect, useState } from "react";

const useDebounce = <Value>(value: Value, delay = 500): Value => {
  const [debouncedValue, setDebouncedValue] = useState<Value>(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

import { useState, useEffect } from "react";

const useClickOutside = (ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current?.contains(e.target)) {
        setIsVisible(false);
      }
    };
    if (isVisible) {
      document.addEventListener("click", handleClick);
    }
    return () => document.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return { isVisible, setIsVisible };
};

export default useClickOutside;

import { useState, useEffect, type RefObject } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleClick = (event: globalThis.MouseEvent) => {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
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

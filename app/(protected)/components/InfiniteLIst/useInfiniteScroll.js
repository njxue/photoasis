import { useEffect, useRef } from "react";

export default function useInfiniteScroll({
  enabled,
  onLoadMore,
  overscan,
}) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void onLoadMore();
        }
      },
      { rootMargin: `${overscan}px` },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [enabled, onLoadMore, overscan]);

  return sentinelRef;
}

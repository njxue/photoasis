import { useEffect, useRef } from "react";

interface InfiniteScrollOptions {
  enabled: boolean;
  onLoadMore: () => void | Promise<unknown>;
  overscan: number;
}

export default function useInfiniteScroll({
  enabled,
  onLoadMore,
  overscan,
}: InfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null);

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

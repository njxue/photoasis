import { useEffect, useState, useRef, Fragment } from "react";

const DEFAULT_BATCH_SIZE = 5;
const DEFAULT_INITIAL_SIZE = 10;
const DEFAULT_OVERSCAN_PX = 100;
export default function InfiniteList({
  batchSize = DEFAULT_BATCH_SIZE,
  initialSize = DEFAULT_INITIAL_SIZE,
  overscan = DEFAULT_OVERSCAN_PX,
  className,
  items,
  keyExtractor,
  renderItem,
}) {
  const [visibleCount, setVisibleCount] = useState(initialSize);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const overscanPx = `${overscan}px`;
    const sentinel = sentinelRef.current;

    if (!sentinel || visibleCount >= items.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + batchSize);
        }
      },
      { rootMargin: overscanPx },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [overscan, batchSize, visibleCount, items]);

  return (
    <>
      <div className={className}>
        {items.slice(0, visibleCount).map((item, i) => (
          <Fragment key={keyExtractor(item, i)}>{renderItem(item, i)}</Fragment>
        ))}
      </div>
      {visibleCount < items.length && (
        <div ref={sentinelRef} aria-hidden="true" />
      )}
    </>
  );
}

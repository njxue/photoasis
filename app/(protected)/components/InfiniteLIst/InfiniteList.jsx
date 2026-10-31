import { useCallback, useState, Fragment } from "react";
import useInfiniteScroll from "./useInfiniteScroll";

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
  const hasMore = visibleCount < items.length;
  const loadMore = useCallback(
    () => setVisibleCount((prev) => prev + batchSize),
    [batchSize],
  );
  const sentinelRef = useInfiniteScroll({
    enabled: hasMore,
    onLoadMore: loadMore,
    overscan,
  });

  return (
    <>
      <div className={className}>
        {items.slice(0, visibleCount).map((item, i) => (
          <Fragment key={keyExtractor(item, i)}>{renderItem(item, i)}</Fragment>
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} aria-hidden="true" />}
    </>
  );
}

import { useCallback, useState, Fragment, type Key, type ReactNode } from "react";
import useInfiniteScroll from "./useInfiniteScroll";

const DEFAULT_BATCH_SIZE = 5;
const DEFAULT_INITIAL_SIZE = 10;
const DEFAULT_OVERSCAN_PX = 100;
interface InfiniteListProps<Item> {
  batchSize?: number;
  initialSize?: number;
  overscan?: number;
  className?: string;
  items: Item[];
  keyExtractor: (item: Item, index: number) => Key;
  renderItem: (item: Item, index: number) => ReactNode;
}

export default function InfiniteList<Item>({
  batchSize = DEFAULT_BATCH_SIZE,
  initialSize = DEFAULT_INITIAL_SIZE,
  overscan = DEFAULT_OVERSCAN_PX,
  className,
  items,
  keyExtractor,
  renderItem,
}: InfiniteListProps<Item>) {
  const [visibleCount, setVisibleCount] = useState<number>(initialSize);
  const hasMore = visibleCount < items.length;
  const loadMore = useCallback(
    () => setVisibleCount((previous) => previous + batchSize),
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
        {items.slice(0, visibleCount).map((item, index) => (
          <Fragment key={keyExtractor(item, index)}>{renderItem(item, index)}</Fragment>
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} aria-hidden="true" />}
    </>
  );
}

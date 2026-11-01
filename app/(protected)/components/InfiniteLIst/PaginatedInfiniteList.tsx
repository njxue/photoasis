import { Fragment, type Key, type ReactNode } from "react";
import useInfiniteScroll from "./useInfiniteScroll";

const DEFAULT_OVERSCAN_PX = 500;
interface PaginatedInfiniteListProps<Item> {
  overscan?: number;
  className?: string;
  items: Item[];
  keyExtractor: (item: Item, index: number) => Key;
  renderItem: (item: Item, index: number) => ReactNode;
  hasMore: boolean;
  loadNextPage: () => void | Promise<unknown>;
}

export default function PaginatedInfiniteList<Item>({
  overscan = DEFAULT_OVERSCAN_PX,
  className,
  items,
  keyExtractor,
  renderItem,
  hasMore,
  loadNextPage,
}: PaginatedInfiniteListProps<Item>) {
  const sentinelRef = useInfiniteScroll({
    enabled: hasMore,
    onLoadMore: loadNextPage,
    overscan,
  });

  return (
    <>
      <div className={className}>
        {items.map((item, index) => (
          <Fragment key={keyExtractor(item, index)}>{renderItem(item, index)}</Fragment>
        ))}
      </div>

      <div ref={sentinelRef} aria-hidden="true" />
    </>
  );
}

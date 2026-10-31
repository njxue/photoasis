import { Fragment } from "react";
import useInfiniteScroll from "./useInfiniteScroll";

const DEFAULT_OVERSCAN_PX = 500;
export default function PaginatedInfiniteList({
  overscan = DEFAULT_OVERSCAN_PX,
  className,
  items,
  keyExtractor,
  renderItem,
  hasMore,
  loadNextPage,
}) {
  const sentinelRef = useInfiniteScroll({
    enabled: hasMore,
    onLoadMore: loadNextPage,
    overscan,
  });

  return (
    <>
      <div className={className}>
        {items.map((item, i) => (
          <Fragment key={keyExtractor(item, i)}>{renderItem(item, i)}</Fragment>
        ))}
      </div>

      <div ref={sentinelRef} aria-hidden="true" />
    </>
  );
}

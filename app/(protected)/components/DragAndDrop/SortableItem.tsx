"use client";

import { useSortable } from "@dnd-kit/react/sortable";
import type { ReactNode } from "react";

interface SortableItemProps {
  children: ReactNode;
  disabled?: boolean;
  id: string | number;
  index: number;
}

const SortableItem = ({
  children,
  disabled = false,
  id,
  index,
}: SortableItemProps) => {
  const { ref, isDragging, isDropping } = useSortable({
    id,
    disabled,
    index,
    transition: {
      duration: 180,
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      idle: true,
    },
  });

  return (
    <div
      ref={ref}
      className={`group/sortable relative ${
        isDragging ? "opacity-25" : "opacity-100"
      } ${isDropping ? "z-10" : ""} ${
        disabled
          ? ""
          : "cursor-grab touch-manipulation select-none will-change-transform active:cursor-grabbing [&_*]:[-webkit-user-drag:none]"
      }`}>
      {children}
    </div>
  );
};

export default SortableItem;

"use client";
import { useState, type DragEvent, type ReactNode } from "react";
interface DraggableAndDroppableProps {
  children: ReactNode;
  onDragStart?: () => void;
  onDrop?: () => void;
  onDragEnter?: () => void;
  disabled?: boolean;
}
function DraggableAndDroppable({
  children,
  onDragStart,
  onDrop,
  onDragEnter,
  disabled,
}: DraggableAndDroppableProps) {
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingOver(true);
  }

  function handleDrop() {
    onDrop?.();
    setIsDraggingOver(false);
  }

  return disabled ? (
    <>{children}</>
  ) : (
    <div
      draggable
      onDragStart={onDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={() => setIsDraggingOver(false)}
      className={`${isDraggingOver && "opacity-30"}`}>
      {children}
    </div>
  );
}

export default DraggableAndDroppable;

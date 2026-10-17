"use client";
import { useState } from "react";
function DraggableAndDroppable({
  children,
  onDragStart,
  onDrop,
  onDragEnter,
  disabled,
}) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();
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

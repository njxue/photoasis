"use client";
import { useState } from "react";
function DraggableAndDroppable({ children, handleDrag, handleDrop }) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  function handleDragOver(e) {
    e.preventDefault();
    setIsDraggingOver(true);
  }

  return (
    <div
      draggable
      onDragStart={handleDrag}
      onDrop={(e) => {
        handleDrop(e);
        setIsDraggingOver(false);
      }}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDraggingOver(false)}
      className={`${isDraggingOver && "opacity-30"}`}>
      {children}
    </div>
  );
}

export default DraggableAndDroppable;

"use client";

function DraggableAndDroppable({ children, handleDrag, handleDrop }) {
  function handleDragOver(e) {
    e.preventDefault();
  }
  return (
    <div
      draggable
      onDragStart={handleDrag}
      onDrop={handleDrop}
      onDragOver={handleDragOver}>
      {children}
    </div>
  );
}

export default DraggableAndDroppable;

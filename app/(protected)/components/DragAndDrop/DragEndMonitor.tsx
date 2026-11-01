"use client";

import { useDragDropMonitor, type DragEndEvent } from "@dnd-kit/react";

interface DragEndMonitorProps {
  onDragEnd: (event: DragEndEvent) => void;
}

const DragEndMonitor = ({ onDragEnd }: DragEndMonitorProps) => {
  useDragDropMonitor({ onDragEnd });
  return null;
};

export default DragEndMonitor;

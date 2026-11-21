"use client";

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export function SortableItem(props: { id: string; children: React.ReactNode; className?: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={`relative ${props.className || ''}`}>
      <div
        className="absolute top-3 right-3 p-1.5 bg-surface-elevated/90 hover:bg-surface-elevated border border-surface-border rounded-md shadow cursor-grab active:cursor-grabbing z-20 transition-colors text-content-secondary hover:text-lime"
        {...attributes}
        {...listeners}
        title="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </div>
      {props.children}
    </div>
  );
}

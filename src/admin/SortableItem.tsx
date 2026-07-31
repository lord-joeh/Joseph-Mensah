import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export function SortableItem(props: { id: string, children: React.ReactNode, className?: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={`relative ${props.className || ''}`}>
      <div
        className="absolute top-2 right-2 p-2 bg-background/80 hover:bg-background rounded-md shadow cursor-grab active:cursor-grabbing z-10 transition-colors"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-4 h-4 text-foreground" />
      </div>
      {props.children}
    </div>
  );
}

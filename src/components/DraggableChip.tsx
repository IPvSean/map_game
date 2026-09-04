import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface DraggableChipProps {
  label: string
  id: string
  returning?: boolean
}

export function DraggableChip({ label, id, returning }: DraggableChipProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`draggable-chip${isDragging ? ' dragging' : ''}${returning ? ' returning' : ''}`}
      aria-label={label}
      {...listeners}
      {...attributes}
    >
      {label}
    </div>
  )
}

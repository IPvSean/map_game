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

  const translate = CSS.Translate.toString(transform)
  const style = {
    transform: translate
      ? `${translate} scale(${isDragging ? 0.14 : 1})`
      : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`draggable-chip${isDragging ? ' dragging' : ''}${returning ? ' returning' : ''}`}
      aria-label={isDragging ? `Placing ${label}` : label}
      {...listeners}
      {...attributes}
    >
      {!isDragging && label}
    </div>
  )
}

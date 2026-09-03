interface ChoiceButtonProps {
  label: string
  onClick: () => void
  state?: 'default' | 'correct' | 'wrong'
  disabled?: boolean
}

export function ChoiceButton({
  label,
  onClick,
  state = 'default',
  disabled = false,
}: ChoiceButtonProps) {
  return (
    <button
      type="button"
      className={`choice-btn${state !== 'default' ? ` ${state}` : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

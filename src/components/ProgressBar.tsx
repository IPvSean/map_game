interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? ((current + 1) / total) * 100 : 0

  return (
    <div className="progress-bar-wrap">
      <div className="progress-label">
        {current + 1} / {total}
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

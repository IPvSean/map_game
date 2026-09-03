interface ResultsScreenProps {
  correctCount: number
  totalQuestions: number
  missCount: number
  onPlayAgain: () => void
  onGoHome: () => void
}

export function ResultsScreen({
  correctCount,
  totalQuestions,
  missCount,
  onPlayAgain,
  onGoHome,
}: ResultsScreenProps) {
  const pct = totalQuestions > 0
    ? Math.round((correctCount / totalQuestions) * 100)
    : 0

  let message = 'Keep practicing!'
  if (pct >= 90) message = 'Amazing work!'
  else if (pct >= 70) message = 'Great job!'
  else if (pct >= 50) message = 'Good effort!'

  return (
    <div className="results-screen">
      <h2 className="results-title">{message}</h2>
      <div className="results-score">{correctCount} / {totalQuestions}</div>
      <p className="results-detail">
        You got {correctCount} right
        {missCount > 0 ? ` with ${missCount} tries` : ''}!
      </p>
      <div className="results-actions">
        <button type="button" className="action-btn primary" onClick={onPlayAgain}>
          Play Again
        </button>
        <button type="button" className="action-btn secondary" onClick={onGoHome}>
          Back Home
        </button>
      </div>
    </div>
  )
}

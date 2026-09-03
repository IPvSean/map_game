import { useCallback, useState } from 'react'
import { regions } from '../data/regions'
import { useDistractors } from '../hooks/useDistractors'
import { useQuizSession } from '../hooks/useQuizSession'
import { ChoiceButton } from './ChoiceButton'
import { ProgressBar } from './ProgressBar'
import { ResultsScreen } from './ResultsScreen'

interface FlashcardModeProps {
  onBack: () => void
}

type AnswerState = 'default' | 'correct' | 'wrong'

export function FlashcardMode({ onBack }: FlashcardModeProps) {
  const session = useQuizSession(regions)
  const choices = useDistractors(session.currentQuestion, regions)
  const [answerStates, setAnswerStates] = useState<Record<string, AnswerState>>({})
  const [feedback, setFeedback] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)

  const handleChoice = useCallback(
    (regionId: string) => {
      if (locked || !session.currentQuestion) return

      const isCorrect = regionId === session.currentQuestion.id
      setLocked(true)

      if (isCorrect) {
        setAnswerStates({ [regionId]: 'correct' })
        setFeedback('Great job!')
        session.markCorrect()
        setTimeout(() => {
          setAnswerStates({})
          setFeedback(null)
          setLocked(false)
          session.next()
        }, 1000)
      } else {
        setAnswerStates({ [regionId]: 'wrong' })
        setFeedback('Almost — try again!')
        session.markWrong()
        setTimeout(() => {
          setAnswerStates({})
          setFeedback(null)
          setLocked(false)
        }, 800)
      }
    },
    [locked, session],
  )

  if (session.isComplete) {
    return (
      <>
        <div className="screen-header">
          <button type="button" className="back-btn" onClick={onBack} aria-label="Back">
            ←
          </button>
          <h1 className="screen-title">Flashcards</h1>
        </div>
        <ResultsScreen
          correctCount={session.correctCount}
          totalQuestions={session.totalQuestions}
          missCount={session.missCount}
          onPlayAgain={session.restart}
          onGoHome={onBack}
        />
      </>
    )
  }

  return (
    <div className="flashcard-screen">
      <div className="screen-header">
        <button type="button" className="back-btn" onClick={onBack} aria-label="Back">
          ←
        </button>
        <h1 className="screen-title">Flashcards</h1>
      </div>

      <ProgressBar current={session.currentIndex} total={session.totalQuestions} />

      {feedback && (
        <div
          className={`feedback-banner ${feedback.includes('Great') ? 'success' : 'error'}`}
        >
          {feedback}
        </div>
      )}

      <div className="question-card">
        <p className="question-text">
          Where is{' '}
          <span className="question-highlight">
            {session.currentQuestion?.name}
          </span>
          ?
        </p>
      </div>

      <div className="choices-grid">
        {choices.map((region) => (
          <ChoiceButton
            key={region.id}
            label={region.name}
            onClick={() => handleChoice(region.id)}
            state={answerStates[region.id] ?? 'default'}
            disabled={locked}
          />
        ))}
      </div>
    </div>
  )
}

import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { useCallback, useRef, useState } from 'react'
import { findRegionAtPoint, regions, screenToSvgCoords } from '../data/regions'
import { useQuizSession } from '../hooks/useQuizSession'
import { DraggableChip } from './DraggableChip'
import { ProgressBar } from './ProgressBar'
import { ResultsScreen } from './ResultsScreen'
import { WorldMap } from './WorldMap'

interface WorldMapModeProps {
  onBack: () => void
}

const CHIP_ID = 'region-chip'

export function WorldMapMode({ onBack }: WorldMapModeProps) {
  const session = useQuizSession(regions)
  const svgRef = useRef<SVGSVGElement>(null)
  const [highlightedZone, setHighlightedZone] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [returning, setReturning] = useState(false)
  const [missesOnQuestion, setMissesOnQuestion] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [advancing, setAdvancing] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (advancing || !session.currentQuestion || !svgRef.current) return

      const { active } = event
      if (active.id !== CHIP_ID) return

      const rect = active.rect.current.translated
      if (!rect) return

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const svgCoords = screenToSvgCoords(svgRef.current, centerX, centerY)
      const droppedRegion = findRegionAtPoint(svgCoords.x, svgCoords.y)

      if (droppedRegion?.id === session.currentQuestion.id) {
        setAdvancing(true)
        setHighlightedZone(session.currentQuestion.highlightId)
        setFeedback('Great job!')
        session.markCorrect()

        setTimeout(() => {
          setHighlightedZone(null)
          setFeedback(null)
          setMissesOnQuestion(0)
          setShowHint(false)
          setAdvancing(false)
          session.next()
        }, 1200)
      } else {
        setReturning(true)
        setFeedback('Try again — drag to the right spot!')
        session.markWrong()
        const newMisses = missesOnQuestion + 1
        setMissesOnQuestion(newMisses)
        if (newMisses >= 2) {
          setShowHint(true)
        }
        setTimeout(() => {
          setReturning(false)
          setFeedback(null)
        }, 600)
      }
    },
    [advancing, session, missesOnQuestion],
  )

  if (session.isComplete) {
    return (
      <>
        <div className="screen-header">
          <button type="button" className="back-btn" onClick={onBack} aria-label="Back">
            ←
          </button>
          <h1 className="screen-title">World Map</h1>
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

  const target = session.currentQuestion

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="map-screen">
        <div className="screen-header">
          <button type="button" className="back-btn" onClick={onBack} aria-label="Back">
            ←
          </button>
          <h1 className="screen-title">World Map</h1>
        </div>

        <ProgressBar current={session.currentIndex} total={session.totalQuestions} />

        {feedback && (
          <div
            className={`feedback-banner ${feedback.includes('Great') ? 'success' : 'error'}`}
          >
            {feedback}
          </div>
        )}

        <div className="map-prompt">
          Place{' '}
          <span className="map-prompt-highlight">{target?.name}</span>
          {' '}on the map
        </div>

        <div className="map-container">
          <WorldMap
            ref={svgRef}
            highlightedZoneId={highlightedZone}
          />
          {showHint && target && (
            <div
              className="hint-arrow"
              style={{
                position: 'absolute',
                left: `calc(${(target.dropZone.cx / 800) * 100}% - 8px)`,
                top: `calc(${(target.dropZone.cy / 450) * 100}% - 32px)`,
              }}
              aria-hidden="true"
            >
              ↓
            </div>
          )}
        </div>

        <div className="chip-area">
          {!advancing && target && (
            <DraggableChip
              id={CHIP_ID}
              label={target.name}
              returning={returning}
            />
          )}
        </div>
      </div>
    </DndContext>
  )
}

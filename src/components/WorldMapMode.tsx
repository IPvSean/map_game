import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragMoveEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { useCallback, useRef, useState } from 'react'
import { findRegionAtDrop } from '../data/mapHitTest'
import { regions, screenToSvgCoords } from '../data/regions'
import { useQuizSession } from '../hooks/useQuizSession'
import { DraggableChip } from './DraggableChip'
import { ProgressBar } from './ProgressBar'
import { ResultsScreen } from './ResultsScreen'
import { WorldMap } from './WorldMap'

interface WorldMapModeProps {
  onBack: () => void
}

const CHIP_ID = 'region-chip'

function pointerFromDragEvent(event: DragMoveEvent | DragEndEvent): { x: number; y: number } | null {
  const rect = event.active.rect.current.translated
  if (!rect) return null
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

export function WorldMapMode({ onBack }: WorldMapModeProps) {
  const session = useQuizSession(regions)
  const svgRef = useRef<SVGSVGElement>(null)
  const [highlightedZone, setHighlightedZone] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [returning, setReturning] = useState(false)
  const [missesOnQuestion, setMissesOnQuestion] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [advancing, setAdvancing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
  )

  const updateHoverFromDrag = useCallback((event: DragMoveEvent | DragEndEvent) => {
    if (!svgRef.current) return
    const pointer = pointerFromDragEvent(event)
    if (!pointer) return
    const svgCoords = screenToSvgCoords(svgRef.current, pointer.x, pointer.y)
    const region = findRegionAtDrop(svgRef.current, svgCoords.x, svgCoords.y)
    setHoveredRegionId(region?.id ?? null)
  }, [])

  const handleDragStart = useCallback((_event: DragStartEvent) => {
    setIsDragging(true)
  }, [])

  const handleDragMove = useCallback(
    (event: DragMoveEvent) => {
      updateHoverFromDrag(event)
    },
    [updateHoverFromDrag],
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setIsDragging(false)
      setHoveredRegionId(null)

      if (advancing || !session.currentQuestion || !svgRef.current) return

      const { active } = event
      if (active.id !== CHIP_ID) return

      const pointer = pointerFromDragEvent(event)
      if (!pointer) return

      const svgCoords = screenToSvgCoords(svgRef.current, pointer.x, pointer.y)
      const droppedRegion = findRegionAtDrop(svgRef.current, svgCoords.x, svgCoords.y)

      if (droppedRegion?.id === session.currentQuestion.id) {
        setAdvancing(true)
        setHighlightedZone(session.currentQuestion.id)
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

  const handleDragCancel = useCallback(() => {
    setIsDragging(false)
    setHoveredRegionId(null)
  }, [])

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
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
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

        {isDragging && (
          <p className="map-drag-hint">
            {hoveredRegionId
              ? `Over: ${getRegionLabel(hoveredRegionId)}`
              : 'Drag over a glowing zone on the map'}
          </p>
        )}

        <div className="map-container">
          <WorldMap
            ref={svgRef}
            highlightedRegionId={highlightedZone}
            hintRegionId={showHint ? target?.id : null}
            hoveredRegionId={hoveredRegionId}
            showDropZones={isDragging || showHint}
          />
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

function getRegionLabel(id: string): string {
  return regions.find((r) => r.id === id)?.name ?? id
}

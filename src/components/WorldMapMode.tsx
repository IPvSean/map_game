import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragCancelEvent,
  type DragEndEvent,
  type DragMoveEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { snapCenterToCursor } from '@dnd-kit/modifiers'
import { useCallback, useRef, useState } from 'react'
import { findRegionAtDrop } from '../data/mapHitTest'
import { regions, screenToSvgCoords } from '../data/regions'
import { useQuizSession } from '../hooks/useQuizSession'
import { DragPin } from './DragPin'
import { DraggableChip } from './DraggableChip'
import { ProgressBar } from './ProgressBar'
import { ResultsScreen } from './ResultsScreen'
import { WorldMap } from './WorldMap'

interface WorldMapModeProps {
  onBack: () => void
}

const CHIP_ID = 'region-chip'

function pointerFromDragEvent(event: DragMoveEvent | DragEndEvent | DragCancelEvent): { x: number; y: number } | null {
  const activator = event.activatorEvent

  if (activator instanceof MouseEvent) {
    return {
      x: activator.clientX + event.delta.x,
      y: activator.clientY + event.delta.y,
    }
  }

  if (activator instanceof TouchEvent) {
    const touch = activator.touches[0] ?? activator.changedTouches[0]
    if (touch) {
      return {
        x: touch.clientX + event.delta.x,
        y: touch.clientY + event.delta.y,
      }
    }
  }

  const translated = event.active.rect.current.translated
  if (translated) {
    return {
      x: translated.left + translated.width / 2,
      y: translated.top + translated.height / 2,
    }
  }

  const initial = event.active.rect.current.initial
  if (initial) {
    return {
      x: initial.left + initial.width / 2 + event.delta.x,
      y: initial.top + initial.height / 2 + event.delta.y,
    }
  }

  return null
}

export function WorldMapMode({ onBack }: WorldMapModeProps) {
  const session = useQuizSession(regions)
  const svgRef = useRef<SVGSVGElement>(null)
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null)
  const [highlightedZone, setHighlightedZone] = useState<string | null>(null)
  const [showCorrect, setShowCorrect] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [returning, setReturning] = useState(false)
  const [missesOnQuestion, setMissesOnQuestion] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [advancing, setAdvancing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
  )

  const resolvePointer = useCallback((event: DragMoveEvent | DragEndEvent | DragCancelEvent) => {
    return pointerFromDragEvent(event) ?? lastPointerRef.current
  }, [])

  const updateHoverFromDrag = useCallback((event: DragMoveEvent | DragEndEvent | DragCancelEvent) => {
    if (!svgRef.current) return
    const pointer = resolvePointer(event)
    if (!pointer) return
    lastPointerRef.current = pointer
    const svgCoords = screenToSvgCoords(svgRef.current, pointer.x, pointer.y)
    const region = findRegionAtDrop(svgRef.current, svgCoords.x, svgCoords.y)
    setHoveredRegionId(region?.id ?? null)
  }, [resolvePointer])

  const processDrop = useCallback(
    (event: DragEndEvent | DragCancelEvent) => {
      if (advancing || !session.currentQuestion || !svgRef.current) return

      const { active } = event
      if (active.id !== CHIP_ID) return

      const pointer = resolvePointer(event)
      if (!pointer) {
        setFeedback('Drop on the map!')
        setTimeout(() => setFeedback(null), 800)
        return
      }

      const svgCoords = screenToSvgCoords(svgRef.current, pointer.x, pointer.y)
      const droppedRegion = findRegionAtDrop(svgRef.current, svgCoords.x, svgCoords.y)

      if (droppedRegion?.id === session.currentQuestion.id) {
        setAdvancing(true)
        setHighlightedZone(session.currentQuestion.id)
        setShowCorrect(true)
        session.markCorrect()

        setTimeout(() => {
          setHighlightedZone(null)
          setShowCorrect(false)
          setMissesOnQuestion(0)
          setShowHint(false)
          setAdvancing(false)
          session.next()
        }, 1500)
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
        }, 800)
      }
    },
    [advancing, session, missesOnQuestion, resolvePointer],
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    lastPointerRef.current = null
    setIsDragging(true)
    setActiveDragId(String(event.active.id))
  }, [])

  const handleDragMove = useCallback(
    (event: DragMoveEvent) => {
      updateHoverFromDrag(event)
    },
    [updateHoverFromDrag],
  )

  const endDrag = useCallback(() => {
    setIsDragging(false)
    setActiveDragId(null)
    setHoveredRegionId(null)
  }, [])

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      endDrag()
      processDrop(event)
    },
    [processDrop, endDrag],
  )

  const handleDragCancel = useCallback(
    (event: DragCancelEvent) => {
      endDrag()
      // Touch releases often cancel instead of ending — still score the drop
      if (lastPointerRef.current) {
        processDrop(event)
      }
    },
    [processDrop, endDrag],
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
          <div className="feedback-banner error">
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
              ? 'Release to drop'
              : 'Drag to a glowing zone on the map'}
          </p>
        )}

        <div className="map-container">
          <WorldMap
            ref={svgRef}
            highlightedRegionId={highlightedZone}
            hintRegionId={showHint ? target?.id : null}
            hoveredRegionId={hoveredRegionId}
            showDropZones={isDragging}
          />
          {showCorrect && (
            <div className="correct-overlay" aria-live="polite" role="status">
              <div className="correct-burst">
                <span className="correct-spark" aria-hidden="true">★</span>
                <p className="correct-text">CORRECT!</p>
                <span className="correct-spark" aria-hidden="true">★</span>
              </div>
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
      <DragOverlay modifiers={[snapCenterToCursor]}>
        {activeDragId === CHIP_ID ? <DragPin /> : null}
      </DragOverlay>
    </DndContext>
  )
}

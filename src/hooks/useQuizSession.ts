import { useCallback, useMemo, useState } from 'react'
import type { Region } from '../data/regions'
import { shuffle } from '../utils/shuffle'

export interface QuizSession {
  questions: Region[]
  currentIndex: number
  correctCount: number
  missCount: number
  currentQuestion: Region | null
  totalQuestions: number
  isComplete: boolean
  markCorrect: () => void
  markWrong: () => void
  next: () => void
  restart: () => void
}

export function useQuizSession(allRegions: Region[]): QuizSession {
  const [questions, setQuestions] = useState(() => shuffle(allRegions))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [missCount, setMissCount] = useState(0)

  const currentQuestion = questions[currentIndex] ?? null
  const isComplete = currentIndex >= questions.length

  const markCorrect = useCallback(() => {
    setCorrectCount((c) => c + 1)
  }, [])

  const markWrong = useCallback(() => {
    setMissCount((c) => c + 1)
  }, [])

  const next = useCallback(() => {
    setCurrentIndex((i) => i + 1)
  }, [])

  const restart = useCallback(() => {
    setQuestions(shuffle(allRegions))
    setCurrentIndex(0)
    setCorrectCount(0)
    setMissCount(0)
  }, [allRegions])

  return useMemo(
    () => ({
      questions,
      currentIndex,
      correctCount,
      missCount,
      currentQuestion,
      totalQuestions: questions.length,
      isComplete,
      markCorrect,
      markWrong,
      next,
      restart,
    }),
    [
      questions,
      currentIndex,
      correctCount,
      missCount,
      currentQuestion,
      isComplete,
      markCorrect,
      markWrong,
      next,
      restart,
    ],
  )
}

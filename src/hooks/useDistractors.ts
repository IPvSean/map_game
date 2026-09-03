import { useMemo } from 'react'
import type { Region } from '../data/regions'

function shuffle<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function useDistractors(
  correct: Region | null,
  allRegions: Region[],
  count = 3,
): Region[] {
  return useMemo(() => {
    if (!correct) return []

    const others = allRegions.filter((r) => r.id !== correct.id)
    const shuffled = shuffle(others)
    const distractors = shuffled.slice(0, count)
    return shuffle([correct, ...distractors])
  }, [correct?.id, allRegions, count])
}

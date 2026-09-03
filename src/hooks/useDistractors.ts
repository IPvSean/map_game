import { useMemo } from 'react'
import type { Region } from '../data/regions'
import { shuffle } from '../utils/shuffle'

export function useDistractors(
  correct: Region | null,
  allRegions: Region[],
  shuffleKey = 0,
  count = 3,
): Region[] {
  return useMemo(() => {
    if (!correct) return []

    const others = allRegions.filter((r) => r.id !== correct.id)
    const distractors = shuffle(others).slice(0, count)
    return shuffle([correct, ...distractors])
  }, [correct?.id, allRegions, count, shuffleKey])
}

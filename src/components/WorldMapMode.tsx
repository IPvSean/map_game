import { getMapLevel } from '../data/mapLevels'
import { MapQuizMode } from './MapQuizMode'

interface WorldMapModeProps {
  onBack: () => void
}

/** @deprecated Use MapQuizMode with getMapLevel('world') */
export function WorldMapMode({ onBack }: WorldMapModeProps) {
  return <MapQuizMode level={getMapLevel('world')} onBack={onBack} />
}

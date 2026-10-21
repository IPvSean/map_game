import { africaLevel } from './africaLevel'
import { asiaLevel } from './asiaLevel'
import { europeLevel } from './europeLevel'
import type { LevelId, MapLevelDefinition } from './types'
import { worldLevel } from './worldLevel'

export type { LevelId, MapLevelDefinition } from './types'

const levels: Record<LevelId, MapLevelDefinition> = {
  world: worldLevel,
  europe: europeLevel,
  asia: asiaLevel,
  africa: africaLevel,
}

export function getMapLevel(id: LevelId): MapLevelDefinition {
  return levels[id]
}

export const levelList: MapLevelDefinition[] = [
  worldLevel,
  europeLevel,
  asiaLevel,
  africaLevel,
]

import { buildCountryPaths } from '../buildCountryPaths'
import { buildWaterPaths } from '../buildWaterPaths'
import { createMapHitTest } from '../createMapHitTest'
import { geoRadiusToSvg, geoToSvg, MAP_VIEWBOX, projection } from '../mapProjection'
import {
  getRegionForCountry,
  isCountryInRegion,
  WATER_REGIONS,
} from '../regionGeography'
import { getRegionById, regions } from '../regions'
import { worldWaterPolygons } from '../worldWaterPolygons'
import type { MapLevelDefinition } from './types'

let cachedPaths: ReturnType<typeof buildCountryPaths> | null = null
let cachedWaterPaths: ReturnType<typeof buildWaterPaths> | null = null

function getCountryPaths() {
  if (!cachedPaths) {
    cachedPaths = buildCountryPaths(projection, getRegionForCountry)
  }
  return cachedPaths
}

function getWaterPaths() {
  if (!cachedWaterPaths) {
    cachedWaterPaths = buildWaterPaths(projection, worldWaterPolygons)
  }
  return cachedWaterPaths
}

const hitTest = createMapHitTest({ getRegionById })

export const worldLevel: MapLevelDefinition = {
  id: 'world',
  title: 'World',
  subtitle: 'Continents & oceans',
  regions,
  getRegionById,
  getCountryPaths,
  getWaterPaths,
  findRegionAtDrop: hitTest.findRegionAtDrop,
  isWaterRegion: (id) => WATER_REGIONS.has(id),
  isCountryInRegion,
  viewBox: MAP_VIEWBOX,
  geoToSvg,
  geoRadiusToSvg,
}

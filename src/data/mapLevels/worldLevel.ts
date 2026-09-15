import { buildCountryPaths } from '../buildCountryPaths'
import { createMapHitTest } from '../createMapHitTest'
import {
  geoRadiusToSvg,
  geoToSvg,
  MAP_VIEWBOX,
  projection,
} from '../mapProjection'
import {
  getRegionForCountry,
  isCountryInRegion,
  WATER_REGIONS,
} from '../regionGeography'
import { getRegionById, regions } from '../regions'
import type { MapLevelDefinition } from './types'

let cachedPaths: ReturnType<typeof buildCountryPaths> | null = null

function getCountryPaths() {
  if (!cachedPaths) {
    cachedPaths = buildCountryPaths(projection, getRegionForCountry)
  }
  return cachedPaths
}

const hitTest = createMapHitTest({
  regions,
  waterRegionIds: WATER_REGIONS,
  getRegionById,
  geoToSvg,
  geoRadiusToSvg,
})

export const worldLevel: MapLevelDefinition = {
  id: 'world',
  title: 'World',
  subtitle: 'Continents & oceans',
  regions,
  getRegionById,
  getCountryPaths,
  findRegionAtDrop: hitTest.findRegionAtDrop,
  getDropZoneCircles: hitTest.getDropZoneCircles,
  isWaterRegion: (id) => WATER_REGIONS.has(id),
  isCountryInRegion,
  viewBox: MAP_VIEWBOX,
  geoToSvg,
  geoRadiusToSvg,
}

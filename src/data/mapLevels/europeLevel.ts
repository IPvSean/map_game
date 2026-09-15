import { buildCountryPaths } from '../buildCountryPaths'
import { buildWaterPaths } from '../buildWaterPaths'
import { createMapHitTest } from '../createMapHitTest'
import {
  EUROPE_WATER_REGIONS,
  getEuropeRegionForCountry,
  isEuropeCountryInRegion,
} from '../europeGeography'
import { europeWaterPolygons } from '../europeWaterPolygons'
import { EUROPE_WATER_HIT_PRIORITY } from '../waterHitPriority'
import {
  EUROPE_VIEWBOX,
  europeGeoRadiusToSvg,
  europeGeoToSvg,
  europeProjection,
} from '../europeProjection'
import { europeRegions, getEuropeRegionById } from '../europeRegions'
import type { MapLevelDefinition } from './types'

let cachedPaths: ReturnType<typeof buildCountryPaths> | null = null
let cachedWaterPaths: ReturnType<typeof buildWaterPaths> | null = null

function getCountryPaths() {
  if (!cachedPaths) {
    cachedPaths = buildCountryPaths(europeProjection, getEuropeRegionForCountry)
  }
  return cachedPaths
}

function getWaterPaths() {
  if (!cachedWaterPaths) {
    cachedWaterPaths = buildWaterPaths(europeProjection, europeWaterPolygons)
  }
  return cachedWaterPaths
}

const hitTest = createMapHitTest({
  getRegionById: getEuropeRegionById,
  waterHitPriority: EUROPE_WATER_HIT_PRIORITY,
})

export const europeLevel: MapLevelDefinition = {
  id: 'europe',
  title: 'Europe',
  subtitle: 'Countries & seas',
  regions: europeRegions,
  getRegionById: getEuropeRegionById,
  getCountryPaths,
  getWaterPaths,
  findRegionAtDrop: hitTest.findRegionAtDrop,
  isWaterRegion: (id) => EUROPE_WATER_REGIONS.has(id),
  isCountryInRegion: isEuropeCountryInRegion,
  viewBox: EUROPE_VIEWBOX,
  geoToSvg: europeGeoToSvg,
  geoRadiusToSvg: europeGeoRadiusToSvg,
}

import { buildCountryPaths } from '../buildCountryPaths'
import { createMapHitTest } from '../createMapHitTest'
import {
  EUROPE_WATER_REGIONS,
  getEuropeRegionForCountry,
  isEuropeCountryInRegion,
} from '../europeGeography'
import {
  EUROPE_VIEWBOX,
  europeGeoRadiusToSvg,
  europeGeoToSvg,
  europeProjection,
} from '../europeProjection'
import { europeRegions, getEuropeRegionById } from '../europeRegions'
import type { MapLevelDefinition } from './types'

let cachedPaths: ReturnType<typeof buildCountryPaths> | null = null

function getCountryPaths() {
  if (!cachedPaths) {
    cachedPaths = buildCountryPaths(europeProjection, getEuropeRegionForCountry)
  }
  return cachedPaths
}

const hitTest = createMapHitTest({
  regions: europeRegions,
  waterRegionIds: EUROPE_WATER_REGIONS,
  getRegionById: getEuropeRegionById,
  geoToSvg: europeGeoToSvg,
  geoRadiusToSvg: europeGeoRadiusToSvg,
})

export const europeLevel: MapLevelDefinition = {
  id: 'europe',
  title: 'Europe',
  subtitle: 'Countries & seas',
  regions: europeRegions,
  getRegionById: getEuropeRegionById,
  getCountryPaths,
  findRegionAtDrop: hitTest.findRegionAtDrop,
  getDropZoneCircles: hitTest.getDropZoneCircles,
  isWaterRegion: (id) => EUROPE_WATER_REGIONS.has(id),
  isCountryInRegion: isEuropeCountryInRegion,
  viewBox: EUROPE_VIEWBOX,
  geoToSvg: europeGeoToSvg,
  geoRadiusToSvg: europeGeoRadiusToSvg,
}

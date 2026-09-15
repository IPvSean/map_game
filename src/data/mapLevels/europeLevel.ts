import type { FeatureCollection } from 'geojson'
import { buildCountryPaths } from '../buildCountryPaths'
import { buildMarinePaths } from '../buildMarinePaths'
import type { WaterPath } from '../buildWaterPaths'
import { createMapHitTest } from '../createMapHitTest'
import {
  EUROPE_WATER_REGIONS,
  getEuropeRegionForCountry,
  isEuropeCountryInRegion,
} from '../europeGeography'
import { EUROPE_MARINE_NAME_TO_REGION } from '../europeMarineNames'
import europeMarineGeo from '../naturalEarth/ne_50m_geography_marine_polys.json'
import {
  EUROPE_VIEWBOX,
  europeGeoRadiusToSvg,
  europeGeoToSvg,
  europeProjection,
} from '../europeProjection'
import { europeRegions, getEuropeRegionById } from '../europeRegions'
import type { WaterCircleZone } from '../waterCircleZones'
import { EUROPE_WATER_HIT_PRIORITY } from '../waterHitPriority'
import type { MapLevelDefinition } from './types'

const STRAIT_OF_GIBRALTAR_ID = 'strait-of-gibraltar'

let cachedPaths: ReturnType<typeof buildCountryPaths> | null = null
let cachedWaterPaths: WaterPath[] | null = null

function getCountryPaths() {
  if (!cachedPaths) {
    cachedPaths = buildCountryPaths(europeProjection, getEuropeRegionForCountry)
  }
  return cachedPaths
}

function getWaterPaths() {
  if (!cachedWaterPaths) {
    cachedWaterPaths = buildMarinePaths(
      europeProjection,
      europeMarineGeo as unknown as FeatureCollection,
      EUROPE_MARINE_NAME_TO_REGION,
    )
  }
  return cachedWaterPaths
}

function getWaterCircleZones(): WaterCircleZone[] {
  const region = getEuropeRegionById(STRAIT_OF_GIBRALTAR_ID)
  if (!region) return []
  const [cx, cy] = europeGeoToSvg(region.geo.lon, region.geo.lat)
  const r = europeGeoRadiusToSvg(
    region.geo.lon,
    region.geo.lat,
    region.geo.radius,
  )
  return [{ regionId: STRAIT_OF_GIBRALTAR_ID, cx, cy, r }]
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
  getWaterCircleZones,
  findRegionAtDrop: hitTest.findRegionAtDrop,
  isWaterRegion: (id) => EUROPE_WATER_REGIONS.has(id),
  isCountryInRegion: isEuropeCountryInRegion,
  viewBox: EUROPE_VIEWBOX,
  geoToSvg: europeGeoToSvg,
  geoRadiusToSvg: europeGeoRadiusToSvg,
}

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

/** Too small or unreliable at Europe zoom — use geo circles for hit + highlight. */
const EUROPE_WATER_CIRCLE_IDS = ['strait-of-gibraltar', 'arctic-ocean']

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
  const zones: WaterCircleZone[] = []
  for (const regionId of EUROPE_WATER_CIRCLE_IDS) {
    const region = getEuropeRegionById(regionId)
    if (!region) continue
    const [cx, cy] = europeGeoToSvg(region.geo.lon, region.geo.lat)
    const r = europeGeoRadiusToSvg(
      region.geo.lon,
      region.geo.lat,
      region.geo.radius,
    )
    zones.push({ regionId, cx, cy, r })
  }
  return zones
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

import type { FeatureCollection } from 'geojson'
import {
  ASIA_WATER_REGIONS,
  getAsiaRegionForCountry,
  isAsiaCountryInRegion,
} from '../asiaGeography'
import { ASIA_MARINE_NAME_TO_REGION } from '../asiaMarineNames'
import {
  ASIA_VIEWBOX,
  asiaGeoRadiusToSvg,
  asiaGeoToSvg,
  asiaProjection,
} from '../asiaProjection'
import { asiaRegions, getAsiaRegionById } from '../asiaRegions'
import { buildCountryPaths } from '../buildCountryPaths'
import { buildMarinePaths } from '../buildMarinePaths'
import type { WaterPath } from '../buildWaterPaths'
import { createMapHitTest } from '../createMapHitTest'
import asiaMarineGeo from '../naturalEarth/ne_50m_asia_marine_polys.json'
import type { WaterCircleZone } from '../waterCircleZones'
import {
  ASIA_OPEN_OCEAN_HIT_PRIORITY,
  ASIA_WATER_HIT_PRIORITY,
} from '../waterHitPriority'
import type { MapLevelDefinition } from './types'

const STRAIT_OF_HORMUZ_ID = 'strait-of-hormuz'

/** Open water in the northern strip (above ~70°N; land / named seas still win). */
const ARCTIC_BAND_MAX_SVG_Y = Math.max(
  ...[40, 80, 120, 160].map((lon) => asiaGeoToSvg(lon, 70)[1]),
)

let cachedPaths: ReturnType<typeof buildCountryPaths> | null = null
let cachedWaterPaths: WaterPath[] | null = null

function getCountryPaths() {
  if (!cachedPaths) {
    cachedPaths = buildCountryPaths(asiaProjection, getAsiaRegionForCountry)
  }
  return cachedPaths
}

function getWaterPaths() {
  if (!cachedWaterPaths) {
    cachedWaterPaths = buildMarinePaths(
      asiaProjection,
      asiaMarineGeo as unknown as FeatureCollection,
      ASIA_MARINE_NAME_TO_REGION,
    )
  }
  return cachedWaterPaths
}

function getWaterCircleZones(): WaterCircleZone[] {
  const region = getAsiaRegionById(STRAIT_OF_HORMUZ_ID)
  if (!region) return []
  const [cx, cy] = asiaGeoToSvg(region.geo.lon, region.geo.lat)
  const r = asiaGeoRadiusToSvg(
    region.geo.lon,
    region.geo.lat,
    region.geo.radius,
  )
  return [{ regionId: STRAIT_OF_HORMUZ_ID, cx, cy, r }]
}

const hitTest = createMapHitTest({
  getRegionById: getAsiaRegionById,
  waterHitPriority: ASIA_WATER_HIT_PRIORITY,
  openOceanHitPriority: ASIA_OPEN_OCEAN_HIT_PRIORITY,
  arcticBand: { regionId: 'arctic-ocean', maxSvgY: ARCTIC_BAND_MAX_SVG_Y },
})

export const asiaLevel: MapLevelDefinition = {
  id: 'asia',
  title: 'Asia',
  subtitle: 'Regions & seas',
  regions: asiaRegions,
  getRegionById: getAsiaRegionById,
  getCountryPaths,
  getWaterPaths,
  getWaterCircleZones,
  findRegionAtDrop: hitTest.findRegionAtDrop,
  isWaterRegion: (id) => ASIA_WATER_REGIONS.has(id),
  isCountryInRegion: isAsiaCountryInRegion,
  viewBox: ASIA_VIEWBOX,
  geoToSvg: asiaGeoToSvg,
  geoRadiusToSvg: asiaGeoRadiusToSvg,
  arcticBandMaxSvgY: ARCTIC_BAND_MAX_SVG_Y,
}

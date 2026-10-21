import type { FeatureCollection } from 'geojson'
import { getAfricaFeaturePaths } from '../africaFeatures'
import {
  AFRICA_FEATURE_REGIONS,
  AFRICA_WATER_REGIONS,
  getAfricaRegionForCountry,
  isAfricaCountryInRegion,
} from '../africaGeography'
import { AFRICA_MARINE_NAME_TO_REGION } from '../africaMarineNames'
import {
  AFRICA_VIEWBOX,
  africaGeoRadiusToSvg,
  africaGeoToSvg,
  africaProjection,
} from '../africaProjection'
import { africaRegions, getAfricaRegionById } from '../africaRegions'
import { buildCountryPaths } from '../buildCountryPaths'
import { buildMarinePaths } from '../buildMarinePaths'
import type { WaterPath } from '../buildWaterPaths'
import { createMapHitTest } from '../createMapHitTest'
import type { LandCircleZone } from '../mapFeatures'
import africaMarineGeo from '../naturalEarth/ne_50m_africa_marine_polys.json'
import type { WaterCircleZone } from '../waterCircleZones'
import {
  AFRICA_FEATURE_HIT_PRIORITY,
  AFRICA_OPEN_OCEAN_HIT_PRIORITY,
  AFRICA_WATER_HIT_PRIORITY,
} from '../waterHitPriority'
import type { MapLevelDefinition } from './types'

const STRAIT_OF_GIBRALTAR_ID = 'strait-of-gibraltar'
const CAPE_OF_GOOD_HOPE_ID = 'cape-of-good-hope'

let cachedPaths: ReturnType<typeof buildCountryPaths> | null = null
let cachedWaterPaths: WaterPath[] | null = null

function getCountryPaths() {
  if (!cachedPaths) {
    cachedPaths = buildCountryPaths(africaProjection, getAfricaRegionForCountry)
  }
  return cachedPaths
}

function getWaterPaths() {
  if (!cachedWaterPaths) {
    cachedWaterPaths = buildMarinePaths(
      africaProjection,
      africaMarineGeo as unknown as FeatureCollection,
      AFRICA_MARINE_NAME_TO_REGION,
    )
  }
  return cachedWaterPaths
}

function getWaterCircleZones(): WaterCircleZone[] {
  const region = getAfricaRegionById(STRAIT_OF_GIBRALTAR_ID)
  if (!region) return []
  const [cx, cy] = africaGeoToSvg(region.geo.lon, region.geo.lat)
  const r = africaGeoRadiusToSvg(
    region.geo.lon,
    region.geo.lat,
    region.geo.radius,
  )
  return [{ regionId: STRAIT_OF_GIBRALTAR_ID, cx, cy, r }]
}

function getLandCircleZones(): LandCircleZone[] {
  const region = getAfricaRegionById(CAPE_OF_GOOD_HOPE_ID)
  if (!region) return []
  const [cx, cy] = africaGeoToSvg(region.geo.lon, region.geo.lat)
  const r = africaGeoRadiusToSvg(
    region.geo.lon,
    region.geo.lat,
    region.geo.radius,
  )
  return [{ regionId: CAPE_OF_GOOD_HOPE_ID, cx, cy, r }]
}

const hitTest = createMapHitTest({
  getRegionById: getAfricaRegionById,
  waterHitPriority: AFRICA_WATER_HIT_PRIORITY,
  openOceanHitPriority: AFRICA_OPEN_OCEAN_HIT_PRIORITY,
  featureHitPriority: AFRICA_FEATURE_HIT_PRIORITY,
})

export const africaLevel: MapLevelDefinition = {
  id: 'africa',
  title: 'Africa',
  subtitle: 'Regions, seas & landmarks',
  regions: africaRegions,
  getRegionById: getAfricaRegionById,
  getCountryPaths,
  getWaterPaths,
  getWaterCircleZones,
  getFeaturePaths: getAfricaFeaturePaths,
  getLandCircleZones,
  findRegionAtDrop: hitTest.findRegionAtDrop,
  isWaterRegion: (id) => AFRICA_WATER_REGIONS.has(id),
  isCountryInRegion: (countryName, regionId) => {
    if (AFRICA_FEATURE_REGIONS.has(regionId)) return false
    return isAfricaCountryInRegion(countryName, regionId)
  },
  viewBox: AFRICA_VIEWBOX,
  geoToSvg: africaGeoToSvg,
  geoRadiusToSvg: africaGeoRadiusToSvg,
}

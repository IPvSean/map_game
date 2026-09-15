import type { FeatureCollection } from 'geojson'
import { buildCountryPaths } from '../buildCountryPaths'
import { buildMarinePaths } from '../buildMarinePaths'
import type { WaterPath } from '../buildWaterPaths'
import { createMapHitTest } from '../createMapHitTest'
import { geoRadiusToSvg, geoToSvg, MAP_VIEWBOX, projection } from '../mapProjection'
import worldMarineGeo from '../naturalEarth/ne_110m_geography_marine_polys.json'
import {
  getRegionForCountry,
  isCountryInRegion,
  WATER_REGIONS,
} from '../regionGeography'
import { getRegionById, regions } from '../regions'
import { WORLD_MARINE_NAME_TO_REGION } from '../worldMarineNames'
import { WORLD_WATER_HIT_PRIORITY } from '../waterHitPriority'
import type { MapLevelDefinition } from './types'

let cachedPaths: ReturnType<typeof buildCountryPaths> | null = null
let cachedWaterPaths: WaterPath[] | null = null

function getCountryPaths() {
  if (!cachedPaths) {
    cachedPaths = buildCountryPaths(projection, getRegionForCountry)
  }
  return cachedPaths
}

function getWaterPaths() {
  if (!cachedWaterPaths) {
    cachedWaterPaths = buildMarinePaths(
      projection,
      worldMarineGeo as unknown as FeatureCollection,
      WORLD_MARINE_NAME_TO_REGION,
    )
  }
  return cachedWaterPaths
}

const hitTest = createMapHitTest({
  getRegionById,
  waterHitPriority: WORLD_WATER_HIT_PRIORITY,
  openOceanHitPriority: [],
})

export const worldLevel: MapLevelDefinition = {
  id: 'world',
  title: 'World',
  subtitle: 'Continents & oceans',
  regions,
  getRegionById,
  getCountryPaths,
  getWaterPaths,
  getWaterCircleZones: () => [],
  findRegionAtDrop: hitTest.findRegionAtDrop,
  isWaterRegion: (id) => WATER_REGIONS.has(id),
  isCountryInRegion,
  viewBox: MAP_VIEWBOX,
  geoToSvg,
  geoRadiusToSvg,
}

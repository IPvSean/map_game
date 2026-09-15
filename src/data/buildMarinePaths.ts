import type { Feature, FeatureCollection, Geometry, MultiPolygon } from 'geojson'
import type { GeoProjection } from 'd3-geo'
import { geoPath } from 'd3-geo'
import type { WaterPath } from './buildWaterPaths'

function geometryToMultiPolygonCoordinates(
  geometry: Geometry,
): number[][][][] {
  if (geometry.type === 'Polygon') {
    return [geometry.coordinates]
  }
  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates
  }
  return []
}

export function buildMarinePaths(
  projection: GeoProjection,
  collection: FeatureCollection,
  marineNameToRegionId: Record<string, string>,
): WaterPath[] {
  const pathGen = geoPath(projection)
  const coordsByRegion = new Map<string, number[][][][]>()

  for (const feature of collection.features) {
    const name = feature.properties?.name as string | undefined
    if (!name) continue
    const regionId = marineNameToRegionId[name]
    if (!regionId) continue

    const parts = geometryToMultiPolygonCoordinates(feature.geometry)
    if (parts.length === 0) continue

    const existing = coordsByRegion.get(regionId) ?? []
    coordsByRegion.set(regionId, existing.concat(parts))
  }

  const paths: WaterPath[] = []

  for (const [regionId, multiCoords] of coordsByRegion) {
    const geometry: MultiPolygon = {
      type: 'MultiPolygon',
      coordinates: multiCoords,
    }
    const merged: Feature<MultiPolygon> = {
      type: 'Feature',
      properties: {},
      geometry,
    }
    const d = pathGen(merged)
    if (d) {
      paths.push({ id: regionId, d })
    }
  }

  return paths
}

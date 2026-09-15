import type { GeoProjection } from 'd3-geo'
import { geoPath } from 'd3-geo'
import type { Feature, MultiPolygon, Polygon } from 'geojson'

/** Lon/lat rings: Polygon = one outer ring; MultiPolygon = multiple polygons. */
export type WaterPolygonDef =
  | { id: string; type: 'Polygon'; coordinates: number[][][] }
  | { id: string; type: 'MultiPolygon'; coordinates: number[][][][] }

export interface WaterPath {
  id: string
  d: string
}

export function buildWaterPaths(
  projection: GeoProjection,
  definitions: WaterPolygonDef[],
): WaterPath[] {
  const pathGen = geoPath(projection)
  const paths: WaterPath[] = []

  for (const def of definitions) {
    const geometry: Polygon | MultiPolygon =
      def.type === 'Polygon'
        ? { type: 'Polygon', coordinates: def.coordinates }
        : { type: 'MultiPolygon', coordinates: def.coordinates }

    const feature: Feature<Polygon | MultiPolygon> = {
      type: 'Feature',
      properties: {},
      geometry,
    }

    const d = pathGen(feature)
    if (d) {
      paths.push({ id: def.id, d })
    }
  }

  return paths
}

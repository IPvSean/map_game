import type { GeoProjection } from 'd3-geo'

/** Lon/lat rings: Polygon = one outer ring; MultiPolygon = multiple polygons. */
export type WaterPolygonDef =
  | { id: string; type: 'Polygon'; coordinates: number[][][] }
  | { id: string; type: 'MultiPolygon'; coordinates: number[][][][] }

export interface WaterPath {
  id: string
  d: string
  /** Use SVG evenodd fill when the path has holes (e.g. Atlantic cutouts). */
  evenOdd?: boolean
}

function ringToD(projection: GeoProjection, ring: number[][]): string {
  const points: [number, number][] = []
  for (const [lon, lat] of ring) {
    const p = projection([lon, lat])
    if (!p) continue
    points.push([p[0], p[1]])
  }
  if (points.length < 3) return ''

  const [first, ...rest] = points
  return (
    `M${first[0]},${first[1]}` +
    rest.map(([x, y]) => `L${x},${y}`).join('') +
    'Z'
  )
}

function polygonToD(projection: GeoProjection, coordinates: number[][][]): string {
  return coordinates.map((ring) => ringToD(projection, ring)).join('')
}

function multiPolygonToD(
  projection: GeoProjection,
  coordinates: number[][][][],
): string {
  return coordinates.map((poly) => polygonToD(projection, poly)).join('')
}

export function buildWaterPaths(
  projection: GeoProjection,
  definitions: WaterPolygonDef[],
): WaterPath[] {
  const paths: WaterPath[] = []

  for (const def of definitions) {
    const d =
      def.type === 'Polygon'
        ? polygonToD(projection, def.coordinates)
        : multiPolygonToD(projection, def.coordinates)

    if (!d) continue

    const hasHoles =
      def.type === 'Polygon' && def.coordinates.length > 1

    paths.push({ id: def.id, d, evenOdd: hasHoles })
  }

  return paths
}

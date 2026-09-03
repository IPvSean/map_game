import { geoRadiusToSvg, geoToSvg } from './mapProjection'
import { WATER_REGIONS } from './regionGeography'
import { getRegionById, regions, type Region } from './regions'

const WATER_MATCH_ORDER = [...regions]
  .filter((r) => WATER_REGIONS.has(r.id))
  .sort((a, b) => a.geo.radius - b.geo.radius)

function hitCircle(svgX: number, svgY: number, region: Region): boolean {
  const [cx, cy] = geoToSvg(region.geo.lon, region.geo.lat)
  const r = geoRadiusToSvg(region.geo.lon, region.geo.lat, region.geo.radius)
  return Math.hypot(svgX - cx, svgY - cy) <= r
}

function hitCountry(svg: SVGSVGElement, svgX: number, svgY: number): Region | undefined {
  const pt = svg.createSVGPoint()
  pt.x = svgX
  pt.y = svgY

  const hits: Array<{ regionId: string; area: number }> = []

  const paths = svg.querySelectorAll<SVGPathElement>('path[data-region]')
  for (const path of paths) {
    if (!path.isPointInFill(pt)) continue
    const regionId = path.getAttribute('data-region')
    if (!regionId) continue
    const { width, height } = path.getBBox()
    hits.push({ regionId, area: width * height })
  }

  if (hits.length === 0) return undefined

  hits.sort((a, b) => a.area - b.area)
  return getRegionById(hits[0].regionId)
}

/** Find which region the player is pointing at on the map. */
export function findRegionAtDrop(
  svg: SVGSVGElement,
  svgX: number,
  svgY: number,
): Region | undefined {
  // Seas & oceans — circular zones in open water
  for (const region of WATER_MATCH_ORDER) {
    if (hitCircle(svgX, svgY, region)) {
      return region
    }
  }

  // Land regions — match actual country/island shapes only
  return hitCountry(svg, svgX, svgY)
}

export function getDropZoneCircles(): Array<{
  region: Region
  cx: number
  cy: number
  r: number
}> {
  return WATER_MATCH_ORDER.map((region) => {
    const [cx, cy] = geoToSvg(region.geo.lon, region.geo.lat)
    const r = geoRadiusToSvg(region.geo.lon, region.geo.lat, region.geo.radius)
    return { region, cx, cy, r }
  })
}

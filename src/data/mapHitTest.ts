import { geoRadiusToSvg, geoToSvg } from './mapProjection'
import { WATER_REGIONS } from './regionGeography'
import { getRegionById, regions, type Region } from './regions'

const REGION_MATCH_ORDER = [...regions].sort((a, b) => a.geo.radius - b.geo.radius)

const WATER_MATCH_ORDER = REGION_MATCH_ORDER.filter((r) => WATER_REGIONS.has(r.id))
const LAND_MATCH_ORDER = REGION_MATCH_ORDER.filter((r) => !WATER_REGIONS.has(r.id))

function hitCircle(svgX: number, svgY: number, region: Region): boolean {
  const [cx, cy] = geoToSvg(region.geo.lon, region.geo.lat)
  const r = geoRadiusToSvg(region.geo.lon, region.geo.lat, region.geo.radius)
  return Math.hypot(svgX - cx, svgY - cy) <= r
}

function hitCountry(svg: SVGSVGElement, svgX: number, svgY: number): Region | undefined {
  const pt = svg.createSVGPoint()
  pt.x = svgX
  pt.y = svgY

  const paths = svg.querySelectorAll<SVGPathElement>('path[data-region]')
  for (const path of paths) {
    if (path.isPointInFill(pt)) {
      const regionId = path.getAttribute('data-region')
      if (regionId) return getRegionById(regionId)
    }
  }

  return undefined
}

/** Find which region the player is pointing at on the map. */
export function findRegionAtDrop(
  svg: SVGSVGElement,
  svgX: number,
  svgY: number,
): Region | undefined {
  // Seas & oceans first (circular zones in open water)
  for (const region of WATER_MATCH_ORDER) {
    if (hitCircle(svgX, svgY, region)) {
      return region
    }
  }

  // Continents & land regions — match actual country shapes
  const landHit = hitCountry(svg, svgX, svgY)
  if (landHit) return landHit

  // Fallback to center circles for land regions
  for (const region of LAND_MATCH_ORDER) {
    if (hitCircle(svgX, svgY, region)) {
      return region
    }
  }

  return undefined
}

export function getDropZoneCircles(): Array<{
  region: Region
  cx: number
  cy: number
  r: number
  isWater: boolean
}> {
  return regions.map((region) => {
    const [cx, cy] = geoToSvg(region.geo.lon, region.geo.lat)
    const r = geoRadiusToSvg(region.geo.lon, region.geo.lat, region.geo.radius)
    return { region, cx, cy, r, isWater: WATER_REGIONS.has(region.id) }
  })
}

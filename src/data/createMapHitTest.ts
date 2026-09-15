import type { Region } from './regions'

export function createMapHitTest(options: {
  regions: Region[]
  waterRegionIds: Set<string>
  getRegionById: (id: string) => Region | undefined
  geoToSvg: (lon: number, lat: number) => [number, number]
  geoRadiusToSvg: (lon: number, lat: number, radiusDeg: number) => number
}) {
  const { regions, waterRegionIds, getRegionById, geoToSvg, geoRadiusToSvg } =
    options

  const waterMatchOrder = [...regions]
    .filter((r) => waterRegionIds.has(r.id))
    .sort((a, b) => a.geo.radius - b.geo.radius)

  function hitCircle(svgX: number, svgY: number, region: Region): boolean {
    const [cx, cy] = geoToSvg(region.geo.lon, region.geo.lat)
    const r = geoRadiusToSvg(region.geo.lon, region.geo.lat, region.geo.radius)
    return Math.hypot(svgX - cx, svgY - cy) <= r
  }

  function hitCountry(
    svg: SVGSVGElement,
    svgX: number,
    svgY: number,
  ): Region | undefined {
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

  function findRegionAtDrop(
    svg: SVGSVGElement,
    svgX: number,
    svgY: number,
  ): Region | undefined {
    for (const region of waterMatchOrder) {
      if (hitCircle(svgX, svgY, region)) {
        return region
      }
    }
    return hitCountry(svg, svgX, svgY)
  }

  function getDropZoneCircles(): Array<{
    region: Region
    cx: number
    cy: number
    r: number
  }> {
    return waterMatchOrder.map((region) => {
      const [cx, cy] = geoToSvg(region.geo.lon, region.geo.lat)
      const r = geoRadiusToSvg(region.geo.lon, region.geo.lat, region.geo.radius)
      return { region, cx, cy, r }
    })
  }

  return { findRegionAtDrop, getDropZoneCircles }
}

import type { Region } from './regions'

export function createMapHitTest(options: {
  getRegionById: (id: string) => Region | undefined
}) {
  const { getRegionById } = options

  function findRegionAtDrop(
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

  return { findRegionAtDrop }
}

import type { Region } from './regions'

export function createMapHitTest(options: {
  getRegionById: (id: string) => Region | undefined
  waterHitPriority: string[]
}) {
  const { getRegionById, waterHitPriority } = options

  function findRegionAtDrop(
    svg: SVGSVGElement,
    svgX: number,
    svgY: number,
  ): Region | undefined {
    const pt = svg.createSVGPoint()
    pt.x = svgX
    pt.y = svgY

    const landHits: Array<{ regionId: string; area: number }> = []

    const landPaths = svg.querySelectorAll<SVGPathElement>(
      'path[data-region]:not([data-water])',
    )
    for (const path of landPaths) {
      if (!path.isPointInFill(pt)) continue
      const regionId = path.getAttribute('data-region')
      if (!regionId) continue
      const { width, height } = path.getBBox()
      landHits.push({ regionId, area: width * height })
    }

    if (landHits.length > 0) {
      landHits.sort((a, b) => a.area - b.area)
      return getRegionById(landHits[0].regionId)
    }

    for (const regionId of waterHitPriority) {
      const path = svg.querySelector<SVGPathElement>(
        `path[data-water="true"][data-region="${regionId}"]`,
      )
      if (path?.isPointInFill(pt)) {
        return getRegionById(regionId)
      }
    }

    return undefined
  }

  return { findRegionAtDrop }
}

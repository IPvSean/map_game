import type { Region } from './regions'

function hitLandAtPoint(
  svg: SVGSVGElement,
  pt: SVGPoint,
  getRegionById: (id: string) => Region | undefined,
): Region | undefined {
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

  if (landHits.length === 0) return undefined

  landHits.sort((a, b) => a.area - b.area)
  return getRegionById(landHits[0].regionId)
}

export function createMapHitTest(options: {
  getRegionById: (id: string) => Region | undefined
  waterHitPriority: string[]
  openOceanHitPriority?: string[]
  arcticBand?: { regionId: string; maxSvgY: number }
}) {
  const {
    getRegionById,
    waterHitPriority,
    openOceanHitPriority = [],
    arcticBand,
  } = options

  function waterHitAtPoint(
    svg: SVGSVGElement,
    pt: SVGPoint,
    regionIds: string[],
  ): Region | undefined {
    for (const regionId of regionIds) {
      const path = svg.querySelector<SVGPathElement>(
        `path[data-water="true"][data-region="${regionId}"]`,
      )
      const circle = svg.querySelector<SVGCircleElement>(
        `circle[data-water="true"][data-region="${regionId}"]`,
      )
      if (path?.isPointInFill(pt) || circle?.isPointInFill(pt)) {
        return getRegionById(regionId)
      }
    }
    return undefined
  }

  function findRegionAtDrop(
    svg: SVGSVGElement,
    svgX: number,
    svgY: number,
  ): Region | undefined {
    const pt = svg.createSVGPoint()
    pt.x = svgX
    pt.y = svgY

    const regional = waterHitAtPoint(svg, pt, waterHitPriority)
    if (regional) return regional

    const land = hitLandAtPoint(svg, pt, getRegionById)
    if (land) return land

    if (arcticBand && svgY < arcticBand.maxSvgY) {
      return getRegionById(arcticBand.regionId)
    }

    const ocean = waterHitAtPoint(svg, pt, openOceanHitPriority)
    if (ocean) return ocean

    return undefined
  }

  return { findRegionAtDrop }
}

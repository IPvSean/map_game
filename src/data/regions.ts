export type RegionType = 'continent' | 'ocean' | 'sea' | 'region'

export interface DropZone {
  cx: number
  cy: number
  r: number
}

export interface Region {
  id: string
  name: string
  type: RegionType
  dropZone: DropZone
  highlightId: string
}

export const MAP_VIEWBOX = { width: 800, height: 450 }

export const regions: Region[] = [
  {
    id: 'antarctica',
    name: 'Antarctica',
    type: 'continent',
    dropZone: { cx: 400, cy: 410, r: 70 },
    highlightId: 'zone-antarctica',
  },
  {
    id: 'caribbean-islands',
    name: 'Caribbean Islands',
    type: 'region',
    dropZone: { cx: 195, cy: 235, r: 40 },
    highlightId: 'zone-caribbean-islands',
  },
  {
    id: 'mediterranean-sea',
    name: 'Mediterranean Sea',
    type: 'sea',
    dropZone: { cx: 455, cy: 195, r: 35 },
    highlightId: 'zone-mediterranean-sea',
  },
  {
    id: 'southeast-asia',
    name: 'Southeast Asia',
    type: 'region',
    dropZone: { cx: 640, cy: 255, r: 45 },
    highlightId: 'zone-southeast-asia',
  },
  {
    id: 'atlantic-ocean',
    name: 'Atlantic Ocean',
    type: 'ocean',
    dropZone: { cx: 300, cy: 250, r: 55 },
    highlightId: 'zone-atlantic-ocean',
  },
  {
    id: 'oceania',
    name: 'Oceania',
    type: 'region',
    dropZone: { cx: 700, cy: 320, r: 50 },
    highlightId: 'zone-oceania',
  },
  {
    id: 'caribbean-sea',
    name: 'Caribbean Sea',
    type: 'sea',
    dropZone: { cx: 210, cy: 255, r: 35 },
    highlightId: 'zone-caribbean-sea',
  },
  {
    id: 'southern-ocean',
    name: 'Southern Ocean',
    type: 'ocean',
    dropZone: { cx: 400, cy: 370, r: 60 },
    highlightId: 'zone-southern-ocean',
  },
  {
    id: 'pacific-ocean',
    name: 'Pacific Ocean',
    type: 'ocean',
    dropZone: { cx: 680, cy: 200, r: 65 },
    highlightId: 'zone-pacific-ocean',
  },
  {
    id: 'europe',
    name: 'Europe',
    type: 'continent',
    dropZone: { cx: 455, cy: 155, r: 40 },
    highlightId: 'zone-europe',
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    type: 'region',
    dropZone: { cx: 520, cy: 215, r: 40 },
    highlightId: 'zone-middle-east',
  },
  {
    id: 'australia',
    name: 'Australia',
    type: 'continent',
    dropZone: { cx: 680, cy: 330, r: 40 },
    highlightId: 'zone-australia',
  },
  {
    id: 'central-america',
    name: 'Central America',
    type: 'region',
    dropZone: { cx: 175, cy: 265, r: 35 },
    highlightId: 'zone-central-america',
  },
  {
    id: 'gulf-of-mexico',
    name: 'Gulf of Mexico',
    type: 'sea',
    dropZone: { cx: 175, cy: 215, r: 35 },
    highlightId: 'zone-gulf-of-mexico',
  },
  {
    id: 'north-america',
    name: 'North America',
    type: 'continent',
    dropZone: { cx: 155, cy: 165, r: 55 },
    highlightId: 'zone-north-america',
  },
  {
    id: 'south-america',
    name: 'South America',
    type: 'continent',
    dropZone: { cx: 230, cy: 320, r: 50 },
    highlightId: 'zone-south-america',
  },
  {
    id: 'asia',
    name: 'Asia',
    type: 'continent',
    dropZone: { cx: 580, cy: 185, r: 60 },
    highlightId: 'zone-asia',
  },
  {
    id: 'indian-ocean',
    name: 'Indian Ocean',
    type: 'ocean',
    dropZone: { cx: 560, cy: 310, r: 55 },
    highlightId: 'zone-indian-ocean',
  },
  {
    id: 'africa',
    name: 'Africa',
    type: 'continent',
    dropZone: { cx: 470, cy: 280, r: 50 },
    highlightId: 'zone-africa',
  },
]

export function getRegionById(id: string): Region | undefined {
  return regions.find((r) => r.id === id)
}

export function findRegionAtPoint(x: number, y: number): Region | undefined {
  let closest: Region | undefined
  let closestDist = Infinity

  for (const region of regions) {
    const { cx, cy, r } = region.dropZone
    const dist = Math.hypot(x - cx, y - cy)
    if (dist <= r && dist < closestDist) {
      closest = region
      closestDist = dist
    }
  }

  return closest
}

export function screenToSvgCoords(
  svg: SVGSVGElement,
  clientX: number,
  clientY: number,
): { x: number; y: number } {
  const pt = svg.createSVGPoint()
  pt.x = clientX
  pt.y = clientY
  const ctm = svg.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }
  const svgPt = pt.matrixTransform(ctm.inverse())
  return { x: svgPt.x, y: svgPt.y }
}

export type RegionType = 'continent' | 'ocean' | 'sea' | 'region'

export interface GeoZone {
  lon: number
  lat: number
  radius: number
}

export interface Region {
  id: string
  name: string
  type: RegionType
  geo: GeoZone
}

export const regions: Region[] = [
  { id: 'antarctica', name: 'Antarctica', type: 'continent', geo: { lon: 0, lat: -78, radius: 18 } },
  { id: 'caribbean-islands', name: 'Caribbean Islands', type: 'region', geo: { lon: -72, lat: 20, radius: 10 } },
  { id: 'mediterranean-sea', name: 'Mediterranean Sea', type: 'sea', geo: { lon: 18, lat: 38, radius: 11 } },
  { id: 'southeast-asia', name: 'Southeast Asia', type: 'region', geo: { lon: 110, lat: 8, radius: 14 } },
  { id: 'atlantic-ocean', name: 'Atlantic Ocean', type: 'ocean', geo: { lon: -35, lat: 20, radius: 22 } },
  { id: 'oceania', name: 'Oceania', type: 'region', geo: { lon: 165, lat: -10, radius: 16 } },
  { id: 'caribbean-sea', name: 'Caribbean Sea', type: 'sea', geo: { lon: -69, lat: 17, radius: 12 } },
  { id: 'southern-ocean', name: 'Southern Ocean', type: 'ocean', geo: { lon: 0, lat: -58, radius: 20 } },
  { id: 'pacific-ocean', name: 'Pacific Ocean', type: 'ocean', geo: { lon: -155, lat: 5, radius: 28 } },
  { id: 'europe', name: 'Europe', type: 'continent', geo: { lon: 15, lat: 52, radius: 14 } },
  { id: 'middle-east', name: 'Middle East', type: 'region', geo: { lon: 45, lat: 28, radius: 12 } },
  { id: 'australia', name: 'Australia', type: 'continent', geo: { lon: 134, lat: -25, radius: 12 } },
  { id: 'central-america', name: 'Central America', type: 'region', geo: { lon: -87, lat: 14, radius: 7 } },
  { id: 'gulf-of-mexico', name: 'Gulf of Mexico', type: 'sea', geo: { lon: -88.5, lat: 26, radius: 10 } },
  { id: 'north-america', name: 'North America', type: 'continent', geo: { lon: -100, lat: 48, radius: 18 } },
  { id: 'south-america', name: 'South America', type: 'continent', geo: { lon: -58, lat: -15, radius: 16 } },
  { id: 'asia', name: 'Asia', type: 'continent', geo: { lon: 85, lat: 45, radius: 22 } },
  { id: 'indian-ocean', name: 'Indian Ocean', type: 'ocean', geo: { lon: 78, lat: -18, radius: 22 } },
  { id: 'africa', name: 'Africa', type: 'continent', geo: { lon: 20, lat: 2, radius: 18 } },
]

export function getRegionById(id: string): Region | undefined {
  return regions.find((r) => r.id === id)
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

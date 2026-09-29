import type { Region } from './regions'

/** Level 3 — Asia (teacher answer key, 20 items). */
export const asiaRegions: Region[] = [
  { id: 'arctic-ocean', name: 'Arctic Ocean', type: 'ocean', geo: { lon: 100, lat: 75, radius: 12 } },
  { id: 'pacific-ocean', name: 'Pacific Ocean', type: 'ocean', geo: { lon: 160, lat: 25, radius: 14 } },
  { id: 'bering-sea', name: 'Bering Sea', type: 'sea', geo: { lon: 178, lat: 58, radius: 5 } },
  { id: 'sea-of-japan', name: 'Sea of Japan', type: 'sea', geo: { lon: 135, lat: 40, radius: 4 } },
  { id: 'east-china-sea', name: 'East China Sea', type: 'sea', geo: { lon: 125, lat: 28, radius: 4 } },
  { id: 'south-china-sea', name: 'South China Sea', type: 'sea', geo: { lon: 115, lat: 12, radius: 5 } },
  { id: 'bay-of-bengal', name: 'Bay of Bengal', type: 'sea', geo: { lon: 90, lat: 15, radius: 5 } },
  { id: 'indian-ocean', name: 'Indian Ocean', type: 'ocean', geo: { lon: 80, lat: -5, radius: 10 } },
  { id: 'arabian-sea', name: 'Arabian Sea', type: 'sea', geo: { lon: 65, lat: 15, radius: 5 } },
  { id: 'persian-gulf', name: 'Persian Gulf', type: 'sea', geo: { lon: 52, lat: 27, radius: 2.5 } },
  { id: 'caspian-sea', name: 'Caspian Sea', type: 'sea', geo: { lon: 51, lat: 42, radius: 3.5 } },
  { id: 'black-sea', name: 'Black Sea', type: 'sea', geo: { lon: 34, lat: 43, radius: 3.5 } },
  { id: 'europe', name: 'Europe', type: 'continent', geo: { lon: 15, lat: 50, radius: 10 } },
  { id: 'russia', name: 'Russia', type: 'region', geo: { lon: 90, lat: 60, radius: 16 } },
  { id: 'east-asia', name: 'East Asia', type: 'region', geo: { lon: 115, lat: 35, radius: 10 } },
  { id: 'southeast-asia', name: 'Southeast Asia', type: 'region', geo: { lon: 110, lat: 8, radius: 8 } },
  { id: 'indian-subcontinent', name: 'Indian Subcontinent', type: 'region', geo: { lon: 78, lat: 22, radius: 7 } },
  { id: 'middle-east', name: 'Middle East', type: 'region', geo: { lon: 45, lat: 28, radius: 10 } },
  { id: 'strait-of-hormuz', name: 'Strait of Hormuz', type: 'sea', geo: { lon: 56.5, lat: 26.5, radius: 2.2 } },
  { id: 'central-asia', name: 'Central Asia', type: 'region', geo: { lon: 65, lat: 42, radius: 8 } },
]

export function getAsiaRegionById(id: string): Region | undefined {
  return asiaRegions.find((r) => r.id === id)
}

import type { Region } from './regions'

/** Level 2 — Europe (teacher answer key, 20 items). */
export const europeRegions: Region[] = [
  { id: 'arctic-ocean', name: 'Arctic Ocean', type: 'ocean', geo: { lon: 18, lat: 71, radius: 11 } },
  { id: 'atlantic-ocean', name: 'Atlantic Ocean', type: 'ocean', geo: { lon: -20, lat: 52, radius: 9 } },
  { id: 'baltic-sea', name: 'Baltic Sea', type: 'sea', geo: { lon: 20, lat: 58, radius: 3.5 } },
  { id: 'north-sea', name: 'North Sea', type: 'sea', geo: { lon: 4, lat: 56, radius: 3 } },
  { id: 'english-channel', name: 'English Channel', type: 'sea', geo: { lon: -1, lat: 50, radius: 2 } },
  { id: 'bay-of-biscay', name: 'Bay of Biscay', type: 'sea', geo: { lon: -6, lat: 45, radius: 3.5 } },
  { id: 'strait-of-gibraltar', name: 'Strait of Gibraltar', type: 'sea', geo: { lon: -5.5, lat: 36, radius: 2.8 } },
  { id: 'mediterranean-sea', name: 'Mediterranean Sea', type: 'sea', geo: { lon: 18, lat: 38, radius: 7 } },
  { id: 'adriatic-sea', name: 'Adriatic Sea', type: 'sea', geo: { lon: 17, lat: 42.5, radius: 2.5 } },
  { id: 'aegean-sea', name: 'Aegean Sea', type: 'sea', geo: { lon: 25, lat: 39, radius: 3 } },
  { id: 'black-sea', name: 'Black Sea', type: 'sea', geo: { lon: 34, lat: 44, radius: 4 } },
  { id: 'british-isles', name: 'British Isles', type: 'region', geo: { lon: -4, lat: 54, radius: 4 } },
  { id: 'scandinavia', name: 'Scandinavia', type: 'region', geo: { lon: 15, lat: 62, radius: 6 } },
  { id: 'eastern-europe', name: 'Eastern Europe', type: 'region', geo: { lon: 28, lat: 52, radius: 8 } },
  { id: 'western-europe', name: 'Western Europe', type: 'region', geo: { lon: 5, lat: 49, radius: 5 } },
  { id: 'iberian-peninsula', name: 'Iberian Peninsula', type: 'region', geo: { lon: -4, lat: 40, radius: 4 } },
  { id: 'italian-peninsula', name: 'Italian Peninsula', type: 'region', geo: { lon: 12.5, lat: 42.5, radius: 3 } },
  { id: 'balkan-peninsula', name: 'Balkan Peninsula', type: 'region', geo: { lon: 22, lat: 42, radius: 5 } },
  { id: 'middle-east', name: 'Middle East', type: 'region', geo: { lon: 42, lat: 32, radius: 7 } },
  { id: 'caucasus-region', name: 'Caucasus Region', type: 'region', geo: { lon: 45, lat: 42, radius: 3 } },
]

export function getEuropeRegionById(id: string): Region | undefined {
  return europeRegions.find((r) => r.id === id)
}

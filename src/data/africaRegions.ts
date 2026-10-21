import type { Region } from './regions'

/** Level 4 — Africa (teacher answer key, 20 items). */
export const africaRegions: Region[] = [
  { id: 'mediterranean-sea', name: 'Mediterranean Sea', type: 'sea', geo: { lon: 18, lat: 36, radius: 6 } },
  { id: 'red-sea', name: 'Red Sea', type: 'sea', geo: { lon: 38, lat: 20, radius: 4 } },
  { id: 'gulf-of-aden', name: 'Gulf of Aden', type: 'sea', geo: { lon: 48, lat: 12, radius: 3 } },
  { id: 'indian-ocean', name: 'Indian Ocean', type: 'ocean', geo: { lon: 55, lat: -10, radius: 10 } },
  { id: 'mozambique-channel', name: 'Mozambique Channel', type: 'sea', geo: { lon: 42, lat: -18, radius: 3.5 } },
  { id: 'atlantic-ocean', name: 'Atlantic Ocean', type: 'ocean', geo: { lon: -15, lat: 5, radius: 10 } },
  { id: 'gulf-of-guinea', name: 'Gulf of Guinea', type: 'sea', geo: { lon: 5, lat: 3, radius: 4 } },
  { id: 'strait-of-gibraltar', name: 'Strait of Gibraltar', type: 'sea', geo: { lon: -5.5, lat: 36, radius: 2.5 } },
  { id: 'nile-river', name: 'Nile River', type: 'region', geo: { lon: 32, lat: 20, radius: 4 } },
  { id: 'sahara-desert', name: 'Sahara Desert', type: 'region', geo: { lon: 10, lat: 24, radius: 12 } },
  { id: 'east-africa', name: 'East Africa', type: 'region', geo: { lon: 35, lat: 0, radius: 7 } },
  { id: 'southern-africa', name: 'Southern Africa', type: 'region', geo: { lon: 25, lat: -22, radius: 8 } },
  { id: 'central-africa', name: 'Central Africa', type: 'region', geo: { lon: 20, lat: 0, radius: 7 } },
  { id: 'west-africa', name: 'West Africa', type: 'region', geo: { lon: -5, lat: 10, radius: 8 } },
  { id: 'north-africa', name: 'North Africa', type: 'region', geo: { lon: 10, lat: 28, radius: 10 } },
  { id: 'horn-of-africa', name: 'Horn of Africa', type: 'region', geo: { lon: 45, lat: 8, radius: 5 } },
  { id: 'middle-east', name: 'Middle East', type: 'region', geo: { lon: 45, lat: 28, radius: 8 } },
  { id: 'madagascar', name: 'Madagascar', type: 'region', geo: { lon: 47, lat: -19, radius: 4 } },
  { id: 'cape-of-good-hope', name: 'Cape of Good Hope', type: 'region', geo: { lon: 18.5, lat: -34.3, radius: 2.2 } },
  { id: 'sinai-peninsula', name: 'Sinai Peninsula', type: 'region', geo: { lon: 33.8, lat: 29.5, radius: 2 } },
]

export function getAfricaRegionById(id: string): Region | undefined {
  return africaRegions.find((r) => r.id === id)
}

/** Large oceans — hit targets only; the map background is the water color. */
export const OPEN_OCEAN_REGION_IDS = new Set([
  'arctic-ocean',
  'atlantic-ocean',
  'pacific-ocean',
  'indian-ocean',
  'southern-ocean',
])

export function isOpenOceanRegion(regionId: string): boolean {
  return OPEN_OCEAN_REGION_IDS.has(regionId)
}

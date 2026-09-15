import { buildCountryPaths } from './buildCountryPaths'
import { geoPathGenerator, projection } from './mapProjection'
import { getRegionForCountry } from './regionGeography'

export type { CountryPath } from './buildCountryPaths'

let cachedPaths: ReturnType<typeof buildCountryPaths> | null = null

/** @deprecated Use level.getCountryPaths() */
export function getCountryPaths() {
  if (!cachedPaths) {
    cachedPaths = buildCountryPaths(projection, getRegionForCountry)
  }
  return cachedPaths
}

export { geoPathGenerator }

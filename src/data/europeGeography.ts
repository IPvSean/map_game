/** Country lists for Europe level (world-atlas 110m names). */
export const EUROPE_REGION_COUNTRIES: Record<string, string[]> = {
  'british-isles': ['United Kingdom', 'Ireland'],
  scandinavia: ['Norway', 'Sweden', 'Finland', 'Iceland', 'Denmark'],
  'western-europe': [
    'France',
    'Germany',
    'Belgium',
    'Netherlands',
    'Luxembourg',
    'Switzerland',
    'Austria',
  ],
  'eastern-europe': [
    'Russia',
    'Poland',
    'Belarus',
    'Ukraine',
    'Lithuania',
    'Latvia',
    'Estonia',
    'Moldova',
    'Czechia',
    'Slovakia',
    'Hungary',
  ],
  'iberian-peninsula': ['Spain', 'Portugal'],
  'italian-peninsula': ['Italy'],
  'balkan-peninsula': [
    'Albania',
    'Bosnia and Herz.',
    'Bulgaria',
    'Croatia',
    'Greece',
    'Kosovo',
    'Macedonia',
    'Montenegro',
    'Romania',
    'Serbia',
    'Slovenia',
  ],
  'middle-east': [
    'Turkey',
    'Syria',
    'Iraq',
    'Iran',
    'Saudi Arabia',
    'Israel',
    'Jordan',
    'Lebanon',
    'Cyprus',
    'Palestine',
    'Kuwait',
  ],
  'caucasus-region': ['Georgia', 'Armenia', 'Azerbaijan'],
}

export const EUROPE_WATER_REGIONS = new Set([
  'arctic-ocean',
  'atlantic-ocean',
  'baltic-sea',
  'north-sea',
  'english-channel',
  'bay-of-biscay',
  'strait-of-gibraltar',
  'mediterranean-sea',
  'adriatic-sea',
  'aegean-sea',
  'black-sea',
])

const europeCountryToRegion = new Map<string, string>()
for (const [regionId, countries] of Object.entries(EUROPE_REGION_COUNTRIES)) {
  for (const country of countries) {
    europeCountryToRegion.set(country, regionId)
  }
}

export function getEuropeRegionForCountry(countryName: string): string | undefined {
  return europeCountryToRegion.get(countryName)
}

export function isEuropeCountryInRegion(countryName: string, regionId: string): boolean {
  return europeCountryToRegion.get(countryName) === regionId
}

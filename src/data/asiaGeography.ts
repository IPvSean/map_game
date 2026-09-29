/** Country lists for Asia level (world-atlas 110m names). */
export const ASIA_REGION_COUNTRIES: Record<string, string[]> = {
  europe: [
    'Albania',
    'Austria',
    'Belarus',
    'Belgium',
    'Bosnia and Herz.',
    'Bulgaria',
    'Croatia',
    'Czechia',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Italy',
    'Kosovo',
    'Latvia',
    'Lithuania',
    'Luxembourg',
    'Macedonia',
    'Moldova',
    'Montenegro',
    'Netherlands',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Ukraine',
    'United Kingdom',
  ],
  russia: ['Russia'],
  'east-asia': [
    'China',
    'Mongolia',
    'North Korea',
    'South Korea',
    'Japan',
    'Taiwan',
  ],
  'southeast-asia': [
    'Thailand',
    'Vietnam',
    'Cambodia',
    'Laos',
    'Myanmar',
    'Malaysia',
    'Indonesia',
    'Philippines',
    'Brunei',
    'Timor-Leste',
  ],
  'indian-subcontinent': [
    'India',
    'Pakistan',
    'Nepal',
    'Bhutan',
    'Bangladesh',
    'Sri Lanka',
  ],
  'middle-east': [
    'Saudi Arabia',
    'Iran',
    'Iraq',
    'Israel',
    'Jordan',
    'Kuwait',
    'Lebanon',
    'Oman',
    'Palestine',
    'Qatar',
    'Syria',
    'Turkey',
    'United Arab Emirates',
    'Yemen',
    'Cyprus',
    'Armenia',
    'Azerbaijan',
    'Georgia',
  ],
  'central-asia': [
    'Kazakhstan',
    'Uzbekistan',
    'Kyrgyzstan',
    'Tajikistan',
    'Turkmenistan',
    'Afghanistan',
  ],
}

export const ASIA_WATER_REGIONS = new Set([
  'arctic-ocean',
  'pacific-ocean',
  'bering-sea',
  'sea-of-japan',
  'east-china-sea',
  'south-china-sea',
  'bay-of-bengal',
  'indian-ocean',
  'arabian-sea',
  'persian-gulf',
  'caspian-sea',
  'black-sea',
  'strait-of-hormuz',
])

const asiaCountryToRegion = new Map<string, string>()
for (const [regionId, countries] of Object.entries(ASIA_REGION_COUNTRIES)) {
  for (const country of countries) {
    asiaCountryToRegion.set(country, regionId)
  }
}

export function getAsiaRegionForCountry(countryName: string): string | undefined {
  return asiaCountryToRegion.get(countryName)
}

export function isAsiaCountryInRegion(countryName: string, regionId: string): boolean {
  return asiaCountryToRegion.get(countryName) === regionId
}

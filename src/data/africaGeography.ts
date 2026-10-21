/** Country lists for Africa level (world-atlas 110m names). */
export const AFRICA_REGION_COUNTRIES: Record<string, string[]> = {
  'north-africa': [
    'Morocco',
    'Algeria',
    'Tunisia',
    'Libya',
    'Egypt',
    'W. Sahara',
    'Sudan',
  ],
  'west-africa': [
    'Mauritania',
    'Mali',
    'Niger',
    'Senegal',
    'Gambia',
    'Guinea-Bissau',
    'Guinea',
    'Sierra Leone',
    'Liberia',
    "Côte d'Ivoire",
    'Ghana',
    'Togo',
    'Benin',
    'Nigeria',
    'Burkina Faso',
  ],
  'central-africa': [
    'Chad',
    'Cameroon',
    'Central African Rep.',
    'Congo',
    'Dem. Rep. Congo',
    'Eq. Guinea',
    'Gabon',
  ],
  'east-africa': [
    'Kenya',
    'Tanzania',
    'Uganda',
    'Rwanda',
    'Burundi',
    'S. Sudan',
    'Malawi',
  ],
  'southern-africa': [
    'South Africa',
    'Namibia',
    'Botswana',
    'Zimbabwe',
    'Zambia',
    'Mozambique',
    'Angola',
    'Lesotho',
    'eSwatini',
  ],
  'horn-of-africa': ['Somalia', 'Ethiopia', 'Eritrea', 'Djibouti'],
  madagascar: ['Madagascar'],
  'middle-east': [
    'Saudi Arabia',
    'Yemen',
    'Oman',
    'United Arab Emirates',
    'Qatar',
    'Bahrain',
    'Kuwait',
    'Iraq',
    'Iran',
    'Israel',
    'Jordan',
    'Lebanon',
    'Syria',
    'Palestine',
    'Turkey',
    'Cyprus',
  ],
}

/** Water + special feature regions (not country fills). */
export const AFRICA_WATER_REGIONS = new Set([
  'mediterranean-sea',
  'red-sea',
  'gulf-of-aden',
  'indian-ocean',
  'mozambique-channel',
  'atlantic-ocean',
  'gulf-of-guinea',
  'strait-of-gibraltar',
])

export const AFRICA_FEATURE_REGIONS = new Set([
  'nile-river',
  'sahara-desert',
  'cape-of-good-hope',
  'sinai-peninsula',
])

const africaCountryToRegion = new Map<string, string>()
for (const [regionId, countries] of Object.entries(AFRICA_REGION_COUNTRIES)) {
  for (const country of countries) {
    africaCountryToRegion.set(country, regionId)
  }
}

export function getAfricaRegionForCountry(countryName: string): string | undefined {
  return africaCountryToRegion.get(countryName)
}

export function isAfricaCountryInRegion(countryName: string, regionId: string): boolean {
  return africaCountryToRegion.get(countryName) === regionId
}

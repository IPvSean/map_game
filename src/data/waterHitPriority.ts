/** Regional seas (and strait circle). Arctic uses a northern band; Atlantic is separate. */
export const EUROPE_WATER_HIT_PRIORITY = [
  'strait-of-gibraltar',
  'english-channel',
  'bay-of-biscay',
  'north-sea',
  'baltic-sea',
  'adriatic-sea',
  'aegean-sea',
  'black-sea',
  'mediterranean-sea',
]

export const EUROPE_OPEN_OCEAN_HIT_PRIORITY = ['atlantic-ocean']

export const WORLD_WATER_HIT_PRIORITY = [
  'gulf-of-mexico',
  'caribbean-sea',
  'mediterranean-sea',
  'southern-ocean',
  'indian-ocean',
  'pacific-ocean',
  'atlantic-ocean',
]

/** Regional seas / strait first; Arctic NE path next; open oceans last. */
export const ASIA_WATER_HIT_PRIORITY = [
  'strait-of-hormuz',
  'persian-gulf',
  'caspian-sea',
  'black-sea',
  'bering-sea',
  'sea-of-japan',
  'east-china-sea',
  'south-china-sea',
  'bay-of-bengal',
  'arabian-sea',
  'arctic-ocean',
]

export const ASIA_OPEN_OCEAN_HIT_PRIORITY = ['indian-ocean', 'pacific-ocean']

export const AFRICA_WATER_HIT_PRIORITY = [
  'strait-of-gibraltar',
  'mozambique-channel',
  'gulf-of-aden',
  'gulf-of-guinea',
  'red-sea',
  'mediterranean-sea',
]

export const AFRICA_OPEN_OCEAN_HIT_PRIORITY = ['indian-ocean', 'atlantic-ocean']

/** Special land features before country regions. */
export const AFRICA_FEATURE_HIT_PRIORITY = [
  'cape-of-good-hope',
  'sinai-peninsula',
  'nile-river',
  'sahara-desert',
]

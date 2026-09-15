import type { WaterPolygonDef } from './buildWaterPaths'

const ARCTIC_OCEAN = [
  [-25, 70],
  [48, 70],
  [52, 82],
  [-28, 82],
  [-25, 70],
]

/** Open Atlantic west of Europe — does not overlap named seas (hit order handles the rest). */
const ATLANTIC_OCEAN = [
  [-28, 36],
  [-12, 36],
  [-12, 69.5],
  [-28, 69.5],
  [-28, 36],
]

const BALTIC_SEA = [
  [10, 54.5],
  [24, 55.5],
  [28, 60],
  [22, 65.5],
  [14, 63],
  [10, 58],
  [10, 54.5],
]

const NORTH_SEA = [
  [-5, 53.5],
  [10, 54.5],
  [10.5, 62],
  [2, 62.5],
  [-5.5, 59.5],
  [-5, 53.5],
]

const ENGLISH_CHANNEL = [
  [-5, 49.2],
  [1.2, 49.8],
  [1.5, 51.2],
  [-2, 51.5],
  [-5.2, 50.5],
  [-5, 49.2],
]

const BAY_OF_BISCAY = [
  [-10.5, 43],
  [-1.5, 44],
  [-3.5, 48.5],
  [-10, 48],
  [-10.5, 43],
]

const STRAIT_OF_GIBRALTAR = [
  [-6.2, 35.85],
  [-5.15, 35.85],
  [-5.15, 36.15],
  [-6.2, 36.15],
  [-6.2, 35.85],
]

const MED_WEST = [
  [-5.5, 36.2],
  [2, 38],
  [5, 40.5],
  [-1, 42.5],
  [-5.5, 40],
  [-5.5, 36.2],
]

const MED_CENTRAL = [
  [5, 37.5],
  [18, 36.5],
  [22, 38.5],
  [18, 40.5],
  [8, 41],
  [5, 39.5],
  [5, 37.5],
]

const MED_EAST = [
  [8, 33.5],
  [25, 33.5],
  [28, 36],
  [12, 36.5],
  [8, 35],
  [8, 33.5],
]

const ADRIATIC_SEA = [
  [12.5, 40.2],
  [19.5, 41],
  [19, 45.5],
  [13, 45.2],
  [12.5, 40.2],
]

const AEGEAN_SEA = [
  [23, 36.5],
  [28.5, 37.5],
  [27.5, 41],
  [24, 40.5],
  [23, 36.5],
]

const BLACK_SEA = [
  [27.5, 41.2],
  [41.5, 42],
  [42, 46.5],
  [28, 47],
  [27.5, 41.2],
]

/** Simplified water-only shapes for Europe level (lon/lat). */
export const europeWaterPolygons: WaterPolygonDef[] = [
  {
    id: 'atlantic-ocean',
    type: 'Polygon',
    coordinates: [ATLANTIC_OCEAN],
  },
  {
    id: 'arctic-ocean',
    type: 'Polygon',
    coordinates: [ARCTIC_OCEAN],
  },
  {
    id: 'baltic-sea',
    type: 'Polygon',
    coordinates: [BALTIC_SEA],
  },
  {
    id: 'north-sea',
    type: 'Polygon',
    coordinates: [NORTH_SEA],
  },
  {
    id: 'english-channel',
    type: 'Polygon',
    coordinates: [ENGLISH_CHANNEL],
  },
  {
    id: 'bay-of-biscay',
    type: 'Polygon',
    coordinates: [BAY_OF_BISCAY],
  },
  {
    id: 'strait-of-gibraltar',
    type: 'Polygon',
    coordinates: [STRAIT_OF_GIBRALTAR],
  },
  {
    id: 'mediterranean-sea',
    type: 'MultiPolygon',
    coordinates: [[MED_WEST], [MED_CENTRAL], [MED_EAST]],
  },
  {
    id: 'adriatic-sea',
    type: 'Polygon',
    coordinates: [ADRIATIC_SEA],
  },
  {
    id: 'aegean-sea',
    type: 'Polygon',
    coordinates: [AEGEAN_SEA],
  },
  {
    id: 'black-sea',
    type: 'Polygon',
    coordinates: [BLACK_SEA],
  },
]

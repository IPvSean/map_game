import type { WaterPolygonDef } from './buildWaterPaths'

const MEDITERRANEAN = [
  [-6, 30],
  [36, 30],
  [36, 46],
  [-6, 46],
  [-6, 30],
]

const CARIBBEAN = [
  [-88, 10],
  [-60, 10],
  [-60, 22],
  [-88, 22],
  [-88, 10],
]

const GULF_OF_MEXICO = [
  [-98, 18],
  [-82, 18],
  [-82, 30],
  [-98, 30],
  [-98, 18],
]

/** Simplified ocean/sea shapes for world level (lon/lat). */
export const worldWaterPolygons: WaterPolygonDef[] = [
  {
    id: 'atlantic-ocean',
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [-85, -55],
          [-20, -50],
          [-18, 28],
          [-80, 32],
          [-85, -55],
        ],
      ],
      [
        [
          [-55, 35],
          [-25, 38],
          [-22, 62],
          [-75, 65],
          [-55, 35],
        ],
      ],
    ],
  },
  {
    id: 'pacific-ocean',
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [-180, -60],
          [-125, -55],
          [-125, 65],
          [-180, 70],
          [-180, -60],
        ],
      ],
      [
        [
          [125, -55],
          [180, -50],
          [180, 65],
          [130, 60],
          [125, -55],
        ],
      ],
    ],
  },
  {
    id: 'indian-ocean',
    type: 'Polygon',
    coordinates: [
      [
        [20, -55],
        [115, -50],
        [120, 25],
        [25, 20],
        [20, -55],
      ],
    ],
  },
  {
    id: 'southern-ocean',
    type: 'Polygon',
    coordinates: [
      [
        [-180, -75],
        [180, -75],
        [180, -58],
        [-180, -58],
        [-180, -75],
      ],
    ],
  },
  {
    id: 'mediterranean-sea',
    type: 'Polygon',
    coordinates: [MEDITERRANEAN],
  },
  {
    id: 'caribbean-sea',
    type: 'Polygon',
    coordinates: [CARIBBEAN],
  },
  {
    id: 'gulf-of-mexico',
    type: 'Polygon',
    coordinates: [GULF_OF_MEXICO],
  },
]

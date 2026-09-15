import type { WaterPolygonDef } from './buildWaterPaths'

/** Simplified ocean/sea shapes for world level (lon/lat). */
export const worldWaterPolygons: WaterPolygonDef[] = [
  {
    id: 'atlantic-ocean',
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [-85, -55],
          [-15, -50],
          [-10, 65],
          [-80, 70],
          [-85, -55],
        ],
      ],
      [
        [
          [-50, -35],
          [-5, -30],
          [-5, 15],
          [-45, 10],
          [-50, -35],
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
    coordinates: [
      [
        [-6, 30],
        [36, 30],
        [36, 46],
        [-6, 46],
        [-6, 30],
      ],
    ],
  },
  {
    id: 'caribbean-sea',
    type: 'Polygon',
    coordinates: [
      [
        [-88, 10],
        [-60, 10],
        [-60, 22],
        [-88, 22],
        [-88, 10],
      ],
    ],
  },
  {
    id: 'gulf-of-mexico',
    type: 'Polygon',
    coordinates: [
      [
        [-98, 18],
        [-82, 18],
        [-82, 30],
        [-98, 30],
        [-98, 18],
      ],
    ],
  },
]

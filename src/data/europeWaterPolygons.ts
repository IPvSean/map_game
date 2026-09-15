import type { WaterPolygonDef } from './buildWaterPaths'

/** Simplified water-only shapes for Europe level (lon/lat). */
export const europeWaterPolygons: WaterPolygonDef[] = [
  {
    id: 'arctic-ocean',
    type: 'Polygon',
    coordinates: [
      [
        [-25, 70],
        [48, 70],
        [52, 82],
        [-28, 82],
        [-25, 70],
      ],
    ],
  },
  {
    id: 'atlantic-ocean',
    type: 'Polygon',
    coordinates: [
      [
        [-25, 36],
        [-11, 37],
        [-11, 66],
        [-25, 68],
        [-25, 36],
      ],
    ],
  },
  {
    id: 'baltic-sea',
    type: 'Polygon',
    coordinates: [
      [
        [10, 54.5],
        [24, 55.5],
        [28, 60],
        [22, 65.5],
        [14, 63],
        [10, 58],
        [10, 54.5],
      ],
    ],
  },
  {
    id: 'north-sea',
    type: 'Polygon',
    coordinates: [
      [
        [-2, 54.5],
        [8, 55.5],
        [9, 61],
        [3, 61.5],
        [-3.5, 58],
        [-2, 54.5],
      ],
    ],
  },
  {
    id: 'english-channel',
    type: 'Polygon',
    coordinates: [
      [
        [-5, 49.2],
        [1.2, 49.8],
        [1.5, 51.2],
        [-2, 51.5],
        [-5.2, 50.5],
        [-5, 49.2],
      ],
    ],
  },
  {
    id: 'bay-of-biscay',
    type: 'Polygon',
    coordinates: [
      [
        [-10, 43.5],
        [-2, 44.5],
        [-4, 48],
        [-9.5, 47],
        [-10, 43.5],
      ],
    ],
  },
  {
    id: 'strait-of-gibraltar',
    type: 'Polygon',
    coordinates: [
      [
        [-6.15, 35.88],
        [-5.2, 35.88],
        [-5.2, 36.12],
        [-6.15, 36.12],
        [-6.15, 35.88],
      ],
    ],
  },
  {
    id: 'mediterranean-sea',
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [-5.5, 36.2],
          [2, 38],
          [5, 40.5],
          [-1, 42.5],
          [-5.5, 40],
          [-5.5, 36.2],
        ],
      ],
      [
        [
          [5, 37.5],
          [18, 36.5],
          [22, 38.5],
          [18, 40.5],
          [8, 41],
          [5, 39.5],
          [5, 37.5],
        ],
      ],
      [
        [
          [8, 33.5],
          [25, 33.5],
          [28, 36],
          [12, 36.5],
          [8, 35],
          [8, 33.5],
        ],
      ],
    ],
  },
  {
    id: 'adriatic-sea',
    type: 'Polygon',
    coordinates: [
      [
        [12.5, 40.2],
        [19.5, 41],
        [19, 45.5],
        [13, 45.2],
        [12.5, 40.2],
      ],
    ],
  },
  {
    id: 'aegean-sea',
    type: 'Polygon',
    coordinates: [
      [
        [23, 36.5],
        [28.5, 37.5],
        [27.5, 41],
        [24, 40.5],
        [23, 36.5],
      ],
    ],
  },
  {
    id: 'black-sea',
    type: 'Polygon',
    coordinates: [
      [
        [27.5, 41.2],
        [41.5, 42],
        [42, 46.5],
        [28, 47],
        [27.5, 41.2],
      ],
    ],
  },
]

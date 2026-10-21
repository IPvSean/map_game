import type { MapFeaturePath } from './mapFeatures'
import { africaGeoPathGenerator, africaGeoToSvg } from './africaProjection'

/** Approximate Sahara outline for highlight + hit testing. */
const SAHARA_RING: [number, number][] = [
  [-16, 21],
  [-12, 28],
  [-8, 32],
  [0, 33],
  [10, 32],
  [20, 31],
  [28, 30],
  [32, 28],
  [33, 22],
  [30, 16],
  [20, 15],
  [10, 15],
  [0, 16],
  [-8, 17],
  [-14, 18],
  [-16, 21],
]

/** Nile main stem (south → north), simplified for worksheet-scale map. */
const NILE_LINE: [number, number][] = [
  [32.6, 1.5],
  [32.0, 6],
  [31.5, 10],
  [32.5, 15.5],
  [32.0, 19],
  [31.5, 24],
  [31.2, 27],
  [31.2, 30.2],
  [31.0, 31.4],
]

/** Sinai Peninsula outline. */
const SINAI_RING: [number, number][] = [
  [32.4, 29.9],
  [33.0, 31.2],
  [34.2, 31.3],
  [34.7, 29.5],
  [34.4, 28.0],
  [33.5, 27.8],
  [32.6, 28.5],
  [32.4, 29.9],
]

function ringToPath(ring: [number, number][]): string {
  const feature = {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'Polygon' as const,
      coordinates: [ring.map(([lon, lat]) => [lon, lat])],
    },
  }
  return africaGeoPathGenerator(feature) ?? ''
}

function lineToPath(line: [number, number][]): string {
  const parts = line.map(([lon, lat], i) => {
    const [x, y] = africaGeoToSvg(lon, lat)
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
  })
  return parts.join(' ')
}

export function getAfricaFeaturePaths(): MapFeaturePath[] {
  const features: MapFeaturePath[] = [
    {
      regionId: 'sahara-desert',
      d: ringToPath(SAHARA_RING),
      kind: 'desert',
    },
    {
      regionId: 'sinai-peninsula',
      d: ringToPath(SINAI_RING),
      kind: 'land',
    },
    {
      regionId: 'nile-river',
      d: lineToPath(NILE_LINE),
      kind: 'river',
      strokeWidth: 10,
    },
  ]
  return features.filter((f) => Boolean(f.d))
}

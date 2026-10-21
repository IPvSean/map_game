export type MapFeatureKind = 'desert' | 'river' | 'land'

export interface MapFeaturePath {
  regionId: string
  d: string
  kind: MapFeatureKind
  /** Stroke width used for river hit-testing / display. */
  strokeWidth?: number
}

export interface LandCircleZone {
  regionId: string
  cx: number
  cy: number
  r: number
}

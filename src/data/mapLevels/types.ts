import type { CountryPath } from '../buildCountryPaths'
import type { WaterPath } from '../buildWaterPaths'
import type { Region } from '../regions'

export type LevelId = 'world' | 'europe'

export interface MapLevelDefinition {
  id: LevelId
  title: string
  subtitle: string
  regions: Region[]
  getRegionById: (id: string) => Region | undefined
  getCountryPaths: () => CountryPath[]
  getWaterPaths: () => WaterPath[]
  findRegionAtDrop: (
    svg: SVGSVGElement,
    svgX: number,
    svgY: number,
  ) => Region | undefined
  isWaterRegion: (regionId: string) => boolean
  isCountryInRegion: (countryName: string, regionId: string) => boolean
  viewBox: { width: number; height: number }
  geoToSvg: (lon: number, lat: number) => [number, number]
  geoRadiusToSvg: (lon: number, lat: number, radiusDeg: number) => number
}

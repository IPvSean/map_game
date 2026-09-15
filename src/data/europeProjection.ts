import { geoNaturalEarth1, geoPath } from 'd3-geo'

export const EUROPE_VIEWBOX = { width: 800, height: 520 }

export const europeProjection = geoNaturalEarth1()
  .translate([EUROPE_VIEWBOX.width / 2, EUROPE_VIEWBOX.height / 2])
  .scale(620)
  .center([22, 52])

export const europeGeoPathGenerator = geoPath(europeProjection)

export function europeGeoToSvg(lon: number, lat: number): [number, number] {
  return europeProjection([lon, lat]) ?? [0, 0]
}

export function europeGeoRadiusToSvg(
  lon: number,
  lat: number,
  radiusDeg: number,
): number {
  const [cx] = europeGeoToSvg(lon, lat)
  const [ex] = europeGeoToSvg(lon + radiusDeg, lat)
  return Math.abs(ex - cx)
}

import { geoNaturalEarth1, geoPath } from 'd3-geo'

export const AFRICA_VIEWBOX = { width: 800, height: 520 }

/** Framed like the Africa worksheet: Atlantic west → Indian east, Med north → Cape south. */
export const africaProjection = geoNaturalEarth1()
  .translate([AFRICA_VIEWBOX.width / 2, AFRICA_VIEWBOX.height / 2])
  .scale(340)
  .center([20, 5])

export const africaGeoPathGenerator = geoPath(africaProjection)

export function africaGeoToSvg(lon: number, lat: number): [number, number] {
  return africaProjection([lon, lat]) ?? [0, 0]
}

export function africaGeoRadiusToSvg(
  lon: number,
  lat: number,
  radiusDeg: number,
): number {
  const [cx] = africaGeoToSvg(lon, lat)
  const [ex] = africaGeoToSvg(lon + radiusDeg, lat)
  return Math.abs(ex - cx)
}

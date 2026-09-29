import { geoNaturalEarth1, geoPath } from 'd3-geo'

export const ASIA_VIEWBOX = { width: 800, height: 520 }

/** Framed like the Asia worksheet: Europe west → Pacific east, Arctic north → Indian Ocean south. */
export const asiaProjection = geoNaturalEarth1()
  .translate([ASIA_VIEWBOX.width / 2, ASIA_VIEWBOX.height / 2])
  .scale(280)
  .center([90, 35])

export const asiaGeoPathGenerator = geoPath(asiaProjection)

export function asiaGeoToSvg(lon: number, lat: number): [number, number] {
  return asiaProjection([lon, lat]) ?? [0, 0]
}

export function asiaGeoRadiusToSvg(
  lon: number,
  lat: number,
  radiusDeg: number,
): number {
  const [cx] = asiaGeoToSvg(lon, lat)
  const [ex] = asiaGeoToSvg(lon + radiusDeg, lat)
  return Math.abs(ex - cx)
}

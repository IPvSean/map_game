import { geoNaturalEarth1, geoPath } from 'd3-geo'

export const MAP_VIEWBOX = { width: 800, height: 450 }

export const projection = geoNaturalEarth1()
  .translate([MAP_VIEWBOX.width / 2, MAP_VIEWBOX.height / 2])
  .scale(148)
  .center([0, 4])

export const geoPathGenerator = geoPath(projection)

export function svgToGeo(svgX: number, svgY: number): [number, number] {
  const coords = projection.invert?.([svgX, svgY])
  return coords ?? [0, 0]
}

export function geoToSvg(lon: number, lat: number): [number, number] {
  return projection([lon, lat]) ?? [0, 0]
}

export function geoRadiusToSvg(lon: number, lat: number, radiusDeg: number): number {
  const [cx] = geoToSvg(lon, lat)
  const [ex] = geoToSvg(lon + radiusDeg, lat)
  return Math.abs(ex - cx)
}

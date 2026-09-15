import { feature } from 'topojson-client'
import type { FeatureCollection, Geometry } from 'geojson'
import type { GeoProjection } from 'd3-geo'
import { geoPath } from 'd3-geo'
import type { Topology } from 'topojson-specification'
import countriesTopology from 'world-atlas/countries-110m.json'

export interface CountryPath {
  name: string
  d: string
  regionId?: string
}

export function buildCountryPaths(
  projection: GeoProjection,
  getRegionForCountry: (name: string) => string | undefined,
): CountryPath[] {
  const pathGen = geoPath(projection)
  const topo = countriesTopology as unknown as Topology
  const collection = feature(
    topo,
    topo.objects.countries as Topology['objects'][string],
  ) as FeatureCollection<Geometry>

  const paths: CountryPath[] = []
  for (const f of collection.features) {
    const name = f.properties?.name as string | undefined
    if (!name) continue
    const d = pathGen(f)
    if (!d) continue
    paths.push({ name, d, regionId: getRegionForCountry(name) })
  }

  return paths
}

import { feature } from 'topojson-client'
import type { FeatureCollection, Geometry } from 'geojson'
import type { Topology } from 'topojson-specification'
import countriesTopology from 'world-atlas/countries-110m.json'
import { geoPathGenerator } from './mapProjection'
import { getRegionForCountry } from './regionGeography'

export interface CountryPath {
  name: string
  d: string
  regionId?: string
}

let cachedPaths: CountryPath[] | null = null

export function getCountryPaths(): CountryPath[] {
  if (cachedPaths) return cachedPaths

  const topo = countriesTopology as unknown as Topology
  const collection = feature(
    topo,
    topo.objects.countries as Topology['objects'][string],
  ) as FeatureCollection<Geometry>

  const paths: CountryPath[] = []
  for (const f of collection.features) {
    const name = f.properties?.name as string | undefined
    if (!name) continue
    const d = geoPathGenerator(f)
    if (!d) continue
    paths.push({ name, d, regionId: getRegionForCountry(name) })
  }

  cachedPaths = paths
  return paths
}

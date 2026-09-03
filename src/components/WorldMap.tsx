import { forwardRef, useMemo } from 'react'
import { feature } from 'topojson-client'
import type { FeatureCollection, Geometry } from 'geojson'
import type { Topology } from 'topojson-specification'
import countriesTopology from 'world-atlas/countries-110m.json'
import {
  geoPathGenerator,
  geoRadiusToSvg,
  geoToSvg,
  MAP_VIEWBOX,
  projection,
} from '../data/mapProjection'
import {
  getRegionForCountry,
  isCountryInRegion,
  WATER_REGIONS,
} from '../data/regionGeography'
import { getRegionById, regions } from '../data/regions'

interface WorldMapProps {
  highlightedRegionId?: string | null
  highlightMode?: 'prompt' | 'success'
  showDropZones?: boolean
}

function GeoHighlight({
  lon,
  lat,
  radius,
  fill,
  stroke,
}: {
  lon: number
  lat: number
  radius: number
  fill: string
  stroke: string
}) {
  const [cx, cy] = geoToSvg(lon, lat)
  const r = geoRadiusToSvg(lon, lat, radius)
  return <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={2.5} />
}

export const WorldMap = forwardRef<SVGSVGElement, WorldMapProps>(
  function WorldMap({ highlightedRegionId, highlightMode = 'success', showDropZones = false }, ref) {
    const highlightFill = highlightMode === 'prompt' ? '#f5a62355' : '#4caf5055'
    const highlightStroke = highlightMode === 'prompt' ? '#f5a623' : '#4caf50'
    const landHighlight = highlightMode === 'prompt' ? '#f5a623' : '#66bb6a'

    const countryPaths = useMemo(() => {
      const topo = countriesTopology as unknown as Topology
      const collection = feature(
        topo,
        topo.objects.countries as Topology['objects'][string],
      ) as FeatureCollection<Geometry>

      return collection.features
        .map((f) => {
          const name = f.properties?.name as string | undefined
          if (!name) return null
          const d = geoPathGenerator(f)
          if (!d) return null
          return { name, d, regionId: getRegionForCountry(name) }
        })
        .filter((x): x is NonNullable<typeof x> => x !== null)
    }, [])

    const highlightedRegion = highlightedRegionId
      ? getRegionById(highlightedRegionId)
      : null

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ocean */}
        <rect width={MAP_VIEWBOX.width} height={MAP_VIEWBOX.height} fill="#7ec8e8" />

        {/* Graticule lines for map readability */}
        {[-120, -60, 0, 60, 120].map((lon) => {
          const [x1, y1] = geoToSvg(lon, -60)
          const [x2, y2] = geoToSvg(lon, 75)
          return (
            <line
              key={`lon-${lon}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#5ba8c9"
              strokeWidth={0.5}
              opacity={0.35}
            />
          )
        })}
        {[-30, 0, 30, 60].map((lat) => {
          const [x1, y1] = geoToSvg(-180, lat)
          const [x2, y2] = geoToSvg(180, lat)
          return (
            <line
              key={`lat-${lat}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#5ba8c9"
              strokeWidth={0.5}
              opacity={0.35}
            />
          )
        })}

        {/* Country landmasses */}
        <g>
          {countryPaths.map(({ name, d, regionId }) => {
            const isHighlighted =
              highlightedRegionId &&
              regionId &&
              isCountryInRegion(name, highlightedRegionId)

            const dimmed = highlightedRegionId && !isHighlighted

            return (
              <path
                key={name}
                id={regionId ? `zone-${regionId}` : undefined}
                d={d}
                fill={
                  isHighlighted
                    ? landHighlight
                    : dimmed
                      ? '#a5c99a'
                      : '#8bc34a'
                }
                stroke="#4a7a3a"
                strokeWidth={0.6}
                opacity={dimmed ? 0.55 : 1}
              />
            )
          })}
        </g>

        {/* Water region highlights (oceans & seas) */}
        {highlightedRegion && WATER_REGIONS.has(highlightedRegion.id) && (
          <GeoHighlight
            lon={highlightedRegion.geo.lon}
            lat={highlightedRegion.geo.lat}
            radius={highlightedRegion.geo.radius}
            fill={highlightFill}
            stroke={highlightStroke}
          />
        )}

        {/* Debug drop zones */}
        {showDropZones &&
          regions.map((region) => {
            const [cx, cy] = geoToSvg(region.geo.lon, region.geo.lat)
            const r = geoRadiusToSvg(region.geo.lon, region.geo.lat, region.geo.radius)
            return (
              <circle
                key={region.id}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="red"
                strokeWidth={1}
                strokeDasharray="4 2"
                opacity={0.4}
              />
            )
          })}
      </svg>
    )
  },
)

// Export projection for coordinate conversion in drag handler
export { projection }

import { forwardRef } from 'react'
import {
  geoRadiusToSvg,
  geoToSvg,
  MAP_VIEWBOX,
  projection,
} from '../data/mapProjection'
import { getDropZoneCircles } from '../data/mapHitTest'
import { getCountryPaths } from '../data/countryPaths'
import {
  isCountryInRegion,
  WATER_REGIONS,
} from '../data/regionGeography'
import { getRegionById } from '../data/regions'

interface WorldMapProps {
  highlightedRegionId?: string | null
  hintRegionId?: string | null
  hoveredRegionId?: string | null
  showDropZones?: boolean
  highlightMode?: 'prompt' | 'success'
}

function GeoHighlight({
  cx,
  cy,
  r,
  fill,
  stroke,
  strokeWidth = 2.5,
  strokeDasharray,
  pulse = false,
}: {
  cx: number
  cy: number
  r: number
  fill: string
  stroke: string
  strokeWidth?: number
  strokeDasharray?: string
  pulse?: boolean
}) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      className={pulse ? 'drop-zone-pulse' : undefined}
    />
  )
}

export const WorldMap = forwardRef<SVGSVGElement, WorldMapProps>(
  function WorldMap({
    highlightedRegionId,
    hintRegionId,
    hoveredRegionId,
    highlightMode = 'success',
    showDropZones = false,
  }, ref) {
    const highlightFill = highlightMode === 'prompt' ? '#f5a62355' : '#4caf5055'
    const highlightStroke = highlightMode === 'prompt' ? '#f5a623' : '#4caf50'
    const landHighlight = highlightMode === 'prompt' ? '#f5a623' : '#66bb6a'

    const countryPaths = getCountryPaths()
    const dropZones = getDropZoneCircles()

    const highlightedRegion = highlightedRegionId
      ? getRegionById(highlightedRegionId)
      : null

    const hintRegion = hintRegionId ? getRegionById(hintRegionId) : null

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={MAP_VIEWBOX.width} height={MAP_VIEWBOX.height} fill="#7ec8e8" />

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

        <g>
          {countryPaths.map(({ name, d, regionId }) => {
            const isHighlighted =
              highlightedRegionId &&
              regionId &&
              isCountryInRegion(name, highlightedRegionId)

            const isHovered =
              hoveredRegionId &&
              regionId &&
              isCountryInRegion(name, hoveredRegionId)

            const dimmed = highlightedRegionId && !isHighlighted

            return (
              <path
                key={name}
                data-country={name}
                data-region={regionId}
                d={d}
                fill={
                  isHighlighted
                    ? landHighlight
                    : isHovered
                      ? '#ffe082'
                      : dimmed
                        ? '#a5c99a'
                        : '#8bc34a'
                }
                stroke={isHovered ? '#f5a623' : '#4a7a3a'}
                strokeWidth={isHovered ? 1.2 : 0.6}
                opacity={dimmed ? 0.55 : 1}
              />
            )
          })}
        </g>

        {/* Drop zone circles — visible while dragging */}
        {showDropZones &&
          dropZones.map(({ region, cx, cy, r, isWater }) => {
            const isHovered = hoveredRegionId === region.id
            const isHint = hintRegionId === region.id
            const isTarget = highlightedRegionId === region.id

            return (
              <GeoHighlight
                key={region.id}
                cx={cx}
                cy={cy}
                r={r}
                fill={
                  isHovered
                    ? '#f5a62366'
                    : isHint
                      ? '#f5a62333'
                      : isTarget
                        ? highlightFill
                        : isWater
                          ? '#ffffff22'
                          : '#ffffff18'
                }
                stroke={
                  isHovered || isHint
                    ? '#f5a623'
                    : isTarget
                      ? highlightStroke
                      : isWater
                        ? '#4a90d988'
                        : '#ffffff55'
                }
                strokeWidth={isHovered || isHint ? 3 : 1.5}
                strokeDasharray={isWater ? '6 4' : '4 3'}
                pulse={isHovered}
              />
            )
          })}

        {/* Water region success highlight */}
        {highlightedRegion && WATER_REGIONS.has(highlightedRegion.id) && !showDropZones && (
          <GeoHighlight
            cx={geoToSvg(highlightedRegion.geo.lon, highlightedRegion.geo.lat)[0]}
            cy={geoToSvg(highlightedRegion.geo.lon, highlightedRegion.geo.lat)[1]}
            r={geoRadiusToSvg(
              highlightedRegion.geo.lon,
              highlightedRegion.geo.lat,
              highlightedRegion.geo.radius,
            )}
            fill={highlightFill}
            stroke={highlightStroke}
          />
        )}

        {/* Hint target (when not already showing all zones) */}
        {hintRegion && !showDropZones && (
          <g aria-hidden="true">
            <GeoHighlight
              cx={geoToSvg(hintRegion.geo.lon, hintRegion.geo.lat)[0]}
              cy={geoToSvg(hintRegion.geo.lon, hintRegion.geo.lat)[1]}
              r={geoRadiusToSvg(
                hintRegion.geo.lon,
                hintRegion.geo.lat,
                hintRegion.geo.radius,
              )}
              fill="#f5a62344"
              stroke="#f5a623"
              strokeWidth={2.5}
              strokeDasharray="6 4"
              pulse
            />
            <text
              x={geoToSvg(hintRegion.geo.lon, hintRegion.geo.lat)[0]}
              y={geoToSvg(hintRegion.geo.lon, hintRegion.geo.lat)[1] + 6}
              textAnchor="middle"
              fontSize={22}
              fill="#f5a623"
              fontWeight="bold"
            >
              ▼
            </text>
          </g>
        )}
      </svg>
    )
  },
)

export { projection }

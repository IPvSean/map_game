import { forwardRef } from 'react'
import type { MapLevelDefinition } from '../data/mapLevels/types'

interface QuizMapProps {
  level: MapLevelDefinition
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

export const QuizMap = forwardRef<SVGSVGElement, QuizMapProps>(function QuizMap(
  {
    level,
    highlightedRegionId,
    hintRegionId,
    hoveredRegionId,
    highlightMode = 'success',
    showDropZones = false,
  },
  ref,
) {
  const highlightFill = highlightMode === 'prompt' ? '#f5a62355' : '#4caf5055'
  const highlightStroke = highlightMode === 'prompt' ? '#f5a623' : '#4caf50'
  const landHighlight = highlightMode === 'prompt' ? '#f5a623' : '#66bb6a'

  const { viewBox, geoToSvg, geoRadiusToSvg } = level
  const countryPaths = level.getCountryPaths()
  const dropZones = level.getDropZoneCircles()

  const highlightedRegion = highlightedRegionId
    ? level.getRegionById(highlightedRegionId)
    : null

  const hintRegion = hintRegionId ? level.getRegionById(hintRegionId) : null

  const lonLines =
    level.id === 'europe'
      ? [-10, 0, 10, 20, 30, 40]
      : [-120, -60, 0, 60, 120]
  const latLines =
    level.id === 'europe' ? [35, 45, 55, 65] : [-30, 0, 30, 60]
  const latSpan =
    level.id === 'europe' ? { min: 30, max: 72 } : { min: -60, max: 75 }
  const lonSpan =
    level.id === 'europe' ? { min: -25, max: 55 } : { min: -180, max: 180 }

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={viewBox.width} height={viewBox.height} fill="#7ec8e8" />

      {lonLines.map((lon) => {
        const [x1, y1] = geoToSvg(lon, latSpan.min)
        const [x2, y2] = geoToSvg(lon, latSpan.max)
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
      {latLines.map((lat) => {
        const [x1, y1] = geoToSvg(lonSpan.min, lat)
        const [x2, y2] = geoToSvg(lonSpan.max, lat)
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
            level.isCountryInRegion(name, highlightedRegionId)

          const isHovered =
            hoveredRegionId &&
            regionId &&
            level.isCountryInRegion(name, hoveredRegionId)

          const isHinted =
            hintRegionId &&
            regionId &&
            !level.isWaterRegion(hintRegionId) &&
            level.isCountryInRegion(name, hintRegionId)

          const dimmed =
            ((highlightedRegionId && !isHighlighted) ||
              (hintRegionId &&
                !isHinted &&
                !level.isWaterRegion(hintRegionId))) &&
            !isHovered

          const isQuizCountry = Boolean(regionId)

          return (
            <path
              key={name}
              data-country={name}
              data-region={regionId ?? undefined}
              d={d}
              fill={
                isHighlighted
                  ? landHighlight
                  : isHinted
                    ? '#f5a623'
                    : isHovered
                      ? '#ffe082'
                      : dimmed
                        ? '#a5c99a'
                        : isQuizCountry
                          ? '#8bc34a'
                          : '#9ec89a'
              }
              stroke={isHinted || isHovered ? '#f5a623' : '#4a7a3a'}
              strokeWidth={isHinted || isHovered ? 1.2 : 0.6}
              opacity={dimmed && !isHinted ? 0.55 : isQuizCountry ? 1 : 0.65}
            />
          )
        })}
      </g>

      {showDropZones &&
        dropZones.map(({ region, cx, cy, r }) => {
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
                      : '#ffffff22'
              }
              stroke={
                isHovered || isHint
                  ? '#f5a623'
                  : isTarget
                    ? highlightStroke
                    : '#4a90d988'
              }
              strokeWidth={isHovered || isHint ? 3 : 1.5}
              strokeDasharray="6 4"
              pulse={isHovered}
            />
          )
        })}

      {highlightedRegion &&
        level.isWaterRegion(highlightedRegion.id) &&
        !showDropZones && (
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

      {hintRegion && !showDropZones && level.isWaterRegion(hintRegion.id) && (
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
})

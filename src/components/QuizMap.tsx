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
  const regionHighlight = highlightMode === 'prompt' ? '#f5a623' : '#66bb6a'
  const regionHighlightStroke = highlightMode === 'prompt' ? '#e65100' : '#4caf50'

  const { viewBox } = level
  const countryPaths = level.getCountryPaths()
  const waterPaths = level.getWaterPaths()

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

  const geoToSvg = level.geoToSvg

  function isRegionDimmed(regionId: string, isMatch: boolean) {
    if (hoveredRegionId && hoveredRegionId === regionId) return false
    if (highlightedRegionId && !isMatch) return true
    if (hintRegionId && hintRegionId !== regionId) return true
    return false
  }

  function waterBaseStyle(regionId: string) {
    const isMatch = highlightedRegionId === regionId
    const dimmed = isRegionDimmed(regionId, isMatch)

    if (showDropZones) {
      const isHovered = hoveredRegionId === regionId
      return {
        fill: '#7ec8e8',
        stroke: isHovered ? '#f5a623' : '#4a90d988',
        strokeWidth: isHovered ? 3 : 1.5,
        strokeDasharray: '6 4',
        opacity: dimmed ? 0.45 : 1,
      }
    }

    return {
      fill: '#7ec8e8',
      stroke: '#5ba8c9',
      strokeWidth: 0.5,
      opacity: dimmed ? 0.45 : 1,
    }
  }

  function waterOverlayStyle(regionId: string) {
    const isHighlighted = highlightedRegionId === regionId
    const isHovered = hoveredRegionId === regionId
    const isHinted = hintRegionId === regionId

    if (isHovered) {
      return { fill: '#ffe082', stroke: '#f5a623', strokeWidth: 2 }
    }
    if (isHinted) {
      return { fill: '#f5a623', stroke: '#e65100', strokeWidth: 2 }
    }
    if (isHighlighted) {
      return {
        fill: regionHighlight,
        stroke: regionHighlightStroke,
        strokeWidth: 2,
      }
    }
    return null
  }

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

      <g className="water-regions">
        {waterPaths.map(({ id, d }) => {
          const style = waterBaseStyle(id)
          return (
            <path
              key={id}
              data-region={id}
              data-water="true"
              d={d}
              fill={style.fill}
              stroke={style.stroke}
              strokeWidth={style.strokeWidth}
              strokeDasharray={style.strokeDasharray}
              opacity={style.opacity}
            />
          )
        })}
      </g>

      <g className="land-regions">
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

          const dimmed = isRegionDimmed(regionId ?? '', Boolean(isHighlighted))
          const isQuizCountry = Boolean(regionId)

          return (
            <path
              key={name}
              data-country={name}
              data-region={regionId ?? undefined}
              d={d}
              fill={
                isHighlighted
                  ? regionHighlight
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
              stroke={
                isHighlighted
                  ? regionHighlightStroke
                  : isHinted || isHovered
                    ? '#f5a623'
                    : '#4a7a3a'
              }
              strokeWidth={isHighlighted || isHinted || isHovered ? 1.2 : 0.6}
              opacity={dimmed && !isHinted ? 0.55 : isQuizCountry ? 1 : 0.65}
            />
          )
        })}
      </g>

      <g className="water-regions-overlay" pointerEvents="none" aria-hidden="true">
        {waterPaths.map(({ id, d }) => {
          const style = waterOverlayStyle(id)
          if (!style) return null
          return (
            <path
              key={`overlay-${id}`}
              d={d}
              fill={style.fill}
              stroke={style.stroke}
              strokeWidth={style.strokeWidth}
              className={hoveredRegionId === id ? 'drop-zone-pulse' : undefined}
            />
          )
        })}
      </g>
    </svg>
  )
})

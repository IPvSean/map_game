import { forwardRef } from 'react'
import type { MapLevelDefinition } from '../data/mapLevels/types'
import { isOpenOceanRegion } from '../data/waterRegions'

interface QuizMapProps {
  level: MapLevelDefinition
  highlightedRegionId?: string | null
  hintRegionId?: string | null
  hoveredRegionId?: string | null
  showDropZones?: boolean
  highlightMode?: 'prompt' | 'success'
}

const LAND_PROMPT_FILL = '#f5a623'
const LAND_PROMPT_STROKE = '#e65100'
const LAND_SUCCESS_FILL = '#66bb6a'
const LAND_SUCCESS_STROKE = '#4caf50'

const WATER_PROMPT_FILL = '#4fc3f7'
const WATER_PROMPT_STROKE = '#0277bd'
const WATER_SUCCESS_FILL = '#26c6da'
const WATER_SUCCESS_STROKE = '#00838f'
const WATER_HOVER_FILL = '#81d4fa'
const WATER_HOVER_STROKE = '#0288d1'
const WATER_HINT_FILL = '#4fc3f7'
const WATER_HINT_STROKE = '#0277bd'

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
  const { viewBox } = level
  const countryPaths = level.getCountryPaths()
  const waterPaths = level.getWaterPaths()
  const waterCircleZones = level.getWaterCircleZones()

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
  const arcticBandMaxSvgY = level.arcticBandMaxSvgY
  const ARCTIC_OCEAN_ID = 'arctic-ocean'

  function isRegionDimmed(regionId: string, isMatch: boolean) {
    if (hoveredRegionId && hoveredRegionId === regionId) return false
    if (highlightedRegionId && !isMatch) return true
    if (hintRegionId && hintRegionId !== regionId) return true
    return false
  }

  function landFillStroke(isHighlighted: boolean, isHinted: boolean, isHovered: boolean) {
    if (isHighlighted) {
      return {
        fill: highlightMode === 'prompt' ? LAND_PROMPT_FILL : LAND_SUCCESS_FILL,
        stroke: highlightMode === 'prompt' ? LAND_PROMPT_STROKE : LAND_SUCCESS_STROKE,
      }
    }
    if (isHinted) {
      return { fill: LAND_PROMPT_FILL, stroke: LAND_PROMPT_STROKE }
    }
    if (isHovered) {
      return { fill: '#ffe082', stroke: '#f5a623' }
    }
    return null
  }

  function waterBaseStyle(regionId: string) {
    const isHovered = hoveredRegionId === regionId
    const hideBaseFill = isOpenOceanRegion(regionId)

    if (showDropZones) {
      return {
        fill: 'transparent',
        stroke: isHovered ? WATER_HOVER_STROKE : '#4a90d988',
        strokeWidth: isHovered ? 3 : 1.5,
        strokeDasharray: '6 4',
        opacity: 1,
      }
    }

    if (hideBaseFill) {
      return {
        fill: 'transparent',
        stroke: 'none',
        strokeWidth: 0,
        opacity: 1,
      }
    }

    return {
      fill: 'transparent',
      stroke: 'none',
      strokeWidth: 0,
      opacity: 1,
    }
  }

  function waterOverlayStyle(regionId: string) {
    const isHighlighted = highlightedRegionId === regionId
    const isHovered = hoveredRegionId === regionId
    const isHinted = hintRegionId === regionId

    if (isHovered) {
      return { fill: WATER_HOVER_FILL, stroke: WATER_HOVER_STROKE, strokeWidth: 2.5 }
    }
    if (isHinted) {
      return { fill: WATER_HINT_FILL, stroke: WATER_HINT_STROKE, strokeWidth: 2.5 }
    }
    if (isHighlighted) {
      return {
        fill: highlightMode === 'prompt' ? WATER_PROMPT_FILL : WATER_SUCCESS_FILL,
        stroke: highlightMode === 'prompt' ? WATER_PROMPT_STROKE : WATER_SUCCESS_STROKE,
        strokeWidth: 2.5,
        strokeDasharray: undefined,
      }
    }
    return null
  }

  const arcticMaskId = `arctic-water-mask-${level.id}`
  const arcticOverlayStyle = arcticBandMaxSvgY != null
    ? waterOverlayStyle(ARCTIC_OCEAN_ID)
    : null
  const arcticDropZoneStyle =
    arcticBandMaxSvgY != null && showDropZones ? waterBaseStyle(ARCTIC_OCEAN_ID) : null

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={viewBox.width} height={viewBox.height} fill="#7ec8e8" />

      {arcticBandMaxSvgY != null && (
        <defs>
          <mask id={arcticMaskId}>
            <rect
              x={0}
              y={0}
              width={viewBox.width}
              height={arcticBandMaxSvgY}
              fill="white"
            />
            {countryPaths.map(({ name, d }) => (
              <path key={`arctic-mask-${name}`} d={d} fill="black" />
            ))}
          </mask>
        </defs>
      )}

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
        {waterCircleZones.map(({ regionId, cx, cy, r }) => {
          if (regionId === ARCTIC_OCEAN_ID) return null
          const style = waterBaseStyle(regionId)
          return (
            <circle
              key={`circle-${regionId}`}
              data-region={regionId}
              data-water="true"
              cx={cx}
              cy={cy}
              r={r}
              fill={style.fill}
              stroke={style.stroke}
              strokeWidth={style.strokeWidth}
              strokeDasharray={style.strokeDasharray}
              opacity={style.opacity}
            />
          )
        })}
        {arcticDropZoneStyle && (
          <rect
            key="arctic-band-drop"
            x={0}
            y={0}
            width={viewBox.width}
            height={arcticBandMaxSvgY}
            fill={arcticDropZoneStyle.fill}
            stroke={arcticDropZoneStyle.stroke}
            strokeWidth={arcticDropZoneStyle.strokeWidth}
            strokeDasharray={arcticDropZoneStyle.strokeDasharray}
            opacity={arcticDropZoneStyle.opacity}
            mask={`url(#${arcticMaskId})`}
          />
        )}
      </g>

      <g className="land-regions">
        {countryPaths.map(({ name, d, regionId }) => {
          const isHighlighted =
            Boolean(highlightedRegionId) &&
            Boolean(regionId) &&
            !level.isWaterRegion(highlightedRegionId!) &&
            level.isCountryInRegion(name, highlightedRegionId!)

          const isHovered =
            Boolean(hoveredRegionId) &&
            Boolean(regionId) &&
            level.isCountryInRegion(name, hoveredRegionId!)

          const isHinted =
            Boolean(hintRegionId) &&
            Boolean(regionId) &&
            !level.isWaterRegion(hintRegionId!) &&
            level.isCountryInRegion(name, hintRegionId!)

          const dimmed = isRegionDimmed(regionId ?? '', Boolean(isHighlighted))
          const isQuizCountry = Boolean(regionId)
          const active = landFillStroke(Boolean(isHighlighted), Boolean(isHinted), Boolean(isHovered))

          return (
            <path
              key={name}
              data-country={name}
              data-region={regionId ?? undefined}
              d={d}
              fill={
                active?.fill ??
                (dimmed ? '#a5c99a' : isQuizCountry ? '#8bc34a' : '#9ec89a')
              }
              stroke={active?.stroke ?? '#4a7a3a'}
              strokeWidth={active ? 1.2 : 0.6}
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
        {waterCircleZones.map(({ regionId, cx, cy, r }) => {
          if (regionId === ARCTIC_OCEAN_ID) return null
          const style = waterOverlayStyle(regionId)
          if (!style) return null
          return (
            <circle
              key={`overlay-circle-${regionId}`}
              cx={cx}
              cy={cy}
              r={r}
              fill={style.fill}
              stroke={style.stroke}
              strokeWidth={style.strokeWidth}
              className={
                hoveredRegionId === regionId ? 'drop-zone-pulse' : undefined
              }
            />
          )
        })}
        {arcticOverlayStyle && arcticBandMaxSvgY != null && (
          <rect
            key="arctic-band-overlay"
            x={0}
            y={0}
            width={viewBox.width}
            height={arcticBandMaxSvgY}
            fill={arcticOverlayStyle.fill}
            stroke={arcticOverlayStyle.stroke}
            strokeWidth={arcticOverlayStyle.strokeWidth}
            mask={`url(#${arcticMaskId})`}
            className={
              hoveredRegionId === ARCTIC_OCEAN_ID ? 'drop-zone-pulse' : undefined
            }
          />
        )}
      </g>
    </svg>
  )
})

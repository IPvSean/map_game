import { forwardRef } from 'react'
import { MAP_VIEWBOX } from '../data/regions'

interface WorldMapProps {
  highlightedZoneId?: string | null
  showDropZones?: boolean
}

export const WorldMap = forwardRef<SVGSVGElement, WorldMapProps>(
  function WorldMap({ highlightedZoneId, showDropZones = false }, ref) {
    const isHighlighted = (id: string) => highlightedZoneId === id

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ocean background */}
        <rect width={800} height={450} fill="#8ecae6" />

        {/* Pacific Ocean highlight zone */}
        <ellipse
          id="zone-pacific-ocean"
          cx={680}
          cy={200}
          rx={120}
          ry={100}
          fill={isHighlighted('zone-pacific-ocean') ? '#4caf5044' : 'transparent'}
          stroke={isHighlighted('zone-pacific-ocean') ? '#4caf50' : 'transparent'}
          strokeWidth={3}
        />

        {/* Atlantic Ocean */}
        <ellipse
          id="zone-atlantic-ocean"
          cx={300}
          cy={250}
          rx={90}
          ry={110}
          fill={isHighlighted('zone-atlantic-ocean') ? '#4caf5044' : 'transparent'}
          stroke={isHighlighted('zone-atlantic-ocean') ? '#4caf50' : 'transparent'}
          strokeWidth={3}
        />

        {/* Indian Ocean */}
        <ellipse
          id="zone-indian-ocean"
          cx={560}
          cy={310}
          rx={90}
          ry={70}
          fill={isHighlighted('zone-indian-ocean') ? '#4caf5044' : 'transparent'}
          stroke={isHighlighted('zone-indian-ocean') ? '#4caf50' : 'transparent'}
          strokeWidth={3}
        />

        {/* Southern Ocean */}
        <ellipse
          id="zone-southern-ocean"
          cx={400}
          cy={370}
          rx={200}
          ry={40}
          fill={isHighlighted('zone-southern-ocean') ? '#4caf5044' : 'transparent'}
          stroke={isHighlighted('zone-southern-ocean') ? '#4caf50' : 'transparent'}
          strokeWidth={3}
        />

        {/* Antarctica */}
        <path
          id="zone-antarctica"
          d="M 120 400 Q 200 380 300 395 Q 400 410 500 400 Q 600 390 680 400 L 680 450 L 120 450 Z"
          fill={isHighlighted('zone-antarctica') ? '#81c784' : '#e8e8e8'}
          stroke="#bbb"
          strokeWidth={1.5}
        />

        {/* North America */}
        <path
          id="zone-north-america"
          d="M 80 80 L 130 60 L 180 70 L 200 100 L 190 140 L 170 180 L 140 200 L 110 190 L 90 160 L 70 120 Z"
          fill={isHighlighted('zone-north-america') ? '#81c784' : '#c8e6c9'}
          stroke="#5a9e3a"
          strokeWidth={1.5}
        />

        {/* Central America */}
        <path
          id="zone-central-america"
          d="M 155 200 L 175 210 L 185 250 L 170 270 L 155 260 L 150 220 Z"
          fill={isHighlighted('zone-central-america') ? '#81c784' : '#a5d6a7'}
          stroke="#5a9e3a"
          strokeWidth={1.5}
        />

        {/* Gulf of Mexico */}
        <ellipse
          id="zone-gulf-of-mexico"
          cx={175}
          cy={215}
          rx={30}
          ry={22}
          fill={isHighlighted('zone-gulf-of-mexico') ? '#4caf5044' : '#6ec6e8aa'}
          stroke={isHighlighted('zone-gulf-of-mexico') ? '#4caf50' : '#4a90d9'}
          strokeWidth={2}
        />

        {/* Caribbean Sea */}
        <ellipse
          id="zone-caribbean-sea"
          cx={210}
          cy={255}
          rx={35}
          ry={25}
          fill={isHighlighted('zone-caribbean-sea') ? '#4caf5044' : '#6ec6e8aa'}
          stroke={isHighlighted('zone-caribbean-sea') ? '#4caf50' : '#4a90d9'}
          strokeWidth={2}
        />

        {/* Caribbean Islands */}
        <g id="zone-caribbean-islands">
          <circle cx={185} cy={230} r={6} fill={isHighlighted('zone-caribbean-islands') ? '#4caf50' : '#8d6e63'} />
          <circle cx={200} cy={240} r={5} fill={isHighlighted('zone-caribbean-islands') ? '#4caf50' : '#8d6e63'} />
          <circle cx={215} cy={232} r={5} fill={isHighlighted('zone-caribbean-islands') ? '#4caf50' : '#8d6e63'} />
          {isHighlighted('zone-caribbean-islands') && (
            <circle cx={200} cy={235} r={40} fill="#4caf5044" stroke="#4caf50" strokeWidth={3} />
          )}
        </g>

        {/* South America */}
        <path
          id="zone-south-america"
          d="M 195 275 L 220 270 L 250 290 L 260 330 L 245 370 L 220 390 L 200 380 L 185 340 L 180 300 Z"
          fill={isHighlighted('zone-south-america') ? '#81c784' : '#a5d6a7'}
          stroke="#5a9e3a"
          strokeWidth={1.5}
        />

        {/* Europe */}
        <path
          id="zone-europe"
          d="M 420 120 L 460 110 L 490 130 L 485 160 L 460 175 L 430 165 L 415 140 Z"
          fill={isHighlighted('zone-europe') ? '#81c784' : '#fff9c4'}
          stroke="#f9a825"
          strokeWidth={1.5}
        />

        {/* Africa */}
        <path
          id="zone-africa"
          d="M 430 195 L 470 190 L 500 220 L 510 270 L 495 330 L 460 350 L 430 340 L 415 290 L 420 230 Z"
          fill={isHighlighted('zone-africa') ? '#81c784' : '#ffcc80'}
          stroke="#ef6c00"
          strokeWidth={1.5}
        />

        {/* Mediterranean Sea */}
        <ellipse
          id="zone-mediterranean-sea"
          cx={455}
          cy={195}
          rx={40}
          ry={18}
          fill={isHighlighted('zone-mediterranean-sea') ? '#4caf5044' : '#6ec6e8aa'}
          stroke={isHighlighted('zone-mediterranean-sea') ? '#4caf50' : '#4a90d9'}
          strokeWidth={2}
        />

        {/* Middle East */}
        <path
          id="zone-middle-east"
          d="M 490 195 L 530 190 L 545 220 L 535 250 L 510 255 L 495 230 Z"
          fill={isHighlighted('zone-middle-east') ? '#81c784' : '#ffe0b2'}
          stroke="#ef6c00"
          strokeWidth={1.5}
        />

        {/* Asia */}
        <path
          id="zone-asia"
          d="M 490 100 L 580 90 L 660 110 L 700 150 L 690 200 L 650 230 L 580 220 L 520 200 L 490 160 L 480 130 Z"
          fill={isHighlighted('zone-asia') ? '#81c784' : '#ffab91'}
          stroke="#d84315"
          strokeWidth={1.5}
        />

        {/* Southeast Asia */}
        <path
          id="zone-southeast-asia"
          d="M 600 240 L 660 235 L 680 260 L 670 285 L 630 290 L 605 270 Z"
          fill={isHighlighted('zone-southeast-asia') ? '#81c784' : '#ffcc80'}
          stroke="#ef6c00"
          strokeWidth={1.5}
        />

        {/* Australia */}
        <path
          id="zone-australia"
          d="M 650 310 L 710 305 L 720 335 L 700 355 L 660 350 L 645 325 Z"
          fill={isHighlighted('zone-australia') ? '#81c784' : '#ce93d8'}
          stroke="#8e24aa"
          strokeWidth={1.5}
        />

        {/* Oceania */}
        <g id="zone-oceania">
          <circle cx={720} cy={310} r={5} fill={isHighlighted('zone-oceania') ? '#4caf50' : '#8d6e63'} />
          <circle cx={735} cy={325} r={4} fill={isHighlighted('zone-oceania') ? '#4caf50' : '#8d6e63'} />
          <circle cx={710} cy={335} r={4} fill={isHighlighted('zone-oceania') ? '#4caf50' : '#8d6e63'} />
          {isHighlighted('zone-oceania') && (
            <circle cx={700} cy={320} r={50} fill="#4caf5044" stroke="#4caf50" strokeWidth={3} />
          )}
        </g>

        {/* Debug drop zones (dev only visual aid, hidden by default) */}
        {showDropZones && (
          <g opacity={0.3}>
            {[
              { cx: 400, cy: 410, r: 70 },
              { cx: 195, cy: 235, r: 40 },
              { cx: 455, cy: 195, r: 35 },
              { cx: 640, cy: 255, r: 45 },
              { cx: 300, cy: 250, r: 55 },
              { cx: 700, cy: 320, r: 50 },
              { cx: 210, cy: 255, r: 35 },
              { cx: 400, cy: 370, r: 60 },
              { cx: 680, cy: 200, r: 65 },
              { cx: 455, cy: 155, r: 40 },
              { cx: 520, cy: 215, r: 40 },
              { cx: 680, cy: 330, r: 40 },
              { cx: 175, cy: 265, r: 35 },
              { cx: 175, cy: 215, r: 35 },
              { cx: 155, cy: 165, r: 55 },
              { cx: 230, cy: 320, r: 50 },
              { cx: 580, cy: 185, r: 60 },
              { cx: 560, cy: 310, r: 55 },
              { cx: 470, cy: 280, r: 50 },
            ].map((z, i) => (
              <circle
                key={i}
                cx={z.cx}
                cy={z.cy}
                r={z.r}
                fill="none"
                stroke="red"
                strokeWidth={1}
                strokeDasharray="4 2"
              />
            ))}
          </g>
        )}
      </svg>
    )
  },
)

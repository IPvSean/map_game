import type { LevelId } from '../data/mapLevels/types'

export type Activity = 'flashcard' | 'map'

export interface LevelActivity {
  levelId: LevelId
  activity: Activity
}

interface HomeScreenProps {
  onStart: (selection: LevelActivity) => void
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="home-screen">
      <h1 className="home-title">Map Game</h1>
      <p className="home-subtitle">Learn where places are!</p>

      <section className="level-section" aria-labelledby="level-1-heading">
        <h2 id="level-1-heading" className="level-heading">
          Level 1 — World
        </h2>
        <p className="level-desc">Continents & oceans</p>
        <div className="mode-buttons">
          <button
            type="button"
            className="mode-btn"
            onClick={() => onStart({ levelId: 'world', activity: 'flashcard' })}
          >
            <span className="mode-btn-icon" aria-hidden="true">🃏</span>
            <span className="mode-btn-label">Flashcards</span>
            <span className="mode-btn-desc">Pick the right answer</span>
          </button>
          <button
            type="button"
            className="mode-btn"
            onClick={() => onStart({ levelId: 'world', activity: 'map' })}
          >
            <span className="mode-btn-icon" aria-hidden="true">🌍</span>
            <span className="mode-btn-label">World Map</span>
            <span className="mode-btn-desc">Drag labels to the map</span>
          </button>
        </div>
      </section>

      <section className="level-section" aria-labelledby="level-2-heading">
        <h2 id="level-2-heading" className="level-heading">
          Level 2 — Europe
        </h2>
        <p className="level-desc">Peninsulas, regions & seas</p>
        <div className="mode-buttons">
          <button
            type="button"
            className="mode-btn"
            onClick={() => onStart({ levelId: 'europe', activity: 'flashcard' })}
          >
            <span className="mode-btn-icon" aria-hidden="true">🃏</span>
            <span className="mode-btn-label">Flashcards</span>
            <span className="mode-btn-desc">Pick the right answer</span>
          </button>
          <button
            type="button"
            className="mode-btn"
            onClick={() => onStart({ levelId: 'europe', activity: 'map' })}
          >
            <span className="mode-btn-icon" aria-hidden="true">🗺️</span>
            <span className="mode-btn-label">Europe Map</span>
            <span className="mode-btn-desc">Drag labels to the map</span>
          </button>
        </div>
      </section>
    </div>
  )
}

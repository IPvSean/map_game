export type GameMode = 'home' | 'flashcard' | 'map'

interface HomeScreenProps {
  onSelectMode: (mode: GameMode) => void
}

export function HomeScreen({ onSelectMode }: HomeScreenProps) {
  return (
    <div className="home-screen">
      <h1 className="home-title">Map Game</h1>
      <p className="home-subtitle">Learn where places are!</p>
      <div className="mode-buttons">
        <button
          type="button"
          className="mode-btn"
          onClick={() => onSelectMode('flashcard')}
        >
          <span className="mode-btn-icon" aria-hidden="true">🃏</span>
          <span className="mode-btn-label">Flashcards</span>
          <span className="mode-btn-desc">Pick the right answer</span>
        </button>
        <button
          type="button"
          className="mode-btn"
          onClick={() => onSelectMode('map')}
        >
          <span className="mode-btn-icon" aria-hidden="true">🌍</span>
          <span className="mode-btn-label">World Map</span>
          <span className="mode-btn-desc">Drag labels to the map</span>
        </button>
      </div>
    </div>
  )
}

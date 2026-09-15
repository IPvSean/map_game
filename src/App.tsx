import { useState } from 'react'
import { FlashcardMode } from './components/FlashcardMode'
import { HomeScreen, type LevelActivity } from './components/HomeScreen'
import { MapQuizMode } from './components/MapQuizMode'
import { getMapLevel } from './data/mapLevels'

function App() {
  const [selection, setSelection] = useState<LevelActivity | null>(null)
  const [sessionKey, setSessionKey] = useState(0)

  const startActivity = (next: LevelActivity) => {
    setSessionKey((n) => n + 1)
    setSelection(next)
  }

  const goHome = () => setSelection(null)

  if (!selection) {
    return (
      <div className="app">
        <HomeScreen onStart={startActivity} />
      </div>
    )
  }

  const level = getMapLevel(selection.levelId)

  return (
    <div className="app">
      {selection.activity === 'flashcard' && (
        <FlashcardMode key={sessionKey} level={level} onBack={goHome} />
      )}
      {selection.activity === 'map' && (
        <MapQuizMode key={sessionKey} level={level} onBack={goHome} />
      )}
    </div>
  )
}

export default App

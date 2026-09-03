import { useState } from 'react'
import { FlashcardMode } from './components/FlashcardMode'
import { HomeScreen, type GameMode } from './components/HomeScreen'
import { WorldMapMode } from './components/WorldMapMode'

function App() {
  const [mode, setMode] = useState<GameMode>('home')
  const [flashSession, setFlashSession] = useState(0)
  const [mapSession, setMapSession] = useState(0)

  const startMode = (nextMode: GameMode) => {
    if (nextMode === 'flashcard') {
      setFlashSession((n) => n + 1)
    }
    if (nextMode === 'map') {
      setMapSession((n) => n + 1)
    }
    setMode(nextMode)
  }

  return (
    <div className="app">
      {mode === 'home' && <HomeScreen onSelectMode={startMode} />}
      {mode === 'flashcard' && (
        <FlashcardMode key={flashSession} onBack={() => setMode('home')} />
      )}
      {mode === 'map' && (
        <WorldMapMode key={mapSession} onBack={() => setMode('home')} />
      )}
    </div>
  )
}

export default App

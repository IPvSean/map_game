import { useState } from 'react'
import { FlashcardMode } from './components/FlashcardMode'
import { HomeScreen, type GameMode } from './components/HomeScreen'
import { WorldMapMode } from './components/WorldMapMode'

function App() {
  const [mode, setMode] = useState<GameMode>('home')

  return (
    <div className="app">
      {mode === 'home' && <HomeScreen onSelectMode={setMode} />}
      {mode === 'flashcard' && (
        <FlashcardMode onBack={() => setMode('home')} />
      )}
      {mode === 'map' && (
        <WorldMapMode onBack={() => setMode('home')} />
      )}
    </div>
  )
}

export default App

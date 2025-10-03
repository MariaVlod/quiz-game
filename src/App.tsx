import React, { useState } from 'react'
import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage'
import ResultPage from './pages/ResultPage'

type AppState = 'start' | 'game' | 'results'

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('start')
  const [score, setScore] = useState(0)

  const handleStartGame = () => {
    setScore(0)
    setCurrentPage('game')
  }

  const handleEndGame = (finalScore: number) => {
    setScore(finalScore)
    setCurrentPage('results')
  }

  const handleRestart = () => {
    setCurrentPage('start')
  }

  return (
    <div className="app">
      {currentPage === 'start' && <StartPage onStart={handleStartGame} />}
      {currentPage === 'game' && <GamePage onEndGame={handleEndGame} />}
      {currentPage === 'results' && (
        <ResultPage score={score} onRestart={handleRestart} />
      )}
    </div>
  )
}

export default App
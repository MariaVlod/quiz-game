import React, { useState } from 'react'
import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage'
import ResultPage from './pages/ResultPage'
import type { Question, QuizFilterOptions } from './types'

type AppState = 'start' | 'game' | 'results'

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('start')
  const [questions, setQuestions] = useState<Question[]>([])
  const [score, setScore] = useState(0)
  const [answersHistory, setAnswersHistory] = useState<any[]>([])

  const handleStartGame = (selectedQuestions: Question[]) => {
    setQuestions(selectedQuestions)
    setScore(0)
    setAnswersHistory([])
    setCurrentPage('game')
  }

  const handleEndGame = (finalScore: number, finalAnswersHistory: any[]) => {
    setScore(finalScore)
    setAnswersHistory(finalAnswersHistory)
    setCurrentPage('results')
  }

  const handleRestart = () => {
    setQuestions([])
    setScore(0)
    setAnswersHistory([])
    setCurrentPage('start')
  }

  return (
    <div className="app">
      {currentPage === 'start' && 
        <StartPage onStart={handleStartGame} />
      }
      
      {currentPage === 'game' && questions.length > 0 && 
        <GamePage 
          questions={questions}
          onEndGame={handleEndGame}
        />
      }
      
      {currentPage === 'results' && 
        <ResultPage 
          score={score}
          answersHistory={answersHistory}
          onRestart={handleRestart}
        />
      }
    </div>
  )
}

export default App
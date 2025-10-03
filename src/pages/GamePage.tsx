import React from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import Question from '../game/Question'
import AnswerList from '../game/AnswerList'
import ProgressInfo from '../game/ProgressInfo'
import ScoreBoard from '../game/ScoreBoard'

interface GamePageProps {
  onEndGame: (score: number) => void
}

const GamePage: React.FC<GamePageProps> = ({ onEndGame }) => {
  // Плейсхолдери для майбутньої логіки
  const handleAnswerSelect = (answer: string) => {
    console.log('Selected answer:', answer)
  }

  const handleGameEnd = () => {
    onEndGame(7) // Плейсхолдер балів
  }

  return (
    <div className="page game-page">
      <Header />
      
      <div className="game-page__layout">
        <div className="game-page__info">
          <ProgressInfo current={2} total={10} />
          <ScoreBoard score={150} />
        </div>
        
        <Card className="game-page__question-card">
          <Question text="Який актор зіграв головну роль у фільмі 'Матриця'?" />
          
          <AnswerList 
            answers={[
              'Кіану Рівз',
              'Вілл Сміт',
              'Том Круз',
              'Бред Пітт'
            ]}
            onAnswerSelect={handleAnswerSelect}
          />
        </Card>
        
        <div className="game-page__actions">
          <button onClick={handleGameEnd} className="btn btn--secondary">
            Завершити гру (для тесту)
          </button>
        </div>
      </div>
    </div>
  )
}

export default GamePage
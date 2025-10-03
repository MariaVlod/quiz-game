import React from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import Button from '../components/Button'

interface ResultPageProps {
  score: number
  onRestart: () => void
}

const ResultPage: React.FC<ResultPageProps> = ({ score, onRestart }) => {
  const maxScore = 1000 // Плейсхолдер
  const percentage = (score / maxScore) * 100
  
  const getResultMessage = () => {
    if (percentage >= 80) return "Вітаю! Ти справжній кінознавець!"
    if (percentage >= 60) return "Добре знаєш фільми!"
    if (percentage >= 40) return "Непогано, але є куди рости!"
    return "Спробуй ще раз! Ти зможеш краще!"
  }

  return (
    <div className="page result-page">
      <Header />
      
      <Card className="result-page__card">
        <div className="result-page__content">
          <h2>Результати гри</h2>
          
          <div className="result-page__score">
            <div className="score-circle">
              <span className="score-value">{score}</span>
              <span className="score-label">балів</span>
            </div>
          </div>
          
          <div className="result-page__message">
            <p>{getResultMessage()}</p>
          </div>
          
          <div className="result-page__details">
            <p>Ти відповів правильно на 7 з 10 запитань</p>
          </div>
          
          <div className="result-page__actions">
            <Button onClick={onRestart}>
              Грати знову
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ResultPage
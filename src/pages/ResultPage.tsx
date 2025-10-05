import React from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import Button from '../components/Button'
import { useResults } from '../hooks/useResults'
import type { AnswerHistory } from '../types'

interface ResultPageProps {
  score: number
  answersHistory: AnswerHistory[]
  onRestart: () => void
}

const ResultPage: React.FC<ResultPageProps> = ({ score, answersHistory, onRestart }) => {
  const { total, correct, incorrect, percent } = useResults(answersHistory)
  
  const getResultMessage = () => {
    if (percent >= 80) return "Вітаю! Ти справжній кінознавець! 🎉"
    if (percent >= 60) return "Добре знаєш фільми! 👍"
    if (percent >= 40) return "Непогано, але є куди рости! 💪"
    return "Спробуй ще раз! Ти зможеш краще! 🎬"
  }

  const getResultEmoji = () => {
    if (percent >= 80) return "🏆"
    if (percent >= 60) return "⭐"
    if (percent >= 40) return "👍"
    return "🎬"
  }

  return (
    <div className="page result-page">
      <Header />
      
      <Card className="result-page__card">
        <div className="result-page__content">
          <h2>Результати гри {getResultEmoji()}</h2>
          
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
            <div className="stats-grid">
              <div className="stat">
                <span className="stat-value">{correct}</span>
                <span className="stat-label">Правильних</span>
              </div>
              <div className="stat">
                <span className="stat-value">{incorrect}</span>
                <span className="stat-label">Неправильних</span>
              </div>
              <div className="stat">
                <span className="stat-value">{percent}%</span>
                <span className="stat-label">Успішність</span>
              </div>
            </div>
            
            <p className="summary">
              Ти відповів правильно на {correct} з {total} запитань
            </p>
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
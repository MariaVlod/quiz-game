import React, { useEffect } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import Button from '../components/Button'
import Question from '../game/Question'
import AnswerList from '../game/AnswerList'
import ProgressInfo from '../game/ProgressInfo'
import ScoreBoard from '../game/ScoreBoard'
import { useGameFlow } from '../hooks/useGameFlow'
import { useTimer } from '../hooks/useTimer'
import type { Question as QuestionType } from '../types'

interface GamePageProps {
  questions: QuestionType[]
  onEndGame: (score: number, answersHistory: any[]) => void
}

const GamePage: React.FC<GamePageProps> = ({ questions, onEndGame }) => {
  const {
    currentQuestion,
    selectedOptionId,
    answersHistory,
    score,
    isFinished,
    isAnswerLocked,
    selectOption,
    next,
    getProgress
  } = useGameFlow(questions)

  const { timeLeft, start, reset } = useTimer({
    initialSeconds: 30,
    onExpire: () => {
      // Автоматичний перехід до наступного питання при закінченні часу
      if (!isAnswerLocked) {
        selectOption('') // Позначаємо як пропущене
      }
      setTimeout(next, 1000)
    },
    autoStart: true
  })

  const handleAnswerSelect = (optionId: string) => {
    selectOption(optionId)
  }

  const handleNext = () => {
    next()
    reset(30) // Скидання таймера для наступного питання
  }

  // Автоматичне завершення гри
  useEffect(() => {
    if (isFinished) {
      onEndGame(score, answersHistory)
    }
  }, [isFinished, score, answersHistory, onEndGame])

  // Перезапуск таймера при зміні питання
  useEffect(() => {
    if (currentQuestion) {
      reset(30)
      start()
    }
  }, [currentQuestion, reset, start])

  if (!currentQuestion) {
    return (
      <div className="page game-page">
        <Header />
        <Card>
          <p>Завантаження питання...</p>
        </Card>
      </div>
    )
  }

  const progress = getProgress()

  return (
    <div className="page game-page">
      <Header />
      
      <div className="game-page__layout">
        <div className="game-page__info">
          <ProgressInfo 
            current={progress.current} 
            total={progress.total} 
          />
          <ScoreBoard score={score} />
          <div className="timer">
            Час: {timeLeft}с
          </div>
        </div>
        
        <Card className="game-page__question-card">
          <Question text={currentQuestion.text} />
          
          <AnswerList 
            answers={currentQuestion.options}
            selectedOptionId={selectedOptionId}
            correctOptionId={isAnswerLocked ? currentQuestion.correctOptionId : undefined}
            onAnswerSelect={handleAnswerSelect}
            disabled={isAnswerLocked}
          />
        </Card>
        
        <div className="game-page__actions">
          {isAnswerLocked && (
            <Button onClick={handleNext}>
              {progress.current === progress.total ? 'Завершити' : 'Наступне питання'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default GamePage
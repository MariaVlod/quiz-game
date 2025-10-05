import React, { useEffect, useRef } from 'react'
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
    skipQuestion, // Додаємо новий метод
    next,
    getProgress
  } = useGameFlow(questions)

  // Використовуємо useRef для уникнення повторних викликів
  const timeoutRef = useRef<number | null>(null);

  const handleTimeExpire = React.useCallback(() => {
    console.log('⏰ Час вийшов! Автоматичний перехід...');
    
    // Очищаємо попередній таймаут, якщо він є
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    if (!isAnswerLocked && currentQuestion) {
      console.log('Користувач не встиг відповісти на питання:', currentQuestion.id);
      // Використовуємо новий метод для пропуску питання
      skipQuestion();
    }
    
    // Затримка для того, щоб користувач побачив, що час вийшов
    timeoutRef.current = window.setTimeout(() => {
      console.log('Перехід до наступного питання...');
      next();
      timeoutRef.current = null;
    }, 1000);
  }, [isAnswerLocked, currentQuestion, skipQuestion, next]);

  const { timeLeft, reset, pause } = useTimer({
    initialSeconds: 10,
    onExpire: handleTimeExpire,
    autoStart: true
  })

  const handleAnswerSelect = (optionId: string) => {
    console.log('Вибір відповіді:', optionId);
    selectOption(optionId)
    pause(); // Зупиняємо таймер після вибору відповіді
    
    // Очищаємо таймаут автоматичного переходу, якщо користувач встиг відповісти
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  const handleNext = () => {
    console.log('Перехід до наступного питання');
    next()
  }

  // Автоматичне завершення гри
  useEffect(() => {
    if (isFinished) {
      console.log('🎮 Гра завершена! Результат:', score, 'Історія:', answersHistory);
      onEndGame(score, answersHistory)
    }
  }, [isFinished, score, answersHistory, onEndGame])

  // Перезапуск таймера при зміні питання
  useEffect(() => {
    if (currentQuestion) {
      console.log('🔄 Нове питання, перезапуск таймера:', currentQuestion.id);
      
      // Очищаємо таймаут при зміні питання
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      reset(10);
    }
  }, [currentQuestion, reset])

  // Очистка при розмонтуванні
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
          <div className={`timer ${timeLeft <= 3 ? 'timer--warning' : ''}`}>
            Час: {timeLeft}с {!isAnswerLocked && timeLeft > 0 && '⏳'}
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

          {/* Дебаг інформація */}
          <div style={{ 
            marginTop: '20px', 
            padding: '10px', 
            background: '#f5f5f5', 
            borderRadius: '5px',
            fontSize: '12px',
            color: '#666'
          }}>
            Дебаг: Питання {currentQuestion.id} ({progress.current}/{progress.total}) | 
            Відповідей в історії: {answersHistory.length} | 
            isAnswerLocked = {isAnswerLocked.toString()} | 
            Час: {timeLeft}с
          </div>
        </Card>
        
        <div className="game-page__actions">
          {isAnswerLocked && (
            <Button onClick={handleNext}>
              {progress.current === progress.total ? 'Завершити гру' : 'Наступне питання →'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default GamePage
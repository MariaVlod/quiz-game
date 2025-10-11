import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { useResults } from '../hooks/useResults';
import type { AnswerHistory } from '../types';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [answersHistory, setAnswersHistory] = useState<AnswerHistory[]>([]);

  useEffect(() => {
    const savedResults = sessionStorage.getItem('quizResults');
    if (savedResults) {
      const results = JSON.parse(savedResults);
      setScore(results.score);
      setAnswersHistory(results.answersHistory);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const { total, correct, incorrect, skipped, percent } = useResults(answersHistory);
  
  const getResultMessage = () => {
    if (correct === total) return "Ідеально! Ти кінознавець екстра-класу! 🏆"
    if (percent >= 80) return "Вітаю! Ти справжній кінознавець! 🎉"
    if (percent >= 60) return "Добре знаєш фільми! 👍"
    if (percent >= 40) return "Непогано, але є куди рости! 💪"
    return "Спробуй ще раз! Ти зможеш краще! 🎬"
  }

  const getResultEmoji = () => {
    if (correct === total) return "🏆"
    if (percent >= 80) return "⭐"
    if (percent >= 60) return "👍"
    if (percent >= 40) return "📚"
    return "🎬"
  }

  const handleRestart = () => {
    navigate('/game');
  };

  const handleNewGame = () => {
    navigate('/');
  };

  const handleUserProfile = () => {
    // Отримуємо ID користувача з sessionStorage
    const userId = sessionStorage.getItem('currentUserId') || '1';
    navigate(`/user/${userId}`);
  };

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
              <div className="stat stat--correct">
                <span className="stat-value">{correct}</span>
                <span className="stat-label">Правильних</span>
              </div>
              <div className="stat stat--incorrect">
                <span className="stat-value">{incorrect}</span>
                <span className="stat-label">Неправильних</span>
              </div>
              <div className="stat stat--skipped">
                <span className="stat-value">{skipped}</span>
                <span className="stat-label">Пропущено</span>
              </div>
              <div className="stat stat--total">
                <span className="stat-value">{total}</span>
                <span className="stat-label">Всього</span>
              </div>
              <div className="stat stat--percent">
                <span className="stat-value">{percent}%</span>
                <span className="stat-label">Успішність</span>
              </div>
            </div>
            
            <p className="summary">
              {correct > 0 ? `Ти правильно відповів на ${correct} з ${total} запитань` : 'На жаль, ти не дав жодної правильної відповіді'}
              {skipped > 0 && ` (пропущено ${skipped} питань)`}
              {incorrect > 0 && `, неправильних відповідей: ${incorrect}`}
            </p>
          </div>
          
          <div className="result-page__actions">
            <Button onClick={handleRestart} variant="primary">
              Грати знову
            </Button>
            <Button onClick={handleNewGame} variant="secondary">
              Нова гра
            </Button>
            <Button onClick={handleUserProfile} variant="secondary">
              Профіль
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ResultPage;
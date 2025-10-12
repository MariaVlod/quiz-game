import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import { useResults } from '../../hooks/useResults';
import type { AnswerHistory } from '../../types';
import styles from './ResultPage.module.css';

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
    const userId = sessionStorage.getItem('currentUserId') || '1';
    navigate(`/user/${userId}`);
  };

  return (
    <div className="page">
      <Header />
      
      <Card size="large" className={styles.card}>
        <div className={styles.content}>
          <h2>Результати гри {getResultEmoji()}</h2>
          
          <div className={styles.score}>
            <div className={styles.scoreCircle}>
              <span className={styles.scoreValue}>{score}</span>
              <span className={styles.scoreLabel}>балів</span>
            </div>
          </div>
          
          <div className={styles.message}>
            <p>{getResultMessage()}</p>
          </div>
          
          <div className={styles.details}>
            <div className={styles.statsGrid}>
              <div className={`${styles.stat} ${styles.statCorrect}`}>
                <span className={styles.statValue}>{correct}</span>
                <span className={styles.statLabel}>Правильних</span>
              </div>
              <div className={`${styles.stat} ${styles.statIncorrect}`}>
                <span className={styles.statValue}>{incorrect}</span>
                <span className={styles.statLabel}>Неправильних</span>
              </div>
              <div className={`${styles.stat} ${styles.statSkipped}`}>
                <span className={styles.statValue}>{skipped}</span>
                <span className={styles.statLabel}>Пропущено</span>
              </div>
              <div className={`${styles.stat} ${styles.statTotal}`}>
                <span className={styles.statValue}>{total}</span>
                <span className={styles.statLabel}>Всього</span>
              </div>
              <div className={`${styles.stat} ${styles.statPercent}`}>
                <span className={styles.statValue}>{percent}%</span>
                <span className={styles.statLabel}>Успішність</span>
              </div>
            </div>
            
            <div className={styles.breakdown}>
              <h4>Детальна статистика:</h4>
              <ul>
                <li>✅ Правильних відповідей: <strong>{correct}</strong></li>
                <li>❌ Неправильних відповідей: <strong>{incorrect}</strong></li>
                <li>⏰ Пропущених питань: <strong>{skipped}</strong></li>
                <li>📊 Загальна успішність: <strong>{percent}%</strong></li>
              </ul>
            </div>
            
            <p className={styles.summary}>
              {correct > 0 ? `Ти правильно відповів на ${correct} з ${total} запитань` : 'На жаль, ти не дав жодної правильної відповіді'}
              {skipped > 0 && ` (пропущено ${skipped} питань)`}
              {incorrect > 0 && `, неправильних відповідей: ${incorrect}`}
            </p>
          </div>
          
          <div className={styles.actions}>
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
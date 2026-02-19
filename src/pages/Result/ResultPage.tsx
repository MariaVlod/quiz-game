import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import ResultsTable from '../../components/ResultsTable/ResultsTable';
import { useResults } from '../../hooks/useResults';
import { useGameStore } from '../../store/gameStore';
import type { AnswerHistory } from '../../types';
import styles from './ResultPage.module.css';

/**
 * Сторінка результатів гри.
 * Відображає детальну статистику завершеної гри, включаючи бали,
 * правильні/неправильні відповіді, пропущені питання та загальну успішність.
 * 
 * @component
 * @returns {JSX.Element} Сторінка з результатами гри
 * 
 * @example
 * // Використання в маршрутизаторі
 * <Route path="/results" element={<ResultPage />} />
 * 
 * @remarks
 * Компонент отримує результати поточної гри з sessionStorage,
 * а також показує історію всіх результатів з глобального стану.
 * Автоматично перенаправляє на головну сторінку, якщо результатів немає.
 * 
 * @see {@link useResults} для розрахунку статистики
 * @see {@link ResultsTable} для відображення історії результатів
 * @see {@link useGameStore} для роботи з глобальним станом результатів
 */
const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  
  /**
   * Отримує результати ігор та метод очищення з глобального стану.
   * @type {Object}
   * @property {GameResult[]} results - Масив всіх результатів користувача
   * @property {Function} clearResults - Метод для очищення історії результатів
   */
  const { results, clearResults } = useGameStore();
  
  /**
   * Стан для зберігання балів поточної гри.
   * @type {number}
   */
  const [score, setScore] = useState(0);
  
  /**
   * Стан для зберігання історії відповідей поточної гри.
   * @type {AnswerHistory[]}
   */
  const [answersHistory, setAnswersHistory] = useState<AnswerHistory[]>([]);

  /**
   * Ефект для завантаження результатів поточної гри з sessionStorage.
   * Якщо результатів немає, перенаправляє на головну сторінку.
   */
  useEffect(() => {
    const savedResults = sessionStorage.getItem('quizResults');
    if (savedResults) {
      const results = JSON.parse(savedResults);
      setScore(results.score);
      setAnswersHistory(results.answersHistory);
    } else {
      navigate("/");
    }
  }, [navigate]);

  /**
   * Розрахунок статистики поточної гри.
   * Використовує хук useResults для отримання детальних показників.
   * 
   * @type {Object}
   * @property {number} total - Загальна кількість питань
   * @property {number} correct - Кількість правильних відповідей
   * @property {number} incorrect - Кількість неправильних відповідей
   * @property {number} skipped - Кількість пропущених питань
   * @property {number} percent - Відсоток правильних відповідей
   */
  const { total, correct, incorrect, skipped, percent } = useResults(answersHistory);

  /**
   * Повертає мотивуюче повідомлення на основі результатів гри.
   * 
   * @returns {string} Персоналізоване повідомлення для користувача
   * @private
   */
  const getResultMessage = () => {
    if (correct === total) return "Ідеально! Ти кінознавець екстра-класу! 🎉";
    if (percent >= 80) return "Вітаю! Ти справжній кінознавець! 👍";
    if (percent >= 60) return "Добре знаєш фільми! 😊";
    if (percent >= 40) return "Непогано, але є куди рости! 🤔";
    return "Спробуй ще раз! Ти зможеш краще! 💪";
  };

  /**
   * Повертає емодзі, що відповідає рівню успішності.
   * 
   * @returns {string} Емодзі для відображення
   * @private
   */
  const getResultEmoji = () => {
    if (correct === total) return "🏆";
    if (percent >= 80) return "⭐";
    if (percent >= 60) return "👍";
    if (percent >= 40) return "🤔";
    return "💪";
  };

  /**
   * Обробник для перезапуску поточної гри.
   * Перенаправляє на сторінку гри без зміни налаштувань.
   */
  const handleRestart = () => {
    navigate('/game');
  };

  /**
   * Обробник для початку нової гри.
   * Перенаправляє на головну сторінку для вибору нових налаштувань.
   */
  const handleNewGame = () => {
    navigate("/");
  };

  /**
   * Обробник для переходу на сторінку профілю користувача.
   * Отримує поточний ID користувача з глобального стану.
   */
  const handleUserProfile = () => {
    const userId = useGameStore.getState().currentUserId;
    navigate(`/user/${userId}`);
  };

  /**
   * Обробник для очищення історії результатів.
   * Показує підтвердження перед видаленням даних.
   */
  const handleClearResults = () => {
    if (window.confirm('Ви впевнені, що хочете очистити історію результатів?')) {
      clearResults();
    }
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
          </div>

          <div className={styles.breakdown}>
            <h4>Детальна статистика:</h4>
            <ul>
              <li>Правильних відповідей: <strong>{correct}</strong></li>
              <li>Неправильних відповідей: <strong>{incorrect}</strong></li>
              <li>Пропущених питань: <strong>{skipped}</strong></li>
              <li>Загальна успішність: <strong>{percent}%</strong></li>
            </ul>
          </div>

          <p className={styles.summary}>
            {correct > 0 
              ? `Ти правильно відповів на ${correct} з ${total} запитань` 
              : 'На жаль, ти не дав жодної правильної відповіді'
            }
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
          {results.length > 0 && (
            <Button onClick={handleClearResults} variant="secondary">
              Очистити результати
            </Button>
          )}
        </div>
      </Card>

      {results.length > 0 && (
        <Card className={styles.resultsCard}>
          <h3>Історія результатів</h3>
          <ResultsTable results={results} />
        </Card>
      )}
    </div>
  );
};

export default ResultPage;
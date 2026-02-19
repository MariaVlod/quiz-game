import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Question from '../../game/Question/Question';
import AnswerList from '../../game/AnswerList/AnswerList';
import ProgressInfo from '../../game/ProgressInfo/ProgressInfo';
import ScoreBoard from '../../game/ScoreBoard/ScoreBoard';
import GameOverModal from '../../components/GameOverModal/GameOverModal';
import { useGameFlow } from '../../hooks/useGameFlow';
import { useTimer } from '../../hooks/useTimer';
import { useGameStore } from '../../store/gameStore';
import type { Question as QuestionType } from '../../types';
import styles from './GamePage.module.css';

/**
 * Головна сторінка гри, де відбувається весь ігровий процес.
 * Управляє станом гри, таймером, відповідями користувача та навігацією.
 * 
 * @component
 * @returns {JSX.Element} Сторінка гри з питаннями, відповідями та таймером
 * 
 * @example
 * // Використання в маршрутизаторі
 * <Route path="/game" element={<GamePage />} />
 * 
 * @remarks
 * Компонент інтегрує кілька ключових хуків:
 * - `useGameFlow` - логіка ігрового процесу
 * - `useTimer` - управління таймером питання
 * - `useGameStore` - глобальний стан гри
 * 
 * @see {@link useGameFlow} для деталей ігрової логіки
 * @see {@link useTimer} для деталей роботи таймера
 * @see {@link GameOverModal} для модального вікна завершення
 */
const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const { addResult, currentUserId, settings } = useGameStore();

  /**
   * Завантажує питання з sessionStorage при монтуванні компонента.
   * Якщо питань немає, перенаправляє на головну сторінку.
   */
  useEffect(() => {
    const savedQuestions = sessionStorage.getItem('quizQuestions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    } else {
      navigate('/');
    }
  }, [navigate]);

  /**
   * Хук управління ігровим процесом.
   * Містить всю логіку питань, відповідей та прогресу.
   */
  const {
    currentQuestion,
    selectedOptionId,
    answersHistory,
    score,
    isFinished,
    isAnswerLocked,
    selectOption,
    skipQuestion,
    next,
    restart,
    getProgress
  } = useGameFlow(questions);

  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  /**
   * Обробник завершення часу на питання.
   * Автоматично пропускає питання та переходить до наступного.
   * 
   * @function
   * @private
   */
  const handleTimeExpire = React.useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!isAnswerLocked && currentQuestion) {
      skipQuestion();

      timeoutRef.current = window.setTimeout(() => {
        next();
        timeoutRef.current = null;
      }, 1500);
    }
  }, [isAnswerLocked, currentQuestion, skipQuestion, next]);

  /**
   * Хук управління таймером питання.
   * Відповідає за відлік часу та автоматичне завершення.
   */
  const { timeLeft, reset, pause, isRunning } = useTimer({
    onExpire: handleTimeExpire,
    autoStart: true
  });

  /**
   * Ефект для збереження результатів при завершенні гри.
   * Автоматично додає результат у глобальний стан та відкриває модальне вікно.
   */
  useEffect(() => {
    if (isFinished && answersHistory.length > 0) {
      const correct = answersHistory.filter(a => a.isCorrect).length;
      const total = answersHistory.length;
      const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

      addResult({
        score,
        correct,
        total,
        percent,
        difficulty: settings.difficulty,
        userId: currentUserId
      });

      setShowGameOverModal(true);
    }
  }, [isFinished, answersHistory, score, addResult, currentUserId, settings.difficulty]);

  /**
   * Обробник вибору відповіді.
   * Блокує таймер та очищає запланований перехід.
   * 
   * @param {string} optionId - ID обраної відповіді
   */
  const handleAnswerSelect = (optionId: string) => {
    selectOption(optionId);
    pause();
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  /**
   * Обробник переходу до наступного питання.
   */
  const handleNext = () => {
    next();
  };

  /**
   * Обробник перезапуску поточної гри.
   */
  const handleRestart = () => {
    restart();
    setShowGameOverModal(false);
  };

  /**
   * Обробник початку нової гри.
   * Перенаправляє на головну сторінку для вибору налаштувань.
   */
  const handleNewGame = () => {
    setShowGameOverModal(false);
    navigate("/");
  };

  /**
   * Обробник збереження результатів.
   * Зберігає результати в sessionStorage та переходить на сторінку результатів.
   */
  const handleSaveResults = () => {
    sessionStorage.setItem('quizResults', JSON.stringify({
      score,
      answersHistory
    }));
    navigate('/results');
  };

  /**
   * Ефект для скидання таймера при зміні питання.
   */
  useEffect(() => {
    if (currentQuestion) {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      reset();
    }
  }, [currentQuestion, reset]);

  /**
   * Ефект для очищення таймера при розмонтуванні компонента.
   */
  useEffect(() => {
    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!currentQuestion || questions.length === 0) {
    return (
      <div className="page">
        <Header />
        <Card>
          <p>Завантаження питання...</p>
        </Card>
      </div>
    );
  }

  const progress = getProgress();
  const timerClass = `${styles.timer} ${timeLeft <= 3 ? styles.timerWarning : ''}`;

  return (
    <div className="page">
      <Header />
      <div className={styles.layout}>
        <div className={styles.info}>
          <ProgressInfo
            current={progress.current}
            total={progress.total}
          />
          <ScoreBoard score={score} />
          <div className={timerClass}>
            {timeLeft}c {!isRunning && '⏸️'}
          </div>
        </div>

        <Card className={styles.questionCard}>
          <Question text={currentQuestion.text} />

          <AnswerList
            answers={currentQuestion.options}
            selectedOptionId={selectedOptionId}
            correctOptionId={isAnswerLocked ? currentQuestion.correctOptionId : undefined}
            onAnswerSelect={handleAnswerSelect}
            disabled={isAnswerLocked}
          />

          <div className={styles.debug}>
            Дебаг: Питання {currentQuestion.id} ({progress.current}/{progress.total}) |
            Відповідей: {answersHistory.length} |
            Заблоковано: {isAnswerLocked.toString()} |
            Час: {timeLeft}c |
            Таймер активний: {isRunning.toString()} |
            Складність: {settings.difficulty}
          </div>
        </Card>

        <div className={styles.actions}>
          {isAnswerLocked && (
            <Button onClick={handleNext}>
              {progress.current === progress.total ? 'Завершити гру' : 'Наступне питання →'}
            </Button>
          )}
        </div>
      </div>

      <GameOverModal
        isOpen={showGameOverModal}
        onClose={() => setShowGameOverModal(false)}
        score={score}
        answersHistory={answersHistory}
        totalQuestions={questions.length}
        onRestart={handleRestart}
        onNewGame={handleNewGame}
        onSaveResults={handleSaveResults}
      />
    </div>
  );
};

export default GamePage;
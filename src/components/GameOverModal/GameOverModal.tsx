import React from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { useResults } from '../../hooks/useResults';
import type { AnswerHistory } from '../../types';

/**
 * Інтерфейс властивостей компонента GameOverModal.
 * Визначає всі необхідні параметри для відображення модального вікна завершення гри.
 * @interface GameOverModalProps
 */
interface GameOverModalProps {
  /** Чи відкрито модальне вікно */
  isOpen: boolean;
  /** Callback-функція для закриття модального вікна */
  onClose: () => void;
  /** Кількість балів, набраних користувачем */
  score: number;
  /** Історія відповідей користувача */
  answersHistory: AnswerHistory[];
  /** Загальна кількість питань у грі */
  totalQuestions: number;
  /** Callback для перезапуску поточної гри */
  onRestart: () => void;
  /** Callback для початку нової гри з іншими налаштуваннями */
  onNewGame: () => void;
  /** Callback для збереження результатів гри */
  onSaveResults: () => void;
}

/**
 * Модальне вікно, яке відображається після завершення гри.
 * Показує підсумкові результати, статистику та надає опції для подальших дій.
 * 
 * @component
 * @param {GameOverModalProps} props - Властивості компонента
 * @returns {JSX.Element} Модальне вікно з результатами гри
 * 
 * @example
 * // Базове використання
 * <GameOverModal
 *   isOpen={isGameOver}
 *   onClose={() => setIsGameOver(false)}
 *   score={85}
 *   answersHistory={answers}
 *   totalQuestions={20}
 *   onRestart={restartGame}
 *   onNewGame={startNewGame}
 *   onSaveResults={saveGameResults}
 * />
 * 
 * @remarks
 * Компонент використовує хук `useResults` для розрахунку статистики
 * та кастомний компонент `Modal` для відображення.
 * 
 * @see {@link useResults} для деталей розрахунку статистики
 * @see {@link Modal} для деталей реалізації модального вікна
 * @see {@link Button} для деталей реалізації кнопок
 */
const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  onClose,
  score,
  answersHistory,
  totalQuestions,
  onRestart,
  onNewGame,
  onSaveResults
}) => {
  /**
   * Використовує хук `useResults` для отримання підсумкової статистики гри.
   * @type {Object}
   * @property {number} total - Загальна кількість питань
   * @property {number} correct - Кількість правильних відповідей
   * @property {number} percent - Відсоток правильних відповідей
   */
  const { total, correct, percent } = useResults(answersHistory);

  /**
   * Повертає текстове повідомлення на основі результату гри.
   * Використовує відсоток правильних відповідей для визначення рівня успішності.
   * 
   * @returns {string} Мотивуюче повідомлення для користувача
   * @private
   */
  const getResultMessage = () => {
    if (percent >= 90) return "Вражаюче! Ти справжній експерт! 🏆";
    if (percent >= 70) return "Відмінно! Дуже добре знаєш тему! ⭐";
    if (percent >= 50) return "Добре! Але є куди рости! 👍";
    if (percent >= 30) return "Непогано! Продовжуй вчитися! 💪";
    return "Спробуй ще раз! Ти покращиш результат! 🔄";
  };

  /**
   * Повертає емодзі, яке відповідає рівню успішності гравця.
   * 
   * @returns {string} Емодзі для відображення поряд з заголовком
   * @private
   */
  const getResultEmoji = () => {
    if (percent >= 90) return "🏆";
    if (percent >= 70) return "⭐";
    if (percent >= 50) return "👍";
    if (percent >= 30) return "💪";
    return "🔄";
  };

  /**
   * Обробник для збереження результатів та закриття модального вікна.
   * Викликає `onSaveResults` для збереження даних, потім `onClose` для закриття модалки.
   * 
   * @function
   * @private
   */
  const handleSaveAndView = () => {
    onSaveResults();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Гра завершена! ${getResultEmoji()}`}>
      <div className="game-over-modal">
        <div className="result-summary">
          <div className="final-score">
            <span className="score-value">{score}</span>
            <span className="score-label">балів</span>
          </div>
          
          <div className="result-message">
            <p>{getResultMessage()}</p>
          </div>

          <div className="detailed-stats">
            <div className="stat-row">
              <span>Правильних відповідей:</span>
              <strong>{correct} / {total}</strong>
            </div>
            <div className="stat-row">
              <span>Успішність:</span>
              <strong>{percent}%</strong>
            </div>
            <div className="stat-row">
              <span>Загальна кількість питань:</span>
              <strong>{totalQuestions}</strong>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <Button onClick={onRestart} variant="primary">
            Грати знову
          </Button>
          <Button onClick={handleSaveAndView} variant="primary">
            Переглянути результати
          </Button>
          <Button onClick={onNewGame} variant="secondary">
            Нова гра
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GameOverModal;
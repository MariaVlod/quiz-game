import React from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { useResults } from '../../hooks/useResults';
import type { AnswerHistory } from '../../types';

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  answersHistory: AnswerHistory[];
  totalQuestions: number;
  onRestart: () => void;
  onNewGame: () => void;
  onSaveResults: () => void;
}

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
  const { total, correct, percent } = useResults(answersHistory);

  const getResultMessage = () => {
    if (percent >= 90) return "Вражаюче! Ти справжній експерт! 🏆";
    if (percent >= 70) return "Відмінно! Дуже добре знаєш тему! ⭐";
    if (percent >= 50) return "Добре! Але є куди рости! 👍";
    if (percent >= 30) return "Непогано! Продовжуй вчитися! 💪";
    return "Спробуй ще раз! Ти покращиш результат! 🔄";
  };

  const getResultEmoji = () => {
    if (percent >= 90) return "🏆";
    if (percent >= 70) return "⭐";
    if (percent >= 50) return "👍";
    if (percent >= 30) return "💪";
    return "🔄";
  };

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
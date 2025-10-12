import React from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { useResults } from '../../hooks/useResults';
import type { AnswerHistory } from '../../types';
import styles from './GameOverModal.module.css';

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  answersHistory: AnswerHistory[];
  onRestart: () => void;
  onNewGame: () => void;
  onSaveResults: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  onClose,
  score,
  answersHistory,
  onRestart,
  onNewGame,
  onSaveResults
}) => {
  const { total, correct, incorrect, skipped, percent } = useResults(answersHistory);

  const getResultMessage = () => {
    if (percent >= 90) return "Вражаюче! Ти справжній експерт! 🏆";
    if (percent >= 70) return "Відмінно! Дуже добре знаєш тему! ⭐";
    if (percent >= 50) return "Добре! Але є куди рости! 👍";
    if (percent >= 30) return "Непогано! Продовжуй вчитися! 💪";
    return "Спробуй ще раз! Ти покращиш результат! 🔄";
  };

  const handleSaveAndView = () => {
    onSaveResults();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Гра завершена!">
      <div className={styles.modal}>
        <div className={styles.summary}>
          <div className={styles.finalScore}>
            <span className={styles.scoreValue}>{score}</span>
            <span className={styles.scoreLabel}>балів</span>
          </div>
          
          <div className={styles.message}>
            <p>{getResultMessage()}</p>
          </div>

          <div className={styles.stats}>
            <div className={styles.statRow}>
              <span>Правильних відповідей:</span>
              <strong>{correct} / {total}</strong>
            </div>
            <div className={styles.statRow}>
              <span>Успішність:</span>
              <strong>{percent}%</strong>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
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
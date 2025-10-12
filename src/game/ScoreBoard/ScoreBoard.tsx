import React from 'react';
import styles from './ScoreBoard.module.css';

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className={styles.board}>
      <div className={styles.label}>Рахунок:</div>
      <div className={styles.value}>{score}</div>
    </div>
  );
};

export default ScoreBoard;
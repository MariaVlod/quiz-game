import React from 'react';
import type { GameResult } from '../../store/gameStore';
import styles from './ResultsTable.module.css';

interface ResultsTableProps {
  results: GameResult[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels: { [key: string]: string } = {
      easy: 'Легка',
      medium: 'Середня',
      hard: 'Складна',
      all: 'Всі'
    };
    return labels[difficulty] || difficulty;
  };

  if (results.length === 0) {
    return <p>Немає результатів для відображення</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Бали</th>
            <th>Правильних</th>
            <th>Всього</th>
            <th>Успішність</th>
            <th>Складність</th>
          </tr>
        </thead>
        <tbody>
          {results
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((result) => (
              <tr key={result.id}>
                <td>{formatDate(result.date)}</td>
                <td className={styles.scoreCell}>{result.score}</td>
                <td className={styles.correctCell}>{result.correct}</td>
                <td>{result.total}</td>
                <td className={styles.percentCell}>
                  <span className={result.percent >= 80 ? styles.high : result.percent >= 60 ? styles.medium : styles.low}>
                    {result.percent}%
                  </span>
                </td>
                <td>{getDifficultyLabel(result.difficulty)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
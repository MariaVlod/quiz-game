import React from 'react';
import type { GameResult } from '../../store/gameStore';
import styles from './ResultsTable.module.css';

/**
 * Інтерфейс властивостей компонента ResultsTable.
 * 
 * @interface ResultsTableProps
 */
export interface ResultsTableProps {
  /** Масив результатів ігор для відображення в таблиці */
  results: GameResult[];
}

/**
 * Компонент для відображення історії результатів ігор у вигляді таблиці.
 * Показує дату, бали, кількість правильних відповідей, загальну кількість питань,
 * відсоток успішності та складність для кожної гри.
 * 
 * @component
 * @param {ResultsTableProps} props - Властивості компонента
 * @returns {JSX.Element} Таблиця з результатами ігор
 * 
 * @example
 * // Базове використання
 * <ResultsTable results={gameResults} />
 * 
 * @example
 * // Використання з даними
 * const results = [
 *   {
 *     id: '123',
 *     score: 500,
 *     correct: 5,
 *     total: 10,
 *     percent: 50,
 *     date: '2024-01-15T10:30:00',
 *     difficulty: 'medium',
 *     userId: '1'
 *   }
 * ];
 * <ResultsTable results={results} />
 * 
 * @remarks
 * Компонент автоматично сортує результати за датою (від найновіших до найстаріших).
 * Відсоток успішності відображається з кольоровим маркуванням:
 * - Зелений (high): ≥80%
 * - Жовтий (medium): 60-79%
 * - Червоний (low): <60%
 */
const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  /**
   * Форматує дату у локальний формат для відображення.
   * 
   * @param {string} dateString - Рядок з датою в ISO форматі
   * @returns {string} Відформатована дата (дд.мм.рррр гг:хв)
   * 
   * @example
   * formatDate('2024-01-15T10:30:00') // Повертає '15.01.2024 10:30'
   * 
   * @private
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Перетворює код складності на читабельну назву українською мовою.
   * 
   * @param {string} difficulty - Код складності ('easy', 'medium', 'hard', 'all')
   * @returns {string} Локалізована назва складності
   * 
   * @example
   * getDifficultyLabel('easy')   // Повертає 'Легка'
   * getDifficultyLabel('hard')   // Повертає 'Складна'
   * getDifficultyLabel('custom') // Повертає 'custom' (якщо немає відповідності)
   * 
   * @private
   */
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
    return <p className={styles.emptyMessage}>Немає результатів для відображення</p>;
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
                  <span 
                    className={
                      result.percent >= 80 
                        ? styles.high 
                        : result.percent >= 60 
                          ? styles.medium 
                          : styles.low
                    }
                  >
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
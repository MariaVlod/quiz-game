import React, { useState } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import Card from '../components/Card'
import { useQuizData } from '../hooks/useQuizData'
import type { QuizFilterOptions } from '../types'

interface StartPageProps {
  onStart: (questions: any[]) => void
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  const [filters, setFilters] = useState<QuizFilterOptions>({
    category: 'movies',
    count: 5,
    difficulty: 'all' // Змінимо на 'all' за замовчуванням
  })

  const { questions, loading, error, reload } = useQuizData(filters)

  const handleStart = () => {
    if (questions.length > 0) {
      console.log('Початок гри з питаннями:', {
        кількість: questions.length,
        складності: questions.map(q => q.difficulty),
        фільтри: filters
      });
      onStart(questions)
    }
  }

  const handleFilterChange = (key: keyof QuizFilterOptions, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    reload(newFilters);
  }

  return (
    <div className="page start-page">
      <Header />
      
      <Card className="start-page__card">
        <div className="start-page__content">
          <h2>Ласкаво просимо!</h2>
          
          {/* Фільтри */}
          <div className="filters">
            <div className="filter-group">
              <label>Кількість запитань:</label>
              <select 
                value={filters.count} 
                onChange={(e) => handleFilterChange('count', parseInt(e.target.value))}
              >
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Складність:</label>
              <select 
                value={filters.difficulty} 
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              >
                <option value="all">Всі</option>
                <option value="easy">Легка</option>
                <option value="medium">Середня</option>
                <option value="hard">Складна</option>
              </select>
            </div>
          </div>

          {/* Інформація про фільтри */}
          {!loading && questions.length > 0 && (
            <div className="filter-info">
              <p>
                Знайдено питань: <strong>{questions.length}</strong>
                {filters.difficulty !== 'all' && (
                  <span> (фільтр: {getDifficultyLabel(filters.difficulty!)})</span>
                )}
              </p>
              {filters.difficulty !== 'all' && (
                <div className="difficulty-stats">
                  {countByDifficulty(questions).map(stat => (
                    <span key={stat.difficulty} className={`difficulty-badge difficulty-${stat.difficulty}`}>
                      {stat.count} {getDifficultyLabel(stat.difficulty)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="rules">
            <h3>Правила гри:</h3>
            <ul>
              <li>Відповідайте на запитання про фільми</li>
              <li>Оберіть правильну відповідь з декількох варіантів</li>
              <li>Наберіть якомога більше балів</li>
              <li>На кожне питання - 10 секунд!</li>
              <li>{filters.count} запитань - {filters.count} можливостей перевірити себе!</li>
            </ul>
          </div>

          {/* Стани завантаження та помилок */}
          {loading && (
            <div className="loading-state">
              <p>Завантаження питань...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>Помилка: {error.message}</p>
              <Button onClick={() => reload(filters)}>
                Спробувати знову
              </Button>
            </div>
          )}

          {!loading && !error && questions.length === 0 && (
            <div className="empty-state">
              <p>Не знайдено питань за обраними критеріями</p>
              <Button onClick={() => reload(filters)}>
                Оновити
              </Button>
            </div>
          )}
          
          <Button 
            onClick={handleStart}
            disabled={loading || questions.length === 0}
          >
            {loading ? 'Завантаження...' : 'Почати гру'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

// Допоміжні функції
function getDifficultyLabel(difficulty: string): string {
  const labels: { [key: string]: string } = {
    easy: 'Легкі',
    medium: 'Середні',
    hard: 'Складні',
    all: 'Всі'
  };
  return labels[difficulty] || difficulty;
}

function countByDifficulty(questions: any[]): Array<{difficulty: string, count: number}> {
  const counts: { [key: string]: number } = {};
  questions.forEach(q => {
    counts[q.difficulty] = (counts[q.difficulty] || 0) + 1;
  });
  return Object.entries(counts).map(([difficulty, count]) => ({ difficulty, count }));
}

export default StartPage
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
    difficulty: 'easy'
  })

  const { questions, loading, error, reload } = useQuizData(filters)

  const handleStart = () => {
    if (questions.length > 0) {
      onStart(questions)
    }
  }

  const handleFilterChange = (key: keyof QuizFilterOptions, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    reload({ ...filters, [key]: value })
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
                <option value="easy">Легка</option>
                <option value="medium">Середня</option>
                <option value="hard">Складна</option>
              </select>
            </div>
          </div>

          <div className="rules">
            <h3>Правила гри:</h3>
            <ul>
              <li>Відповідайте на запитання про фільми</li>
              <li>Оберіть правильну відповідь з декількох варіантів</li>
              <li>Наберіть якомога більше балів</li>
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

export default StartPage
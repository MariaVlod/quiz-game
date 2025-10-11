import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import SettingsForm from '../components/SettingsForm';
import Modal from '../components/Modal';
import { useQuizData } from '../hooks/useQuizData';
import { useGameSettings } from '../context/GameSettingsContext';
import type { GameSettings } from '../types';

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useGameSettings();
  const { questions, loading, error, reload } = useQuizData();
  const [showSettings, setShowSettings] = useState(false);

  const handleStart = () => {
    if (questions.length > 0) {
      // Зберігаємо питання в sessionStorage для GamePage
      sessionStorage.setItem('quizQuestions', JSON.stringify(questions));
      navigate('/game');
    }
  };

  const handleSettingsSubmit = (newSettings: GameSettings) => {
    updateSettings(newSettings);
    setShowSettings(false);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleUserProfile = () => {
    navigate('/user/1'); // Можна зробити динамічний ID
  };

  return (
    <div className="page start-page">
      <Header />
      
      <Card className="start-page__card">
        <div className="start-page__content">
          <h2>Ласкаво просимо до Кіно-Вікторини! 🎬</h2>

          <div className="current-settings">
            <h4>Поточні налаштування:</h4>
            <div className="settings-preview">
              <span>Питань: <strong>{settings.count}</strong></span>
              <span>Складність: <strong>{getDifficultyLabel(settings.difficulty)}</strong></span>
              <span>Час: <strong>{settings.timerDuration}с</strong></span>
            </div>
          </div>

          <div className="rules">
            <h3>Правила гри:</h3>
            <ul>
              <li>Відповідайте на запитання про фільми</li>
              <li>Оберіть правильну відповідь з декількох варіантів</li>
              <li>На кожне питання - {settings.timerDuration} секунд!</li>
              <li>Наберіть якомога більше балів</li>
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
              <Button onClick={() => reload()}>
                Спробувати знову
              </Button>
            </div>
          )}

          {!loading && !error && questions.length === 0 && (
            <div className="empty-state">
              <p>Не знайдено питань за обраними критеріями</p>
              <Button onClick={() => reload()}>
                Оновити
              </Button>
            </div>
          )}

          <div className="start-actions">
            <Button onClick={handleShowSettings} variant="secondary">
              ⚙️ Налаштування
            </Button>
            
            <Button 
              onClick={handleStart} 
              disabled={loading || questions.length === 0}
            >
              {loading ? 'Завантаження...' : '🎮 Почати гру'}
            </Button>

            <Button onClick={handleUserProfile} variant="secondary">
              👤 Профіль
            </Button>
          </div>
        </div>
      </Card>

      <Modal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
        title="Налаштування гри"
      >
        <SettingsForm
          initialSettings={settings}
          onSubmit={handleSettingsSubmit}
          onCancel={() => setShowSettings(false)}
        />
      </Modal>
    </div>
  );
};

// Допоміжні функції
function getDifficultyLabel(difficulty: string): string {
  const labels: { [key: string]: string } = {
    easy: 'Легка',
    medium: 'Середня',
    hard: 'Складна',
    all: 'Всі'
  };
  return labels[difficulty] || difficulty;
}

export default StartPage;
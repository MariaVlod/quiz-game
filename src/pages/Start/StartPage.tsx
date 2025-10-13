import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import SettingsForm from '../../components/SettingsForm/SettingsForm';
import Modal from '../../components/Modal/Modal';
import { useQuizData } from '../../hooks/useQuizData';
import { useGameStore } from '../../store/gameStore';
import type { GameSettings } from '../../types';
import styles from './StartPage.module.css';

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings } = useGameStore();
  const { questions, loading, error, reload } = useQuizData();
  const [showSettings, setShowSettings] = useState(false);

  const handleStart = () => {
    if (questions.length > 0) {
      sessionStorage.setItem('quizQuestions', JSON.stringify(questions));
      navigate('/game');
    }
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleUserProfile = () => {
    const userId = useGameStore.getState().currentUserId;
    navigate(`/user/${userId}`);
  };

  return (
    <div className="page">
      <Header />

      <Card size="large" className={styles.card}>
        <div className={styles.content}>
          <h2>Ласкаво просимо до Кіно-Вікторини!</h2>

          <div className={styles.currentSettings}>
            <h4>Поточні налаштування:</h4>
            <div className={styles.settingsPreview}>
              <span>Питань: <strong>{settings.count}</strong></span>
              <span>Складність: <strong>{getDifficultyLabel(settings.difficulty)}</strong></span>
              <span>Час: <strong>{settings.timerDuration}с</strong></span>
            </div>
          </div>

          <div className={styles.rules}>
            <h3>Правила гри:</h3>
            <ul>
              <li>Відповідайте на запитання про фільми</li>
              <li>Оберіть правильну відповідь з декількох варіантів</li>
              <li>На кожне питання - {settings.timerDuration} секунд!</li>
              <li>Наберіть якомога більше балів</li>
            </ul>
          </div>

          {loading && (
            <div className={styles.loadingState}>
              <p>Завантаження питань...</p>
            </div>
          )}

          {error && (
            <div className={styles.errorState}>
              <p>Помилка: {error.message}</p>
              <Button onClick={() => reload()}>
                Спробувати знову
              </Button>
            </div>
          )}

          {!loading && !error && questions.length === 0 && (
            <div className={styles.emptyState}>
              <p>Не знайдено питань за обраними критеріями</p>
              <Button onClick={() => reload()}>
                Оновити
              </Button>
            </div>
          )}

          <div className={styles.actions}>
            <Button onClick={handleShowSettings} variant="secondary">
              Налаштування
            </Button>

            <Button
              onClick={handleStart}
              disabled={loading || questions.length === 0}
            >
              {loading ? 'Завантаження...' : 'Почати гру'}
            </Button>

            <Button onClick={handleUserProfile} variant="secondary">
              Профіль
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Налаштування гри"
      >
        <SettingsForm onCancel={() => setShowSettings(false)} />
      </Modal>
    </div>
  );
};

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
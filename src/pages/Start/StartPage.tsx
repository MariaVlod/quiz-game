import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import SettingsForm from '../../components/SettingsForm/SettingsForm';
import Modal from '../../components/Modal/Modal';
import { useQuizData } from '../../hooks/useQuizData';
import { useGameStore } from '../../store/gameStore';
import styles from './StartPage.module.css';

/**
 * Головна сторінка додатку - сторінка старту гри.
 * Відображає вітальне повідомлення, поточні налаштування, правила гри
 * та основні дії: початок гри, налаштування, профіль.
 * 
 * @component
 * @returns {JSX.Element} Стартова сторінка з налаштуваннями та кнопками дій
 * 
 * @example
 * // Використання в маршрутизаторі
 * <Route path="/" element={<StartPage />} />
 * 
 * @remarks
 * Компонент є вхідною точкою гри. Тут відбувається:
 * - Завантаження питань через хук `useQuizData`
 * - Відображення поточних налаштувань з глобального стану
 * - Управління модальним вікном налаштувань
 * - Навігація до сторінки гри або профілю
 * 
 * @see {@link useQuizData} для завантаження питань
 * @see {@link useGameStore} для роботи з налаштуваннями
 * @see {@link SettingsForm} для форми налаштувань
 * @see {@link Modal} для модального вікна
 */
const StartPage: React.FC = () => {
  const navigate = useNavigate();
  
  /**
   * Отримує налаштування гри з глобального стану.
   * @type {GameSettings}
   */
  const { settings } = useGameStore();
  
  /**
   * Хук для завантаження питань на основі поточних налаштувань.
   * @type {Object}
   * @property {Question[]} questions - Масив завантажених питань
   * @property {boolean} loading - Стан завантаження
   * @property {Error | null} error - Помилка завантаження (якщо є)
   * @property {Function} reload - Функція повторного завантаження
   */
  const { questions, loading, error, reload } = useQuizData();
  
  /**
   * Стан видимості модального вікна з налаштуваннями.
   * @type {boolean}
   */
  const [showSettings, setShowSettings] = useState(false);

  /**
   * Обробник початку гри.
   * Зберігає питання в sessionStorage та перенаправляє на сторінку гри.
   * 
   * @function
   * @private
   */
  const handleStart = () => {
    if (questions.length > 0) {
      sessionStorage.setItem('quizQuestions', JSON.stringify(questions));
      navigate('/game');
    }
  };

  /**
   * Обробник відкриття модального вікна налаштувань.
   */
  const handleShowSettings = () => {
    setShowSettings(true);
  };

  /**
   * Обробник переходу на сторінку профілю користувача.
   * Отримує поточний ID користувача з глобального стану.
   */
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

/**
 * Перетворює код складності на читабельний текст для інтерфейсу.
 * 
 * @function
 * @param {string} difficulty - Код складності ('easy', 'medium', 'hard', 'all')
 * @returns {string} Локалізована назва складності
 * 
 * @example
 * getDifficultyLabel('easy') // Повертає 'Легка'
 * getDifficultyLabel('hard') // Повертає 'Складна'
 * getDifficultyLabel('all')  // Повертає 'Всі'
 * 
 * @private
 */
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
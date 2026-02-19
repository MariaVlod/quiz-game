import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './Header.module.css';

/**
 * Головний компонент шапки додатку.
 * Містить навігацію по головних сторінках додатку та заголовок гри.
 * 
 * @component
 * @returns {JSX.Element} Компонент шапки додатку
 * 
 * @example
 * // Базове використання
 * function App() {
 *   return (
 *     <div className="app">
 *       <Header />
 *       <main>{/* контент додатку *\/}</main>
 *     </div>
 *   );
 * }
 * 
 * @remarks
 * Компонент використовує `react-router-dom` для маршрутизації та підсвічування активної сторінки.
 * Поточний користувач отримується з `sessionStorage`.
 * 
 * @see {@link Button} для деталей реалізації кнопок навігації
 * @see {@link Link} з react-router-dom для клікабельної навігації
 */
const Header: React.FC = () => {
  /**
   * Хук для отримання поточного шляху (URL).
   * Використовується для підсвічування активної сторінки в навігації.
   * @type {Location}
   */
  const location = useLocation();

  /**
   * Формує шлях до профілю поточного користувача.
   * Отримує ID користувача з sessionStorage або використовує значення за замовчуванням.
   * 
   * @function
   * @returns {string} URL шлях до профілю користувача
   * 
   * @example
   * // Якщо в sessionStorage є 'currentUserId' = '5'
   * handleUserProfile(); // Поверне '/user/5'
   * 
   * // Якщо sessionStorage порожній
   * handleUserProfile(); // Поверне '/user/1' (значення за замовчуванням)
   * 
   * @private
   */
  const handleUserProfile = () => {
    const userId = sessionStorage.getItem('currentUserId') || '1';
    return `/user/${userId}`;
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Кіно-Вікторина</h1>
          <p className={styles.subtitle}>Перевір свої знання про фільми!</p>
        </div>
        
        <nav className={styles.navigation}>
          {/* Посилання на головну сторінку */}
          <Link to="/">
            <Button 
              variant={location.pathname === '/' ? 'primary' : 'secondary'}
            >
              Головна
            </Button>
          </Link>
          
          {/* Посилання на профіль користувача */}
          <Link to={handleUserProfile()}>
            <Button 
              variant={location.pathname.startsWith('/user') ? 'primary' : 'secondary'}
            >
              Профіль
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
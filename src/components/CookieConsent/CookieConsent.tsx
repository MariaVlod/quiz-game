import React, { useState, useEffect, useId, useCallback } from 'react';
import styles from './CookieConsent.module.css';
import Button from '../Button/Button';
import Card from '../Card/Card';

interface CookieConsentProps {
  /** Примусово показати модалку (для тестування) */
  forceShow?: boolean;
  /** Початкові налаштування (для тестування) */
  initialSettings?: {
    necessary: boolean;
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  /** Читати з localStorage (за замовчуванням true) */
  useLocalStorage?: boolean;
}

/**
 * Компонент для відображення банера згоди на використання файлів cookie.
 * Підтримує налаштування різних категорій (функціональні, аналітичні, маркетингові тощо).
 * Автоматично зберігає налаштування в localStorage та відновлює їх при наступному відвідуванні.
 * Надає інтерфейс для детального управління cookie-налаштуваннями та кнопки швидких дій.
 */
export const CookieConsent: React.FC<CookieConsentProps> = ({
  forceShow = false,
  initialSettings,
  useLocalStorage = true
}) => {
  /**
   * Стан для контролю видимості модального вікна з налаштуваннями cookies.
   * @default false - компонент спочатку не видимий
   */
  const [isVisible, setIsVisible] = useState(forceShow);

  /**
   * Об'єкт налаштувань для різних категорій cookies.
   * @property {boolean} necessary - Необхідні cookies (завжди активні, не можуть бути відключені)
   * @property {boolean} functional - Функціональні cookies (зберігають налаштування гри)
   * @property {boolean} analytics - Аналітичні cookies (збирають анонімні дані для покращення)
   * @property {boolean} marketing - Маркетингові cookies (використовуються для персоналізованої реклами)
   */
  const [settings, setSettings] = useState(() => {
    // Якщо передані початкові налаштування - використовуємо їх
    if (initialSettings) {
      return initialSettings;
    }
    
    // За замовчуванням - тільки необхідні cookies
    return {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    };
  });

  /**
   * Генерує унікальний ID для компонента, використовується для зв'язки input/label.
   * @returns {string} Унікальний ідентифікатор
   */
  const id = useId();

  /**
   * Застосовує налаштування cookies, імітуючи ініціалізацію відповідних сервісів.
   * @param {typeof settings} consentSettings - Об'єкт з налаштуваннями cookies
   */
  const applyCookieSettings = useCallback((consentSettings: typeof settings) => {
    if (consentSettings.analytics) {
      console.log('Analytics cookies enabled');
    }
    if (consentSettings.marketing) {
      console.log('Marketing cookies enabled');
    }
  }, []);

  /**
   * Ефект, який перевіряє наявність збережених налаштувань cookies при завантаженні компонента.
   * Якщо налаштування не знайдено - показує банер згоди.
   */
  useEffect(() => {
    // Якщо вимкнено localStorage або передані початкові налаштування - пропускаємо
    if (!useLocalStorage || initialSettings) {
      return;
    }

    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      try {
        const savedSettings = JSON.parse(consent);
        setSettings(savedSettings);
        applyCookieSettings(savedSettings);
      } catch (e) {
        console.error('Помилка при зчитуванні cookies:', e);
        setIsVisible(true);
      }
    }
  }, [useLocalStorage, initialSettings, applyCookieSettings]);

  /**
   * Зберігає налаштування cookies в localStorage, застосовує їх та приховує модальне вікно.
   * @param {typeof settings} newSettings - Нові налаштування для збереження
   */
  const saveSettings = useCallback((newSettings: typeof settings) => {
    if (useLocalStorage) {
      localStorage.setItem('cookie-consent', JSON.stringify(newSettings));
    }
    setSettings(newSettings);
    applyCookieSettings(newSettings);
    setIsVisible(false);
  }, [applyCookieSettings, useLocalStorage]);

  /**
   * Обробник для прийняття всіх типів cookies.
   * Вмикає всі категорії крім обов'язкових (які завжди ввімкнені).
   */
  const handleAcceptAll = useCallback(() => {
    saveSettings({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    });
  }, [saveSettings]);

  /**
   * Обробник для прийняття лише обраних користувачем cookies.
   * Зберігає поточні налаштування, гарантуючи, що необхідні cookies залишаться ввімкненими.
   */
  const handleAcceptSelected = useCallback(() => {
    saveSettings({
      ...settings,
      necessary: true
    });
  }, [saveSettings, settings]);

  /**
   * Обробник для відхилення всіх необов'язкових cookies.
   * Залишає активними лише необхідні cookies для функціонування сайту.
   */
  const handleRejectAll = useCallback(() => {
    saveSettings({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    });
  }, [saveSettings]);

  /**
   * Перемикач для окремих категорій cookies.
   * @param {keyof typeof settings} type - Тип cookies для перемикання
   * @throws Не дозволяє змінювати стан необхідних cookies
   */
  const handleToggle = useCallback((type: keyof typeof settings) => {
    if (type === 'necessary') return;
    setSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  }, []);

  /**
   * Обробник для повторного відкриття модального вікна управління cookies.
   * Використовується кнопкою в вигляді іконки cookie, коли основне вікно приховане.
   */
  const handleManageCookies = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Якщо примусово показати - показуємо модалку
  useEffect(() => {
    if (forceShow) {
      setIsVisible(true);
    }
  }, [forceShow]);

  if (!isVisible) {
    // Перевіряємо, чи є хоча б одне налаштування крім необхідних
    const hasAnySettings = settings.functional || settings.analytics || settings.marketing;
    
    // Показуємо кнопку управління тільки якщо є налаштування
    if (hasAnySettings || !useLocalStorage) {
      return (
        <button
          className={styles.manageButton}
          onClick={handleManageCookies}
          aria-label="Налаштування cookies"
          title="Налаштування cookies"
        >
          🍪
        </button>
      );
    }
    
    // Якщо ніяких налаштувань немає - не показуємо нічого
    return null;
  }

  return (
    <div className={styles.overlay}>
      <Card className={styles.modal}>
        <div className={styles.content}>
          <h2>🍪 Налаштування cookies</h2>
          
          <div className={styles.description}>
            <p>Ми використовуємо cookies для покращення вашого досвіду.
            Будь ласка, оберіть, які cookies ви дозволяєте.</p>
          </div>

          <div className={styles.cookieTypes}>
            <div className={`${styles.cookieType} ${styles.necessary}`}>
              <div className={styles.cookieHeader}>
                <h3>Необхідні cookies</h3>
                <div className={styles.required}>Обов'язкові</div>
              </div>
              <p>Необхідні для роботи гри. Не можуть бути відключені.</p>
              <div className={styles.toggle}>
                <input
                  id={`${id}-necessary`}
                  type="checkbox"
                  checked={settings.necessary}
                  disabled
                  onChange={() => {}}
                />
                <label htmlFor={`${id}-necessary`}>Завжди ввімкнено</label>
              </div>
            </div>

            <div className={styles.cookieType}>
              <div className={styles.cookieHeader}>
                <h3>Функціональні cookies</h3>
              </div>
              <p>Зберігають ваші налаштування гри та результати.</p>
              <div className={styles.toggle}>
                <input
                  id={`${id}-functional`}
                  type="checkbox"
                  checked={settings.functional}
                  onChange={() => handleToggle('functional')}
                />
                <label htmlFor={`${id}-functional`}>
                  {settings.functional ? 'Ввімкнено' : 'Вимкнено'}
                </label>
              </div>
            </div>

            <div className={styles.cookieType}>
              <div className={styles.cookieHeader}>
                <h3>Аналітичні cookies</h3>
              </div>
              <p>Допомагають нам покращувати гру, збираючи анонімні дані.</p>
              <div className={styles.toggle}>
                <input
                  id={`${id}-analytics`}
                  type="checkbox"
                  checked={settings.analytics}
                  onChange={() => handleToggle('analytics')}
                />
                <label htmlFor={`${id}-analytics`}>
                  {settings.analytics ? 'Ввімкнено' : 'Вимкнено'}
                </label>
              </div>
            </div>

            <div className={styles.cookieType}>
              <div className={styles.cookieHeader}>
                <h3>Маркетингові cookies</h3>
              </div>
              <p>Використовуються для показу реклами.</p>
              <div className={styles.toggle}>
                <input
                  id={`${id}-marketing`}
                  type="checkbox"
                  checked={settings.marketing}
                  onChange={() => handleToggle('marketing')}
                />
                <label htmlFor={`${id}-marketing`}>
                  {settings.marketing ? 'Ввімкнено' : 'Вимкнено'}
                </label>
              </div>
            </div>
          </div>

          <div className={styles.buttons}>
            <Button onClick={handleRejectAll} variant="primary">
              Відхилити всі
            </Button>
            <Button onClick={handleAcceptSelected} variant="primary">
              Прийняти обрані
            </Button>
            <Button onClick={handleAcceptAll} variant="primary">
              Прийняти всі
            </Button>
          </div>

          <div className={styles.privacyLink}>
            <a href="/PRIVACY_POLICY.md" target="_blank" rel="noopener noreferrer">
              Політика конфіденційності
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;
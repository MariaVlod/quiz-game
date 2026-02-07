import React, { useState, useEffect, useId, useCallback } from 'react';
import styles from './CookieConsent.module.css';
import Button from '../Button/Button';
import Card from '../Card/Card';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [settings, setSettings] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false
  });

  const id = useId();

  const applyCookieSettings = useCallback((consentSettings: typeof settings) => {
    if (consentSettings.analytics) {
      console.log('Analytics cookies enabled');
    }
    if (consentSettings.marketing) {
      console.log('Marketing cookies enabled');
    }
  }, []);

  useEffect(() => {
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
  }, [applyCookieSettings]);

  const saveSettings = useCallback((newSettings: typeof settings) => {
    localStorage.setItem('cookie-consent', JSON.stringify(newSettings));
    setSettings(newSettings);
    applyCookieSettings(newSettings);
    setIsVisible(false);
  }, [applyCookieSettings]);

  const handleAcceptAll = useCallback(() => {
    saveSettings({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    });
  }, [saveSettings]);

  const handleAcceptSelected = useCallback(() => {
    saveSettings({
      ...settings,
      necessary: true
    });
  }, [saveSettings, settings]);

  const handleRejectAll = useCallback(() => {
    saveSettings({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    });
  }, [saveSettings]);

  const handleToggle = useCallback((type: keyof typeof settings) => {
    if (type === 'necessary') return;
    setSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  }, []);

  const handleManageCookies = useCallback(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) {
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
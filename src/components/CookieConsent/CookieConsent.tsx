import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      const savedSettings = JSON.parse(consent);
      setSettings(savedSettings);
      applyCookieSettings(savedSettings);
    }
  }, []);

  const applyCookieSettings = (consentSettings: typeof settings) => {
    // Apply analytics cookies if consented
    if (consentSettings.analytics) {
      // Initialize analytics (mock implementation)
      console.log('Analytics cookies enabled');
    }
    
    // Apply marketing cookies if consented
    if (consentSettings.marketing) {
      console.log('Marketing cookies enabled');
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setSettings(allAccepted);
    applyCookieSettings(allAccepted);
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    const newSettings = {
      ...settings,
      necessary: true // Always required
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(newSettings));
    applyCookieSettings(newSettings);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true, // Cannot be rejected
      functional: false,
      analytics: false,
      marketing: false
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary));
    setSettings(onlyNecessary);
    applyCookieSettings(onlyNecessary);
    setIsVisible(false);
  };

  const handleToggle = (type: keyof typeof settings) => {
    if (type === 'necessary') return; // Cannot toggle necessary cookies
    setSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleManageCookies = () => {
    setIsVisible(true);
  };

  if (!isVisible) {
    // Show small cookie icon for managing cookies
    return (
      <div className={styles.manageButton} onClick={handleManageCookies}>
        🍪
      </div>
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
                  type="checkbox"
                  checked={settings.necessary}
                  disabled
                  onChange={() => {}}
                />
                <label>Завжди ввімкнено</label>
              </div>
            </div>

            <div className={styles.cookieType}>
              <div className={styles.cookieHeader}>
                <h3>Функціональні cookies</h3>
              </div>
              <p>Зберігають ваші налаштування гри та результати.</p>
              <div className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.functional}
                  onChange={() => handleToggle('functional')}
                />
                <label>{settings.functional ? 'Ввімкнено' : 'Вимкнено'}</label>
              </div>
            </div>

            <div className={styles.cookieType}>
              <div className={styles.cookieHeader}>
                <h3>Аналітичні cookies</h3>
              </div>
              <p>Допомагають нам покращувати гру, збираючи анонімні дані про використання.</p>
              <div className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.analytics}
                  onChange={() => handleToggle('analytics')}
                />
                <label>{settings.analytics ? 'Ввімкнено' : 'Вимкнено'}</label>
              </div>
            </div>

            <div className={styles.cookieType}>
              <div className={styles.cookieHeader}>
                <h3>Маркетингові cookies</h3>
              </div>
              <p>Використовуються для показу реклами (поки не використовуються).</p>
              <div className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={settings.marketing}
                  onChange={() => handleToggle('marketing')}
                />
                <label>{settings.marketing ? 'Ввімкнено' : 'Вимкнено'}</label>
              </div>
            </div>
          </div>

          <div className={styles.buttons}>
            <Button onClick={handleRejectAll} variant="secondary">
              Відхилити всі
            </Button>
            <Button onClick={handleAcceptSelected} variant="secondary">
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
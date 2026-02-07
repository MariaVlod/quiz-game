import type { Meta, StoryObj } from '@storybook/react-vite';
import CookieConsent from './CookieConsent';
import './CookieConsent.module.css';

const meta: Meta<typeof CookieConsent> = {
  title: 'Components/CookieConsent',
  component: CookieConsent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Комплексний GDPR cookie consent компонент з управлінням налаштуваннями, локальним зберіганням та інтерактивними елементами.',
      },
    },
  },
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof CookieConsent>;




const clearLocalStorage = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('cookie-consent');
  }
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Стандартний вигляд cookie consent popup при першому відвідуванні сайту.',
      },
    },
  },
  decorators: [
    (Story) => {
      clearLocalStorage();
      return <Story />;
    },
  ],
};

export const WithSavedPreferences: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Cookie consent з уже збереженими налаштуваннями користувача (функціональні та аналітичні cookies прийняті).',
      },
    },
  },
  decorators: [
    (Story) => {
      clearLocalStorage();
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          'cookie-consent',
          JSON.stringify({
            necessary: true,
            functional: true,
            analytics: true,
            marketing: false,
          })
        );
      }
      return <Story />;
    },
  ],
};

export const MinimalPreferences: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Користувач прийняв тільки необхідні cookies, відмовившись від всіх інших.',
      },
    },
  },
  decorators: [
    (Story) => {
      clearLocalStorage();
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          'cookie-consent',
          JSON.stringify({
            necessary: true,
            functional: false,
            analytics: false,
            marketing: false,
          })
        );
      }
      return <Story />;
    },
  ],
};

export const ManageButtonOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Компактна кнопка управління cookies, яка з\'являється після прийняття налаштувань.',
      },
    },
  },
  decorators: [
    (Story) => {
      clearLocalStorage();
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          'cookie-consent',
          JSON.stringify({
            necessary: true,
            functional: true,
            analytics: false,
            marketing: false,
          })
        );
      }
      
      return (
        <div style={{ 
          minHeight: '400px', 
          background: '#f8f9fa',
          padding: '20px',
          position: 'relative'
        }}>
          <h3>Сторінка гри</h3>
          <p>Користувач уже прийняв cookies, тепер відображається тільки кнопка управління 🍪</p>
          <Story />
        </div>
      );
    },
  ],
};

export const MobileView: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Адаптивний вигляд cookie consent popup на мобільних пристроях.',
      },
    },
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
  decorators: [
    (Story) => {
      clearLocalStorage();
      return (
        <div style={{ 
          minHeight: '600px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
          <Story />
        </div>
      );
    },
  ],
};

export const InteractiveDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Інтерактивна демонстрація роботи компонента з можливістю перемикати налаштування та бачити результат.',
      },
    },
  },
  decorators: [
    (Story) => {
      clearLocalStorage();
      
      return (
        <div>
          <div style={{ 
            padding: '20px', 
            background: '#f0f4ff',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <h3>Інтерактивна демонстрація</h3>
          </div>
          <Story />
        </div>
      );
    },
  ],
};


export const ComponentArchitecture = {
  parameters: {
    docs: {
      description: {
        story: `
## Архітектура компонента CookieConsent

### Структура компонента:
\`\`\`
CookieConsent/
├── CookieConsent.tsx          # Основний компонент
├── CookieConsent.module.css   # Стилі
└── CookieConsent.stories.tsx  # Storybook stories
\`\`\`

### Ключові особливості:

#### 1. Управління станом
- **Локальний стан**: useState для visibility та settings
- **Локальне зберігання**: localStorage для збереження налаштувань
- **Ефекти**: useEffect для завантаження збережених налаштувань

#### 2. GDPR Compliance
- **Обов'язкові cookies**: Не можуть бути відключені
- **Вибіркове прийняття**: Користувач обирає кожен тип окремо
- **Прозорість**: Чіткий опис кожного типу cookies

#### 3. Інтерактивні елементи
- **Toggle switches**: Для кожного типу cookies
- **Кнопки дій**: Прийняти/відхилити/прийняти обрані
- **Іконка управління**: Компактна 🍪 для повторного відкриття

#### 4. UX/UI
- **Overlay**: Напівпрозорий фон для фокусування уваги
- **Card компонент**: Використання готового UI компонента
- **Адаптивність**: Працює на мобільних та десктопах
- **Анімації**: Плавні переходи та hover-ефекти

### Технічні деталі:
\`\`\`typescript
// Тип налаштувань
interface CookieSettings {
  necessary: boolean;    // Завжди true, не можна відключити
  functional: boolean;   // Для збереження налаштувань гри
  analytics: boolean;    // Для аналітики використання
  marketing: boolean;    // Для маркетингу (поки не використовується)
}

// Ключі в localStorage
const STORAGE_KEY = 'cookie-consent';

// Життєвий цикл компонента
1. Mount → перевірка localStorage
2. Немає збережених налаштувань → показати popup
3. Є збережені налаштування → застосувати їх
4. Користувач робить вибір → зберегти в localStorage
5. Приховування popup → показ іконки управління
\`\`\`

### Переваги архітектури:
-  **Ізоляція**: Незалежний компонент, не залежить від інших частин додатку
-  **Перевикористання**: Може бути використаний в будь-якому React додатку
-  **Тестованість**: Легко тестувати через Storybook
-  **Масштабованість**: Легко додати нові типи cookies
-  **Доступність**: Відповідає стандартам доступності (a11y)
`,
      },
    },
  },
};
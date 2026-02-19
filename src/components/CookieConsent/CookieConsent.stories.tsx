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
    forceShow: {
      control: 'boolean',
      description: 'Примусово показати модалку (для тестування)',
    },
    useLocalStorage: {
      control: 'boolean',
      description: 'Читати/зберігати налаштування в localStorage',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CookieConsent>;

// Загальний декоратор для всіх stories
const CommonDecorator = (Story: any) => {
  return (
    <div style={{ 
      minHeight: '600px', 
      background: '#f8f9fa',
      position: 'relative'
    }}>
      <Story />
    </div>
  );
};

export const Default: Story = {
  name: 'Default (перший візит)',
  parameters: {
    docs: {
      description: {
        story: 'Стандартний вигляд при першому відвідуванні сайту. Показується модалка з тільки обов\'язковими cookies.',
      },
    },
  },
  decorators: [CommonDecorator],
  args: {
    forceShow: true,
    useLocalStorage: false,
  },
};

export const WithSavedPreferences: Story = {
  name: 'Збережені налаштування (частково)',
  parameters: {
    docs: {
      description: {
        story: 'Користувач вже прийняв функціональні та аналітичні cookies. Показується тільки кнопка управління 🍪.',
      },
    },
  },
  decorators: [CommonDecorator],
  args: {
    forceShow: false,
    useLocalStorage: false,
    initialSettings: {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: false
    }
  },
};

export const MinimalPreferences: Story = {
  name: 'Мінімальні налаштування',
  parameters: {
    docs: {
      description: {
        story: 'Користувач прийняв тільки необхідні cookies. Показується тільки кнопка управління 🍪.',
      },
    },
  },
  decorators: [CommonDecorator],
  args: {
    forceShow: false,
    useLocalStorage: false,
    initialSettings: {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    }
  },
};

export const AllAccepted: Story = {
  name: 'Все прийнято',
  parameters: {
    docs: {
      description: {
        story: 'Користувач прийняв всі типи cookies. Показується тільки кнопка управління 🍪.',
      },
    },
  },
  decorators: [CommonDecorator],
  args: {
    forceShow: false,
    useLocalStorage: false,
    initialSettings: {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    }
  },
};

export const ManageButtonOnly: Story = {
  name: 'Тільки кнопка управління',
  parameters: {
    docs: {
      description: {
        story: 'Компактна кнопка управління cookies, яка з\'являється після прийняття налаштувань.',
      },
    },
  },
  decorators: [
    (Story: any) => {
      return (
        <div style={{ 
          minHeight: '400px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px',
          position: 'relative'
        }}>
          <h3 style={{ color: 'white', marginBottom: '10px' }}>Сторінка гри</h3>
          <p style={{ color: 'white', marginBottom: '20px', fontSize: '14px' }}>
            Користувач уже прийняв cookies, тепер відображається тільки кнопка управління 🍪
          </p>
          <Story />
        </div>
      );
    }
  ],
  args: {
    forceShow: false,
    useLocalStorage: false,
    initialSettings: {
      necessary: true,
      functional: true,
      analytics: false,
      marketing: false
    }
  },
};

export const MobileView: Story = {
  name: 'Мобільний вигляд',
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
    (Story: any) => {
      return (
        <div style={{ 
          minHeight: '600px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
          <Story />
        </div>
      );
    }
  ],
  args: {
    forceShow: true,
    useLocalStorage: false,
  },
};

export const InteractiveDemo: Story = {
  name: 'Інтерактивна демонстрація',
  parameters: {
    docs: {
      description: {
        story: 'Інтерактивна демонстрація роботи компонента. Показується модалка, можна клацати по перемикачам.',
      },
    },
  },
  decorators: [
    (Story: any) => {
      return (
        <div style={{ 
          minHeight: '600px',
          position: 'relative'
        }}>
          <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <h3 style={{ color: 'white', marginBottom: '10px' }}>Інтерактивна демонстрація</h3>
            <p style={{ color: 'white', marginBottom: '10px' }}>
              Клацай по кнопкам та перемикачам, щоб побачити, як працює компонент!
            </p>
          </div>
          <Story />
        </div>
      );
    }
  ],
  args: {
    forceShow: true,
    useLocalStorage: false,
  },
};

export const ModalWithAllChecked: Story = {
  name: 'Модалка з усіма галочками',
  parameters: {
    docs: {
      description: {
        story: 'Демонстрація модалки з усіма включеними cookies (для тестування UI).',
      },
    },
  },
  decorators: [CommonDecorator],
  args: {
    forceShow: true,
    useLocalStorage: false,
    initialSettings: {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    }
  },
};

export const ModalWithNoOptional: Story = {
  name: 'Модалка без опціональних',
  parameters: {
    docs: {
      description: {
        story: 'Демонстрація модалки з тільки обов\'язковими cookies.',
      },
    },
  },
  decorators: [CommonDecorator],
  args: {
    forceShow: true,
    useLocalStorage: false,
    initialSettings: {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    }
  },
};

export const ModalWithCustomSettings: Story = {
  name: 'Модалка з кастомними налаштуваннями',
  parameters: {
    docs: {
      description: {
        story: 'Демонстрація модалки з кастомними налаштуваннями (функціональні + маркетингові).',
      },
    },
  },
  decorators: [CommonDecorator],
  args: {
    forceShow: true,
    useLocalStorage: false,
    initialSettings: {
      necessary: true,
      functional: true,
      analytics: false,
      marketing: true
    }
  },
};
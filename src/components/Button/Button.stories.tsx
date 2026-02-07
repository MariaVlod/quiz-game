import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@storybook/test';
import Button from '../Button/Button';
import './Button.module.css';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Базовий компонент кнопки з різними варіантами стилізації та станів.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Варіант стилю кнопки',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Розмір кнопки',
    },
    disabled: {
      control: 'boolean',
      description: 'Чи відключена кнопка',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML атрибут type',
    },
    children: {
      control: 'text',
      description: 'Вміст кнопки',
    },
    onClick: {
      action: 'clicked',
      description: 'Обробник кліку',
    },
    className: {
      control: 'text',
      description: 'Додаткові CSS класи',
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Основна кнопка з градієнтним фоном, використовується для головних дій.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Другорядна кнопка зі світлим фоном, використовується для другорядних дій.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: 'Small Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Компактна кнопка для обмеженого простору або допоміжних дій.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Large Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Велика кнопка для важливих дій або мобільних пристроїв.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Відключена кнопка, яка не реагує на кліки. Використовується коли дія недоступна.',
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: '🎮 Почати гру',
  },
  parameters: {
    docs: {
      description: {
        story: 'Кнопка з іконкою, що покращує візуальне сприйняття та UX.',
      },
    },
  },
};

export const SubmitButton: Story = {
  args: {
    variant: 'primary',
    type: 'submit',
    children: 'Submit Form',
  },
  parameters: {
    docs: {
      description: {
        story: 'Кнопка типу submit для використання в формах.',
      },
    },
  },
};

export const ResetButton: Story = {
  args: {
    variant: 'secondary',
    type: 'reset',
    children: 'Reset Form',
  },
  parameters: {
    docs: {
      description: {
        story: 'Кнопка типу reset для очищення форм.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  args: {
    variant: 'primary',
    children: 'Натисни мене',
  },
  parameters: {
    docs: {
      description: {
        story: 'Спробуйте натиснути кнопку та подивіться на дію в Actions панелі.',
      },
    },
  },
};

export const InContext: Story = {
  args: {
    variant: 'primary',
    children: 'Зберегти зміни',
  },
  decorators: [
    (Story) => (
      <div style={{ 
        background: '#f8f9fa', 
        padding: '40px',
        borderRadius: '12px',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '16px' }}>Налаштування профілю</h3>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Ім'я:</label>
            <input 
              type="text" 
              style={{ 
                width: '100%', 
                padding: '8px 12px',
                border: '1px solid #e9ecef',
                borderRadius: '6px'
              }}
              defaultValue="Марія"
            />
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            justifyContent: 'flex-end'
          }}>
            <Button variant="secondary" size="small">
              Скасувати
            </Button>
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Кнопка в реальному контексті використання - форма налаштувань.',
      },
    },
  },
};


export const Accessibility: Story = {
  args: {
    variant: 'primary',
    children: 'Доступна кнопка',
  },
  parameters: {
    docs: {
      description: {
        story: `
## Доступність (Accessibility)

Кнопка реалізована з урахуванням стандартів доступності:

### Ключові особливості:
1. **Семантичний HTML**: Використання елемента \`<button>\`
2. **Клавіатурна навігація**: Tab порядок та focus стилі
3. **ARIA атрибути**: Відповідність WCAG 2.1
4. **Контраст кольорів**: Мінімальний контраст 4.5:1
5. **Focus indication**: Чітко видимий focus ring

### Тестування доступності:
- Табуляція та Shift+Tab для навігації
- Enter/Space для активації
- Скрінрідери (NVDA, VoiceOver)
- Контраст-аналізатори

### Best Practices:
\`\`\`jsx
// Правильно
<Button onClick={handleClick}>Текст кнопки</Button>

// Неправильно - використання div з role="button"
<div onClick={handleClick} role="button">Текст</div>
\`\`\`
`,
      },
    },
  },
};

export const ComponentAPI = {
  parameters: {
    docs: {
      description: {
        story: `
## API документація компонента Button

### Props:

| Пропс | Тип | Обов'язковий | Значення за замовчуванням | Опис |
|-------|-----|-------------|---------------------------|------|
| \`children\` | \`React.ReactNode\` | так | - | Вміст кнопки (текст, іконка) |
| \`variant\` | \`'primary' \\| 'secondary'\` | ні | \`'primary'\` | Варіант стилю кнопки |
| \`size\` | \`'small' \\| 'medium' \\| 'large'\` | ні | \`'medium'\` | Розмір кнопки |
| \`disabled\` | \`boolean\` | ні | \`false\` | Чи відключена кнопка |
| \`type\` | \`'button' \\| 'submit' \\| 'reset'\` | ні | \`'button'\` | HTML атрибут type |
| \`onClick\` | \`() => void\` | ні | - | Обробник кліку |
| \`className\` | \`string\` | ні | \`''\` | Додаткові CSS класи |

### Приклади використання:

\`\`\`tsx
// Базова кнопка
<Button onClick={handleClick}>Натисни мене</Button>

// Кнопка з варіантами
<Button 
  variant="secondary" 
  size="large" 
  disabled={isLoading}
  onClick={handleSubmit}
>
  {isLoading ? 'Завантаження...' : 'Відправити'}
</Button>

// Кнопка в формі
<form>
  <Button type="submit">Зберегти</Button>
  <Button type="reset" variant="secondary">Скасувати</Button>
</form>
\`\`\`

### CSS класи:

Компонент генерує наступні класи:
- \`.btn\` - базовий клас
- \`.btnPrimary\` - первинний варіант
- \`.btnSecondary\` - вторинний варіант
- \`.btnSmall\` - маленький розмір
- \`.btnLarge\` - великий розмір
- \`.btn[disabled]\` - відключений стан

### Обмеження:
- Не підтримує \`ref\` (можна додати при необхідності)
- Обмежений набір варіантів (розширюється при потребі)
`,
      },
    },
  },
};
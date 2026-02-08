import React from 'react';
import styles from './Button.module.css';

/**
 * Інтерфейс для властивостей кнопки.
 * @interface ButtonProps
 */
interface ButtonProps {
  /** Вміст кнопки (текст, іконка або їх комбінація) */
  children: React.ReactNode;
  /** Обробник події натискання на кнопку */
  onClick?: () => void;
  /** Варіант стилізації кнопки */
  variant?: 'primary' | 'secondary';
  /** Чи активна кнопка. Якщо true - кнопка не реагує на кліки та має інший вигляд */
  disabled?: boolean;
  /** Тип кнопки для HTML форми */
  type?: 'button' | 'submit' | 'reset';
  /** Додаткові CSS класи для кастомізації стилів */
  className?: string;
  /** Розмір кнопки */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Універсальний компонент кнопки з підтримкою різних варіантів стилізації.
 * 
 * @component
 * @param {ButtonProps} props - Властивості компонента
 * @returns {JSX.Element} Реакт-компонент кнопки
 * 
 * @example
 * // Базове використання
 * <Button onClick={handleClick}>Натисни мене</Button>
 * 
 * @example
 * // Кнопка з додатковими властивостями
 * <Button 
 *   variant="secondary"
 *   size="large"
 *   disabled={isLoading}
 *   onClick={submitForm}
 * >
 *   Відправити
 * </Button>
 * 
 * @example
 * // Кнопка для форми
 * <Button type="submit" variant="primary">
 *   Надіслати форму
 * </Button>
 */
const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
  size = 'medium'
}) => {
  /**
   * Формує рядок CSS класів для кнопки на основі переданих властивостей.
   * @returns {string} Рядок з усіма CSS класами для кнопки
   */
  const buttonClass = `
    ${styles.btn} 
    ${variant === 'primary' ? styles.btnPrimary : styles.btnSecondary}
    ${size === 'small' ? styles.btnSmall : size === 'large' ? styles.btnLarge : ''}
    ${className}
  `.trim();

  return (
    <button 
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
import React from 'react';
import styles from './Card.module.css';

/**
 * Інтерфейс властивостей компонента Card.
 * Визначає всі параметри для створення картки з різними розмірами та поведінкою.
 * 
 * @interface CardProps
 */
interface CardProps {
  /** Вміст картки (будь-які React елементи) */
  children: React.ReactNode;
  /** Додаткові CSS класи для кастомізації зовнішнього вигляду */
  className?: string;
  /** Обробник кліку по картці. Може бути використаний для створення клікабельних карток */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Розмір картки, що впливає на внутрішні відступи та загальні розміри */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Універсальний компонент картки для відображення контенту в стилізованому контейнері.
 * Підтримує різні розміри та може бути клікабельним.
 * 
 * @component
 * @param {CardProps} props - Властивості компонента
 * @returns {JSX.Element} Компонент картки
 * 
 * @example
 * // Базове використання
 * <Card>
 *   <h3>Заголовок картки</h3>
 *   <p>Текстовий контент картки</p>
 * </Card>
 * 
 * @example
 * // Картка з розміром та клікабельною поведінкою
 * <Card 
 *   size="large"
 *   onClick={() => console.log('Картка натиснута!')}
 *   className="custom-card-style"
 * >
 *   <h3>Велика картка</h3>
 *   <p>Ця картка реагує на кліки та має кастомні стилі</p>
 * </Card>
 * 
 * @example
 * // Картка маленького розміру для компактного відображення
 * <Card size="small">
 *   <span>Статистика</span>
 *   <strong>42</strong>
 * </Card>
 * 
 * @remarks
 * Компонент використовує CSS модулі для стилізації та підтримує всі стандартні HTML атрибути div.
 * За замовчуванням розмір картки - 'medium'.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div Документація HTML div елемента
 */
const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  size = 'medium'
}) => {
  /**
   * Формує рядок CSS класів для картки на основі переданих властивостей.
   * Об'єднує базовий клас картки, класи розміру та кастомні класи.
   * 
   * @function
   * @returns {string} Рядок з усіма CSS класами для картки
   * @private
   */
  const cardClass = `
    ${styles.card}
    ${size === 'large' ? styles.cardLarge : size === 'small' ? styles.cardSmall : ''}
    ${className}
  `.trim();

  return (
    <div 
      className={cardClass}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(e as any);
        }
      } : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  size?: 'small' | 'medium' | 'large';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  size = 'medium'
}) => {
  const cardClass = `
    ${styles.card}
    ${size === 'large' ? styles.cardLarge : size === 'small' ? styles.cardSmall : ''}
    ${className}
  `.trim();

  return (
    <div 
      className={cardClass}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
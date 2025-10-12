import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
  size = 'medium'
}) => {
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
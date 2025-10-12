// src/components/game/AnswerOption.tsx

import React from 'react';
import type { QuestionOption } from '../../types';
// 👇 Імпортуємо стилі як об'єкт `styles`
import styles from './AnswerOption.module.css';

interface AnswerOptionProps {
  answer: QuestionOption;
  index: number;
  isSelected?: boolean;
  isCorrect?: boolean;
  showCorrect?: boolean;
  onSelect: (answerId: string) => void;
  disabled?: boolean;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({ 
  answer, 
  index, 
  isSelected = false,
  isCorrect = false,
  showCorrect = false,
  onSelect, 
  disabled = false
}) => {
  const letters = ['A', 'B', 'C', 'D'];
  
  const getOptionClasses = () => {
    const classNames = [styles.option]; 

    if (showCorrect) {
      if (isCorrect) {
        classNames.push(styles.correct);
      } else if (isSelected) {
        classNames.push(styles.incorrect);
      }
    } else if (isSelected) {
      classNames.push(styles.selected);
    }
    
    if (disabled) {
      classNames.push(styles.disabled);
    }

    return classNames.join(' '); 
  };

  const getStatusIcon = () => {
    if (!showCorrect) return null;
    if (isCorrect) return '✅';
    if (isSelected && !isCorrect) return '❌';
    return null;
  };

  return (
    <div 
      className={getOptionClasses()}
      onClick={() => !disabled && onSelect(answer.id)}
    >
      {}
      <span className={styles.letter}>{letters[index]}</span>
      <span className={styles.optionText}>{answer.text}</span>
      {getStatusIcon() && (
        <span className={styles.status}>{getStatusIcon()}</span>
      )}
    </div>
  );
};

export default AnswerOption;
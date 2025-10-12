import React from 'react';
import AnswerOption from '../AnswerOption';
import type { QuestionOption } from '../../types';
import styles from './AnswerList.module.css';

interface AnswerListProps {
  answers: QuestionOption[];
  selectedOptionId?: string | null;
  correctOptionId?: string;
  onAnswerSelect: (answerId: string) => void;
  disabled?: boolean;
}

const AnswerList: React.FC<AnswerListProps> = ({ 
  answers, 
  selectedOptionId, 
  correctOptionId, 
  onAnswerSelect, 
  disabled = false 
}) => { 
  return ( 
    <div className={styles.list}> 
      {answers.map((answer, index) => ( 
        <AnswerOption
          key={answer.id}
          answer={answer}
          index={index}
          isSelected={selectedOptionId === answer.id}
          isCorrect={correctOptionId === answer.id}
          onSelect={onAnswerSelect}
          disabled={disabled}
          showCorrect={!!correctOptionId}
        />
      ))} 
    </div> 
  );
}

export default AnswerList;
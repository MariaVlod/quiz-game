import React from 'react';
import styles from './Question.module.css';

interface QuestionProps {
  text: string;
}

const Question: React.FC<QuestionProps> = ({ text }) => {
  return (
    <div className={styles.question}>
      <h3 className={styles.text}>{text}</h3>
    </div>
  );
};

export default Question;
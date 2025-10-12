import React from 'react';
import styles from './ProgressInfo.module.css';

interface ProgressInfoProps {
  current: number;
  total: number;
}

const ProgressInfo: React.FC<ProgressInfoProps> = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className={styles.progress}>
      <div className={styles.text}>
        Запитання {current} з {total}
      </div>
      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressInfo;
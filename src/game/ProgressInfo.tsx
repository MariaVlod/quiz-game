import React from 'react'

interface ProgressInfoProps {
  current: number
  total: number
}

const ProgressInfo: React.FC<ProgressInfoProps> = ({ current, total }) => {
  const progress = (current / total) * 100
  
  return (
    <div className="progress-info">
      <div className="progress-info__text">
        Запитання {current} з {total}
      </div>
      <div className="progress-info__bar">
        <div 
          className="progress-info__fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ProgressInfo
import React from 'react'

interface ScoreBoardProps {
  score: number
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className="score-board">
      <div className="score-board__label">Рахунок:</div>
      <div className="score-board__value">{score}</div>
    </div>
  )
}

export default ScoreBoard
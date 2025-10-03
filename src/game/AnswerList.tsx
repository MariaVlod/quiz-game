import React from 'react'
import AnswerOption from './AnswerOption'

interface AnswerListProps {
  answers: string[]
  onAnswerSelect: (answer: string) => void
}

const AnswerList: React.FC<AnswerListProps> = ({ answers, onAnswerSelect }) => {
  return (
    <div className="answer-list">
      {answers.map((answer, index) => (
        <AnswerOption
          key={index}
          answer={answer}
          index={index}
          onSelect={onAnswerSelect}
        />
      ))}
    </div>
  )
}

export default AnswerList
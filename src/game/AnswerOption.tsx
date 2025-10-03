import React from 'react'

interface AnswerOptionProps {
  answer: string
  index: number
  onSelect: (answer: string) => void
}

const AnswerOption: React.FC<AnswerOptionProps> = ({ 
  answer, 
  index, 
  onSelect 
}) => {
  const letters = ['A', 'B', 'C', 'D']
  
  return (
    <div 
      className="answer-option"
      onClick={() => onSelect(answer)}
    >
      <span className="answer-option__letter">{letters[index]}</span>
      <span className="answer-option__text">{answer}</span>
    </div>
  )
}

export default AnswerOption
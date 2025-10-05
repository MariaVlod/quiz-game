import React from 'react'
import type { QuestionOption } from '../types'

interface AnswerOptionProps {
  answer: QuestionOption
  index: number
  isSelected?: boolean
  isCorrect?: boolean
  showCorrect?: boolean
  onSelect: (answerId: string) => void
  disabled?: boolean
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
  const letters = ['A', 'B', 'C', 'D']
  
  const getOptionClass = () => {
    if (showCorrect) {
      if (isCorrect) return 'answer-option answer-option--correct'
      if (isSelected && !isCorrect) return 'answer-option answer-option--incorrect'
    }
    if (isSelected) return 'answer-option answer-option--selected'
    return 'answer-option'
  }

  const getStatusIcon = () => {
    if (!showCorrect) return null
    if (isCorrect) return '✅'
    if (isSelected && !isCorrect) return '❌'
    return null
  }

  return (
    <div 
      className={getOptionClass()}
      onClick={() => !disabled && onSelect(answer.id)}
    >
      <span className="answer-option__letter">{letters[index]}</span>
      <span className="answer-option__text">{answer.text}</span>
      {getStatusIcon() && (
        <span className="answer-option__status">{getStatusIcon()}</span>
      )}
    </div>
  )
}

export default AnswerOption
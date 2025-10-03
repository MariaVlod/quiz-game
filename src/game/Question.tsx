import React from 'react'

interface QuestionProps {
  text: string
}

const Question: React.FC<QuestionProps> = ({ text }) => {
  return (
    <div className="question">
      <h3 className="question__text">{text}</h3>
    </div>
  )
}

export default Question
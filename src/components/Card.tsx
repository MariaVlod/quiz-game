import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void; 
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick 
}) => {
  return (
    <div 
      className={`card ${className}`}
      onClick={onClick} 
    >
      {children}
    </div>
  )
}

export default Card
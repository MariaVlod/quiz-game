import React from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import Card from '../components/Card'

interface StartPageProps {
  onStart: () => void
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  return (
    <div className="page start-page">
      <Header />
      
      <Card className="start-page__card">
        <div className="start-page__content">
          <h2>Ласкаво просимо!</h2>
          <div className="rules">
            <h3>Правила гри:</h3>
            <ul>
              <li>Відповідайте на запитання про фільми</li>
              <li>Оберіть правильну відповідь з декількох варіантів</li>
              <li>Наберіть якомога більше балів</li>
              <li>10 запитань - 10 можливостей перевірити себе!</li>
            </ul>
          </div>
          
          <Button onClick={onStart}>
            Почати гру
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default StartPage
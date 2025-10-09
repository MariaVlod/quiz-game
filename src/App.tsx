import React, { useState } from 'react';
import { GameSettingsProvider } from './context/GameSettingsContext';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultPage from './pages/ResultPage';
import type { Question } from './types';

type AppState = 'start' | 'game' | 'results';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [answersHistory, setAnswersHistory] = useState<any[]>([]);

  const handleStartGame = (selectedQuestions: Question[]) => {
    setQuestions(selectedQuestions);
    setScore(0);
    setAnswersHistory([]);
    setCurrentPage('game');
  };

  const handleEndGame = (finalScore: number, finalAnswersHistory: any[]) => {
    setScore(finalScore);
    setAnswersHistory(finalAnswersHistory);
    setCurrentPage('results');
  };

  const handleNewGame = () => {
    setQuestions([]);
    setScore(0);
    setAnswersHistory([]);
    setCurrentPage('start');
  };

  const handleRestart = () => {
    setScore(0);
    setAnswersHistory([]);
    setCurrentPage('game');
  };

  return (
    <div className="app">
      {currentPage === 'start' && (
        <StartPage onStart={handleStartGame} />
      )}
      {currentPage === 'game' && questions.length > 0 && (
        <GamePage 
          questions={questions} 
          onEndGame={handleEndGame}
          onNewGame={handleNewGame}
        />
      )}
      {currentPage === 'results' && (
        <ResultPage 
          score={score} 
          answersHistory={answersHistory} 
          onRestart={handleRestart}
          onNewGame={handleNewGame}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GameSettingsProvider>
      <AppContent />
    </GameSettingsProvider>
  );
};

export default App;
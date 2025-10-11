import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GameSettingsProvider } from './context/GameSettingsContext';
import AppRouter from './routes/AppRouter';
import './styles/global.css'; // Глобальні стилі

const App: React.FC = () => {
  return (
    <GameSettingsProvider>
      <Router>
        <div className="app">
          <AppRouter />
        </div>
      </Router>
    </GameSettingsProvider>
  );
};

export default App;
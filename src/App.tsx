import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GameSettingsProvider } from './context/GameSettingsContext';
import AppRouter from './routes/AppRouter';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GameSettingsProvider>
        <div className="app">
          <AppRouter />
        </div>
      </GameSettingsProvider>
    </BrowserRouter>
  );
};

export default App;
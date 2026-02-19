import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import CookieConsent from './components/CookieConsent/CookieConsent'; 
import './styles/index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <AppRouter />
        <CookieConsent />
      </div>
    </BrowserRouter>
  );
};

export default App;
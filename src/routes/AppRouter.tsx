import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StartPage from '../pages/Start/StartPage';
import GamePage from '../pages/Game/GamePage';
import ResultPage from '../pages/Result/ResultPage';
import UserProfilePage from '../pages/UserProfilePage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/results" element={<ResultPage />} />
      <Route path="/user/:id" element={<UserProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
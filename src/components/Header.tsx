import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__title-section">
          <h1 className="header__title">Кіно-Вікторина</h1>
          <p className="header__subtitle">Перевір свої знання про фільми!</p>
        </div>
        
        <nav className="header__navigation">
          <Link to="/">
            <Button 
              variant={location.pathname === '/' ? 'primary' : 'secondary'}
              className="nav-button"
            >
              🏠 Головна
            </Button>
          </Link>
          <Link to="/user/1">
            <Button 
              variant={location.pathname.startsWith('/user') ? 'primary' : 'secondary'}
              className="nav-button"
            >
              👤 Профіль
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
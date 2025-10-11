import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="page user-profile-page">
      <Header />
      
      <Card className="user-profile__card">
        <div className="user-profile__content">
          <h2>Профіль користувача #{id}</h2>
          
          <div className="user-info">
            <div className="user-details">
              <p><strong>ID користувача:</strong> {id}</p>
              <p><strong>Статус:</strong> Активний</p>
              <p><strong>Дата реєстрації:</strong> 01.01.2024</p>
            </div>
          </div>

          <div className="user-stats">
            <h4>Статистика гри:</h4>
            <div className="stats-grid">
              <div className="stat">
                <span className="stat-value">15</span>
                <span className="stat-label">Ігор зіграно</span>
              </div>
              <div className="stat">
                <span className="stat-value">85%</span>
                <span className="stat-label">Успішність</span>
              </div>
              <div className="stat">
                <span className="stat-value">1250</span>
                <span className="stat-label">Балів</span>
              </div>
            </div>
          </div>

          <div className="user-actions">
            <Link to="/">
              <Button variant="primary">
                На головну
              </Button>
            </Link>
            <Link to="/game">
              <Button variant="secondary">
                Грати
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfilePage;
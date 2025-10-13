import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import { useGameStore } from '../../store/gameStore';
import styles from './UserProfilePage.module.css';

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { results, setUser } = useGameStore();

  
  React.useEffect(() => {
    if (id) {
      setUser(id);
    }
  }, [id, setUser]);

  
  const userResults = results.filter(result => result.userId === id);
  const totalGames = userResults.length;
  const totalScore = userResults.reduce((sum, result) => sum + result.score, 0);
  const averageSuccess = totalGames > 0 
    ? Math.round(userResults.reduce((sum, result) => sum + result.percent, 0) / totalGames)
    : 0;

  return (
    <div className="page">
      <Header />

      <Card size="large" className={styles.card}>
        <div className={styles.content}>
          <h2>Профіль користувача</h2>

          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              <span>👤</span>
            </div>

            <div className={styles.userDetails}>
              <h3>Користувач #{id}</h3>
              <p><strong>ID:</strong> {id}</p>
              <p><strong>Статус:</strong> 
                <span className={styles.statusActive}>Активний</span>
              </p>
              <p><strong>Дата реєстрації:</strong> 01.01.2024</p>
            </div>
          </div>

          <div className={styles.userStats}>
            <h4>Статистика гри:</h4>
            <div className={styles.statsGrid}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{totalGames}</span>
                <span className={styles.statLabel}>Ігор зіграно</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{averageSuccess}%</span>
                <span className={styles.statLabel}>Успішність</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{totalScore}</span>
                <span className={styles.statLabel}>Балів</span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
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
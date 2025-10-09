import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import Question from '../game/Question';
import AnswerList from '../game/AnswerList';
import ProgressInfo from '../game/ProgressInfo';
import ScoreBoard from '../game/ScoreBoard';
import GameOverModal from '../components/GameOverModal';
import { useGameFlow } from '../hooks/useGameFlow';
import { useTimer } from '../hooks/useTimer';
import type { Question as QuestionType } from '../types';

interface GamePageProps {
  questions: QuestionType[];
  onEndGame: (score: number, answersHistory: any[]) => void;
  onNewGame: () => void;
}

const GamePage: React.FC<GamePageProps> = ({ questions, onEndGame, onNewGame }) => {
  const {
    currentQuestion,
    selectedOptionId,
    answersHistory,
    score,
    isFinished,
    isAnswerLocked,
    selectOption,
    skipQuestion,
    next,
    restart,
    getProgress
  } = useGameFlow(questions);

  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleTimeExpire = React.useCallback(() => {
    console.log('⏰ Час вийшов! Автоматичний пропуск питання...');

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!isAnswerLocked && currentQuestion) {
      console.log('Користувач не встиг відповісти на питання:', currentQuestion.id);
      skipQuestion();
      
      timeoutRef.current = window.setTimeout(() => {
        console.log('➡️ Автоматичний перехід до наступного питання...');
        next();
        timeoutRef.current = null;
      }, 1500);
    }
  }, [isAnswerLocked, currentQuestion, skipQuestion, next]);

  const { timeLeft, reset, pause, isRunning } = useTimer({
    onExpire: handleTimeExpire,
    autoStart: true
  });

  const handleAnswerSelect = (optionId: string) => {
    console.log('🎯 Обробка відповіді:', optionId);
    console.log('⏰ Стан таймера перед відповіддю:', { timeLeft, isRunning });
    
  
    selectOption(optionId);
    
    
    console.log('⏸️ Спроба зупинити таймер...');
    pause();
    
    
    setTimeout(() => {
      console.log('⏰ Стан таймера після pause:', { timeLeft, isRunning });
    }, 10);

    
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setTimeout(() => {
      console.log('🔄 Відповідь оброблена, стан isAnswerLocked:', true);
    }, 100);
  };

  const handleNext = () => {
    console.log('➡️ Перехід до наступного питання');
    next();
  };

  const handleRestart = () => {
    console.log('🔄 Перезапуск гри');
    restart();
    setShowGameOverModal(false);
  };

  const handleNewGame = () => {
    console.log('Нова гра');
    setShowGameOverModal(false);
    onNewGame();
  };

  useEffect(() => {
    if (isFinished) {
      console.log('Гра завершена!');
      setShowGameOverModal(true);
      onEndGame(score, answersHistory);
    }
  }, [isFinished, score, answersHistory, onEndGame]);

  useEffect(() => {
    if (currentQuestion) {
      console.log('🔄 Нове питання, перезапуск таймера:', currentQuestion.id);

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      reset();
    }
  }, [currentQuestion, reset]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!currentQuestion) {
    return (
      <div className="page game-page">
        <Header />
        <Card>
          <p>Завантаження питання...</p>
        </Card>
      </div>
    );
  }

  const progress = getProgress();

  return (
    <div className="page game-page">
      <Header />

      <div className="game-page__layout">
        <div className="game-page__info">
          <ProgressInfo
            current={progress.current}
            total={progress.total}
          />
          <ScoreBoard score={score}/>
          <div className={`timer ${timeLeft <= 3 ? 'timer--warning' : ''}`}>
            ⏱️ {timeLeft}с {!isRunning && '⏸️'}
          </div>
        </div>

        <Card className="game-page__question-card">
          <Question text={currentQuestion.text} />

          <AnswerList
            answers={currentQuestion.options}
            selectedOptionId={selectedOptionId}
            correctOptionId={isAnswerLocked ? currentQuestion.correctOptionId : undefined}
            onAnswerSelect={handleAnswerSelect}
            disabled={isAnswerLocked}
          />

          {/* Дебаг інформація */}
          <div style={{
            marginTop: '20px',
            padding: '10px',
            background: '#f5f5f5',
            borderRadius: '5px',
            fontSize: '12px',
            color: '#666'
          }}>
            Дебаг: Питання {currentQuestion.id} ({progress.current}/{progress.total}) | 
            Відповідей: {answersHistory.length} | 
            Заблоковано: {isAnswerLocked.toString()} | 
            Час: {timeLeft}с | 
            Таймер активний: {isRunning.toString()}
          </div>
        </Card>

        <div className="game-page__actions">
          {isAnswerLocked && (
            <Button onClick={handleNext}>
              {progress.current === progress.total ? 'Завершити гру' : 'Наступне питання →'}
            </Button>
          )}
        </div>
      </div>

      <GameOverModal
        isOpen={showGameOverModal}
        onClose={() => setShowGameOverModal(false)}
        score={score}
        answersHistory={answersHistory}
        onRestart={handleRestart}
        onNewGame={handleNewGame}
      />
    </div>
  );
};

export default GamePage;
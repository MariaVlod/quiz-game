import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button/Button';
import Question from '../game/Question';
import AnswerList from '../game/AnswerList';
import ProgressInfo from '../game/ProgressInfo';
import ScoreBoard from '../game/ScoreBoard';
import GameOverModal from '../components/GameOverModal';
import { useGameFlow } from '../hooks/useGameFlow';
import { useTimer } from '../hooks/useTimer';
import type { Question as QuestionType } from '../types';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  
  useEffect(() => {
    const savedQuestions = sessionStorage.getItem('quizQuestions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    } else {
      navigate('/');
    }
  }, [navigate]);

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
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!isAnswerLocked && currentQuestion) {
      skipQuestion();
      
      timeoutRef.current = window.setTimeout(() => {
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
    selectOption(optionId);
    pause();

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleNext = () => {
    next();
  };

  const handleRestart = () => {
    restart();
    setShowGameOverModal(false);
  };

  const handleNewGame = () => {
    setShowGameOverModal(false);
    navigate('/');
  };

  const handleSaveResults = () => {
    // Зберігаємо результати для ResultPage
    sessionStorage.setItem('quizResults', JSON.stringify({
      score,
      answersHistory
    }));
    navigate('/results');
  };

  useEffect(() => {
    if (isFinished) {
      setShowGameOverModal(true);
    }
  }, [isFinished]);

  useEffect(() => {
    if (currentQuestion) {
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

  if (!currentQuestion || questions.length === 0) {
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
        onSaveResults={handleSaveResults}
      />
    </div>
  );
};

export default GamePage;
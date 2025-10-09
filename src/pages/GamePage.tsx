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
    restart
  } = useGameFlow(questions);

  const [showGameOverModal, setShowGameOverModal] = useState(false);

  const timeoutRef = useRef<number | null>(null);

  const handleTimeExpire = React.useCallback(() => {
    if (!isAnswerLocked && currentQuestion) {
      skipQuestion();
    }

    timeoutRef.current = window.setTimeout(() => {
      next();
      timeoutRef.current = null;
    }, 1000);
  }, [isAnswerLocked, currentQuestion, skipQuestion, next]);

  const { timeLeft, reset, pause } = useTimer({
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
    onNewGame();
  };

  useEffect(() => {
    if (isFinished) {
      setShowGameOverModal(true);
      onEndGame(score, answersHistory);
    }
  }, [isFinished, score, answersHistory, onEndGame]);

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

 const progress = {
  current: answersHistory.length + 1,
  total: questions.length
};

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
            ⏱️ {timeLeft}с
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
      />
    </div>
  );
};

export default GamePage;
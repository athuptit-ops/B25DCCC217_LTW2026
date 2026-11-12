import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Countdown from '../components/Countdown';
import QuestionCard from '../components/QuestionCard';
import TimeBar from '../components/TimeBar';
import ScorePanel from '../components/ScorePanel';
import PowerUps from '../components/PowerUps';
import { calcPoints, calcTotal } from '../utils';

export default function Play({ questions, playerName, setHistory }) {
  const navigate = useNavigate();

 
  if (!playerName) {
    return <Navigate to="/" replace />;
  }


  const officialQuestions = questions.filter(q => !q.reserve);

  const [gameStatus, setGameStatus] = useState('countdown'); // countdown, answering, revealed, waiting
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answers, setAnswers] = useState([]);
  

  const [currentQuestionsList, setCurrentQuestionsList] = useState(officialQuestions);
  const [usedPowerUps, setUsedPowerUps] = useState({ change: false, double: false, pause: false });
  const [isDoubleActive, setIsDoubleActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [lastAddedPoints, setLastAddedPoints] = useState(null);

  const currentQ = currentQuestionsList[currentIndex];


  useEffect(() => {
    if (gameStatus === 'answering' || gameStatus === 'revealed' || gameStatus === 'paused') {
      const correctSoFar = answers.filter(a => a.correct).length;
      document.title = `Câu ${currentIndex + 1}/15 – đúng ${correctSoFar} câu`;
    }
    return () => {
      document.title = 'Nhanh như chớp';
    };
  }, [currentIndex, answers, gameStatus]);

  useEffect(() => {
    if (gameStatus !== 'answering' || isPaused) return;

    if (timeLeft === 0) {
      handleTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus, timeLeft, isPaused]);

  const handleTimeout = () => {
    setGameStatus('revealed');
    const newAnswer = {
      id: currentQ.id,
      questionText: currentQ.question,
      chosen: null,
      correct: false,
      timeLeft: 0,
      points: 0,
      replacedBy: currentQ.replacedBy || null
    };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setLastAddedPoints(null);


    setTimeout(() => {
      proceedToNext(updatedAnswers);
    }, 1500);
  };

  const handleSelectAnswer = useCallback((selectedIndex) => {
    if (gameStatus !== 'answering') return;
    setGameStatus('revealed');

    const isCorrect = selectedIndex === currentQ.answer;
    const pointsEarned = isCorrect ? calcPoints(currentQ, timeLeft, isDoubleActive) : 0;

    const newAnswer = {
      id: currentQ.id,
      questionText: currentQ.question,
      chosen: selectedIndex,
      correct: isCorrect,
      timeLeft: timeLeft,
      points: pointsEarned,
      replacedBy: currentQ.replacedBy || null
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    
    if (isCorrect) {
      setLastAddedPoints(pointsEarned);
    } else {
      setLastAddedPoints(null);
    }

    setTimeout(() => {
      proceedToNext(updatedAnswers);
    }, 1500);
  }, [gameStatus, currentQ, timeLeft, isDoubleActive, answers]);

  const proceedToNext = (updatedAnswers) => {
    if (currentIndex + 1 >= 15) {

      const totalScore = calcTotal(updatedAnswers);
      const correctCount = updatedAnswers.filter(a => a.correct).length;
      

      const record = {
        id: Date.now(),
        name: playerName,
        score: totalScore,
        correctCount: correctCount,
        answers: updatedAnswers,
        playedAt: new Date().toLocaleString('vi-VN')
      };
      setHistory(prev => [record, ...prev]);

      navigate('/result', { replace: true, state: { playerName, answers: updatedAnswers, score: totalScore, correctCount } });
    } else {
      setCurrentIndex(c => c + 1);
      setTimeLeft(15);
      setIsDoubleActive(false);
      setIsPaused(false);
      setFocusedIndex(0);
      setGameStatus('answering');
      setLastAddedPoints(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStatus !== 'answering') return;

      if (e.key === 'ArrowRight') {
        setFocusedIndex(prev => (prev === 0 || prev === 2) ? prev + 1 : prev);
      } else if (e.key === 'ArrowLeft') {
        setFocusedIndex(prev => (prev === 1 || prev === 3) ? prev - 1 : prev);
      } else if (e.key === 'ArrowDown') {
        setFocusedIndex(prev => (prev === 0 || prev === 1) ? prev + 2 : prev);
      } else if (e.key === 'ArrowUp') {
        setFocusedIndex(prev => (prev === 2 || prev === 3) ? prev - 2 : prev);
      } else if (e.key === 'Enter') {
        handleSelectAnswer(focusedIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, focusedIndex, handleSelectAnswer]);

  const handlePowerUpChange = () => {
    if (usedPowerUps.change || gameStatus !== 'answering') return;
    const reserveQ = questions.find(q => q.reserve && q.level === currentQ.level);
    if (reserveQ) {
      const updatedList = [...currentQuestionsList];
      updatedList[currentIndex] = { ...reserveQ, replacedBy: reserveQ.id };
      setCurrentQuestionsList(updatedList);
      setTimeLeft(15);
      setUsedPowerUps(p => ({ ...p, change: true }));
    }
  };

  const handlePowerUpDouble = () => {
    if (usedPowerUps.double || gameStatus !== 'answering') return;
    setIsDoubleActive(true);
    setUsedPowerUps(p => ({ ...p, double: true }));
  };

  const handlePowerUpPause = () => {
    if (usedPowerUps.pause || gameStatus !== 'answering') return;
    setIsPaused(true);
    setUsedPowerUps(p => ({ ...p, pause: true }));
  };

  if (gameStatus === 'countdown') {
    return <Countdown onFinish={() => setGameStatus('answering')} />;
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <PowerUps 
        usedPowerUps={usedPowerUps} 
        onPowerUpChange={handlePowerUpChange}
        onPowerUpDouble={handlePowerUpDouble}
        onPowerUpPause={handlePowerUpPause}
        isDoubleActive={isDoubleActive}
        gameStatus={gameStatus}
      />
      <TimeBar timeLeft={timeLeft} isPaused={isPaused} />
      <QuestionCard 
        currentIdx={currentIndex}
        question={currentQ}
        status={gameStatus}
        selectedIndex={null}
        onSelect={handleSelectAnswer}
        focusedIndex={focusedIndex}
      />
      <ScorePanel 
        score={calcTotal(answers)} 
        correctCount={answers.filter(a => a.correct).length} 
        lastPoints={lastAddedPoints}
      />
    </div>
  );
}
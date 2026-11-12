import { POINTS } from './data';


export const calcPoints = (question, timeLeft, isDouble = false) => {
  if (!question) return 0;
  const base = POINTS[question.level] || 0;
  const bonus = timeLeft > 0 ? timeLeft * 10 : 0;
  const total = base + bonus;
  return isDouble ? total * 2 : total;
};


export const calcTotal = (answers) => {
  return answers.reduce((sum, item) => sum + (item.points || 0), 0);
};


export const getStars = (correctCount, starsList) => {
  const found = starsList.find(s => correctCount >= s.min);
  return found ? found : starsList[starsList.length - 1];
};
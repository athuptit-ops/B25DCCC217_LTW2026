
import React from 'react';
import { LEVELS } from '../data';
import AnswerButton from './AnswerButton';

export default function QuestionCard({ currentIdx, question, status, selectedIndex, onSelect, focusedIndex }) {
  return (
    <div>
      <h3>Câu {currentIdx + 1}/15 – {LEVELS[question.level]}</h3>
      <p style={{ fontSize: '18px', fontWeight: 'bold', minHeight: '50px' }}>{question.question}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
        {question.options.map((opt, idx) => (
          <AnswerButton 
            key={idx}
            index={idx}
            optionText={opt}
            status={status}
            selectedIndex={selectedIndex}
            correctIndex={question.answer}
            onClick={() => onSelect(idx)}
            focused={focusedIndex === idx}
          />
        ))}
      </div>
    </div>
  );
}
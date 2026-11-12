import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, LETTERS } from '../data';

export default function QuestionDetail({ questions }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAnswer, setShowAnswer] = useState(false);

  const numericId = Number(id);
  const q = questions.find(item => item.id === numericId);

  if (!q) {
    return (
      <div>
        <h2>Không tìm thấy câu hỏi</h2>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '15px' }}>Quay lại</button>
      <h3>Câu hỏi số {q.id} – {LEVELS[q.level]} – {q.reserve ? 'Dự bị' : 'Chính thức'}</h3>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{q.question}</p>
      
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.answer;
          const highlight = showAnswer && isCorrect;
          return (
            <li 
              key={idx} 
              style={{
                padding: '10px',
                margin: '5px 0',
                backgroundColor: highlight ? '#d4edda' : '#f9f9f9',
                border: highlight ? '1px solid #c3e6cb' : '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <b>{LETTERS[idx]}.</b> {opt} {highlight && <span style={{ color: 'green', fontWeight: 'bold' }}> (Đáp án đúng)</span>}
            </li>
          );
        })}
      </ul>

      <button 
        onClick={() => setShowAnswer(!showAnswer)}
        style={{ padding: '8px 15px', marginTop: '10px', cursor: 'pointer' }}
      >
        {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
      </button>

      {showAnswer && (
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e2f0cb', borderRadius: '4px' }}>
          <b>Giải thích:</b> {q.explain}
        </div>
      )}
    </div>
  );
}
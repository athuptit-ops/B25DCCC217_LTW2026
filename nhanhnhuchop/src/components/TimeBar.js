import React from 'react';

export default function TimeBar({ timeLeft, isPaused }) {
  const percent = (timeLeft / 15) * 100;
  const isRed = timeLeft <= 5;

  return (
    <div style={{ margin: '15px 0' }}>
      <div>Còn {timeLeft} giây {isPaused && '(đã dừng)'}</div>
      <div style={{ width: '100%', height: '10px', backgroundColor: '#eee', borderRadius: '5px', overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', backgroundColor: isRed ? 'red' : 'green', transition: 'width 1s linear' }} />
      </div>
    </div>
  );
}
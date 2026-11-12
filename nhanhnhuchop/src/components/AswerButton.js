
import React from 'react';
import { LETTERS } from '../data';

export default function AnswerButton({ index, optionText, status, selectedIndex, correctIndex, onClick, focused }) {
  let bgColor = '#f9f9f9';
  let border = '1px solid #ccc';

  if (status === 'revealed' || status === 'paused_revealed') {
    if (index === correctIndex) {
      bgColor = '#d4edda'; // Xanh lá đúng
      border = '2px solid green';
    } else if (index === selectedIndex) {
      bgColor = '#f8d7da'; // Đỏ sai
      border = '2px solid red';
    }
  }

  if (focused) {
    border = '2px solid blue'; // Viền xanh dương đậm cho phím tắt
  }

  return (
    <button 
      onClick={onClick}
      disabled={status === 'revealed'}
      style={{
        padding: '15px',
        fontSize: '16px',
        backgroundColor: bgColor,
        border: border,
        borderRadius: '6px',
        cursor: 'pointer',
        textAlign: 'left'
      }}
    >
      <b>{LETTERS[index]}.</b> {optionText}
    </button>
  );
}


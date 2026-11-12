import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { LETTERS, STARS } from '../data';
import { getStars } from '../utils';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { playerName, answers, score, correctCount } = location.state;
  const starInfo = getStars(correctCount, STARS);

  
  const renderStarsString = (count) => {
    let s = '';
    for (let i = 0; i < 3; i++) {
      s += i < count ? '★' : '☆';
    }
    return s;
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
      <h2>{starInfo.message}</h2>
      <p><b>Người chơi:</b> {playerName}</p>
      <p><b>Số câu trả lời đúng:</b> {correctCount}/15</p>
      <p><b>Điểm:</b> {score}</p>
      <p><b>Xếp loại:</b> {starInfo.stars} sao <span style={{ color: 'gold', fontSize: '20px' }}>{renderStarsString(starInfo.stars)}</span></p>

      <h3>Bảng xem lại chi tiết</h3>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Câu</th>
            <th>Bạn chọn</th>
            <th>Đáp án đúng</th>
            <th>Còn lại</th>
            <th>Điểm</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((item, idx) => {
            const isCorrect = item.correct;
            const bgRow = isCorrect ? '#d4edda' : '#f8d7da'; // Xanh nhạt / Hồng nhạt
            return (
              <tr key={idx} style={{ backgroundColor: bgRow }}>
                <td>
                  {item.id} {item.replacedBy ? `(đổi sang câu ${item.replacedBy})` : ''}
                </td>
                <td>{item.chosen !== null ? LETTERS[item.chosen] : '-'}</td>
                <td>{LETTERS[item.correct !== undefined ? answers[idx].correct : 0]} {/* Hoặc lấy trực tiếp từ dữ liệu nếu lưu */}</td>
                <td>{item.timeLeft} giây</td>
                <td>{item.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button onClick={() => navigate('/play')} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: 'orange', color: 'white', border: 'none' }}>Chơi lại</button>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px', cursor: 'pointer' }}>Về trang chủ</button>
      </div>
    </div>
  );
}
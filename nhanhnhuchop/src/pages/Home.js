import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({ playerName, setPlayerName, history }) {
  const navigate = useNavigate();

 
  let bestRecord = null;
  if (history && history.length > 0) {
    bestRecord = [...history].sort((a, b) => b.score - a.score)[0];
  }

  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      navigate('/play');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', textAlign: 'center', padding: '20px' }}>
      <h1>Nhanh như chớp</h1>
      <p>Luật chơi: Trả lời 15 câu hỏi trắc nghiệm, mỗi câu 15 giây. Trả lời càng nhanh điểm càng cao!</p>

      {bestRecord && (
        <div style={{ margin: '15px 0', padding: '10px', backgroundColor: '#fff3cd', border: '1px solid #ffeeba' }}>
          <b>Kỷ lục: {bestRecord.score} điểm – {bestRecord.name}</b>
        </div>
      )}

      <form onSubmit={handleStart} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          type="text" 
          placeholder="Nhập tên người chơi..." 
          value={playerName} 
          onChange={e => setPlayerName(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button 
          type="submit" 
          disabled={!playerName.trim()}
          style={{ padding: '10px', fontSize: '16px', backgroundColor: playerName.trim() ? 'orange' : '#ccc', color: 'white', border: 'none', cursor: playerName.trim() ? 'pointer' : 'not-allowed' }}
        >
          Bắt đầu
        </button>
      </form>
    </div>
  );
}
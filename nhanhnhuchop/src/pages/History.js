import React from 'react';

export default function History({ history, setHistory }) {
  const sortedHistory = [...history].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.correctCount - a.correctCount;
  });

  const totalGames = history.length;
  const avgScore = totalGames > 0 ? Math.round(history.reduce((sum, h) => sum + h.score, 0) / totalGames) : 0;
  
  const totalCorrectQuestions = history.reduce((sum, h) => sum + h.correctCount, 0);
  const correctRate = totalGames > 0 ? Math.round((totalCorrectQuestions / (totalGames * 15)) * 100) : 0;

  const handleDelete = (id) => {
    setHistory(history.filter(h => h.id !== id));
  };

  const handleClearAll = () => {
    setHistory([]);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2>Lịch sử các lượt chơi</h2>

      <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        <p><b>Số lượt chơi:</b> {totalGames}</p>
        <p><b>Điểm trung bình:</b> {avgScore}</p>
        <p><b>Tỉ lệ trả lời đúng:</b> {correctRate}%</p>
      </div>

      {totalGames > 0 && (
        <button onClick={handleClearAll} style={{ marginBottom: '15px', padding: '6px 12px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
          Xóa lịch sử
        </button>
      )}

      {totalGames === 0 ? (
        <p>Chưa có lượt chơi nào.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>Người chơi</th>
              <th>Số câu đúng</th>
              <th>Điểm</th>
              <th>Thời gian</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {sortedHistory.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.correctCount}/15</td>
                <td>{item.score}</td>
                <td>{item.playedAt}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)} style={{ color: 'red', cursor: 'pointer' }}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
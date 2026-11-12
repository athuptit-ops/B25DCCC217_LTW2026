import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from '../data';

export default function QuestionBank({ questions }) {
  const [filterType, setFilterType] = useState('all'); // all, official, reserve
  const [sortOrder, setSortOrder] = useState('default'); // default, asc, desc
  const [searchTerm, setSearchTerm] = useState('');

  // Tính số lượng cho các nút lọc bằng filter()
  const totalCount = questions.length;
  const officialCount = questions.filter(q => !q.reserve).length;
  const reserveCount = questions.filter(q => q.reserve).length;

  // Lọc dữ liệu
  let processed = questions.filter(q => {
    if (filterType === 'official') return !q.reserve;
    if (filterType === 'reserve') return q.reserve;
    return true;
  });

  
  if (searchTerm.trim() !== '') {
    processed = processed.filter(q => q.question.toLowerCase().includes(searchTerm.toLowerCase()));
  }


  processed = [...processed].sort((a, b) => {
    if (sortOrder === 'asc') {
      if (a.level !== b.level) return a.level - b.level;
      return a.id - b.id;
    }
    if (sortOrder === 'desc') {
      if (a.level !== b.level) return b.level - a.level;
      return a.id - b.id;
    }
    return a.id - b.id; 
  });

  const getButtonStyle = (type) => ({
    padding: '8px 15px',
    marginRight: '10px',
    backgroundColor: filterType === type ? 'orange' : '#eee',
    color: filterType === type ? 'white' : 'black',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px'
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <div style={{ marginBottom: '15px' }}>
        <button style={getButtonStyle('all')} onClick={() => setFilterType('all')}>Tất cả ({totalCount})</button>
        <button style={getButtonStyle('official')} onClick={() => setFilterType('official')}>Chính thức ({officialCount})</button>
        <button style={getButtonStyle('reserve')} onClick={() => setFilterType('reserve')}>Dự bị ({reserveCount})</button>
      </div>

      <div style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={{ padding: '6px' }}>
          <option value="default">Theo số thứ tự</option>
          <option value="asc">Mức độ: Dễ → Khó</option>
          <option value="desc">Mức độ: Khó → Dễ</option>
        </select>

        <input 
          type="text" 
          placeholder="Tìm kiếm câu hỏi..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '6px', width: '250px' }}
        />
      </div>

      <p><b>Có {processed.length} câu hỏi</b></p>

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>STT</th>
            <th>Mức độ</th>
            <th>Loại</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {processed.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{LEVELS[q.level]}</td>
              <td>{q.reserve ? 'Dự bị' : 'Chính thức'}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
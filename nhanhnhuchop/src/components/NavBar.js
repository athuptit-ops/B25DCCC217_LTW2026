
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const activeStyle = ({ isActive }) => ({
    color: isActive ? 'orange' : 'black',
    fontWeight: isActive ? 'bold' : 'normal',
    marginRight: '20px',
    textDecoration: 'none'
  });

  return (
    <nav style={{ padding: '15px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
      <NavLink to="/" end style={activeStyle}>Trang chủ</NavLink>
      <NavLink to="/questions" style={activeStyle}>Ngân hàng câu hỏi</NavLink>
      <NavLink to="/history" style={activeStyle}>Lịch sử</NavLink>
    </nav>
  );
}

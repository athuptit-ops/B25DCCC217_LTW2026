import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>404 - Không tìm thấy trang</h2>
      <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>Về trang chủ</Link>
    </div>
  );
}
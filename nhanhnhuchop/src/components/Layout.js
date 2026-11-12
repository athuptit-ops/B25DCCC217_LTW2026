import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout() {
  return (
    <div>
      <NavBar />
      <div style={{ padding: '0 20px' }}>
        <Outlet />
      </div>
    </div>
  );
}
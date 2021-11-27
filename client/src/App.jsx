import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/common/NavBar';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MapPage from './pages/MapPage';
import ManagementPage from './pages/ManagementPage';
import ChattingPage from './pages/ChattingPage';
import MyPage from './pages/MyPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [isAdmin] = useState(false);
  return (
    <>
      {isAdmin || <NavBar />}
      <Routes>
        {isAdmin ? (
          <Route path='/admin' element={<AdminPage />} />
        ) : (
          <>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/map' element={<MapPage />} />
            <Route path='/management' element={<ManagementPage />} />
            <Route path='/chat' element={<ChattingPage />} />
            <Route path='/mypage' element={<MyPage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;

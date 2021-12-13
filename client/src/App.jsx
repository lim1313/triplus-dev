import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MapPage from './pages/MapPage';
import ChattingPage from './pages/ChattingPage';
import MyPage from './pages/MyPage';
import AdminPage from './pages/AdminPage';
import Toggle from './components/common/Toggle';
import GoogleCallback from './pages/Googlecallback';
import NaverCallback from './pages/NaverCallback';

import { useSelector } from 'react-redux';
import ManagementPage from './pages/ManagementPage';
import TourManagementPage from './pages/TourManagementPage';

function App() {
  const { pathname } = useLocation();
  const isToggled = useSelector((state) => state.toggleReducer.isToggled);
  console.log(pathname);
  return (
    <>
      {pathname === '/admin' ? null : <NavBar />}
      {isToggled && <Toggle />}
      <Routes>
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/map' element={<MapPage />} />
        <Route path='/management' element={<ManagementPage />}>
          <Route path='tourlist' element={<TourManagementPage />} />
        </Route>
        <Route path='/chat' element={<ChattingPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/googlecallback' element={<GoogleCallback />} />
        <Route path='/navercallback' element={<NaverCallback />} />
      </Routes>
      {pathname === '/map' ||
      pathname === '/admin' ||
      pathname === '/mypage' ||
      pathname === '/management' ||
      pathname === '/management/tourlist' ? null : (
        <Footer main={pathname === '/' ? 'main' : null} />
      )}
    </>
  );
}

export default App;

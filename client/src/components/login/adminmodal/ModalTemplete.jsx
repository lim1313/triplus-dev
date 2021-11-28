import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { adminOpen } from '../../../redux/admin/action';
import AdminBtns from './AdminBtns';
import AdminId from './AdminId';
import AdminPw from './AdminPw';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

const ModalWrapper = styled.div`
  width: 26em;
  background: white;
  min-height: 50vh;
  border-radius: 1rem;
  padding: 1rem;
`;

const ModalTitle = styled.div`
  text-align: center;
`;

export default function ModalTemplete() {
  const [adminId, setAdminId] = useState('');
  const [adminPw, setAdminPw] = useState('');
  const dispatch = useDispatch();

  const handleIdChange = (e) => {
    setAdminId(e.target.value);
  };
  const handlePwChange = (e) => {
    setAdminPw(e.target.value);
  };
  const handleCancelClick = () => {
    dispatch(adminOpen());
  };

  return (
    <Background>
      <ModalWrapper>
        <ModalTitle>관리자로그인</ModalTitle>
        <AdminId handleIdChange={handleIdChange} adminId={adminId} />
        <AdminPw handlePwChange={handlePwChange} adminPw={adminPw} />
        <AdminBtns handleCancelClick={handleCancelClick} />
      </ModalWrapper>
    </Background>
  );
}

import React, { useState } from 'react';
import { Container } from '../styles/common/index';
import styled from 'styled-components';
import SignupTemplete from '../components/signup/SignupTemplete';
import SignupModal from '../components/signup/SignupModal';
import { useSelector } from 'react-redux';
import ConfirmModal from '../components/signup/ConfirmModal';
import { useNavigate } from 'react-router';

const PageContainer = styled(Container)`
  max-width: ${({ theme }) => theme.size.maxWidth};
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

export default function SignupPage() {
  const isModalOpen = useSelector((state) => state.openModalReducer);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const handleModalClick = () => {
    setConfirmOpen(!confirmOpen);
  };
  const handleOnclick = () => {
    setConfirmOpen(false);
    navigate('/login');
  };
  return (
    <>
      {confirmOpen && <ConfirmModal handleOnclick={handleOnclick} />}
      {isModalOpen ? <SignupModal /> : null}
      <PageContainer>
        <SignupTemplete handleModalClick={handleModalClick} />
      </PageContainer>
    </>
  );
}

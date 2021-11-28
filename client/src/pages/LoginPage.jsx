import React from 'react';
import { Container } from '../styles/common/index';
import styled from 'styled-components';
import LoginTemplete from '../components/login/LoginTemplete';
import ModalTemplete from '../components/login/adminmodal/ModalTemplete';
import { useSelector } from 'react-redux';

const PageContainer = styled(Container)`
  max-width: ${({ theme }) => theme.size.maxWidth};
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

export default function LoginPage() {
  const state = useSelector((state) => state.adminOpenReducer);
  return (
    <>
      {state.isOpen ? <ModalTemplete /> : null}
      <PageContainer>
        <LoginTemplete />
      </PageContainer>
    </>
  );
}

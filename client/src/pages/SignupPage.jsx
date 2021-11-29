import React, { useState } from 'react';
import { Container } from '../styles/common/index';
import styled from 'styled-components';
import SignupTemplete from '../components/signup/SignupTemplete';
import SignupModal from '../components/signup/SignupModal';
import NavBar from '../components/common/NavBar';

const PageContainer = styled(Container)`
  max-width: ${({ theme }) => theme.size.maxWidth};
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

export default function SignupPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalClick = () => {
    setModalOpen(!isModalOpen);
  };
  const handleCancelClick = () => {
    console.log('눌림');
    setModalOpen(!isModalOpen);
  };
  return (
    <>
      <PageContainer>
        {isModalOpen ? <SignupModal handleModalClick={handleModalClick} /> : null}
        <NavBar />
        <SignupTemplete handleCancelClick={handleCancelClick} />
      </PageContainer>
    </>
  );
}

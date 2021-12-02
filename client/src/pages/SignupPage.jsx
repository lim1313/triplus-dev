import React from 'react';
import { Container } from '../styles/common/index';
import styled from 'styled-components';
import SignupTemplete from '../components/signup/SignupTemplete';
import SignupModal from '../components/signup/SignupModal';
import { useSelector } from 'react-redux';

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

  const handleModalClick = () => {
    // setModalOpen(!isModalOpen);
  };
  return (
    <>
      {isModalOpen ? <SignupModal handleModalClick={handleModalClick} /> : null}
      <PageContainer>
        <SignupTemplete />
      </PageContainer>
    </>
  );
}

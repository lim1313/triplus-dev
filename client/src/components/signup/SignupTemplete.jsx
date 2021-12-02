import React from 'react';
import styled from 'styled-components';
import SignupHeader from './SignupHeader';
import SignupSection from './SignupSection';

const TempleteBlock = styled.div`
  min-width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 1rem 4rem;
  @media ${({ theme }) => theme.device.mobile} {
    padding-bottom: 2rem;
  }
`;

export default function SignupTemplete(props) {
  return (
    <TempleteBlock>
      <SignupHeader />
      <SignupSection props={props} />
    </TempleteBlock>
  );
}

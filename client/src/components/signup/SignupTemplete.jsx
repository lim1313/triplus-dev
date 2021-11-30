import React from 'react';
import styled from 'styled-components';
import SignupHeader from './SignupHeader';
import SignupSection from './SignupSection';

const TempleteBlock = styled.div`
  min-width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 1rem 2rem 1rem;
  margin: 0rem 0rem 3rem 0rem;
`;

export default function SignupTemplete(props) {
  return (
    <TempleteBlock>
      <SignupHeader />
      <SignupSection props={props} />
    </TempleteBlock>
  );
}

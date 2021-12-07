import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinLoad = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const Spin = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 auto;
  border: 3px solid ${({ theme }) => theme.color.gray};
  border-top: 3px solid pink;
  animation: ${spinLoad} 2s ease-in infinite;
`;

export default function SpinLoading() {
  return <Spin />;
}

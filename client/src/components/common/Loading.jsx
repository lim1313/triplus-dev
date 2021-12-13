/* eslint-disable react-hooks/exhaustive-deps*/
/* eslint-disable no-unused-vars */

import React, { useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ isMap }) => (isMap ? '100%' : '70vh')};

  @media ${({ theme }) => theme.device.mobile} {
    ${({ isMap }) =>
      isMap &&
      css`
        height: 175px;
      `}
  }
`;

const boxFade = keyframes`
  0% {
  background-image: url('/asset/loading/loading1.svg');
  }
  25% {
  background-image: url("/asset/loading/loading2.svg");
  }
  50% {
  background-image: url("/asset/loading/loading3.svg");
  }
  75% {
  background-image: url("/asset/loading/loading4.svg");
  }
  100% {
  background-image: url("/asset/loading/loading1.svg");
  }
`;

export const LoadingImg = styled.span`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 5px solid #fff;
  background-size: contain;
  animation: ${boxFade} 4s infinite;
  animation-timing-function: step-end;
`;

export default function Loading({ isMap }) {
  return (
    <Wrapper isMap={isMap}>
      <LoadingImg />
    </Wrapper>
  );
}

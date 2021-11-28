import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  z-index: 2;

  flex: 0 0 auto;
  width: 100%;
  height: 100%;
  padding: 1.5rem;

  overflow: auto;
  background-color: rgba(100, 150, 150, 1);

  @media ${({ theme }) => theme.device.mobile} {
    top: unset;
    bottom: 0;
    width: 100vw;
    height: calc(100vh - 3.8rem);
    transform: translateX(0);
    z-index: 999;
  }
`;

export default function CardModal({ modalInof, closeModal }) {
  return (
    <ModalWrapper>
      <button onClick={closeModal}>X</button>
      {modalInof.title}
    </ModalWrapper>
  );
}

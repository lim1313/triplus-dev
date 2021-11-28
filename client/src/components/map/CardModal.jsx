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
  background-color: rgba(100, 150, 150, 0.5);
`;

export default function CardModal({ modalInof, closeModal }) {
  return (
    <ModalWrapper>
      <button onClick={closeModal}>X</button>
      {modalInof.title}
    </ModalWrapper>
  );
}

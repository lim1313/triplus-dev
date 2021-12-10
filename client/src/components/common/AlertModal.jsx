import React from 'react';
import styled from 'styled-components';
import { Background, ModalTitle, ModalWrapper } from '../../styles/common/modal';

const TitleWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function AlertModal({ content, children, width }) {
  return (
    <Background>
      <ModalWrapper width={width}>
        {children || (
          <TitleWrapper>
            <ModalTitle>{content}</ModalTitle>
          </TitleWrapper>
        )}
      </ModalWrapper>
    </Background>
  );
}

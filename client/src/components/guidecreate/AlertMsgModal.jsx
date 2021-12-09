import React from 'react';
import { Background, ModalTitle, ModalWrapper } from '../../styles/common/modal';

export default function AlertMsgModal() {
  return (
    <Background>
      <ModalWrapper width='25rem'>
        <ModalTitle>정확한 정보를 기입해주세요</ModalTitle>
      </ModalWrapper>
    </Background>
  );
}

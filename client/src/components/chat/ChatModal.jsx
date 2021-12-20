import React from 'react';
import styled from 'styled-components';

import { ColorBtn, BorderBtn } from '../../styles/common/index';
import { Background, ModalWrapper, ModalTitle } from '../../styles/common/modal';

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: space-around;
  align-items: center;
`;

const YesBtn = styled(BorderBtn)`
  width: 5rem;
`;

const NoBtn = styled(ColorBtn)`
  width: 5rem;
`;

export default function ChatModal({ leaveRoomHandler, stayRoomHandler, exitRoom }) {
  return (
    <Background>
      <ModalWrapper>
        <ModalTitle>정말로 방에서 나가시겠어요?</ModalTitle>
        <ButtonWrapper>
          <NoBtn onClick={stayRoomHandler} palette='blue'>
            아니오
          </NoBtn>
          <YesBtn onClick={() => leaveRoomHandler(exitRoom)}>네</YesBtn>
        </ButtonWrapper>
      </ModalWrapper>
    </Background>
  );
}

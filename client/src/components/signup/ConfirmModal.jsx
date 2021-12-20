import React from 'react';
import styled from 'styled-components';
import { Background, ModalWrapper, ModalTitle } from '../../styles/common/modal';
import { ColorBtn } from '../../styles/common/index';

const OkBtn = styled(ColorBtn)`
  width: 8rem;
  color: ${({ theme }) => theme.color.black};
  background: ${({ theme }) => theme.color.lightGray};
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  flex: none;
  &:hover {
    background: ${({ theme }) => theme.color.blue};
    border: 1px solid ${({ theme }) => theme.color.blue};
    color: ${({ theme }) => theme.color.lightGray};
  }
`;

const BtnBlock = styled.div`
  margin: 1rem auto;
  display: flex;
  justify-content: center;
`;

export default function ConfirmModal(props) {
  const { handleOnclick } = props;
  const spanStyle = {
    color: '#3386f7',
  };

  return (
    <Background>
      <ModalWrapper>
        <ModalTitle>
          입력하신 이메일로 <br />
          인증 이메일을 발송했습니다. <br />
          <span style={spanStyle}>이메일 인증을 완료해주세요.</span>
        </ModalTitle>
        <BtnBlock>
          <OkBtn onClick={handleOnclick}>확인</OkBtn>
        </BtnBlock>
      </ModalWrapper>
    </Background>
  );
}

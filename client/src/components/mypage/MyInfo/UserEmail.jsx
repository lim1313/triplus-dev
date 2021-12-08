import React, { useState } from 'react';
import styled from 'styled-components';
import { BorderBtn, ColorBtn } from '../../../styles/common';
import Modal from '../../common/Modal';

const ModalWrapper = styled(Modal)``;

const ModalHeader = styled.header`
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
`;

const SectionWrapper = styled.section``;

const Title = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.blue};
  font-weight: 700;
`;
const InputWrapper = styled.div`
  display: flex;
  position: relative;
  margin: 0.5rem 0 2rem 0;
  justify-content: space-between;

  & input {
    width: 80%;
    height: 2rem;

    &:focus {
      outline: none;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    & input {
      width: 70%;
    }
  }
`;

const AlertMsg = styled.div`
  position: absolute;
  bottom: -1.5rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.red};
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & .btn {
    flex-grow: 1;
    margin: 0.2rem;
  }
`;

export default function UserEmail({ clickModal }) {
  const [alertMsg, setAlertMsg] = useState(null);

  const sendEmail = () => {
    setAlertMsg('*인증번호가 발송되었습니다');
  };

  return (
    <ModalWrapper onlyWrapper width='28rem'>
      <ModalHeader>이메일 변경</ModalHeader>
      <SectionWrapper>
        <Title>새로운 이메일</Title>
        <InputWrapper>
          <input type='text' placeholder='이메일 입력' />
          <ColorBtn palette='blue' onClick={sendEmail}>
            인증
          </ColorBtn>
          <AlertMsg>{alertMsg}</AlertMsg>
        </InputWrapper>
        <Title>인증번호</Title>
        <InputWrapper>
          <input type='text' placeholder='인증번호' />
        </InputWrapper>
        <BtnWrapper>
          <ColorBtn className='btn' palette='blue'>
            완료
          </ColorBtn>
          <BorderBtn className='btn' onClick={clickModal}>
            취소
          </BorderBtn>
        </BtnWrapper>
      </SectionWrapper>
    </ModalWrapper>
  );
}

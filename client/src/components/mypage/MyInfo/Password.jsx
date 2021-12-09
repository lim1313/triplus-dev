/*eslint-disable no-unused-vars*/

import React, { useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../../hooks/useInput';
import { ColorBtn } from '../../../styles/common';
import { ModalTitle } from '../../../styles/common/modal';
import Modal, { BtnWrapper, SelectBtn } from '../../common/Modal';

const BtnColor = styled(ColorBtn)`
  padding: 0.1em 1.1em;
  width: 50%;
  margin-right: ${({ marginRight }) => marginRight && '0.5rem'};
`;

const InputWrapper = styled.div`
  text-align: center;
  position: relative;
  margin: 1rem 0 1.5rem 0;
`;

const PWInput = styled.input`
  &:focus {
    outline: none;
  }
`;

const AlertMsg = styled.div`
  position: absolute;
  bottom: -1.4rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.red};

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.75rem;
  }
`;

const BtnSelect = styled(SelectBtn)`
  color: #fff;
  background: ${({ theme }) => theme.color.red};
  border: 1px solid ${({ theme }) => theme.color.red};

  &:hover {
    background: none;
    border: 1px solid ${({ theme }) => theme.color.red};
    color: ${({ theme }) => theme.color.red};
  }
`;

export default function Password() {
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, inputChange] = useInput('');
  const [alertMsg, setAlertMsg] = useState('hello');

  return (
    <>
      <BtnColor marginRight onClick={() => setOpenModal(true)}>
        비밀번호 수정
      </BtnColor>
      {openModal && (
        <Modal width='26rem'>
          <ModalTitle fontSize='1.1rem'>비밀번호 변경</ModalTitle>
          <InputWrapper>
            <div>현재 비밀번호</div>
            <PWInput type='password' value={inputValue} onChange={inputChange}></PWInput>
            <AlertMsg>{alertMsg}</AlertMsg>
          </InputWrapper>
          <InputWrapper>
            <div>새 비밀번호</div>
            <PWInput type='password' value={inputValue} onChange={inputChange}></PWInput>
            <AlertMsg>{alertMsg}</AlertMsg>
          </InputWrapper>
          <InputWrapper>
            <div>비밀번호 확인</div>
            <PWInput type='password' value={inputValue} onChange={inputChange}></PWInput>
            <AlertMsg>{alertMsg}</AlertMsg>
          </InputWrapper>
          <BtnWrapper>
            <BtnSelect>회원탈퇴</BtnSelect>
            <SelectBtn onClick={() => setOpenModal(false)}>취소</SelectBtn>
          </BtnWrapper>
        </Modal>
      )}
    </>
  );
}

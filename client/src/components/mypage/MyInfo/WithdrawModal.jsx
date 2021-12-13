import React, { useState } from 'react';
import styled from 'styled-components';
import { useError } from '../../../hooks/useError';
import { useInput } from '../../../hooks/useInput';
import { deleteUser } from '../../../network/my/http';
import { ModalTitle } from '../../../styles/common/modal';
import Modal, { BtnWrapper, SelectBtn } from '../../common/Modal';

const InputWrapper = styled.div`
  text-align: center;
  position: relative;
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

const SubText = styled.div`
  font-size: 1rem;
  margin: 1rem 0;
  text-align: center;
`;

const PWInput = styled.input`
  text-align: center;
  margin-bottom: 1.7rem;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const AlertMsg = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0.2rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.red};

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.75rem;
  }
`;

export default function WithdrawModal({ closeModal }) {
  const [inputValue, inputChange] = useInput('');
  const [alertMsg, setAlertMsg] = useState(null);
  const [isError] = useError();

  const withdrawUser = () => {
    if (!inputValue) return setAlertMsg('*비밀번호를 입력하세요');

    //TODO /my/withdraw
    deleteUser(inputValue).then((res) => {
      if (res === 401) return isError();
      else if (res === 400) {
        setAlertMsg('*비밀번호가 옳지 않습니다');
      } else if (res === 201) {
        isError('회원탈퇴가 완료되었습니다');
      } else if (res > 400) {
        alert('에러가 발생했습니다. 다시 시도해 주세요.');
      } else {
        console.log(res);
      }
    });
  };

  return (
    <Modal width='auto'>
      <ModalTitle fontSize='1.1rem'>회원탈퇴를 진행하시겠습니까?</ModalTitle>
      <SubText>비밀번호를 입력해주세요</SubText>
      <InputWrapper>
        <PWInput
          type='password'
          placeholder='비밀번호를 입력해 주세요'
          value={inputValue}
          onChange={inputChange}
        ></PWInput>
        <AlertMsg>{alertMsg}</AlertMsg>
      </InputWrapper>
      <BtnWrapper>
        <BtnSelect onClick={withdrawUser}>회원탈퇴</BtnSelect>
        <SelectBtn onClick={closeModal}>취소</SelectBtn>
      </BtnWrapper>
    </Modal>
  );
}

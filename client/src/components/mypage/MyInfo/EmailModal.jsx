import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useError } from '../../../hooks/useError';
import { useInput } from '../../../hooks/useInput';
import { postEmailCheck, postInfo } from '../../../network/my/http';
import { BorderBtn, ColorBtn } from '../../../styles/common';
import { ModalTitle } from '../../../styles/common/modal';
import { emailValidation } from '../../../utils/validation';
import Modal, { BtnWrapper, SelectBtn } from '../../common/Modal';
import EmailInput from './EmailInput';

const ModalHeader = styled.header`
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;

const BtnsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & .btn {
    flex-grow: 1;
    margin: 0.2rem;
  }
`;

const BtnColor = styled(ColorBtn)`
  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        cursor: not-allowed;
      }
    `}
`;

const BtnBorder = styled(BorderBtn)`
  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        cursor: not-allowed;
      }
    `}
`;

export default function EmailModal({ clickModal }) {
  const [newEmail, emailChange] = useInput('');
  const [verifyNum, verifyNumChange] = useInput('');
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertMsg2, setAlertMsg2] = useState(null);
  const [completeModal, setCompleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClickVerify, setIsClickVerify] = useState(false);
  const [isError] = useError();

  const sendEmail = () => {
    if (!emailValidation(newEmail)) {
      setAlertMsg('*이메일 형식에 맞춰 작성해 주세요.');
    } else {
      //TODO /my/email-check
      postEmailCheck(newEmail).then((res) => {
        if (res === 401) {
          isError();
        } else if (res > 400) {
          setAlertMsg('*인증번호 발송에 실패했습니다. 다시 시도해 주세요');
        } else if (res >= 500) {
          alert('서버 오류가 발생했습니다. 다음에 다시 시도해 주세요');
        } else {
          setAlertMsg('*인증번호가 발송되었습니다');
          setIsClickVerify(true);
        }
      });
    }
  };

  const submitClick = () => {
    isError();

    if (!emailValidation(newEmail)) {
      setAlertMsg('*올바른 이메일 형식으로 작성해 주세요');
    } else if (!isClickVerify) {
      setAlertMsg2('*이메일 인증을 진행하세요');
    } else if (!verifyNum) {
      setAlertMsg2('*올바른 인증번호를 입력하세요');
    } else {
      //TODO /my/email
      setIsLoading(true);
      postInfo({ email: newEmail, verifyKey: verifyNum }, 'email').then((res) => {
        if (res === 401) {
          isError();
        } else if (res >= 400) {
          setIsLoading(false);
          setAlertMsg(null);
          setAlertMsg2('*인증번호가 틀립니다. 올바른 인증번호를 입력하세요');
        } else if (res >= 500) {
          alert('서버 오류가 발생했습니다. 다음에 다시 시도해 주세요');
        } else {
          setIsLoading(false);
          setCompleteModal(true);
        }
      });
    }
  };

  const yesClick = () => {
    setCompleteModal(false);
    clickModal();
  };

  return (
    <>
      <Modal onlyWrapper width='28rem'>
        <ModalHeader>이메일 변경</ModalHeader>
        <section>
          <EmailInput
            email
            onClick={sendEmail}
            title='새로운 이메일'
            placeText='이메일 입력'
            value={newEmail}
            onChange={emailChange}
            disabled={isLoading}
            alertMsg={alertMsg}
          />
          <EmailInput
            title='인증번호'
            placeText='인증번호'
            value={verifyNum}
            onChange={verifyNumChange}
            disabled={isLoading}
            alertMsg={alertMsg2}
          />
          <BtnsWrapper>
            <BtnColor className='btn' palette='blue' onClick={submitClick} disabled={isLoading}>
              확인
            </BtnColor>
            <BtnBorder className='btn' onClick={clickModal} disabled={isLoading}>
              취소
            </BtnBorder>
          </BtnsWrapper>
        </section>
      </Modal>
      {completeModal && (
        <Modal>
          <ModalTitle>이메일 변경 완료</ModalTitle>
          <BtnWrapper>
            <SelectBtn onClick={yesClick}>확인</SelectBtn>
          </BtnWrapper>
        </Modal>
      )}
    </>
  );
}

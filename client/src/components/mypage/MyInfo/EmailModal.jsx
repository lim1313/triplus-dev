import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import styled, { css } from 'styled-components';
import { useInput } from '../../../hooks/useInput';
import { postEmailCheck, postInfo } from '../../../network/my/http';
import { exit } from '../../../redux/login/action';
import { BorderBtn, ColorBtn } from '../../../styles/common';
import { ModalTitle } from '../../../styles/common/modal';
import { emailValidation } from '../../../utils/validation';
import Modal, { BtnWrapper, SelectBtn } from '../../common/Modal';
import ModalInput from './ModalInput';

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

export default function UserEmail({ clickModal }) {
  const [inputValue, inputChange] = useInput('');
  const [inputValue2, inputChange2] = useInput('');
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertMsg2, setAlertMsg2] = useState(null);
  const [completeModal, setCompleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      // TODO POST /my/email-unCheck
      //   postEmailUnCheck().then((res) => {
      //     if (res === 401) {
      //       alert('로그인이 만료되었습니다. 다시 로그인해 주세요');
      //       dispatch(exit());
      //       navigate('/login', { replace: true });
      //     } else {
      //       console.log(res);
      //     }
      //   });
      // };
    };
  }, []);

  const sendEmail = () => {
    if (!emailValidation(inputValue)) {
      setAlertMsg('*올바른 이메일 형식으로 작성해 주세요');
    } else {
      //TODO /my/email-check
      postEmailCheck(inputValue).then((res) => {
        if (res === 401) {
          alert('로그인이 만료되었습니다. 다시 로그인해 주세요');
          dispatch(exit());
          navigate('/login', { replace: true });
        } else if (res > 400) {
          setAlertMsg('*인증번호 발송에 실패했습니다. 다시 시도해 주세요');
        } else if (res >= 500) {
          alert('서버 오류가 발생했습니다. 다음에 다시 시도해 주세요');
        } else {
          setAlertMsg('*인증번호가 발송되었습니다');
        }
      });
    }
  };

  const submitClick = () => {
    if (!emailValidation(inputValue)) {
      setAlertMsg('*올바른 이메일 형식으로 작성해 주세요');
    } else if (!inputValue2) {
      setAlertMsg2('*올바른 인증번호를 입력하세요');
    } else {
      //TODO /my/email
      setIsLoading(true);
      postInfo({ email: inputValue, verifyKey: inputValue2 }, 'email').then((res) => {
        if (res === 401) {
          alert('로그인이 만료되었습니다. 다시 로그인해 주세요');
          dispatch(exit());
          navigate('/login', { replace: true });
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
          <ModalInput
            email
            onClick={sendEmail}
            title='새로운 이메일'
            placeText='이메일 입력'
            value={inputValue}
            onChange={inputChange}
            disabled={isLoading}
            alertMsg={alertMsg}
          />
          <ModalInput
            title='인증번호'
            placeText='인증번호'
            value={inputValue2}
            onChange={inputChange2}
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

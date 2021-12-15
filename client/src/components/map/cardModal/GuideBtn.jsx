/*eslint-disable no-unused-vars*/

import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { useError } from '../../../hooks/useError';
import { rezGuide } from '../../../network/map/http';
import { ColorBtn } from '../../../styles/common';
import Chatting from './Chatting';

const ModalBottomBtn = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
`;

export const ModalBtn = styled(ColorBtn)`
  flex-grow: 1;
  color: ${({ chatting, theme }) => chatting && theme.color.blue};

  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.color.blue};
    border: 1px solid ${({ theme }) => theme.color.blue};
  }

  &:hover {
    ${({ completed }) =>
      completed &&
      css`
        cursor: not-allowed;
        background: ${({ theme }) => theme.color.red};
        border: 1px solid ${({ theme }) => theme.color.red};
        &:hover {
          color: #fff;
        }
      `}
  }

  ${({ theme, state }) =>
    state === 'COMPLETED' &&
    css`
      color: #fff;
      background-color: ${theme.color.gray};
      border: ${theme.color.gray};

      &:hover {
        cursor: not-allowed;
        background-color: ${theme.color.gray};
        border: ${theme.color.gray};
      }
    `}
`;

export default function GuideBtn({
  guideId,
  userId,
  userParticipate,
  state,
  closeModal,
  compoleteModal,
}) {
  const isLogin = useSelector((state) => state.loginReducer.isLogin);
  const [isError] = useError();

  const clickGuide = (id) => {
    if (!isLogin) return compoleteModal('login');
    if (state === 'COMPLETED') return;

    //TODO POST 가이드 신청
    rezGuide(id).then((res) => {
      const { status, data } = res;
      if (status === 401) {
        return isError();
      } else if (status === 204) {
        compoleteModal('success');
      } else if (status === 201) {
        data.message === 'same' ? compoleteModal('same') : compoleteModal('end');
      } else {
        alert('에러가 발생했습니다. 다시 시도해 주세요');
      }
      setTimeout(() => {
        closeModal();
      }, 2000);
    });
  };

  return (
    <ModalBottomBtn>
      {userParticipate ? (
        <ModalBtn palette='red' completed>
          예약완료
        </ModalBtn>
      ) : (
        <ModalBtn palette='blue' onClick={() => clickGuide(guideId, state)} state={state}>
          {state === 'COMPLETED' ? '예약마감' : '신청하기'}
        </ModalBtn>
      )}
      <Chatting userId={userId} state={state} />
    </ModalBottomBtn>
  );
}

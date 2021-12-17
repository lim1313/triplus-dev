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
    border: 1px solid ${({ theme }) => theme.color.blue};
    color: ${({ theme }) => theme.color.blue};
    background-color: white;
  }

  ${({ theme, state, completed, disabled }) =>
    (completed || state === 'FULL' || disabled) &&
    css`
      color: #fff;
      background-color: ${theme.color.gray};
      border: ${theme.color.gray};

      &:hover {
        cursor: not-allowed;
        background-color: ${theme.color.gray};
        border: ${theme.color.gray};
        color: #fff;
      }
    `}
`;

export default function GuideBtn({
  loginId,
  guideId,
  userId,
  userParticipate,
  state,
  closeModal,
  cardModalResult,
}) {
  const isLogin = useSelector((state) => state.loginReducer.isLogin);
  const [isError] = useError();

  const clickGuideBtn = (id, state) => {
    if (state === 'FULL') return;
    if (!isLogin) return cardModalResult('login');

    //TODO POST 가이드 신청
    rezGuide(id).then((res) => {
      const { status, data } = res;
      const msg = data && data.message;

      if (status === 401) {
        return isError();
      } else if (status === 204) {
        cardModalResult('success');
      } else if (status === 200) {
        msg === 'same'
          ? cardModalResult('same')
          : msg === 'main'
          ? cardModalResult('main')
          : cardModalResult('end');
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
        <ModalBtn
          palette='blue'
          onClick={() => clickGuideBtn(guideId, state)}
          state={state}
          disabled={loginId === userId}
        >
          {state === 'FULL' ? '예약마감' : '신청하기'}
        </ModalBtn>
      )}
      <Chatting userId={userId} state={state} loginId={loginId} cardModalResult={cardModalResult} />
    </ModalBottomBtn>
  );
}

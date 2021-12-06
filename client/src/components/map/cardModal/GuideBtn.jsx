import React from 'react';
import styled, { css } from 'styled-components';
import { rezGuide } from '../../../network/map/http';
import { ColorBtn } from '../../../styles/common';

const ModalBottomBtn = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
`;

const ModalBtn = styled(ColorBtn)`
  flex-grow: 1;
  color: ${({ chatting, theme }) => chatting && theme.color.blue};

  &:hover {
    ${({ completed, theme }) =>
      completed &&
      css`
        cursor: unset;
        background: ${({ theme }) => theme.color.red};
        border: 1px solid ${({ theme }) => theme.color.red};
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

export default function GuideBtn({ guideId, userParticipate, state }) {
  const clickGuide = (id) => {
    if (state === 'COMPLETED') return;

    //TODO POST 가이드 신청
    // 마감된 경우, 서버 에러
    rezGuide(id);
  };

  const clikcChat = (id) => {
    if (state === 'COMPLETED') return;

    console.log(id);
  };

  //TODO 로그인한 경우만 가능
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
      <ModalBtn
        palette='lightGray'
        chatting
        onClick={() => clikcChat(guideId, state)}
        state={state}
      >
        채팅하기
      </ModalBtn>
    </ModalBottomBtn>
  );
}

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
`;

export default function GuideBtn({ guideId, userParticipate }) {
  const clickGuide = (id) => {
    //TODO POST 가이드 신청
    // 마감된 경우, 서버 에러
    rezGuide(id);
  };

  const clikcChat = (id) => {
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
        <ModalBtn palette='blue' onClick={() => clickGuide(guideId)}>
          신청하기
        </ModalBtn>
      )}
      <ModalBtn palette='lightGray' chatting onClick={() => clikcChat(guideId)}>
        채팅하기
      </ModalBtn>
    </ModalBottomBtn>
  );
}

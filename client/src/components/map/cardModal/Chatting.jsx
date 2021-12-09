import React from 'react';
import { ModalBtn } from './GuideBtn';

export default function Chatting({ guideId, state }) {
  const clikcChat = (id) => {
    if (state === 'COMPLETED') return;
    console.log(id);
  };

  return (
    <ModalBtn palette='lightGray' chatting onClick={() => clikcChat(guideId, state)} state={state}>
      채팅하기
    </ModalBtn>
  );
}

import React from 'react';
import { ModalBtn } from './GuideBtn';
import { useNavigate } from 'react-router-dom';

import { createRoom } from '../../../network/chat/http';

export default function Chatting({ userId, state, loginId, cardModalResult }) {
  const navigate = useNavigate();

  const clikcChat = async (userId, state) => {
    if (state === 'COMPLETED') return;

    const isCreated = await createRoom(userId);
    console.log(isCreated);
    if (isCreated.data) {
      navigate('/chat');
    } else {
      return cardModalResult('login');
    }
  };

  return (
    <ModalBtn
      palette='lightGray'
      chatting
      onClick={() => clikcChat(userId, state)}
      state={state}
      disabled={loginId === userId}
    >
      채팅하기
    </ModalBtn>
  );
}

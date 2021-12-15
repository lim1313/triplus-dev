import React from 'react';
import { ModalBtn } from './GuideBtn';
import { useNavigate } from 'react-router-dom';

import { createRoom } from '../../../network/chat/http';

export default function Chatting({ userId, state }) {
  const navigate = useNavigate();

  const clikcChat = async (userId, state) => {
    if (state === 'COMPLETED') return;
    const isCreated = await createRoom(userId);

    if (isCreated.data) {
      navigate('/chat');
    } else {
      alert(isCreated);
    }
  };

  return (
    <ModalBtn palette='lightGray' chatting onClick={() => clikcChat(userId, state)} state={state}>
      채팅하기
    </ModalBtn>
  );
}

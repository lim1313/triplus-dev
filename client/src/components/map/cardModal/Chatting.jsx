import React from 'react';
import { ModalBtn } from './GuideBtn';
import { useNavigate } from 'react-router-dom';

import { createRoom } from '../../../network/chat/http';
import { useSelector } from 'react-redux';
import { useError } from '../../../hooks/useError';

export default function Chatting({ userId, state, loginId, cardModalResult }) {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.loginReducer.isLogin);
  const [isError] = useError();

  const clikcChat = async (userId, state) => {
    if (!isLogin) return cardModalResult('login');

    const isCreated = await createRoom(userId);

    if (isCreated.data) {
      navigate('/chat');
    } else if (isCreated === 401) {
      return isError();
    } else {
      alert('에러가 발생했습니다. 다시 시도해 주세요');
    }
  };

  return (
    <ModalBtn
      palette='lightGray'
      chatting
      onClick={() => clikcChat(userId, state)}
      disabled={loginId === userId}
      // state={state}
    >
      채팅하기
    </ModalBtn>
  );
}

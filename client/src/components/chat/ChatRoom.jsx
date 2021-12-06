/* eslint-disable no-unused-vars*/
import React, { useState } from 'react';
import styled from 'styled-components';

import { ColorBtn } from '../../styles/common/index';

const RoomContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ChatBoard = styled.div`
  width: 100%;
  height: 93%;
  background-color: #e9ebf6;
`;

const ChatMessageBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 7%;
  background-color: #fff;
  padding: 0.6rem 1.3em;
`;

const ChatMessage = styled.input`
  width: 90%;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.color.gray};
  height: 100%;
  margin: 0 1rem;
  padding: 0 1rem;
  font-size: 0.9rem;
`;

const ChatButton = styled(ColorBtn)`
  font-size: 0.9rem;
  width: 4rem;
  text-align: center;
  border-radius: 5px;
`;

export default function ChatRoom({ sendMessageHandler }) {
  const [msg, setMsg] = useState('');

  const msgInputHandler = (e) => {
    setMsg(e.target.value);
  };

  const submitHandler = (e) => {
    console.log('msg', msg);
    sendMessageHandler(e, msg);
  };

  return (
    <RoomContainer>
      <ChatBoard></ChatBoard>
      <ChatMessageBox>
        <ChatMessage placeholder='메세지를 입력하세요' onChange={msgInputHandler}></ChatMessage>
        <ChatButton palette='blue' onClick={submitHandler}>
          전송
        </ChatButton>
      </ChatMessageBox>
    </RoomContainer>
  );
}

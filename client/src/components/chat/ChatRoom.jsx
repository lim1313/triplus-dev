/* eslint-disable no-unused-vars*/
import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidV4 } from 'uuid';

import { ColorBtn } from '../../styles/common/index';

const RoomContainer = styled.div`
  width: 60vw;
  height: inherit;
`;

const ChatBoard = styled.div`
  width: 100%;
  height: 85.5vh;
  background-color: #e9ebf6;
  padding: 3rem;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BubbleBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  align-items: ${({ me }) => (me ? 'flex-end' : 'flex-start')};
`;

const ChatBubble = styled.div`
  width: 20vw;
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  background-color: #fff;
  word-break: break-word;
  ${({ me }) =>
    me &&
    css`
      background-color: ${({ theme }) => theme.color.blue};
      color: #fff;
    `}
`;

const ChatMessageBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 6.5vh;
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
  &:focus {
    outline: 2px solid ${({ theme }) => theme.color.lightBlue};
    border: 1px solid #fff;
  }
`;

const ChatButton = styled(ColorBtn)`
  font-size: 0.85rem;
  width: 4rem;
  text-align: center;
  border-radius: 5px;
`;

const NoSelectRoom = styled.div`
  display: flex;
  height: 92vh;
  justify-content: center;
  align-items: center;
  background-color: #e9ebf6;
  font-size: 3vw;
`;

export default function ChatRoom({ sendMessageHandler, userId, chatBubble, selectedRoom }) {
  const [msg, setMsg] = useState('');
  const msgInputHandler = (e) => {
    setMsg(e.target.value);
  };

  const submitHandler = (e) => {
    console.log('msg', msg);
    if (msg !== '') {
      sendMessageHandler(e, msg, userId, selectedRoom);
      setMsg('');
    }
  };

  const chatBoard = useRef(null);

  const scrollToBottom = () => {
    if (chatBoard.current) {
      chatBoard.current.scrollTop = chatBoard.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatBubble]);

  return (
    <RoomContainer>
      {selectedRoom ? (
        <>
          <ChatBoard ref={chatBoard}>
            {chatBubble.map((el) => {
              return (
                <>
                  <BubbleBox key={uuidV4()} me={el.userId === userId}>
                    <span style={{ marginBottom: '10px', marginRight: '5px', fontSize: '0.8rem' }}>
                      {el.userId}
                    </span>
                    <ChatBubble me={el.userId === userId}>{el.content}</ChatBubble>
                    <span style={{ marginBottom: '10px', marginRight: '5px', fontSize: '0.8rem' }}>
                      {el.time}
                    </span>
                  </BubbleBox>
                </>
              );
            })}
          </ChatBoard>
          <ChatMessageBox>
            <ChatMessage
              placeholder='메세지를 입력하세요'
              onChange={msgInputHandler}
              value={msg}
              onKeyPress={(e) => e.key === 'Enter' && submitHandler(e)}
            ></ChatMessage>
            <ChatButton palette='blue' onClick={submitHandler}>
              전송
            </ChatButton>
          </ChatMessageBox>
        </>
      ) : (
        <NoSelectRoom>방을 선택해주세요!</NoSelectRoom>
      )}
    </RoomContainer>
  );
}

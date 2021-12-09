/* eslint-disable no-unused-vars*/
import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidV4 } from 'uuid';

import { useSelector } from 'react-redux';

import { ColorBtn } from '../../styles/common/index';

const RoomContainer = styled.div`
  width: 60vw;
  height: inherit;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100vw;
    height: calc(90vh - ${({ theme }) => theme.size.navHeight});
  }
`;

const ChatBoard = styled.div`
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.size.navHeight} - 6.5vh);
  background-color: #e9ebf6;
  padding: 1rem 2rem;
  border: 1px solid #aeb8c2;

  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
  @media ${({ theme }) => theme.device.mobile} {
    height: calc(90vh - ${({ theme }) => theme.size.navHeight} - 6.5vh);
    padding: 0 0.5rem;
  }
`;

const BubbleBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0;
  align-items: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0.6rem 0;
  }
`;

const BubbleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ChatBubble = styled.div`
  max-width: 30vw;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  background-color: #fff;
  word-break: break-word;
  ${({ isUser }) =>
    isUser &&
    css`
      background-color: ${({ theme }) => theme.color.blue};
      color: #fff;
    `}
  @media ${({ theme }) => theme.device.mobile} {
    max-width: 45vw;
    font-size: 0.8rem;
  }
`;

const TimeSpan = styled.p`
  margin: 0;
  font-size: 0.6rem;
  color: ${({ theme }) => theme.color.gray};
  margin-right: ${({ isUser }) => (isUser ? '0.5rem' : 'none')};
  margin-left: ${({ isUser }) => (isUser ? 'none' : '0.5rem')};
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.2rem;
  }
`;

const ChatMessageBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 6.5vh;
  background-color: #fff;
  padding: 0.6rem 1.3rem;
  border-left: 1px solid #aeb8c2;
  border-right: 1px solid #aeb8c2;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0.5rem;
  }
`;

const ChatMessage = styled.input`
  width: 90%;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.color.gray};
  min-height: 1.2rem;
  height: 100%;
  margin: 0 1rem;
  padding: 0 1rem;
  font-size: 0.9rem;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.color.lightBlue};
    border: 1px solid #fff;
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 0.8rem;
    }
  }
`;

const ChatButton = styled(ColorBtn)`
  font-size: 0.85rem;
  min-height: 1.2rem;
  min-width: 2rem;
  width: 4rem;
  text-align: center;
  border-radius: 5px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.65rem;
  }
`;

const NoSelectRoom = styled.div`
  display: flex;
  flex-direction: column;
  height: 93vh;
  justify-content: center;
  align-items: center;
  background-color: #e9ebf6;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.darkGray};
  border: 1px solid #aeb8c2;
  @media ${({ theme }) => theme.device.mobile} {
    height: calc(90vh - ${({ theme }) => theme.size.navHeight});
  }
`;

const Img = styled.img`
  width: 25rem;
  @media ${({ theme }) => theme.device.mobile} {
    width: 60vw;
  }
`;

export default function ChatRoom({ sendMessageHandler }) {
  const [msg, setMsg] = useState('');

  const chatBubble = useSelector((state) => state.chatListReducer.chatList);
  const { userId, nickname } = useSelector((state) => state.chatUserInfoReducer);
  const chatRooms = useSelector((state) => state.chatUserInfoReducer.chatRooms);
  const currentRoom = useSelector((state) => state.currentRoomReducer.currentRoom);
  let partnerNickName;
  for (let chatRoom of chatRooms) {
    if (String(chatRoom.roomId) === currentRoom) {
      partnerNickName = chatRoom.chatPartnerNickName;
      break;
    }
  }
  console.log(userId);
  const msgInputHandler = (e) => {
    setMsg(e.target.value);
  };

  const submitHandler = (e) => {
    console.log('msg', msg);
    if (msg !== '') {
      sendMessageHandler(e, msg, userId, currentRoom);
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

  // <span style={{ marginBottom: '10px', marginRight: '5px', fontSize: '0.8rem' }}>
  //   {el.userId === userId ? nickname : partnerNickName}
  // </span>;

  return (
    <RoomContainer>
      {currentRoom ? (
        <>
          <ChatBoard id={currentRoom} ref={chatBoard}>
            {chatBubble.map((el) => {
              const isUser = el.userId === userId;
              return (
                <>
                  <BubbleBox key={uuidV4()} isUser={isUser}>
                    <BubbleWrapper>
                      {isUser ? (
                        <TimeSpan key={uuidV4()} isUser={isUser}>
                          {el.time}
                        </TimeSpan>
                      ) : null}
                      <ChatBubble key={uuidV4()} isUser={isUser}>
                        {el.content}
                      </ChatBubble>
                      {isUser ? null : (
                        <TimeSpan key={uuidV4()} isUser={isUser}>
                          {el.time}
                        </TimeSpan>
                      )}
                    </BubbleWrapper>
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
        <NoSelectRoom>
          <Img src='./asset/else/roomSelect.svg' alt='방 선택' />
          <p>방을 선택해주세요</p>
        </NoSelectRoom>
      )}
    </RoomContainer>
  );
}

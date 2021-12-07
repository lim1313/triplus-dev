import React from 'react';
import styled from 'styled-components';
import ChatRoom from './ChatRoom';

import SideContainer from './SideBar';

const Container = styled.div`
  display: flex;
  height: 93vh;
  background-color: orange;
  justify-content: center;
`;

const ChatBox = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  max-width: ${({ theme }) => theme.size.maxWidth};
  border: 3px solid red;
`;
export default function ChatContainer({
  sendMessageHandler,
  userId,
  // chatBubble,
  selectedRoom,
  selectRoomHandler,
  setUserId,
}) {
  return (
    <Container>
      <ChatBox>
        <SideContainer selectRoomHandler={selectRoomHandler} setUserId={setUserId}></SideContainer>
        <ChatRoom
          sendMessageHandler={sendMessageHandler}
          userId={userId}
          // chatBubble={chatBubble}
          selectedRoom={selectedRoom}
        ></ChatRoom>
      </ChatBox>
    </Container>
  );
}

import React from 'react';
import styled from 'styled-components';
import ChatRoom from './ChatRoom';

import SideContainer from './SideBar';

const Container = styled.div`
  display: flex;
  height: calc(100vh - ${({ theme }) => theme.size.navHeight});
  justify-content: center;
  @media ${({ theme }) => theme.device.mobile} {
    height: calc(99vh - ${({ theme }) => theme.size.navHeight});
  }
`;

const ChatBox = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  max-width: ${({ theme }) => theme.size.maxWidth};
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
`;
export default function ChatContainer({ sendMessageHandler, selectRoomHandler }) {
  return (
    <Container>
      <ChatBox>
        <SideContainer selectRoomHandler={selectRoomHandler}></SideContainer>
        <ChatRoom sendMessageHandler={sendMessageHandler}></ChatRoom>
      </ChatBox>
    </Container>
  );
}

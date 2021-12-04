import React from 'react';
import styled from 'styled-components';
import ChatRoom from './ChatRoom';

import SideContainer from './SideBar';

export default function ChatContainer() {
  const Container = styled.div`
    display: flex;
    height: 92vh;
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
  return (
    <Container>
      <ChatBox>
        <SideContainer></SideContainer>
        <ChatRoom></ChatRoom>
      </ChatBox>
    </Container>
  );
}

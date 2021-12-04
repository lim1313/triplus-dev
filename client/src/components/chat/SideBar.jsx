import React from 'react';
import styled from 'styled-components';

import ChatList from './ChatList';

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 13rem;
  height: 100%;
  border: 3px solid black;
  padding: 2rem;
`;

export default function SideBar() {
  return (
    <SideContainer>
      <ChatList></ChatList>
      <ChatList></ChatList>
      <ChatList></ChatList>
    </SideContainer>
  );
}

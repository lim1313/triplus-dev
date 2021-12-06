import React from 'react';
import styled from 'styled-components';
import { BorderBtn } from '../../styles/common/index';

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 13rem;
  height: inherit;
  border: 3px solid black;
  padding: 2rem;
`;

const ChatList = styled(BorderBtn)`
  font-size: 1rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.color.blue};
    color: #fff;
    border-color: ${({ theme }) => theme.color.blue};
  }
`;

export default function SideBar({ selectRoomHandler, setUserId }) {
  const clickRoomHandler = (e) => {
    selectRoomHandler(e.target.id);
  };

  const dummyHandler = (e) => {
    selectRoomHandler(e.target.id);
    setUserId('Jortier');
  };

  return (
    <SideContainer>
      <ChatList id='gogo' onClick={clickRoomHandler} palette='gray'>
        gogo
      </ChatList>
      <ChatList id='gogo' onClick={dummyHandler} palette='gray'>
        toto
      </ChatList>
      <ChatList id='lala' onClick={clickRoomHandler} palette='gray'>
        lala
      </ChatList>
    </SideContainer>
  );
}

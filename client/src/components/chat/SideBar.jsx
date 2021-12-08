import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import { BorderBtn } from '../../styles/common/index';

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 13rem;
  height: inherit;
  border: 3px solid black;
  padding: 2rem;
`;

const RoomName = styled(BorderBtn)`
  font-size: 1rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.color.blue};
    color: #fff;
    border-color: ${({ theme }) => theme.color.blue};
  }
`;

export default function SideBar({ selectRoomHandler }) {
  const roomList = useSelector((state) => state.chatUserInfoReducer.chatRooms);

  const clickRoomHandler = (e) => {
    selectRoomHandler(e.target.id);
  };

  return (
    <SideContainer>
      {roomList.map((el) => {
        return (
          <RoomName id={el.roomId} onClick={clickRoomHandler} key={el.chatPartnerId} palette='gray'>
            {el.chatPartnerNickName}
          </RoomName>
        );
      })}
    </SideContainer>
  );
}

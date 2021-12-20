import React from 'react';
import styled, { css } from 'styled-components';

import { GiCancel } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { BorderBtn } from '../../styles/common/index';

const SideContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 13rem;
  height: inherit;
  padding: 2rem;
  border-left: 1px solid #aeb8c2;
  z-index: 997;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100vw;
    flex-direction: row;
    height: 10vh;
    padding: 0.5rem 0.5rem;
  }
`;

const RoomName = styled(BorderBtn)`
  position: relative;
  font-size: 0.9rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  word-break: break-word;
  flex-shrink: 0;
  padding: 1rem;

  ${({ selected, partnerleft }) =>
    selected &&
    css`
      background-color: ${({ partnerleft, theme }) =>
        partnerleft === 'left' ? theme.color.lightRed : theme.color.blue};
      border-color: ${({ partnerleft, theme }) =>
        partnerleft === 'left' ? theme.color.lightRed : theme.color.blue};
      color: #fff;
    `}
  &:hover {
    background-color: ${({ partnerleft, theme }) =>
      partnerleft === 'left' ? theme.color.lightRed : theme.color.lightBlue};
    color: #fff;
    border-color: ${({ partnerleft, theme }) =>
      partnerleft === 'left' ? theme.color.lightRed : theme.color.lightBlue};
    ${({ selected }) =>
      selected &&
      css`
        background-color: ${({ partnerleft, theme }) =>
          partnerleft === 'left' ? theme.color.lightRed : theme.color.blue};
        color: #fff;
        border-color: ${({ partnerleft, theme }) =>
          partnerleft === 'left' ? theme.color.lightRed : theme.color.blue}; ;
      `}
    > .icon {
      color: #fff;
    }
  }
  > .icon {
    position: absolute;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    padding: 0;
    font-size: 1rem;
    top: 0;
    left: 3px;
    z-index: 5;
    color: ${({ partnerleft, theme }) =>
      partnerleft === 'left' ? theme.color.lightRed : theme.color.gray};
    transition: 0.2s;
    &:hover {
      cursor: pointer;
      color: ${({ partnerleft, theme }) =>
        partnerleft === 'left' ? theme.color.red : theme.color.darkGray};
    }
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 0.8rem;
    }
    ${({ selected }) =>
      selected &&
      css`
        color: #fff;
      `}
  }
  > .count {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.color.red};
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    font-size: 0.8rem;
    color: #fff;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 7.5rem;
    font-size: 0.8rem;
    padding: 0.7rem;
    margin: 0 0.5rem;
    word-break: keep-all;
  }
`;

export default function SideBar({ selectRoomHandler, iconClickHandler }) {
  const roomList = useSelector((state) => state.chatUserInfoReducer.chatRooms);
  const currentRoom = useSelector((state) => state.currentRoomReducer.currentRoom);
  const clickRoomHandler = (e) => {
    e.preventDefault();
    if (e.target.className === 'icon') return;
    selectRoomHandler(currentRoom, e.target.id);
  };

  const deleteRoomHandler = (e) => {
    e.preventDefault();
    let selectedRoom = e.target.id;
    if (!selectedRoom) selectedRoom = e.target.parentNode.id;
    iconClickHandler(selectedRoom);
  };

  return (
    <SideContainer>
      {roomList.map((el) => {
        return (
          <RoomName
            id={el.roomId}
            className='roomName'
            selected={String(el.roomId) === currentRoom}
            partnerleft={el.partnerLeft === 'left' ? 'left' : 'stay'}
            onClick={clickRoomHandler}
            key={uuidv4()}
            palette={el.partnerLeft ? 'lightRed' : 'gray'}
          >
            <div
              id={el.roomId}
              className='icon'
              onClick={deleteRoomHandler}
              partnerleft={el.partnerLeft === 'left' ? 'left' : 'stay'}
            >
              <GiCancel id={el.roomId} />
            </div>
            {el.chatPartnerNickName}
            {el.count > 0 && currentRoom !== String(el.roomId) ? (
              <div className='count'>{el.count > 99 ? '99+' : el.count}</div>
            ) : null}
          </RoomName>
        );
      })}
    </SideContainer>
  );
}

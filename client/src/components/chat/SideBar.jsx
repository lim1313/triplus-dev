import React from 'react';
import styled, { css } from 'styled-components';

import { useSelector } from 'react-redux';

import { BorderBtn } from '../../styles/common/index';

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 13rem;
  height: inherit;
  padding: 2rem;
  border-left: 1px solid #aeb8c2;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 10vh;
    padding: 0.5rem 0.5rem;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const RoomName = styled(BorderBtn)`
  font-size: 1rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  word-break: break-word;

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.color.blue};
      border-color: ${({ theme }) => theme.color.blue};
      color: #fff;
    `}
  &:hover {
    background-color: ${({ theme }) => theme.color.lightBlue};
    color: #fff;
    border-color: ${({ theme }) => theme.color.lightBlue};
    ${({ selected }) =>
      selected &&
      css`
        background-color: ${({ theme }) => theme.color.blue};
        color: #fff;
        border-color: ${({ theme }) => theme.color.blue};
      `}
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: inherit;
    font-size: 0.8rem;
    margin: 0 0.5rem;
    word-break: keep-all;
  }
`;

export default function SideBar({ selectRoomHandler }) {
  const roomList = useSelector((state) => state.chatUserInfoReducer.chatRooms);
  const currentRoom = useSelector((state) => state.currentRoomReducer.currentRoom);

  const clickRoomHandler = (e) => {
    selectRoomHandler(currentRoom, e.target.id);
  };

  return (
    <SideContainer>
      {roomList.map((el) => {
        return (
          <RoomName
            id={el.roomId}
            selected={String(el.roomId) === currentRoom}
            onClick={clickRoomHandler}
            key={el.chatPartnerId}
            palette='gray'
          >
            {el.chatPartnerNickName}
          </RoomName>
        );
      })}
    </SideContainer>
  );
}

//  import React from 'react';
//  import styled, { css } from 'styled-components';

//  import { GiCancel } from 'react-icons/gi';
//  import { useSelector } from 'react-redux';

//  import { BorderBtn } from '../../styles/common/index';

//  const SideContainer = styled.div`
//    position: relative;
//    display: flex;
//    flex-direction: column;
//    width: 13rem;
//    height: inherit;
//    padding: 2rem;
//    border-left: 1px solid #aeb8c2;
//    @media ${({ theme }) => theme.device.mobile} {
//      width: 100vw;
//      flex-direction: row;
//      height: 10vh;
//      padding: 0.5rem 0.5rem;
//      overflow: auto;
//      -ms-overflow-style: none;
//      scrollbar-width: none;

//      &::-webkit-scrollbar {
//        display: none;
//      }
//    }
//  `;

//  const RoomName = styled(BorderBtn)`
//    position: relative;
//    font-size: 0.9rem;
//    border-radius: 15px;
//    margin-bottom: 1rem;
//    word-break: break-word;
//    padding: 1rem;
//    ${({ selected }) =>
//      selected &&
//      css`
//        background-color: ${({ theme }) => theme.color.blue};
//        border-color: ${({ theme }) => theme.color.blue};
//        color: #fff;
//      `}
//    &:hover {
//      background-color: ${({ theme }) => theme.color.lightBlue};
//      color: #fff;
//      border-color: ${({ theme }) => theme.color.lightBlue};
//      ${({ selected }) =>
//        selected &&
//        css`
//          background-color: ${({ theme }) => theme.color.blue};
//          color: #fff;
//          border-color: ${({ theme }) => theme.color.blue};
//        `}
//    }

//    @media ${({ theme }) => theme.device.mobile} {
//      width: 9rem;
//      font-size: 0.8rem;
//      padding: 0.7rem;
//      margin: 0 0.5rem;
//      word-break: keep-all;
//    }
//  `;

//  const IconWrapper = styled.div`
//    position: absolute;
//    font-size: 1rem;
//    top: 0;
//    left: 3px;
//    &:hover {
//      color: ${({ theme }) => theme.color.darkGray};
//    }
//    @media ${({ theme }) => theme.device.mobile} {
//      font-size: 0.9rem;
//    }
//  `;

//  export default function SideBar({ selectRoomHandler, leaveRoomHandler }) {
//    const roomList = useSelector((state) => state.chatUserInfoReducer.chatRooms);
//    const currentRoom = useSelector((state) => state.currentRoomReducer.currentRoom);

//    const clickRoomHandler = (e) => {
//      console.log(e.target.id);
//      selectRoomHandler(currentRoom, e.target.id);
//    };

//    return (
//      <SideContainer>
//        {roomList.map((el) => {
//          return (
//            <RoomName
//              id={el.roomId}
//              selected={String(el.roomId) === currentRoom}
//              onClick={clickRoomHandler}
//              key={el.chatPartnerId}
//              palette='gray'
//            >
//              <IconWrapper onClick={leaveRoomHandler}>
//                <GiCancel id={el.roomId} />
//              </IconWrapper>
//              <span>{el.chatPartnerNickName}</span>
//            </RoomName>
//          );
//        })}
//      </SideContainer>
//    );
//  }

// import React from 'react';
// import styled, { css } from 'styled-components';

// import { useSelector } from 'react-redux';

// import { BorderBtn } from '../../styles/common/index';

// const SideContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 14rem;
//   height: inherit;
//   padding: 2rem;
//   border-left: 1px solid #aeb8c2;
//   @media ${({ theme }) => theme.device.mobile} {
//     flex-direction: row;
//     align-items: center;
//     width: 100%;
//     height: 10vh;
//     padding: 0.5rem 0.5rem;
//     overflow: auto;
//     -ms-overflow-style: none;
//     scrollbar-width: none;

//     &::-webkit-scrollbar {
//       display: none;
//     }
//   }
// `;

// const RoomName = styled(BorderBtn)`
//   position: relative;
//   font-size: 0.9rem;
//   border-radius: 15px;
//   margin-bottom: 1rem;
//   word-break: break-word;
//   padding: 1rem;
//   ${({ selected }) =>
//     selected &&
//     css`
//       background-color: ${({ theme }) => theme.color.blue};
//       border-color: ${({ theme }) => theme.color.blue};
//       color: #fff;
//     `}
//   &:hover {
//     background-color: ${({ theme }) => theme.color.lightBlue};
//     color: #fff;
//     border-color: ${({ theme }) => theme.color.lightBlue};
//     ${({ selected }) =>
//       selected &&
//       css`
//         background-color: ${({ theme }) => theme.color.blue};
//         color: #fff;
//         border-color: ${({ theme }) => theme.color.blue};
//       `}
//   }

//   @media ${({ theme }) => theme.device.mobile} {
//     width: inherit;
//     font-size: 0.8rem;
//     margin: 0 0.5rem;
//     word-break: keep-all;
//   }
// `;
// const IconWrapper = styled.div`
//   position: absolute;
//   font-size: 1rem;
//   top: 0;
//   left: 3px;
//   &:hover {
//     color: ${({ theme }) => theme.color.darkGray};
//   }
//   @media ${({ theme }) => theme.device.mobile} {
//     font-size: 0.9rem;
//   }
// `;

// export default function SideBar({ selectRoomHandler }) {
//   const roomList = useSelector((state) => state.chatUserInfoReducer.chatRooms);
//   const currentRoom = useSelector((state) => state.currentRoomReducer.currentRoom);

//   const clickRoomHandler = (e) => {
//     selectRoomHandler(currentRoom, e.target.id);
//   };

//   return (
//     <SideContainer>
//       {roomList.map((el) => {
//         return (
//           <RoomName
//             id={el.roomId}
//             selected={String(el.roomId) === currentRoom}
//             onClick={clickRoomHandler}
//             key={el.chatPartnerId}
//             palette='gray'
//           >
//             <IconWrapper
//               id={el.roomId}
//               selected={String(el.roomId) === currentRoom}
//               onClick={clickRoomHandler}
//               key={el.chatPartnerId}
//             >
//               {el.chatPartnerNickName}
//             </IconWrapper>
//           </RoomName>
//         );
//       })}
//     </SideContainer>
//   );
// }

import React from 'react';
import styled, { css } from 'styled-components';

import { GiCancel } from 'react-icons/gi';
import { useSelector } from 'react-redux';

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
  @media ${({ theme }) => theme.device.mobile} {
    width: 100vw;
    flex-direction: row;
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
  position: relative;
  font-size: 0.9rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  word-break: break-word;
  padding: 1rem;
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
    > button {
      color: #fff;
    }
  }
  > button {
    position: absolute;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    padding: 0;
    font-size: 1rem;
    top: 0;
    left: 3px;
    z-index: 5;
    color: ${({ theme }) => theme.color.gray};
    transition: 0.2s;
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.color.darkGray};
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

  @media ${({ theme }) => theme.device.mobile} {
    width: 9rem;
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
            onClick={clickRoomHandler}
            key={el.chatPartnerId}
            palette='gray'
          >
            <button
              id={el.roomId}
              className='icon'
              selectedRoom={el.roomId}
              onClick={deleteRoomHandler}
            >
              <GiCancel id={el.roomId} />
            </button>
            {el.chatPartnerNickName}
          </RoomName>
        );
      })}
    </SideContainer>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { logOut } from '../network/login/http';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { useSelector, useDispatch } from 'react-redux';
import {
  getUserChatInfo,
  changeCurrentRoom,
  getChatList,
  resetChatList,
} from '../redux/chat/action';
import { logoutUser } from '../redux/login/action';

import ChatContainer from '../components/chat/ChatContainer';
import ChatModal from '../components/chat/ChatModal';

dayjs.locale('ko');

export default function ChattingPage() {
  const socketRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.chatUserInfoReducer.userId);
  const currentRoom = useSelector((state) => state.currentRoomReducer.currentRoom);

  const [openModal, setOpenModal] = useState(false);
  const [exitRoom, setExitRoom] = useState(null);

  const currentRoomRef = useRef(currentRoom);
  const dateConversion = (date) => {
    let day;
    let time;
    if (date === 'expired') {
      day = 'expired';
      time = 'expired';
    } else {
      day = dayjs(date).format('YYYY년 M월 D일');
      time = dayjs(date).format('a hh:mm');
    }
    return { day, time };
  };

  // ? send, getMessage 함수 목록
  const editChat = (data) => {
    // const { day, time } = dateConversion(data.date);
    // const { user_id, content } = data;
    // const upState = {
    //   day,
    //   time,
    //   userId: user_id,
    //   content,
    // };

    return data.map((el) => {
      const { day, time } = dateConversion(el.date);
      delete el.date;
      const newData = {
        day: day,
        time: time,
        userId: el.user_id,
        content: el.content,
      };
      return newData;
    });
  };

  //* 채팅 페이지 초기 렌더링
  // TODO 1. Socket 연결하고 해당 유저의 정보 가져오기

  useEffect(() => {
    currentRoomRef.current = currentRoom;
    return () => {
      currentRoomRef.current = null;
    };
  }, [currentRoom]);

  useEffect(async () => {
    socketRef.current = io.connect(`${process.env.REACT_APP_HTTPSURL}`, {
      transports: ['websocket'],
    });

    socketRef.current.on('shouldLogin', async () => {
      await alert('로그인을 해야지만 채팅 서비스를 이용할 수 있습니다');
      logOut();
      dispatch(logoutUser());
      navigate('/login');
    });
  }, []);

  useEffect(() => {
    socketRef.current.on('getRooms', (data, isLeft, reset) => {
      if (isLeft === 'Internal Server Error' || reset === 'Internal Server Error')
        alert('잠시 후에 다시 시도해주세요');
      else if (isLeft === 'success') {
        dispatch(changeCurrentRoom(''));
      }

      dispatch(getUserChatInfo(data));
      if (currentRoomRef.current) {
        socketRef.current.emit('countReset', currentRoomRef.current);
      }
    });
  }, []);

  useEffect(() => {
    socketRef.current.on('resetRooms', (data, reset) => {
      if (reset === 'Internal Server Error') alert('잠시 후에 다시 시도해주세요');
      dispatch(getUserChatInfo(data));
    });
  }, []);

  useEffect(() => {
    // TODO 2. 룸 입장 후 채팅 데이터 받아오기
    socketRef.current.on('initialChat', (initialChat) => {
      const newChat = editChat(initialChat);
      dispatch(resetChatList(newChat));
    });
  }, []);

  // TODO. 서버 쪽에서 에러가 났을 경우
  useEffect(() => {
    socketRef.current.on('invalid', () => {
      alert('잠시 후에 다시 시도해주세요');
    });
  }, []);

  useEffect(() => {
    // TODO 3. 송신한 메세지 수신하기
    socketRef.current.on('getMessage', (data, selectedRoom) => {
      if (selectedRoom === currentRoomRef.current) {
        const newChat = editChat(data);
        dispatch(getChatList(newChat));
      }
    });
    return () => {
      socketRef.current.disconnect();
      dispatch(resetChatList([]));
      dispatch(
        getUserChatInfo({
          userId: '',
          nickname: '',
          chatRooms: [],
        })
      );
    };
  }, []);

  // TODO 4. 룸에 입장
  const selectRoomHandler = (currentRoom, selectedRoom) => {
    if (selectedRoom === '') return;
    dispatch(changeCurrentRoom(selectedRoom));
    socketRef.current.emit('joinRoom', currentRoom, selectedRoom);
  };

  // TODO 5. 문자 송신하기
  // ? socket 이벤트
  const sendMessageHandler = (e, msg, userId, selectedRoom) => {
    e.preventDefault();
    const date = dayjs();
    const DBform = {
      date,
      user_id: userId,
      content: msg,
    };
    socketRef.current.emit('sendMessage', DBform, selectedRoom);
  };

  const iconClickHandler = (selectedRoom) => {
    setExitRoom(selectedRoom);
    setOpenModal(true);
  };

  const leaveRoomHandler = (exitRoom) => {
    setOpenModal(false);
    const DBform = {
      date: 'expired',
      user_id: userId,
      content: 'nothing',
    };
    setExitRoom('');
    socketRef.current.emit('leaveRoom', DBform, exitRoom);
  };

  const stayRoomHandler = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ChatContainer
        sendMessageHandler={sendMessageHandler}
        selectRoomHandler={selectRoomHandler}
        iconClickHandler={iconClickHandler}
      ></ChatContainer>
      {openModal && (
        <ChatModal
          leaveRoomHandler={leaveRoomHandler}
          stayRoomHandler={stayRoomHandler}
          exitRoom={exitRoom}
        ></ChatModal>
      )}
    </>
  );
}

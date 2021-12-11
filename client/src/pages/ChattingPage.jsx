/* eslint-disable no-unused-vars*/
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

import Loading from '../components/common/Loading';
import ChatContainer from '../components/chat/ChatContainer';

dayjs.locale('ko');

export default function ChattingPage() {
  const socketRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.chatUserInfoReducer.userId);
  const currentRoom = useSelector((state) => state.currentRoomReducer.currentRoom);
  const isLogin = useSelector((state) => state.loginReducer.isLogin);

  const dateConversion = (date) => {
    const day = dayjs(date).format('YYYY년 M월 D일');
    const time = dayjs(date).format('a hh:mm');
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
  useEffect(async () => {
    console.log(socketRef.current);

    socketRef.current = io.connect(`${process.env.REACT_APP_HTTPSURL}`, {
      transports: ['websocket'],
    });

    socketRef.current.on('shouldLogin', async () => {
      console.log('shouldLogin');
      await alert('로그인을 해야지만 채팅 서비스를 이용할 수 있습니다');
      logOut();
      dispatch(logoutUser());
      navigate('/login');
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socketRef.current.on('getRooms', (data) => {
      console.log('getRooms');
      dispatch(getUserChatInfo(data));
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // TODO 2. 룸 입장 후 채팅 데이터 받아오기
    socketRef.current.on('initialChat', (initialChat) => {
      console.log('initialChat');
      const newChat = editChat(initialChat);
      dispatch(resetChatList(newChat));
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // TODO 3. 송신한 메세지 수신하기
    socketRef.current.on('getMessage', (data) => {
      console.log('getMessage');
      const newChat = editChat(data);
      dispatch(getChatList(newChat));
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // TODO 4. 룸에 입장
  const selectRoomHandler = (currentRoom, selectedRoom) => {
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

  return (
    <ChatContainer
      sendMessageHandler={sendMessageHandler}
      selectRoomHandler={selectRoomHandler}
    ></ChatContainer>
  );
}

/* eslint-disable no-unused-vars*/
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { useSelector, useDispatch } from 'react-redux';
import {
  getUserChatInfo,
  changeCurrentRoom,
  getChatList,
  resetChatList,
} from '../redux/chat/action';

import Loading from '../components/common/Loading';
import ChatContainer from '../components/chat/ChatContainer';

dayjs.locale('ko');

export default function ChattingPage() {
  const socketRef = useRef();

  const chatList = useSelector((state) => state.chatListReducer.chatList);
  const currentRoom = useSelector((state) => state.currentRoomReducer.currentRoom);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const dateConversion = (date) => {
    const day = dayjs(date).format('YYYY년 M월 D일');
    const time = dayjs(date).format('a hh시 mm분');
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
    socketRef.current = io.connect(`${process.env.REACT_APP_HTTPSURL}`, {
      transports: ['websocket'],
    });

    socketRef.current.on('getRooms', (data) => {
      // TODO userId 가 빈문자열로 왔을 때 로그인하게끔 유도
      dispatch(getUserChatInfo(data));
    });
  }, []);

  // TODO 2. 룸 입장 후 채팅 데이터 받아오기

  useEffect(() => {
    socketRef.current.on('initialChat', (initialChat) => {
      console.log('야');
      console.log(initialChat);
      const newChat = editChat(initialChat);
      dispatch(resetChatList(newChat));
    });
  }, []);

  // TODO 3. 송신한 메세지 수신하기
  useEffect(() => {
    socketRef.current.on('getMessage', (data) => {
      console.log('get');
      const newChat = editChat(data);
      dispatch(getChatList(newChat));
    });
  }, []);

  // TODO 4. 룸에 입장
  const selectRoomHandler = (selectedRoom) => {
    console.log(selectedRoom);
    dispatch(changeCurrentRoom(selectedRoom));
    socketRef.current.emit('joinRoom', selectedRoom);
  };

  // TODO 5. 문자 송신하기
  // ? socket 이벤트
  const sendMessageHandler = (e, msg, userId, selectedRoom) => {
    e.preventDefault();
    // firefox 를 위해서 date와 DBdate 로 분기
    const date = dayjs();
    const DBdate = dayjs().format('YYYY.MM.DD hh:mm:ss:SSS');

    const DBform = {
      date,
      user_id: userId,
      content: msg,
    };
    socketRef.current.emit('sendMessage', DBform, selectedRoom);
  };

  return isLoading ? (
    <Loading></Loading>
  ) : (
    <ChatContainer
      sendMessageHandler={sendMessageHandler}
      selectRoomHandler={selectRoomHandler}
    ></ChatContainer>
  );
}

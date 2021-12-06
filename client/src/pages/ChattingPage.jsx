/* eslint-disable no-unused-vars*/
import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import Loading from '../components/common/Loading';
import ChatContainer from '../components/chat/ChatContainer';

dayjs.locale('ko');

export default function ChattingPage() {
  const isLoading = false;
  const socketRef = useRef();
  const [userId, setUserId] = useState('Je-chan');
  const [selectedRoom, setSelectedRoom] = useState('gogo');
  const [chatBubble, setChatBubble] = useState([]);

  const dateConversion = (date) => {
    const day = dayjs(date).format('YYYY년 M월 D일');
    const time = dayjs(date).format('A hh시 mm분');

    return { day, time };
  };

  // ? send, getMessage 함수 목록
  const myChatBubble = (DBform) => {
    const { day, time } = dateConversion(DBform.date);
    const { user_id: userId, content } = DBform;
    const upState = {
      day,
      time,
      userId,
      content,
    };

    setChatBubble([...chatBubble, upState]);
  };

  //* 채팅 페이지 초기 렌더링
  // TODO 1. Socket 연결하기
  useEffect(() => {
    socketRef.current = io.connect(`${process.env.REACT_APP_HTTPSURL}`, {
      transports: ['websocket'],
    });
    console.log(socketRef.current);
  }, []);

  // TODO 2. getMessage
  useEffect(() => {
    socketRef.current.on('getMessage', (data) => {
      console.log(data);
      myChatBubble(data);
    });
  });

  // * 방에 입장
  const selectRoomHandler = (selectedRoom) => {
    console.log(selectedRoom);
    socketRef.current.emit('enterRoom', selectedRoom);
  };

  // * 문자 보내기
  // ? socket 이벤트
  const sendMessageHandler = (e, msg, userId, selectedRoom) => {
    e.preventDefault();
    const date = dayjs().format('YYYY.MM.DD hh:mm:ss:SSS');
    const DBform = {
      date,
      user_id: userId,
      content: msg,
    };

    socketRef.current.emit('sendMessage', DBform, selectedRoom, () => {
      console.log(DBform);
      myChatBubble(DBform);
    });
  };

  return isLoading ? (
    <Loading></Loading>
  ) : (
    <ChatContainer
      sendMessageHandler={sendMessageHandler}
      userId={userId}
      chatBubble={chatBubble}
      selectedRoom={selectedRoom}
      selectRoomHandler={selectRoomHandler}
      // setUserId 는 없어져야 함
      setUserId={setUserId}
    ></ChatContainer>
  );
}

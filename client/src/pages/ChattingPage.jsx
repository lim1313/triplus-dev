/* eslint-disable no-unused-vars*/
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { useDispatch } from 'react-redux';
import { getUserChatInfo, getChatList } from '../redux/chat/action';

import Loading from '../components/common/Loading';
import ChatContainer from '../components/chat/ChatContainer';

dayjs.locale('ko');

export default function ChattingPage() {
  const socketRef = useRef();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('Je-chan');
  const [selectedRoom, setSelectedRoom] = useState(null);
  // const [chatBubble, setChatBubble] = useState([]);

  const dateConversion = (date) => {
    const day = dayjs(date).format('YYYY년 M월 D일');
    const time = dayjs(date).format('a hh시 mm분');

    return { day, time };
  };

  // ? send, getMessage 함수 목록
  const myChatBubble = (data) => {
    // console.log('useIt');
    const { day, time } = dateConversion(data.date);
    const { user_id, content } = data;
    const upState = {
      day,
      time,
      userId: user_id,
      content,
    };
    // console.log('1', chatBubble);

    // setChatBubble((chatBubble) => [...chatBubble, upState]);

    dispatch(getChatList(upState));
  };

  //* 채팅 페이지 초기 렌더링
  // TODO 1. Socket 연결하고 해당 유저의 정보 가져오기
  useEffect(() => {
    socketRef.current = io.connect(`${process.env.REACT_APP_HTTPSURL}`, {
      transports: ['websocket'],
    });
  }, []);

  // TODO 2. getMessage
  useEffect(() => {
    socketRef.current.on('getMessage', (data) => {
      console.log('get');
      // console.log(chatBubble);
      myChatBubble(data);
    });
  }, []);

  // TODO 3. 룸에 입장
  const selectRoomHandler = (selectedRoom) => {
    console.log(selectedRoom);
    setSelectedRoom(selectedRoom);
    socketRef.current.emit('joinRoom', selectedRoom);
  };

  // TODO 4. 문자 보내기
  // ? socket 이벤트
  const sendMessageHandler = (e, msg, userId, selectedRoom) => {
    e.preventDefault();
    // firefox 를 위해서 date와 DBdate 로 분기
    const date = dayjs();
    const DBdate = dayjs().format('YYYY.MM.DD hh:mm:ss:SSS');

    const DBform = {
      DBdate,
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
      userId={userId}
      // chatBubble={chatBubble}
      selectedRoom={selectedRoom}
      selectRoomHandler={selectRoomHandler}
      // setUserId 는 없어져야 함
      setUserId={setUserId}
    ></ChatContainer>
  );
}

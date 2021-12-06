import React, { useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

import Loading from '../components/common/Loading';
import ChatContainer from '../components/chat/ChatContainer';

export default function ChattingPage() {
  const isLoading = false;
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(`${process.env.REACT_APP_HTTPSURL}`, {
      transports: ['websocket'],
    });
    console.log(io.connect(`${process.env.REACT_APP_HTTPSURL}`));
    console.log(socketRef.current);
  }, []);

  useEffect(() => {
    socketRef.current.on('sendMessage', (data) => {});
  }, []);

  const sendMessageHandler = (e, msg) => {
    e.prevent.default();
    socketRef.current.emit('sendMessage', msg, () => {
      console.log(msg);
    });
  };

  return isLoading ? (
    <Loading></Loading>
  ) : (
    <ChatContainer sendMessageHandler={sendMessageHandler}></ChatContainer>
  );
}

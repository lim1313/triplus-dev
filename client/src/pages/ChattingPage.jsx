import React from 'react';

import Loading from '../components/common/Loading';
import ChatContainer from '../components/chat/ChatContainer';

export default function ChattingPage() {
  const isLoading = false;
  return isLoading ? <Loading></Loading> : <ChatContainer></ChatContainer>;
}

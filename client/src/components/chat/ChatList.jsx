import React from 'react';
import styled from 'styled-components';
import { BorderBtn } from '../../styles/common/index';

const ListBtn = styled(BorderBtn)`
  font-size: 1rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.color.blue};
    color: #fff;
    border-color: ${({ theme }) => theme.color.blue};
  }
`;

export default function ChatList() {
  return <ListBtn palette='gray'>가이드 1</ListBtn>;
}

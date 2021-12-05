import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../common';

export const LiWrapper = styled.li`
  flex-grow: 1;
  margin-right: ${({ marginRight }) => marginRight};

  & .title {
    color: ${({ theme }) => theme.color.gray};
    font-size: 1rem;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BtnColor = styled(ColorBtn)`
  padding: 0.1em 0.7em;
`;

export const UserInfo = ({ title, content, marginRight }) => {
  return (
    <LiWrapper marginRight={marginRight}>
      <div className='title'>{title}</div>
      <NameWrapper>
        <div className='content'>{content}</div>
        <BtnColor palette='blue'>수정</BtnColor>
      </NameWrapper>
    </LiWrapper>
  );
};

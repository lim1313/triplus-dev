import React from 'react';
import styled from 'styled-components';
import { ImMan, ImWoman } from 'react-icons/im';

export const User = styled.div`
  margin: ${({ card }) => card || '1rem'};
  text-align: ${({ card }) => card || 'center'};

  & .nick {
    color: ${({ theme }) => theme.color.gray};
    font-size: ${({ card }) => (card ? '0.8rem' : '1rem')};
  }

  & .userNick {
    font-size: ${({ card }) => (card ? '1rem' : '1.3rem')};
  }
  & .gender {
    display: inline-block;
    width: ${({ card }) => (card ? '1.2rem' : '1.4rem')};
    height: ${({ card }) => (card ? '1.2rem' : '1.4rem')};
    border-radius: 0.7rem;
    margin-left: ${({ card }) => card || '0.5rem'};
    color: #fff;
    background-color: ${({ theme, gender, card }) =>
      card || (gender ? theme.color.red : theme.color.blue)};
  }
  & .icon {
    position: relative;
    color: ${({ theme, gender, card }) => card && (+gender ? theme.color.red : theme.color.blue)};
    top: 1px;
  }

  @media ${({ theme }) => theme.device.mobile} {
    padding-left: 10rem;
  }
`;

export const UserNick = ({ gender, nickName, card, margin }) => {
  return (
    <User gender={gender} card={card} margin={margin}>
      <div>
        <span className='nick'>{card || '가이드'} 닉네임</span>
        <span className='gender'>
          {+gender ? <ImWoman className='icon' /> : <ImMan className='icon' />}
        </span>
      </div>
      <div className='userNick'>{nickName}</div>
    </User>
  );
};

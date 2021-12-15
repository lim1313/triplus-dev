import React from 'react';
import styled from 'styled-components';
import { ImMan, ImWoman } from 'react-icons/im';

export const Profile = styled.div`
  background-image: url(${({ userImg }) => userImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  background-color: ${({ userImg }) => (userImg ? '#fff' : 'rgba(246, 247, 250, 1)')};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 3px solid ${({ theme }) => theme.color.lightGray};
  border-radius: calc(${({ height }) => height} / 2);
  margin-right: ${({ marginRight }) => marginRight};
  margin: ${({ margin }) => margin};

  @media ${({ theme }) => theme.device.mobile} {
    width: ${({ mWidth }) => mWidth};
    height: ${({ mHeight }) => mHeight};
    border-radius: calc(${({ mHeight }) => mHeight} / 2);
  }
`;

export const CardModalSubTitle = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.color.blue};
  margin: 2.5rem 0 1rem 0;

  @media ${({ theme }) => theme.device.mobile} {
  }
`;

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

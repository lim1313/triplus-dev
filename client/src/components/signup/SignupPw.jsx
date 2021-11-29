import React from 'react';
import { InputBlock, LoginInput, LoginLabel } from '../../styles/login/LoginInput';
import styled from 'styled-components';
import { AiOutlineLock, AiFillLock } from 'react-icons/ai';

const CheckMessage = styled.span`
  color: ${({ theme }) => theme.color.red};
`;
const IconBlock = styled.div`
  position: absolute;
  left: 94%;
  top: 27%;
  & .icon {
    font-size: 1.5rem;
    color: #08a600;
  }
  & .nofill {
    color: gray;
  }
`;

export default function SignupPw(props) {
  const {
    value,
    handleInputChange,
    pwMessage,
    handlePwBlur,
    valid,
    checkValue,
    handleCheckBlur,
    checkMessage,
  } = props;
  return (
    <>
      <InputBlock>
        <LoginLabel for='pwInput'>PASSWORD</LoginLabel>
        <LoginInput
          id='pwInput'
          placeholder='비밀번호'
          type='password'
          value={value}
          onChange={handleInputChange}
          name='password'
          onBlur={handlePwBlur}
        />
        <IconBlock>
          {!valid.password ? (
            <AiOutlineLock className='icon nofill' />
          ) : (
            <AiFillLock className='icon' />
          )}
        </IconBlock>
        <CheckMessage>{pwMessage}</CheckMessage>
      </InputBlock>
      <InputBlock>
        <LoginLabel for='pwCheck'>CHECK PASSWORD</LoginLabel>
        <LoginInput
          id='pwCheck'
          placeholder='비밀번호 확인'
          type='password'
          name='check'
          onChange={handleInputChange}
          value={checkValue}
          onBlur={handleCheckBlur}
        />
        <IconBlock>
          {!valid.check ? (
            <AiOutlineLock className='icon nofill' />
          ) : (
            <AiFillLock className='icon' />
          )}
        </IconBlock>
        <CheckMessage>{checkMessage}</CheckMessage>
      </InputBlock>
    </>
  );
}

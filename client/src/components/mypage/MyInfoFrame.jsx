/*eslint-disable no-unused-vars*/

import React, { useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../hooks/useInput';
import { postInfo } from '../../network/my/http';
import { ColorBtn } from '../../styles/common';

export const LiWrapper = styled.li`
  z-index: 2;
  flex-grow: 1;
  flex-basis: ${({ user }) => user && '50%'};

  & .title {
    color: ${({ theme }) => theme.color.gray};
    font-size: 1rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: 1.2em;
    & .title {
      font-size: 0.92rem;
    }
  }
`;

const NameWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
`;

const ChangeInput = styled.input.attrs({ type: 'text' })`
  width: ${({ user }) => (user ? '70%' : '80%')};
  font-size: 1.2rem;
  &:focus {
    outline: none;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
    width: ${({ user }) => (user ? '60%' : '70%')};
  }
`;

const BtnColor = styled(ColorBtn)`
  padding: 0.1em 0.7em;
  flex-shrink: 0;
`;

const AlertMsg = styled.div`
  position: absolute;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.color.red};
  top: 2.1rem;
  left: 0;

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.73rem;
    top: 1.9rem;
  }
`;

export const UserInfo = ({ title, content, marginRight, noBtn, user }) => {
  const [isChange, setIsChange] = useState(false);
  const [inputValue, inputChange] = useInput(content);
  const [isAlert, setIsAlert] = useState(false);

  const changeContent = (e) => {
    if (isChange) {
      if ((title === 'nickname' || title === 'e-mail') && !inputValue.length) {
        return setIsAlert(true);
      }
      console.log(content);
      // TODO POST /개인정보 변경
      postInfo(inputValue, title).then(() => {
        setIsAlert(false);
        setIsChange(!isChange);
      });

      // setIsAlert(false);
      // setIsChange(!isChange);
    } else {
      setIsChange(!isChange);
    }
  };

  return (
    <LiWrapper marginRight={marginRight} user={user}>
      <div className='title'>{`${title}`}</div>
      <NameWrapper>
        {isChange ? (
          <ChangeInput
            user={user}
            value={inputValue}
            onChange={inputChange}
            maxLength={user && '8'}
            placeholder={title}
          />
        ) : (
          <div>{inputValue}</div>
        )}
        {noBtn || (
          <BtnColor palette='blue' onClick={changeContent}>
            {isChange ? '완료' : '수정'}
          </BtnColor>
        )}
        {isAlert && <AlertMsg>*필수 입력 사항</AlertMsg>}
      </NameWrapper>
    </LiWrapper>
  );
};

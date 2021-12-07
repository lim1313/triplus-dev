import React, { useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../hooks/useInput';
// import { postNickName } from '../../network/my/http';
import { ColorBtn } from '../../styles/common';

export const LiWrapper = styled.li`
  z-index: 2;
  flex-grow: 1;
  flex-basis: ${({ user }) => user && '50%'};

  & .title {
    color: ${({ theme }) => theme.color.gray};
    font-size: 1rem;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChangeInput = styled.input.attrs({ type: 'text', maxLength: '8' })`
  width: ${({ user }) => (user ? '70%' : '80%')};
  font-size: 1.2rem;
  &:focus {
    outline: none;
  }
`;

const BtnColor = styled(ColorBtn)`
  padding: 0.1em 0.7em;
`;

export const UserInfo = ({ title, content, marginRight, noBtn, user }) => {
  const [isChange, setIsChange] = useState(false);
  const [inputValue, onChange] = useInput(content);

  const changeContent = (e) => {
    if (isChange) {
      if (!inputValue.length) return;

      // TODO POST /개인정보 변경
      // postNickName(inputValue,title).then(() => {
      //   setIsChange(!isChange);
      // });

      setIsChange(!isChange);
    } else {
      setIsChange(!isChange);
    }
  };

  return (
    <LiWrapper marginRight={marginRight} user={user}>
      <div className='title'>{title}</div>
      <NameWrapper>
        {isChange ? (
          <ChangeInput user={user} value={inputValue} onChange={onChange} />
        ) : (
          <div>{inputValue}</div>
        )}
        {noBtn || (
          <BtnColor palette='blue' onClick={changeContent}>
            {isChange ? '완료' : '수정'}
          </BtnColor>
        )}
      </NameWrapper>
    </LiWrapper>
  );
};

/*eslint-disable no-unused-vars*/

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../../hooks/useInput';
import { postInfo } from '../../../network/my/http';
import { ColorBtn } from '../../../styles/common';
import EmailModal from './EmailModal';
import { nickValidation } from '../../../utils/validation';
import { useError } from '../../../hooks/useError';

export const LiWrapper = styled.li`
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
  width: ${({ user }) => (user ? '60%' : '70%')};
  font-size: 1.2rem;

  &:focus {
    outline: none;
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.9rem;
    width: ${({ user }) => (user ? '60%' : '70%')};
  }
`;

const DivInput = styled.div`
  word-break: break-word;
`;

const BtnColor = styled(ColorBtn)`
  padding: 0.1em 0.7em;
  flex-shrink: 0;
  margin-left: 0.5rem;

  &:hover {
    cursor: ${({ disabled }) => disabled && 'not-allowed'};
  }

  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: ${({ twoBtn }) => twoBtn && '0.5rem'};
  }
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

export const UserInfo = ({ title, content, marginRight, noBtn, user, social }) => {
  const [isChange, setIsChange] = useState(false);
  const [inputValue, inputChange] = useInput(content);
  const [isAlert, setIsAlert] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const inputRef = useRef();
  const [isError] = useError();

  //* 변경된 유저 정보 POST 서버 요청
  const changeContent = (e) => {
    if (isChange) {
      if (title === 'e-mail' && !inputValue.length) return setIsAlert('*필수 입력 사항');
      if (title === 'nickname' && !nickValidation(inputValue))
        return setIsAlert('*3~8자리의 한글, 영문, 숫자만 가능합니다.');

      // TODO POST /개인정보 변경
      postInfo(inputValue, title).then((res) => {
        if (res === 401) return isError();
        else if (res === 204) {
          return setIsAlert(`이미 존재하는 ${title === 'nickname' ? '닉네임' : title}입니다.`);
        } else if (res === 201) {
          setIsAlert(null);
        } else {
          alert('에러가 발생했습니다. 다시 시도해 주세요.');
        }
        setIsChange(!isChange);
      });
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
            ref={inputRef}
            user={user}
            value={inputValue}
            onChange={inputChange}
            maxLength={user && '8'}
            placeholder={title}
          />
        ) : (
          <DivInput>{inputValue}</DivInput>
        )}
        {noBtn || (
          <BtnColor
            palette='blue'
            onClick={title === 'e-mail' ? () => setOpenModal(true) : changeContent}
            disabled={social}
          >
            {isChange ? '완료' : '수정'}
          </BtnColor>
        )}
        {isAlert && <AlertMsg>{isAlert}</AlertMsg>}
      </NameWrapper>
      {openModal && <EmailModal clickModal={() => setOpenModal(false)} />}
    </LiWrapper>
  );
};

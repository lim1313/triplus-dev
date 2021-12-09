/*eslint-disable no-unused-vars*/

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../../hooks/useInput';
import { postEmailCheck, postEmailUnCheck, postInfo } from '../../../network/my/http';
import { ColorBtn } from '../../../styles/common';
import { useDispatch } from 'react-redux';
import { exit } from '../../../redux/login/action';
import { useNavigate } from 'react-router-dom';
import UserEmail from './UserEmail';

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

const BtnColor = styled(ColorBtn)`
  padding: 0.1em 0.7em;
  flex-shrink: 0;
  margin-left: 0.5rem;
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

const BtnWrapper = styled.div`
  display: flex;

  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
`;

export const UserInfo = ({ title, content, marginRight, noBtn, user }) => {
  const [isChange, setIsChange] = useState(false);
  const [inputValue, inputChange] = useInput(content);
  const [isAlert, setIsAlert] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      // TODO POST /my/email-unCheck
      //   postEmailUnCheck().then((res) => {
      //     if (res === 401) {
      //       alert('로그인이 만료되었습니다. 다시 로그인해 주세요');
      //       dispatch(exit());
      //       navigate('/login', { replace: true });
      //     } else {
      //       console.log(res);
      //     }
      //   });
      // };
    };
  }, []);

  const changeContent = (e) => {
    if (isChange) {
      if ((title === 'nickname' || title === 'e-mail') && !inputValue.length) {
        return setIsAlert('*필수 입력 사항');
      }
      // TODO POST /개인정보 변경
      postInfo(inputValue, title).then((res) => {
        if (res === 401) {
          alert('로그인이 만료되었습니다. 다시 로그인해 주세요');
          dispatch(exit());
          navigate('/login', { replace: true });
        } else if (res >= 200 && res < 300) {
          setIsAlert(null);
          setIsChange(!isChange);
        } else {
          console.log(res);
          setIsChange(!isChange);
        }
      });
    } else {
      setIsChange(!isChange);
    }
  };

  // const sendEmail = () => {
  //   // TODO POST /my/email-check 이메일 인증 전송
  //   postEmailCheck(inputValue).then((res) => {
  //     if (res === 401) {
  //       alert('로그인이 만료되었습니다. 다시 로그인해 주세요');
  //       dispatch(exit());
  //       navigate('/login', { replace: true });
  //     } else if (res === 400) {
  //       alert('인증메일 발송이 실패했습니다. 다시 시도해주세요');
  //     } else if (res >= 200 && res < 300) {
  //       setIsAlert('*인증 이메일이 발송되었습니다. 이메일을 확인해 주세요');
  //     } else {
  //       console.log(res);
  //     }
  //   });
  // };

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
          <BtnColor
            palette='blue'
            onClick={title === 'e-mail' ? () => setOpenModal(true) : changeContent}
          >
            {isChange ? '완료' : '수정'}
          </BtnColor>
        )}
        {isAlert && <AlertMsg>{isAlert}</AlertMsg>}
      </NameWrapper>
      {openModal && <UserEmail clickModal={() => setOpenModal(false)} />}
    </LiWrapper>
  );
};

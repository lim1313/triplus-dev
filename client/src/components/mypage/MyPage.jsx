/* eslint-disable react-hooks/exhaustive-deps*/

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useError } from '../../hooks/useError';
import { getUserInfo } from '../../network/my/http';
import Loading from '../common/Loading';
import MyInfo from './MyInfo';
import MyProfile from './MyProfile';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vh - ${({ theme }) => theme.size.navHeight});
  justify-content: center;
  align-items: center;
`;

const MyWrapper = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  width: calc(${({ theme }) => theme.size.maxWidth} - 300px);
  background-color: ${({ theme }) => theme.color.lightGray};
  padding: 6rem 4rem;
  padding-top: 6.5rem;
  font-size: 1.2rem;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 5%;
    width: 90%;
    transform: translate(-50%, -50%);
    border: 1px solid;
    color: ${({ theme }) => theme.color.blue};
  }

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
    flex-direction: column;
    padding: 4rem 2rem;
    height: 100%;
    overflow-y: auto;
  }
`;

const BackgroundImg = styled.div`
  position: absolute;
  height: 250px;
  width: 250px;
  right: -60px;
  top: -60px;
  background: url('/asset/main/stamp.png') no-repeat center / cover;
  opacity: 0.2;
`;

export default function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError] = useError();

  useEffect(() => {
    //TODO GET /mypage
    setIsLoading(true);
    getUserInfo().then((res) => {
      if (res === 401) return isError();
      else if (res >= 400) {
        alert('에러가 발생했습니다. 다시 시도해 주세요.');
      } else {
        setUserInfo(res);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <Wrapper>
      {isLoading || !userInfo ? (
        <Loading />
      ) : (
        <MyWrapper>
          <BackgroundImg />
          <MyProfile image={userInfo.image} />
          <MyInfo userInfo={userInfo} />
        </MyWrapper>
      )}
    </Wrapper>
  );
}

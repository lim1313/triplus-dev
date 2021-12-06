import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyInfo from '../components/mypage/MyInfo';
import MyProfile from '../components/mypage/MyProfile';
import { userInfodb } from '../db/guideModal';
import Loading from '../components/common/Loading';
// import { getUserInfo } from '../network/my/http';

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
  width: calc(${({ theme }) => theme.size.maxWidth} - 350px);
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
  const [userInfo, setUserInfo] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //TODO GET /mypage
    // setIsLoading(true);
    // getUserInfo().then((res) => {
    //   setUserInfo(res);
    //   setIsLoading(false);
    // });

    setIsLoading(true);
    setTimeout(() => {
      setUserInfo({ ...userInfodb });
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <MyWrapper>
          <BackgroundImg />
          <MyProfile image={userInfo} />
          <MyInfo userInfo={userInfo} />
        </MyWrapper>
      )}
    </Wrapper>
  );
}

/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { BorderBtn, ColorBtn } from '../styles/common';
import { useSelector, useDispatch } from 'react-redux';
import { scrollListener } from '../redux/scroll/action';
import Flight from '../components/main/Flight';

const scaleUp = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
    transform: scale(1.4);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
    transform: translateY(3rem);
  }
`;

const Section = styled.div`
  background-color: ${({ color }) => color || '#fff'};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: ${({ last }) => (last ? '60vh' : '85vh')};
`;

const Content = styled.div`
  display: flex;
  background-color: #fff;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    align-items: center;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ center }) => (center ? 'center' : 'none')};
  text-align: ${({ right }) => (right ? 'right' : 'none')};
  margin-top: ${({ marginTop }) => marginTop || 'none'};
  margin-left: ${({ marginLeft }) => marginLeft || 'none'};
  margin-right: ${({ marginRight }) => marginRight || 'none'};
  opacity: ${({ ratioY }) => (ratioY ? '0' : '1')};
  ${({ ratioY, positionedY }) =>
    ratioY >= Number(positionedY) &&
    css`
      animation: ${slideDown} 1s;
      animation-fill-mode: forwards;
      transition: all 0s linear;
    `}
  @media (max-width: 992px) {
    margin-left: ${({ marginLeft }) => (marginLeft ? '5rem' : 'none')};
    margin-right: ${({ marginRight }) => (marginRight ? '5rem' : 'none')};
  }
  @media ${({ theme }) => theme.device.mobile} {
    margin-left: 0;
    margin-right: 0;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.color.black};
  @media (max-width: 992px) {
    font-size: 2rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const SubText = styled.p`
  font-size: 1.5rem;
  margin: 0;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.color.gray};
  @media screen and (max-width: 992px) {
    font-size: 1rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    text-align: center;
    margin-bottom: 1.3rem;
  }
`;

const ButtonWrapper = styled.div`
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    justify-content: center;
  }
`;

const MainBorderBtn = styled(BorderBtn)`
  font-size: 1.5rem;
  border-radius: 7px;

  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
    margin-bottom: 3rem;
  }
`;

const MainColorBtn = styled(ColorBtn)`
  font-size: 1.5rem;
  border-radius: 7px;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
    margin-bottom: 3rem;
  }
`;

const Img = styled.img`
  opacity: ${({ positionedY }) => (positionedY === '0' ? '1' : '0')};
  width: ${({ positionedY }) => (positionedY === '0' ? '32vw' : '25vw')};
  object-fit: contain;
  ${({ ratioY, positionedY }) =>
    ratioY >= Number(positionedY) &&
    positionedY !== '0' &&
    css`
      animation: ${scaleUp} 1.3s;
      animation-fill-mode: forwards;
      transition: all 0s linear;
    `};
  @media ${({ theme }) => theme.device.mobile} {
    width: 50vw;
    max-width: 20rem;
  }
`;

export default function MainPage() {
  const dispatch = useDispatch();
  const ratioY = parseInt(useSelector((state) => state.scrollReducer.scrollY) * 100);
  console.log('main', ratioY);
  const scrollEventListener = () => {
    const maxScroll = document.body.offsetHeight - window.innerHeight;
    console.log(maxScroll);
    const currentY = window.pageYOffset;
    console.log(currentY);
    const ratio = currentY / maxScroll;
    dispatch(scrollListener(ratio));
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEventListener);
    return () => {
      window.removeEventListener('scroll', scrollEventListener);
    };
  }, []);

  const isMobile = window.matchMedia('screen and (max-width: 768px)').matches;

  return (
    <>
      <Section>
        {isMobile ? (
          <Content>
            <Img src='./asset/main/trip1.png' alt='대체 이미지' ratioY={ratioY} positionedY='0' />
            <Description>
              <Title>
                우리는 여행자이자 <br /> 가이드입니다
              </Title>
              <SubText>
                여행자 or 가이드가 되어 <br />
                현지의 특별한 체험을 공유할 수 있어요
              </SubText>
              <ButtonWrapper>
                <Link to='/map'>
                  <MainBorderBtn>탐색하기</MainBorderBtn>
                </Link>
              </ButtonWrapper>
            </Description>
          </Content>
        ) : (
          <Content>
            <Description marginRight='7rem'>
              <Title>
                우리는 여행자이자 <br /> 가이드입니다
              </Title>
              <SubText>
                여행자 or 가이드가 되어 <br />
                현지의 특별한 체험을 공유할 수 있어요
              </SubText>
              <ButtonWrapper>
                <Link to='/map'>
                  <MainBorderBtn>탐색하기</MainBorderBtn>
                </Link>
              </ButtonWrapper>
            </Description>
            <Img src='./asset/main/trip1.png' alt='대체 이미지' ratioY={ratioY} positionedY='0' />
          </Content>
        )}
      </Section>
      <Section>
        <Content>
          <Img src='./asset/main/trip2.png' alt='대체 이미지' ratioY={ratioY} positionedY='7' />
          <Description marginLeft='10rem' marginTop={isMobile ? '3rem' : null}>
            <Title>여행해보세요!</Title>
            <SubText>
              지도에서 현지 가이드 체험을 <br />
              신청할 수 있어요!
            </SubText>
            <ButtonWrapper>
              <Link to='/map'>
                <MainColorBtn palette='red'>가이드 찾아보러 가기</MainColorBtn>
              </Link>
            </ButtonWrapper>
          </Description>
        </Content>
      </Section>
      <Section>
        {isMobile ? (
          <Content>
            <Img src='./asset/main/trip3.png' alt='대체 이미지' ratioY={ratioY} positionedY='25' />
            <Description right marginTop='3rem'>
              <Title>
                현지 가이드가 <br /> 되어 보세요!
              </Title>
              <SubText>
                나만이 아는 특별한 체험을 <br />
                직접 가이드해보세요!
              </SubText>
              <ButtonWrapper>
                <Link to='/management'>
                  <MainColorBtn fontSize='1.5rem' palette='blue'>
                    가이드 신청하러 가기
                  </MainColorBtn>
                </Link>
              </ButtonWrapper>
            </Description>
          </Content>
        ) : (
          <Content>
            <Description marginRight='10rem'>
              <Title>
                현지 가이드가 <br /> 되어 보세요!
              </Title>
              <SubText>
                나만이 아는 특별한 체험을 <br />
                직접 가이드해보세요!
              </SubText>
              <ButtonWrapper>
                <Link to='/management'>
                  <MainColorBtn fontSize='1.5rem' palette='blue'>
                    가이드 신청하러 가기
                  </MainColorBtn>
                </Link>
              </ButtonWrapper>
            </Description>
            <Img src='./asset/main/trip3.png' alt='대체 이미지' ratioY={ratioY} positionedY='25' />
          </Content>
        )}
      </Section>
      <Section>
        <Content>
          <Img src='./asset/main/trip4.png' alt='대체 이미지' ratioY={ratioY} positionedY='45' />
          <Description marginLeft='10rem' right marginTop={isMobile ? '3rem' : null}>
            <Title>채팅해보세요!</Title>
            <SubText>
              자세한 일정은 실시간 채팅으로 <br />
              상의할 수 있어요!
            </SubText>
            <ButtonWrapper>
              <Link to='/chat'>
                <MainColorBtn fontSize='1.5rem' palette='red'>
                  채팅하러 가기
                </MainColorBtn>
              </Link>
            </ButtonWrapper>
          </Description>
        </Content>
      </Section>
      <Section>
        {isMobile ? (
          <Content>
            <Img src='./asset/main/trip5.png' alt='대체 이미지' ratioY={ratioY} positionedY='64' />
            <Description marginTop='3rem'>
              <Title>
                일정을 <br /> 한 눈에 보세요!
              </Title>
              <SubText>다가오는 일정을 확인할 수 있어요</SubText>
              <ButtonWrapper>
                <Link to='/management'>
                  <MainColorBtn fontSize='1.5rem' palette='blue'>
                    일정 확인하러 가기
                  </MainColorBtn>
                </Link>
              </ButtonWrapper>
            </Description>
          </Content>
        ) : (
          <Content>
            <Description marginRight='10rem'>
              <Title>
                일정을 <br /> 한 눈에 보세요!
              </Title>
              <SubText>다가오는 일정을 확인할 수 있어요</SubText>
              <ButtonWrapper>
                <Link to='/management'>
                  <MainColorBtn fontSize='1.5rem' palette='blue'>
                    일정 확인하러 가기
                  </MainColorBtn>
                </Link>
              </ButtonWrapper>
            </Description>
            <Img src='./asset/main/trip5.png' alt='대체 이미지' ratioY={ratioY} positionedY='64' />
          </Content>
        )}
      </Section>
      <Section last>
        <Description marginTop='-10rem' center ratioY={ratioY} positionedY='80'>
          <Title>이제 시작해볼까요?</Title>
          <SubText></SubText>
          <Link to='/login'>
            <MainBorderBtn>서비스 시작하기</MainBorderBtn>
          </Link>
        </Description>
      </Section>
      <Flight />
    </>
  );
}

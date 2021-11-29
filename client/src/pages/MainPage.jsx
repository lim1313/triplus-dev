/* eslint-disable no-unused-vars  */
/* eslint-disable no-undef  */
import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { BorderBtn, ColorBtn } from '../styles/common';
import { useSelector, useDispatch } from 'react-redux';
import { scrollListener } from '../redux/scroll/action';

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
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ center }) => (center ? 'center' : 'none')};
  text-align: ${({ right }) => (right ? 'right' : 'none')};
  margin-top: ${({ last }) => (last ? '-10rem' : 'none')};
  margin-left: ${({ marginLeft }) => marginLeft || 'none'};
  margin-right: ${({ marginRight }) => marginRight || 'none'};
  opacity: ${({ currentY }) => (currentY ? '0' : '1')};
  ${({ currentY, positionedY }) =>
    currentY >= Number(positionedY) &&
    css`
      animation: ${slideDown} 1s;
      animation-fill-mode: forwards;
      transition: all 0s linear;
    `}
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.color.black};
`;

const SubText = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.color.gray};
`;

const Img = styled.img`
  opacity: ${({ positionedY }) => (positionedY === '0' ? '1' : '0')};
  width: 25vw;
  object-fit: contain;
  ${({ currentY, positionedY = 0 }) =>
    currentY >= Number(positionedY) &&
    css`
      animation: ${scaleUp} 1.5s;
      animation-fill-mode: forwards;
      transition: all 0s linear;
    `};
`;

export default function MainPage() {
  const dispatch = useDispatch();
  const currentY = useSelector((state) => state.scrollListener.scrollY);

  const scrollEventListener = () => {
    dispatch(scrollListener(window.pageYOffset));
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEventListener);
    console.log();
    return () => {
      window.removeEventListener('scroll', scrollEventListener);
    };
  }, []);

  return (
    <>
      <Section>
        <Content>
          <Description marginRight='10rem'>
            <Title>
              우리는 여행자이자 <br /> 가이드입니다
            </Title>
            <SubText>
              여행자 or 가이드가 되어 <br />
              현지의 특별한 체험을 공유할 수 있어요
            </SubText>
            <BorderBtn width='10rem' fontSize='1.5rem'>
              탐색하기
            </BorderBtn>
          </Description>
          <Img src='./asset/main/trip1@3x.png' alt='대체 이미지' currentY={currentY} />
        </Content>
      </Section>
      <Section>
        <Content>
          <Img
            src='./asset/main/trip2@3x.png'
            alt='대체 이미지'
            currentY={currentY}
            positionedY='200'
          />
          <Description marginLeft='10rem' right>
            <Title>여행해보세요!</Title>
            <SubText>
              지도에서 현지 가이드 체험을 <br />
              신청할 수 있어요!
            </SubText>
            <ColorBtn fontSize='1.5rem' palette='red'>
              가이드 찾아보러 가기
            </ColorBtn>
          </Description>
        </Content>
      </Section>
      <Section>
        <Content>
          <Description marginRight='10rem'>
            <Title>
              현지 가이드가 <br /> 되어 보세요!
            </Title>
            <SubText>
              나만이 아는 특별한 체험을 <br />
              직접 가이드해보세요!
            </SubText>
            <div>
              <ColorBtn fontSize='1.5rem' palette='blue'>
                가이드 신청하러 가기
              </ColorBtn>
            </div>
          </Description>
          <Img
            src='./asset/main/trip3@3x.png'
            alt='대체 이미지'
            currentY={currentY}
            positionedY='830'
          />
        </Content>
      </Section>
      <Section>
        <Content>
          <Img
            src='./asset/main/trip4@3x.png'
            alt='대체 이미지'
            currentY={currentY}
            positionedY='1530'
          />
          <Description marginLeft='10rem' right>
            <Title>채팅해보세요!</Title>
            <SubText>
              자세한 일정은 실시간 채팅으로 <br />
              상의할 수 있어요!
            </SubText>
            <div>
              <ColorBtn fontSize='1.5rem' palette='red'>
                채팅하러 가기
              </ColorBtn>
            </div>
          </Description>
        </Content>
      </Section>
      <Section>
        <Content>
          <Description marginRight='10rem'>
            <Title>
              일정을 <br /> 한 눈에 보세요!
            </Title>
            <SubText>다가오는 일정을 확인할 수 있어요</SubText>
            <div>
              <ColorBtn fontSize='1.5rem' palette='blue'>
                일정 확인하러 가기
              </ColorBtn>
            </div>
          </Description>
          <Img
            src='./asset/main/trip5@3x.png'
            alt='대체 이미지'
            currentY={currentY}
            positionedY='2200'
          />
        </Content>
      </Section>
      <Section last>
        <Description last center currentY={currentY} positionedY='3000'>
          <Title>이제 시작해볼까요?</Title>
          <SubText></SubText>
          <div>
            <BorderBtn fontSize='1.5rem'>서비스 시작하기</BorderBtn>
          </div>
        </Description>
      </Section>
    </>
  );
}

/* eslint-disable no-unused-vars*/
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import ModalTemplete from '../components/admin/adminmodal/ModalTemplete';
import { adminOpen } from '../redux/admin/action';

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Section = styled.section`
  position: relative;
  width: 60vw;
  height: 35rem;
  background: orange;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin: 2rem;
  background: lightBlue;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: -3rem;
  left: -4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
  height: 10rem;
  background: lightGray;
`;

const Img = styled.img`
  object-fit: contain;
  width: inherit;
`;

const SubTitle = styled.p`
  height: 3rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.darkGray};
`;

const Grid = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(13, 1fr);
  column-gap: 0.5rem;
  > li {
    text-align: center;
    background: aqua;
  }
  > .one {
    grid-column: 1;
    grid-row: 1;
  }
  > .two {
    grid-column: 2 / 4;
    grid-row: 1;
  }
  > .three {
    grid-column: 4 / 9;
    grid-row: 1;
  }
  > .four {
    grid-column: 9 / 11;
    grid-row: 1;
  }
`;

export default function AdminPage() {
  // const isOpen = useSelector((state) => state.adminOpenReducer);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(adminOpen());
  // }, [dispatch]);
  return (
    <Body>
      {/* <div>{isOpen ? <ModalTemplete /> : null}</div>; */}
      <Section>
        <LogoWrapper>
          <Img src='/asset/logo/logo.png' alt='로고' />
          <SubTitle>여행에 우리를 더하다</SubTitle>
        </LogoWrapper>
        <Title>가이드 진행 목록</Title>
        <Grid>
          <li className='one'>언뇽</li>
          <li className='two'>언뇽</li>
          <li className='three'>언뇽</li>
          <li className='four'>언뇽</li>
        </Grid>
      </Section>
    </Body>
  );
}

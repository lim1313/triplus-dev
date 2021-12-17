import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Loading from '../common/Loading';
import CardModal from './CardModal';
import CardBar from './sideBar/CardBar';
// import SpinLoading from '../common/SpinLoading';

const SideWrapper = styled.aside`
  position: relative;
  flex: 0 0 auto;
  width: 320px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.lightGray};

  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: auto;
  }
`;

export default function SideBar({ isLoading }) {
  const { isOpen, modalInfo } = useSelector((state) => state.guideModalReducer);

  return (
    <SideWrapper>
      {isLoading ? <Loading isMap /> : <CardBar />}
      {/* {isLoading ? <SpinLoading /> : <CardBar />} */}
      {isOpen && <CardModal modalInfo={modalInfo} />}
    </SideWrapper>
  );
}

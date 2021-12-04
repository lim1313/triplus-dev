/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ isMap }) => (isMap ? '100%' : '70vh')};
`;

export const LoadingImg = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 5px solid #fff;
  transition: opaicty 0;
`;

export default function Loading({ isMap }) {
  let image = useRef(null);
  let src = [];
  let imgCount = 4;

  for (let i = 1; i <= imgCount; i++) {
    src.push(`/asset/loading/loading${i}.png`);
  }

  let count = 0;
  useEffect(() => {
    const imgChange = setInterval(() => {
      image.current.src = src[count % imgCount];
      count++;
    }, 500);
    return () => {
      clearInterval(imgChange);
    };
  }, []);

  return (
    <Wrapper isMap={isMap}>
      <LoadingImg ref={image} src='/asset/loading/loading1.png' alt='로딩 이미지' />
      {/* <LoadingImg2 src='/asset/loading/loading2.png' alt='로딩 이미지2' />
      <LoadingImg3 src='/asset/loading/loading3.png' alt='로딩 이미지3' />
      <LoadingImg4 src='/asset/loading/loading4.png' alt='로딩 이미지4' /> */}
    </Wrapper>
  );
}

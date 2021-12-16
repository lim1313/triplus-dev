import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const SVG = styled.svg.attrs({
  id: 'svg-path',
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 49.47 341.57',
})`
  position: fixed;
  top: 25vh;
  right: 5vw;
  width: 5rem;
  height: 55vh;

  @media screen and (max-width: 992px) {
    width: 3rem;
    height: 40vh;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const StartCircle = styled.circle`
  fill: #3386f7;
  &:hover {
    cursor: pointer;
  }
`;

const StartMarker = styled.path`
  fill: #3386f7;
  &:hover {
    cursor: pointer;
  }
`;

const Stopover = styled.circle`
  fill: #fff;
  stroke: ${({ ratioY, positionedY }) => (ratioY >= positionedY ? '#3386f7' : '#8d97a1')};
  stroke-width: 2px;
  stroke-miterlimit: 10;
  &:hover {
    cursor: pointer;
  }
`;

const Path = styled.path`
  fill: none;
  stroke: ${({ color }) => color || '#e9edf3'};
  stroke-width: 3px;
  stroke-miterlimit: 10;
`;

const Airplane = styled.path`
  fill: ${({ ratioY, positionedY }) => (ratioY >= positionedY ? '#3386f7' : '#8d97a1')};
  &:hover {
    cursor: pointer;
  }
`;

export default function Flight() {
  const ratioY = parseInt(useSelector((state) => state.scrollReducer.scrollY) * 100);
  const path = useRef(null);

  useEffect(() => {
    const coloredPath = path.current;
    const totalLength = coloredPath.getTotalLength();
    coloredPath.style.strokeDasharray = totalLength;
    coloredPath.style.strokeDashoffset = totalLength;

    const scrollHandler = () => {
      const maxScroll = document.body.offsetHeight - window.innerHeight;
      const currentY = window.pageYOffset;
      const ratio = currentY / maxScroll;
      const remainingLength = totalLength * ratio;
      const currentLength = totalLength - remainingLength;
      coloredPath.style.strokeDashoffset = currentLength;
    };

    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const stopoverClickHandler = (e) => {
    const toRatio = Number(e.target.id);
    const toY = (toRatio * (document.body.offsetHeight - window.innerHeight)) / 100;
    window.scrollTo(0, toY + 1);
  };

  return (
    <SVG>
      <StartCircle id='0' cx='20.48' cy='20.16' r='1.43' onClick={stopoverClickHandler} />
      <StartMarker
        id='0'
        onClick={stopoverClickHandler}
        d='M20.53,0C16.28,0,14,3,14,6.58s6.5,10.57,6.5,10.57C26.44,10.24,26.94,8,26.94,5.74A6.25,6.25,0,0,0,20.53,0Zm-.05,10.12a4.29,4.29,0,1,1,4.29-4.29A4.29,4.29,0,0,1,20.48,10.12Z'
      />
      <Path d='M23.9,21.84s17.34,10.37,14,25-18,36.38-18,52.51-1.42,19.18,10.84,30.85,14.61,4.4,14.62,20.4-19.27,26.88-19.27,40.82,21.07,25.48,8.57,48.79S4.89,264.9,4.24,257.08s6.82-9.43,10.39-7.67,10.73,11.1,13.66,49.79' />
      <Path
        ref={path}
        color='#7dcbf8'
        d='M23.9,21.84s17.34,10.37,14,25-18,36.38-18,52.51-1.42,19.18,10.84,30.85,14.61,4.4,14.62,20.4-19.27,26.88-19.27,40.82,21.07,25.48,8.57,48.79S4.89,264.9,4.24,257.08s6.82-9.43,10.39-7.67,10.73,11.1,13.66,49.79'
      />
      <Airplane
        onClick={stopoverClickHandler}
        id='100'
        ratioY={ratioY}
        positionedY='100'
        d='M30.41,328.64s.21,8.21,0,9.26-1.95,3.57-2.6,3.67-2.17-2-2.41-2.73-.31-9.86-.31-9.86l-3.26-2s-1,1.06-1.69.66,0-2,0-2l-1.94-1.37s-1.14.9-1.86.47-.45-2.05-.45-2.05L13,320.71l-.14-1.07,12.38,1.9.66-7.51-3.92-2.35-.06-3.19,5.68,2.22,6-1.65.16,2.28-4.21,2.41.77,7.76,11-2.07.49,1.48-2.48,1.67s.54,1.41-.26,1.92-1.88-.83-1.88-.83l-1.93.92s.6,1.64-.23,2.52-2.19-.46-2.19-.46Z'
      />
      <Stopover
        onClick={stopoverClickHandler}
        cx='24.56'
        cy='81.53'
        r='3.82'
        ratioY={ratioY}
        id='20'
        positionedY='20'
      />
      <Stopover
        onClick={stopoverClickHandler}
        cx='44.66'
        cy='143.86'
        r='3.82'
        ratioY={ratioY}
        id='40'
        positionedY='40'
      />
      <Stopover
        onClick={stopoverClickHandler}
        cx='34.5'
        cy='210.63'
        r='3.82'
        ratioY={ratioY}
        id='59'
        positionedY='59'
      />
      <Stopover
        onClick={stopoverClickHandler}
        cx='10.82'
        cy='260.04'
        r='3.82'
        ratioY={ratioY}
        id='79'
        positionedY='79'
      />
    </SVG>
  );
}

import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.li`
  display: inline-block;
  height: 220px;
  width: 220px;
  flex-shrink: 0;
  flex-grow: 0;

  background: url(${({ backImage }) => backImage}) no-repeat center;
  background-size: contain;
`;

export default function GuideImg({ img, title, index }) {
  return <ImageWrapper backImage={img} />;
}

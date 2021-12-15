import React from 'react';
import { Content } from './CheckModal';

export default function CheckModalContent({ content1, content2, end }) {
  return (
    <>
      <Content end={end}>{content1}</Content>
      <Content end={end}>{content2}</Content>
    </>
  );
}

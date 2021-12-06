import React from 'react';
import styled from 'styled-components';
import { Input } from '../../styles/management/guideCreate';

const ContentCtn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.2rem 0;
`;

const Content = styled(Input)``;
const ReopenDate = styled(Input)`
  margin-top: 0.2rem;
`;

export default function GuideContent() {
  return (
    <ContentCtn>
      <Content placeholder='가이드 설명' />
      <ReopenDate placeholder='모집 예정일' />
    </ContentCtn>
  );
}

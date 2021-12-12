import React from 'react';
import styled from 'styled-components';
import { Input } from '../../styles/management/guideCreate';

const ContentCtn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.2rem 0;
`;

const Content = styled.textarea`
  height: 3rem;
  background: #e8ecf6;
  border: none;
  resize: none;
  outline: none;
`;
const ReopenDate = styled(Input)`
  margin-top: 0.2rem;
`;

export default function GuideContent(props) {
  const { handleInputChange, value } = props;
  return (
    <ContentCtn>
      <Content
        placeholder='가이드 설명'
        id='content'
        value={value.content}
        onChange={handleInputChange}
      />
      <ReopenDate
        placeholder='모집 예정일'
        id='openDate'
        value={value.openDate}
        onChange={handleInputChange}
      />
    </ContentCtn>
  );
}

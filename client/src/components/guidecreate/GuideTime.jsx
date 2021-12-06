import React from 'react';
import styled from 'styled-components';
import { Input } from '../../styles/management/guideCreate';

const ContentsCtn = styled.div``;
const TimeCtn = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  & div {
    width: 32.6%;
    display: flex;
    flex-direction: column;
  }
`;

const StartTime = styled(Input)`
  width: 100%;
`;
const EndTime = styled(Input)`
  width: 100%;
`;
const Count = styled(Input)`
  width: 100%;
`;

export default function GuideTime() {
  return (
    <ContentsCtn>
      <TimeCtn>
        <div>
          <label htmlFor='start'>시작시간</label>
          <StartTime placeholder='00:00' id='start' />
        </div>
        <div>
          <label htmlFor='end'>종료시간</label>
          <EndTime placeholder='00:00' id='end' />
        </div>
        <div>
          <label htmlFor='count'>인원입력</label>
          <Count placeholder='00명' id='count' />
        </div>
      </TimeCtn>
    </ContentsCtn>
  );
}

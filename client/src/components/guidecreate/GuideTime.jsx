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

export default function GuideTime(props) {
  const { handleInputChange, value } = props;
  return (
    <ContentsCtn>
      <TimeCtn>
        <div>
          <label htmlFor='start'>시작시간</label>
          <StartTime
            placeholder='00:00'
            id='startTime'
            type='time'
            onChange={handleInputChange}
            value={value.startTime}
          />
        </div>
        <div>
          <label htmlFor='end'>종료시간</label>
          <EndTime
            placeholder='00:00'
            id='endTime'
            type='time'
            onChange={handleInputChange}
            value={value.endTime}
          />
        </div>
        <div>
          <label htmlFor='count'>인원입력</label>
          <Count
            placeholder='00명'
            id='count'
            type='number'
            onChange={handleInputChange}
            value={value.count}
            min='1'
          />
        </div>
      </TimeCtn>
    </ContentsCtn>
  );
}

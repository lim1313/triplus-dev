import React from 'react';
import styled from 'styled-components';
import { Input } from '../../styles/management/guideCreate';

const ContentsCtn = styled.div``;
const TimeCtn = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  .time-ctn {
    width: 35%;
    display: flex;
    flex-direction: column;
  }
  .time-ctn2 {
    width: 35%;
    display: flex;
    flex-direction: column;
  }
  .count-ctn {
    width: 25%;
    display: flex;
    flex-direction: column;
  }
`;

const TimesCtn = styled.div`
  width: 100%;
  display: flex;
`;

const TimeDayNight = styled.select`
  width: 37%;
  height: 2rem;
  font-size: 0.8rem;
`;
const TimeTime = styled.select`
  width: 33%;
  height: 2rem;
`;
const TimeMiniute = styled.select`
  width: 33%;
  height: 2rem;
`;
const Count = styled(Input)`
  width: 100%;
`;

export default function GuideTime(props) {
  const {
    handleInputChange,
    value,
    handleEndTimeChange,
    handleStartTimeChange,
    startTime,
    endTime,
  } = props;
  const times = ['00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const minutes = ['00', '10', '20', '30', '40', '50'];
  return (
    <ContentsCtn>
      <TimeCtn>
        <div className='time-ctn'>
          <label htmlFor='start'>시작시간</label>
          <TimesCtn>
            <TimeDayNight placeholder='00:00' id='sdayNight' onChange={handleStartTimeChange}>
              <option>오전</option>
              <option>오후</option>
            </TimeDayNight>
            <TimeTime onChange={handleStartTimeChange} id='stime'>
              {times.map((time) => (
                <option key={time}>{time}</option>
              ))}
            </TimeTime>
            <TimeMiniute onChange={handleStartTimeChange} id='sminute'>
              {minutes.map((minute) => (
                <option key={minute}>{minute}</option>
              ))}
            </TimeMiniute>
          </TimesCtn>
        </div>
        <div className='time-ctn2'>
          <label htmlFor='end'>종료시간</label>
          <TimesCtn>
            <TimeDayNight placeholder='00:00' id='edayNight' onChange={handleEndTimeChange}>
              {startTime.sdayNight === '오후' ? (
                <option>오후</option>
              ) : (
                <>
                  <option>오전</option>
                  <option>오후</option>
                </>
              )}
            </TimeDayNight>
            <TimeTime onChange={handleEndTimeChange} id='etime'>
              {startTime.sdayNight === '오후'
                ? times.map(
                    (time) =>
                      Number(time) >= Number(startTime.stime) && <option key={time}>{time}</option>
                  )
                : times.map((time) =>
                    endTime.edayNight === '오전' ? (
                      Number(time) >= Number(startTime.stime) && <option key={time}>{time}</option>
                    ) : (
                      <option key={time}>{time}</option>
                    )
                  )}
            </TimeTime>
            <TimeMiniute onChange={handleEndTimeChange} id='eminute'>
              {startTime.sdayNight === '오후'
                ? minutes.map((minute) =>
                    startTime.stime === endTime.etime ? (
                      Number(minute) >= Number(startTime.sminute) && (
                        <option key={minute}>{minute}</option>
                      )
                    ) : (
                      <option key={minute}>{minute}</option>
                    )
                  )
                : endTime.edayNight === '오전'
                ? minutes.map((minute) =>
                    startTime.stime === endTime.etime ? (
                      Number(minute) >= Number(startTime.sminute) && (
                        <option key={minute}>{minute}</option>
                      )
                    ) : (
                      <option key={minute}>{minute}</option>
                    )
                  )
                : minutes.map((minute) => <option key={minute}>{minute}</option>)}
            </TimeMiniute>
          </TimesCtn>
        </div>
        <div className='count-ctn'>
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

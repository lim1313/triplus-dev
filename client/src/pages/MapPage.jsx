import React, { useState } from 'react';
import SideBar from '../components/map/SideBar';
import styled from 'styled-components';
import KakaoMap from '../components/map/map/KakaoMap';
import CardFilter from '../components/map/sideBar/CardFilter';

const MapContainer = styled.section`
  position: relative;
  width: 100vw;
  height: calc(100vh - 3.8rem);
  display: flex;

  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column-reverse;
    height: calc(100vh - 2.5rem);
  }
`;

export default function MapPage() {
  const [filterInfo, setFilterInfo] = useState({ gender: '', startDate: '', endDate: '' });

  const filterSubmit = (...args) => {
    let [gen, start, end] = args;
    let { gender, startDate, endDate } = filterInfo;
    // setFilterInfo({ gender: gen, startDate: start, endDate: end });
    if (gen !== gender || start !== startDate || end !== endDate) {
      let cardFilter = { gender: gen, startDate: start, endDate: end };
      setFilterInfo(cardFilter);
    }
  };

  return (
    <MapContainer>
      <CardFilter filterSubmit={filterSubmit} />
      <SideBar />
      <KakaoMap filterInfo={filterInfo} />
    </MapContainer>
  );
}

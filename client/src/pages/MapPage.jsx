import React, { useState } from 'react';
import SideBar from '../components/map/SideBar';
import styled from 'styled-components';
import CardFilter from '../components/map/SideBar/CardFilter';
import KakaoMap from '../components/map/Map/KakaoMap';

const MapContainer = styled.section`
  position: relative;
  width: 100vw;
  height: calc(100vh - 3.8rem);
  display: flex;

  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column-reverse;
  }
`;

export default function MapPage() {
  const [filterInfo, setFilterInfo] = useState({ gender: '', startDate: '', endDate: '' });

  const filterSubmit = (...args) => {
    let [gen, start, end] = args;
    let { gender, startDate, endDate } = filterInfo;

    if (gen !== gender || start !== startDate || end !== endDate) {
      setFilterInfo({ gender: gen, startDate: start, endDate: end });
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

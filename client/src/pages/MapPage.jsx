/*eslint-disable no-unused-vars*/

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
  const [filterInfo, setFilterInfo] = useState({});

  const filterSubmit = (data) => {
    setFilterInfo({ ...data });
  };

  return (
    <MapContainer>
      <CardFilter filterSubmit={filterSubmit} />
      <SideBar />
      <KakaoMap filterInfo={filterInfo} />
    </MapContainer>
  );
}

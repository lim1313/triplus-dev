import React from 'react';
import Map from '../components/map/Map';
import SideBar from '../components/map/SideBar';
import styled from 'styled-components';
import CardFilter from '../components/map/SideBar/CardFilter';

const MapContainer = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 3.8rem);
  display: flex;

  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column-reverse;
  }
`;

export default function MapPage() {
  return (
    <MapContainer>
      <CardFilter />
      <SideBar />
      <Map />
    </MapContainer>
  );
}

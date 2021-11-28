import React from 'react';
import Map from '../components/map/Map';
import SideBar from '../components/map/SideBar';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export default function MapPage() {
  return (
    <MapContainer>
      <SideBar />
      <Map />
    </MapContainer>
  );
}

import React from 'react';
import { ManageCtn } from '../styles/management/container';
import styled from 'styled-components';
import TourFilter from '../components/tourmanagement/TourFilter';
import OrderFilter from '../components/tourmanagement/OrderFilter';
import ListSection from '../components/tourmanagement/ListSection';

const SectionCtn = styled.section`
  width: 70vw;
  border-radius: 0.5rem;
  background-color: white;
  height: 80vh;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
`;

export default function TourManagementPage() {
  return (
    <ManageCtn>
      <SectionCtn>
        <TourFilter />
        <OrderFilter />
        <ListSection />
      </SectionCtn>
    </ManageCtn>
  );
}

import React from 'react';
import { ManageCtn } from '../styles/management/container';
import styled from 'styled-components';

const SectionCtn = styled.section`
  margin: 0 auto;
  width: 70vw;
  border-radius: 0.5rem;
  background-color: white;
  height: 80vh;
  padding: 0 1.5rem;
`;

export default function TourManagementPage() {
  return (
    <ManageCtn>
      <SectionCtn />
    </ManageCtn>
  );
}

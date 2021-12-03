import React from 'react';
import styled from 'styled-components';
import Applicants from './Applicants';
import GuideLists from './GuideLists';
import SectionHeader from './SectionHeader';

const SectionCtn = styled.section`
  width: 70vw;
  border-radius: 0.5rem;
  background-color: white;
  height: 80vh;
  padding: 0 1.5rem;
`;

export default function ManageSection() {
  return (
    <SectionCtn>
      <SectionHeader />
      <GuideLists />
      <Applicants />
    </SectionCtn>
  );
}

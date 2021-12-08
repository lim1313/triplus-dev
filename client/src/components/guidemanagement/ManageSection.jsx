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
  @media ${({ theme }) => theme.device.mobile} {
    width: 100vw;
    padding: 0.5rem;
    border-radius: 0;
    margin-top: 2rem;
  }
`;

export default function ManageSection(props) {
  const { handleCreateClick, guideInfo, applicantInfo } = props;
  return (
    <SectionCtn>
      <SectionHeader />
      <GuideLists handleCreateClick={handleCreateClick} guideInfo={guideInfo} />
      <Applicants applicantInfo={applicantInfo} />
    </SectionCtn>
  );
}

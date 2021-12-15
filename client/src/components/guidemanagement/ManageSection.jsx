import React from 'react';
import styled from 'styled-components';
import Loading from '../common/Loading';
import Applicants from './Applicants';
import GuideLists from './GuideLists';
import SectionHeader from './SectionHeader';

const SectionCtn = styled.section`
  width: 70vw;
  border-radius: 0.5rem;
  background-color: white;
  height: auto;
  padding: 0 1.5rem;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100vw;
    padding: 0.5rem;
    border-radius: 0;
    margin-top: 2rem;
  }
  & .null-div {
    height: 300px;
  }
`;

export default function ManageSection(props) {
  const { handleCreateClick, guideInfo, applicantInfo, isLoading } = props;
  return (
    <SectionCtn>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <SectionHeader />
          <GuideLists
            handleCreateClick={handleCreateClick}
            guideInfo={guideInfo}
            applicantInfo={applicantInfo}
          />
          {guideInfo.title ? (
            <Applicants applicantInfo={applicantInfo} />
          ) : (
            <div className='null-div'></div>
          )}
        </>
      )}
    </SectionCtn>
  );
}

import React from 'react';
import styled from 'styled-components';
// import { ColorBtn } from '../../styles/common/index';
import ApplicantTable from './ApplicantTable';

const ListCtn = styled.div``;

const H3Ctn = styled.div`
  display: flex;
  height: 2rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 5rem;
  margin-bottom: 0.2rem;
`;

const H3 = styled.h3``;

export default function Applicants({ applicantInfo }) {
  return (
    <ListCtn>
      <H3Ctn>
        <H3>가이드 신청자</H3>
      </H3Ctn>
      <ApplicantTable
        columns={['신청자', '지역', '가이드 명', '신청일자', '']}
        data={
          applicantInfo.length !== 0
            ? [
                {
                  nickName: applicantInfo.nickName,
                  region: applicantInfo.region,
                  title: applicantInfo.title,
                  date: applicantInfo.date,
                },
              ]
            : []
        }
      />
    </ListCtn>
  );
}

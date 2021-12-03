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

export default function Applicants() {
  return (
    <ListCtn>
      <H3Ctn>
        <H3>가이드 신청자</H3>
      </H3Ctn>
      <ApplicantTable
        columns={['신청자', '지역', '가이드 명', '신청일자', '']}
        data={[
          {
            nickName: '송코딩',
            region: '서울',
            title: '이태원의 숨겨진 화원',
            date: '2021-08-08',
          },
        ]}
      />
    </ListCtn>
  );
}

import React from 'react';
// import GuideTable from './GuideTable';
import styled from 'styled-components';
import { H3Ctn } from '../../styles/management/guidelist.js';
import { BorderBtn } from '../../styles/common/index.js';
import MyGuideCard from './MyGuideCard.jsx';

const H3 = styled.h3``;

export default function GuideLists(props) {
  const { handleCreateClick, guideInfo, applicantInfo } = props;
  return (
    <div>
      <H3Ctn>
        <H3>가이드 목록</H3>
        <BorderBtn palette='red' onClick={() => handleCreateClick(guideInfo)}>
          +가이드 생성
        </BorderBtn>
      </H3Ctn>
      <MyGuideCard guideInfo={guideInfo} applicantInfo={applicantInfo} />
      {/* <GuideTable
        columns={['날짜', '가이드 명', ' ', '', '']}
        data={guideInfo.guideDate ? [{ date: guideInfo.guideDate, title: guideInfo.title }] : []}
      /> */}
    </div>
  );
}

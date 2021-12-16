import React from 'react';
import styled from 'styled-components';
import { H3Ctn } from '../../styles/management/guidelist.js';
import { BorderBtn } from '../../styles/common/index.js';
import MyGuideCard from './MyGuideCard.jsx';

const H3 = styled.h3``;
const CreateBtn = styled(BorderBtn)`
  flex-shrink: 0;
`;

export default function GuideLists(props) {
  const { handleCreateClick, guideInfo, applicantInfo } = props;
  return (
    <div>
      <H3Ctn>
        <H3>가이드 목록</H3>
        <CreateBtn palette='red' onClick={() => handleCreateClick(guideInfo)}>
          +가이드 생성
        </CreateBtn>
      </H3Ctn>
      <MyGuideCard guideInfo={guideInfo} applicantInfo={applicantInfo} />
    </div>
  );
}

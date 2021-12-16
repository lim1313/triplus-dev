import React from 'react';
import { CardModalSubTitle } from '../../../styles/map/card';

export function GuideContentWrapper({ title, content }) {
  return (
    <div>
      <CardModalSubTitle>{title}</CardModalSubTitle>
      <div>{content}</div>
    </div>
  );
}

export default function GuideContent({
  guideDate,
  content,
  openDate,
  address,
  startTime,
  endTime,
}) {
  return (
    <>
      <GuideContentWrapper title='가이드 진행 주소' content={address} />
      <GuideContentWrapper title='가이드 진행 날짜' content={guideDate} />
      <GuideContentWrapper title='가이드 진행 시간' content={`${startTime} ~ ${endTime}`} />
      <GuideContentWrapper title='가이드 내용' content={content} />
      <GuideContentWrapper title='추후 오픈 예정 안내' content={openDate || '없음'} />
    </>
  );
}

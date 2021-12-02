import React from 'react';
import { CardModalSubTitle } from '../../../styles/map/card';

export default function GuideContent({ guideDate, content, openDate, address }) {
  return (
    <>
      <div>
        <CardModalSubTitle>가이드 진행 주소</CardModalSubTitle>
        <div>{address}</div>
      </div>
      <div>
        <CardModalSubTitle>가이드 진행 날짜</CardModalSubTitle>
        <div>{guideDate}</div>
      </div>
      <div>
        <CardModalSubTitle>가이드 내용</CardModalSubTitle>
        <div>{content}</div>
      </div>
      <div>
        <CardModalSubTitle>추후 오픈 예정 안내</CardModalSubTitle>
        <div>{openDate}</div>
      </div>
    </>
  );
}

import React from 'react';

export default function GuideContent({ guideDate, content, openDate, address }) {
  return (
    <>
      <div>
        <div>가이드 진행 주소</div>
        <div>{address}</div>
      </div>
      <div>
        <div>가이드 진행 날짜</div>
        <div>{guideDate}</div>
      </div>
      <div>
        <div>가이드 내용</div>
        <div>{content}</div>
      </div>
      <div>
        <div>추후 오픈 예정 안내</div>
        <div>{openDate}</div>
      </div>
    </>
  );
}

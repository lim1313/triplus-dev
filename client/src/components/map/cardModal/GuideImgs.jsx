import React from 'react';
import GuideImg from './GuideImg';

export default function GuideImgs({ tourImage }) {
  return (
    <div>
      <div>가이드 사진</div>
      <ul>
        {tourImage.map((img, i) => (
          <GuideImg key={i} img={img} />
        ))}
      </ul>
    </div>
  );
}

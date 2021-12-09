import React from 'react';
import GuideCard from '../map/sideBar/GuideCard';

export default function ListItem() {
  const cardInfo = {
    title: '안녕',
    gender: 'false',
    guideDate: '2022.2.17',
    tourImage: '',
    userImage: '',
    state: '',
    nickName: 'skfa',
    content: 'asjnfkas',
    guideId: 'aksnfl',
  };
  return <GuideCard cardInfo={cardInfo} />;
}

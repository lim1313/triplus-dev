import React, { useState, useEffect } from 'react';
import { ManageCtn } from '../styles/management/container';
import styled from 'styled-components';
import TourFilter from '../components/tourmanagement/TourFilter';
import OrderFilter from '../components/tourmanagement/OrderFilter';
import ListSection from '../components/tourmanagement/ListSection';

const SectionCtn = styled.section`
  width: 70vw;
  border-radius: 0.5rem;
  background-color: white;
  height: auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
`;

export default function TourManagementPage() {
  const [isListItems, setListItems] = useState([
    {
      title: '안녕1',
      gender: 'false',
      guideDate: '2022.2.17',
      tourImage: '',
      userImage: '',
      state: 'APPROVED',
      nickName: '멋진여행자',
      content: 'asjnfkas',
      guideId: 'aksnfl',
    },
    {
      title: '안녕2',
      gender: 'false',
      guideDate: '2022.2.17',
      tourImage: '',
      userImage: '',
      state: 'APPROVED',
      nickName: '예쁜여행자',
      content: 'asjnfkas',
      guideId: 'aksnfl',
    },
    {
      title: '안녕3',
      gender: 'false',
      guideDate: '2021.8.17',
      tourImage: '',
      userImage: '',
      state: 'COMPLETED',
      nickName: '귀여운여행자',
      content: 'asjnfkas',
      guideId: 'aksnfl',
    },
    {
      title: '안녕4',
      gender: 'true',
      guideDate: '2022.2.17',
      tourImage: '',
      userImage: '',
      state: 'CANCELED',
      nickName: '야무진여행자',
      content: 'asjnfkas',
      guideId: 'aksnfl',
    },
  ]);
  const [isActive, setIsActive] = useState({ all: true, approved: false, completed: false });
  const [isFiltered, setIsFiltered] = useState([]);
  useEffect(() => {
    setIsFiltered(isListItems);
  }, [isListItems]);
  const handleAllClick = () => {
    setIsFiltered(isListItems);
    setIsActive({ ...isActive, all: true, approved: false, completed: false });
  };

  const handleApprovedClick = () => {
    setIsFiltered(isListItems.filter((el) => el.state === 'APPROVED'));
    setIsActive({ ...isActive, all: false, approved: true, completed: false });
  };
  const handleCompletedClick = () => {
    setIsFiltered(isListItems.filter((el) => el.state === 'COMPLETED'));
    setIsActive({ ...isActive, all: false, approved: false, completed: true });
  };

  return (
    <ManageCtn>
      <SectionCtn>
        <TourFilter
          handleAllClick={handleAllClick}
          handleApprovedClick={handleApprovedClick}
          handleCompletedClick={handleCompletedClick}
          isActive={isActive}
        />
        <OrderFilter />
        <ListSection isFiltered={isFiltered} setListItems={setListItems} />
      </SectionCtn>
    </ManageCtn>
  );
}

import React from 'react';
import ListItem from './ListItem';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openTourModal } from '../../redux/tourManagement/action';

const ListSectionCtn = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 32%);
  column-gap: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default function ListSection({ items }) {
  const dispatch = useDispatch();
  const handleTourCardClick = (el) => {
    if (el.state === 'COMPLETED') return;
    console.log('clicked');
    console.log(el);
    const data = { isOpen: true, modalInfo: { ...el } };
    console.log(data);
    dispatch(openTourModal(data));
  };
  return (
    <ListSectionCtn>
      {items.map((el) => {
        return (
          <ListItem key={el.nickName} guideInfo={el} handleTourCardClick={handleTourCardClick} />
        );
      })}
    </ListSectionCtn>
  );
}

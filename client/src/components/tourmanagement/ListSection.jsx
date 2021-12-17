import React from 'react';
import ListItem from './ListItem';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openTourModal } from '../../redux/tourManagement/action';
import { v4 as uuidv4 } from 'uuid';

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
    const data = { isOpen: true, modalInfo: { ...el } };
    dispatch(openTourModal(data));
  };
  return (
    <ListSectionCtn>
      {items.map((el) => {
        return <ListItem key={uuidv4()} guideInfo={el} handleTourCardClick={handleTourCardClick} />;
      })}
    </ListSectionCtn>
  );
}

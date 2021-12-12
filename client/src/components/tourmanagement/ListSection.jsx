import React from 'react';
import ListItem from './ListItem';
import styled from 'styled-components';

const ListSectionCtn = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 32%);
  column-gap: 1rem;
`;

export default function ListSection({ isFiltered }) {
  return (
    <ListSectionCtn>
      {isFiltered.map((el) => {
        return <ListItem key={el.nickName} guideInfo={el} />;
      })}
    </ListSectionCtn>
  );
}

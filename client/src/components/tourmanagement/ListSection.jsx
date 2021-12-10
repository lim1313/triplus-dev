import React from 'react';
import ListItem from './ListItem';
import styled from 'styled-components';

const ListSectionCtn = styled.ul`
  width: 100%;
  display: flex;
  /* grid-template-columns: repeat(3, 200px);
  column-gap: 1rem; */
`;

export default function ListSection() {
  return (
    <ListSectionCtn>
      <ListItem />
      <ListItem />
      <ListItem />
    </ListSectionCtn>
  );
}

import React from 'react';
import ListItem from './ListItem';
import styled from 'styled-components';

const ListSectionCtn = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1rem;
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

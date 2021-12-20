import React from 'react';
import styled from 'styled-components';

import { AiOutlineEllipsis } from 'react-icons/ai';
// import { GrPrevious, GrNext } from 'react-icons/gr';

import usePaginate from '../../hooks/usePaginate';

const Navigation = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageButton = styled.button`
  border: 0;
  margin: 0;
  width: 2.5rem;
  height: 2.5rem;
  padding: 8px 12px;
  font-size: 1rem;
  background-color: ${({ selected, theme }) => (selected ? theme.color.blue : '#fff')};
  color: ${({ selected, theme }) => (selected ? '#fff' : theme.color.black)};
  cursor: pointer;
  border-radius: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.color.lightBlue};
    color: #fff;
  }
  &:active {
    opacity: 0.7;
  }
  > 
`;

const PaginationItemList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
`;

const PaginationItem = styled.li`
  margin-left: 0.5rem;
`;

export default function Pagination({ totalPageLength, currentPage, changePageHandler }) {
  const renderItem = (item) => {
    if (typeof item === 'number') return item;
    else if (item.includes('ellipsis')) return <AiOutlineEllipsis />;
    else if (item.includes('prev')) return '<';
    else if (item.includes('next')) return '>';
    else return item;
  };

  const { items } = usePaginate({
    totalPageLength,
    currentPage,
    changePageHandler,
  });

  return (
    <Navigation>
      <PaginationItemList>
        {items.map(({ key, disabled, selected, onClick, item }) => (
          <PaginationItem key={key}>
            <PageButton disabled={disabled} selected={selected} onClick={onClick}>
              {renderItem(item)}
            </PageButton>
          </PaginationItem>
        ))}
      </PaginationItemList>
    </Navigation>
  );
}

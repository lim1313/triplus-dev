import React from 'react';
import styled from 'styled-components';

const OrderCtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 4rem;
`;
const OrderBy = styled.select`
  width: 20%;
`;

export default function OrderFilter() {
  return (
    <OrderCtn>
      <OrderBy>
        <option value='날짜 빠른순'>날짜 빠른순</option>
        <option value='날짜 느린순'>날짜 느린순</option>
      </OrderBy>
    </OrderCtn>
  );
}

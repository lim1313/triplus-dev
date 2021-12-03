import React from 'react';
import { ColorBtn } from '../../styles/common';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  & tbody {
    & td {
      text-align: center;
      padding: 0.5rem;
    }
  }
`;
const Thead = styled.thead`
  width: 100%;
  & th {
    padding: 0.5rem 0;
    font-weight: 400;
    color: ${({ theme }) => theme.color.gray};
    border-top: 1px solid ${({ theme }) => theme.color.gray};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray};
  }
`;

export default function ApplicantTable(props) {
  const { columns, data } = props;

  return (
    <Table>
      <Thead>
        <tr>
          {columns.map((column) => {
            return <th key={column}>{column}</th>;
          })}
        </tr>
      </Thead>
      <tbody>
        {data.map(({ nickName, region, title, date }) => {
          return (
            <tr key={date + title}>
              <td>{nickName}</td>
              <td>{region}</td>
              <td>{title}</td>
              <td>{date}</td>
              <td>
                <ColorBtn palette='red'>채팅</ColorBtn>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

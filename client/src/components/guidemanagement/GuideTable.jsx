import React from 'react';
import { NoBorderBtn } from '../../styles/common';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* table-layout: fixed;
  width: 30% 50%; */

  & tbody {
    & td {
      text-align: center;
      padding: 0.5rem 1rem;
    }
  }
`;
const Thead = styled.thead`
  width: 100%;
  & th {
    padding: 0.5rem 0rem;
    font-weight: 400;
    /* text-align: start; */
    color: ${({ theme }) => theme.color.gray};
    border-top: 1px solid ${({ theme }) => theme.color.gray};
    border-bottom: 1px solid ${({ theme }) => theme.color.gray};
  }
`;

export default function GuideTable(props) {
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
        {data.map(({ date, title }) => {
          return (
            <tr key={date + title}>
              <td className='datetd'>{date}</td>
              <td>{title}</td>
              <td>&emsp;</td>
              <td>&emsp;&ensp;</td>
              <td>
                <NoBorderBtn palette='red'>수정</NoBorderBtn>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

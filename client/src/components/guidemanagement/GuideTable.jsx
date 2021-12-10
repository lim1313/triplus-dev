import React from 'react';
import { NoBorderBtn } from '../../styles/common';
import styled from 'styled-components';
import { deleteGuideCard } from '../../network/management/http';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* table-layout: fixed;
  width: 30% 50%; */

  & tbody {
    & td {
      text-align: center;
      padding: 0.5rem 1rem;
      table-layout: fixed;
    }
    .edit-btns {
      text-align: end;
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
  const handleDeleteClick = () => {
    deleteGuideCard();
  };

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
        {data.length !== 0 ? (
          data.map(({ date, title }) => {
            return (
              <tr key={date + title}>
                <td className='datetd'>{date}</td>
                <td colSpan='3'>{title}</td>
                {/* <td>&emsp;</td>
                <td>&emsp;&ensp;</td> */}
                <td className='edit-btns'>
                  <NoBorderBtn palette='red'>수정</NoBorderBtn>
                  <NoBorderBtn palette='red' onClick={handleDeleteClick}>
                    삭제
                  </NoBorderBtn>
                </td>
              </tr>
            );
          })
        ) : (
          <td colSpan='2'>조회된 가이드 정보가 없습니다.</td>
        )}
      </tbody>
    </Table>
  );
}

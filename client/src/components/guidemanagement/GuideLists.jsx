import React from 'react';
import styled from 'styled-components';
import { BorderBtn, NoBorderBtn } from '../../styles/common/index';

const ListCtn = styled.div``;

const H3Ctn = styled.div`
  display: flex;
  height: 2rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 5rem;
  margin-bottom: 0.2rem;
`;

const H3 = styled.h3``;

const FieldCtn = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.gray};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray};
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 4rem;
  & span {
    color: ${({ theme }) => theme.color.gray};
  }
`;
const ItemCtn = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 4rem;
`;

export default function GuideLists() {
  return (
    <ListCtn>
      <H3Ctn>
        <H3>가이드 목록</H3>
        <BorderBtn palette='red'>+카드 생성</BorderBtn>
      </H3Ctn>
      <FieldCtn>
        <span>날짜</span>
        <span>가이드명</span>
        <span> </span>
      </FieldCtn>
      <ItemCtn>
        <span>2021.08.21</span>
        <span>이태원의 숨겨진 화원</span>
        <NoBorderBtn palette='red'>수정</NoBorderBtn>
      </ItemCtn>
    </ListCtn>
  );
}

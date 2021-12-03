import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../../styles/common/index';

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

export default function Applicants() {
  return (
    <ListCtn>
      <H3Ctn>
        <H3>가이드 신청자</H3>
      </H3Ctn>
      <FieldCtn>
        <span>신청자</span>
        <span>지역</span>
        <span>가이드명</span>
        <span>신청일자</span>
        <span> </span>
      </FieldCtn>
      <ItemCtn>
        <span>홍길동</span>
        <span>서울</span>
        <span>이태원의 숨겨진 화원</span>
        <span>2021.08.08</span>
        <ColorBtn palette='red'>채팅</ColorBtn>
      </ItemCtn>
    </ListCtn>
  );
}

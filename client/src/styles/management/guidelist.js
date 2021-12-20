import styled from 'styled-components';

export const ContentCtn = styled.div``;

export const H3Ctn = styled.div`
  display: flex;
  height: 2rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 5rem;
  margin-bottom: 0.2rem;
`;

export const ItemCtn = styled.div`
  display: flex;
  height: 2.5rem;
  align-items: center;
`;

export const FieldCtn = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.gray};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray};
  display: flex;
  padding: 0.5rem 4rem;
  height: 2.5rem;
  & div {
    color: ${({ theme }) => theme.color.gray};
    /* width: rem; */
    text-align: center;
  }
`;

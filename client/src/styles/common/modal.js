import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalWrapper = styled.div`
  width: ${({ width }) => width || '26vw'};
  min-width: 18rem;
  background: white;
  min-height: 20vh;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 8px 8px 10px ${({ theme }) => theme.color.gray};
`;

export const ModalTitle = styled.div`
  text-align: center;
`;

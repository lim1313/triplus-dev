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
  position: relative;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.5);
  background: white;
  width: ${({ width }) => width || '26vw'};
  min-width: ${({ minWidth }) => minWidth || '18rem'};
  max-width: ${({ maxWidth }) => maxWidth || '26rem'};
  min-height: 20vh;
`;

export const ModalTitle = styled.div`
  text-align: center;
  font-size: ${({ fontSize }) => fontSize};
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

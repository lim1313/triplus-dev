import styled, { css } from 'styled-components';

export const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ palette, theme }) => theme.color[palette]};
  line-height: 2rem;
`;

export const BorderBtn = styled.button`
  width: ${({ width }) => width || 'auto'};
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize || '.9rem'};
  padding: 0.3em 1.1em;
  color: ${({ palette, theme }) => theme.color[palette]};
  border: 1.5px solid
    ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  margin-left: ${({ marginLeft }) => marginLeft || '0'};
  border-radius: 2px;
  background: none;
  transition: all 0.2s;
  &:hover {
    background-color: ${({ palette, theme }) =>
      palette ? theme.color[palette] : theme.color['black']};

    color: #fff;

    /* border: 1px solid ${({ theme }) => theme.color['gray']};
    color: ${({ theme }) => theme.color['gray']};
    ${({ palette, theme }) =>
      palette === 'blue' &&
      css`
        border: 1px solid ${theme.color['lightBlue']};
        color: ${theme.color['lightBlue']};
      `}
    ${({ palette, theme }) =>
      palette === 'red' &&
      css`
        border: 1px solid ${theme.color['lightRed']};
        color: ${theme.color['lightRed']};
      `}
    ${({ palette, theme }) =>
      palette === 'gray' &&
      css`
        border: 1px solid ${theme.color['black']};
        color: ${theme.color['black']};
      `} */
    cursor: pointer;
  }
`;

export const NoBorderBtn = styled.button`
  width: ${({ width }) => width || 'auto'};
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize || '.9rem'};
  text-align: center;
  padding: 0.3em 1.1em;
  color: ${({ palette, theme }) => theme.color[palette]};
  margin-left: ${({ marginLeft }) => marginLeft || '0'};
  border: none;
  border-radius: 2px;
  background: none;
  transition: all 0.2s;
  &:hover {
    color: ${({ theme }) => theme.color['gray']};
    ${({ palette, theme }) =>
      palette === 'blue' &&
      css`
        color: ${theme.color['lightBlue']};
      `}
    ${({ palette, theme }) =>
      palette === 'red' &&
      css`
        color: ${theme.color['lightRed']};
      `}
    ${({ palette, theme }) =>
      palette === 'gray' &&
      css`
        color: ${theme.color['black']};
      `}
    
    cursor: pointer;
  }
`;

export const ColorBtn = styled.button`
  width: ${({ width }) => width || 'auto'};
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize || '.9rem'};
  margin-left: ${({ marginLeft }) => marginLeft || '0'};
  padding: 0.3em 1.1em;
  color: #fff;
  border-radius: 2px;
  border: 1px solid
    ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  background: ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  transition: all 0.2s;
  &:hover {
    background: none;
    color: ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};

    /* border: 1px solid ${({ theme }) => theme.color['gray']};
    background: ${({ theme }) => theme.color['gray']};
    ${({ palette, theme }) =>
      palette === 'blue' &&
      css`
        border: 1px solid ${theme.color['lightBlue']};
        background: ${theme.color['lightBlue']};
      `}
    ${({ palette, theme }) =>
      palette === 'red' &&
      css`
        border: 1px solid ${theme.color['lightRed']};
        background: ${theme.color['lightRed']};
      `} */
    cursor: pointer;
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 1.5rem;
`;

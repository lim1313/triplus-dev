import React from 'react';
import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 6rem 5rem 5rem;
  width: 100vw;
  height: 35vh;
  background-color: ${({ main, theme }) => (main === 'main' ? '#fff' : `${theme.color.darkGray}`)};
`;

const LogoImg = styled.img`
  width: 6rem;
  object-fit: contain;
`;

const Description = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 6rem;
  > li {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.color.gray};
    > a {
      color: ${({ theme }) => theme.color.gray};
      text-decoration: none;
      &:hover {
        color: ${({ main, theme }) =>
          main === 'main' ? `${theme.color.lightBlue}` : `${theme.color.lightBlue}`};
      }
    }
  }
`;

const SmallTitle = styled.h3`
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: 0;
  color: ${({ main, theme }) =>
    main === 'main' ? `${theme.color.blue}` : `${theme.color.lightGray}`};
`;

export default function Footer({ main }) {
  return (
    <Container main={main}>
      <LogoImg src={main ? './asset/logo/logo.png' : './asset/logo/logoGray.png'} alt='로고' />
      <Description>
        <SmallTitle main={main}>Team</SmallTitle>
        <li>NanProgramMerge</li>
      </Description>
      <Description>
        <SmallTitle main={main}>Contributor</SmallTitle>
        <li className='githubId'>
          <a href='https://github.com/Je-chan' main={main}>
            <AiFillGithub className='giticon' /> 박예찬: Je-chan
          </a>
        </li>
        <li className='githubId'>
          <a href='https://github.com/song-code21' main={main}>
            <AiFillGithub className='giticon' /> 송하경: song-code21
          </a>
        </li>
        <li className='githubId'>
          <a href='https://github.com/lim1313' main={main}>
            <AiFillGithub className='giticon' /> 임예지: lim1313
          </a>
        </li>
        <li className='githubId'>
          <a href='https://github.com/jortier' main={main}>
            <AiFillGithub className='giticon' /> 최재원: Jortier
          </a>
        </li>
      </Description>
    </Container>
  );
}

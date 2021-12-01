import React from 'react';
import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${({ main }) => (main === 'main' ? '6rem 5rem 5rem' : '2rem')};
  width: 100vw;
  height: ${({ main }) => (main === 'main' ? '40vh' : '25vh')};
  background-color: ${({ main, theme }) => (main === 'main' ? '#fff' : `${theme.color.darkGray}`)};
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${({ main }) => (main === 'main' ? '40vh' : '50vh')};
  }
`;

const LogoImg = styled.img`
  width: 6rem;
  object-fit: contain;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 0.5rem 0;
    text-align: center;
  }
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
          main === 'main' ? `${theme.color.lightBlue}` : `${theme.color.lightRed}`};
      }
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding: 1rem;
    margin-left: 0;
    text-align: center;
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
      <Description main={main}>
        <SmallTitle main={main}>Contributor</SmallTitle>
        <li className='githubId'>
          <a href='https://github.com/Je-chan' target='_blank' rel='noreferrer'>
            <AiFillGithub className='giticon' /> 박예찬: Je-chan
          </a>
        </li>
        <li className='githubId'>
          <a href='https://github.com/song-code21' target='_blank' rel='noreferrer'>
            <AiFillGithub className='giticon' /> 송하경: song-code21
          </a>
        </li>
        <li className='githubId'>
          <a href='https://github.com/lim1313' target='_blank' rel='noreferrer'>
            <AiFillGithub className='giticon' /> 임예지: lim1313
          </a>
        </li>
        <li className='githubId'>
          <a href='https://github.com/jortier' target='_blank' rel='noreferrer'>
            <AiFillGithub className='giticon' /> 최재원: Jortier
          </a>
        </li>
      </Description>
    </Container>
  );
}

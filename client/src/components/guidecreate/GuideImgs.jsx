import React from 'react';
import styled, { css } from 'styled-components';

const ImgForm = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ImgCtn = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray};
  width: 32.8%;
  border-radius: 0.4rem;
  position: relative;
  background: url(${({ fileUrl }) => fileUrl});
  background-size: cover;
  & label {
    display: block;
    width: 100%;
    text-align: center;
    margin: 25% 0;
    color: ${({ theme }) => theme.color.gray};
    z-index: 2;
  }
  ${({ fileUrl }) =>
    fileUrl &&
    css`
      & label {
        color: white;
      }
    `}
  &:hover {
    border: 2px solid ${({ theme }) => theme.color.gray};
    & label {
      font-weight: bold;
    }
  }
  & img {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    z-index: 1;
  }
`;
const ImgInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

export default function GuideImgs(props) {
  const { fileUrl, handleImgChange } = props;
  return (
    <ImgForm>
      <ImgCtn fileUrl={fileUrl.file}>
        {fileUrl.file ? (
          <>
            <label htmlFor='file'>
              +
              <br />
              사진선택
            </label>
            <ImgInput type='file' id='file' onChange={handleImgChange} />
          </>
        ) : (
          <label htmlFor='file'>
            +
            <br />
            사진선택
          </label>
        )}
        <ImgInput type='file' id='file' onChange={handleImgChange} />
      </ImgCtn>
      <ImgCtn fileUrl={fileUrl.file2}>
        {fileUrl.file2 ? (
          <>
            <label htmlFor='file2'>
              +
              <br />
              사진선택
            </label>
            <ImgInput type='file' id='file2' onChange={handleImgChange} />
          </>
        ) : (
          <>
            <label htmlFor='file2'>
              +
              <br />
              사진선택
            </label>
            <ImgInput type='file' id='file2' onChange={handleImgChange} />
          </>
        )}
      </ImgCtn>
      <ImgCtn fileUrl={fileUrl.file3}>
        {fileUrl.file3 ? (
          <>
            <label htmlFor='file3'>
              +
              <br />
              사진선택
            </label>
            <ImgInput type='file' id='file3' onChange={handleImgChange} />
          </>
        ) : (
          <>
            <label htmlFor='file3'>
              +
              <br />
              사진선택
            </label>
            <ImgInput type='file' id='file3' onChange={handleImgChange} />
          </>
        )}
      </ImgCtn>
    </ImgForm>
  );
}

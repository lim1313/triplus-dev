import React from 'react';
import styled from 'styled-components';

const ImgForm = styled.form`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ImgCtn = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray};
  width: 32.8%;
  /* padding-bottom: 20%; */
  border-radius: 0.4rem;
  & label {
    display: block;
    width: 100%;
    text-align: center;
    margin: 25% 0;
    color: ${({ theme }) => theme.color.gray};
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

export default function GuideImgs() {
  return (
    <ImgForm>
      <ImgCtn>
        <label htmlFor='file'>
          +
          <br />
          사진선택
        </label>
        <ImgInput type='file' id='file' />
      </ImgCtn>
      <ImgCtn>
        <label htmlFor='file2'>
          +
          <br />
          사진선택
        </label>
        <ImgInput type='file' id='file2' />
      </ImgCtn>
      <ImgCtn>
        <label htmlFor='file3'>
          +
          <br />
          사진선택
        </label>
        <ImgInput type='file' id='file3' />
      </ImgCtn>
    </ImgForm>
  );
}

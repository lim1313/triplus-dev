/*eslint-disable no-unused-vars*/

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { BorderBtn, ColorBtn } from '../../styles/common';
// import { FaUserAlt } from 'react-icons/fa';

const ProfileWrapper = styled.div`
  margin-right: 2rem;

  & .ratio {
    text-align: center;
    font-size: 0.8rem;
  }
`;

const ImgWrapper = styled.img`
  position: relative;
  width: 165px;
  height: 220px;
  object-fit: contain;
  border-radius: 0.5rem;
  background-color: #fff;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;

  & input[type='file'] {
    display: none;
  }
`;

const LabelBtnColor = styled(ColorBtn).attrs({ as: 'label' })`
  text-align: center;
  padding: 0.1em 1.1em;
  margin-bottom: 0.5rem;
`;

const BtnColor = styled(ColorBtn).attrs({ as: 'label' })`
  text-align: center;
  padding: 0.1em 1.1em;
  margin-bottom: 0.5rem;
`;

const BtnBorder = styled(BorderBtn)`
  padding: 0.1em 1.1em;
`;

export default function MyProfile({ image }) {
  const [isChange, setIsChange] = useState(false);
  const [imgFile, setImgFile] = useState(null); //파일
  const imgRef = useRef(null);

  const changeImage = (e) => {
    setIsChange(!isChange);
  };

  const selectImage = (e) => {
    if (!e.target.files[0]) return;
    setImgFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <ProfileWrapper>
      <ImgWrapper src={imgFile || image} alt='프로필' ref={imgRef} />
      {isChange && <div className='ratio'>추천비율 : 4 X 3</div>}
      <BtnWrapper>
        <input type='file' id='upload' onChange={selectImage} />
        {isChange ? (
          <LabelBtnColor htmlFor='upload' palette='blue' onClick={changeImage}>
            업로드
          </LabelBtnColor>
        ) : (
          <BtnColor onClick={changeImage} palette='blue'>
            수정
          </BtnColor>
        )}
        {isChange ? <BtnBorder onClick={changeImage}>저장</BtnBorder> : <BtnBorder>삭제</BtnBorder>}
      </BtnWrapper>
    </ProfileWrapper>
  );
}

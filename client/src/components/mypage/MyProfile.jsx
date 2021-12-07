/*eslint-disable no-unused-vars*/

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { BorderBtn, ColorBtn } from '../../styles/common';
import { v4 as uuid4 } from 'uuid';
import S3 from 'react-aws-s3';
import { deleteProfile, postProfile } from '../../network/my/http';

const ProfileWrapper = styled.div`
  margin-right: 2rem;

  & .info {
    text-align: center;
    font-size: 0.7rem;
  }
`;

const ImgWrapper = styled.img`
  position: relative;
  width: 165px;
  height: 220px;
  object-fit: cover;
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

const BtnColor = styled(ColorBtn)`
  text-align: center;
  padding: 0.1em 1.1em;
  margin-bottom: 0.5rem;
`;

const BtnBorder = styled(BorderBtn)`
  padding: 0.1em 1.1em;
`;

export default function MyProfile({ image }) {
  const [isChange, setIsChange] = useState(false);
  const [fileImg, setFileImg] = useState(null); //파일
  const [previewImg, setPreviewImg] = useState(null); //미리보기

  const imgRef = useRef();

  const delImage = async () => {
    const config = {
      bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
      dirName: 'asset/profile',
      region: process.env.REACT_APP_S3_REGION,
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    };

    const ReactS3Client = new S3(config);

    if (!image) return;
    //* 삭제 확인 모달 필요
    const oldImg = image;
    await ReactS3Client.deleteFile(oldImg)
      .then(() => {
        //TODO DELETE /mypage/profile
        // deleteProfile()
        //   .then(() => {
        //     console.log('success');
        //   })
        //   .catch((err) => console.error(err));
        console.log('success');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const saveImage = async () => {
    const config = {
      bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
      dirName: 'asset/profile',
      region: process.env.REACT_APP_S3_REGION,
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    };

    const ReactS3Client = new S3(config);

    //* 이미지가 존재하는 경우 해당 이미지는 s3에서 제거
    if (image) {
      const oldImg = image;
      await ReactS3Client.deleteFile(oldImg)
        .then(() => {
          //TODO DELETE /mypage/profile
          // deleteProfile()
          //   .then(() => {
          //     console.log('success');
          //   })
          //   .catch((err) => console.error(err));
          console.log('success');
        })
        .catch((err) => {
          console.log('this is err');
          console.error(err);
        });
    }

    const newFileName = uuid4();

    //* 이미지 s3에 저장
    ReactS3Client.uploadFile(fileImg, newFileName)
      .then((data) => {
        // TODO POST /mypage/image
        // postProfile(data.location).then(() => {
        //   setIsChange(!isChange);
        // });
        // console.log(data);
        console.log('location', data.location);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const selectImage = (e) => {
    //* 만약 취소를 누를 경우 return
    if (!e.target.files[0]) return;
    setFileImg(e.target.files[0]);
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <ProfileWrapper>
      <ImgWrapper
        src={previewImg || image}
        alt='프로필'
        ref={imgRef}
        onError={() => {
          return (imgRef.current.src = '/asset/else/userBlank.png');
        }}
      />
      {isChange && (
        <>
          <div className='info'>* 확장자 png / jpg / jpeg 가능</div>
          <div className='info'>* 추천비율 : 3 X 4</div>
        </>
      )}
      <BtnWrapper>
        <input type='file' id='upload' onChange={selectImage} accept='.png, .jpg, .jpeg' />
        {isChange ? (
          <LabelBtnColor htmlFor='upload' palette='blue'>
            파일선택
          </LabelBtnColor>
        ) : (
          <BtnColor onClick={() => setIsChange(!isChange)} palette='blue'>
            수정
          </BtnColor>
        )}
        <BtnBorder onClick={isChange ? saveImage : delImage}>
          {isChange ? '저장' : '삭제'}
        </BtnBorder>
      </BtnWrapper>
    </ProfileWrapper>
  );
}

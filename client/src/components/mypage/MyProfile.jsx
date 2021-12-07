/*eslint-disable no-unused-vars*/

import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { BorderBtn, ColorBtn } from '../../styles/common';
import { v4 as uuid4 } from 'uuid';
import S3 from 'react-aws-s3';
import { deleteProfile, postProfile } from '../../network/my/http';
import SpinLoading from '../common/SpinLoading';

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

  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        cursor: not-allowed;
        background-color: ${({ theme }) => theme.color.blue};
        color: #fff;
      }
    `}
`;

const BtnColor = styled(ColorBtn)`
  text-align: center;
  padding: 0.1em 1.1em;
  margin-bottom: 0.5rem;

  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        cursor: not-allowed;
        background-color: ${({ theme }) => theme.color.blue};
        color: #fff;
      }
    `}
`;

const BtnBorder = styled(BorderBtn)`
  padding: 0.1em 1.1em;

  ${({ disabled }) =>
    disabled &&
    css`
      &:hover {
        cursor: not-allowed;
        background-color: unset;
      }
    `}
`;

export default function MyProfile({ image }) {
  const [isChange, setIsChange] = useState(false);
  const [fileImg, setFileImg] = useState(null); //파일
  const [previewImg, setPreviewImg] = useState(null); //미리보기
  const [imguuid, setImguuid] = useState(image); // 새로운 파일명
  const [isLoading, setIsLoading] = useState(false);

  const imgRef = useRef();

  const delSaveImg = async (state) => {
    if (state === 'save' && !fileImg) {
      console.log('파일을 선택하세요');
      return;
    }

    if (state === 'del' && !imguuid) {
      console.log('삭제할 파일이 없습니다.');
      return;
    }

    const config = {
      bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
      dirName: 'asset/profile',
      region: process.env.REACT_APP_S3_REGION,
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    };
    const ReactS3Client = new S3(config);

    setIsLoading(true);
    //* 이미지가 존재하는 경우 or 삭제하는 경우 해당 이미지는 s3에서 제거
    if (imguuid) {
      const oldImg = imguuid;
      await ReactS3Client.deleteFile(oldImg)
        .then((res) => {
          //TODO DELETE /mypage/profile
          // deleteProfile()
          //   .then(() => {
          //     console.log('success');
          //     if (state === 'del') {
          //     setImguuid('/asset/else/userBlank.png')
          //     setIsLoading(false);
          //     }
          //   })
          //   .catch((err) => console.error(err));
          console.log('success', res);
          setTimeout(() => {
            if (state === 'del') {
              setPreviewImg(null);
              setImguuid('/asset/else/userBlank.png');
              setIsLoading(false);
            }
          }, 1000);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (state === 'del') return;

    const newFileName = uuid4();
    //* 이미지 s3에 저장
    await ReactS3Client.uploadFile(fileImg, newFileName)
      .then((data) => {
        // TODO POST /mypage/image
        // postProfile(data.location).then(() => {
        //   setIsChange(!isChange);
        //   setImguuid(newFileName+fileImg.name.split('.')[1])
        //   setFileImg(null);
        //   setIsLoading(false);
        // }).catch(err => console.error(err))

        console.log('location', data);
        setTimeout(() => {
          setIsChange(!isChange);
          setImguuid(newFileName + fileImg.name.split('.')[1]);
          setFileImg(null);
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const selectImage = (e) => {
    //* 만약 취소를 누를 경우 return
    if (!e.target.files[0]) return;
    let imgFile = e.target.files[0];
    setFileImg(imgFile);
    setPreviewImg(URL.createObjectURL(imgFile));
  };

  return (
    <ProfileWrapper>
      <ImgWrapper
        src={previewImg || imguuid}
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
        <input
          type='file'
          id='upload'
          onChange={selectImage}
          accept='.png, .jpg, .jpeg'
          disabled={isLoading}
        />

        {isChange ? (
          <LabelBtnColor htmlFor='upload' palette='blue' disabled={isLoading}>
            {(fileImg && fileImg.name) || '파일선택'}
          </LabelBtnColor>
        ) : (
          <BtnColor onClick={() => setIsChange(!isChange)} palette='blue' disabled={isLoading}>
            수정
          </BtnColor>
        )}
        <BtnBorder
          onClick={isChange ? () => delSaveImg('save') : () => delSaveImg('del')}
          disabled={isLoading}
        >
          {isLoading ? <SpinLoading /> : isChange ? '저장' : '삭제'}
        </BtnBorder>
      </BtnWrapper>
    </ProfileWrapper>
  );
}

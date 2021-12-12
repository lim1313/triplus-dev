/*eslint-disable no-unused-vars*/

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid4 } from 'uuid';
import S3 from 'react-aws-s3';
import { deleteProfile, postProfile } from '../../network/my/http';
import DeleteSave from './MyProfile/DeleteSave';
import FileChange from './MyProfile/FileChange';

const ProfileWrapper = styled.div`
  margin-right: 2rem;

  & .info {
    text-align: center;
    font-size: 0.7rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    margin-right: 0;
    text-align: center;
    margin-bottom: 3rem;
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

export default function MyProfile({ image }) {
  const [isChange, setIsChange] = useState(false);
  const [fileImg, setFileImg] = useState(null); //업로드 파일
  const [previewImg, setPreviewImg] = useState(null); //미리보기
  const [imguuid, setImguuid] = useState(image); // 새로운 파일

  const [isLoading, setIsLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const imgRef = useRef();

  const delSaveImg = async (state) => {
    const config = {
      bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
      dirName: 'asset/profile',
      region: process.env.REACT_APP_S3_REGION,
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    };
    const ReactS3Client = new S3(config);

    //* 이미지가 존재하는 경우 or 삭제하는 경우 해당 이미지는 s3에서 제거
    setIsLoading(true);
    if (imguuid) {
      const oldImg = imguuid.split('/')[5];
      await ReactS3Client.deleteFile(oldImg)
        .then((res) => {
          //TODO DELETE /mypage/profile
          deleteProfile()
            .then(() => {
              if (state === 'del') {
                setPreviewImg(null);
                setImguuid(null);
                setIsLoading(false);
              }
            })
            .catch((err) => console.error(err));
          setTimeout(() => {
            if (state === 'del') {
              setPreviewImg(null);
              setImguuid(null);
              setIsLoading(false);
            }
          }, 1000);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (state === 'del') return;

    //* 이미지 s3에 저장
    const newFileName = uuid4();
    await ReactS3Client.uploadFile(fileImg, newFileName)
      .then((data) => {
        // TODO POST /mypage/image
        postProfile(data.location)
          .then(() => {
            setIsChange(!isChange);
            setImguuid(data.location);
            setFileImg(null);
            setPreviewImg(null);
            setIsLoading(false);
          })
          .catch((err) => console.error(err));

        setTimeout(() => {
          setIsChange(!isChange);
          setImguuid(data.location);
          setFileImg(null);
          setPreviewImg(null);
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log('end');
  };

  const selectImage = (e) => {
    //* 만약 취소를 누를 경우 return
    if (!e.target.files[0]) return;
    let imgFile = e.target.files[0];
    setFileImg(imgFile);
    setPreviewImg(URL.createObjectURL(imgFile));
    e.target.value = null;
  };

  return (
    <ProfileWrapper>
      <ImgWrapper
        src={previewImg || imguuid || '/asset/else/userBlank.png'}
        alt='프로필'
        ref={imgRef}
        onError={() => setImguuid(null)}
      />
      {isChange && (
        <>
          <div className='info'>* 확장자 png / jpg / jpeg 가능</div>
          <div className='info'>* 추천비율 : 3 X 4</div>
        </>
      )}
      <BtnWrapper>
        <FileChange
          selectImage={selectImage}
          isLoading={isLoading}
          isChange={isChange}
          fileImg={fileImg}
          clickChange={() => {
            setIsChange(!isChange);
            setAlertMsg(null);
          }}
        />
        <DeleteSave
          isChange={isChange}
          isLoading={isLoading}
          delSaveImg={delSaveImg}
          fileImg={fileImg}
          imguuid={imguuid}
          clickChange={() => {
            setIsChange(!isChange);
            setPreviewImg(null);
            setFileImg(null);
            setAlertMsg(null);
          }}
          alertMsg={alertMsg}
          clickSubmit={(msg) => {
            setAlertMsg(msg);
          }}
        />
      </BtnWrapper>
    </ProfileWrapper>
  );
}

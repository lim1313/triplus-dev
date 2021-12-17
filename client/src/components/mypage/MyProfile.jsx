import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid4 } from 'uuid';
import S3 from 'react-aws-s3';
import { deleteProfile, postProfile } from '../../network/my/http';
import DeleteSave from './MyProfile/DeleteSave';
import FileChange from './MyProfile/FileChange';
import { useError } from '../../hooks/useError';

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
  display: inline-block;
  width: 165px;
  height: 220px;
  object-fit: cover;
  border-radius: 0.5rem;
  background-color: ${({ src }) => (src ? '#fff' : 'rgba(246, 247, 250, 1)')}; ;
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
  const [isError] = useError();
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

    //* s3에서 제거
    setIsLoading(true);
    if (state === 'del' && imguuid) {
      const oldImg = imguuid.split('/')[5];
      await ReactS3Client.deleteFile(oldImg)
        .then((res) => {
          //TODO DELETE /mypage/profile
          deleteProfile().then((res) => {
            if (res === 401) return isError();
            else if (res >= 400) {
              alert('에러가 발생했습니다. 다시 시도해 주세요.');
            } else {
              setPreviewImg(null);
              setImguuid(null);
            }
            setIsLoading(false);
          });
        })
        .catch((err) => {
          alert('*에러가 발생했습니다. 다시 시도해 주세요.');
          setIsLoading(false);
        });
    }
    if (state === 'del') return;

    //* 이미지 s3에 저장
    const newFileName = uuid4();
    await ReactS3Client.uploadFile(fileImg, newFileName)
      .then((data) => {
        // TODO POST /mypage/image
        postProfile(data.location).then((res) => {
          if (res === 401) return isError();
          else if (res >= 400) {
            alert('에러가 발생했습니다. 다시 시도해 주세요.');
          } else {
            setImguuid(data.location);
          }
          setFileImg(null);
          setPreviewImg(null);
          setIsChange(!isChange);
          setIsLoading(false);
        });
      })
      .catch(() => {
        alert('*에러가 발생했습니다. 다시 시도해 주세요.');
        setFileImg(null);
        setPreviewImg(null);
        setIsChange(!isChange);
        setIsLoading(false);
      });
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
        ref={imgRef}
        src={previewImg || imguuid || '/asset/else/userBlank.png'}
        alt='프로필'
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

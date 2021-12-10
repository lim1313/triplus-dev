/*eslint-disable no-unused-vars*/

import React, { useEffect, useRef } from 'react';
import { getCardModal, getGuideCards } from '../../../network/map/http';
import { useDispatch, useSelector } from 'react-redux';
import { guideCardInfo, openGuideModal } from '../../../redux/map/action';
import { createMarker, getInfo } from '../../../utils/kakao';
import styled from 'styled-components';

const { kakao } = window;
let map;

const MapWrapper = styled.div`
  height: 100%;

  & .infowindow {
    display: inline-block;
    position: relative;
    top: -70px;
    background: white;
    border-radius: 10px;
    word-break: break-word;
    text-align: center;
    padding: 10px 13px;
    font-weight: 500;
    box-shadow: 0px 0px 5px 2px rgba(46, 46, 46, 0.2);
    border: 4px solid ${({ theme }) => theme.color.lightGray};
  }
`;

export default function KakaoMap({ filterInfo, loading }) {
  const filterRef = useRef();
  filterRef.current = filterInfo;
  const mapRef = useRef(null);

  const dispatch = useDispatch();

  //* 지도 생성
  useEffect(() => {
    let startLat = 37.518197895084874;
    let startLog = 126.98255734652028;

    let container = mapRef.current;
    let options = {
      center: new kakao.maps.LatLng(startLat, startLog),
      level: 7,
    };
    map = new kakao.maps.Map(container, options);
    //* 지도 이동, 확대, 축소 이벤트 발생
    kakao.maps.event.addListener(map, 'dragend', kakaoEvent);
    kakao.maps.event.addListener(map, 'zoom_changed', kakaoEvent);
  }, []);

  useEffect(() => {
    //* 첫 렌더링 & 가이드 필터를 했을 때 filter
    kakaoEvent();
  }, [filterInfo]);

  //! 리렌더링 발생. 개선 필요
  const clickMarker = (id) => {
    //TODO GET /map 모달
    getCardModal(id).then((res) => {
      dispatch(openGuideModal({ isOpen: true, modalInfo: res }));
    });
  };

  const kakaoEvent = () => {
    loading(true);
    let latLngparams = getInfo(map);
    latLngparams = { ...latLngparams, ...filterRef.current };

    // TODO GET 요청
    getGuideCards(latLngparams).then((data) => {
      dispatch(openGuideModal({ isOpen: false, modalInfo: {} }));
      if (!data) return;
      dispatch(guideCardInfo(data));
      createMarker(data, map, clickMarker);
      loading(false);
    });
  };

  return <MapWrapper ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}

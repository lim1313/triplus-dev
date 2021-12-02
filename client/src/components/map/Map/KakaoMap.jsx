/*eslint-disable no-unused-vars*/

import React, { useEffect, useRef } from 'react';
import { getGuideCards } from '../../../network/map/http';
import { useDispatch } from 'react-redux';
import guideCardInfo from '../../../redux/map/action';
import { createMarker, getInfo } from '../../../utils/kakao';
import styled from 'styled-components';

const { kakao } = window;
let map;

const MapWrapper = styled.div`
  height: 100%;
`;

export default function KakaoMap({ filterInfo }) {
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

  const kakaoEvent = () => {
    let latLngparams = getInfo(map);
    if (filterInfo) {
      latLngparams = { ...latLngparams, ...filterInfo };
    }
    // TODO GET 요청
    getGuideCards(latLngparams).then((data) => {
      if (!data) return;
      dispatch(guideCardInfo(data));
      createMarker(data, map);
    });
  };

  return <MapWrapper ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}

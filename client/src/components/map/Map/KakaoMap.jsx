/*eslint-disable no-unused-vars*/

import React, { useEffect, useRef } from 'react';
import { getGuideCards } from '../../../network/map/http';
import { useDispatch } from 'react-redux';
import guideCardInfo from '../../../redux/map/action';
import { createMarker, getInfo } from '../../../utils/kakao';

import { db } from '../../../db/guideCard';

const { kakao } = window;

export default function KakaoMap() {
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let startLat = 37.518197895084874;
    let startLog = 126.98255734652028;

    //* 지도 생성
    let container = mapRef.current;
    let options = {
      center: new kakao.maps.LatLng(startLat, startLog),
      level: 7,
    };
    let map = new kakao.maps.Map(container, options);

    const kakaoEvent = () => {
      let latLngparams = getInfo(map);
      // TODO GET 요청
      // getGuideCards(latLngparams).then((data) => {

      //   dispatch(guideCardInfo(data))
      //   createMarker(data,map);
      // });

      //! dummy data
      dispatch(guideCardInfo(db));
      createMarker(db, map);
    };

    //* 첫 렌더링될 때 해당 지역 카드 보여준다.
    kakaoEvent();

    //* 지도 이동, 확대, 축소 이벤트 발생
    kakao.maps.event.addListener(map, 'dragend', kakaoEvent);
    kakao.maps.event.addListener(map, 'zoom_changed', kakaoEvent);
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}

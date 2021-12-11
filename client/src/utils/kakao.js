/*eslint-disable no-unused-vars*/

import { getDday } from './dDay';

const { kakao } = window;
let markers = [];
let overlays = [];

//* 좌표 얻기
export const getInfo = (map) => {
  let bounds = map.getBounds();
  let swLatLng = bounds.getSouthWest(); // 남서
  let neLatLng = bounds.getNorthEast(); // 북동
  return { swLat: swLatLng.Ma, swLng: swLatLng.La, neLat: neLatLng.Ma, neLng: neLatLng.La };
};

//* 마커 삭제
export const deleteMarker = () => {
  if (!markers.length) return;
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
    overlays[i].setMap(null);
  }
};

//* 마커 생성
export const createMarker = (positions, map, clickMarker) => {
  let positionInfo = positions.map((data) => {
    let { title, latitude, longitude } = data;
    return { title, latlng: new kakao.maps.LatLng(latitude, longitude) };
  });
  console.log(positions);
  // 마커 이미지 / 이미지 크기 / 마커 이미지 생성
  let imageSrc = '/asset/loading/loading4.png';
  let imageSize = new kakao.maps.Size(35, 35);
  let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  // 새로운 마커 생성
  for (let i = 0; i < positionInfo.length; i++) {
    let marker = new kakao.maps.Marker({
      map, // 마커를 표시할 지도
      position: positionInfo[i].latlng, // 마커를 표시할 위치
      image: markerImage, // 마커 이미지
      clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
    });

    marker.setClickable(true);
    let overlay = new kakao.maps.CustomOverlay({
      map,
      content: `<div class="infowindow">
      <div class="dday">D - ${getDday(positions[i].guideDate)}</div>
      <div class="wrapper">
        <div class="title">${positions[i].title}</div>
        <div  class="content">${
          positions[i].content.length > 20
            ? positions[i].content.slice(0, 20) + '...'
            : positions[i].content
        }</div>      
      </div>
      </div>
      `,
      position: marker.getPosition(),
      xAnchor: 0.5,
      yAnchor: 1.4,
    });

    overlays.push(overlay);
    overlay.setMap(null);
    kakao.maps.event.addListener(marker, 'mouseover', () => overlay.setMap(map));
    kakao.maps.event.addListener(marker, 'mouseout', () => overlay.setMap(null));
    kakao.maps.event.addListener(marker, 'click', () => clickMarker(positions[i].guideId));
    markers.push(marker);
  }
};

//yeji 20211212

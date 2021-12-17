/*eslint-disable no-unused-vars*/

import { getDday } from './dDay';

const { kakao } = window;
let markers = {};
export let overlays = {};

//* 좌표 얻기
export const getInfo = (map) => {
  let bounds = map.getBounds();
  let swLatLng = bounds.getSouthWest(); // 남서
  let neLatLng = bounds.getNorthEast(); // 북동
  return { swLat: swLatLng.Ma, swLng: swLatLng.La, neLat: neLatLng.Ma, neLng: neLatLng.La };
};

//* 마커, overlay 삭제
export const deleteMarker = () => {
  for (let key in markers) {
    markers[key].setMap(null);
    overlays[key].setMap(null);
  }
};

//* 마커 생성
export const createMarker = (positions, map, clickMarker) => {
  // // 마커 이미지 / 이미지 크기 / 마커 이미지 생성
  // let imageSrc = '/asset/loading/loading4.png';
  // let imageSize = new kakao.maps.Size(35, 35);
  // let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  // // 새로운 마커 생성
  // for (let i = 0; i < positions.length; i++) {
  //   let position = positions[i];
  //   let marker = new kakao.maps.Marker({
  //     map, // 마커를 표시할 지도
  //     position: new kakao.maps.LatLng(position.latitude, position.longitude), // 마커를 표시할 위치
  //     image: markerImage, // 마커 이미지
  //     clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
  //   });
  //   let overlay = new kakao.maps.CustomOverlay({
  //     map,
  //     content: `<div class="infowindow">
  //     <div class="dday">D - ${getDday(positions[i].guideDate)}</div>
  //     <div class="wrapper">
  //       <div class="title">${positions[i].title}</div>
  //       <div  class="content">${
  //         positions[i].content.length > 20
  //           ? positions[i].content.slice(0, 20) + '...'
  //           : positions[i].content
  //       }</div>
  //     </div>
  //     </div>
  //     `,
  //     position: marker.getPosition(),
  //     xAnchor: 0.5,
  //     yAnchor: 0.02,
  //   });
  //   overlays[position.guideId] = overlay;
  //   overlay.setMap(null);
  //   kakao.maps.event.addListener(marker, 'mouseover', () => overlay.setMap(map));
  //   kakao.maps.event.addListener(marker, 'mouseout', () => overlay.setMap(null));
  //   kakao.maps.event.addListener(marker, 'click', () => clickMarker(positions[i].guideId));
  //   markers[position.guideId] = marker;
  // }
  //!----------------

  // 새로운 마커 생성
  for (let i = 0; i < positions.length; i++) {
    let position = positions[i];

    let marker = new kakao.maps.CustomOverlay({
      map,
      content: `<SVG class='_${position.guideId} svgMarker' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1100.51 1337.49' style="width: 2rem" >
        <circle style="fill: #3487f7" cx="521.46" cy="521.46" r="521.46" />
        <path
          style="fill: #e9edf3"
          d="M826.23,541.89l-74.49-67.5a13.2,13.2,0,0,0-9.43-3.53l-174.65,3.68V418l175.23-3.69a13.61,13.61,0,0,0,13.32-13.61V284.28a13.62,13.62,0,0,0-13.32-13.61L567.66,267V230.3a46.2,46.2,0,1,0-92.4,0V265L300.6,261.36h-.28a13.6,13.6,0,0,0-9.14,3.53l-74.49,67.5a13.61,13.61,0,0,0,0,20.17l74.49,67.51a13.59,13.59,0,0,0,9.14,3.52h.28l174.66-3.68v56.58L300,480.18a13.6,13.6,0,0,0-13.32,13.6V610.17A13.61,13.61,0,0,0,300,623.78l175.23,3.69V858.81h27.22V628l38,.8v230h27.22V629.41l174.65,3.68h.29a13.63,13.63,0,0,0,9.14-3.52l74.49-67.51a13.61,13.61,0,0,0,0-20.17ZM502.48,230.3a19,19,0,1,1,38,0v36.11l-38-.8Zm-197,166L246.1,342.48l59.34-53.79,169.82,3.58v.16h7.81L729,297.61v89.74Zm235,22.28v56.57l-38,.8V419.34Zm197,187.22-423.54-8.91V507.11l423.54-8.92L796.82,552Z"/>
      </SVG>`,
      position: new kakao.maps.LatLng(position.latitude, position.longitude),
      xAnchor: 0,
      yAnchor: 0,
    });

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
      position: new kakao.maps.LatLng(position.latitude, position.longitude),
      xAnchor: 0.39,
      yAnchor: -0.3,
    });

    overlays[position.guideId] = overlay;
    overlay.setMap(null);
    markers[position.guideId] = marker;

    let svgMarker = document.querySelector(`._${position.guideId}`);
    // if (!svgMarker) console.log('nulllll');
    if (svgMarker) {
      svgMarker.addEventListener('mouseenter', () => overlays[position.guideId].setMap(map));
      svgMarker.addEventListener('mouseleave', () => overlays[position.guideId].setMap(null));
      svgMarker.addEventListener('click', () => clickMarker(positions[i].guideId));
    }
  }
};
//yeji 20211216

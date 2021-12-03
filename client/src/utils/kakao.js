const { kakao } = window;

//* 좌표 얻기
export const getInfo = (map) => {
  let bounds = map.getBounds();
  let swLatLng = bounds.getSouthWest(); // 남서
  let neLatLng = bounds.getNorthEast(); // 북동
  return { swLat: swLatLng.Ma, swLng: swLatLng.La, neLat: neLatLng.Ma, neLng: neLatLng.La };
};

//* 마커 생성
export const createMarker = (positions, map, clickMarker) => {
  let positionInfo = positions.map((data) => {
    let { title, latitude, longitude } = data;
    return { title, latlng: new kakao.maps.LatLng(latitude, longitude) };
  });

  // 마커 이미지 / 이미지 크기 / 마커 이미지 생성
  let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
  let imageSize = new kakao.maps.Size(32, 42);
  let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  for (let i = 0; i < positions.length; i++) {
    // 마커를 생성
    let marker = new kakao.maps.Marker({
      map, // 마커를 표시할 지도
      position: positionInfo[i].latlng, // 마커를 표시할 위치
      title: positionInfo[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
      image: markerImage, // 마커 이미지
      clickable: true,
    });
    let overlay = new kakao.maps.CustomOverlay({
      map: map,
      content: `<div class="infowindow">${positionInfo[i].title}</div>`,
      position: marker.getPosition(),
    });

    overlay.setMap(null);
    kakao.maps.event.addListener(marker, 'mouseover', () => overlay.setMap(map));
    kakao.maps.event.addListener(marker, 'mouseout', () => overlay.setMap(null));
    kakao.maps.event.addListener(marker, 'click', () => clickMarker(positions[i].guideId));
  }
};

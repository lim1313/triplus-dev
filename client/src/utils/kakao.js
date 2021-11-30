const { kakao } = window;

//* 좌표 얻기
export const getInfo = (map) => {
  // 지도의 현재 영역을 얻어옵니다
  let bounds = map.getBounds();
  let swLatLng = bounds.getSouthWest(); // 남서
  let neLatLng = bounds.getNorthEast(); // 북동
  let center = map.getCenter();
  console.log({ swLat: swLatLng.Ma, swLng: swLatLng.La, neLat: neLatLng.Ma, neLng: neLatLng.La });
  return [
    { swLat: swLatLng.Ma, swLng: swLatLng.La, neLat: neLatLng.Ma, neLng: neLatLng.La },
    center,
  ];
};

//* 마커 생성
export const createMarker = (positions, map) => {
  positions = positions.map((data) => {
    let { title, latitude, longitude } = data;
    return { title, latlng: new kakao.maps.LatLng(latitude, longitude) };
  });

  // 마커 이미지
  let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

  for (let i = 0; i < positions.length; i++) {
    // 마커 이미지의 이미지 크기
    let imageSize = new kakao.maps.Size(24, 35);

    // 마커 이미지를 생성
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성
    new kakao.maps.Marker({
      map, // 마커를 표시할 지도
      position: positions[i].latlng, // 마커를 표시할 위치
      title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
      image: markerImage, // 마커 이미지
    });
  }
};

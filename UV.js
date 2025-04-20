let map;
let marker;

function getUVIndex() {
  const regionSelect = document.getElementById("region");
  const areaNo = regionSelect.value;
  const regionName = regionSelect.options[regionSelect.selectedIndex].text;

  const serviceKey =
    "vZcbeZUzwbrgx0iB/POXYTFGBY7GoKnVTELcbLYcYjPk5gPwiLApjLiyxa44E0yYtTKduHkwxuvtO4UQq7l5Yg==";
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const timeStr = `${yyyy}${mm}${dd}${hh}`;

  const url =
    `https://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4?` +
    `ServiceKey=${encodeURIComponent(serviceKey)}` +
    `&areaNo=${encodeURIComponent(areaNo)}` +
    `&time=${encodeURIComponent(timeStr)}` +
    `&dataType=xml`;

  document.getElementById("result").innerText = "조회 중...";
  document.getElementById("warning").innerText = "";

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP 오류: ${response.status}`);
      return response.text();
    })
    .then((str) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(str, "application/xml");

      const item = xmlDoc.querySelector("items > item");
      if (!item) throw new Error("item 요소를 찾을 수 없습니다.");

      const h0 = item.querySelector("h0");
      const h0Value =
        h0 && h0.textContent.trim() !== "" ? parseFloat(h0.textContent) : null;

      if (h0Value === null) {
        document.getElementById("result").innerText = "자외선 지수 정보 없음";
        return;
      }

      document.getElementById(
        "result"
      ).innerText = `현재 자외선 지수: ${h0Value}`;

      let warningText = "";
      if (h0Value >= 11) {
        warningText = "⚠️ 자외선 지수 위험 단계! 외출을 자제하세요.";
      } else if (h0Value >= 8) {
        warningText = "매우 높음: 자외선 차단제를 꼭 바르세요!";
      } else if (h0Value >= 6) {
        warningText = "높음: 모자와 선크림이 필요합니다.";
      } else if (h0Value >= 3) {
        warningText = "보통: 야외 활동 시 주의하세요.";
      } else {
        warningText = "낮음: 자외선 걱정은 적습니다.";
      }

      document.getElementById("warning").innerText = warningText;

      // 지도 이동
      moveMapByCityName(regionName);
    })
    .catch((error) => {
      console.error("에러 발생:", error);
      document.getElementById("result").innerText =
        "정보를 가져오지 못했습니다.";
    });
}

function moveMapByCityName(address) {
  const geocoder = new kakao.maps.services.Geocoder();
  geocoder.addressSearch(address, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      map.setCenter(coords);
      if (marker) marker.setMap(null);
      marker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });
    } else {
      console.warn("주소를 찾을 수 없습니다:", address);
    }
  });
}

function initMap() {
  map = new kakao.maps.Map(document.getElementById("map"), {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 9,
  });
  getUVIndex(); // 초기 로딩
}

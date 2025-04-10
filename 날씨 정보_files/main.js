const API_ENDPOINT = 'https://goweather.herokuapp.com/weather';

function getWeather() {
    // 1️⃣ 도시 입력값 가져오기
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert('도시를 입력하세요!');
        return;
    }

    // 2️⃣ API 요청 URL 생성
    const url = `${API_ENDPOINT}/${city}`;
    console.log("API 요청 URL:", url); // 확인용 로그

    // 3️⃣ API 호출
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API 응답 데이터:", data); // 확인용 로그

            // 4️⃣ 응답 데이터 처리 (goweather API의 JSON 구조에 맞춰 변경)
            const weatherDesc = data.description; // 날씨 설명
            const temp = data.temperature; // 온도
            const windSpeed = data.wind; // 풍속
            const forecast = data.forecast; // 3일 예보

            // 5️⃣ 결과 표시할 div 요소 가져오기
            const resultDiv = document.getElementById('weather-result');

            // 6️⃣ HTML 업데이트
            resultDiv.innerHTML = `
                <h2>🌍 ${city}의 날씨</h2>
                <p>🌡️ 온도: <strong>${temp}</strong></p>
                <p>🌤️ 상태: <strong>${weatherDesc}</strong></p>
                <p>🌬️ 풍속: <strong>${windSpeed}</strong></p>
                <h3>📅 3일 예보</h3>
                <ul>
                    ${forecast.map(day => `
                        <li>${day.day}: 온도 ${day.temperature}, 바람 ${day.wind}</li>
                    `).join('')}
                </ul>
            `;
        })
        .catch(error => {
            console.error("에러 발생:", error);
            document.getElementById('weather-result').innerHTML = `
                <p style="color: red;">❌ 날씨 정보를 가져오는 데 실패했습니다.</p>
            `;
        });
}

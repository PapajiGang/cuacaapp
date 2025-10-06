// --- Konfigurasi ---
// API key dari OpenWeatherMap (ganti dengan milikmu)
const apiKey = '444cffee2211eb3fd13352225d652278';

// --- Elemen DOM ---
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const initialMessage = document.getElementById('initialMessage');
const errorMessage = document.getElementById('errorMessage');

const cityNameEl = document.getElementById('cityName');
const weatherIconEl = document.getElementById('weatherIcon');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');

// --- Fungsi untuk ambil data cuaca ---
async function getWeather(city) {
  weatherInfo.classList.add('hidden');
  errorMessage.classList.add('hidden');
  initialMessage.classList.add('hidden');

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Kota tidak ditemukan');
    }
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error('Gagal ambil data cuaca:', error);
    errorMessage.classList.remove('hidden');
  }
}

// --- Update UI ---
function updateUI(data) {
  const { name, main, weather, wind } = data;

  cityNameEl.textContent = name;
  temperatureEl.textContent = `${Math.round(main.temp)}°C`;
  descriptionEl.textContent = weather[0].description;
  humidityEl.textContent = `${main.humidity}%`;
  windSpeedEl.textContent = `${wind.speed.toFixed(1)} km/h`;
  weatherIconEl.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  weatherIconEl.alt = weather[0].description;

  weatherInfo.classList.remove('hidden');
}

// --- Event ---
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

cityInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city);
    }
  }
});

// Elemen iframe Maps
const mapFrame = document.getElementById('mapFrame');

// Fungsi update UI + Map
function updateUI(data) {
    const { name, main, weather, wind } = data;
   
    // Update cuaca
    cityNameEl.textContent = name;
    temperatureEl.textContent = `${Math.round(main.temp)}°C`;
    descriptionEl.textContent = weather[0].description;
    humidityEl.textContent = `${main.humidity}%`;
    windSpeedEl.textContent = `${wind.speed.toFixed(1)} km/h`;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    weatherIconEl.alt = weather[0].description;

    // Tampilkan kartu informasi cuaca
    weatherInfo.classList.remove('hidden');

    // Update Google Maps berdasarkan nama kota
    mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(name)}&output=embed`;
}

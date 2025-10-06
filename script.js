// --- Konfigurasi ---
// PENTING: Ganti 'YOUR_API_KEY' dengan API key Anda sendiri dari OpenWeatherMap.
// Anda bisa mendapatkannya secara gratis di https://openweathermap.org/appid
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


// --- Fungsi untuk mengambil data cuaca ---
async function getWeather(city) {
    // Sembunyikan semua tampilan sebelum melakukan pencarian baru
    weatherInfo.classList.add('hidden');
    errorMessage.classList.add('hidden');
    initialMessage.classList.add('hidden');


    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;


    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            // Jika respons tidak berhasil (misal: 404 Not Found), lempar error
            throw new Error('Kota tidak ditemukan');
        }
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Gagal mengambil data cuaca:', error);
        errorMessage.classList.remove('hidden'); // Tampilkan pesan error
    }
}


// --- Fungsi untuk memperbarui tampilan UI ---
function updateUI(data) {
    const { name, main, weather, wind } = data;
   
    // Memperbarui teks dan gambar di elemen HTML
    cityNameEl.textContent = name;
    temperatureEl.textContent = `${Math.round(main.temp)}°C`;
    descriptionEl.textContent = weather[0].description;
    humidityEl.textContent = `${main.humidity}%`;
    windSpeedEl.textContent = `${wind.speed.toFixed(1)} km/h`;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    weatherIconEl.alt = weather[0].description;


    // Tampilkan kartu informasi cuaca
    weatherInfo.classList.remove('hidden');
}


// --- Event Listeners ---
// 1. Saat tombol cari diklik
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});


// 2. Saat menekan tombol "Enter" di kotak input
cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});

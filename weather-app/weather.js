const getForecast = document.getElementById("get-forecast");
const cityDropdown = document.getElementById("city-dropdown");

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (err) {
        console.log(err);
        return null;
    }
}

const showWeather = async (city) => {
    const data = await getWeather(city);
    if (!data) {
        alert("Something went wrong, please try again later");
        return;
    }
    const {
        name,
        main,
        weather,
        wind
    } = data;

    document.querySelector('.content-container').classList.add('active');

    document.getElementById("location").textContent = name || "N/A";
    document.getElementById("main-temperature").innerHTML =
        main?.temp ? `${main.temp.toFixed(2)}<sup>o</sup> C` : 'N/A';
    document.getElementById("feels-like").innerHTML =
        main?.feels_like ? `Feels Like: ${main.feels_like.toFixed(2)}<sup>0o/sup> C` : 'Feels Like: N/A';
    document.getElementById('humidity').textContent =
        main?.humidity ? `Humidity: ${main.humidity}%` : 'Humidity: N/A';

    document.getElementById('wind').textContent =
        wind?.speed ? `Wind: ${wind.speed} m/s` : 'Wind: N/A';
    document.getElementById('wind-gust').textContent =
        wind?.gust ? `Gusts: ${wind.gust} m/s` : 'Gusts: N/A';

    const weatherData = weather?. [0];
    document.getElementById('weather-main').textContent =
        weatherData?.main || 'N/A';
    document.getElementById('weather-icon').src =
        weatherData?.icon || '';
    document.getElementById('weather-icon').alt =
        weatherData?.description || 'weather icon';
}

document.getElementById("get-forecast").addEventListener("click", () => {
    const city = document.getElementById("city-dropdown").value;
    if (!city) return;
    showWeather(city);
})
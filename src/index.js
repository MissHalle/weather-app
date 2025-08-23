function refreshWeather(response) {
  let temperatureElement = document.querySelector("#weather-app-temp");
  temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#weather-app-city");
  city = response.data.city;

  let descriptionElement = document.querySelector("#description");
  description = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidity = response.data.temperature.humidity;

  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeed = Math.round(response.data.wind.speed);

  let timeElement = document.querySelector("#current-time");
  currentTime = "booty";

  let date = new Date(response.data.time * 1000);

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = city;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed}mph`;
  timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (mintues < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "cfd1t35o8f8b68dcafb73c36e0439c16";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
